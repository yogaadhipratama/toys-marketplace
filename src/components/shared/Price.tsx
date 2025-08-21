import { formatIDR } from '@/lib/format';

interface PriceProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Price = ({ price, originalPrice, size = 'md', className }: PriceProps) => {
  const hasDiscount = originalPrice && originalPrice > price;
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-bold text-gray-900 ${sizeClasses[size]}`}>
        {formatIDR(price)}
      </span>
      {hasDiscount && (
        <span className={`text-gray-500 line-through ${sizeClasses[size]}`}>
          {formatIDR(originalPrice!)}
        </span>
      )}
    </div>
  );
};

export default Price;
