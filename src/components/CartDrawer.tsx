import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { PRODUCTS } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    navigateTo,
    addToCart,
  } = useEcommerce();

  if (!isCartDrawerOpen) return null;

  const subtotal = getCartSubtotal();
  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const recommendedItems = PRODUCTS.filter(
    (p) => !cart.some((c) => c.product.id === p.id)
  ).slice(0, 2);

  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-neutral-950 h-full flex flex-col justify-between border-l border-neutral-800 shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-black text-white uppercase tracking-wider">YOUR CART</h2>
            <span className="text-xs font-mono font-bold bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-neutral-900 p-3 px-5 border-b border-neutral-800 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-neutral-300 font-medium">
              Add <span className="font-bold text-red-400 font-mono">${remainingForFreeShipping.toFixed(2)}</span> more for <span className="text-white font-bold uppercase">FREE US SHIPPING</span>
            </p>
          ) : (
            <p className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YOU UNLOCKED FREE EXPRESS SHIPPING!</span>
            </p>
          )}
          <div className="w-full bg-neutral-950 h-1.5 rounded-full mt-2 overflow-hidden border border-neutral-800">
            <div
              className="bg-gradient-to-r from-red-600 to-emerald-500 h-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-12 h-12 text-neutral-700 mx-auto" />
              <p className="text-neutral-400 font-medium text-sm">Your cart is currently empty.</p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigateTo('shop');
                }}
                className="px-6 py-3 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:bg-red-500 transition-colors"
              >
                START SHOPPING THE DROP
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className="flex gap-4 p-3 bg-neutral-900 border border-neutral-800 rounded-xl relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-lg bg-neutral-950 border border-neutral-800"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-white uppercase tracking-wide line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-400 mt-0.5 space-x-2">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-800 rounded bg-neutral-950">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="px-2 py-0.5 text-xs text-white hover:bg-neutral-800 font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-mono font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="px-2 py-0.5 text-xs text-white hover:bg-neutral-800 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono font-bold text-sm text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommended Items inside drawer: YOU MAY ALSO LIKE */}
              {recommendedItems.length > 0 && (
                <div className="pt-6 border-t border-neutral-800 space-y-3">
                  <span className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider block">
                    YOU MAY ALSO LIKE
                  </span>
                  <div className="space-y-2">
                    {recommendedItems.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-center justify-between p-2.5 bg-neutral-900/60 border border-neutral-800/80 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img src={rec.images[0]} alt={rec.name} className="w-10 h-10 object-cover rounded bg-neutral-950" />
                          <div>
                            <p className="text-xs font-bold text-white uppercase line-clamp-1">{rec.name}</p>
                            <p className="text-[10px] font-mono text-neutral-400">${rec.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(rec, 1)}
                          className="px-2.5 py-1 bg-neutral-800 hover:bg-red-600 text-white font-bold text-[10px] uppercase rounded transition-colors cursor-pointer"
                        >
                          + ADD
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-800 bg-neutral-900/80 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {remainingForFreeShipping === 0 ? 'FREE' : '$5.99'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                <span>Total</span>
                <span className="font-mono text-base text-red-400">
                  ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-red-950 group"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>Encrypted SSL 256-Bit Prototype Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
