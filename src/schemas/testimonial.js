/**
 * Testimonial Schema
 *
 * Manages customer reviews and testimonials
 */

export default {
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    {
      name: 'customerName',
      type: 'string',
      title: 'Customer Name',
      description: 'Name of the customer who gave the testimonial',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'reviewText',
      type: 'text',
      title: 'Review Text',
      description: 'The testimonial content',
      rows: 5,
      validation: (Rule) => Rule.required().min(10).max(500),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating (Stars)',
      description: 'Star rating from 1 to 5',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    },
    {
      name: 'reviewDate',
      type: 'date',
      title: 'Review Date',
      description: 'Date when the review was given',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customerPhoto',
      type: 'image',
      title: 'Customer Photo',
      description: 'Optional photo of the customer',
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
    {
      name: 'role',
      type: 'string',
      title: 'Customer Role/Title',
      description: 'Optional role or title (e.g., "Homeowner", "Business Owner")',
    },
    {
      name: 'displayOrder',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first',
      initialValue: 100,
      validation: (Rule) => Rule.integer(),
    },
    {
      name: 'disabled',
      type: 'boolean',
      title: 'Hide Testimonial',
      description: 'Toggle to hide this testimonial from the site',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'reviewText',
      rating: 'rating',
      disabled: 'disabled',
    },
    prepare(selection) {
      const { title, subtitle, rating, disabled } = selection;
      const stars = '⭐'.repeat(rating || 0);
      return {
        title: `${title} ${disabled ? '(Hidden)' : ''}`,
        subtitle: `${stars} - ${subtitle?.substring(0, 60)}...`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Rating (Highest First)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'reviewDate', direction: 'desc' }],
    },
  ],
};
