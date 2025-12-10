'use client';

import { useState, useCallback, memo } from 'react';
import { AuthProvider } from '../contexts/auth-context';
import { CartProvider } from '../contexts/cart-context';
import { OrdersProvider } from '../contexts/orders-context';
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import Footer from '../common/footer';

const LayoutWrapper = memo(function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <div className="flex flex-col min-h-screen">
            <Header onMenuClick={handleMenuClick} />
            <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  );
});

LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;

