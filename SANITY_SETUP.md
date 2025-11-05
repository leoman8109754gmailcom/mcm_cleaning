# Sanity CMS Setup Guide

This guide will help you set up and configure Sanity CMS for McKenna's Cleaning Services website.

## Architecture Overview

The CMS implementation follows a **4-layer architecture** as defined in `CMS_CONTENT_STRATEGY.md`:

1. **Layer 1: CMS Client** (`src/lib/cms/client.js`) - Handles API communication
2. **Layer 2: Queries Module** (`src/lib/cms/queries.js`) - Defines all GROQ queries
3. **Layer 3: Helper Functions** (`src/lib/cms/helpers.js`) - Provides React Query hooks
4. **Layer 4: Components** - Use hooks to fetch and display data

## Initial Setup

### Step 1: Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign in/sign up
2. Click "Create new project"
3. Choose a project name (e.g., "McKenna's Cleaning CMS")
4. Select a dataset name (recommend: `production`)
5. Choose a region closest to your users
6. Note your **Project ID** - you'll need this next

### Step 2: Configure Environment Variables

1. Copy the `.env.example` file to create `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Sanity credentials in `.env`:
   ```env
   VITE_SANITY_PROJECT_ID=your_actual_project_id
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2024-01-01
   ```

3. (Optional) Get an API token for Studio authentication:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to "API" → "Tokens"
   - Click "Add API token"
   - Give it "Editor" permissions
   - Copy the token and add to `.env`:
     ```env
     SANITY_AUTH_TOKEN=your_token_here
     ```

### Step 3: Deploy Sanity Schemas

Your schemas are already defined locally, but Sanity needs to know about them:

1. In your Sanity project dashboard at [sanity.io/manage](https://sanity.io/manage)
2. Go to your project → "API" → "GraphQL Playground"
3. Or just start the dev server (next step) and access the Studio

### Step 4: Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Step 5: Access Sanity Studio

Navigate to `http://localhost:5173/admin` to access the embedded Sanity Studio.

## Creating Your First Content

### 1. Site Settings (Global Settings)

1. Go to `/admin` in your browser
2. Click "Site Settings" in the left sidebar
3. Fill in:
   - **Company Name**: McKenna's Cleaning Services
   - **Company Logo**: Upload your logo (PNG with transparent background recommended)
   - **Phone Number**: Your business phone
   - **Email Address**: Your business email
   - **Business Hours**: Operating hours (e.g., "Mon-Fri: 9AM-5PM")
4. Click "Publish"

### 2. Navigation

1. Click "Navigation" in the left sidebar
2. Add navigation items by clicking "+ Add item":
   - Label: "About" | Link: `/about-us`
   - Label: "Electrostatic Spraying" | Link: `/electrostatic-cleaning`
   - Label: "Residential Cleaning" | Link: `/residential-cleaning`
   - Label: "Commercial Cleaning" | Link: `/commercial-cleaning`
   - Label: "Window Cleaning" | Link: `/windowser`
3. Toggle "Show Numbering" if you want numbered menu items
4. Click "Publish"

### 3. Social Links

1. Click "Social Links" in the left sidebar
2. Fill in your social media URLs:
   - Facebook: Full URL to your Facebook page
   - Instagram: Full URL to your Instagram profile
   - Twitter/X: (optional)
   - LinkedIn: (optional)
3. Toggle "Display Social Links" to show/hide across the site
4. Click "Publish"

## Verifying the Integration

1. Refresh your main website at `http://localhost:5173`
2. Check that:
   - ✅ Logo appears in navigation and footer
   - ✅ Navigation links match what you entered
   - ✅ Contact info shows in footer
   - ✅ Social media links work
   - ✅ Company name appears in copyright

## Current CMS Coverage (Phase 1)

**What's using CMS data:**
- ✅ TopNav component (logo, navigation links)
- ✅ Footer component (logo, contact info, social links)

**What's still hardcoded (Future phases):**
- Hero section content (title, description, carousel images)
- Service section (service cards and details)
- Testimonials/Reviews
- Service page content (images, descriptions)
- About Us page content

## Troubleshooting

### Issue: "Failed to fetch from Sanity"

**Solution:**
- Check that your `.env` file has the correct `VITE_SANITY_PROJECT_ID`
- Ensure your Sanity project exists at sanity.io/manage
- Verify the dataset name matches (usually `production`)

### Issue: "Cannot connect to Sanity Studio"

**Solution:**
- Make sure you've created the project at sanity.io first
- Check that `/admin` route is working
- Clear browser cache and restart dev server

### Issue: Content not updating

**Solution:**
- Make sure you clicked "Publish" in Sanity Studio (not just "Save")
- Check React Query cache (it caches for 5 minutes by default)
- Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)

### Issue: Images not loading

**Solution:**
- Verify images are published in Sanity Studio
- Check browser console for CORS errors
- Ensure image URLs are being returned in the query (check Network tab)

## Development Tips

### Testing Queries

Use the "Vision" plugin in Sanity Studio:
1. Go to `/admin`
2. Click "Vision" in the top navigation
3. Test GROQ queries from `src/lib/cms/queries.js`

### Clearing React Query Cache

React Query caches data for 5 minutes. To force a refresh:
```javascript
// In browser console:
window.location.reload()
```

Or modify `src/App.jsx` to reduce `staleTime` during development.

### Preview Mode (Future Enhancement)

Currently, the site shows published content only. To add draft preview:
1. Update `src/lib/cms/client.js` to accept a `useCdn: false` option
2. Add draft filtering to queries: `*[_type == "siteSettings" && !(_id in path("drafts.**"))]`
3. Implement preview authentication

## Next Steps

### Phase 2: Services Content
- Create `service` schema for service pages
- Add service cards to ServiceSection
- Migrate service page content (windowser, comcln, etc.)

### Phase 3: Hero & Reviews
- Create `hero` schema for hero section content
- Create `testimonial` schema for customer reviews
- Add carousel image management

### Phase 4: SEO & Metadata
- Add SEO fields to schemas
- Implement dynamic meta tags
- Add Open Graph images

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Content Strategy Document](./CMS_CONTENT_STRATEGY.md)

## Support

If you encounter issues:
1. Check browser console for errors
2. Review Sanity Studio logs
3. Verify environment variables are loaded correctly
4. Check the Network tab to see API requests/responses

---

**Last Updated:** 2025-11-04
**Phase:** 1 - Global Settings (Logo, Navigation, Contact Info, Social Links)
