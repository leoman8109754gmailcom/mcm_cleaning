/**
 * Hero Section Schema
 *
 * Singleton document for hero section content including title,
 * description, CTA, and carousel images
 */

import { seoFields } from './seoFields';

export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline displayed in the hero section',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Hero description or tagline (supports line breaks)',
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text displayed on the call-to-action button',
      initialValue: 'CONTACT',
      validation: (Rule) => Rule.required().max(30),
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'URL or anchor link for the CTA button (e.g., "#contact", "/contact")',
      initialValue: '#contact',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'carouselImages',
      title: 'Carousel Images',
      type: 'array',
      description: 'Images that rotate in the hero carousel',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    },
    {
      name: 'carouselInterval',
      title: 'Carousel Interval (seconds)',
      type: 'number',
      description: 'Time in seconds between image transitions',
      initialValue: 3,
      validation: (Rule) => Rule.required().min(1).max(30),
    },
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'carouselImages.0',
    },
  },
};
