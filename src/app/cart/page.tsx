'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
// import { useCartStore, CartItem } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { formatIDR } from '@/lib/format';

export default function CartPage() {
  const { items, updateQty, removeItem, getTotalQty, getTotalPrice, clearCart } = useCartStore();
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);

  const handleUpdateQty = async (variantId: string, newQty: number) => {
    setUpdatingItem(variantId);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    updateQty(variantId, newQty);
    setUpdatingItem(null);
  };

  const handleRemoveItem = async (variantId: string) => {
    setUpdatingItem(variantId);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    removeItem(variantId);
    setUpdatingItem(null);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/catalog">
            <Button size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">You have {getTotalQty()} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.variantId} className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          <Link href={`/product/${item.productSlug}`} className="hover:text-blue-600">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          SKU: {item.sku}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          Category: {item.category.replace('-', ' ')}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQty(item.variantId, item.qty - 1)}
                          disabled={updatingItem === item.variantId || item.qty <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-12 text-center font-medium">
                          {updatingItem === item.variantId ? (
                            <div className="animate-pulse bg-gray-200 h-6 rounded"></div>
                          ) : (
                            item.qty
                          )}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQty(item.variantId, item.qty + 1)}
                          disabled={updatingItem === item.variantId}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right min-w-0">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatIDR(item.price * item.qty)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatIDR(item.price)} each
                        </p>
                      </div>
                      
                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.variantId)}
                        disabled={updatingItem === item.variantId}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart Actions */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                  
                  <Link href="/catalog">
                    <Button variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getTotalQty()} items)</span>
                  <span className="font-medium">{formatIDR(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatIDR(getTotalPrice() * 0.11)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatIDR(getTotalPrice() * 1.11)}</span>
                  </div>
                  <p className="text-sm text-gray-500">Including tax</p>
                </div>
              </div>
              
              <Link href="/checkout" className="w-full">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By proceeding, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
