import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HeroSection from './HeroSection.jsx'
import ServiceSection from './ServiceSection.jsx'
import Reviews from './reviews.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import Footer from './footer.jsx'
import WindowServices from './windowser.jsx'
import TopNav from './TopNav.jsx'
import CommercialCln from './comcln.jsx'
import ResidentialCleaningPage from './rescln.jsx'
import ElectrostaticCleaningPage from './electcln.jsx'
import AboutUsPage from './abtus.jsx'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <HeroSection />
                <ServiceSection />
                <Reviews />
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
      </Routes>
    </ErrorBoundary>

  );
}

export default App;