import React from 'react';
import TopNavigation from '../components/TopNavigation';

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Integrations</h1>
            
            {/* Integration Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* E-Sign Platforms */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">E-Sign Platforms</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">DocuSign</h3>
                      <p className="text-sm text-gray-600">Electronic signature platform</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">Adobe Sign</h3>
                      <p className="text-sm text-gray-600">Digital document signing</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar & Scheduling */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendar & Scheduling</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">Google Calendar</h3>
                      <p className="text-sm text-gray-600">Calendar synchronization</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">Outlook Calendar</h3>
                      <p className="text-sm text-gray-600">Microsoft calendar integration</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Processing */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Processing</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">Stripe</h3>
                      <p className="text-sm text-gray-600">Payment processing</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">Square</h3>
                      <p className="text-sm text-gray-600">Payment and POS integration</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* API Documentation */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">API Documentation</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  Access our API documentation to build custom integrations with your existing systems.
                </p>
                <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
                  View API Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations; 