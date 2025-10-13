import React from 'react';
import Logo from './assets/brand-logo.png'
import HeroIMG from './assets/clean.png'


const HeroSection = () => {
  return (
    <div className="min-h-screen bg-[#FFEBD0]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-[#E1D9C6]">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="McKenna's Cleaning Logo"
            className="h-16"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a href="#about" className="text-gray-800 hover:text-teal-700 transition-colors font-medium">
            About
          </a>
          <a href="#electrostatic" className="text-gray-800 hover:text-teal-700 transition-colors font-medium border-b-2 border-gray-800">
            Electrostatic Spraying
          </a>
          <a href="#residential" className="text-gray-800 hover:text-teal-700 transition-colors font-medium border-b-2 border-gray-800">
            Residential Cleaning
          </a>
          <a href="#commercial" className="text-gray-800 hover:text-teal-700 transition-colors font-medium border-b-2 border-gray-800">
            Commercial Cleaning
          </a>
          <a href="#window" className="text-gray-800 hover:text-teal-700 transition-colors font-medium border-b-2 border-gray-800">
            Window Cleaning
          </a>
          <a 
            href="#contact" 
            className="bg-teal-700 text-white px-8 py-3 rounded-md hover:bg-teal-800 transition-colors font-bold tracking-wide"
          >
            CONTACT
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-16 max-w-7xl mx-auto items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-8">
          <h1 className="font-bayon text-3xl lg:text-6xl font-bold text-teal-800 leading-tight">
            MCKENNA'S CLEANING
            <br />
            <span className="block mt-2">SERVICES</span>
          </h1>
          
          <p className="text-2xl text-orange-500 font-medium">
            We are a cleaning buisness<br />
            serving the Medina County area
          </p>

          <a 
            href="#contact" 
            className="inline-block bg-teal-700 text-white px-10 py-4 rounded-md hover:bg-teal-800 transition-colors font-bold tracking-wide text-lg"
          >
            CONTACT
          </a>
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <img 
            src={HeroIMG}
            alt="Clean polished floor in modern kitchen" 
            className="rounded-lg shadow-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;