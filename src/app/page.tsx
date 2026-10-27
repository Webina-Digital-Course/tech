import { Sidebar } from '@/components/Sidebar';
import { ProductGrid } from '@/components/ProductGrid';
import { FilterProvider } from '@/context/FilterContext';
import productsData from '@/data/products.json';
import type { Product } from '@/types/product';

export default function HomePage() {
  return (
    <FilterProvider products={productsData as Product[]}>
      <div className="min-h-screen pt-20">
        <main className="max-w-[1440px] mx-auto px-12 py-10 pb-20">
          <div className="flex gap-12 lg:gap-16">
            <Sidebar />
            <div className="flex-1 min-w-0">
              <ProductGrid />
            </div>
          </div>
        </main>
      </div>
    </FilterProvider>
  );
}