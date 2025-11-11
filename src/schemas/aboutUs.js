/**
 * About Us Schema (Singleton)
 *
 * Manages content for the About Us page
 */

import { seoFields } from './seoFields';

export default {
  name: 'aboutUs',
  type: 'document',
  title: 'About Us Page',
  fields: [
    {
      name: 'pageTitle',
      type: 'string',
      title: 'Page Title',
      description: 'Main page heading',
      initialValue: 'ABOUT US.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      description: 'Main image displayed at the top of the page',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Accessibility description',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'companyStatement',
      type: 'text',
      title: 'Company Statement',
      description: 'Bold statement about company purpose (left side)',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'experienceStatement',
      type: 'text',
      title: 'Experience Statement',
      description: 'Statement about experience/expertise (right side)',
      rows: 2,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'whatWeDoTitle',
      type: 'string',
      title: '"What We Do" Section Title',
      initialValue: 'What We Do?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'whatWeDoContent',
      type: 'text',
      title: '"What We Do" Content',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ourServicesTitle',
      type: 'string',
      title: '"Our Services" Section Title',
      initialValue: 'Our Services?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ourServicesContent',
      type: 'text',
      title: '"Our Services" Content',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Bottom Image Gallery',
      description: 'Images for the bottom carousel',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Accessibility description',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one gallery image is required'),
    },
    {
      name: 'carouselInterval',
      type: 'number',
      title: 'Carousel Interval (seconds)',
      description: 'Time between image transitions in bottom gallery',
      initialValue: 4,
      validation: (Rule) => Rule.min(1).max(10),
    },
    ...seoFields,
  ],
};
