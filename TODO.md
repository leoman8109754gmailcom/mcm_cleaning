# McKenna's Cleaning Services - CMS Implementation TODO

**Branch:** `axolotlpi-dev`
**Goal:** Add Sanity CMS to the site for content management

---

## ✅ Completed

### Phase 1: Foundation & Global Settings
- [x] Install Sanity CMS and React Query dependencies
- [x] Set up environment variables (`.env.example` created)
- [x] Create 4-layer CMS architecture:
  - [x] Layer 1: CMS Client (`src/lib/cms/client.js`)
  - [x] Layer 2: Queries Module (`src/lib/cms/queries.js`)
  - [x] Layer 3: Helper Functions & React Query Hooks (`src/lib/cms/helpers.js`)
  - [x] Layer 4: Component Integration
- [x] Set up embedded Sanity Studio at `/admin` route
- [x] Create LoadingSpinner components for loading states

### Phase 2: Global Content
- [x] **Site Settings Schema** - Company name, logo, contact info, business hours
- [x] **Navigation Schema** - Main nav links with disabled toggle
- [x] **Social Links Schema** - Facebook, Instagram, Twitter, LinkedIn with display toggle
- [x] Integrate TopNav component with CMS (logo, navigation, social links)
- [x] Integrate Footer component with CMS (logo, contact info, social links)
- [x] Remove navigation numbering option (simplified schema)
- [x] Add disabled toggle to navigation items

### Phase 3: Hero Section
- [x] **Hero Schema** - Title, description, CTA button, carousel images, carousel interval
- [x] Integrate HeroSection component with CMS
- [x] Support for dynamic carousel images and intervals
- [x] Multi-line title support

### Phase 4: Services System
- [x] **Individual Service Schemas** - 4 singleton schemas for each service:
  - [x] Window Service Schema (pageTitle, description, gallery, carouselInterval)
  - [x] Commercial Service Schema (pageTitle, description, gallery, carouselInterval)
  - [x] Residential Service Schema (pageTitle, description, gallery, carouselInterval)
  - [x] Electrostatic Service Schema (pageTitle, description, gallery, carouselInterval)
- [x] Create individual service queries for each service type
- [x] Create React Query hooks for each service (useWindowService, useCommercialService, etc.)
- [x] Integrate windowser.jsx with Window Service CMS data
- [x] Integrate comcln.jsx with Commercial Service CMS data
- [x] Integrate rescln.jsx with Residential Service CMS data
- [x] Integrate electcln.jsx with Electrostatic Service CMS data
- [x] Keep hardcoded service array in ServiceSection component for homepage
- [x] Individual routes maintained (/windowser, /commercial-cleaning, /residential-cleaning, /electrostatic-cleaning)
- [x] Update Sanity Studio structure to include all 4 service singletons
- [x] All service pages support CMS data with fallback to hardcoded values
### Phase 5: Testimonials/Reviews
- [x] Create **Testimonial Schema**:
  - [x] Customer name
  - [x] Review text
  - [x] Rating (stars)
  - [x] Date
  - [x] Optional customer photo
  - [x] Customer role/title
  - [x] Display order
  - [x] Disabled toggle
- [x] Add testimonial queries and hooks (testimonialsQuery, useTestimonials)
- [x] Integrate Reviews component with CMS data
- [x] Add star rating display to testimonials
- [x] Replace hardcoded Lorem ipsum with CMS testimonials (with fallback support)
- [x] Update Sanity Studio config with testimonials collection

---

## 🚧 In Progress

Nothing currently in progress.

---

## 📋 Planned

### Phase 6: About Us Page
- [ ] Create **About Us Schema**:
  - [ ] Page title
  - [ ] Main content/description
  - [ ] Team section (optional)
  - [ ] Mission statement
  - [ ] Image gallery
- [ ] Integrate AboutUsPage component with CMS

### Phase 7: SEO & Metadata
- [ ] Add SEO fields to existing schemas:
  - [ ] Meta title
  - [ ] Meta description
  - [ ] Open Graph image
- [ ] Create dynamic meta tags component
- [ ] Integrate with React Helmet or similar

### Phase 8: Additional Features (Nice to Have)
- [ ] Availability Calendar for scheduling
- [ ] Payment portal link to square
- [ ] Contact form schema (if adding contact form)
- [ ] Blog/News section (if needed)
- [ ] Image optimization settings
- [ ] Preview/Draft mode for content
- [ ] Webhooks for automated deployments on content changes

---

## 🎯 Current CMS Coverage

| Section | Status | Editable in CMS |
|---------|--------|----------------|
| **Global Settings** | ✅ Complete | Logo, company name, contact info |
| **Navigation** | ✅ Complete | Nav links, social links, hide/show items |
| **Hero Section** | ✅ Complete | Title, description, carousel images, CTA |
| **Services** | ✅ Complete | Individual service page content (4 singleton schemas) |
| **Reviews/Testimonials** | ✅ Complete | Customer reviews with ratings, photos, display order |
| **About Us** | 📋 Planned | - |
| **SEO/Meta** | 📋 Planned | - |

---

## 📝 Notes

### Architecture Benefits
- **4-Layer Architecture:** Separation of concerns makes code maintainable and testable
- **React Query:** Automatic caching, loading states, error handling
- **Individual Service Schemas:** Structured content management for each service type
- **Fallback Support:** Site works even if CMS fails to load

### Deployment Checklist (When Ready)
- [ ] Set up production Sanity project
- [ ] Configure environment variables in deployment platform
- [ ] Deploy Sanity Studio (embedded at `/admin` or separate)
- [ ] Test all CMS integrations in production
- [ ] Set up CORS for Sanity API
- [ ] Configure image CDN optimization

### Documentation
- ✅ `SANITY_SETUP.md` - Complete setup guide for Sanity CMS
- ✅ `CMS_CONTENT_STRATEGY.md` - Architecture documentation
- ✅ `CLAUDE.md` - Project overview and dev instructions

---

**Last Updated:** 2025-11-05
**Current Phase:** Phase 6 - About Us Page (Next Up)
