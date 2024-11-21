"use client";
import { Query, QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Job, JobsResponse } from "./types/job";
import "./components/tailwind.global.css"
// import './App.css';
// import Job from './components/Job/Job';
// import Dashboard from './components/Dashboard';


// function App() {
//   const queryClient = new QueryClient()

//   return (
//     <QueryClientProvider client={queryClient}>
//       <header className="bg-white">
//         <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
//           <div className="flex lg:flex-1">
//             <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
//             </a>
//           </div>
//           <div className="flex lg:hidden">
//             <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
//               <span className="sr-only">Open main menu</span>
//               <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//               </svg>
//             </button>
//           </div>
//           <div className="flex gap-x-12 items-center">
//             <a href="#" className="text-sm/6 font-semibold text-gray-900">Dashboard</a>
//             <a href="#" className="text-sm/6 font-semibold text-gray-900">Scheduled Jobs</a>
//             <a href="#" className="text-sm/6 font-semibold text-gray-900">Config</a>
//           </div>
//           <div className="flex flex-1 items-center justify-end gap-x-12">
//             <div className="overflow-hidden rounded-lg bg-white border border-gray-200">
//               <div className="relative">
//                 <input className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm/6" placeholder="Search" type="text" value="" />
//                 <svg className="pointer-events-none absolute right-4 top-4 size-6 fill-slate-400" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//       <body>
//         <Dashboard />
//       </body>
//       <footer className="bg-white">
//         <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 items-center">
//           <div className="border-t border-gray-100 py-6 w-full">
//             <p className="text-sm/6 text-slate-600 text-center">
//               {/* TODO: Make this dynamic */}
//               Tron: v2.8.1 Boot: 2024-11-13 17:05 -0500
//             </p>
//           </div>
//         </nav>
//       </footer>
//     </QueryClientProvider>
//   );
// }

// export default App;

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
        `http://tron-infrastage.yelpcorp.com:8089/api/jobs?page=${currentPage}&page_size=2`,
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
