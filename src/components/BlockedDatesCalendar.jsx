/**
 * Blocked Dates Calendar Component
 *
 * Displays a calendar widget showing unavailable dates
 * Supports showing current month + next 2 months
 * Optional link prop makes the entire calendar clickable
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function BlockedDatesCalendar({ blockedDates = [], link = null, clickable = true }) {
  const navigate = useNavigate();
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  // Get the current date and calculate displayed month
  const today = new Date();
  const displayDate = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);

  const monthName = displayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get days in month
  const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();

  // Check if a date is blocked
  const isDateBlocked = (day) => {
    const dateToCheck = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);

    return blockedDates.some((range) => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);

      // Set times to midnight for accurate comparison
      dateToCheck.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      return dateToCheck >= startDate && dateToCheck <= endDate;
    });
  };

  // Get reason for blocked date (if any)
  const getBlockedReason = (day) => {
    const dateToCheck = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);

    const blockedRange = blockedDates.find((range) => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);

      dateToCheck.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      return dateToCheck >= startDate && dateToCheck <= endDate;
    });

    return blockedRange?.reason || 'Unavailable';
  };

  // Check if a date is today
  const isToday = (day) => {
    const checkDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    return checkDate.toDateString() === today.toDateString();
  };

  // Check if a date is in the past
  const isPast = (day) => {
    const checkDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    checkDate.setHours(23, 59, 59, 999);
    return checkDate < today;
  };

  // Generate calendar grid
  const calendarDays = [];

  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="aspect-square"></div>);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const blocked = isDateBlocked(day);
    const today = isToday(day);
    const past = isPast(day);
    const reason = blocked ? getBlockedReason(day) : null;

    calendarDays.push(
      <div
        key={day}
        className={`
          aspect-square flex items-center justify-center rounded-lg text-sm font-medium
          transition-colors relative group
          ${blocked
            ? `bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200 ${clickable ? 'active:bg-red-300' : ''}`
            : past
            ? `text-gray-400 hover:bg-gray-50 ${clickable ? 'active:bg-gray-100' : ''}`
            : `text-gray-700 hover:bg-gray-100 ${clickable ? 'active:bg-gray-200' : ''}`
          }
          ${today && !blocked ? 'ring-2 ring-[#17616E]' : ''}
          ${link ? 'cursor-pointer' : 'cursor-default'}
        `}
        title={blocked ? reason : ''}
      >
        {day}
        {blocked && reason && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
            {reason}
          </div>
        )}
      </div>
    );
  }

  // Handle click on calendar
  const handleCalendarClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 ${link ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={handleCalendarClick}
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonthOffset(Math.max(-1, currentMonthOffset - 1))}
          disabled={currentMonthOffset <= 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="font-bayon text-lg text-[#2B6B6B]">{monthName}</h3>

        <button
          onClick={() => setCurrentMonthOffset(Math.min(2, currentMonthOffset + 1))}
          disabled={currentMonthOffset >= 2}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 ring-2 ring-[#17616E] rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

BlockedDatesCalendar.propTypes = {
  blockedDates: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      reason: PropTypes.string,
    })
  ),
  link: PropTypes.string,
  clickable: PropTypes.bool,
};
