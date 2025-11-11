/**
 * Navigation Schema
 *
 * Singleton document for site navigation structure
 */

export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      description: 'Main navigation menu items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Text displayed in navigation',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'URL or path (e.g., "/about", "#services", "https://...")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isExternal',
              title: 'External Link',
              type: 'boolean',
              description: 'Check if this link goes to an external website',
              initialValue: false,
            },
            {
              name: 'disabled',
              title: 'Disabled',
              type: 'boolean',
              description: 'Hide this menu item from navigation',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Menu',
      };
    },
  },
};
