'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, memo } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = memo(function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/collections', label: 'Collections' },
    { href: '/contact', label: 'Contact Us' },
  ];

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px] bg-white z-50 transform transition-all duration-300 ease-in-out will-change-transform shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 sm:p-5 md:p-6 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation group"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-gray-900 transition-colors"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links - Centered */}
        <nav className="flex items-center justify-center h-[calc(100%-80px)] px-4 sm:px-6 md:px-8">
          <ul className="space-y-4 sm:space-y-6 md:space-y-8 text-center w-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold transition-all duration-300 touch-manipulation py-2 sm:py-3 md:py-4 px-4 sm:px-6 rounded-lg ${
                      isActive
                        ? 'text-[#009EDD] bg-[#009EDD]/10 scale-105 shadow-sm'
                        : 'text-gray-800 hover:text-[#009EDD] hover:bg-gray-50 hover:scale-105 active:scale-100'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;

