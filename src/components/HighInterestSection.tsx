import React from 'react';
import { PRODUCTS } from '../data/products';
import { useEcommerce } from '../context/EcommerceContext';
import { Flame, ShoppingBag, Eye, TrendingUp } from 'lucide-react';

export const HighInterestSection: React.FC = () => {
  const { navigateTo, addToCart } = useEcommerce();
  const nanoBananaProduct = PRODUCTS.find((p) => p.id === 'prod_nano_banana_tee') || PRODUCTS[1];

  return (
    <section className="py-16 md:py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
      {/* Spider web background accent */}
      <div className="absolute inset-0 halftone opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E62429] text-white text-[9px] font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span>HIGH INTEREST DROP</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-white uppercase tracking-tight">
            WHAT'S GETTING ATTENTION
          </h2>
          <p className="text-white/60 text-xs sm:text-sm">
            One of the strongest purchase-volume products in the GA4 dataset. Reimagined with Brand New Day vector graphics.
          </p>
        </div>

        {/* Feature Spotlight Card */}
        <div className="max-w-4xl mx-auto bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 items-center">
          
          {/* Image */}
          <div className="md:col-span-6 relative aspect-square bg-black">
            <img
              src={nanoBananaProduct.images[0]}
              alt={nanoBananaProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute top-4 left-4 bg-[#E62429] text-white font-bold text-[9px] px-3 py-1 uppercase tracking-widest shadow">
              FAN FAVOURITE
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-6 p-6 sm:p-8 md:p-10 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold font-mono text-[#E62429] mb-2 uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" />
                <span>TOP CONVERSION VOLUME</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-wide">
                {nanoBananaProduct.name}
              </h3>
              <p className="text-2xl font-mono font-bold text-white mt-2">
                ${nanoBananaProduct.price.toFixed(2)}
              </p>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              {nanoBananaProduct.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(nanoBananaProduct, 1)}
                  className="flex-1 py-3.5 px-6 bg-[#E62429] hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => navigateTo('product-detail', nanoBananaProduct)}
                  className="py-3.5 px-6 border border-white/20 hover:bg-white hover:text-black text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>VIEW</span>
                </button>
              </div>

              <div className="p-3 bg-black border border-white/10 text-[10px] text-white/50 flex items-center justify-between uppercase tracking-wider">
                <span>100% Combed Heavyweight Cotton</span>
                <span className="text-emerald-400 font-bold">Fast Shipping</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
