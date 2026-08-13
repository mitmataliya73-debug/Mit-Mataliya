import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PageType, FilterOptions, CheckoutForm } from '../types';
import { PRODUCTS } from '../data/products';
import { analytics } from '../utils/analytics';

interface EcommerceContextType {
  cart: CartItem[];
  wishlist: string[];
  currentPage: PageType;
  selectedCategory: string;
  selectedProduct: Product | null;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  isGA4InspectorOpen: boolean;
  searchQuery: string;
  filterOptions: FilterOptions;
  notification: { message: string; type: 'success' | 'info' | 'error' } | null;
  checkoutData: CheckoutForm;
  lastOrderNumber: string | null;

  // Actions
  navigateTo: (page: PageType, product?: Product | null, category?: string) => void;
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setGA4InspectorOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutForm>>;
  processCheckout: () => void;
  getCartSubtotal: () => number;
  getCartItemsCount: () => number;
}

const defaultFilterOptions: FilterOptions = {
  category: 'all',
  priceRange: [0, 200],
  sortBy: 'featured',
  searchQuery: '',
  onlyInStock: false,
};

const defaultCheckoutForm: CheckoutForm = {
  email: 'alex.parker@example.com',
  firstName: 'Alex',
  lastName: 'Parker',
  address: '175 5th Avenue (Flatiron)',
  apartment: 'Apt 4B',
  city: 'New York',
  state: 'NY',
  zipCode: '10010',
  country: 'United States',
  paymentMethod: 'credit-card',
  cardNumber: '•••• •••• •••• 4242',
  cardExpiry: '12/28',
  cardCvc: '888',
};

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('g_spiderman_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('g_spiderman_wishlist');
      return saved ? JSON.parse(saved) : ['prod_marine_layer_1998', 'prod_nano_banana_tee'];
    } catch {
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const [isGA4InspectorOpen, setGA4InspectorOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutForm>(defaultCheckoutForm);
  const [lastOrderNumber, setLastOrderNumber] = useState<string | null>(null);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('g_spiderman_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('g_spiderman_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Track page view on page change
  const navigateTo = (page: PageType, product: Product | null = null, category: string = 'all') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (category) {
      setSelectedCategory(category);
      setFilterOptions((prev) => ({ ...prev, category }));
    }

    if (product) {
      setSelectedProduct(product);
      if (page === 'product-detail') {
        analytics.trackViewItem(product);
      }
    }

    const titleMap: Record<PageType, string> = {
      home: 'Google × Spider-Man: Brand New Day | Official Drop',
      shop: 'Shop All Essentials | Google × Spider-Man',
      category: `Category: ${category.toUpperCase()} | Google × Spider-Man`,
      'product-detail': product ? `${product.name} | Google × Spider-Man` : 'Product Detail',
      cart: 'Your Shopping Cart | Google × Spider-Man',
      checkout: 'Secure Checkout | Google × Spider-Man',
      campaign: 'Brand New Day Campaign Story | Google × Spider-Man',
      about: 'Academic GA4 Insights & Campaign Strategy',
    };

    analytics.trackPageView(`/${page}`, titleMap[page] || 'Google x Spider-Man');
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : undefined);
    const chosenColor = color || (product.colors ? product.colors[0].name : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
          },
        ];
      }
    });

    analytics.trackAddToCart(product, quantity, chosenSize, chosenColor);
    showNotification(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    const itemToRemove = cart.find(
      (item) =>
        item.product.id === productId &&
        (!size || item.selectedSize === size) &&
        (!color || item.selectedColor === color)
    );

    if (itemToRemove) {
      analytics.trackRemoveFromCart(itemToRemove.product, itemToRemove.quantity);
      showNotification(`Removed "${itemToRemove.product.name}" from cart`, 'info');
    }

    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!size || item.selectedSize === size) &&
            (!color || item.selectedColor === color)
          )
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (!size || item.selectedSize === size) &&
          (!color || item.selectedColor === color)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const isWishlisted = wishlist.includes(productId);
    if (isWishlisted) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showNotification('Removed item from saved wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showNotification('Saved item to your wishlist', 'success');
    }
  };

  const resetFilters = () => {
    setFilterOptions(defaultFilterOptions);
  };

  const getCartSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const processCheckout = () => {
    const orderNum = `BND-${Math.floor(100000 + Math.random() * 900000)}`;
    const subtotal = getCartSubtotal();
    const shippingCost = subtotal > 75 ? 0 : 5.99;
    const tax = +(subtotal * 0.08875).toFixed(2);
    const total = +(subtotal + shippingCost + tax).toFixed(2);

    analytics.trackPurchase(orderNum, cart, total, tax, shippingCost);
    setLastOrderNumber(orderNum);
    setCart([]);
    showNotification(`Order ${orderNum} confirmed! Confirmation sent to ${checkoutData.email}`, 'success');
  };

  return (
    <EcommerceContext.Provider
      value={{
        cart,
        wishlist,
        currentPage,
        selectedCategory,
        selectedProduct,
        isCartDrawerOpen,
        isSearchOpen,
        isGA4InspectorOpen,
        searchQuery,
        filterOptions,
        notification,
        checkoutData,
        lastOrderNumber,
        navigateTo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        setCartDrawerOpen,
        setSearchOpen,
        setGA4InspectorOpen,
        setSearchQuery,
        setFilterOptions,
        resetFilters,
        showNotification,
        setCheckoutData,
        processCheckout,
        getCartSubtotal,
        getCartItemsCount,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};
