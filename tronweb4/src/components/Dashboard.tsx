// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// type CardProps = {
//   name: string,
//   status: string,
//   runNumber: number,
//   href: string,
// };

// const Card = ({ name, status, runNumber, href }: CardProps) => {
//   return (
//     <article className="flex flex-col items-start border-gray-200 border p-4 aspect-square gap-2 overflow-hidden">
//         <div className="flex items-center gap-x-4 text-xs self-end">
//           <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{runNumber}</a>
//         </div>
//         <div className='w-full'>
//           <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 overflow-hidden text-ellipsis">
//               <a href={href}>
//               {name}
//               </a>
//           </h3>
//         </div>
//     </article>
//   )
// }

// type Job = {
//   name: string,
//   status: string,
//   runNumber: number,
//   href: string,
// }

// function formatJobs(jobs: any): Array<Job> {
//   return jobs.map((job: any) => {
//     return {
//       name: job.name,
//       status: job.status,
//       runNumber: job.run_number,
//       href: `/job/${job.name}`,
//     }
//   })
// }

// function Dashboard() {
//   const queryClient = useQueryClient();

//   const { isPending, error, data, isFetching } = useQuery({
//     queryKey: ['getJobs'],
//     queryFn: async () => {
//       const response = await fetch(
//         `http://tron-infrastage.yelpcorp.com:8089/api/jobs?page=1&page_size=10`,
//       )
//       return await response.json()
//     },
//   })

//   if (isPending) {
//     return <div>Loading...</div>
//   }


//   if (!data || error) {
//     console.log("Failed to fetch job details: " + error?.message)
//   }

//   const jobs = formatJobs(data.jobs);

//   return (
//     <div className="mx-auto max-w-7xl px-6 pb-16">
//       <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
//         {
//           jobs.map(({ name, status, runNumber, href }) => (
//             <Card name={name} status={status} runNumber={runNumber} href={href} />
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useState } from "react";
import { Job, JobsResponse } from "../types/job";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./shadcn/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./shadcn/Table";
import { Badge } from "./shadcn/Badge";
import { Button } from "./shadcn/Button";
import { Input } from "./shadcn/Input";
import { Label } from "./shadcn/Label";
import {
  Clock,
  AlertCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function Dashboard({ initialData, onPageChange }: { initialData: JobsResponse, onPageChange: (newPage: number) => void }) {
  const [jobs, setJobs] = useState<Job[]>(initialData.jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(initialData.pagination.page);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialData.pagination.total / initialData.pagination.page_size),
  );

  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePageChange = (newPage: number) => {
    // In a real application, this would fetch new data from the API
    setCurrentPage(newPage);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Jobs Dashboard</CardTitle>
        <CardDescription>Manage and monitor your jobs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="search">Search Jobs</Label>
          <Input
            id="search"
            placeholder="Enter job name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Last Success</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Monitoring</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.name}>
                <TableCell>{job.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={job.status === "enabled" ? "default" : "secondary"}
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.scheduler.value}</TableCell>
                <TableCell>{job.last_success}</TableCell>
                <TableCell>{job.next_run}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {job.monitoring.page && <AlertCircle className="h-4 w-4" />}
                    {job.monitoring.slack_channels && (
                      <MessageSquare className="h-4 w-4" />
                    )}
                    {job.monitoring.ticket && <Clock className="h-4 w-4" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
