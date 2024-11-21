export interface Job {
    status: string;
    name: string;
    scheduler: {
      value: string;
      type: string;
      jitter: string;
    };
    action_names: string[];
    last_success: string;
    next_run: string;
    url: string;
    monitoring: {
      page: boolean;
      slack_channels?: string[];
      team: string;
      ticket: boolean;
      alert_after?: string;
      runbook?: string;
      tip?: string;
    };
    expected_runtime: number;
    actions_expected_runtime: {
      [key: string]: number;
    };
  }

  export interface JobsResponse {
    jobs: Job[];
    pagination: {
      page: number;
      page_size: number;
      total: number;
    };
  }

  export interface JobsDashboardProps {
    initialData: JobsResponse;
    onPageChange: (page: number) => void;
    currentPage: number;
  }
