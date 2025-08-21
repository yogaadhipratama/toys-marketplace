import { Badge } from '@/components/ui/Badge';

interface StockBadgeProps {
  stock: number;
  className?: string;
}

const StockBadge = ({ stock, className }: StockBadgeProps) => {
  const isInStock = stock > 0;
  const isLowStock = stock > 0 && stock <= 5;
  
  let variant: 'success' | 'destructive' | 'secondary' = 'success';
  let text = 'In Stock';
  
  if (!isInStock) {
    variant = 'destructive';
    text = 'Out of Stock';
  } else if (isLowStock) {
    variant = 'secondary';
    text = `Low Stock (${stock})`;
  }

  return (
    <Badge variant={variant} className={className}>
      {text}
    </Badge>
  );
};

export default StockBadge;
