import React from 'react';
import { EcommerceProvider, useEcommerce } from './context/EcommerceContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Marquee } from './components/Marquee';
import { ProductGrid } from './components/ProductGrid';
import { FeaturedProductSection } from './components/FeaturedProductSection';
import { CategoryCards } from './components/CategoryCards';
import { HighInterestSection } from './components/HighInterestSection';
import { CampaignStorySection } from './components/CampaignStorySection';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CampaignLandingPage } from './components/CampaignLandingPage';
import { AboutStoryPage } from './components/AboutStoryPage';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { GA4InspectorModal } from './components/GA4InspectorModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, navigateTo } = useEcommerce();

  const brandNewDayCollection = PRODUCTS.slice(0, 4);
  const additionalProducts = PRODUCTS.slice(4, 12);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div>
            {/* 3. Cinematic Hero */}
            <HeroSection />

            {/* 4. Marquee */}
            <Marquee />

            {/* 5. Brand New Day Collection */}
            <section className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
                    LIMITED DROP
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                    THE BRAND NEW DAY DROP
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    A curated selection of Google favourites reimagined through a bold streetwear lens.
                  </p>
                </div>

                <ProductGrid products={brandNewDayCollection} listName="Brand New Day Drop" columns={4} />
              </div>
            </section>

            {/* 6. Featured Marine Layer Pullover */}
            <FeaturedProductSection />

            {/* 7. Shop By Category */}
            <CategoryCards />

            {/* 8. Nano Banana Tee / High Interest */}
            <HighInterestSection />

            {/* 9. Editorial Campaign Story */}
            <CampaignStorySection />

            {/* 10. Additional Products */}
            <section className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
                      STREETWEAR CATALOG
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-1">
                      GOOGLE ESSENTIALS COLLECTION
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="text-xs font-bold text-neutral-300 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>VIEW ALL PRODUCTS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <ProductGrid products={additionalProducts} listName="Additional Products" columns={4} />
              </div>
            </section>

            {/* 11. Final Campaign CTA */}
            <section className="py-20 bg-neutral-950 text-center relative overflow-hidden">
              <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
                <span className="px-3 py-1 bg-red-950 text-red-400 border border-red-800 text-[10px] font-black uppercase tracking-widest rounded">
                  AUTHENTIC DROP
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
                  A BRAND NEW DAY.
                </h2>
                <p className="text-neutral-300 text-lg md:text-xl font-medium max-w-xl mx-auto">
                  Your everyday essentials just entered a new chapter.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest rounded-lg shadow-2xl shadow-red-950 cursor-pointer inline-flex items-center gap-2 group transition-all"
                  >
                    <span>SHOP THE DROP</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'campaign' && <CampaignLandingPage />}
        {currentPage === 'about' && <AboutStoryPage />}
      </main>

      {/* Global Overlays & Modals */}
      <CartDrawer />
      <SearchModal />
      <GA4InspectorModal />
      <Toast />

      {/* 12. Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <EcommerceProvider>
      <MainContent />
    </EcommerceProvider>
  );
}
