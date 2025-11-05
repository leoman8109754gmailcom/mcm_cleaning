# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based marketing website for McKenna's Cleaning Services, a Medina County cleaning business. The site showcases multiple cleaning services including residential, commercial, window cleaning, and electrostatic spraying.

**Tech Stack:**
- React 19 with Vite
- Tailwind CSS for styling
- GSAP for animations
- React Router for navigation

**Deployment:**
- Designed for static deployment (Netlify, Vercel, etc.)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture & Structure

### Component Hierarchy

**App.jsx** - Main application entry point that composes page sections:
- Imports and renders `HeroSection` and `ServiceSection` components
- Minimal top-level component that acts as a simple container

**HeroSection.jsx** (src/HeroSection.jsx) - Hero section with navigation:
- Fixed navigation bar with scroll behavior (hides on scroll down, shows on scroll up)
- Desktop navigation with direct links to page sections
- Mobile navigation using `StaggeredMenu` component
- Crossfade image carousel (3-second intervals) with accessibility support (respects prefers-reduced-motion)
- Click-outside and Escape key handlers for mobile menu
- GSAP animations for mobile menu transitions

**ServiceSection.jsx** (src/ServiceSection.jsx) - Services showcase:
- Full-height section with 4 service items (Windows, Commercial, Residential, Electrostatic)
- Each `MenuItem` has a GSAP-powered marquee animation on hover
- Marquee slides in from top/bottom edge based on mouse entry point
- Uses custom Tailwind animations for the scrolling text effect

**StaggeredMenu.jsx** (src/components/StaggeredMenu.jsx) - Mobile navigation component:
- Slide-in menu panel from right side
- Accepts props for customization (colors, logo, social links, numbering)
- Mobile-only (hidden on md+ breakpoints)
- Fixed position hamburger button in top-right

### State Management

No global state management library is used. Component-local state with `React.useState` and `React.useRef` handles:
- Mobile menu open/close state
- Navigation visibility on scroll
- Active carousel image index
- GSAP timeline references

### Styling Approach

**Tailwind CSS:**
- Custom configuration in `tailwind.config.js`
- Custom font family: `Bayon` (defined in theme.fontFamily)
- Custom animations: `marquee` keyframes for horizontal scrolling
- Custom colors: Teal (`#17616E`, `#2B6B6B`), Orange (`#EA892C`), Beige (`#FFEBD0`, `#E8D4B8`)
- Responsive design with mobile-first approach

**Custom CSS:**
- `src/App.css` and `src/index.css` for global styles
- GSAP inline animations for complex interactions

### Animation Patterns

**GSAP Usage:**
- All animations respect `prefers-reduced-motion` media query
- Timeline-based animations for mobile menu (stored in refs for reuse)
- Hover-triggered marquee animations in service menu items
- Directional animations based on mouse entry/exit points

**Carousel Pattern:**
- Automatic rotation using `setInterval`
- Crossfade transition using opacity with Tailwind classes
- Pauses if user prefers reduced motion

### Accessibility Features

- Semantic HTML (nav, section, button elements)
- ARIA labels on interactive elements
- Keyboard navigation support (Escape to close menu)
- Focus states on links and buttons
- Respects prefers-reduced-motion preference
- Click-outside handler for mobile menu

## Key Implementation Details

### Navigation Scroll Behavior (src/HeroSection.jsx:32-47)

The navigation bar tracks scroll direction and hides when scrolling down, shows when scrolling up. Implementation uses `lastScrollY` ref to compare positions and updates `isNavVisible` state.

### GSAP Timeline Pattern (src/HeroSection.jsx:82-124)

Mobile menu animations use a master timeline stored in `masterTlRef` that is created once and replayed/reversed on subsequent opens/closes. This pattern improves performance by reusing the timeline.

### Edge Detection for Animations (src/ServiceSection.jsx:14-18)

The service menu hover effect calculates the closest edge (top/bottom) where the mouse enters/exits to determine animation direction, creating a smooth directional reveal effect.

### Marquee Animation (src/ServiceSection.jsx:41-49)

Service items repeat their content 10 times in a wide container with Tailwind's custom `animate-marquee` class to create an infinite scrolling effect.

## Branch Strategy

- **main** - Production branch
- **axolotlpi-dev** - Current development branch

When creating PRs, target the `main` branch unless instructed otherwise.
