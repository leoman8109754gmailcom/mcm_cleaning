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

### Phase 6: About Us Page
- [x] Create **About Us Schema**:
  - [x] Page title
  - [x] Hero image
  - [x] Company statement (bold purpose statement)
  - [x] Experience statement
  - [x] "What We Do" section (title + content)
  - [x] "Our Services" section (title + content)
  - [x] Bottom image gallery with carousel
  - [x] Carousel interval setting
- [x] Add aboutUs query and useAboutUs hook
- [x] Integrate AboutUsPage component with CMS data
- [x] Update Sanity Studio config with About Us singleton
- [x] All content fields support CMS data with fallback to hardcoded values

---

## 🚧 In Progress

Nothing currently in progress.

---

### Phase 7: SEO & Metadata
- [x] Install react-helmet-async for meta tags management
- [x] Create reusable SEO field group (seoFields.js):
  - [x] Meta title (50-60 chars recommended)
  - [x] Meta description (150-160 chars recommended)
  - [x] Open Graph image (1200x630px)
  - [x] Focus keywords (array)
  - [x] noIndex toggle
- [x] Add SEO fields to all schemas (hero, services, aboutUs)
- [x] Update all queries to fetch SEO data
- [x] Create SEO component for dynamic meta tags
- [x] Set up HelmetProvider in App.jsx
- [x] Integrate SEO component into all pages:
  - [x] Homepage (HeroSection)
  - [x] Window Service page
  - [x] Commercial Service page
  - [x] Residential Service page
  - [x] Electrostatic Service page
  - [x] About Us page

### Phase 8: Contact Page & Forms
- [x] Create Contact Page schema with:
  - [x] Page title and description
  - [x] Form heading
  - [x] Blocked dates array (date ranges with optional reasons)
  - [x] Availability notice text
  - [x] SEO fields
- [x] Create BlockedDatesCalendar component
  - [x] Interactive calendar widget showing current + next 2 months
  - [x] Highlight blocked date ranges
  - [x] Hover tooltips for blocked date reasons
  - [x] Month navigation
- [x] Create ContactPage component
  - [x] Netlify Forms integration (auto-submit)
  - [x] Form fields: name, email, phone, service request, preferred date/time, message
  - [x] Contact information display (from siteSettings)
  - [x] Blocked dates calendar display
  - [x] Responsive two-column layout
- [x] Create ThankYouPage component
  - [x] Success message and next steps
  - [x] Links to homepage and other pages
- [x] Add routes for /contact and /thank-you
- [x] Configure Netlify Forms (auto-detected via data-netlify attribute)
- [x] SEO integration for contact pages

---

## 🚧 In Progress

Nothing currently in progress.

---



---

## 📋 Planned

### Phase 9: Additional Features (Nice to Have)
- [ ] Make contact form send an email or log to sanity cms 
- [ ] Payment portal link to square
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
| **About Us** | ✅ Complete | All page content, hero image, statements, gallery |
| **SEO/Meta** | ✅ Complete | Meta tags, OG images, keywords, noIndex for all pages |
| **Contact Page** | ✅ Complete | Contact form, blocked dates calendar, Netlify Forms integration |

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

**Last Updated:** 2025-11-06
**Current Phase:** Phase 9 - Additional Features (Optional)
