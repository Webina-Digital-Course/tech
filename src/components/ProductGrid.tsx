'use client';

import { useFilter } from '@/context/FilterContext';
import { ProductCard } from './ProductCard';

export function ProductGrid() {
  const { filteredProducts } = useFilter();

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 stagger-children"
      role="list"
      aria-label="Products"
    >
      {filteredProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-20 text-text-muted font-sans">
          No products found in this category.
        </div>
      )}
    </div>
  );
}