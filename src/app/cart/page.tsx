'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + tax + shipping;

  const updateQuantity = (product: Product, delta: number) => {
    if (delta < 0) {
      removeFromCart(product.id);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-[1440px] mx-auto px-12 py-10 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-card-surface border border-card-border flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2v-5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v4m0 0l-4-4m4 4l4-4m-4 4h12" />
              </svg>
            </div>
            <h1 className="text-hero mb-4">Your cart is empty</h1>
            <p className="text-text-muted font-sans mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any products yet. Start shopping to fill your cart.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 btn-primary px-6 py-3 font-sans text-nav-link">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1440px] mx-auto px-12 py-10 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-hero mb-10"
        >
          Cart ({cartItems.length})
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="space-y-4" role="list" aria-label="Cart items">
              {cartItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex gap-6 p-4 bg-card-surface border border-card-border rounded-card"
                  role="listitem"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 bg-card-surface border border-card-border rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageDescription}
                      className="w-full h-full object-contain p-3"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-product-title truncate">{item.title}</h2>
                    <p className="text-product-price mt-1">${item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-3 bg-canvas-bg rounded-lg px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item, -1)}
                          className="text-text-muted hover:text-text-primary transition-colors p-1"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <span className="font-sans text-sm text-text-primary w-8 text-center">1</span>
                        <button
                          onClick={() => updateQuantity(item, 1)}
                          className="text-text-muted hover:text-text-primary transition-colors p-1"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-text-muted hover:text-text-primary transition-colors p-2 rounded-lg hover:bg-canvas-bg"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="w-5 h-5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-end"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-nav text-text-muted hover:text-text-primary transition-colors duration-fast font-sans"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-card-surface border border-card-border rounded-card p-6 sticky top-28">
              <h2 className="text-product-title font-medium mb-6 pb-4 border-b border-card-border">
                Order Summary
              </h2>

              <dl className="space-y-3 font-sans text-sm">
                <div className="flex justify-between">
                  <dt className="text-text-muted">Subtotal</dt>
                  <dd className="text-text-primary">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Estimated Tax (10%)</dt>
                  <dd className="text-text-primary">${tax.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Shipping</dt>
                  <dd className="text-text-primary">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </dd>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-text-muted">
                    Free shipping on orders over $200
                  </p>
                )}
              </dl>

              <div className="mt-6 pt-6 border-t border-card-border">
                <div className="flex justify-between text-base font-medium mb-4">
                  <span className="text-text-primary">Total</span>
                  <span className="text-text-primary">${total.toFixed(2)}</span>
                </div>

                <button className="w-full btn-selected py-4 px-6 font-sans text-nav-link flex items-center justify-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  Checkout
                </button>

                <p className="mt-4 text-center text-xs text-text-muted font-sans">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}