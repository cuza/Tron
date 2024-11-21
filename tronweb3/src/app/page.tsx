"use client";
import { Query, QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { Job, JobsResponse } from "./types/job";

// Mock data
const mockData: JobsResponse = {
  jobs: [
    {
      status: "enabled",
      name: "cassandra_k8s.schema-exporter",
      scheduler: {
        value: "*/15 * * * *",
        type: "cron",
        jitter: "",
      },
      action_names: ["dev"],
      last_success: "2024-11-21 06:45:25",
      next_run: "2024-11-21 07:00:00",
      url: "/jobs/cassandra_k8s.schema-exporter",
      monitoring: {
        alert_after: "12h",
        page: false,
        runbook:
          "https://y.yelpcorp.com/rb-cassandra-k8s/alerts/check_paasta_services_replication",
        team: "dre_cassandra",
        ticket: true,
        tip: "Cassandra K8s clusters",
      },
      expected_runtime: 86400,
      actions_expected_runtime: {
        dev: 86400,
      },
    },
    {
      status: "enabled",
      name: "compute-infra-test-service.test_load_foo1",
      scheduler: {
        value: "*/5 * * * *",
        type: "cron",
        jitter: "",
      },
      action_names: ["foo"],
      last_success: "2024-11-21 06:57:37",
      next_run: "2024-11-21 07:00:00",
      url: "/jobs/compute-infra-test-service.test_load_foo1",
      monitoring: {
        page: false,
        slack_channels: ["#ci-notifications"],
        team: "compute_infra",
        ticket: false,
      },
      expected_runtime: 86400,
      actions_expected_runtime: {
        foo: 86400,
      },
    },
    {
      status: "enabled",
      name: "compute-infra-test-service.test_load_foo2",
      scheduler: {
        value: "*/5 * * * *",
        type: "cron",
        jitter: "",
      },
      action_names: ["foo"],
      last_success: "2024-11-21 06:57:36",
      next_run: "2024-11-21 07:00:00",
      url: "/jobs/compute-infra-test-service.test_load_foo2",
      monitoring: {
        page: false,
        slack_channels: ["#ci-notifications"],
        team: "compute_infra",
        ticket: false,
      },
      expected_runtime: 86400,
      actions_expected_runtime: {
        foo: 86400,
      },
    },
    {
      status: "enabled",
      name: "katamari_test_service.test_load_foo1",
      scheduler: {
        value: "*/5 * * * *",
        type: "cron",
        jitter: "",
      },
      action_names: ["foo"],
      last_success: "2024-11-21 06:57:36",
      next_run: "2024-11-21 07:00:00",
      url: "/jobs/katamari_test_service.test_load_foo1",
      monitoring: {
        page: false,
        slack_channels: ["#ci-notifications"],
        team: "compute_infra",
        ticket: false,
      },
      expected_runtime: 86400,
      actions_expected_runtime: {
        foo: 86400,
      },
    },
  ],
  pagination: {
    page: 1,
    page_size: 4,
    total: 6,
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [jobsData, setJobsData] = useState(mockData);
  const useClient = useQueryClient();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['getJobs'],
    queryFn: async () => {
      const response = await fetch(
        `http://tron-infrastage.yelpcorp.com:8089/api/jobs?page=${currentPage}&page_size=100`,
      )
      return await response.json()
    },
  })

  if (isPending || isFetching) {
    return <div>Loading...</div>
  }

  let jobsData = data;

  const fetchJobs = (page: number): void => {
    // In production, this would be an API call
    // For now, we'll just simulate pagination by slicing the mock data
    const startIndex = (page - 1) * data.pagination.page_size;
    const endIndex = startIndex + data.pagination.page_size;
    const paginatedJobs = data.jobs.slice(startIndex, endIndex);

    jobsData = {
      jobs: paginatedJobs,
      pagination: {
        ...data.pagination,
      },
    };

    // setJobsData({
    //   jobs: paginatedJobs,
    //   pagination: {
    //     ...data.pagination,
    //   },
    // });
    // setCurrentPage(page);
  };

  const handlePageChange = (page: number): void => {
    if (page < 1 || page > data.pagination.total) {
      return;
    }
    setCurrentPage(page);
  }

  fetchJobs(1)


  return (
    <div className="container mx-auto py-10">
        <Dashboard
          initialData={jobsData}
          onPageChange={handlePageChange}
        />
    </div>
  );
}
