'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import AnimatedSection from "@/components/shared/animated-section";
import FAQ from "@/components/shared/faq";
import ProductCard from "@/components/shared/product-card";
import ProductImageGallery from "@/components/shared/product-image-gallery";
import ProductReviews from "@/components/shared/product-reviews";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { allProducts } from "@/lib/products";
import { productFAQs as productFAQData } from "@/lib/faq-data";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'information' | 'care' | 'support'>('information');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  // Unwrap params promise using React.use()
  const { id } = use(params);
  
  // Find product from allProducts
  const product = allProducts.find(p => p.id.toString() === id);

  // Get previous and next products
  const currentIndex = allProducts.findIndex(p => p.id.toString() === id);
  const previousProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
  const nextProduct = currentIndex < allProducts.length - 1 ? allProducts[currentIndex + 1] : null;

  // Fallback product data with features
  const productFeatures: Record<string, string[]> = {
    '1': [
      "Bio-ceramic fiber technology",
      "Cooling top layer",
      "Flippable design",
      "Hypoallergenic materials"
    ],
    '2': [
      "Memory foam core",
      "Cooling technology",
      "Soft as a cloud",
      "Quality assured"
    ],
    '3': [
      "Neem-infused materials",
      "Natural properties",
      "Cooling top",
      "7 years industry experience"
    ],
    '4': [
      "Classic design",
      "Modern technology",
      "Seamless support",
      "Scientific design"
    ]
  };

  const productDescriptions: Record<string, string> = {
    '1': "Discover the ultimate in sleep comfort with Doctor Pillow, exclusively at Softcool. Expertly designed to support your neck and spine, this innovative pillow adapts to your unique shape, ensuring a restful night's sleep. Crafted from premium materials, Doctor Pillow is both hypoallergenic and breathable, making it ideal for sensitive skin. Elevate your sleep quality with Softcool, where we prioritize your well-being and offer unparalleled bedding solutions. Enhance your nightly rest with Doctor Pillow—where professional comfort meets luxury.",
    '2': "Experience ultimate softness with our Paradise Pillow, designed for peaceful sleep. The Paradise Pillow offers personalized support and alignment through innovative design, combining plush memory foam with cooling technology.",
    '3': "Natural neem properties for healthy sleep. Combining traditional benefits with modern comfort technology, the Neem Plus Pillow provides therapeutic support for better rest.",
    '4': "Classic comfort with modern technology. The Heritage Pillow brings together timeless design and contemporary innovation for the perfect sleep experience."
  };

  const productData = product || {
    id: 0,
    name: "Product",
    price: 0,
    badge: "",
    image: "/img/placeholder.jpg",
    images: ["/img/placeholder.jpg"],
    description: "Product description",
    category: "Pillow" as const
  };

  const features = productFeatures[id] || [];
  const productImages = productData.images || [productData.image];
  const description = productDescriptions[id] || productData.description || "Premium quality product designed for ultimate comfort and support.";
  const sku = `SKU: ${String(productData.id).padStart(3, '0')}`;

  const relatedProducts = allProducts.filter(p => p.id.toString() !== id).slice(0, 4);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        originalPrice: productData.originalPrice,
        image: productData.image,
      });
    }
    alert(`${quantity} ${productData.name}(s) added to cart!`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }
    // Add to cart first
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        originalPrice: productData.originalPrice,
        image: productData.image,
      });
    }
    // Navigate to checkout
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
            <Link href="/" className="hover:text-[#009EDD] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{productData.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="p-8">
        <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Previous/Next Navigation */}
          <div className="flex justify-between items-center mb-6">
            {previousProduct && (
              <Link
                href={`/pillow/${previousProduct.id}`}
                className="flex items-center gap-2 text-gray-600 hover:text-[#009EDD] transition-colors font-sans"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden md:inline">Previous</span>
              </Link>
            )}
            {!previousProduct && <div></div>}
            
            {nextProduct && (
              <Link
                href={`/pillow/${nextProduct.id}`}
                className="flex items-center gap-2 text-gray-600 hover:text-[#009EDD] transition-colors font-sans ml-auto"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Gallery */}
            <AnimatedSection delay={100}>
              <ProductImageGallery 
                images={productImages}
                productName={productData.name}
                badge={productData.badge}
                productId={productData.id}
              />
            </AnimatedSection>

            {/* Product Info */}
            <AnimatedSection delay={200}>
              <div className="text-left">
                {/* Product Name */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-sans">
                  {productData.name}
                </h1>
                
                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  {productData.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through font-sans">
                      ₹{productData.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className={`text-4xl font-bold font-sans ${productData.originalPrice ? 'text-green-600' : 'text-[#009EDD]'}`}>
                    ₹{productData.price.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 font-sans">{sku}</p>

                <p className="text-base text-gray-700 mb-8 leading-relaxed font-sans">
                  {description}
                </p>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center border-0 focus:ring-0 font-sans"
                        min="1"
                      />
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-6">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-white border-2 border-gray-800 text-gray-800 py-4 px-6 rounded-lg font-semibold text-lg transition-all font-sans hover:bg-gray-800 hover:text-white flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#525A65] text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all font-sans hover:opacity-90"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Product Information Tabs */}
      <section className="p-8 bg-white">
        <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <AnimatedSection delay={300}>
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('information')}
                  className={`px-6 py-3 font-semibold text-sm font-sans transition-colors border-b-2 ${
                    activeTab === 'information'
                      ? 'border-[#009EDD] text-[#009EDD]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Information
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`px-6 py-3 font-semibold text-sm font-sans transition-colors border-b-2 ${
                    activeTab === 'care'
                      ? 'border-[#009EDD] text-[#009EDD]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Care Instructions
                </button>
                <button
                  onClick={() => setActiveTab('support')}
                  className={`px-6 py-3 font-semibold text-sm font-sans transition-colors border-b-2 ${
                    activeTab === 'support'
                      ? 'border-[#009EDD] text-[#009EDD]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Support
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="py-6">
              {activeTab === 'information' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">Product Information</h3>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[120px]">Shape:</span>
                      <span>Square</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[120px]">Weight:</span>
                      <span>350 grams</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[120px]">Cover Material:</span>
                      <span>Polyester Fabric</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[120px]">Fill Material:</span>
                      <span>Polyester Fabric</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[120px]">Washable:</span>
                      <span>Yes</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">Care Instructions</h3>
                  <ul className="space-y-3 text-gray-700 font-sans list-disc list-inside">
                    <li>Remove the outer cover before washing.</li>
                    <li>Machine wash the cover in cold water on a gentle cycle.</li>
                    <li>Do not wash or wet the memory foam core — spot clean only with a mild damp cloth if needed.</li>
                    <li>Allow the pillow to air dry completely before reuse.</li>
                    <li>Avoid exposure to direct sunlight or heat sources to preserve foam integrity.</li>
                    <li>Store in a cool, dry place when not in use.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">Support</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 font-sans">24/7 Customer Support</h4>
                      <p className="text-gray-700 font-sans">
                        We're here to help you anytime, day or night. Contact us for any questions or concerns about your product.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 font-sans">Contact Information</h4>
                      <ul className="space-y-2 text-gray-700 font-sans">
                        <li>
                          <strong>Phone:</strong>{' '}
                          <a href="tel:+917600018281" className="text-[#009EDD] hover:underline">
                            +91 7600018281
                          </a>
                        </li>
                        <li>
                          <strong>Email:</strong>{' '}
                          <a href="mailto:info@softcool.in" className="text-[#009EDD] hover:underline">
                            info@softcool.in
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 font-sans">Warranty & Returns</h4>
                      <p className="text-gray-700 font-sans">
                        All our products come with quality assurance. If you're not satisfied, we offer a 30-day return policy. 
                        Please contact our support team for assistance with returns or warranty claims.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Section */}
      <section className="p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={400}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover-lift text-center border-l-4 border-[#009EDD]">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sans">Free Shipping</h3>
                <p className="text-gray-600 font-sans">On orders over ₹2000</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover-lift text-center border-l-4 border-[#525A65]">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sans">Quality Assured</h3>
                <p className="text-gray-600 font-sans">Each product tested for durability</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover-lift text-center border-l-4 border-[#009EDD]">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sans">Easy Returns</h3>
                <p className="text-gray-600 font-sans">30-day return policy</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Store Products (Related Products) */}
      <section className="p-8 bg-white">
        <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <AnimatedSection delay={700}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4 font-sans">Related Products</h2>
              <div className="w-24 h-1 bg-[#009EDD] mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <AnimatedSection key={relatedProduct.id} delay={800 + index * 100}>
                <ProductCard
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  originalPrice={relatedProduct.originalPrice}
                  badge={relatedProduct.badge}
                  image={relatedProduct.image}
                  badgeStyle="white"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ProductReviews 
        productId={productData.id}
        reviews={[
          {
            id: 1,
            reviewer: 'Sneha',
            date: 'Nov 10',
            rating: 5,
            headline: 'Truly feels like sleeping in paradise!',
            body: 'The Paradise Pillow is amazing - super soft yet supportive. It keeps me cool throughout the night and feels so luxurious.',
            helpful: 0,
          },
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={productFAQData} />

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">Please Login</h3>
            <p className="text-gray-700 mb-6 font-sans">
              You need to be logged in to proceed with the purchase. Please login to continue.
            </p>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="flex-1 text-center bg-[#009EDD] text-white py-2.5 px-6 rounded-lg font-semibold transition-all font-sans hover:opacity-90"
                onClick={() => setShowLoginPopup(false)}
              >
                Go to Login
              </Link>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2.5 px-6 rounded-lg font-semibold transition-all font-sans hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
