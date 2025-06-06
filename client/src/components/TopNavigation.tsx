import React from 'react';
import { Link } from 'react-router-dom';

const TopNavigation = () => {
  return (
    <div className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex space-x-4 items-center overflow-x-auto">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/order-dashboard"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Order Dashboard
            </Link>
            <Link
              to="/clients"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Clients
            </Link>
            <Link
              to="/reports"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Reports
            </Link>
            <Link
              to="/finances"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Finances
            </Link>
            <Link
              to="/integrations"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Integrations
            </Link>
            <Link
              to="/notary-resources"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Notary Resources
            </Link>
            <Link
              to="/account"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Account
            </Link>
            <Link
              to="/credentials"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Manage Credentials
            </Link>
            <Link
              to="/create-order"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Create New Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation; 