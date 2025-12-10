'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

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
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-10">
        <div className="flex flex-row items-center h-14 sm:h-16 md:h-20">

          {/* Menu Section */}
          <div className="basis-16 sm:basis-32 lg:basis-64 flex items-center shrink-0">
          <button
            onClick={onMenuClick}
            className="p-2 md:p-3 rounded-md hover:bg-gray-100 transition"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 sm:w-7 h-6 sm:h-7 text-gray-900" />
          </button>
          </div>

          {/* Logo Section */}
          <div className="flex-1 lg:basis-[488px] flex items-center justify-center shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/main_logo.png"
                alt="Softcool Logo"
                width={150}
                height={48}
                priority
                unoptimized
                className="max-h-[50px] sm:max-h-[55px] md:max-h-[60px] h-auto w-auto object-contain"
              />
            </Link>
          </div>

          {/* Profile & Cart Section */}
          <div className="basis-20 sm:basis-32 lg:basis-[280px] flex items-center justify-end gap-2 sm:gap-2 md:gap-5 shrink-0">

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                {/* Desktop User Button */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-[#009EDD] rounded-full flex items-center justify-center text-white text-sm md:text-base font-semibold">
                    {user?.name?.charAt(0).toUpperCase() ||
                      user?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:block text-sm md:text-base">
                    {user?.name || user?.email?.split("@")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Mobile avatar */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="sm:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-[#009EDD] rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>

                {/* Mobile Login */}
                <Link href="/login" className="sm:hidden p-2 hover:bg-gray-100 rounded-md">
                  <User className="w-6 h-6 text-gray-800" />
                </Link>
              </>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-md">
              <ShoppingCart className="w-6 md:w-7 h-6 md:h-7 text-gray-900" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#009EDD] text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center items-center">
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
