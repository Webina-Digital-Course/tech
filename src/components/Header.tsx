'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas-bg/80 backdrop-blur-md border-b border-card-border">
      <div className="max-w-[1440px] mx-auto px-12 py-6 flex items-center justify-between">
        <Link href="/" className="text-brand select-none" aria-label="tech+ home">
          tech+
        </Link>

        <nav className="flex items-center gap-8" aria-label="Main navigation">
          <Link
            href="/"
            className="nav-pill text-nav"
            aria-current="page"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-nav text-text-muted hover:text-text-primary transition-colors duration-fast"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-nav text-text-muted hover:text-text-primary transition-colors duration-fast"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-10">
          <Link
            href="/account"
            className="text-nav text-text-muted hover:text-text-primary transition-colors duration-fast"
          >
            Account
          </Link>
          <Link
            href="/cart"
            className="relative text-nav text-text-muted hover:text-text-primary transition-colors duration-fast flex items-center gap-1"
            aria-label={`Cart, ${cartCount} items`}
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-5 min-w-[18px] h-5 bg-text-primary text-white text-[10px] font-sans font-medium rounded-pill flex items-center justify-center px-1.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}