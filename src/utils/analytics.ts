import { GA4Event, Product, CartItem } from '../types';

type EventListener = (event: GA4Event) => void;

class GA4AnalyticsManager {
  private measurementId: string = 'GA_MEASUREMENT_ID';
  private eventLogs: GA4Event[] = [];
  private listeners: EventListener[] = [];

  constructor() {
    // Initialize default measurement ID configuration
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
    }
  }

  public getMeasurementId(): string {
    return this.measurementId;
  }

  public getEventLogs(): GA4Event[] {
    return [...this.eventLogs];
  }

  public subscribe(listener: EventListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emitEvent(eventName: string, parameters: Record<string, any>) {
    const eventObj: GA4Event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      eventName,
      parameters,
    };

    this.eventLogs.unshift(eventObj);
    if (this.eventLogs.length > 50) {
      this.eventLogs.pop();
    }

    // Push to standard GA4 window.dataLayer if available
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...parameters,
      });
    }

    // Console notification
    console.log(`[GA4 Event] ${eventName}:`, parameters);

    // Broadcast to UI subscribers
    this.listeners.forEach((listener) => listener(eventObj));
  }

  // GA4 Ecommerce Standard Events
  public trackPageView(pagePath: string, pageTitle: string) {
    this.emitEvent('page_view', {
      page_location: pagePath,
      page_title: pageTitle,
      user_agent_device: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
    });
  }

  public trackViewItem(product: Product) {
    this.emitEvent('view_item', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
    });
  }

  public trackSelectItem(product: Product, listName: string = 'Featured Drop List') {
    this.emitEvent('select_item', {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
        },
      ],
    });
  }

  public trackAddToCart(product: Product, quantity: number = 1, size?: string, color?: string) {
    this.emitEvent('add_to_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: quantity,
          item_variant: size ? `Size: ${size}` : color ? `Color: ${color}` : 'Standard',
        },
      ],
    });
  }

  public trackRemoveFromCart(product: Product, quantity: number = 1) {
    this.emitEvent('remove_from_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: quantity,
        },
      ],
    });
  }

  public trackViewCart(cartItems: CartItem[], totalValue: number) {
    this.emitEvent('view_cart', {
      currency: 'USD',
      value: totalValue,
      items: cartItems.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });
  }

  public trackBeginCheckout(cartItems: CartItem[], totalValue: number) {
    this.emitEvent('begin_checkout', {
      currency: 'USD',
      value: totalValue,
      items: cartItems.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });
  }

  public trackPurchase(transactionId: string, cartItems: CartItem[], totalValue: number, tax: number = 0, shipping: number = 0) {
    this.emitEvent('purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value: totalValue,
      tax: tax,
      shipping: shipping,
      items: cartItems.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });
  }

  public trackSearch(searchTerm: string, resultsCount: number) {
    this.emitEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }

  public trackViewPromotion(promotionId: string, promotionName: string, creativeSlot: string) {
    this.emitEvent('view_promotion', {
      promotion_id: promotionId,
      promotion_name: promotionName,
      creative_slot: creativeSlot,
    });
  }

  public trackSelectPromotion(promotionId: string, promotionName: string, creativeSlot: string) {
    this.emitEvent('select_promotion', {
      promotion_id: promotionId,
      promotion_name: promotionName,
      creative_slot: creativeSlot,
    });
  }

  public clearLogs() {
    this.eventLogs = [];
    this.emitEvent('analytics_reset', { message: 'GA4 Event Log Reset' });
  }
}

export const analytics = new GA4AnalyticsManager();
