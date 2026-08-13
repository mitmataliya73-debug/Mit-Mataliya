import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductGrid } from './ProductGrid';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Heart,
  ArrowLeft,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, addToCart, navigateTo, wishlist, toggleWishlist } = useEcommerce();

  const product: Product = selectedProduct || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<'details' | 'material' | 'shipping' | 'returns' | null>('details');

  useEffect(() => {
    setSelectedImage(0);
    if (product.sizes) setSelectedSize(product.sizes[0]);
    if (product.colors) setSelectedColor(product.colors[0].name);
    setQuantity(1);
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);

  // Complete the look products (4 recommendations excluding current)
  const recommendedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigateTo('checkout');
  };

  const toggleAccordion = (section: 'details' | 'material' | 'shipping' | 'returns') => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  const isPlushie = product.id === 'prod_android_classic_plushie';

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('shop')}
          className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO SHOP</span>
        </button>

        {/* Product Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest rounded shadow">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors ${
                  isWishlisted ? 'bg-red-600 text-white' : 'bg-neutral-950/80 text-neutral-300 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                      selectedImage === idx
                        ? 'border-red-500 scale-105 shadow-lg'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-neutral-900 text-red-400 border border-neutral-800 font-mono text-[10px] uppercase font-bold tracking-widest rounded">
                  {product.category}
                </span>
                <span className="text-xs text-neutral-400 font-mono">ID: {product.id}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-black font-mono text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-neutral-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded">
                  In Stock • Ships in 24h
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {product.description}
            </p>

            {/* GA4 Plushie Conversion Friction Optimization Notice */}
            {isPlushie && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/50 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span>GA4 UX OPTIMIZED LISTING</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  GA4 data revealed 1,583 Add-to-Carts but low purchase volume for the Android Plushie due to checkout shipping uncertainty. We eliminated friction with upfront transparent pricing, guaranteed 3-day express shipping ($4.99 flat rate), and 1-click checkout.
                </p>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  Color: <span className="text-white font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-red-500 scale-110 shadow-md shadow-red-950'
                          : 'border-neutral-700 hover:border-neutral-500'
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

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span>Size: <span className="text-white font-normal">{selectedSize}</span></span>
                  <span className="text-neutral-400 underline cursor-pointer">Fit Guide</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 text-xs font-bold uppercase rounded border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-950'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-1.5 text-white hover:bg-neutral-800 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold font-mono text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-1.5 text-white hover:bg-neutral-800 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                  className="py-4 px-6 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-red-950"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-4 px-6 bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current text-amber-600" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-neutral-400">
                <div className="flex items-center justify-center gap-1.5 p-2 rounded bg-neutral-900 border border-neutral-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                  <span>Authentic Drop</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-2 rounded bg-neutral-900 border border-neutral-800">
                  <Truck className="w-3.5 h-3.5 text-red-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-2 rounded bg-neutral-900 border border-neutral-800">
                  <RotateCcw className="w-3.5 h-3.5 text-red-500" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-2 pt-4 border-t border-neutral-800">
              
              {/* Details Accordion */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white text-left cursor-pointer"
                >
                  <span>PRODUCT DETAILS</span>
                  {openAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'details' && (
                  <div className="px-4 pb-4 text-xs text-neutral-300 space-y-2 border-t border-neutral-800/80 pt-3">
                    <ul className="list-disc list-inside space-y-1 text-neutral-400">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Material Accordion */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                <button
                  onClick={() => toggleAccordion('material')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white text-left cursor-pointer"
                >
                  <span>MATERIAL & CARE</span>
                  {openAccordion === 'material' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'material' && (
                  <div className="px-4 pb-4 text-xs text-neutral-300 space-y-1 border-t border-neutral-800/80 pt-3">
                    <p>{product.material}</p>
                    <p className="text-neutral-400">Machine wash cold inside out. Hang dry to maintain graphic integrity.</p>
                  </div>
                )}
              </div>

              {/* Shipping Accordion */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white text-left cursor-pointer"
                >
                  <span>SHIPPING INFORMATION</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="px-4 pb-4 text-xs text-neutral-300 space-y-1 border-t border-neutral-800/80 pt-3">
                    <p>{product.shippingInfo}</p>
                  </div>
                )}
              </div>

              {/* Returns Accordion */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                <button
                  onClick={() => toggleAccordion('returns')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white text-left cursor-pointer"
                >
                  <span>RETURNS & EXCHANGES</span>
                  {openAccordion === 'returns' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'returns' && (
                  <div className="px-4 pb-4 text-xs text-neutral-300 space-y-1 border-t border-neutral-800/80 pt-3">
                    <p>{product.returnsInfo}</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Section 14: COMPLETE THE LOOK */}
        <div className="pt-16 border-t border-neutral-800 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
                RECOMMENDED PAIRINGS
              </span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tight mt-1">
                COMPLETE THE LOOK
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="hidden sm:block text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
            >
              VIEW ALL ESSENTIALS →
            </button>
          </div>

          <ProductGrid products={recommendedProducts} listName="Complete The Look" columns={4} />
        </div>

      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-neutral-950/95 border-t border-neutral-800 p-3 lg:hidden z-30 backdrop-blur-md">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-white line-clamp-1">{product.name}</span>
            <span className="text-xs font-mono font-bold text-red-400">${product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
            className="py-2.5 px-5 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
