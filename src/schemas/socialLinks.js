/**
 * Social Links Schema
 *
 * Singleton document for social media links
 */

export default {
  name: 'socialLinks',
  title: 'Social Links',
  type: 'document',
  fields: [
    {
      name: 'displaySocials',
      title: 'Display Social Links',
      type: 'boolean',
      description: 'Toggle to show/hide social media links across the site',
      initialValue: true,
    },
    {
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      description: 'Full URL to Facebook page',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full URL to Instagram profile',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'twitter',
      title: 'Twitter/X URL',
      type: 'url',
      description: 'Full URL to Twitter/X profile',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full URL to LinkedIn profile',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Social Media Links',
      };
    },
  },
};
