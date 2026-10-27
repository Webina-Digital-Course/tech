'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import type { Product } from '@/types/product';

type Category = 'All' | 'Homewares' | 'Lighting' | 'Kitchen' | 'Audio' | 'Wellness' | 'Charging' | 'Security';

interface FilterContextType {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  filteredProducts: Product[];
  allCategories: Category[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  products: Product[];
}

export function FilterProvider({ children, products }: FilterProviderProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('Homewares');

  const allCategories: Category[] = useMemo(() => {
    const categories = Array.from(new Set(products.map(p => p.category)));
    return ['All', ...categories] as Category[];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category);
  }, []);

  return (
    <FilterContext.Provider value={{
      activeCategory,
      setActiveCategory: handleCategoryChange,
      filteredProducts,
      allCategories,
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}