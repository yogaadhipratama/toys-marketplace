import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  variantId: string;
  sku: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  productSlug: string;
  category: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  updateQty: (variantId: string, qty: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  getTotalQty: () => number;
  getTotalPrice: () => number;
  getItemQty: (variantId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.variantId === item.variantId);
          
          if (existingItem) {
            return {
              items: state.items.map(i => 
                i.variantId === item.variantId 
                  ? { ...i, qty: i.qty + 1 }
                  : i
              )
            };
          }
          
          return {
            items: [...state.items, { ...item, qty: 1 }]
          };
        });
      },
      
      updateQty: (variantId, qty) => {
        if (qty <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.variantId === variantId ? { ...item, qty } : item
          )
        }));
      },
      
      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter(item => item.variantId !== variantId)
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalQty: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.qty), 0);
      },
      
      getItemQty: (variantId) => {
        const item = get().items.find(i => i.variantId === variantId);
        return item ? item.qty : 0;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
