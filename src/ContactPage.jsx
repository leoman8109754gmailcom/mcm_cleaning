/**
 * Contact Page Component
 *
 * Features:
 * - Netlify Functions + Mailgun for contact submissions
 * - CMS-managed content
 * - Blocked dates calendar widget
 * - Contact information display
 */

import React, { useState } from 'react';
import SEO from './components/SEO';
import BlockedDatesCalendar from './components/BlockedDatesCalendar';
import { useContactPage, useSiteSettings } from './lib/cms/helpers';
import { LoadingSkeleton } from './components/LoadingSpinner';

export default function ContactPage() {
  const { data: contactData, isLoading: contactLoading } = useContactPage();
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings();

  const isLoading = contactLoading || settingsLoading;

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDatetime: '',
    message: ''
  });

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'error'
  });

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show notification for 5 seconds
  const notify = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 5000);
  };

  // Clear form
  const clearForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      service: '',
      preferredDatetime: '',
      message: ''
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        notify('Thank you for contacting us! We\'ll get back to you within 24 hours.', 'success');
        clearForm();
      } else {
        notify(data.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      notify('An error occurred. Please try again or contact us directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#FFEBD0] pt-28 md:pt-32 pb-12 px-6 md:px-8">
      <SEO
        title={contactData?.seo?.metaTitle || contactData?.pageTitle}
        description={contactData?.seo?.metaDescription || contactData?.description}
        ogImage={contactData?.seo?.ogImage}
        ogImageAlt={contactData?.seo?.ogImageAlt}
        keywords={contactData?.seo?.keywords}
        noIndex={contactData?.seo?.noIndex}
      />

      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        {isLoading ? (
          <LoadingSkeleton width="300px" height="3rem" className="mb-4" />
        ) : (
          <h1 className="font-bayon text-4xl md:text-5xl font-bold text-[#2B6B6B] mb-4">
            {contactData?.pageTitle || 'Contact Us'}
          </h1>
        )}

        {isLoading ? (
          <LoadingSkeleton width="100%" height="2rem" className="mb-12" />
        ) : (
          <p className="text-lg text-gray-700 mb-12 max-w-2xl">
            {contactData?.description || 'Ready to schedule your cleaning service? Fill out the form below and we\'ll get back to you within 24 hours.'}
          </p>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="font-bayon text-2xl text-[#2B6B6B] mb-6">
              {contactData?.formHeading || 'Request a Quote'}
            </h2>

            {/* Notification */}
            {notification.show && (
              <div
                className={`mb-6 p-4 rounded-lg border-l-4 ${
                  notification.type === 'success'
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : 'bg-red-50 border-red-500 text-red-800'
                }`}
                role="alert"
              >
                <p className="font-medium">{notification.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#17616E] focus:ring-2 focus:ring-[#17616E]/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#17616E] focus:ring-2 focus:ring-[#17616E]/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#17616E] focus:ring-2 focus:ring-[#17616E]/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="(123) 456-7890"
                />
              </div>

              {/* Service Request */}
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Request <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#17616E] focus:ring-2 focus:ring-[#17616E]/20 outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Describe the cleaning service you need..."
                />
              </div>

              {/* Preferred Date/Time */}
              <div>
                <label htmlFor="preferredDatetime" className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date/Time <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="preferredDatetime"
                  name="preferredDatetime"
                  value={form.preferredDatetime}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#17616E] focus:ring-2 focus:ring-[#17616E]/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="e.g., Monday morning, Dec 15 at 10am"
                />
              </div>

              {/* Additional Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Message <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#17616E] focus:ring-2 focus:ring-[#17616E]/20 outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Any additional details or questions..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#17616E] hover:bg-[#2B6B6B] text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Info & Calendar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bayon text-xl text-[#2B6B6B] mb-4">Contact Information</h3>

              <div className="space-y-4">
                {/* Phone */}
                {siteSettings?.phone && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#17616E]/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#17616E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Phone</p>
                      <a href={`tel:${siteSettings.phone}`} className="text-[#17616E] hover:underline">
                        {siteSettings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {siteSettings?.email && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#17616E]/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#17616E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Email</p>
                      <a href={`mailto:${siteSettings.email}`} className="text-[#17616E] hover:underline break-all">
                        {siteSettings.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Business Hours */}
                {siteSettings?.businessHours && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#17616E]/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#17616E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Business Hours</p>
                      <p className="text-gray-600 whitespace-pre-line">{siteSettings.businessHours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Availability Calendar */}
            {contactData?.blockedDates && contactData.blockedDates.length > 0 && (
              <div>
                {contactData?.availabilityNotice && (
                  <p className="text-sm text-gray-600 mb-4">
                    {contactData.availabilityNotice}
                  </p>
                )}
                <BlockedDatesCalendar blockedDates={contactData.blockedDates} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
