import React, { useState } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { Search, ShoppingBag, Heart, Menu, X, BarChart2, ShieldCheck } from 'lucide-react';
import { PageType } from '../types';

export const Navbar: React.FC = () => {
  const {
    navigateTo,
    getCartItemsCount,
    setCartDrawerOpen,
    setSearchOpen,
    setGA4InspectorOpen,
    currentPage,
    wishlist,
  } = useEcommerce();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageType; category?: string }[] = [
    { label: 'NEW DROP', page: 'campaign' },
    { label: 'SHOP', page: 'shop', category: 'all' },
    { label: 'CLOTHING', page: 'shop', category: 'clothing' },
    { label: 'ACCESSORIES', page: 'shop', category: 'accessories' },
    { label: 'COLLECTIBLES', page: 'shop', category: 'collectibles' },
    { label: 'ABOUT', page: 'about' },
  ];

  const handleNavClick = (page: PageType, category: string = 'all') => {
    navigateTo(page, null, category);
    setMobileMenuOpen(false);
  };

  const cartCount = getCartItemsCount();

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="font-display text-2xl md:text-3xl tracking-tighter uppercase text-white">
                GOOGLE <span className="text-[#E62429]">×</span> SPIDER-MAN
              </span>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.page &&
                (!link.category || link.category === 'all');
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page, link.category)}
                  className={`text-[10px] font-bold tracking-widest uppercase transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E62429]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[10px] font-semibold tracking-widest">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1 uppercase tracking-widest"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-[10px]">SEARCH</span>
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => handleNavClick('shop')}
              className="p-2 text-white/70 hover:text-white transition-colors relative cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E62429] rounded-full animate-pulse" />
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="bg-[#E62429] hover:bg-red-700 text-white px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5 cursor-pointer relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>CART</span>
              <span className="bg-black text-white text-[8px] font-mono px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-red-400 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.page, link.category)}
              className="block w-full text-left py-2.5 px-3 text-sm font-bold tracking-wider text-neutral-200 hover:text-red-400 hover:bg-neutral-900 rounded transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 px-3">
            <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official Academic Prototype
            </span>
            <span className="text-red-400 font-bold uppercase tracking-wider">
              2026 DROP
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
