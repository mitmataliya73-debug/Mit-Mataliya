import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { PRODUCTS, HERO_IMAGE, CAMPAIGN_IMAGE } from '../data/products';
import { ProductGrid } from './ProductGrid';
import { CategoryCards } from './CategoryCards';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const CampaignLandingPage: React.FC = () => {
  const { navigateTo } = useEcommerce();

  const featuredDrops = PRODUCTS.filter((p) => p.featured);
  const bestsellers = PRODUCTS.filter((p) => p.badge === 'BESTSELLER' || p.badge === 'FAN FAVOURITE');

  return (
    <div className="min-h-screen bg-neutral-950 text-white space-y-16 pb-20">
      
      {/* 1. Campaign Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-neutral-950 overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-spider-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-950/30 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAID CAMPAIGN DESTINATION • BRAND NEW DAY</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-none">
              GOOGLE × SPIDER-MAN
            </h1>
            <h2 className="text-3xl sm:text-5xl font-black text-red-500 tracking-wider uppercase">
              BRAND NEW DAY
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 font-medium max-w-2xl mx-auto">
              Your everyday Google essentials, reimagined through a bold streetwear lens.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-xl shadow-red-950 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>SHOP THE DROP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg border border-neutral-800 cursor-pointer"
            >
              CAMPAIGN ANALYTICS BRIEF
            </button>
          </div>
        </div>
      </section>

      {/* 2. Campaign Story & Strategy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>THE BRAND NEW DAY VISION</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
              A BRAND NEW DAY STARTS HERE.
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Targeted primarily at US-based mobile shoppers (representing 66.5% of store sessions), this campaign combines everyday utility with streetwear aesthetics. Every garment and accessory is built with premium heavyweight fabrics, web-line typography, and high-contrast dark palette styling.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-neutral-400">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="block text-white font-bold">PRIMARY DROPS</span>
                <span>Marine Layer Pullover</span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="block text-white font-bold">FAN FAVOURITE</span>
                <span>Nano Banana Tee</span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 col-span-2 sm:col-span-1">
                <span className="block text-white font-bold">TARGET AUDIENCE</span>
                <span>US Mobile 66.5%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
            <img src={CAMPAIGN_IMAGE} alt="Campaign Lookbook" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 3. Featured Drops Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
            FEATURED DROPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
            THE BRAND NEW DAY SELECTION
          </h2>
        </div>
        <ProductGrid products={featuredDrops} listName="Campaign Drops" columns={4} />
      </section>

      {/* 4. Categories */}
      <CategoryCards />

      {/* 5. Editorial Lookbook Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center p-8 sm:p-16">
          <img src={HERO_IMAGE} alt="Editorial Lookbook" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="px-3 py-1 bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-widest rounded">
              EDITORIAL LOOKBOOK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
              DESIGNED FOR THE NEXT CHAPTER.
            </h2>
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 cursor-pointer"
            >
              EXPLORE ALL ESSENTIALS
            </button>
          </div>
        </div>
      </section>

      {/* 6. Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
            FAN FAVOURITES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
            BESTSELLING ESSENTIALS
          </h2>
        </div>
        <ProductGrid products={bestsellers} listName="Campaign Bestsellers" columns={4} />
      </section>

      {/* 7. Final Campaign CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-10 sm:p-16 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-spider-grid opacity-20 pointer-events-none" />

          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-white relative z-10">
            YOUR NEXT CHAPTER STARTS HERE.
          </h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto relative z-10">
            Limited stock available for this academic streetwear collaboration drop.
          </p>

          <div className="pt-2 relative z-10">
            <button
              onClick={() => navigateTo('shop')}
              className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-widest rounded-lg shadow-2xl shadow-red-950 cursor-pointer inline-flex items-center gap-2"
            >
              <span>SHOP NOW →</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
