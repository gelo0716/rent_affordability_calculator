import React from 'react';
import Icon from './AppIcon';

const Footer = () => {
  return (
    <footer className="bg-accent text-white">
      {/* Logo Section */}
      <div className="container mx-auto px-4 pt-8 max-w-7xl">
        <div className="flex justify-start mb-8">
          <a
            href="https://www.rentwithclara.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block">
            <img
              src="/assets/images/Screenshot_2025-10-25_at_10.28.11_AM-1761359296591.png"
              alt="Clara logo with keyhole icon"
              className="h-12 w-auto"
            />
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6 text-black">Company</h3>
              <div className="space-y-3">
                <a
                  href="https://www.rentwithclara.com/post/launch-press-release"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  Press
                </a>
                <a
                  href="https://www.rentwithclara.com/partners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  Partners
                </a>
                <a
                  href="https://www.rentwithclara.com/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  Blog
                </a>
              </div>
            </div>

            {/* Customers Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6 text-black">Customers</h3>
              <div className="space-y-3">
                <a
                  href="https://www.rentwithclara.com/portable-rental-application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  For Renters
                </a>
                <a
                  href="https://www.rentwithclara.com/tenant-screening-for-landlords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  For Landlords
                </a>
                <a
                  href="https://www.rentwithclara.com/tenant-screening-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  For Agents
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6 text-black">Product</h3>
              <div className="space-y-3">
                <a
                  href="https://app.rentwithclara.com/auth/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  Sign Up
                </a>
                <a
                  href="https://app.rentwithclara.com/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-800 transition-colors duration-200">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-black/20 mt-12 pt-8">
          <div className="flex items-center justify-center space-x-6">
            <a
              href="https://www.instagram.com/rentwithclara/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-primary rounded-full transition-transform duration-200 hover:scale-110 hover:shadow-lg"
              aria-label="Follow Clara on Instagram">
              <Icon name="Instagram" size={24} color="#FFFFFF" />
            </a>
            <a
              href="https://www.linkedin.com/company/rentwithclara/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-primary rounded-full transition-transform duration-200 hover:scale-110 hover:shadow-lg"
              aria-label="Connect with Clara on LinkedIn">
              <Icon name="Linkedin" size={24} color="#FFFFFF" />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 pt-6 border-t border-black/20">
          <p className="text-sm text-black/80">
            © {new Date()?.getFullYear()} Clara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;