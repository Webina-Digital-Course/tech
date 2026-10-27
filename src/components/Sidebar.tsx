'use client';

import { useFilter } from '@/context/FilterContext';

const categories = [
  'Lighting',
  'Kitchen',
  'Homewares',
  'Audio',
  'Wellness',
  'Charging',
  'Security',
] as const;

export function Sidebar() {
  const { activeCategory, setActiveCategory } = useFilter();

  return (
    <aside className="w-64 flex-shrink-0" aria-label="Product categories">
      <h1 className="text-hero mb-12 select-none">/ Shop</h1>
      <nav className="space-y-2" aria-label="Category filters">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-fast focus-visible-ring ${
              activeCategory === category
                ? 'category-link-active font-medium'
                : 'category-link'
            }`}
            aria-current={activeCategory === category ? 'page' : undefined}
            aria-pressed={activeCategory === category}
          >
            {activeCategory === category && <span className="mr-2">/ </span>}
            {category}
          </button>
        ))}
      </nav>
    </aside>
  );
}