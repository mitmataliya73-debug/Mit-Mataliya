import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import {
  BarChart2,
  Smartphone,
  Globe,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const AboutStoryPage: React.FC = () => {
  const { navigateTo } = useEcommerce();

  const ga4Metrics = [
    { label: 'US Active Users', value: '19,263', sub: '90.85% Total Store Revenue ($153,869.03)', icon: Globe },
    { label: 'Mobile Traffic Share', value: '66.5%', sub: 'Primary UX Design Benchmark', icon: Smartphone },
    { label: 'Direct Traffic Revenue', value: '$96,038', sub: '66,398 Sessions', icon: TrendingUp },
    { label: 'Organic Search Revenue', value: '$43,761', sub: '22,216 Sessions • 71.41% Engagement', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-red-950/30 to-transparent pointer-events-none" />
          <span className="px-3 py-1 bg-[#E62429] text-white text-[9px] font-bold uppercase tracking-widest">
            COLLECTION STORY & CONCEPT OVERVIEW
          </span>
          <h1 className="text-3xl sm:text-5xl font-display uppercase text-white tracking-tight">
            GOOGLE × SPIDER-MAN: BRAND NEW DAY
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            A concept collaboration translating Google Merchandise Store essentials into a high-converting, streetwear-inspired collection.
          </p>
        </div>

        {/* Collection Performance Benchmarks Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-display uppercase tracking-wider text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#E62429]" />
            <span>COLLECTION PERFORMANCE METRICS</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ga4Metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-xs font-bold uppercase">{metric.label}</span>
                    <Icon className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-mono font-black text-white">{metric.value}</p>
                  <p className="text-[11px] text-neutral-400">{metric.sub}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Specific Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Marine Layer Pullover */}
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-red-400 uppercase tracking-widest">#1 REVENUE PERFORMER</span>
              <span className="text-xs font-mono font-bold text-emerald-400">$7,850 Revenue</span>
            </div>
            <h3 className="text-lg font-bold text-white uppercase">Google Marine Layer 1998 Pullover</h3>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span>Views:</span> <span className="font-mono text-white">2,056</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span>Add-to-Carts:</span> <span className="font-mono text-white">259</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span>Purchases:</span> <span className="font-mono text-white">78</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pt-1">
              Positioned as the flagship hero drop on the homepage hero, campaign landing page, and split-screen spotlight.
            </p>
          </div>

          {/* Android Plushie Friction Analysis */}
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">CONVERSION FRICTION FIX</span>
              <span className="text-xs font-mono font-bold text-amber-400">1,583 Add-To-Carts → 19 Purchases</span>
            </div>
            <h3 className="text-lg font-bold text-white uppercase">Android Classic Plushie UX Redesign</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              The high interest (1,583 add-to-carts) combined with low completion (19 orders) pointed to checkout shipping fee uncertainty.
            </p>
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Implemented Solutions:</span>
              </div>
              <p>• Upfront flat-rate $4.99 shipping badge on detail page.</p>
              <p>• Instant 1-click checkout flow with live order confirmation.</p>
            </div>
          </div>

        </div>

        {/* Design Architecture Principles */}
        <div className="p-8 bg-neutral-900/60 border border-neutral-800 rounded-3xl space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">CREATIVE BRAND RATIO</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-2xl font-black text-red-500 font-mono">70%</span>
              <span className="block text-xs font-bold text-white mt-1 uppercase">PREMIUM STREETWEAR</span>
            </div>
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-2xl font-black text-blue-400 font-mono">20%</span>
              <span className="block text-xs font-bold text-white mt-1 uppercase">SPIDER-MAN ENERGY</span>
            </div>
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-2xl font-black text-neutral-200 font-mono">10%</span>
              <span className="block text-xs font-bold text-white mt-1 uppercase">GOOGLE TECH</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-4 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-red-500 shadow-xl cursor-pointer"
          >
            EXPERIENCE THE REDESIGNED STORE →
          </button>
        </div>

      </div>
    </div>
  );
};
