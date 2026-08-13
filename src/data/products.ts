import { Product } from '../types';

import heroImg from '../assets/images/hero_spiderman_streetwear_1786594299507.jpg';
import campaignImg from '../assets/images/campaign_brand_new_day_1786594319851.jpg';

export const HERO_IMAGE = heroImg;
export const CAMPAIGN_IMAGE = campaignImg;

export const PRODUCTS: Product[] = [
  {
    id: 'prod_marine_layer_1998',
    name: 'Google Marine Layer 1998 Pullover',
    slug: 'google-marine-layer-1998-pullover',
    category: 'clothing',
    price: 88.00,
    originalPrice: 110.00,
    badge: 'FEATURED DROP',
    shortDescription: 'Heavyweight organic French terry pullover with minimalist spider-web back graphics and embroidered 1998 logo.',
    description: 'Crafted in collaboration with Marine Layer, this limited-edition 1998 anniversary pullover fuses Google\'s iconic heritage with Spider-Man: Brand New Day street aesthetics. Built with ultra-soft 100% organic cotton French terry, custom web-pattern lining, and reflective spider-line sleeve accents.',
    details: [
      '100% Organic French Terry Cotton (450 GSM heavyweight)',
      'Subtle tonal web line embroidery on back shoulders',
      'Custom 1998 Google heritage logo on left chest',
      'Reflective Spider-Man Brand New Day tag on lower hem',
      'Relaxed streetwear fit with drop shoulders',
      'Made in sustainable partnership with Marine Layer'
    ],
    material: '100% Organic Cotton French Terry. Pre-shrunk.',
    shippingInfo: 'Free express shipping on US orders over $75. Dispatches within 24 hours.',
    returnsInfo: 'Free 30-day returns and exchanges with prepaid return label included.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Navy', hex: '#0a0d1a' },
      { name: 'Crimson Web Red', hex: '#8b0d11' },
      { name: 'Stealth Black', hex: '#111115' }
    ],
    inStock: true,
    featured: true,
    ga4Stats: {
      views: 2056,
      addToCarts: 259,
      purchases: 78,
      revenue: 7850,
      insightNote: 'Highest revenue generator in the GA4 dataset ($7,850). Featured as the primary drop product.'
    }
  },
  {
    id: 'prod_nano_banana_tee',
    name: 'Nano Banana Tee',
    slug: 'nano-banana-tee',
    category: 'clothing',
    price: 38.00,
    originalPrice: 48.00,
    badge: 'FAN FAVOURITE',
    shortDescription: 'Heavyweight graphic tee inspired by tech playfulness and Spider-Man motion lines.',
    description: 'The viral favorite Google Merchandise staple reimagined for Brand New Day. Features a premium heavyweight 240 GSM combed cotton base with screen-printed halftone banana artwork interlaced with dynamic web-swinging vector lines.',
    details: [
      '240 GSM Combed Cotton Heavyweight Jersey',
      'Custom Halftone Nano Banana x Spider Vector Graphic',
      'Ribbed collar with reinforced back neck tape',
      'Boxy modern streetwear silhouette',
      'Dual branded Google x Spider-Man woven collar tag'
    ],
    material: '100% Combed Ringspun Cotton.',
    shippingInfo: 'Standard 2-4 business day delivery across North America.',
    returnsInfo: 'Easy 30-day hassle-free return policy.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', hex: '#f8f9fa' },
      { name: 'Cyber Black', hex: '#141416' }
    ],
    inStock: true,
    featured: true,
    highInterest: true,
    ga4Stats: {
      views: 1366,
      addToCarts: 657,
      purchases: 219,
      revenue: 5977,
      insightNote: 'Strongest purchase-volume product (219 orders, 657 add-to-carts).'
    }
  },
  {
    id: 'prod_android_classic_plushie',
    name: 'Android Classic Plushie',
    slug: 'android-classic-plushie',
    category: 'collectibles',
    price: 24.00,
    badge: 'LIMITED',
    shortDescription: 'Collector-edition 10" soft velvet Android Bugdroid wearing a mini Spider-Mask hoodie.',
    description: 'Limited-run academic collab collectible. The classic Google Android mascot handcrafted from premium anti-pill plush velvet, fitted with a removable spider-web zip hoodie. Designed as a desk centerpiece for developers and collectors.',
    details: [
      '10-inch custom soft plush velvet construction',
      'Removable micro-zippered web design hoodie',
      'Embroidered chest tech badge and Spider emblem',
      'Weighted base for stable desktop display',
      'Includes serialized holographic authentication tag'
    ],
    material: 'Ultra-soft plush polyester fleece with hypoallergenic poly-fill.',
    shippingInfo: 'Transparent flat-rate shipping ($4.99). Guaranteed arrival in 3 business days.',
    returnsInfo: '30-day money back guarantee with full refund on unopened or inspected items.',
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: true,
    ga4Stats: {
      views: 1265,
      addToCarts: 1583,
      purchases: 19,
      revenue: 583,
      insightNote: 'High Add-To-Cart (1,583) vs Purchase (19) discrepancy addressed by frictionless checkout & transparent shipping breakdown.'
    }
  },
  {
    id: 'prod_pixel_everyday_tote',
    name: 'Google Pixel Everyday Tech Tote',
    slug: 'google-pixel-everyday-tech-tote',
    category: 'accessories',
    price: 65.00,
    shortDescription: 'Weatherproof ripstop nylon tech tote with padded 16" laptop sleeve and web-weave utility straps.',
    description: 'Built for urban commuter life. Engineered with 600D ballistic recycled nylon, water-resistant zippers, and webbed nylon harness loops that allow modular attachment of accessories.',
    details: [
      'Recycled 600D Weatherproof Ripstop Nylon',
      'Padded sleeve fits up to 16" MacBook Pro / Pixelbook',
      'Web-weave modular daisy chain front straps',
      'Hidden magnetic phone pocket with microfleece lining',
      'Dual tote handles & detachable padded cross-body shoulder strap'
    ],
    material: '100% Recycled Ballistic Ripstop Polyester.',
    shippingInfo: 'Free US shipping included.',
    returnsInfo: 'Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111115' },
      { name: 'Red Web Accent', hex: '#c1121f' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'prod_spider_heavyweight_hoodie',
    name: 'Spider-Web Embroidered Heavyweight Hoodie',
    slug: 'spider-web-embroidered-heavyweight-hoodie',
    category: 'clothing',
    price: 110.00,
    originalPrice: 135.00,
    badge: 'BESTSELLER',
    shortDescription: '500 GSM double-layer hood fleece with laser-etched spider web graphics on arms and torso.',
    description: 'The heavyweight cornerstone of the Brand New Day street armor series. Features dense 500 GSM cotton fleece with custom laser-engraved webbing, double-needle stitched cuffs, and custom metal aglets with engraved Google Chrome coordinates.',
    details: [
      '500 GSM Ultra-Heavyweight Organic Fleece',
      'Laser-engraved web topography on sleeves',
      'Double-layer thermal fleece lined hood',
      'Custom gunmetal aglets with Google geo coordinates',
      'Kangaroo pocket with concealed zipper stash pocket'
    ],
    material: '100% Organic Heavyweight Cotton Fleece.',
    shippingInfo: 'Express dispatch within 24 hours.',
    returnsInfo: '30-day hassle-free return guarantee.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Dark Navy', hex: '#0d111e' },
      { name: 'Obsidian', hex: '#111113' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'prod_tactical_cap',
    name: 'Google Brand New Day Tactical Cap',
    slug: 'google-brand-new-day-tactical-cap',
    category: 'accessories',
    price: 34.00,
    shortDescription: 'Unstructured 6-panel nylon cap with rubberized spider-web logo patch and adjustable buckle strap.',
    description: 'Lightweight hydrophobic nylon cap featuring a matte rubberized Google G x Spider emblem, breathable laser-cut side eyelets, and quick-dry sweatband.',
    details: [
      'Water-repellent technical nylon shell',
      '3D molded rubberized logo on front crown',
      'Laser-cut ventilation eyelets in web matrix pattern',
      'Adjustable webbing strap with matte black aluminum buckle'
    ],
    material: '100% Hydrophobic Nylon.',
    shippingInfo: 'Ships in protective crush-proof box.',
    returnsInfo: '30-day return window.',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Black', hex: '#18181c' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'prod_stainless_bottle',
    name: 'Spider-Infused Stainless Steel Bottle (750ml)',
    slug: 'spider-infused-stainless-steel-bottle-750ml',
    category: 'accessories',
    price: 42.00,
    shortDescription: 'Vacuum insulated double-wall steel bottle with matte rubber web grip and leakproof loop lid.',
    description: 'Keeps drinks cold for 24 hours or hot for 12 hours. Textured with a tactile matte 3D spider-web rubber coating for non-slip grip during active urban movement.',
    details: [
      '750ml / 25oz Food-Grade 18/8 Stainless Steel',
      'Double-wall vacuum insulation technology',
      '3D tactile rubber web grip surface',
      'BPA-free carabiner carry lid with leakproof seal'
    ],
    material: '18/8 Pro-Grade Stainless Steel.',
    shippingInfo: 'Packaged in 100% recycled paperboard.',
    returnsInfo: '30-day easy returns.',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'prod_metallic_pin_set',
    name: 'Google Chrome Metallic Collectible Pin Set',
    slug: 'google-chrome-metallic-collectible-pin-set',
    category: 'collectibles',
    price: 28.00,
    badge: 'LIMITED',
    shortDescription: 'Set of 4 enamel enamel pins featuring Chrome logo, Spider-Emblem, Android Bugdroid & New York 1998 badge.',
    description: 'High-polish hard enamel pin set presented in a custom collector box with magnetic closure. Ideal for denim jackets, tech totes, and lanyard customization.',
    details: [
      '4 custom hard enamel die-struck metallic pins',
      'Black nickel plating with glossy enamel fill',
      'Dual rubber clutch backings on each pin',
      'Includes Brand New Day presentation display box'
    ],
    material: 'Die-struck Zinc Alloy with Hard Enamel Coating.',
    shippingInfo: 'Standard 3-day US shipping.',
    returnsInfo: '30-day returns accepted.',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'prod_nyc_parka',
    name: 'New York Urban Tech Parka',
    slug: 'new-york-urban-tech-parka',
    category: 'clothing',
    price: 165.00,
    originalPrice: 195.00,
    badge: 'FEATURED DROP',
    shortDescription: 'Windproof 3-layer laminated tech jacket with reflective web harness straps and storm hood.',
    description: 'Designed for high-tempo urban weather. Engineered with a 3-layer breathable waterproof membrane, fully taped seams, magnetic pocket flaps, and internal webbed harness straps that allow you to wear the parka off-shoulder indoors.',
    details: [
      '20,000mm Waterproof / 15,000g Breathable 3-Layer Membrane',
      'Internal carry harness with spider-line webbing',
      'YKK AquaGuard weather-sealed zippers',
      'Reflective 3M Scotchlite Brand New Day graphics',
      'Adjustable storm hood with wired visor'
    ],
    material: '100% Recycled Polyester Shell with TPU Laminate.',
    shippingInfo: 'Free US Express Shipping included.',
    returnsInfo: 'Free 30-day returns with return shipping label.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Dark Obsidian', hex: '#0c0d12' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'prod_neon_cyber_beanie',
    name: 'Google Neon Cyber Beanie',
    slug: 'google-neon-cyber-beanie',
    category: 'accessories',
    price: 30.00,
    shortDescription: 'Ribbed knit watch cap beanie with woven crimson tab label and thermal fleece lining.',
    description: 'Warm, ultra-comfortable stretch watch cap made with eco-acrylic yarn and lined with plush microfleece. Finished with a subtle woven web icon patch on the cuff.',
    details: [
      '100% Recycled Soft Eco-Acrylic Knit',
      'Internal wind-blocking microfleece earband',
      'Woven silicone-coated logo patch on turn-up cuff',
      'One size fits most stretch engineering'
    ],
    material: 'Eco-Friendly Acrylic Knit + Polyester Fleece.',
    shippingInfo: 'Dispatches within 24 hours.',
    returnsInfo: '30-day returns.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#16171d' },
      { name: 'Spider Red', hex: '#d90429' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'prod_web_canvas_backpack',
    name: 'Brand New Day Web Canvas Backpack',
    slug: 'brand-new-day-web-canvas-backpack',
    category: 'accessories',
    price: 95.00,
    shortDescription: 'Heavy-duty 28L commuter daypack with modular web carabiner attachments and dedicated laptop chamber.',
    description: 'Engineered with 18oz waxed duck canvas and matte tactical hardware. Designed with dual side bottle pockets, top fleece-lined tech pocket, and ergonomic airflow back padding.',
    details: [
      '18oz Heavy Duty Waxed Canvas',
      'Dedicated 16" laptop pocket with EVA foam suspension',
      'Laser-welded web harness straps on exterior',
      'Air-mesh breathable back panel & shoulder straps'
    ],
    material: 'Waxed Canvas & Recycled Polyester.',
    shippingInfo: 'Free US ground shipping.',
    returnsInfo: '30-day money back returns.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'prod_retro_graphic_longsleeve',
    name: 'Google Retro Graphic Longsleeve',
    slug: 'google-retro-graphic-longsleeve',
    category: 'clothing',
    price: 52.00,
    shortDescription: 'Vintage washed longsleeve jersey tee with halftone Spider-Man comic graphics and sleeve web prints.',
    description: 'Midweight 220 GSM garment-dyed cotton longsleeve tee with a soft vintage patina. Graphic elements blend early 2000s Google tech UI with classic Spider-Man comic printing halftone technique.',
    details: [
      '220 GSM Garment-Dyed Cotton Jersey',
      'Screen printed web graphic running down both sleeves',
      'Ribbed cuffs and crewneck collar',
      'Pre-shrunk vintage wash treatment'
    ],
    material: '100% Ring-Spun Vintage Washed Cotton.',
    shippingInfo: 'Fast 2-3 day shipping.',
    returnsInfo: '30-day return window.',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Vintage Black', hex: '#1d1d22' },
      { name: 'Washed Navy', hex: '#161c2e' }
    ],
    inStock: true,
    featured: false
  }
];
