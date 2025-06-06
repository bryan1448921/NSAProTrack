import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Credentials from './pages/Credentials';
import CreateOrder from './pages/CreateOrder';
import Reports from './pages/Reports';
import Finances from './pages/Finances';
import Integrations from './pages/Integrations';
import NotaryResources from './pages/NotaryResources';
import OrderDashboard from './pages/OrderDashboard';
import Clients from './pages/Clients';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

// Navigation component
const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              NSAProTrack
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-dashboard"
              element={
                <ProtectedRoute>
                  <OrderDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/credentials"
              element={
                <ProtectedRoute>
                  <Credentials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-order"
              element={
                <ProtectedRoute>
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finances"
              element={
                <ProtectedRoute>
                  <Finances />
                </ProtectedRoute>
              }
            />
            <Route
              path="/integrations"
              element={
                <ProtectedRoute>
                  <Integrations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notary-resources"
              element={
                <ProtectedRoute>
                  <NotaryResources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                      <h2 className="text-2xl font-semibold text-gray-600">
                        Welcome to NSAProTrack - Your Signing Order Management System
                      </h2>
                    </div>
                  </div>
                </main>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
