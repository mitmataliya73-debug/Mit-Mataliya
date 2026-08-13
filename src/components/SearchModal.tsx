import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    navigateTo,
    addToCart,
  } = useEcommerce();

  if (!isSearchOpen) return null;

  const results = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.details.some((d) => d.toLowerCase().includes(q))
    );
  });

  const popularTags = ['Pullover', 'Tee', 'Plushie', 'Hoodie', 'Tote', 'Cap', 'Parka', 'Bottle'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-start pt-16 px-4">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl space-y-4">
        
        {/* Search Header Input Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-6 h-6 text-red-500 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search Google × Spider-Man products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-white text-base sm:text-xl font-bold placeholder-neutral-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer ml-2"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-6 py-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-500 font-bold uppercase tracking-wider mr-1">TRENDING:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800/80 text-neutral-300 hover:text-white hover:border-red-500 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {searchQuery.trim() === '' ? (
            <div className="text-center py-10 text-neutral-500 text-sm">
              Type above to search the Brand New Day collection catalog.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Search className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-white font-bold">NO PRODUCTS FOUND FOR "{searchQuery}"</p>
              <p className="text-neutral-400 text-xs max-w-sm mx-auto">
                Try searching for keywords like "Marine Layer", "Banana Tee", "Hoodie", "Plushie", or "Cap".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                  navigateTo('shop');
                }}
                className="mt-2 px-6 py-2.5 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg"
              >
                BROWSE ALL PRODUCTS
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-neutral-400 font-mono flex justify-between">
                <span>FOUND {results.length} MATCHING PRODUCTS</span>
              </div>

              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-all group"
                >
                  <div
                    onClick={() => {
                      setSearchOpen(false);
                      navigateTo('product-detail', product);
                    }}
                    className="flex items-center gap-4 cursor-pointer flex-1"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg bg-neutral-900 border border-neutral-800"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white uppercase group-hover:text-red-400 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-red-400">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        navigateTo('product-detail', product);
                      }}
                      className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs font-bold cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        setSearchOpen(false);
                      }}
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase cursor-pointer flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
