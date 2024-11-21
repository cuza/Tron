"use client"
import { useState } from 'react'
import { JobDetails, JobRun } from '../types/jobs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const job = {
    "status": "enabled",
    "all_nodes": false,
    "allow_overlap": false,
    "queueing": false,
    "name": "cassandra_k8s.schema-exporter",
    "scheduler": {
      "value": "*/15 * * * *",
      "type": "cron",
      "jitter": ""
    },
    "action_names": [
      "dev"
    ],
    "node_pool": {
      "name": "paasta",
      "nodes": [
        {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        }
      ]
    },
    "last_success": "2024-11-21 09:15:26",
    "next_run": "2024-11-21 09:30:00",
    "url": "/jobs/cassandra_k8s.schema-exporter",
    "runs": [
      {
        "id": "cassandra_k8s.schema-exporter.560",
        "run_num": 560,
        "run_time": "2024-11-21 09:30:00",
        "start_time": null,
        "end_time": null,
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "scheduled",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "",
        "url": "/jobs/cassandra_k8s.schema-exporter/560",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.559",
        "run_num": 559,
        "run_time": "2024-11-21 09:15:00",
        "start_time": "2024-11-21 09:15:00",
        "end_time": "2024-11-21 09:15:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:26.134522",
        "url": "/jobs/cassandra_k8s.schema-exporter/559",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.558",
        "run_num": 558,
        "run_time": "2024-11-21 09:00:00",
        "start_time": "2024-11-21 09:00:00",
        "end_time": "2024-11-21 09:00:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.944869",
        "url": "/jobs/cassandra_k8s.schema-exporter/558",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.557",
        "run_num": 557,
        "run_time": "2024-11-21 08:45:00",
        "start_time": "2024-11-21 08:45:00",
        "end_time": "2024-11-21 08:45:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.783482",
        "url": "/jobs/cassandra_k8s.schema-exporter/557",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.556",
        "run_num": 556,
        "run_time": "2024-11-21 08:30:00",
        "start_time": "2024-11-21 08:30:00",
        "end_time": "2024-11-21 08:30:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.196058",
        "url": "/jobs/cassandra_k8s.schema-exporter/556",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.555",
        "run_num": 555,
        "run_time": "2024-11-21 08:15:00",
        "start_time": "2024-11-21 08:15:00",
        "end_time": "2024-11-21 08:15:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.257235",
        "url": "/jobs/cassandra_k8s.schema-exporter/555",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.554",
        "run_num": 554,
        "run_time": "2024-11-21 08:00:00",
        "start_time": "2024-11-21 08:00:00",
        "end_time": "2024-11-21 08:00:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.535572",
        "url": "/jobs/cassandra_k8s.schema-exporter/554",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.553",
        "run_num": 553,
        "run_time": "2024-11-21 07:45:00",
        "start_time": "2024-11-21 07:45:00",
        "end_time": "2024-11-21 07:45:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.618856",
        "url": "/jobs/cassandra_k8s.schema-exporter/553",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.552",
        "run_num": 552,
        "run_time": "2024-11-21 07:30:00",
        "start_time": "2024-11-21 07:30:00",
        "end_time": "2024-11-21 07:30:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.478861",
        "url": "/jobs/cassandra_k8s.schema-exporter/552",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.551",
        "run_num": 551,
        "run_time": "2024-11-21 07:15:00",
        "start_time": "2024-11-21 07:15:01",
        "end_time": "2024-11-21 07:15:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.244540",
        "url": "/jobs/cassandra_k8s.schema-exporter/551",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.550",
        "run_num": 550,
        "run_time": "2024-11-21 07:00:00",
        "start_time": "2024-11-21 07:00:00",
        "end_time": "2024-11-21 07:00:27",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:27.767613",
        "url": "/jobs/cassandra_k8s.schema-exporter/550",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.549",
        "run_num": 549,
        "run_time": "2024-11-21 06:45:00",
        "start_time": "2024-11-21 06:45:00",
        "end_time": "2024-11-21 06:45:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.625137",
        "url": "/jobs/cassandra_k8s.schema-exporter/549",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.548",
        "run_num": 548,
        "run_time": "2024-11-21 06:30:00",
        "start_time": "2024-11-21 06:30:00",
        "end_time": "2024-11-21 06:30:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.332111",
        "url": "/jobs/cassandra_k8s.schema-exporter/548",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.547",
        "run_num": 547,
        "run_time": "2024-11-21 06:15:00",
        "start_time": "2024-11-21 06:15:00",
        "end_time": "2024-11-21 06:15:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.076403",
        "url": "/jobs/cassandra_k8s.schema-exporter/547",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.546",
        "run_num": 546,
        "run_time": "2024-11-21 06:00:00",
        "start_time": "2024-11-21 06:00:00",
        "end_time": "2024-11-21 06:00:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.424333",
        "url": "/jobs/cassandra_k8s.schema-exporter/546",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.545",
        "run_num": 545,
        "run_time": "2024-11-21 05:45:00",
        "start_time": "2024-11-21 05:45:00",
        "end_time": "2024-11-21 05:45:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.635550",
        "url": "/jobs/cassandra_k8s.schema-exporter/545",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.544",
        "run_num": 544,
        "run_time": "2024-11-21 05:30:00",
        "start_time": "2024-11-21 05:30:00",
        "end_time": "2024-11-21 05:30:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.054699",
        "url": "/jobs/cassandra_k8s.schema-exporter/544",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.543",
        "run_num": 543,
        "run_time": "2024-11-21 05:15:00",
        "start_time": "2024-11-21 05:15:00",
        "end_time": "2024-11-21 05:15:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:26.032580",
        "url": "/jobs/cassandra_k8s.schema-exporter/543",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.542",
        "run_num": 542,
        "run_time": "2024-11-21 05:00:00",
        "start_time": "2024-11-21 05:00:00",
        "end_time": "2024-11-21 05:00:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.911129",
        "url": "/jobs/cassandra_k8s.schema-exporter/542",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.541",
        "run_num": 541,
        "run_time": "2024-11-21 04:45:00",
        "start_time": "2024-11-21 04:45:00",
        "end_time": "2024-11-21 04:45:27",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:26.302296",
        "url": "/jobs/cassandra_k8s.schema-exporter/541",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.540",
        "run_num": 540,
        "run_time": "2024-11-21 04:30:00",
        "start_time": "2024-11-21 04:30:00",
        "end_time": "2024-11-21 04:30:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.647115",
        "url": "/jobs/cassandra_k8s.schema-exporter/540",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.539",
        "run_num": 539,
        "run_time": "2024-11-21 04:15:00",
        "start_time": "2024-11-21 04:15:00",
        "end_time": "2024-11-21 04:15:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.516157",
        "url": "/jobs/cassandra_k8s.schema-exporter/539",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.538",
        "run_num": 538,
        "run_time": "2024-11-21 04:00:00",
        "start_time": "2024-11-21 04:00:00",
        "end_time": "2024-11-21 04:00:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.783305",
        "url": "/jobs/cassandra_k8s.schema-exporter/538",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.537",
        "run_num": 537,
        "run_time": "2024-11-21 03:45:00",
        "start_time": "2024-11-21 03:45:00",
        "end_time": "2024-11-21 03:45:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.574036",
        "url": "/jobs/cassandra_k8s.schema-exporter/537",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.536",
        "run_num": 536,
        "run_time": "2024-11-21 03:30:00",
        "start_time": "2024-11-21 03:30:00",
        "end_time": "2024-11-21 03:30:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.083138",
        "url": "/jobs/cassandra_k8s.schema-exporter/536",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.535",
        "run_num": 535,
        "run_time": "2024-11-21 03:15:00",
        "start_time": "2024-11-21 03:15:00",
        "end_time": "2024-11-21 03:15:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.344624",
        "url": "/jobs/cassandra_k8s.schema-exporter/535",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.534",
        "run_num": 534,
        "run_time": "2024-11-21 03:00:00",
        "start_time": "2024-11-21 03:00:00",
        "end_time": "2024-11-21 03:00:23",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:23.482194",
        "url": "/jobs/cassandra_k8s.schema-exporter/534",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.533",
        "run_num": 533,
        "run_time": "2024-11-21 02:45:00",
        "start_time": "2024-11-21 02:45:00",
        "end_time": "2024-11-21 02:45:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.234570",
        "url": "/jobs/cassandra_k8s.schema-exporter/533",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.532",
        "run_num": 532,
        "run_time": "2024-11-21 02:30:00",
        "start_time": "2024-11-21 02:30:00",
        "end_time": "2024-11-21 02:30:34",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:34.762608",
        "url": "/jobs/cassandra_k8s.schema-exporter/532",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.531",
        "run_num": 531,
        "run_time": "2024-11-21 02:15:00",
        "start_time": "2024-11-21 02:15:00",
        "end_time": "2024-11-21 02:15:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.070027",
        "url": "/jobs/cassandra_k8s.schema-exporter/531",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.530",
        "run_num": 530,
        "run_time": "2024-11-21 02:00:00",
        "start_time": "2024-11-21 02:00:00",
        "end_time": "2024-11-21 02:00:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.422912",
        "url": "/jobs/cassandra_k8s.schema-exporter/530",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.529",
        "run_num": 529,
        "run_time": "2024-11-21 01:45:00",
        "start_time": "2024-11-21 01:45:00",
        "end_time": "2024-11-21 01:45:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.701665",
        "url": "/jobs/cassandra_k8s.schema-exporter/529",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.528",
        "run_num": 528,
        "run_time": "2024-11-21 01:30:00",
        "start_time": "2024-11-21 01:30:00",
        "end_time": "2024-11-21 01:30:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.421186",
        "url": "/jobs/cassandra_k8s.schema-exporter/528",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.527",
        "run_num": 527,
        "run_time": "2024-11-21 01:15:00",
        "start_time": "2024-11-21 01:15:00",
        "end_time": "2024-11-21 01:15:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.478460",
        "url": "/jobs/cassandra_k8s.schema-exporter/527",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.526",
        "run_num": 526,
        "run_time": "2024-11-21 01:00:00",
        "start_time": "2024-11-21 01:00:00",
        "end_time": "2024-11-21 01:00:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.263444",
        "url": "/jobs/cassandra_k8s.schema-exporter/526",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.525",
        "run_num": 525,
        "run_time": "2024-11-21 00:45:00",
        "start_time": "2024-11-21 00:45:00",
        "end_time": "2024-11-21 00:45:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.293798",
        "url": "/jobs/cassandra_k8s.schema-exporter/525",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.524",
        "run_num": 524,
        "run_time": "2024-11-21 00:30:00",
        "start_time": "2024-11-21 00:30:00",
        "end_time": "2024-11-21 00:30:36",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:35.858637",
        "url": "/jobs/cassandra_k8s.schema-exporter/524",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.523",
        "run_num": 523,
        "run_time": "2024-11-21 00:15:00",
        "start_time": "2024-11-21 00:15:00",
        "end_time": "2024-11-21 00:15:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.810405",
        "url": "/jobs/cassandra_k8s.schema-exporter/523",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.522",
        "run_num": 522,
        "run_time": "2024-11-21 00:00:00",
        "start_time": "2024-11-21 00:00:00",
        "end_time": "2024-11-21 00:00:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:26.166109",
        "url": "/jobs/cassandra_k8s.schema-exporter/522",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.521",
        "run_num": 521,
        "run_time": "2024-11-20 23:45:00",
        "start_time": "2024-11-20 23:45:00",
        "end_time": "2024-11-20 23:45:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.209280",
        "url": "/jobs/cassandra_k8s.schema-exporter/521",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.520",
        "run_num": 520,
        "run_time": "2024-11-20 23:30:00",
        "start_time": "2024-11-20 23:30:00",
        "end_time": "2024-11-20 23:30:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.352724",
        "url": "/jobs/cassandra_k8s.schema-exporter/520",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.519",
        "run_num": 519,
        "run_time": "2024-11-20 23:15:00",
        "start_time": "2024-11-20 23:15:00",
        "end_time": "2024-11-20 23:15:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.706889",
        "url": "/jobs/cassandra_k8s.schema-exporter/519",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.518",
        "run_num": 518,
        "run_time": "2024-11-20 23:00:00",
        "start_time": "2024-11-20 23:00:00",
        "end_time": "2024-11-20 23:00:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.250036",
        "url": "/jobs/cassandra_k8s.schema-exporter/518",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.517",
        "run_num": 517,
        "run_time": "2024-11-20 22:45:00",
        "start_time": "2024-11-20 22:45:00",
        "end_time": "2024-11-20 22:45:26",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.267450",
        "url": "/jobs/cassandra_k8s.schema-exporter/517",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.516",
        "run_num": 516,
        "run_time": "2024-11-20 22:30:00",
        "start_time": "2024-11-20 22:30:00",
        "end_time": "2024-11-20 22:30:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.295486",
        "url": "/jobs/cassandra_k8s.schema-exporter/516",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.515",
        "run_num": 515,
        "run_time": "2024-11-20 22:15:00",
        "start_time": "2024-11-20 22:15:00",
        "end_time": "2024-11-20 22:15:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.091527",
        "url": "/jobs/cassandra_k8s.schema-exporter/515",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.514",
        "run_num": 514,
        "run_time": "2024-11-20 22:00:00",
        "start_time": "2024-11-20 22:00:00",
        "end_time": "2024-11-20 22:00:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.307326",
        "url": "/jobs/cassandra_k8s.schema-exporter/514",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.513",
        "run_num": 513,
        "run_time": "2024-11-20 21:45:00",
        "start_time": "2024-11-20 21:45:00",
        "end_time": "2024-11-20 21:45:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.741060",
        "url": "/jobs/cassandra_k8s.schema-exporter/513",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.512",
        "run_num": 512,
        "run_time": "2024-11-20 21:30:00",
        "start_time": "2024-11-20 21:30:00",
        "end_time": "2024-11-20 21:30:24",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:24.329268",
        "url": "/jobs/cassandra_k8s.schema-exporter/512",
        "runs": null,
        "action_graph": null
      },
      {
        "id": "cassandra_k8s.schema-exporter.511",
        "run_num": 511,
        "run_time": "2024-11-20 21:15:00",
        "start_time": "2024-11-20 21:15:00",
        "end_time": "2024-11-20 21:15:25",
        "manual": false,
        "job_name": "cassandra_k8s.schema-exporter",
        "state": "succeeded",
        "node": {
          "name": "paasta",
          "hostname": "localhost",
          "username": "batch",
          "port": 22
        },
        "duration": "0:00:25.508453",
        "url": "/jobs/cassandra_k8s.schema-exporter/511",
        "runs": null,
        "action_graph": null
      }
    ],
    "max_runtime": "None",
    "action_graph": [
      {
        "name": "dev",
        "command": "mkdir -p /nail/tls/ && echo \"$CASSANDRA_TLS_USER_KEY\" > /nail/tls/admin-key && /init-cqlshrc.sh && cassandra_tool export_schema --cluster-name $CLUSTER_NAME --s3-bucket yelp-cassandra-schemas-dev-us-west-2 --cqlshrc /root/.cassandra/cqlshrc",
        "dependencies": []
      }
    ],
    "monitoring": {
      "alert_after": "12h",
      "page": false,
      "runbook": "https://y.yelpcorp.com/rb-cassandra-k8s/alerts/check_paasta_services_replication",
      "team": "dre_cassandra",
      "ticket": true,
      "tip": "Cassandra K8s clusters"
    },
    "expected_runtime": 86400,
    "actions_expected_runtime": {
      "dev": 86400
    }
  }

// export default function JobDetailsView({ job }: { job: JobDetails }) {
export default function JobDetailsView() {
  const [activeTab, setActiveTab] = useState("config")

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
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

                <p><strong>Status:</strong></p> <Badge variant={job.status === 'enabled' ? 'default' : 'secondary'}>{job.status}</Badge>
                <p><strong>Schedule:</strong> {job.scheduler.value}</p>
                <p><strong>Allow Overlap:</strong> {job.allow_overlap ? 'Yes' : 'No'}</p>
                <p><strong>Queueing:</strong> {job.queueing ? 'Yes' : 'No'}</p>
                <p><strong>Max Runtime:</strong> {job.max_runtime}</p>
                <p><strong>Expected Runtime:</strong> {job.expected_runtime} seconds</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Node Pool</h3>
                <p><strong>Name:</strong> {job.node_pool.name}</p>
                <p><strong>Nodes:</strong></p>
                <ul className="list-disc pl-5">
                  {job.node_pool.nodes.map((node, index) => (
                    <li key={index}>{node.name} ({node.hostname})</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Monitoring</h3>
                <p><strong>Alert After:</strong> {job.monitoring.alert_after}</p>
                <p><strong>Page:</strong> {job.monitoring.page ? 'Yes' : 'No'}</p>
                <p><strong>Team:</strong> {job.monitoring.team}</p>
                <p><strong>Ticket:</strong> {job.monitoring.ticket ? 'Yes' : 'No'}</p>
                {job.monitoring.runbook && (
                  <p><strong>Runbook:</strong> <a href={job.monitoring.runbook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a></p>
                )}
                {job.monitoring.tip && <p><strong>Tip:</strong> {job.monitoring.tip}</p>}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Action Graph</h3>
                {job.action_graph.map((action, index) => (
                  <div key={index} className="mt-2">
                    <p><strong>Name:</strong> {action.name}</p>
                    <p><strong>Command:</strong> <code className="bg-gray-100 p-1 rounded">{action.command}</code></p>
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
