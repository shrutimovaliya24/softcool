import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full text-white font-sans" style={{ backgroundColor: '#525A65' }}>
      <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Column - Contact and Address */}
          <div className="w-full md:basis-1/2 space-y-3 md:space-y-4">
            <div>
              <a href="tel:+917600018281" className="text-sm text-white hover:text-gray-300 transition-colors font-sans">
                +917600018281
              </a>
            </div>
            <div>
              <a href="mailto:info@softcool.in" className="text-sm text-white hover:text-gray-300 transition-colors font-sans">
                info@softcool.in
              </a>
            </div>
            <div>
              <p className="text-sm text-white font-sans">
                <span className="font-semibold">Shop Address:</span>{' '}
                <a 
                  href="https://maps.app.goo.gl/7WzhKZFM2JjA9Wgh6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  Softcool, behind Vtrans Transport, Rajkot Ahmedabad Highway, Rajkot 360003
                </a>
              </p>
            </div>
            <div>
              <p className="text-sm text-white font-sans">
                <span className="font-semibold">Registered Address:</span>{' '}
                <a 
                  href="https://maps.google.com/?q=Akshar+Decor,+405,+Shaligram+Singet,+Mota+Mava,+Speedwell+Party+Plot,+Rajkot+360005" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  Akshar Decor, 405, Shaligram Singet, Mota Mava, Speedwell Party Plot, Rajkot 360005
                </a>
              </p>
            </div>
            <div className="pt-4">
              <Link href="/" className="inline-block" aria-label="Home">
                <Image
                  src="/logo/main_logo.png"
                  alt="Softcool Logo"
                  width={150}
                  height={48}
                  className="max-h-[50px] sm:max-h-[55px] md:max-h-[60px] h-auto w-auto object-contain "
                  unoptimized
                />
              </Link>
            </div>
          </div>

          {/* Middle Column - Navigation Links */}
          <div className="w-full md:basis-1/4 mt-6 md:mt-0">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Policy Links, Social Media, Copyright */}
          <div className="w-full md:basis-1/4 space-y-4 md:space-y-6 mt-6 md:mt-0">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/softcoolofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/people/Softcool/100091952966730/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-4">
              <p className="text-sm text-white font-sans">© 2024 by Akshar Decor</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

