'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, X } from 'lucide-react';
import PageHero from '@/components/shared/page-hero';
import AnimatedSection from '@/components/shared/animated-section';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Distributorship popup state
  const [isDistributorshipOpen, setIsDistributorshipOpen] = useState(false);
  const [distributorshipData, setDistributorshipData] = useState({
    name: '',
    contactNumber: '',
    city: '',
    state: ''
  });
  const [distributorshipErrors, setDistributorshipErrors] = useState<Record<string, string>>({});

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
      message: ''
    });
    setErrors({});
  };

  // Distributorship form handlers
  const validateDistributorshipForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!distributorshipData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!distributorshipData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[0-9]{10}$/.test(distributorshipData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit contact number';
    }

    if (!distributorshipData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!distributorshipData.state.trim()) {
      newErrors.state = 'State is required';
    }

    setDistributorshipErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDistributorshipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDistributorshipData({ ...distributorshipData, [name]: value });
    // Clear error when user starts typing
    if (distributorshipErrors[name]) {
      setDistributorshipErrors({ ...distributorshipErrors, [name]: '' });
    }
  };

  const handleDistributorshipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDistributorshipForm()) {
      return;
    }

    console.log('Distributorship form submitted:', distributorshipData);
    alert('Thank you for your interest in distributorship! We will contact you soon.');
    setDistributorshipData({
      name: '',
      contactNumber: '',
      city: '',
      state: ''
    });
    setDistributorshipErrors({});
    setIsDistributorshipOpen(false);
  };

  const handleCloseDistributorship = () => {
    setIsDistributorshipOpen(false);
    setDistributorshipData({
      name: '',
      contactNumber: '',
      city: '',
      state: ''
    });
    setDistributorshipErrors({});
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Contact Us" 
        subtitle="Get in touch with us for any inquiries"
      />

      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Contact Form */}
            <AnimatedSection delay={100}>
              <div className="bg-white border border-[#5298C1]/20 rounded-lg shadow-sm h-full flex flex-col p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-4 sm:mb-6 font-sans leading-tight">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-medium text-[#0D031A] mb-1 font-sans">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full px-3 py-2 border border-[#5298C1]/30 rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-medium text-[#0D031A] mb-1 font-sans">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full px-3 py-2 border border-[#5298C1]/30 rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#0D031A] mb-1 font-sans">
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
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm ${
                        errors.email ? 'border-red-500' : 'border-[#5298C1]/30'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-[#0D031A] mb-1 font-sans">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm ${
                        errors.phone ? 'border-red-500' : 'border-[#5298C1]/30'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-[#0D031A] mb-1 font-sans">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Message"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm resize-none ${
                        errors.message ? 'border-red-500' : 'border-[#5298C1]/30'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FDF55A] text-[#0D031A] py-2 px-4 rounded-lg font-semibold text-sm transition-all font-sans hover:bg-[#5298C1] hover:text-white"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection delay={200}>
              <div className="bg-white border border-[#5298C1]/20 rounded-lg shadow-sm h-full flex flex-col p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-4 sm:mb-6 font-sans leading-tight">Get in Touch</h2>
                <div className="flex-1 flex flex-col">
                  <p className="text-sm sm:text-base text-[#0D031A] mb-4 sm:mb-6 leading-relaxed font-sans">
                    Experience the comfort of buying straight from the makers. Our experts help you find 
                    the pillow made for your perfect rest. Pure comfort, honest quality — delivered right 
                    to your doorstep.
                  </p>

                <div className="space-y-3 sm:space-y-4 md:space-y-5 flex-1">
                  <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-lg hover-lift border-l-4 border-[#5298C1]">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#FDF55A] rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5298C1]" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0D031A] mb-0.5 sm:mb-1 font-sans">
                          Phone
                        </h3>
                        <a 
                          href="tel:+917600018281" 
                          className="text-xs sm:text-sm md:text-base text-[#0D031A] hover:text-[#5298C1] transition-colors font-sans whitespace-nowrap"
                        >
                          +91 7600018281
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-lg hover-lift border-l-4 border-[#5298C1]">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#FDF55A] rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5298C1]" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0D031A] mb-0.5 sm:mb-1 font-sans">
                          Email
                        </h3>
                        <a 
                          href="mailto:info@softcool.in" 
                          className="text-xs sm:text-sm md:text-base text-[#0D031A] hover:text-[#5298C1] transition-colors font-sans whitespace-nowrap"
                        >
                          info@softcool.in
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-lg hover-lift border-l-4 border-[#5298C1]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#FDF55A] rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5298C1]" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0D031A] mb-1.5 font-sans">
                          Shop Address
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-[#0D031A] font-sans leading-relaxed">
                          Softcool, behind Vtrans Transport,<br />
                          Rajkot Ahmedabad Highway,<br />
                          Rajkot 360003
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-lg hover-lift border-l-4 border-[#5298C1]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#FDF55A] rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5298C1]" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0D031A] mb-1.5 font-sans">
                          Registered Address
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-[#0D031A] font-sans leading-relaxed">
                          Akshar Decor, 405, Shaligram Singet,<br />
                          Mota Mava, Speedwell Party Plot,<br />
                          Rajkot 360005
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Become a Distributor Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[#FDF55A] via-[#FDF55A]/90 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#5298C1] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5298C1] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
          <AnimatedSection delay={300}>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-6 sm:mb-8 font-sans">
                Become a Distributor
              </h2>
              <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
                <p className="text-base sm:text-lg text-[#0D031A] leading-relaxed font-sans">
                  We are expanding our distribution network across India.
                </p>
                <p className="text-base sm:text-lg text-[#0D031A] leading-relaxed font-sans mt-2">
                  If you are interested in becoming an authorized distributor, please get in touch with us.
                </p>
                <p className="text-base sm:text-lg text-[#0D031A] leading-relaxed font-sans mt-2">
                  Our team will connect with you shortly.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsDistributorshipOpen(true)}
                  className="bg-[#5298C1] text-white py-3 sm:py-4 md:py-5 px-8 sm:px-10 md:px-12 rounded-lg font-semibold text-base sm:text-lg md:text-xl transition-all font-sans hover:bg-[#0D031A] hover:text-white hover:shadow-xl transform hover:-translate-y-1"
                >
                  👉 Apply for Distributorship
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Distributorship Popup Modal */}
      {isDistributorshipOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 sm:p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseDistributorship}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#5298C1] mb-4 sm:mb-6 font-sans">
              Apply for Distributorship
            </h2>

            {/* Distributorship Form */}
            <form onSubmit={handleDistributorshipSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#0D031A] mb-1.5 font-sans">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={distributorshipData.name}
                  onChange={handleDistributorshipChange}
                  placeholder="Enter your name"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    distributorshipErrors.name ? 'border-red-500' : 'border-[#5298C1]/30'
                  }`}
                />
                {distributorshipErrors.name && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{distributorshipErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-[#0D031A] mb-1.5 font-sans">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={distributorshipData.contactNumber}
                  onChange={handleDistributorshipChange}
                  placeholder="Enter 10-digit contact number"
                  maxLength={10}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    distributorshipErrors.contactNumber ? 'border-red-500' : 'border-[#5298C1]/30'
                  }`}
                />
                {distributorshipErrors.contactNumber && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{distributorshipErrors.contactNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[#0D031A] mb-1.5 font-sans">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={distributorshipData.city}
                  onChange={handleDistributorshipChange}
                  placeholder="Enter your city"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    distributorshipErrors.city ? 'border-red-500' : 'border-[#5298C1]/30'
                  }`}
                />
                {distributorshipErrors.city && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{distributorshipErrors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-[#0D031A] mb-1.5 font-sans">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={distributorshipData.state}
                  onChange={handleDistributorshipChange}
                  placeholder="Enter your state"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    distributorshipErrors.state ? 'border-red-500' : 'border-[#5298C1]/30'
                  }`}
                />
                {distributorshipErrors.state && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{distributorshipErrors.state}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#FDF55A] text-[#0D031A] py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-all font-sans hover:bg-[#5298C1] hover:text-white"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCloseDistributorship}
                  className="flex-1 bg-gray-200 text-[#0D031A] py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-all font-sans hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
