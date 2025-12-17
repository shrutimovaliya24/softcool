'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { memo, useState, useEffect, useRef } from 'react';
import { Menu, User, ShoppingCart, LogOut, ChevronDown, Heart, Package } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '../contexts/auth-context';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = memo(function Header({ onMenuClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems, favorites } = useCart();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/collections', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, [showUserMenu]);

  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-row items-center h-14 sm:h-16 md:h-20">
          {/* Mobile Menu Button */}
          <div className="lg:hidden basis-16 sm:basis-20 flex items-center shrink-0">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6 text-[#5298C1]" />
            </button>
          </div>

          {/* Logo Section - Left */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/main_logo.png"
                alt="Softcool Logo"
                width={150}
                height={48}
                priority
                unoptimized
                className="max-h-[40px] sm:max-h-[45px] md:max-h-[50px] h-auto w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links - Center (Desktop Only) */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm md:text-base font-semibold transition-colors font-sans ${
                    isActive
                      ? 'text-[#5298C1]'
                      : 'text-[#5298C1] hover:text-gray-800'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#5298C1]"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Login & Cart Section - Right */}
          <div className="flex items-center justify-end gap-3 sm:gap-4 md:gap-5 ml-auto shrink-0">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                {/* Desktop User Button */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-[#5298C1] font-medium"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-[#5298C1] rounded-full flex items-center justify-center text-white text-sm md:text-base font-semibold">
                    {user?.name?.charAt(0).toUpperCase() ||
                      user?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:block text-sm md:text-base text-[#5298C1]">
                    {user?.name || user?.email?.split("@")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#5298C1]" />
                </button>

                {/* Mobile avatar */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="sm:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-[#5298C1] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>

                {/* Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 animate-fade-in z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <Link
                      href="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <Package className="w-4 h-4" /> My Orders
                    </Link>

                    <Link
                      href="/favorites"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 relative"
                    >
                      <Heart className={`w-4 h-4 ${
                        favorites.length > 0 ? "fill-red-500 text-red-500" : "text-gray-700"
                      }`} /> 
                      <span>My Favorites</span>
                      {favorites.length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center items-center">
                          {favorites.length > 9 ? "9+" : favorites.length}
                        </span>
                      )}
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Login */}
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-[#5298C1] font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>

                {/* Mobile Login */}
                <Link href="/login" className="sm:hidden p-2 hover:bg-gray-100 rounded-md">
                  <User className="w-6 h-6 text-[#5298C1]" />
                </Link>
              </>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-md">
              <ShoppingCart className="w-6 md:w-7 h-6 md:h-7 text-[#5298C1]" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5298C1] text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center items-center">
                  {getTotalItems() > 9 ? "9+" : getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
