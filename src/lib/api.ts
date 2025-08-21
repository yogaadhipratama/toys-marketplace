import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  stock: number;
  weight: number;
  images: string[];
  variants: ProductVariant[];
  features: string[];
  ageRating: string;
  isNew: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  ageRestriction: string;
  productCount: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  await delay(300); // Simulate network delay
  
  let filteredProducts = [...productsData];
  
  if (filters?.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  
  if (filters?.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
  }
  
  if (filters?.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
  }
  
  if (filters?.inStock) {
    filteredProducts = filteredProducts.filter(p => p.stock > 0);
  }
  
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }
  
  return filteredProducts;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await delay(200);
  const product = productsData.find(p => p.slug === slug);
  return product || null;
}

export async function fetchCategories(): Promise<Category[]> {
  await delay(100);
  return categoriesData;
}

export async function fetchCategoryById(id: string): Promise<Category | null> {
  await delay(100);
  const category = categoriesData.find(c => c.id === id);
  return category || null;
}

export async function fetchNewProducts(limit: number = 6): Promise<Product[]> {
  await delay(200);
  return productsData.filter(p => p.isNew).slice(0, limit);
}

export async function fetchProductsByCategory(categoryId: string, limit?: number): Promise<Product[]> {
  await delay(200);
  let products = productsData.filter(p => p.category === categoryId);
  if (limit) {
    products = products.slice(0, limit);
  }
  return products;
}
