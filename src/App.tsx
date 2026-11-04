/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { ShowcaseHome } from './components/showcase/ShowcaseHome';
import { TemplateNavbar } from './components/showcase/TemplateNavbar';
import { Preloader } from './components/Preloader';

import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

// Drink Store Template (Full interactive Zobo store with Real-Time CMS Admin)
import { PromoBanner } from './components/PromoBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { WholesaleSection } from './components/WholesaleSection';
import { BrewStorySection } from './components/BrewStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Other Business Website Templates
import { RestaurantTemplate } from './components/templates/RestaurantTemplate';
import { FashionTemplate } from './components/templates/FashionTemplate';
import { SpaTemplate } from './components/templates/SpaTemplate';
import { JumiaStore } from './components/jumia/JumiaStore';

export default function App() {
  // Loading preloader state
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  // Navigation state: 'hub' (Agency Home) or specific template ID
  const [activeView, setActiveView] = useState<string>('hub');
  // Responsive simulator viewport: 'desktop' | 'tablet' | 'mobile'
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleSelectTemplate = (templateId: string) => {
    setActiveView(templateId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setActiveView('hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Viewport container styling for device frames
  const viewportStyles = {
    desktop: 'w-full',
    tablet: 'max-w-3xl mx-auto my-6 rounded-2xl shadow-2xl border-4 border-stone-800 overflow-hidden',
    mobile: 'max-w-[400px] mx-auto my-6 rounded-3xl shadow-2xl border-8 border-stone-900 overflow-hidden'
  };

  return (
    <>
      {/* Sleek Animated Preloader */}
      {showPreloader && (
        <Preloader
          onComplete={() => setShowPreloader(false)}
          brandName="SalesWithOlaide Web Studio"
          tagline="Turnkey Business Websites & WhatsApp E-Commerce Systems"
        />
      )}

      {/* Main App Content */}
      {activeView === 'hub' ? (
        <ShowcaseHome onSelectTemplate={handleSelectTemplate} />
      ) : (
        <div className="min-h-screen bg-stone-900 flex flex-col">
          {/* Persistent Agency Template Toolbar */}
          <TemplateNavbar
            currentTemplateId={activeView}
            onSelectTemplate={handleSelectTemplate}
            onBackToHub={handleBackToHub}
            viewportMode={viewportMode}
            onChangeViewport={setViewportMode}
          />

          {/* Template Viewport Wrapper */}
          <div className={`flex-1 transition-all duration-300 ${viewportStyles[viewportMode]}`}>
            {/* Featured Store: Jumia Nigeria Kitchen & Utensils Marketplace */}
            {activeView === 'jumia_kitchen' && <JumiaStore />}

            {/* Template 1: Food & Drink / Zobo Store (with live CMS & WhatsApp Cart) */}
            {activeView === 'zobo_drinks' && (
              <StoreProvider>
                <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-[#720026] selection:text-white">
                  <PromoBanner />
                  <Navbar />
                  <main className="flex-1">
                    <HeroSection />
                    <ProductGrid />
                    <WholesaleSection />
                    <BrewStorySection />
                    <ReviewsSection />
                    <FAQSection />
                  </main>
                  <Footer />
                  <CartDrawer />
                  <FloatingWhatsAppButton />
                  <AdminDashboard />
                </div>
              </StoreProvider>
            )}

            {/* Template 2: African Fusion & Grill Restaurant */}
            {activeView === 'restaurant_grill' && <RestaurantTemplate />}

            {/* Template 3: Luxury Fashion & Apparel Boutique */}
            {activeView === 'fashion_boutique' && <FashionTemplate />}

            {/* Template 4: Day Spa & Wellness Sanctuary */}
            {activeView === 'spa_wellness' && <SpaTemplate />}
          </div>
        </div>
      )}
    </>
  );
}
