import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Mock data - replace with real data later
  const accountingData = {
    openInvoices: 2500.00,
    pastDueInvoices: { count: 3, amount: 1200.00 },
    mtdRevenue: 8500.00,
    mtdExpenses: 3200.00,
    ytdRevenue: 95000.00,
    ytdExpenses: 42000.00,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Mock recent signings data
  const recentSignings = [
    { id: '1001', date: '2024-06-04', signer: 'Emma Thompson', type: 'Refinance', amount: 450.00 },
    { id: '1002', date: '2024-06-03', signer: 'Michael Chen', type: 'Purchase', amount: 550.00 },
    { id: '1003', date: '2024-06-02', signer: 'Sarah Johnson', type: 'HELOC', amount: 350.00 },
    { id: '1004', date: '2024-06-01', signer: 'David Wilson', type: 'Refinance', amount: 450.00 },
    { id: '1005', date: '2024-05-31', signer: 'Lisa Brown', type: 'Purchase', amount: 550.00 },
    { id: '1006', date: '2024-05-30', signer: 'James Davis', type: 'Refinance', amount: 450.00 },
    { id: '1007', date: '2024-05-29', signer: 'Maria Garcia', type: 'HELOC', amount: 350.00 },
    { id: '1008', date: '2024-05-28', signer: 'Robert Taylor', type: 'Purchase', amount: 550.00 },
    { id: '1009', date: '2024-05-27', signer: 'Jennifer Lee', type: 'Refinance', amount: 450.00 },
    { id: '1010', date: '2024-05-26', signer: 'William Moore', type: 'Purchase', amount: 550.00 },
  ];

  // Generate calendar data for the next 7 days
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return days;
  };

  // Mock appointments mapped to specific days
  const appointmentsByDate: { [key: string]: Array<{ time: string; client: string; type: string }> } = {
    '2024-06-05': [
      { time: '10:00 AM', client: 'John Doe', type: 'Loan Signing' },
      { time: '2:00 PM', client: 'Alice Smith', type: 'Real Estate Closing' },
    ],
    '2024-06-06': [
      { time: '11:30 AM', client: 'Bob Johnson', type: 'HELOC Signing' },
    ],
    '2024-06-07': [
      { time: '3:00 PM', client: 'Carol White', type: 'Refinance Signing' },
    ],
  };

  const calendarDays = generateCalendarDays();

  // Mock reminders - replace with real data later
  const criticalReminders = [
    { type: 'Notary Commission', dueDate: '2024-08-15', status: 'Expires in 70 days' },
    { type: 'E&O Insurance', dueDate: '2024-07-01', status: 'Expires in 25 days' },
    { type: 'Business License', dueDate: '2024-12-31', status: 'Due in 180 days' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Accounting Overview Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Accounting Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800">Open Invoices</h3>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(accountingData.openInvoices)}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800">Past Due Invoices</h3>
                <p className="text-2xl font-bold text-red-900">
                  {accountingData.pastDueInvoices.count} ({formatCurrency(accountingData.pastDueInvoices.amount)})
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg col-span-2">
                <h3 className="text-sm font-semibold text-green-800">Month-to-Date</h3>
                <p className="text-lg font-bold text-green-900">
                  Revenue: {formatCurrency(accountingData.mtdRevenue)}<br />
                  Expenses: {formatCurrency(accountingData.mtdExpenses)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg col-span-2">
                <h3 className="text-sm font-semibold text-purple-800">Year-to-Date</h3>
                <p className="text-lg font-bold text-purple-900">
                  Revenue: {formatCurrency(accountingData.ytdRevenue)}<br />
                  Expenses: {formatCurrency(accountingData.ytdExpenses)}
                </p>
              </div>
            </div>
          </div>

          {/* Main Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Signings */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Signings</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Signer</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Type</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSignings.map((signing) => (
                      <tr key={signing.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-600">{signing.date}</td>
                        <td className="px-4 py-2">
                          <Link 
                            to={`/order/${signing.id}`} 
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {signing.signer}
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">{signing.type}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-right">
                          {formatCurrency(signing.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Calendar */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const dateStr = day.date.toISOString().split('T')[0];
                  const dayAppointments = appointmentsByDate[dateStr] || [];
                  const isToday = new Date().toDateString() === day.date.toDateString();

                  return (
                    <div
                      key={index}
                      className={`border rounded-lg p-2 min-h-[120px] ${
                        isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`text-center mb-2 ${isToday ? 'text-blue-800' : 'text-gray-600'}`}>
                        <div className="text-sm font-semibold">{day.dayName}</div>
                        <div className="text-lg font-bold">{day.dayNumber}</div>
                        <div className="text-xs">{day.month}</div>
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.map((apt, aptIndex) => (
                          <div
                            key={aptIndex}
                            className="text-xs p-1 bg-white rounded border border-gray-200 shadow-sm"
                          >
                            <div className="font-semibold">{apt.time}</div>
                            <div className="truncate">{apt.client}</div>
                            <div className="text-gray-500 truncate">{apt.type}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Critical Reminders */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Critical Reminders</h2>
              <div className="space-y-4">
                {criticalReminders.map((reminder, index) => (
                  <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                    <p className="font-semibold text-gray-900">{reminder.type}</p>
                    <p className="text-sm text-gray-600">Due: {reminder.dueDate}</p>
                    <p className="text-sm text-yellow-600">{reminder.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 