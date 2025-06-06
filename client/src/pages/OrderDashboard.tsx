import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';

const OrderDashboard = () => {
  // Mock data - replace with real data later
  const orders = [
    {
      id: '1001',
      date: '2024-06-04',
      time: '10:00 AM',
      client: 'Emma Thompson',
      type: 'Loan Signing',
      status: 'Scheduled',
      location: '123 Main St, Anytown, USA',
      fee: 150.00
    },
    {
      id: '1002',
      date: '2024-06-04',
      time: '2:30 PM',
      client: 'Michael Chen',
      type: 'Real Estate Closing',
      status: 'Completed',
      location: '456 Oak Ave, Somewhere, USA',
      fee: 175.00
    },
    {
      id: '1003',
      date: '2024-06-05',
      time: '11:00 AM',
      client: 'Sarah Johnson',
      type: 'HELOC',
      status: 'Pending',
      location: '789 Pine Rd, Elsewhere, USA',
      fee: 125.00
    }
  ];

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const orderStats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'Completed').length,
    scheduled: orders.filter(o => o.status === 'Scheduled').length,
    pending: orders.filter(o => o.status === 'Pending').length
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Order Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
              <p className="text-3xl font-bold text-blue-600">{orderStats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{orderStats.completed}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Scheduled</h3>
              <p className="text-3xl font-bold text-yellow-600">{orderStats.scheduled}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
              <p className="text-3xl font-bold text-purple-600">{orderStats.pending}</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 flex-1"
                />
              </div>
              <Link
                to="/create-order"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create New Order
              </Link>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fee
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.date}<br />
                        <span className="text-gray-500">{order.time}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                          ${order.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${order.status === 'Pending' ? 'bg-purple-100 text-purple-800' : ''}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${order.fee.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/order/${order.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </Link>
                        <button className="text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard; 