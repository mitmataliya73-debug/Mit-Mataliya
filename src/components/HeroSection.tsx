import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { HERO_IMAGE, PRODUCTS } from '../data/products';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo, addToCart } = useEcommerce();

  const marineLayerProduct = PRODUCTS.find((p) => p.id === 'prod_marine_layer_1998') || PRODUCTS[0];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#050505] overflow-hidden border-b border-white/10">
      {/* Background Graphic Patterns & Glows */}
      <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />
      <div className="absolute inset-0 web-lines pointer-events-none" />
      
      {/* Red & Blue Glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#E62429] rounded-full blur-[140px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[160px] opacity-15 pointer-events-none" />

      {/* Side Vertical Marquee/Text */}
      <div className="hidden xl:block absolute right-4 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[10px] tracking-[0.5em] text-white/20 uppercase pointer-events-none select-none">
        THE NEW UNIFORM • REIMAGINED ESSENTIALS • NYC 2026
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="bg-white/10 border border-white/20 px-3 py-1 text-[9px] tracking-widest uppercase text-white font-semibold">
                LIMITED COLLABORATION
              </span>
              <span className="text-[#E62429] text-[9px] tracking-widest font-bold uppercase">
                COLLECTION 01
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-7xl md:text-[95px] lg:text-[105px] leading-[0.85] tracking-tighter uppercase text-white">
                A BRAND<br />NEW DAY<span className="text-[#E62429]">.</span>
              </h1>
              
              <p className="text-sm md:text-base text-white/60 font-normal max-w-md mx-auto lg:mx-0 leading-relaxed pt-2">
                Google essentials. Reimagined for the next chapter. Designed with urban textures and cinematic energy inspired by the streets of New York.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigateTo('campaign')}
                className="w-full sm:w-auto bg-[#E62429] hover:bg-red-700 text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto border border-white/30 text-white hover:bg-white hover:text-black px-10 py-4 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
              >
                EXPLORE STORY
              </button>
            </div>

            {/* Micro Badge */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-[10px] tracking-widest uppercase text-white/40 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E62429]" />
                <span>US Mobile-Optimized</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-white/80 font-semibold">HIGH-PERFORMANCE ARCHITECTURE</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-white/10 bg-[#0d1117] shadow-2xl group hover:border-[#E62429]/60 transition-all duration-500 overflow-hidden">
              
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={HERO_IMAGE}
                  alt="Google Marine Layer 1998 Pullover"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#E62429] text-white font-bold text-[9px] uppercase tracking-widest">
                    FEATURED DROP
                  </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-black/80 border border-white/10 px-3 py-1">
                  <span className="font-mono font-bold text-white text-xs">$88.00</span>
                </div>
              </div>

              {/* Product Info Banner Overlay */}
              <div className="p-6 space-y-3 bg-[#0d1117] border-t border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-[#E62429] font-bold tracking-widest uppercase mb-1 block">
                      HERO PRODUCT
                    </span>
                    <h3 className="text-2xl font-display uppercase leading-none text-white">
                      Marine Layer<br />1998 Pullover
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => navigateTo('product-detail', marineLayerProduct)}
                    className="flex-1 py-3 px-4 border border-white/20 hover:bg-white hover:text-black text-white font-bold text-[10px] uppercase tracking-widest transition-colors text-center cursor-pointer"
                  >
                    VIEW DETAILS →
                  </button>
                  <button
                    onClick={() => addToCart(marineLayerProduct, 1)}
                    className="flex-1 py-3 px-4 bg-[#E62429] hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest transition-colors text-center cursor-pointer"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
