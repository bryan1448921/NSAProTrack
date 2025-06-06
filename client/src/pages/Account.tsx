import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import { Dialog, Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

interface SecurityQuestion {
  question: string;
  answer: string;
}

interface UserProfile {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string | null;
  locationEnabled: boolean;
  securityQuestions: SecurityQuestion[];
  subscription: {
    plan: string;
    status: string;
    nextBillingDate: string;
  };
  paymentMethod: {
    type: string;
    last4: string;
    expiryDate: string;
  };
}

const Account = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    email: 'user@example.com',
    password: '',
    firstName: 'John',
    lastName: 'Doe',
    phone: '(555) 123-4567',
    profileImage: null,
    locationEnabled: true,
    securityQuestions: [
      { question: 'What was your first pet\'s name?', answer: '' },
      { question: 'In what city were you born?', answer: '' },
      { question: 'What was your first car?', answer: '' }
    ],
    subscription: {
      plan: 'Professional',
      status: 'Active',
      nextBillingDate: '2024-07-01'
    },
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
      expiryDate: '12/25'
    }
  });

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload
      console.log('Uploading profile image:', file);
    }
  };

  const handleImportFromNNA = () => {
    setIsImportModalOpen(true);
  };

  const handleNNALogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle NNA login and data import
    console.log('Importing from NNA...');
    setIsImportModalOpen(false);
  };

  const handleContactSupport = () => {
    setIsContactSupportOpen(true);
  };

  const handleSupportSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle support request submission
    console.log('Submitting support request...');
    setIsContactSupportOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Profile Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your NSAProTrack account settings and preferences
                  </p>
                </div>
                <button
                  onClick={handleImportFromNNA}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Import from NNA
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={userProfile.profileImage || '/default-avatar.png'}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover"
                      />
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg cursor-pointer"
                      >
                        <input
                          type="file"
                          id="profile-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                        />
                        <span className="block w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{`${userProfile.firstName} ${userProfile.lastName}`}</h3>
                      <p className="text-gray-500">{userProfile.email}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Security</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Questions */}
              <div className="mt-6">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200">
                        <span>Security Questions</span>
                        <ChevronUpIcon
                          className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div className="space-y-4">
                          {userProfile.securityQuestions.map((qa, index) => (
                            <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Question {index + 1}
                                </label>
                                <select
                                  value={qa.question}
                                  onChange={(e) => {
                                    const newQuestions = [...userProfile.securityQuestions];
                                    newQuestions[index].question = e.target.value;
                                    setUserProfile({ ...userProfile, securityQuestions: newQuestions });
                                  }}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                  <option>What was your first pet's name?</option>
                                  <option>In what city were you born?</option>
                                  <option>What was your first car?</option>
                                  <option>What is your mother's maiden name?</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Answer</label>
                                <input
                                  type="text"
                                  value={qa.answer}
                                  onChange={(e) => {
                                    const newQuestions = [...userProfile.securityQuestions];
                                    newQuestions[index].answer = e.target.value;
                                    setUserProfile({ ...userProfile, securityQuestions: newQuestions });
                                  }}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>

              {/* Location Settings */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Location Settings</h3>
                    <p className="text-sm text-gray-500">Enable or disable location tracking</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.locationEnabled}
                        onChange={(e) => setUserProfile({ ...userProfile, locationEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Subscription & Payment */}
              <div className="mt-6">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200">
                        <span>Subscription & Payment</span>
                        <ChevronUpIcon
                          className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900">Current Plan</h4>
                            <p>{userProfile.subscription.plan}</p>
                            <p>Status: {userProfile.subscription.status}</p>
                            <p>Next billing date: {userProfile.subscription.nextBillingDate}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Payment Method</h4>
                            <p>{userProfile.paymentMethod.type} ending in {userProfile.paymentMethod.last4}</p>
                            <p>Expires: {userProfile.paymentMethod.expiryDate}</p>
                            <button className="mt-2 text-blue-600 hover:text-blue-800">
                              Update payment method
                            </button>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>

              {/* Legal & Support */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={handleContactSupport}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Contact Support
                </button>
                <a
                  href="/privacy-policy"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import from NNA Modal */}
      <Dialog
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-medium mb-4">
              Import from National Notary Association
            </Dialog.Title>
            <form onSubmit={handleNNALogin}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">NNA Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">NNA Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  By proceeding, you authorize NSAProTrack to access your NNA profile information.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Import Profile
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Contact Support Modal */}
      <Dialog
        open={isContactSupportOpen}
        onClose={() => setIsContactSupportOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-medium mb-4">
              Contact Support
            </Dialog.Title>
            <form onSubmit={handleSupportSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsContactSupportOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Account; 