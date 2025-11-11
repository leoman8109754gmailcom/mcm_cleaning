/**
 * Reusable SEO Fields
 *
 * Import and spread these fields into any schema that needs SEO support
 */

export const seoFields = [
  {
    name: 'seo',
    type: 'object',
    title: 'SEO Settings',
    description: 'Search engine optimization settings',
    options: {
      collapsible: true,
      collapsed: false,
    },
    fields: [
      {
        name: 'metaTitle',
        type: 'string',
        title: 'Meta Title',
        description: 'SEO title (recommended: 50-60 characters). Leave empty to use page title.',
        validation: (Rule) => Rule.max(60).warning('Meta titles over 60 characters may be truncated in search results'),
      },
      {
        name: 'metaDescription',
        type: 'text',
        title: 'Meta Description',
        description: 'SEO description (recommended: 150-160 characters)',
        rows: 3,
        validation: (Rule) => Rule.max(160).warning('Meta descriptions over 160 characters may be truncated in search results'),
      },
      {
        name: 'ogImage',
        type: 'image',
        title: 'Social Share Image',
        description: 'Image for social media sharing (Open Graph/Twitter Card). Recommended: 1200x630px',
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
        name: 'keywords',
        type: 'array',
        title: 'Focus Keywords',
        description: 'Optional: Main keywords for this page (for internal reference)',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
      },
      {
        name: 'noIndex',
        type: 'boolean',
        title: 'Hide from Search Engines',
        description: 'Enable to prevent search engines from indexing this page',
        initialValue: false,
      },
    ],
  },
];

export default seoFields;
