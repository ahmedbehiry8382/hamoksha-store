import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="card-3d block"
    >
      <div className="card-3d-inner relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 group">
        {/* Popular Badge */}
        {product.packages.some(p => p.popular) && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 bg-neon-purple text-white text-xs font-bold rounded-full shadow-lg">
              الأكثر مبيعاً
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image_url || `https://images.pexels.com/photo/3165750/pexels-photo-3165750.jpeg`}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              product.category === 'games'
                ? 'bg-neon-blue/20 text-neon-blue'
                : product.category === 'cards'
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'bg-neon-orange/20 text-neon-orange'
            }`}>
              {product.category === 'games' ? 'لعبة' : product.category === 'cards' ? 'بطاقة' : 'خدمة'}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price Range */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">يبدأ من</span>
              <p className="text-neon-green font-bold text-lg">
                {Math.min(...product.packages.map(p => p.price)).toLocaleString()} ج.م
              </p>
            </div>
            <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center group-hover:bg-neon-purple/40 transition-colors">
              <ShoppingCart className="w-5 h-5 text-neon-purple" />
            </div>
          </div>
        </div>

        {/* Border Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 border-neon-purple/50" />
        </div>
      </div>
    </Link>
  );
}
