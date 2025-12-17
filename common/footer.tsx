import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full text-white bg-[#5298C1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* ABOUT US */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#FDF55A] uppercase border-b border-dotted border-white/30 pb-1">
              ABOUT US
            </h3>
            <p className="text-sm text-white">
              SoftCool makes premium cooling pillows that help you sleep better and stay comfortable. Experience ultimate comfort with our bio-ceramic fiber technology and scientific design.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/softcoolofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:border-[#FDF55A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white hover:text-[#FDF55A] transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/people/Softcool/100091952966730/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:border-[#FDF55A] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white hover:text-[#FDF55A] transition-colors" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#FDF55A] uppercase border-b border-dotted border-white/30 pb-1">
              QUICK LINKS
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-sm text-white hover:text-[#FDF55A]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white hover:text-[#FDF55A]">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-white hover:text-[#FDF55A]">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white hover:text-[#FDF55A]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* POLICIES */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#FDF55A] uppercase border-b border-dotted border-white/30 pb-1">
              POLICIES
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/privacy" className="text-sm text-white hover:text-[#FDF55A]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="text-sm text-white hover:text-[#FDF55A]">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white hover:text-[#FDF55A]">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#FDF55A] uppercase border-b border-dotted border-white/30 pb-1">
              CONTACT US
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <a href="tel:+917600018281" className="text-sm text-white hover:text-[#FDF55A]">
                  +91 7600018281
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/7WzhKZFM2JjA9Wgh6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:text-[#FDF55A]"
                >
                  Softcool, behind Vtrans Transport,<br />
                  Rajkot Ahmedabad Highway,<br />
                  Rajkot 360003
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <a href="mailto:info@softcool.in" className="text-sm text-white hover:text-[#FDF55A] break-all">
                  info@softcool.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-6 pt-4 text-center">
          <p className="text-sm text-white">
            © 2025 all rights reserved by <span className="text-[#FDF55A] font-semibold">Akshar Decor</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
