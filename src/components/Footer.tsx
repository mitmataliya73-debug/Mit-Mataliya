import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useEcommerce();

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white/60 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Intro Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl tracking-tighter uppercase text-white">
                GOOGLE <span className="text-[#E62429]">×</span> SPIDER-MAN
              </span>
            </div>

            <p className="text-white/50 text-xs leading-relaxed max-w-sm">
              A concept e-commerce collaboration fusing Google Merchandise Store products with Spider-Man: Brand New Day urban streetwear aesthetics.
            </p>

            <div className="flex items-center gap-2 text-[10px] text-white/50 font-mono uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#E62429]" />
              <span>US Mobile-First Optimized Prototype</span>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div className="space-y-3">
            <h4 className="font-display text-base text-white uppercase tracking-wider">SHOP</h4>
            <ul className="space-y-2 text-white/60 text-[11px] uppercase tracking-wider">
              <li>
                <button onClick={() => navigateTo('campaign')} className="hover:text-white transition-colors cursor-pointer">
                  New Drop
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'clothing')} className="hover:text-white transition-colors cursor-pointer">
                  Clothing
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'accessories')} className="hover:text-white transition-colors cursor-pointer">
                  Accessories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'collectibles')} className="hover:text-white transition-colors cursor-pointer">
                  Collectibles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div className="space-y-3">
            <h4 className="font-display text-base text-white uppercase tracking-wider">HELP</h4>
            <ul className="space-y-2 text-white/60 text-[11px] uppercase tracking-wider">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Shipping Information
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT */}
          <div className="space-y-3">
            <h4 className="font-display text-base text-white uppercase tracking-wider">ABOUT</h4>
            <ul className="space-y-2 text-white/60 text-[11px] uppercase tracking-wider">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  GA4 Case Study
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('campaign')} className="hover:text-white transition-colors cursor-pointer">
                  Brand New Day
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40 font-mono uppercase tracking-widest">
          <p>© 2026 Google × Spider-Man: Brand New Day Concept Prototype.</p>
          <p>Created for academic analysis and evaluation purposes.</p>
        </div>

      </div>
    </footer>
  );
};
