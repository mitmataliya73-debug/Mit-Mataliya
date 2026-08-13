import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useEcommerce } from '../context/EcommerceContext';
import { ShieldCheck, Truck, RotateCcw, Check, ShoppingBag, Zap, ArrowRight } from 'lucide-react';

export const FeaturedProductSection: React.FC = () => {
  const { addToCart, navigateTo } = useEcommerce();
  const product = PRODUCTS.find((p) => p.id === 'prod_marine_layer_1998') || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[1] : 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0].name : 'Midnight Navy');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigateTo('checkout');
  };

  return (
    <section className="py-16 md:py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full web-lines pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[#E62429] font-bold text-[10px] tracking-widest uppercase block mb-1">
              EDITORIAL CAMPAIGN SPOTLIGHT
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-white uppercase tracking-tight">
              HERO DROP FEATURE
            </h2>
          </div>
          <button
            onClick={() => navigateTo('product-detail', product)}
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-white/70 hover:text-white transition-colors uppercase tracking-widest"
          >
            <span>FULL EDITORIAL DETAILS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#0d1117] border border-white/10 p-6 md:p-10 shadow-2xl">
          
          {/* Left: Gallery & Image Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-black border border-white/10">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500 opacity-95"
              />
              <div className="absolute top-4 left-4 bg-[#E62429] text-white font-bold text-[9px] px-3 py-1 uppercase tracking-widest">
                FLAGSHIP DROP
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 overflow-hidden border cursor-pointer transition-all ${
                    selectedImage === idx ? 'border-[#E62429] opacity-100 scale-105' : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#E62429] text-white font-bold text-[9px] uppercase tracking-widest">
                  TOP REVENUE #1
                </span>
                <span className="text-[10px] text-white/50 font-mono">SKU: BND-ML-1998</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display text-white uppercase tracking-wide leading-none">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black font-mono text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-white/40 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 uppercase tracking-widest">
                  In Stock • Ships Next Day
                </span>
              </div>

              <p className="text-xs text-white/60 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors && (
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold text-white uppercase tracking-widest flex justify-between">
                    <span>Color: <span className="text-white/60 font-normal">{selectedColor}</span></span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor === c.name ? 'border-[#E62429] scale-110' : 'border-white/20 hover:border-white/50'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {product.sizes && (
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold text-white uppercase tracking-widest flex justify-between">
                    <span>Select Size</span>
                    <span className="text-white/50 hover:text-white cursor-pointer underline">Size Guide</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#E62429] text-white'
                            : 'bg-black text-white/70 border border-white/10 hover:border-white/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="pt-2 flex items-center gap-4">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Quantity:</span>
                <div className="flex items-center border border-white/20 bg-black">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-white hover:bg-white/10 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold font-mono text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-white hover:bg-white/10 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                  className="py-3.5 px-6 bg-[#E62429] hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 bg-white hover:bg-neutral-200 text-black font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Zap className="w-4 h-4 fill-current text-[#E62429]" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-3 gap-2 pt-3 text-[10px] text-white/50 uppercase tracking-wider">
                <div className="flex flex-col items-center text-center p-2 bg-black border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#E62429] mb-1" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 bg-black border border-white/10">
                  <Truck className="w-4 h-4 text-[#E62429] mb-1" />
                  <span>Free US Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 bg-black border border-white/10">
                  <RotateCcw className="w-4 h-4 text-[#E62429] mb-1" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
