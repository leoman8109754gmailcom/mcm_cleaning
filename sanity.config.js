/**
 * Sanity Studio Configuration
 *
 * This configuration file sets up the embedded Sanity Studio
 * that will be accessible at /admin route
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemas';

export default defineConfig({
  name: 'default',
  title: "McKenna's Cleaning Services CMS",

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton documents (settings)
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Navigation')
              .id('navigation')
              .child(
                S.document()
                  .schemaType('navigation')
                  .documentId('navigation')
              ),
            S.listItem()
              .title('Social Links')
              .id('socialLinks')
              .child(
                S.document()
                  .schemaType('socialLinks')
                  .documentId('socialLinks')
              ),
            S.listItem()
              .title('Hero Section')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.divider(),
            // Future content types will appear below
            ...S.documentTypeListItems().filter(
              (item) => !['siteSettings', 'navigation', 'socialLinks', 'hero'].includes(item.getId())
            ),
          ]),
    }),
    visionTool(), // GROQ query testing tool
  ],

  schema: {
    types: schemaTypes,
  },
});
