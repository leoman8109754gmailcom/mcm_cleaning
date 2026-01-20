/**
 * Availability Section Component
 *
 * Displays the availability calendar with blocked dates on the homepage.
 * Only renders if there are blocked dates to show.
 */

import React from 'react';
import BlockedDatesCalendar from './components/BlockedDatesCalendar';
import { useAvailabilityCalendar } from './lib/cms/helpers';

export default function AvailabilitySection() {
  const { data: availabilityData, isLoading } = useAvailabilityCalendar();

  // Don't render anything if loading or no blocked dates
  if (isLoading || !availabilityData?.blockedDates || availabilityData.blockedDates.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#FFEBD0] py-12 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <h2 className="font-bayon text-3xl md:text-4xl font-bold text-[#2B6B6B] mb-6 text-center">
          Schedule Your Cleaning
        </h2>

        {/* Availability Notice */}
        {availabilityData.availabilityNotice && (
          <p className="text-base md:text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
            {availabilityData.availabilityNotice}
          </p>
        )}

        {/* Calendar */}
        <BlockedDatesCalendar blockedDates={availabilityData.blockedDates} link="/contact" />
      </div>
    </section>
  );
}
