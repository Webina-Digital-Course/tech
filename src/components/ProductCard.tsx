'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { isInCart, toggleCart } = useCart();
  const inCart = isInCart(product.id);
  const [imageError, setImageError] = useState(false);

  const aspectClass = product.aspectRatio === 'tall' ? 'aspect-tall' : 'aspect-standard';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
      className="product-card group"
    >
      <div className="relative overflow-hidden rounded-t-card">
        <div className={`${aspectClass} w-full bg-card-surface flex items-center justify-center p-6 relative`}>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {!imageError && (
              <img
                src={product.image}
                alt={product.imageDescription}
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            )}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-card-surface text-text-muted text-sm font-sans px-4 text-center">
                {product.imageDescription}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.button
              key={inCart ? 'added' : 'add'}
              onClick={() => toggleCart(product)}
              className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-btn flex items-center justify-center shadow-btn ${
                inCart ? 'btn-selected' : 'btn-primary'
              }`}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              aria-label={inCart ? `Remove ${product.title} from cart` : `Add ${product.title} to cart`}
              aria-pressed={inCart}
            >
              {inCart ? (
                <Check className="w-4 h-4" strokeWidth={3} />
              ) : (
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              )}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      <div className="p-4 pt-3">
        <h2 className="text-product-title">{product.title}</h2>
        <p className="text-product-price">${product.price.toFixed(2)}</p>
      </div>
    </motion.article>
  );
}