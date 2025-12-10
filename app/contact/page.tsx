'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import PageHero from '@/components/shared/page-hero';
import AnimatedSection from '@/components/shared/animated-section';
import FAQ from '@/components/shared/faq';
import { contactFAQs } from '@/lib/faq-data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    productType: '',
    quantity: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.productType) {
      newErrors.productType = 'Please select a product type';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (parseInt(formData.quantity) < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      productType: '',
      quantity: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Contact Us" 
        subtitle="Get in touch with us for any inquiries"
      />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Contact Form */}
            <AnimatedSection delay={100}>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-lg hover-lift">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 font-sans leading-tight">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent transition-all font-sans"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent transition-all font-sans ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent transition-all font-sans ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="productType" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                      Select Product type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent transition-all font-sans bg-white ${
                        errors.productType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Choose one</option>
                      <option value="pillow">Pillow</option>
                      <option value="cushion">Cushion</option>
                      <option value="bolster">Bolster</option>
                    </select>
                    {errors.productType && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.productType}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent transition-all font-sans ${
                        errors.quantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.quantity}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent transition-all font-sans resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white py-2.5 sm:py-3 md:py-3.5 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:opacity-90 hover:shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#009EDD' }}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Submit
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection delay={200}>
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 font-sans leading-tight">Get in Touch</h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed font-sans">
                    Experience the comfort of buying straight from the makers. Our experts help you find 
                    the pillow made for your perfect rest. Pure comfort, honest quality — delivered right 
                    to your doorstep.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover-lift border-l-4 border-[#009EDD]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#009EDD]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 font-sans">Phone</h3>
                        <a 
                          href="tel:+917600018281" 
                          className="text-sm sm:text-base text-gray-700 hover:text-[#009EDD] transition-colors font-sans break-all"
                        >
                          +91 7600018281
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover-lift border-l-4 border-[#525A65]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#525A65]/10 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#525A65]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 font-sans">Email</h3>
                        <a 
                          href="mailto:info@softcool.in" 
                          className="text-sm sm:text-base text-gray-700 hover:text-[#009EDD] transition-colors font-sans break-all"
                        >
                          info@softcool.in
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover-lift border-l-4 border-[#009EDD]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#009EDD]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 font-sans">Shop Address</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-sans leading-relaxed">
                          Softcool, behind Vtrans Transport,<br />
                          Rajkot Ahmedabad Highway,<br />
                          Rajkot 360003
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover-lift border-l-4 border-[#525A65]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#525A65]/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#525A65]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 font-sans">Registered Address</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-sans leading-relaxed">
                          Akshar Decor, 405, Shaligram Singet,<br />
                          Mota Mava, Speedwell Party Plot,<br />
                          Rajkot 360005
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={contactFAQs} />
    </div>
  );
}
