import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';

export const AnnouncementBar: React.FC = () => {
  const { navigateTo } = useEcommerce();

  return (
    <div
      onClick={() => navigateTo('campaign')}
      className="bg-[#E62429] py-2 px-4 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] font-bold text-center uppercase text-white border-b border-white/10 shrink-0 cursor-pointer hover:bg-red-700 transition-colors z-50 relative"
    >
      NEW DROP — GOOGLE × SPIDER-MAN: BRAND NEW DAY • SHOP THE DROP →
    </div>
  );
};
