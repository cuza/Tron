"use client";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { Dashboard } from "../components/Dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [jobsData, setJobsData] = useState(mockData);
  useQueryClient();

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
