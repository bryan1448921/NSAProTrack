import React from 'react';
import TopNavigation from '../components/TopNavigation';

const Finances = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Financial Management</h1>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Invoice
              </button>
              <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Record Payment
              </button>
              <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Add Expense
              </button>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Outstanding Invoices</h3>
                <p className="text-2xl font-bold text-blue-600">$12,450.00</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Revenue</h3>
                <p className="text-2xl font-bold text-green-600">$8,750.00</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Expenses</h3>
                <p className="text-2xl font-bold text-red-600">$2,180.00</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Net Profit</h3>
                <p className="text-2xl font-bold text-purple-600">$6,570.00</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-06-04</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Loan Signing - John Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Income</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$150.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-06-03</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Office Supplies</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Expense</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">-$45.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances; 