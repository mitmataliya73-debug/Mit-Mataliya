import React, { useState } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { Check, ShieldCheck, Lock, ArrowLeft, CreditCard, Sparkles, ShoppingBag } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    checkoutData,
    setCheckoutData,
    processCheckout,
    getCartSubtotal,
    lastOrderNumber,
    navigateTo,
  } = useEcommerce();

  const [step, setStep] = useState<'contact' | 'shipping' | 'payment' | 'confirmation'>('contact');

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 75 ? 0 : 5.99;
  const tax = +(subtotal * 0.08875).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    processCheckout();
    setStep('confirmation');
  };

  if (step === 'confirmation' && lastOrderNumber) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 bg-emerald-950 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
              ORDER CONFIRMED • GA4 PURCHASE FIRED
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-white">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-neutral-400 text-sm">
              Your academic drop order number is <span className="font-mono font-bold text-white">{lastOrderNumber}</span>
            </p>
          </div>

          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-left text-xs space-y-2 text-neutral-300">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span>Confirmation sent to:</span>
              <span className="font-bold text-white font-mono">{checkoutData.email}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span>Shipping to:</span>
              <span className="font-bold text-white">{checkoutData.firstName} {checkoutData.lastName}, {checkoutData.city}, {checkoutData.state}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Total Paid:</span>
              <span className="font-bold text-red-400 font-mono text-sm">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg cursor-pointer"
            >
              CONTINUE SHOPPING
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg border border-neutral-700 cursor-pointer"
            >
              VIEW GA4 ACADEMIC REPORT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white py-20 text-center space-y-4 px-4">
        <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
        <h2 className="text-2xl font-black uppercase text-white">YOUR CART IS EMPTY</h2>
        <p className="text-neutral-400 text-sm">Add items from the collection to proceed with checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg"
        >
          EXPLORE SHOP
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('shop')}
          className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO SHOPPING</span>
        </button>

        {/* Steps Breadcrumb */}
        <div className="flex items-center justify-between max-w-xl mx-auto border-b border-neutral-800 pb-4 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setStep('contact')}
            className={`flex items-center gap-2 cursor-pointer ${step === 'contact' ? 'text-red-500' : 'text-neutral-500'}`}
          >
            <span className="w-5 h-5 rounded-full bg-neutral-900 border border-current flex items-center justify-center text-[10px]">1</span>
            <span>CONTACT</span>
          </button>

          <span className="text-neutral-700">—</span>

          <button
            onClick={() => setStep('shipping')}
            className={`flex items-center gap-2 cursor-pointer ${step === 'shipping' ? 'text-red-500' : 'text-neutral-500'}`}
          >
            <span className="w-5 h-5 rounded-full bg-neutral-900 border border-current flex items-center justify-center text-[10px]">2</span>
            <span>SHIPPING</span>
          </button>

          <span className="text-neutral-700">—</span>

          <button
            onClick={() => setStep('payment')}
            className={`flex items-center gap-2 cursor-pointer ${step === 'payment' ? 'text-red-500' : 'text-neutral-500'}`}
          >
            <span className="w-5 h-5 rounded-full bg-neutral-900 border border-current flex items-center justify-center text-[10px]">3</span>
            <span>PAYMENT</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* STEP 1: CONTACT */}
            {step === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black uppercase text-white tracking-wider">1. CONTACT INFORMATION</h2>
                  <p className="text-xs text-neutral-400 mt-1">We will send your drop confirmation and tracking link here.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={checkoutData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={checkoutData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('shipping')}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-colors"
                >
                  CONTINUE TO SHIPPING
                </button>
              </div>
            )}

            {/* STEP 2: SHIPPING */}
            {step === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black uppercase text-white tracking-wider">2. SHIPPING ADDRESS</h2>
                  <p className="text-xs text-neutral-400 mt-1">Free express shipping automatically applied over $75.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={checkoutData.address}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                      Apartment / Suite (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={checkoutData.apartment}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={checkoutData.city}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={checkoutData.state}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1">
                        ZIP
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={checkoutData.zipCode}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('contact')}
                    className="py-4 px-6 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg border border-neutral-800 cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setStep('payment')}
                    className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-colors"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 'payment' && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <h2 className="text-xl font-black uppercase text-white tracking-wider">3. PAYMENT METHOD</h2>
                  <p className="text-xs text-neutral-400 mt-1">Prototype transaction • No real money is charged.</p>
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <CreditCard className="w-4 h-4 text-red-500" />
                    <span>Credit / Debit Card (Simulated)</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={checkoutData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={checkoutData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={checkoutData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-neutral-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Completing order will fire standard GA4 <code className="text-white font-mono font-bold">purchase</code> event.</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="py-4 px-6 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg border border-neutral-800 cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-colors shadow-xl shadow-red-950 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>PLACE ORDER (${total.toFixed(2)})</span>
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-neutral-800 pb-3">
                ORDER SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)} ITEMS)
              </h3>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded bg-neutral-950" />
                    <div className="flex-1">
                      <p className="font-bold text-white uppercase line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-neutral-400">Qty: {item.quantity} {item.selectedSize && `• ${item.selectedSize}`}</p>
                    </div>
                    <span className="font-mono font-bold text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className="font-mono text-emerald-400 font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax (NY 8.875%)</span>
                  <span className="font-mono text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-3 border-t border-neutral-800">
                  <span>Total Due</span>
                  <span className="font-mono text-red-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider pt-2">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>Google × Spider-Man Official Campaign Prototype</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
