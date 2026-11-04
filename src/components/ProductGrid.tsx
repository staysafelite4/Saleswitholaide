import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Search, Filter, Sparkles } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'bulk_hibiscus', label: 'Hibiscus Bulk (1kg - 1000kg+)' },
    { id: 'botanicals', label: 'Botanical Leaves' },
    { id: 'seeds_powders', label: 'Powders, Berries & Seeds' },
    { id: 'accessories', label: 'Teabags & Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Availability filter
      if (onlyInStock && product.availability === 'out_of_stock') {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIngredients = (product.ingredients || []).some(i => i.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIngredients;
      }
      return true;
    });
  }, [products, activeCategory, onlyInStock, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#720026] font-semibold mb-2">
              Grade A Organic Supply
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Hibiscus & Botanical Wholesale Catalog
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Cleaned, stone-free Grade A Hibiscus Sabdariffa calyces and 22+ dried herbal leaves, seeds & powders. Select your size (100g to 1,000kg+).
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hibiscus, stevia, moringa, seeds..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#720026] text-stone-800 placeholder-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row: Interactive Segmented Buttons */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-600">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-[#720026] rounded border-stone-300 focus:ring-0 cursor-pointer"
              />
              <span>In-stock only</span>
            </label>
            <span aria-hidden="true" className="text-stone-300">|</span>
            <span className="font-mono tabular-nums font-medium text-stone-700">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
            </span>
          </div>
        </div>

        {/* Products 3-Column Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-xl border border-stone-200 p-8">
            <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-800">No drinks match your filter</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or reset your category filter to see all fresh hibiscus elixirs.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#720026] bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
