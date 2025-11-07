/**
 * Thank You Page Component
 *
 * Displayed after successful form submission via Netlify Forms
 */

import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';

export default function ThankYouPage() {
  return (
    <section className="w-full min-h-screen bg-[#FFEBD0] pt-28 md:pt-32 pb-12 px-6 md:px-8 flex items-center justify-center">
      <SEO
        title="Thank You - McKenna's Cleaning Services"
        description="Thank you for contacting McKenna's Cleaning Services. We'll be in touch soon!"
        noIndex={true}
      />

      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="font-bayon text-4xl md:text-5xl font-bold text-[#2B6B6B] mb-4">
          Thank You!
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          We've received your message and will get back to you within 24 hours.
        </p>

        {/* What's Next Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-8 text-left">
          <h2 className="font-bayon text-xl text-[#2B6B6B] mb-4">What Happens Next?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#17616E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Our team will review your request and check availability</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#17616E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We'll contact you via phone or email to discuss details and pricing</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#17616E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We'll schedule a convenient time for your cleaning service</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-[#17616E] hover:bg-[#2B6B6B] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>

          <Link
            to="/about-us"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#17616E] font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg border-2 border-[#17616E]"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Additional Services */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">
            While you wait, explore our services:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/windowser"
              className="text-sm text-[#17616E] hover:underline font-medium"
            >
              Window Cleaning
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/commercial-cleaning"
              className="text-sm text-[#17616E] hover:underline font-medium"
            >
              Commercial Cleaning
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/residential-cleaning"
              className="text-sm text-[#17616E] hover:underline font-medium"
            >
              Residential Cleaning
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/electrostatic-cleaning"
              className="text-sm text-[#17616E] hover:underline font-medium"
            >
              Electrostatic Spraying
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
