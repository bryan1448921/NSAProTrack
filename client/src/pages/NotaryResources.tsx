import React from 'react';
import TopNavigation from '../components/TopNavigation';

const NotaryResources = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Notary Resources</h1>

            {/* Resource Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Forms & Documents */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Forms & Documents</h2>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      Notary Journal Template
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      Fee Schedule Template
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      Signing Agent Checklist
                    </a>
                  </li>
                </ul>
              </div>

              {/* E-Books & Guides */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">E-Books & Guides</h2>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Loan Signing Agent Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Business Growth Strategies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Marketing for Notaries
                    </a>
                  </li>
                </ul>
              </div>

              {/* External Resources */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">External Resources</h2>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      National Notary Association
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      State Notary Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      Certification Programs
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Training Videos Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Training Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-3"></div>
                  <h3 className="font-semibold">Loan Document Overview</h3>
                  <p className="text-sm text-gray-600">Learn about common loan documents</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-3"></div>
                  <h3 className="font-semibold">Mobile Notary Best Practices</h3>
                  <p className="text-sm text-gray-600">Tips for mobile notary success</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-3"></div>
                  <h3 className="font-semibold">E-Notarization Guide</h3>
                  <p className="text-sm text-gray-600">Getting started with e-notarization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaryResources; 