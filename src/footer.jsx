import React from 'react';
import Logo from './assets/brand-logo.png'

function Footer() {
  return (
    <footer className="w-full bg-[#E1D9C6] py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={Logo} 
              alt="McKenna's Cleaning Logo" 
              className="h-20 md:h-32 w-auto"
            />
          </div>

          {/* Contact Info & Social Media Section */}
          <div className="flex flex-col items-center gap-6">
            {/* Contact Information */}
            <div className="text-center space-y-2">
              <h3 className="font-bayon text-2xl md:text-3xl font-bold text-[#17616E] mb-3">Contact</h3>
              <p className="font-bayon text-lg md:text-xl text-[#17616E] font-light">
                T: 000-000-0000
              </p>
              <p className="font-bayon text-lg md:text-xl text-[#17616E] font-light">
                E: example@fakemail.com
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-6 items-center">
              <a 
                href="https://www.facebook.com/p/McKennas-Cleaning-and-Maintenance-100083267046299/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Visit our Facebook page"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#6B7280] flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
              
              <a 
                href="https://www.instagram.com/mcm_office_cleaning/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Visit our Instagram page"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#6B7280] flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Book Your Cleaning Section */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className=" font-bayon text-3xl md:text-4xl font-bold text-[#2B6B6B] text-center md:text-right leading-tight">
              Book Your<br />Cleaning Here
            </h3>
            <a 
              href="#contact"
              className="font-bayon bg-[#17616E] text-[#EA892C] px-10 py-4 rounded-lg text-2xl font-medium hover:bg-[#144848] transition-colors uppercase tracking-wide"
            >
              CONTACT
            </a>
          </div>

        </div>

        {/* Optional Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-gray-400">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} McKenna's Cleaning Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;