import { useState } from "react";
import { Job, JobsResponse } from "../types/job";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
