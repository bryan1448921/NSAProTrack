import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

interface CredentialSection {
  id: string;
  title: string;
  fields: {
    state?: boolean;
    commissionNumber?: boolean;
    expirationDate?: boolean;
    policyNumber?: boolean;
    amount?: boolean;
    url?: boolean;
    issueDate?: boolean;
    company?: boolean;
  };
  documents: {
    name: string | null;
    url: string | null;
  }[];
}

interface OnlineCredential {
  platform: string;
  url: string;
  username: string;
  password: string;
  twoFactorPhone: string;
  securityQuestions: {
    question: string;
    answer: string;
  }[];
}

const Credentials = () => {
  const [sections] = useState<CredentialSection[]>([
    {
      id: 'w9',
      title: 'W-9 Info',
      fields: {},
      documents: [{ name: null, url: null }]
    },
    {
      id: 'notary-commission',
      title: 'Notary Commission',
      fields: {
        state: true,
        commissionNumber: true,
        expirationDate: true,
        url: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'e-notary',
      title: 'e-Notary Commission',
      fields: {
        state: true,
        commissionNumber: true,
        expirationDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'bond',
      title: 'Bond Info',
      fields: {
        policyNumber: true,
        amount: true,
        expirationDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'insurance',
      title: 'Errors & Omissions Insurance',
      fields: {
        company: true,
        policyNumber: true,
        amount: true,
        expirationDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'background-check',
      title: 'Background Check',
      fields: {
        company: true,
        issueDate: true,
        url: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'title-producer',
      title: 'Title Producer License',
      fields: {
        state: true,
        commissionNumber: true,
        expirationDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'ron-platform',
      title: 'RON Platform Certification',
      fields: {
        issueDate: true,
        expirationDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'loan-signing',
      title: 'Loan Signing System Certificate',
      fields: {
        issueDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'notary2pro',
      title: 'Notary 2 Pro Certificate',
      fields: {
        issueDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: '123notary',
      title: '123 Notary Certificate',
      fields: {
        issueDate: true
      },
      documents: [{ name: null, url: null }]
    },
    {
      id: 'other-certs',
      title: 'Other Certifications',
      fields: {},
      documents: [{ name: null, url: null }]
    }
  ]);

  const [onlineCredentials] = useState<OnlineCredential[]>([
    {
      platform: 'SigningOrder.com',
      url: 'https://signingorder.com',
      username: '',
      password: '',
      twoFactorPhone: '',
      securityQuestions: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    },
    {
      platform: 'Snapdocs.com',
      url: 'https://snapdocs.com',
      username: '',
      password: '',
      twoFactorPhone: '',
      securityQuestions: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    },
    {
      platform: 'NationalNotary.org',
      url: 'https://nationalnotary.org',
      username: '',
      password: '',
      twoFactorPhone: '',
      securityQuestions: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    },
    {
      platform: 'FieldChoice.com',
      url: 'https://fieldchoice.com',
      username: '',
      password: '',
      twoFactorPhone: '',
      securityQuestions: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    }
  ]);

  const handleFileUpload = (sectionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log(`Uploading file for section ${sectionId}:`, file);
    }
  };

  const handleDelete = (sectionId: string) => {
    // Handle document deletion logic here
    console.log(`Deleting document for section ${sectionId}`);
  };

  const handleFieldChange = (value: string, field: string) => {
    // Handle field change with auto-save logic here
    console.log(`Field ${field} changed to:`, value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Credentials Sections */}
          <div className="space-y-4">
            {sections.map((section) => (
              <Disclosure key={section.id}>
                {({ open }) => (
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <Disclosure.Button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center">
                      <span className="text-lg font-medium">{section.title}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="p-4 space-y-4">
                      {/* Fields based on section configuration */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.fields.state && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <input
                              type="text"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'state')}
                            />
                          </div>
                        )}
                        {section.fields.commissionNumber && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Commission Number</label>
                            <input
                              type="text"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'commissionNumber')}
                            />
                          </div>
                        )}
                        {section.fields.expirationDate && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                            <input
                              type="date"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'expirationDate')}
                            />
                          </div>
                        )}
                        {section.fields.policyNumber && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Policy Number</label>
                            <input
                              type="text"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'policyNumber')}
                            />
                          </div>
                        )}
                        {section.fields.amount && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input
                              type="number"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'amount')}
                            />
                          </div>
                        )}
                        {section.fields.url && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">URL</label>
                            <input
                              type="url"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'url')}
                            />
                          </div>
                        )}
                        {section.fields.issueDate && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                            <input
                              type="date"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'issueDate')}
                            />
                          </div>
                        )}
                        {section.fields.company && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                              type="text"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={(e) => handleFieldChange(e.target.value, 'company')}
                            />
                          </div>
                        )}
                      </div>

                      {/* Document Upload */}
                      <div className="flex items-center space-x-4">
                        <div>
                          <input
                            type="file"
                            id={`file-${section.id}`}
                            className="hidden"
                            onChange={(e) => handleFileUpload(section.id, e)}
                          />
                          <label
                            htmlFor={`file-${section.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                          >
                            Upload Document
                          </label>
                        </div>
                        {section.documents[0]?.name && (
                          <div className="flex items-center space-x-2">
                            <a
                              href={section.documents[0].url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {section.documents[0].name}
                            </a>
                            <button
                              onClick={() => handleDelete(section.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>

          {/* Online Credentials Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Online Platform Credentials</h2>
            <div className="space-y-6">
              {onlineCredentials.map((platform, index) => (
                <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                  <h3 className="text-lg font-medium mb-3">{platform.platform}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Username</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={platform.username}
                        onChange={(e) => handleFieldChange(e.target.value, `${platform.platform}-username`)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={platform.password}
                        onChange={(e) => handleFieldChange(e.target.value, `${platform.platform}-password`)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Two-Factor Phone</label>
                      <input
                        type="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={platform.twoFactorPhone}
                        onChange={(e) => handleFieldChange(e.target.value, `${platform.platform}-2fa`)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Security Questions</h4>
                    {platform.securityQuestions.map((qa, qaIndex) => (
                      <div key={qaIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <input
                            type="text"
                            placeholder="Question"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={qa.question}
                            onChange={(e) => handleFieldChange(e.target.value, `${platform.platform}-q${qaIndex + 1}`)}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Answer"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={qa.answer}
                            onChange={(e) => handleFieldChange(e.target.value, `${platform.platform}-a${qaIndex + 1}`)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials; 