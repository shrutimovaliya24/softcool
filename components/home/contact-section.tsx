'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
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
    setFormData({ ...formData, [name]: value });
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
    <>
      {/* Contact Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Left Side - Text and Contact Info */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-sans leading-tight">
                  Direct from Us to You
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-sans mb-4 sm:mb-6">
                  Experience the comfort of buying straight from the makers. Our experts help you find
                  the pillow made for your perfect rest. Pure comfort, honest quality — delivered right
                  to your doorstep.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#525A65] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <a
                    href="tel:+917600018281"
                    className="text-sm sm:text-base md:text-lg text-gray-900 hover:text-[#009EDD] transition-colors font-sans break-all"
                  >
                    +91 7600018281
                  </a>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#525A65] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <a
                    href="mailto:info@softcool.in"
                    className="text-sm sm:text-base md:text-lg text-gray-900 hover:text-[#009EDD] transition-colors font-sans break-all"
                  >
                    info@softcool.in
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="flex items-start">
              <div className="w-full bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 font-sans">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 font-sans">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 font-sans">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans text-sm sm:text-base ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 font-sans">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans text-sm sm:text-base ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="productType" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 font-sans">
                      Select Product type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans text-sm sm:text-base bg-white ${
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
                    <label htmlFor="quantity" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 font-sans">
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
                      placeholder="Quantity"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans text-sm sm:text-base ${
                        errors.quantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.quantity}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 font-sans">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Message"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans text-sm sm:text-base resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#525A65] text-white py-2.5 sm:py-3 md:py-3.5 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:opacity-90"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clickable Map Section - Full Width */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <a
          href="https://maps.app.goo.gl/7WzhKZFM2JjA9Wgh6"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200 group hover:shadow-xl transition-shadow duration-300"
        >
          {/* Google Maps Embed as Preview */}
          <iframe
            src="https://www.google.com/maps?q=Rajkot+Ahmedabad+Highway,+Maliyasan,+Gujarat&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Softcool Shop Location - Rajkot Ahmedabad Highway"
          ></iframe>
          
          {/* Click Overlay Indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#525A65]" />
                <div className="text-center">
                  <p className="font-semibold text-lg text-gray-800 font-sans">Click to Open Location</p>
                  <p className="text-sm text-gray-600 font-sans">Opens in Google Maps</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-3 sm:p-4 md:p-5 lg:p-6 pointer-events-none z-10">
            <div className="flex items-center gap-2 sm:gap-3 text-white">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#525A65] rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base md:text-lg font-sans">Softcool Shop Location</p>
                <p className="text-xs sm:text-sm text-gray-200 font-sans">Rajkot Ahmedabad Highway</p>
              </div>
            </div>
          </div>
        </a>
      </section>
    </>
  );
}

