import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesMenu from './components/ServicesMenu';
import StyleVisualizer from './components/StyleVisualizer';
import BarberTeam from './components/BarberTeam';
import VipClub from './components/VipClub';
import ReviewsSection from './components/ReviewsSection';
import LocationsContact from './components/LocationsContact';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'am'
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [selectedBarberForBooking, setSelectedBarberForBooking] = useState(null);

  const handleOpenBookingWithService = (service) => {
    setSelectedServiceForBooking(service);
    setSelectedBarberForBooking(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithBarber = (barber) => {
    setSelectedBarberForBooking(barber);
    setSelectedServiceForBooking(null);
    setIsBookingOpen(true);
  };

  const handleGeneralBookingOpen = () => {
    setSelectedServiceForBooking(null);
    setSelectedBarberForBooking(null);
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen bg-[#090b0e] text-slate-100 ${lang === 'am' ? 'lang-am' : ''}`}>
      
      {/* Navigation Bar */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        onOpenBooking={handleGeneralBookingOpen} 
      />

      {/* Hero Section */}
      <Hero 
        lang={lang} 
        onOpenBooking={handleGeneralBookingOpen} 
      />

      {/* Services & Pricing Menu */}
      <ServicesMenu 
        lang={lang} 
        onSelectService={handleOpenBookingWithService} 
      />

      {/* Hairstyle Visualizer */}
      <StyleVisualizer 
        lang={lang} 
        onOpenBooking={handleGeneralBookingOpen} 
      />

      {/* Master Barbers Team */}
      <BarberTeam 
        lang={lang} 
        onSelectBarber={handleOpenBookingWithBarber} 
      />

      {/* Sheger VIP Gentlemen's Club */}
      <VipClub 
        lang={lang} 
      />

      {/* Reviews & Testimonials */}
      <ReviewsSection 
        lang={lang} 
      />

      {/* Locations & Contact */}
      <LocationsContact 
        lang={lang} 
        onOpenBooking={handleGeneralBookingOpen} 
      />

      {/* Footer */}
      <Footer 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Interactive Booking Wizard Modal */}
      {isBookingOpen && (
        <BookingModal 
          lang={lang}
          initialService={selectedServiceForBooking}
          initialBarber={selectedBarberForBooking}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

    </div>
  );
}
