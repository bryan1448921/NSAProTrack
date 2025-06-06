import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../styles/watermark.css';
import logo from '../assets/NSAProTrack-logo.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <div className="watermark-container">
      {/* Logo in header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="NSA ProTrack Logo" className="h-12" />
            </Link>
          </div>
        </div>
      </header>

      {/* Watermark */}
      <img src={logo} alt="" className="watermark" aria-hidden="true" />

      {/* Main content */}
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout; 