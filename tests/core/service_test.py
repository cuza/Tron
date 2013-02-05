import mock
from testify import setup, assert_equal, TestCase, run
from testify.assertions import assert_not_equal, assert_raises, assert_not_in, assert_in

from tests.testingutils import autospec_method
from tron.core import service, serviceinstance
from tron import node, command_context, event
from tron.core.serviceinstance import ServiceInstance


class ServiceRepairCallbackTestCase(TestCase):

    @setup
    def setup_monitor(self):
        self.callback = mock.create_autospec(service.Service.repair)
        self.monitor = service.ServiceRepairCallback(self.callback, 5)

    def test__init__(self):
        assert_equal(self.monitor.restart_interval, 5)
        assert_equal(self.callback, self.monitor.callback)

    def test_start_no_restart_interval(self):
        self.monitor.restart_interval = None
        patcher = mock.patch('tron.core.service.eventloop', autospec=True)
        with patcher as mock_eventloop:
            self.monitor.start()
            assert not mock_eventloop.call_later.call_count

    def test_start(self):
        patcher = mock.patch('tron.core.service.eventloop', autospec=True)
        with patcher as mock_eventloop:
            self.monitor.start()
            mock_eventloop.call_later.assert_called_with(
                self.monitor.restart_interval, self.monitor.run_callback)

    def test_start_already_actice(self):
        self.monitor.timer.active = mock.Mock(return_value=True)
        patcher = mock.patch('tron.core.service.eventloop', autospec=True)
        with patcher as mock_eventloop:
            self.monitor.start()
            assert not mock_eventloop.call_later.call_count


class ServiceTestCase(TestCase):

    @setup
    def setup_service(self):
        self.config = mock.MagicMock()
        self.instances = mock.create_autospec(
            serviceinstance.ServiceInstanceCollection,
            stop=mock.Mock(), start=mock.Mock(), state_data=mock.Mock())
        self.service = service.Service(self.config, self.instances)
        autospec_method(self.service.watch)
        self.service.repair_callback = mock.create_autospec(
            service.ServiceRepairCallback)

    @mock.patch('tron.core.service.node')
    def test_from_config(self, mock_node):
        node_store = mock.create_autospec(node.NodePoolStore)
        mock_node.NodePoolStore.get_instance.return_value = node_store
        node_store[self.config.node] = mock.create_autospec(node.Node)
        context = mock.create_autospec(command_context.CommandContext)

        service_inst = service.Service.from_config(self.config, context)
        collection = service_inst.instances
        assert_equal(service_inst.config, self.config)
        assert_equal(collection.node_pool, node_store[self.config.node])
        assert_equal(collection.context, context)

    def test_state_disabled(self):
        assert_equal(self.service.get_state(), self.service.STATE_DISABLED)

    def test_state_up(self):
        self.service.enabled = True
        assert_equal(self.service.get_state(), self.service.STATE_UP)
        self.instances.all.assert_called_with(ServiceInstance.STATE_UP)

    def test_state_degraded(self):
        self.service.enabled = True
        self.instances.all.return_value = False
        self.instances.is_starting.return_value = False
        assert_equal(self.service.get_state(), self.service.STATE_DEGRADED)

    def test_enable(self):
        autospec_method(self.service.repair)
        self.service.enable()
        assert self.service.enabled
        self.service.repair.assert_called_with()

    def test_disable(self):
        self.service.disable()
        assert not self.service.enabled
        self.instances.stop.assert_called_with()
        self.service.repair_callback.cancel.assert_called_with()

    def test_repair(self):
        count = 3
        created_instances = [
            mock.create_autospec(ServiceInstance) for _ in xrange(count)]
        self.instances.create_missing.return_value = created_instances
        self.service.repair()
        self.instances.clear_failed.assert_called_with()
        assert_equal(self.service.watch.mock_calls,
            [mock.call(inst.get_observable()) for inst in created_instances])
        self.instances.start.assert_called_with()

    def test_handle_instance_state_change(self):
        # TODO
        pass

    def test_record_events_failure(self):
        autospec_method(self.service.get_state)
        state = self.service.get_state.return_value  = self.service.STATE_FAILED
        self.service.event_recorder = mock.create_autospec(event.EventRecorder)
        self.service.record_events()
        self.service.event_recorder.critical.assert_called_with(state)

    def test_record_events_up(self):
        autospec_method(self.service.get_state)
        state = self.service.get_state.return_value  = self.service.STATE_UP
        self.service.event_recorder = mock.create_autospec(event.EventRecorder)
        self.service.record_events()
        self.service.event_recorder.ok.assert_called_with(state)

    def test_state_data(self):
        expected = dict(enabled=False, instances=self.instances.state_data)
        assert_equal(self.service.state_data, expected)

    def test__eq__not_equal(self):
        assert_not_equal(self.service, None)
        assert_not_equal(self.service, mock.Mock())
        other = service.Service(self.config, mock.Mock())
        assert_not_equal(self.service, other)

    def test__eq__(self):
        other = service.Service(self.config, self.instances)
        assert_equal(self.service, other)

    def test_restore_state(self):
        autospec_method(self.service.watch_instances)
        autospec_method(self.service.enable)
        state_data = {'enabled': True, 'instances': []}
        self.service.restore_state(state_data)
        self.service.watch_instances.assert_called_with(
            self.instances.restore_state.return_value)
        self.service.enable.assert_called_with()


class ServiceCollectionTestCase(TestCase):

    @setup
    def setup_collection(self):
        self.collection = service.ServiceCollection()
        self.service_list = [
            mock.create_autospec(service.Service) for _ in xrange(3)]

    def _add_service(self):
        self.collection.services = dict(
            (serv.name, serv) for serv in self.service_list)

    def test_load_from_config(self):
        pass
        # TODO

    def test_add_service_added(self):
        service = self.service_list[0]
        assert self.collection.add(service)
        assert_in(service, self.collection)

    def test_add_service_already_exists(self):
        autospec_method(self.collection._service_exists, return_value=True)
        assert not self.collection.add(self.service_list[0])

    def test_remove_unknown(self):
        assert_raises(ValueError, self.collection.remove, 'some_name')

    def test_remove(self):
        mock_service = mock.create_autospec(service.Service)
        self.collection.services[mock_service.name] = mock_service
        self.collection.remove(mock_service.name)
        mock_service.disable.assert_called_with()
        assert_not_in(mock_service, self.collection.services)

    # TODO: this test can flake
    def test_filter_by_name(self):
        self._add_service()
        services_names = [serv.name for serv in self.service_list[:2]]
        self.collection._filter_by_name(services_names)
        assert_equal(list(self.collection), self.service_list[:2])

    def test_service_exists_false(self):
        mock_service = mock.create_autospec(service.Service)
        assert not self.collection._service_exists(mock_service)

    def test_service_exists_not_equal(self):
        mock_service = mock.MagicMock()
        mock_service.__eq__.return_value = False
        self.collection.services[mock_service.name] = mock_service
        autospec_method(self.collection.remove)
        assert not self.collection._service_exists(mock_service)
        self.collection.remove.assert_called_with(mock_service.name)

    def test_service_exists_true(self):
        mock_service = mock.create_autospec(service.Service)
        self.collection.services[mock_service.name] = mock_service
        assert self.collection._service_exists(mock_service)

    def test_restore_state(self):
        state_count = 2
        state_data = dict(
            (serv.name, serv) for serv in self.service_list[:state_count])
        self._add_service()
        self.collection.restore_state(state_data)
        for name in state_data:
            service = self.collection.services[name]
            service.restore_state.assert_called_with(state_data[name])

#class ReconfigNodePoolTest(TestCase):
#
#    @setup
#    def build_current_service(self):
#        self.node_pool = MockNodePool("node0", "node1")
#        self.service = service.Service("Sample Service", "sleep 60 &",
#                                       node_pool=self.node_pool)
#        self.service.pid_file_template = "/tmp/pid"
#        self.service.count = 4
#
#    @setup
#    def build_new_service(self):
#        self.new_node_pool = MockNodePool("node0")
#        self.new_service = service.Service("Sample Service", "sleep 60 &",
#                                           node_pool=self.new_node_pool)
#        self.new_service.pid_file_template = "/tmp/pid"
#        self.new_service.count = 4
#
#    def test_node_pool_rebalance(self):
#        self.service.start()
#
#        failing_node_instances = [i for i in self.service.instances
#                                  if i.node.hostname == "node1"]
#        self.new_service.absorb_previous(self.service)
#
#        assert all(i.state == service.ServiceInstance.STATE_STOPPING
#                   for i in failing_node_instances)
#
#
#class ReconfigRebuildAllTest(TestCase):
#
#    @setup
#    def build_current_service(self):
#        self.node_pool = MockNodePool("node0")
#        self.service = service.Service("Sample Service", "sleep 60 &",
#                                       node_pool=self.node_pool)
#        self.service.pid_file_template = "/tmp/pid"
#        self.service.count = 4
#
#    @setup
#    def build_new_service(self):
#        self.new_service = service.Service("Sample Service", "sleep 120 &",
#                                           node_pool=self.node_pool)
#        self.new_service.pid_file_template = "/tmp/pid"
#        self.new_service.count = 4
#
#    def test(self):
#        self.service.start()
#
#        self.new_service.absorb_previous(self.service)
#
#        assert all(i.state == service.ServiceInstance.STATE_STOPPING
#                   for i in self.new_service.instances)
#
#        for i in self.new_service.instances:
#            i.machine.transition("down")
#
#        # TODO: figure out what this was supposed to be testing
#        states = [i.state for i in self.new_service.instances]
#        assert all(i.state == service.ServiceInstance.STATE_STARTING
#                   for i in self.new_service.instances), states
#
#
#class SimpleRestoreTest(TestCase):
#    @setup
#    def build_service(self):
#        test_node = MockNode('testnode')
#        self.node_pool = node.NodePool(nodes=[test_node])
#        self.node_pool.nodes.append(test_node)
#
#        self.service = service.Service("Sample Service", "sleep 60 &",
#                                       node_pool=self.node_pool)
#        self.service.pid_file_template = "/tmp/pid"
#        self.service.count = 2
#
#        self.service.start()
#        instance1, instance2 = self.service.instances
#        instance1.machine.state = service.ServiceInstance.STATE_UP
#        instance2.machine.state = service.ServiceInstance.STATE_UP
#        self.service.machine.state = service.Service.STATE_UP
#
#    def test(self):
#        data = self.service.state_data
#
#        new_service = service.Service("Sample Service", "sleep 60 &",
#                                      node_pool=self.node_pool)
#        new_service.pid_file_template = "/tmp/pid"
#        new_service.count = 2
#        new_service.restore_service_state(data)
#
#        assert_equal(new_service.machine.state, service.Service.STATE_UP)
#        assert_equal(len(new_service.instances), 2)
#        for instance in new_service.instances:
#            assert_equal(instance.state,
#                         service.ServiceInstance.STATE_MONITORING)
#
#
#class FailureRestoreTest(TestCase):
#
#    @setup
#    def build_service(self):
#        test_node = MockNode('testname')
#        self.node_pool = node.NodePool(nodes=[test_node])
#        self.node_pool.nodes.append(test_node)
#
#        self.service = service.Service("Sample Service", "sleep 60 &",
#                                       node_pool=self.node_pool)
#        self.service.pid_file_template = "/tmp/pid"
#        self.service.count = 2
#
#        self.service.start()
#        instance1, instance2 = self.service.instances
#        instance1.machine.state = service.ServiceInstance.STATE_UP
#        instance2.machine.state = service.ServiceInstance.STATE_FAILED
#        self.service.machine.state = service.Service.STATE_DEGRADED
#
#    def test(self):
#        data = self.service.state_data
#
#        new_service = service.Service(
#                "Sample Service", "sleep 60 &", node_pool=self.node_pool)
#        new_service.pid_file_template = "/tmp/pid"
#        new_service.count = 2
#        new_service.restore_service_state(data)
#
#        assert_equal(new_service.machine.state, service.Service.STATE_DEGRADED)
#        assert_equal(len(new_service.instances), 2)
#        instance1, instance2 = new_service.instances
#        assert_equal(instance1.state, service.ServiceInstance.STATE_MONITORING)
#        assert_equal(instance2.state, service.ServiceInstance.STATE_MONITORING)
#
#
#class MonitorFailureTest(TestCase):
#
#    @setup
#    def build_service(self):
#        self.service = service.Service("Sample Service", "sleep 60 &",
#                                       node_pool=MockNodePool())
#        self.service.pid_file_template = "/var/run/service.pid"
#        self.service.count = 2
#
#    @setup
#    def start_service(self):
#        self.service.start()
#        instance1, instance2 = self.service.instances
#
#        def run_fail(runnable):
#            instance1._monitor_complete_failstart()
#            raise node.ConnectError("Failed to connect")
#
#        instance1.node.run = run_fail
#
#    def test_instance_up(self):
#        self.service.start()
#        instance1, instance2 = self.service.instances
#
#        instance1._run_monitor()
#        assert_equal(instance1.state, service.ServiceInstance.STATE_UNKNOWN)

if __name__ == "__main__":
    run()
