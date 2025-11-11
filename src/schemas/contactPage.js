/**
 * Contact Page Schema (Singleton)
 *
 * Manages content for the contact page including form settings,
 * blocked dates, and availability information
 */

import { seoFields } from './seoFields';

export default {
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  fields: [
    {
      name: 'pageTitle',
      type: 'string',
      title: 'Page Title',
      description: 'Main heading for the contact page',
      initialValue: 'Contact Us',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Page Description',
      description: 'Introduction text explaining how to get in touch',
      rows: 3,
      initialValue: 'Ready to schedule your cleaning service? Fill out the form below and we\'ll get back to you within 24 hours.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'formHeading',
      type: 'string',
      title: 'Form Section Heading',
      description: 'Heading displayed above the contact form',
      initialValue: 'Request a Quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'availabilityNotice',
      type: 'text',
      title: 'Availability Notice',
      description: 'Text shown above the blocked dates calendar',
      rows: 2,
      initialValue: 'Please note: We are unavailable on the dates highlighted below. We\'ll work with you to find the best time for your service.',
    },
    {
      name: 'blockedDates',
      type: 'array',
      title: 'Blocked Dates',
      description: 'Date ranges when the business is unavailable',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'startDate',
              type: 'date',
              title: 'Start Date',
              description: 'First day of unavailability',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'endDate',
              type: 'date',
              title: 'End Date',
              description: 'Last day of unavailability (can be same as start date)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'reason',
              type: 'string',
              title: 'Reason (Optional)',
              description: 'Optional label (e.g., "Holiday", "Vacation")',
            },
          ],
          preview: {
            select: {
              start: 'startDate',
              end: 'endDate',
              reason: 'reason',
            },
            prepare({ start, end, reason }) {
              const title = reason || 'Blocked Dates';
              const subtitle = start === end
                ? start
                : `${start} to ${end}`;
              return {
                title,
                subtitle,
              };
            },
          },
        },
      ],
    },
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'pageTitle',
    },
  },
};
