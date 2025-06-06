import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type VendorType = 'Title Company' | 'Signing Service' | 'Lender' | 'Notary Public' | string;

interface ClientFormData {
  // Address Info
  companyName: string;
  fullName: {
    prefix: string;
    first: string;
    middle: string;
  };
  jobTitle: string;
  contactInfo: {
    mainPhone: string;
    workPhone: string;
    mobile: string;
    fax: string;
    mainEmail: string;
    ccEmail: string;
    website: string;
    url1: string;
  };
  addresses: {
    billedFrom: string;
    shippedFrom: string;
  };
  
  // Payment Settings
  accountNo: string;
  creditLimit: string;
  paymentTerms: string;
  billingRateLevel: string;
  printNameOnCheck: string;
  
  // Tax Info
  vendorType: VendorType;
  customFields: Record<string, string>;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('address');
  const [newVendorType, setNewVendorType] = useState('');
  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([
    'Title Company',
    'Signing Service',
    'Lender',
    'Notary Public'
  ]);
  
  const [formData, setFormData] = useState<ClientFormData>({
    companyName: '',
    fullName: { prefix: '', first: '', middle: '' },
    jobTitle: '',
    contactInfo: {
      mainPhone: '',
      workPhone: '',
      mobile: '',
      fax: '',
      mainEmail: '',
      ccEmail: '',
      website: '',
      url1: ''
    },
    addresses: {
      billedFrom: '',
      shippedFrom: ''
    },
    accountNo: '',
    creditLimit: '',
    paymentTerms: '',
    billingRateLevel: '',
    printNameOnCheck: '',
    vendorType: '',
    customFields: {}
  });

  const handleAddNewVendorType = () => {
    if (newVendorType.trim()) {
      setVendorTypes([...vendorTypes, newVendorType.trim()]);
      setFormData({ ...formData, vendorType: newVendorType.trim() });
      setNewVendorType('');
    }
  };

  const tabs = [
    { id: 'address', name: 'Address Info' },
    { id: 'payment', name: 'Payment Settings' },
    { id: 'tax', name: 'Tax Info' },
    { id: 'other', name: 'Other Info' }
  ];

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <div className="p-6">
              <Dialog.Title className="text-lg font-medium mb-4">Add New Client</Dialog.Title>
              
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        py-2 px-1 border-b-2 font-medium text-sm
                        ${activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                      `}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {/* Address Info Tab */}
                {activeTab === 'address' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Prefix</label>
                        <select
                          value={formData.fullName.prefix}
                          onChange={(e) => setFormData({
                            ...formData,
                            fullName: { ...formData.fullName, prefix: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="Mr">Mr.</option>
                          <option value="Mrs">Mrs.</option>
                          <option value="Ms">Ms.</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          value={formData.fullName.first}
                          onChange={(e) => setFormData({
                            ...formData,
                            fullName: { ...formData.fullName, first: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">M.I.</label>
                        <input
                          type="text"
                          maxLength={1}
                          value={formData.fullName.middle}
                          onChange={(e) => setFormData({
                            ...formData,
                            fullName: { ...formData.fullName, middle: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Main Phone</label>
                        <input
                          type="tel"
                          value={formData.contactInfo.mainPhone}
                          onChange={(e) => setFormData({
                            ...formData,
                            contactInfo: { ...formData.contactInfo, mainPhone: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Main Email</label>
                        <input
                          type="email"
                          value={formData.contactInfo.mainEmail}
                          onChange={(e) => setFormData({
                            ...formData,
                            contactInfo: { ...formData.contactInfo, mainEmail: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Billed From Address</label>
                        <textarea
                          value={formData.addresses.billedFrom}
                          onChange={(e) => setFormData({
                            ...formData,
                            addresses: { ...formData.addresses, billedFrom: e.target.value }
                          })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Shipped From Address</label>
                        <textarea
                          value={formData.addresses.shippedFrom}
                          onChange={(e) => setFormData({
                            ...formData,
                            addresses: { ...formData.addresses, shippedFrom: e.target.value }
                          })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Settings Tab */}
                {activeTab === 'payment' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Account No</label>
                        <input
                          type="text"
                          value={formData.accountNo}
                          onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Credit Limit</label>
                        <input
                          type="text"
                          value={formData.creditLimit}
                          onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
                        <select
                          value={formData.paymentTerms}
                          onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="net30">Net 30</option>
                          <option value="net60">Net 60</option>
                          <option value="net90">Net 90</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Billing Rate Level</label>
                        <select
                          value={formData.billingRateLevel}
                          onChange={(e) => setFormData({ ...formData, billingRateLevel: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="standard">Standard</option>
                          <option value="premium">Premium</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Print Name on Check As</label>
                      <input
                        type="text"
                        value={formData.printNameOnCheck}
                        onChange={(e) => setFormData({ ...formData, printNameOnCheck: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Tax Info Tab */}
                {activeTab === 'tax' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vendor Type</label>
                      <div className="flex space-x-2">
                        <select
                          value={formData.vendorType}
                          onChange={(e) => {
                            if (e.target.value === 'add_new') {
                              // Show input for new vendor type
                            } else {
                              setFormData({ ...formData, vendorType: e.target.value });
                            }
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select...</option>
                          {vendorTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                          <option value="add_new">+ Add New</option>
                        </select>
                      </div>
                    </div>

                    {formData.vendorType === 'add_new' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">New Vendor Type</label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newVendorType}
                            onChange={(e) => setNewVendorType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter new vendor type"
                          />
                          <button
                            onClick={handleAddNewVendorType}
                            className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Custom Fields</label>
                      <div className="mt-1 p-4 border border-gray-300 rounded-md">
                        <div className="flex justify-end">
                          <button
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            Define Fields
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Client
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddClientModal; 