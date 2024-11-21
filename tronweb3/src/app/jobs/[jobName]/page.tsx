"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function JobDetailsView() {
  const [activeTab, setActiveTab] = useState("config")
  const { jobName } = useParams()
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['getJob'],
    queryFn: async () => {
      const response = await fetch(
        `http://tron-infrastage.yelpcorp.com:8089/api/jobs/${jobName}`,
      )
      return await response.json()
    },
  })
  if (isPending || isFetching) {
    return <div>Loading...</div>
  }
  const job = data;

  return (
    <div className="container mx-auto py-10">
    <Card className="w-max-7xl">
      <CardHeader>
        <CardTitle>{job.name}</CardTitle>
        <CardDescription>Job Details and Run History</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="runs">Run History</TabsTrigger>
          </TabsList>
          <TabsContent value="config">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">General Information</h3>
                <Table>
                  <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-64">Status</TableCell>
                        <TableCell>
                            <Badge variant={job.status === 'enabled' ? 'default' : 'secondary'}>{job.status}</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium w-64">Schedule</TableCell>
                        <TableCell>{job.scheduler.value}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium w-64">Allow Overlap</TableCell>
                        <TableCell>{job.allow_overlap ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium w-64">Queueing</TableCell>
                        <TableCell>{job.queueing ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium w-64">Max Runtime</TableCell>
                        <TableCell>{job.max_runtime}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium w-64">Expected Runtime</TableCell>
                        <TableCell>{job.expected_runtime}</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Node Pool</h3>
                <Table>
                  <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-64">Name</TableCell>
                        <TableCell>{job.node_pool.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium w-64">Nodes</TableCell>
                        <TableCell>
                            <ul className="list-disc pl-5">
                              {job.node_pool.nodes.map((node, index) => (
                                <li key={index}>{node.name} ({node.hostname})</li>
                              ))}
                            </ul>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Monitoring</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium w-64">Alert After</TableCell>
                      <TableCell>{job.monitoring.alert_after}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium w-64">Page</TableCell>
                      <TableCell>{job.monitoring.page ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium w-64">Team</TableCell>
                      <TableCell>{job.monitoring.team}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium w-64">Ticket</TableCell>
                      <TableCell>{job.monitoring.ticket ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    {job.monitoring.runbook && (
                      <TableRow>
                        <TableCell className="font-medium w-64">Runbook</TableCell>
                        <TableCell>
                            <a href={job.monitoring.runbook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a>
                        </TableCell>
                      </TableRow>
                    )}
                    {job.monitoring.tip && (
                      <TableRow>
                        <TableCell className="font-medium w-64">Tip</TableCell>
                        <TableCell>{job.monitoring.tip}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Action Graph</h3>
                {job.action_graph?.map((action, index) => (
                  <div key={index} className="mt-2">
                    <p><strong>Name:</strong> {action.name}</p>
                    <p><strong>Command: </strong><code className="bg-gray-100 p-1 rounded">&nbsp;{action.command}&nbsp;</code></p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="runs">
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run #</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {job.runs.map((run) => (
                    <TableRow key={run.id}>
                      <TableCell>{run.run_num}</TableCell>
                      <TableCell>
                        <Badge variant={run.state === 'succeeded' ? 'default' : 'secondary'}>
                          {run.state}
                        </Badge>
                      </TableCell>
                      <TableCell>{run.start_time || 'N/A'}</TableCell>
                      <TableCell>{run.end_time || 'N/A'}</TableCell>
                      <TableCell>{run.duration || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    </div>
  )
}
