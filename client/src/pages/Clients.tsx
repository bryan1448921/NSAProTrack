import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import AddClientModal from '../components/AddClientModal';

const Clients = () => {
  // Mock data - replace with real data later
  const clients = [
    {
      id: '1',
      name: 'Emma Thompson',
      company: 'First Choice Lending',
      email: 'emma.thompson@firstchoice.com',
      phone: '(555) 123-4567',
      type: 'Lender',
      totalOrders: 15,
      lastOrder: '2024-06-01',
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Chen Real Estate Group',
      email: 'mchen@chenrealty.com',
      phone: '(555) 234-5678',
      type: 'Real Estate Agent',
      totalOrders: 28,
      lastOrder: '2024-06-03',
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      company: 'Johnson & Associates',
      email: 'sjohnson@jassociates.com',
      phone: '(555) 345-6789',
      type: 'Title Company',
      totalOrders: 42,
      lastOrder: '2024-06-04',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || client.type === filterType;
    return matchesSearch && matchesType;
  });

  const clientStats = {
    total: clients.length,
    lenders: clients.filter(c => c.type === 'Lender').length,
    agents: clients.filter(c => c.type === 'Real Estate Agent').length,
    titleCompanies: clients.filter(c => c.type === 'Title Company').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Client Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Total Clients</h3>
              <p className="text-3xl font-bold text-blue-600">{clientStats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Lenders</h3>
              <p className="text-3xl font-bold text-green-600">{clientStats.lenders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Real Estate Agents</h3>
              <p className="text-3xl font-bold text-yellow-600">{clientStats.agents}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">Title Companies</h3>
              <p className="text-3xl font-bold text-purple-600">{clientStats.titleCompanies}</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Lender">Lenders</option>
                  <option value="Real Estate Agent">Real Estate Agents</option>
                  <option value="Title Company">Title Companies</option>
                </select>
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 flex-1"
                />
              </div>
              <button
                onClick={() => setIsAddClientModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add New Client
              </button>
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client/Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Order
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.company}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{client.email}</div>
                        <div className="text-sm text-gray-500">{client.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${client.type === 'Lender' ? 'bg-green-100 text-green-800' : ''}
                          ${client.type === 'Real Estate Agent' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${client.type === 'Title Company' ? 'bg-purple-100 text-purple-800' : ''}`}
                        >
                          {client.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {client.totalOrders}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {client.lastOrder}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/clients/${client.id}`}
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
      <AddClientModal 
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
      />
    </div>
  );
};

export default Clients; 