import React from 'react';

export const Marquee: React.FC = () => {
  const marqueeItems = [
    'NEW DROP',
    'GOOGLE × SPIDER-MAN',
    'BRAND NEW DAY',
    'GOOGLE ESSENTIALS',
    'LIMITED EDITION',
    'STREETWEAR COLLECTION',
  ];

  return (
    <div className="bg-white text-black font-display text-sm sm:text-base uppercase py-3 border-y border-white/20 overflow-hidden relative select-none shrink-0">
      <div className="animate-marquee flex items-center space-x-8 whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center space-x-8">
            <span className="tracking-wider">{item}</span>
            <span className="w-2.5 h-2.5 bg-[#E62429] rounded-full inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
};
