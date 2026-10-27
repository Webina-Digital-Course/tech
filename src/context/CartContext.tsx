'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import type { Product } from '@/types/product';
import productsData from '@/data/products.json';

interface CartContextType {
  cartItems: Product[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  toggleCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCart = (productsData as Product[]).filter(p => p.inCart);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>(initialCart);

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  const isInCart = useCallback((productId: string) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, { ...product, inCart: true }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const toggleCart = useCallback((product: Product) => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  }, [isInCart, addToCart, removeFromCart]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      isInCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}