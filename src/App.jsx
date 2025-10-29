import React from 'react'
import './App.css'
import HeroSection from './HeroSection.jsx'
import ServiceSection from './ServiceSection.jsx'
import Reviews from './reviews.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import Footer from './footer.jsx'

function App() {
  return (
    <ErrorBoundary>
      <div>
        <HeroSection />
        <ServiceSection />
        <Reviews />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;