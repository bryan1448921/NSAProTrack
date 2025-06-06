import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';

interface OrderFormData {
  fileNumber: string;
  signingType: 'Purchase' | 'Refinance' | 'HELOC' | 'Other';
  fee: number;
  appointment: {
    date: string;
    time: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  signer: {
    name: string;
    email: string;
    phone: string;
    language: string;
  };
  pointOfContact: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  instructions: string;
  additionalInstructions: string;
}

const initialFormData: OrderFormData = {
  fileNumber: '',
  signingType: 'Purchase',
  fee: 0,
  appointment: {
    date: '',
    time: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  signer: {
    name: '',
    email: '',
    phone: '',
    language: 'English',
  },
  pointOfContact: {
    name: '',
    email: '',
    phone: '',
    company: '',
  },
  instructions: '',
  additionalInstructions: '',
};

const CreateOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');

    setFormData(prev => {
      const newData = { ...prev };

      if (nameParts.length === 1) {
        newData[name as keyof OrderFormData] = value;
      } else if (nameParts.length === 2) {
        const [section, field] = nameParts;
        newData[section as keyof OrderFormData] = {
          ...newData[section as keyof OrderFormData],
          [field]: value
        };
      } else if (nameParts.length === 3) {
        const [section, subsection, field] = nameParts;
        const sectionKey = section as keyof OrderFormData;
        newData[sectionKey] = {
          ...newData[sectionKey],
          [subsection]: {
            ...((newData[sectionKey] as any)[subsection] || {}),
            [field]: value
          }
        };
      }

      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      navigate('/order-dashboard', { state: { message: 'Order created successfully!' } });
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Order</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">File Number</label>
                  <input
                    type="text"
                    name="fileNumber"
                    value={formData.fileNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Signing Type</label>
                  <select
                    name="signingType"
                    value={formData.signingType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Purchase">Purchase</option>
                    <option value="Refinance">Refinance</option>
                    <option value="HELOC">HELOC</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Fee ($)</label>
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Appointment Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      name="appointment.date"
                      value={formData.appointment.date}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      name="appointment.time"
                      value={formData.appointment.time}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="appointment.address.street"
                    value={formData.appointment.address.street}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="appointment.address.city"
                      value={formData.appointment.address.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="appointment.address.state"
                      value={formData.appointment.address.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="appointment.address.zipCode"
                      value={formData.appointment.address.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Signer Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Signer Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="signer.name"
                      value={formData.signer.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <input
                      type="text"
                      name="signer.language"
                      value={formData.signer.language}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="signer.email"
                      value={formData.signer.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="signer.phone"
                      value={formData.signer.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Point of Contact */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Point of Contact</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="pointOfContact.name"
                      value={formData.pointOfContact.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      name="pointOfContact.company"
                      value={formData.pointOfContact.company}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="pointOfContact.email"
                      value={formData.pointOfContact.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="pointOfContact.phone"
                      value={formData.pointOfContact.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Instructions</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Primary Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Instructions</label>
                  <textarea
                    name="additionalInstructions"
                    value={formData.additionalInstructions}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/order-dashboard')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isSubmitting ? 'Creating...' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder; 