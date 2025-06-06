import React, { useState, ReactElement } from 'react';
import TopNavigation from '../components/TopNavigation';
import CustomReportBuilder from '../components/CustomReportBuilder';

type TabType = 'standard' | 'custom';

const Reports = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<TabType>('standard');

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="bg-white shadow-lg rounded-lg mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('standard')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${activeTab === 'standard'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  Standard Reports
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${activeTab === 'custom'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  Custom Reports
                </button>
              </nav>
            </div>
          </div>

          {/* Standard Reports */}
          {activeTab === 'standard' && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Standard Reports</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Financial Reports</h2>
                  <ul className="space-y-2">
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Monthly Revenue Report</li>
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Quarterly Performance</li>
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Annual Summary</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Signing Reports</h2>
                  <ul className="space-y-2">
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Signing Volume Analysis</li>
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Client Distribution</li>
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Service Type Breakdown</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Saved Reports</h2>
                  <ul className="space-y-2">
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Last Month's Activity</li>
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">Top Clients Report</li>
                    <li className="text-blue-600 hover:text-blue-800 cursor-pointer">ROI Analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Custom Report Builder */}
          {activeTab === 'custom' && <CustomReportBuilder />}
        </div>
      </div>
    </div>
  );
};

export default Reports; 