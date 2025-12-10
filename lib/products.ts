export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  badge: string;
  image: string; // Main image for home/collection pages
  images?: string[]; // Multiple images for product detail page slider
  description?: string;
  alt?: string;
  category: "Pillow" | "Cushion" | "Bolster";
}

export interface CategoryProduct {
  id: number;
  name: string;
  image: string;
  alt: string;
}

export const allProducts: Product[] = [
  // Pillow Products
  {
    id: 1,
    name: "Doctor Pillow",
    price: 1250,
    originalPrice: 2500,
    badge: "Best Seller",
    image: "/img/doctor-pillow.jpg",
    images: [
      "/img/doctor-pillow.jpg",           // Main product image (packaging/carrying bag)
      "/img/doctor-pillow-2.jpg",         // Woman sleeping peacefully
      "/img/doctor-pillow-3.jpg",         // Three-panel feature collage
      "/img/doctor-pillow-4.jpg"          // Doctor Recommended advertisement
    ],
    description: "Doctor recommended pillow with memory foam core, cooling gel technology, and non-allergenic materials. Trusted by professionals for neck pain relief and restorative sleep.",
    category: "Pillow"
  },
  {
    id: 2,
    name: "Paradise Pillow",
    price: 999,
    badge: "Best Seller",
    image: "/img/paradise-pillow.jpg",
    images: [
      "/img/paradise-pillow.jpg",
      "/img/paradise-pillow-2.jpg",
      "/img/paradise-pillow-3.jpg",
      "/img/paradise-pillow-4.jpg",
      "/img/paradise-pillow-5.jpg"
    ],
    description: "Ultimate softness for peaceful sleep",
    category: "Pillow"
  },
  {
    id: 3,
    name: "Neem Plus Pillow",
    price: 1500,
    originalPrice: 2000,
    badge: "Best Seller",
    image: "/img/neem-plus-pillow.jpg",
    images: ["/img/neem-plus-pillow.jpg", "/img/neem-plus-pillow-2.jpg", "/img/neem-plus-pillow-3.jpg", "/img/neem-plus-pillow-4.jpg", "/img/neem-plus-pillow-5.jpg"],
    description: "Natural neem properties for healthy sleep",
    category: "Pillow"
  },
  {
    id: 4,
    name: "Heritage Pillow",
    price: 899,
    badge: "Best Seller",
    image: "/img/heritage-pillow.jpg",
    images: ["/img/heritage-pillow.jpg", "/img/heritage-pillow-2.jpg", "/img/heritage-pillow-3.jpg", "/img/heritage-pillow-4.jpg"],
    description: "Classic comfort with modern technology",
    category: "Pillow"
  },
  
];

export const categoryProducts: CategoryProduct[] = [
  {
    id: 1,
    name: "Pillow",
    image: "/img/pillow.jpg",
    alt: "Pillow"
  },
  {
    id: 2,
    name: "Cushion",
    image: "/img/cushion.jpg",
    alt: "Cushion"
  },
  {
    id: 3,
    name: "Bolster",
    image: "/img/bolster.jpg",
    alt: "Bolster"
  }
];

