/**
 * Residential Service Schema (Singleton)
 *
 * Manages content for the residential cleaning service page
 */

import { seoFields } from './seoFields';

export default {
  name: 'residentialService',
  type: 'document',
  title: 'Residential Service',
  fields: [
    {
      name: 'pageTitle',
      type: 'string',
      title: 'Page Title',
      description: 'Main title displayed on the service page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Service description text',
      rows: 4,
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Image Gallery',
      description: 'Images for the service page carousel',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Accessibility description',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional image caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one image is required'),
    },
    {
      name: 'carouselInterval',
      type: 'number',
      title: 'Carousel Interval (seconds)',
      description: 'Time between image transitions',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(10),
    },
    ...seoFields,
  ],
};
