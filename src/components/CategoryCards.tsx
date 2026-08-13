import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { ArrowRight } from 'lucide-react';

export const CategoryCards: React.FC = () => {
  const { navigateTo } = useEcommerce();

  const categories = [
    {
      id: 'clothing',
      title: 'CLOTHING',
      subtitle: 'Tees, hoodies, pullovers and heavy apparel.',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      badge: 'TOP CATEGORY',
    },
    {
      id: 'accessories',
      title: 'ACCESSORIES',
      subtitle: 'Bags, bottles, caps and everyday tech gear.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      badge: 'URBAN GEAR',
    },
    {
      id: 'collectibles',
      title: 'COLLECTIBLES',
      subtitle: 'Unique Google x Spider-Man merchandise & pins.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
      badge: 'LIMITED EDITION',
    },
    {
      id: 'new-drop',
      title: 'NEW DROP',
      subtitle: 'Exclusive Brand New Day street collection.',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      badge: '2026 DROP',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#050505] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <span className="text-[#E62429] font-bold text-[10px] tracking-widest uppercase block mb-1">
            CURATED ESSENTIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-white uppercase tracking-tight">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', null, cat.id)}
              className="group relative h-96 border border-white/10 bg-[#0d1117] cursor-pointer shadow-xl hover:border-[#E62429]/60 transition-all duration-500 flex flex-col justify-end overflow-hidden"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />

              {/* Dark Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 bg-[#E62429] text-white text-[9px] font-bold uppercase tracking-widest">
                  {cat.badge}
                </span>
              </div>

              {/* Text overlay */}
              <div className="relative z-10 p-6 space-y-2">
                <h3 className="text-3xl font-display text-white tracking-tight uppercase group-hover:text-[#E62429] transition-colors leading-none">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-white group-hover:text-[#E62429] transition-colors uppercase tracking-widest">
                  <span>EXPLORE CATEGORY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
