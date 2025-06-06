import React, { useState, ReactElement, useEffect } from 'react';

interface FilterConfig {
  field: string;
  operator: string;
  value: string;
}

interface ScheduleConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  recipients: string[];
  nextRun?: Date;
}

interface ReportConfig {
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

const AVAILABLE_FIELDS = {
  order: [
    'orderDate',
    'orderTime',
    'orderType',
    'status',
    'fee',
    'location',
    'distance',
  ],
  client: [
    'clientName',
    'clientType',
    'company',
    'email',
    'phone',
  ],
  financial: [
    'revenue',
    'expenses',
    'profit',
    'invoiceStatus',
    'paymentDate',
  ],
  signing: [
    'signingDate',
    'signingType',
    'signerName',
    'documentCount',
    'duration',
  ],
} as const;

const OPERATORS = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'greaterThan', label: 'Greater Than' },
  { value: 'lessThan', label: 'Less Than' },
  { value: 'between', label: 'Between' },
  { value: 'in', label: 'In List' },
] as const;

const CustomReportBuilder = (): ReactElement => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: '',
    description: '',
    filters: [],
    columns: [],
    groupBy: [],
    sortBy: [],
    schedule: {
      enabled: false,
      frequency: 'monthly',
      time: '09:00',
      recipients: [],
    },
  });

  const [selectedCategory, setSelectedCategory] = useState<keyof typeof AVAILABLE_FIELDS>('order');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (reportConfig.name) {
        saveReport();
      }
    }, 2000);

    return () => clearTimeout(saveTimeout);
  }, [reportConfig]);

  const addFilter = () => {
    setReportConfig((prev: ReportConfig) => ({
      ...prev,
      filters: [...prev.filters, { field: '', operator: 'equals', value: '' }],
    }));
  };

  const removeFilter = (index: number) => {
    setReportConfig((prev: ReportConfig) => ({
      ...prev,
      filters: prev.filters.filter((_: FilterConfig, i: number) => i !== index),
    }));
  };

  const updateFilter = (index: number, field: keyof FilterConfig, value: string) => {
    setReportConfig((prev: ReportConfig) => ({
      ...prev,
      filters: prev.filters.map((filter: FilterConfig, i: number) => 
        i === index ? { ...filter, [field]: value } : filter
      ),
    }));
  };

  const toggleColumn = (column: string) => {
    setReportConfig((prev: ReportConfig) => ({
      ...prev,
      columns: prev.columns.includes(column)
        ? prev.columns.filter((c: string) => c !== column)
        : [...prev.columns, column],
    }));
  };

  const addRecipient = () => {
    if (recipientEmail && reportConfig.schedule) {
      setReportConfig(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule!,
          recipients: [...prev.schedule!.recipients, recipientEmail],
        },
      }));
      setRecipientEmail('');
    }
  };

  const removeRecipient = (email: string) => {
    if (reportConfig.schedule) {
      setReportConfig(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule!,
          recipients: prev.schedule!.recipients.filter(r => r !== email),
        },
      }));
    }
  };

  const updateSchedule = (field: keyof ScheduleConfig, value: any) => {
    setReportConfig(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule!,
        [field]: value,
      },
    }));
  };

  const saveReport = async () => {
    try {
      // TODO: Implement API call to save report
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportConfig),
      });
      
      if (!response.ok) throw new Error('Failed to save report');
      
      const savedReport = await response.json();
      console.log('Report saved:', savedReport);
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  const generateReport = async (format: 'pdf' | 'excel') => {
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reportConfig, format }),
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportConfig.name}_${new Date().toISOString()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Custom Report Builder</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Name</label>
            <input
              type="text"
              value={reportConfig.name}
              onChange={(e) => setReportConfig(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter report name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={reportConfig.description}
              onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={2}
              placeholder="Enter report description"
            />
          </div>
        </div>
      </div>

      {/* Column Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Columns</h3>
        <div className="space-y-4">
          {Object.entries(AVAILABLE_FIELDS).map(([category, fields]) => (
            <div key={category} className="border rounded-md p-4">
              <h4 className="font-medium text-gray-700 mb-2 capitalize">{category} Fields</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {fields.map(field => (
                  <label key={field} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={reportConfig.columns.includes(field)}
                      onChange={() => toggleColumn(field)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{field}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <button
            onClick={addFilter}
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Filter
          </button>
        </div>
        <div className="space-y-4">
          {reportConfig.filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-md">
              <select
                value={filter.field}
                onChange={(e) => updateFilter(index, 'field', e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Field</option>
                {AVAILABLE_FIELDS[selectedCategory].map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
              <select
                value={filter.operator}
                onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {OPERATORS.map(op => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
              <input
                type="text"
                value={filter.value}
                onChange={(e) => updateFilter(index, 'value', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter value"
              />
              <button
                onClick={() => removeFilter(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Configuration */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Schedule</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={reportConfig.schedule?.enabled}
              onChange={(e) => updateSchedule('enabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Enable Scheduling</span>
          </label>
        </div>
        
        {reportConfig.schedule?.enabled && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <select
                  value={reportConfig.schedule.frequency}
                  onChange={(e) => updateSchedule('frequency', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={reportConfig.schedule.time}
                  onChange={(e) => updateSchedule('time', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Recipients</label>
              <div className="mt-1 flex space-x-2">
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={addRecipient}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {reportConfig.schedule.recipients.map((email) => (
                  <div key={email} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-600">{email}</span>
                    <button
                      onClick={() => removeRecipient(email)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => generateReport('excel')}
          className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50"
        >
          Export to Excel
        </button>
        <button
          onClick={() => generateReport('pdf')}
          className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50"
        >
          Export to PDF
        </button>
        <button
          onClick={saveReport}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Report
        </button>
      </div>
    </div>
  );
};

export default CustomReportBuilder; 