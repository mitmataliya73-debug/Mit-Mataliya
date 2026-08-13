import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { CAMPAIGN_IMAGE } from '../data/products';
import { ArrowRight, Compass } from 'lucide-react';

export const CampaignStorySection: React.FC = () => {
  const { navigateTo } = useEcommerce();

  return (
    <section className="py-20 md:py-28 bg-[#050505] border-b border-white/10 relative overflow-hidden">
      {/* Red & Blue Rim Light Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#E62429]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Editorial Lookbook Image */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] border border-white/10 bg-[#0d1117] shadow-2xl group overflow-hidden">
              <img
                src={CAMPAIGN_IMAGE}
                alt="Brand New Day Editorial Lookbook"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] text-white/80 font-mono bg-black/80 backdrop-blur-md p-3 border border-white/10">
                <span className="text-[#E62429] font-bold uppercase tracking-widest">LOCATION: NEW YORK CITY</span>
                <span className="tracking-widest">LOOKBOOK VOL. 1</span>
              </div>
            </div>
          </div>

          {/* Right Narrative Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E62429] text-white text-[9px] font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>THE CONCEPT & STORY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display text-white uppercase tracking-tight leading-[0.85]">
              A BRAND NEW DAY <br />
              <span className="text-[#E62429]">STARTS HERE.</span>
            </h2>

            <div className="space-y-4 text-white/70 text-sm md:text-base font-normal">
              <p className="text-white font-bold text-lg uppercase tracking-wide">
                A new chapter calls for a new uniform.
              </p>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                Inspired by the relentless energy of New York, built around everyday Google essentials, and reimagined with a bold streetwear attitude into a limited-edition apparel experience.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('campaign')}
                className="w-full sm:w-auto px-10 py-4 bg-[#E62429] hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer group"
              >
                <span>EXPLORE THE STORY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
