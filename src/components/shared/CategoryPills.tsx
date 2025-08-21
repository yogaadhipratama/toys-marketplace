'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  productCount: number;
}

interface CategoryPillsProps {
  categories: Category[];
  className?: string;
}

const CategoryPills = ({ categories, className }: CategoryPillsProps) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <Link href="/catalog">
        <Badge
          variant={!currentCategory ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          All ({categories.reduce((sum, cat) => sum + cat.productCount, 0)})
        </Badge>
      </Link>
      
      {categories.map((category) => (
        <Link key={category.id} href={`/catalog?category=${category.id}`}>
          <Badge
            variant={currentCategory === category.id ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {category.name} ({category.productCount})
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPills;
