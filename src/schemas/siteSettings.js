/**
 * Site Settings Schema
 *
 * Singleton document for global site settings like company name,
 * logo, contact information, etc.
 */

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'Full company name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      description: 'Company logo (PNG with transparent background recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        },
      ],
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Primary contact phone number',
      validation: (Rule) =>
        Rule.regex(/^[\d\s\-\(\)]+$/, {
          name: 'phone',
          invert: false,
        }).error('Please enter a valid phone number'),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Primary contact email',
      validation: (Rule) => Rule.email().error('Please enter a valid email address'),
    },
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'text',
      description: 'Operating hours (e.g., "Mon-Fri: 9AM-5PM")',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'logo',
    },
  },
};
