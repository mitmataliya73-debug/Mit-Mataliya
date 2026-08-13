import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  listName?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  listName = 'Product Collection',
  columns = 4,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-neutral-900/50 rounded-2xl border border-neutral-800">
        <p className="text-neutral-400 font-medium">No products found matching your current filter.</p>
      </div>
    );
  }

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridColsClass} gap-6 md:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} listName={listName} />
      ))}
    </div>
  );
};
