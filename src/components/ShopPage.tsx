import React, { useState } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from './ProductGrid';
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { filterOptions, setFilterOptions, resetFilters } = useEcommerce();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category match
    if (filterOptions.category !== 'all' && filterOptions.category !== 'new-drop') {
      if (product.category !== filterOptions.category) return false;
    } else if (filterOptions.category === 'new-drop') {
      if (!product.featured && product.badge !== 'FEATURED DROP') return false;
    }

    // Price match
    if (
      product.price < filterOptions.priceRange[0] ||
      product.price > filterOptions.priceRange[1]
    ) {
      return false;
    }

    // Search query match
    if (filterOptions.searchQuery.trim() !== '') {
      const query = filterOptions.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchCategory = product.category.toLowerCase().includes(query);
      const matchDesc = product.shortDescription.toLowerCase().includes(query);
      if (!matchName && !matchCategory && !matchDesc) return false;
    }

    // In stock
    if (filterOptions.onlyInStock && !product.inStock) return false;

    return true;
  }).sort((a, b) => {
    switch (filterOptions.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'bestselling':
        return (b.ga4Stats?.purchases || 0) - (a.ga4Stats?.purchases || 0);
      case 'newest':
        return b.id.localeCompare(a.id);
      default: // 'featured'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-red-950/30 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
              GOOGLE × SPIDER-MAN COLLECTION
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              SHOP GOOGLE ESSENTIALS
            </h1>
            <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
              Explore the complete catalog of limited-edition apparel, urban accessories, and tech collectibles reimagined for Brand New Day.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by title, tag, or material..."
              value={filterOptions.searchQuery}
              onChange={(e) => setFilterOptions((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs font-medium text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
            {filterOptions.searchQuery && (
              <button
                onClick={() => setFilterOptions((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Category Filters */}
          <div className="hidden lg:flex items-center gap-2">
            {[
              { id: 'all', label: 'ALL' },
              { id: 'clothing', label: 'CLOTHING' },
              { id: 'accessories', label: 'ACCESSORIES' },
              { id: 'collectibles', label: 'COLLECTIBLES' },
              { id: 'new-drop', label: 'NEW DROP' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterOptions((prev) => ({ ...prev, category: cat.id }))}
                className={`px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-lg border transition-all cursor-pointer ${
                  filterOptions.category === cat.id
                    ? 'bg-red-600 text-white border-red-500 shadow-sm'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold text-neutral-200 cursor-pointer"
            >
              <Filter className="w-4 h-4 text-red-500" />
              <span>FILTERS</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider hidden sm:inline">SORT:</span>
              <select
                value={filterOptions.sortBy}
                onChange={(e) =>
                  setFilterOptions((prev) => ({ ...prev, sortBy: e.target.value as any }))
                }
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-red-500 cursor-pointer uppercase tracking-wider"
              >
                <option value="featured">Featured Drops</option>
                <option value="bestselling">Best Selling (GA4)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Left Sidebar Filter Panel */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800 h-fit">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-500" />
                <span>FILTER ESSENTIALS</span>
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-neutral-400 hover:text-red-400 flex items-center gap-1 font-semibold uppercase tracking-wider cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                CATEGORY
              </label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'clothing', label: 'Clothing & Tops' },
                  { id: 'accessories', label: 'Bags & Accessories' },
                  { id: 'collectibles', label: 'Collectibles & Pins' },
                  { id: 'new-drop', label: 'Brand New Day Drop' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilterOptions((prev) => ({ ...prev, category: item.id }))}
                    className={`block w-full text-left px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      filterOptions.category === item.id
                        ? 'bg-red-600/20 text-red-400 border border-red-800/60'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-300 uppercase tracking-wider">
                <span>PRICE RANGE</span>
                <span className="font-mono text-red-400">${filterOptions.priceRange[0]} - ${filterOptions.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={filterOptions.priceRange[1]}
                onChange={(e) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                  }))
                }
                className="w-full accent-red-600 bg-neutral-950 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="grid grid-cols-4 gap-1 text-[10px] text-neutral-400 font-mono text-center">
                <button
                  onClick={() => setFilterOptions((prev) => ({ ...prev, priceRange: [0, 25] }))}
                  className="p-1 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800"
                >
                  &lt;$25
                </button>
                <button
                  onClick={() => setFilterOptions((prev) => ({ ...prev, priceRange: [25, 50] }))}
                  className="p-1 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800"
                >
                  $25-50
                </button>
                <button
                  onClick={() => setFilterOptions((prev) => ({ ...prev, priceRange: [50, 100] }))}
                  className="p-1 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800"
                >
                  $50-100
                </button>
                <button
                  onClick={() => setFilterOptions((prev) => ({ ...prev, priceRange: [100, 200] }))}
                  className="p-1 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800"
                >
                  $100+
                </button>
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-300 uppercase tracking-wider">
              <span>IN STOCK ONLY</span>
              <input
                type="checkbox"
                checked={filterOptions.onlyInStock}
                onChange={(e) =>
                  setFilterOptions((prev) => ({ ...prev, onlyInStock: e.target.checked }))
                }
                className="w-4 h-4 accent-red-600 rounded bg-neutral-950 border-neutral-800 cursor-pointer"
              />
            </div>

          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>SHOWING {filteredProducts.length} PRODUCTS</span>
              {filterOptions.category !== 'all' && (
                <span className="text-red-400 uppercase font-bold">
                  CATEGORY: {filterOptions.category}
                </span>
              )}
            </div>

            <ProductGrid products={filteredProducts} listName="Shop Catalog" columns={3} />
          </div>

        </div>

      </div>

      {/* Mobile Bottom-Sheet Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-sm bg-neutral-950 h-full p-6 space-y-6 overflow-y-auto border-l border-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">FILTER PRODUCTS</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">CATEGORY</label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'clothing', label: 'Clothing' },
                  { id: 'accessories', label: 'Accessories' },
                  { id: 'collectibles', label: 'Collectibles' },
                  { id: 'new-drop', label: 'New Drop' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setFilterOptions((prev) => ({ ...prev, category: item.id }));
                    }}
                    className={`block w-full text-left px-3 py-2.5 rounded text-xs font-bold uppercase tracking-wider ${
                      filterOptions.category === item.id ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price Slider */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-300 uppercase">
                <span>MAX PRICE</span>
                <span className="font-mono text-red-400">${filterOptions.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={filterOptions.priceRange[1]}
                onChange={(e) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                  }))
                }
                className="w-full accent-red-600 bg-neutral-900 h-2 rounded"
              />
            </div>

            <div className="pt-6 border-t border-neutral-800 flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-3 bg-neutral-900 text-white text-xs font-bold uppercase rounded border border-neutral-800"
              >
                RESET
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-red-600 text-white text-xs font-bold uppercase rounded"
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
