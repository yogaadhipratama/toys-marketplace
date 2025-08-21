'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/api';
import { formatIDR } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addItem);
  const itemQty = useCartStore((state) => state.getItemQty(product.variants[0].id));

  const handleAddToCart = () => {
    addToCart({
      variantId: product.variants[0].id,
      sku: product.variants[0].sku,
      name: product.name,
      price: product.variants[0].price,
      image: product.images[0],
      productSlug: product.slug,
      category: product.category,
    });
  };

  const isInStock = product.stock > 0;
  const hasDiscount = product.originalPrice > product.price;

  return (
    <div className={cn('group relative bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200', className)}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge variant="success" className="text-xs">
              New
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive" className="text-xs">
              Sale
            </Badge>
          )}
        </div>
        
        {/* Age Rating Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs">
            {product.ageRating}
          </Badge>
        </div>
        
        {/* Stock Badge */}
        <div className="absolute bottom-2 left-2">
          <Badge 
            variant={isInStock ? 'success' : 'destructive'} 
            className="text-xs"
          >
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1 capitalize">
          {product.category.replace('-', ' ')}
        </div>
        
        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatIDR(product.variants[0].price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatIDR(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className="flex-1"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {itemQty > 0 ? `Add More (${itemQty})` : 'Add to Cart'}
          </Button>
          
          <Button variant="outline" size="sm" className="px-2">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
