export interface FilterConfig {
  field: string;
  operator: string;
  value: string;
}

export interface ScheduleConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  recipients: string[];
  nextRun?: Date;
}

export interface ReportConfig {
  id?: string;
  name: string;
  description: string;
  filters: FilterConfig[];
  columns: string[];
  groupBy?: string[];
  sortBy?: { field: string; direction: 'asc' | 'desc' }[];
  schedule?: ScheduleConfig;
  lastModified?: Date;
  createdAt?: Date;
} 