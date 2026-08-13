import React from 'react';
import { Product } from '../types';
import { useEcommerce } from '../context/EcommerceContext';
import { Eye, ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  listName?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, listName = 'Product Catalog' }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useEcommerce();

  const isWishlisted = wishlist.includes(product.id);

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'FEATURED DROP':
        return 'bg-red-600 text-white';
      case 'FAN FAVOURITE':
        return 'bg-amber-500 text-black';
      case 'HIGH INTEREST':
        return 'bg-blue-600 text-white';
      case 'LIMITED':
        return 'bg-purple-600 text-white';
      case 'BESTSELLER':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  return (
    <div className="group relative bg-[#0d1117] overflow-hidden border border-white/10 hover:border-[#E62429]/60 transition-all duration-300 flex flex-col h-full shadow-xl">
      {/* Image Container */}
      <div 
        onClick={() => navigateTo('product-detail', product)}
        className="relative aspect-square w-full overflow-hidden bg-black cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-2.5 py-1 font-bold text-[9px] tracking-widest uppercase shadow ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 backdrop-blur-md z-10 transition-colors ${
            isWishlisted
              ? 'bg-[#E62429] text-white'
              : 'bg-black/70 text-white/70 hover:text-white hover:bg-black'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Hover Overlay Actions (Desktop) */}
        <div className="hidden md:flex absolute inset-x-3 bottom-3 items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('product-detail', product);
            }}
            className="flex-1 py-2 bg-black/90 hover:bg-white hover:text-black text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 flex items-center justify-center gap-1.5 backdrop-blur-sm cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>DETAILS</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex-1 py-2 bg-[#E62429] hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3 bg-[#0d1117]">
        <div>
          <div className="flex items-center justify-between text-[10px] font-bold text-[#E62429] uppercase tracking-widest mb-1">
            <span>{product.category}</span>
            {product.colors && product.colors.length > 0 && (
              <span className="text-white/40">{product.colors.length} COLORS</span>
            )}
          </div>

          <h3
            onClick={() => navigateTo('product-detail', product)}
            className="font-display text-lg text-white group-hover:text-[#E62429] transition-colors line-clamp-1 cursor-pointer uppercase tracking-tight"
          >
            {product.name}
          </h3>

          <p className="text-xs text-white/50 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Mobile CTA */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-sm text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-white/40 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="md:hidden py-1.5 px-3 bg-[#E62429] hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
