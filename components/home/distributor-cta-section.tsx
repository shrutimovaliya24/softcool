'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function DistributorCTASection() {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    city: '',
    state: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[0-9]{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit contact number';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Distributorship form submitted:', formData);
    alert('Thank you for your interest in distributorship! We will contact you soon.');
    setFormData({ name: '', contactNumber: '', city: '', state: '' });
    setErrors({});
  };

  return (
    <section className="py-8 sm:py-12 bg-[#5298C1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-sans leading-tight">
            Join Our Growing Family
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-sans">
            Partner with us and bring SoftCool products to your region. Join our expanding distribution network across India.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 lg:p-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#0D031A] mb-1.5 font-sans">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    errors.name ? 'border-red-500' : 'border-[#A5ADB3]'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.name}</p>
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
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit contact number"
                  maxLength={10}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    errors.contactNumber ? 'border-red-500' : 'border-[#A5ADB3]'
                  }`}
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.contactNumber}</p>
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
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    errors.city ? 'border-red-500' : 'border-[#A5ADB3]'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.city}</p>
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
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#5298C1] focus:border-[#5298C1] transition-all font-sans text-sm sm:text-base ${
                    errors.state ? 'border-red-500' : 'border-[#A5ADB3]'
                  }`}
                />
                {errors.state && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.state}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-[#5298C1] text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg hover:bg-[#5298C1]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-sans"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Information - Outside white container */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10 text-white">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <a href="tel:+917600018281" className="text-sm sm:text-base hover:underline font-sans">
              +91 7600018281
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <a href="mailto:info@softcool.in" className="text-sm sm:text-base hover:underline font-sans break-all">
              info@softcool.in
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm sm:text-base font-sans">Rajkot, Gujarat, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}

