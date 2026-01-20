import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import HeroSection from './HeroSection.jsx'
import ServiceSection from './ServiceSection.jsx'
import Reviews from './reviews.jsx'
import AvailabilitySection from './AvailabilitySection.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import Footer from './footer.jsx'
import WindowServices from './windowser.jsx'
import TopNav from './TopNav.jsx'
import CommercialCln from './comcln.jsx'
import ResidentialCleaningPage from './rescln.jsx'
import ElectrostaticCleaningPage from './electcln.jsx'
import AboutUsPage from './abtus.jsx'
import ContactPage from './ContactPage.jsx'
import ThankYouPage from './ThankYouPage.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import StudioPage from './studio/StudioPage.jsx'

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetch on window focus for better UX
      retry: 1, // Retry failed queries once
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <HeroSection />
                  <ServiceSection />
                  <Reviews />
                  <AvailabilitySection />
                  <Footer />
                </div>
              </>
            }
          />
          <Route path="/windowser" element={<><TopNav /><WindowServices /><Footer /></>} />
          <Route path="/commercial-cleaning" element={<><TopNav /><CommercialCln /><Footer /></>} />
          <Route path="/residential-cleaning" element={<><TopNav /><ResidentialCleaningPage /><Footer /></>} />
          <Route path="/electrostatic-cleaning" element={<><TopNav /><ElectrostaticCleaningPage /><Footer /></>} />
          <Route path="/about-us" element={<><TopNav /><AboutUsPage /><Footer /></>} />
          <Route path="/contact" element={<><TopNav /><ContactPage /><Footer /></>} />
          <Route path="/contact/thank-you" element={<><TopNav /><ThankYouPage /><Footer /></>} />
          <Route path="/structure" element={<StudioPage />} />
          </Routes>
        </ErrorBoundary>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;