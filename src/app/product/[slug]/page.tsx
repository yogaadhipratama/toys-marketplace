'use client';

import { useState, useEffect,useCallback} from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Heart, Shield, Package, AlertTriangle, Link } from 'lucide-react';
import { fetchProductBySlug, Product, ProductVariant } from '@/lib/api';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatIDR, formatWeight } from '@/lib/format';
import AgeGateModal from '@/components/shared/AgeGateModal';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAgeGate, setShowAgeGate] = useState(false);
  
  const addToCart = useCartStore((state) => state.addItem);
  // const itemQty = useCartStore((state) => state.getItemQty(''));

  // useEffect(() => {
  //   loadProduct();
  // }, [slug]);

  

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const loadProduct = useCallback(async () => {
    setLoading(true);
    try {
      const productData = await fetchProductBySlug(slug);
      if (productData) {
        setProduct(productData);
        
        // Check if age gate is needed
        if (productData.category === 'airsoft' && !localStorage.getItem('age_ok')) {
          setShowAgeGate(true);
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    
    addToCart({
      variantId: selectedVariant.id,
      sku: selectedVariant.sku,
      name: product.name,
      price: selectedVariant.price,
      image: product.images[0],
      productSlug: product.slug,
      category: product.category,
    });
  };

  const handleAgeGateConfirm = () => {
    setShowAgeGate(false);
  };

  const handleAgeGateClose = () => {
    setShowAgeGate(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const hasDiscount = product.originalPrice > product.price;
  const isInStock = selectedVariant ? selectedVariant.stock > 0 : false;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><a href="/catalog" className="hover:text-blue-600">Catalog</a></li>
            <li>/</li>
            <li><a href={`/catalog?category=${product.category}`} className="hover:text-blue-600 capitalize">{product.category.replace('-', ' ')}</a></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white border mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge variant="success">New</Badge>
                )}
                {hasDiscount && (
                  <Badge variant="destructive">Sale</Badge>
                )}
              </div>
              
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">{product.ageRating}</Badge>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedVariant ? formatIDR(selectedVariant.price) : formatIDR(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatIDR(product.originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="mb-4">
                <Badge 
                  variant={isInStock ? 'success' : 'destructive'}
                  className="text-sm"
                >
                  {isInStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
                {isInStock && selectedVariant && (
                  <span className="ml-2 text-sm text-gray-600">
                    ({selectedVariant.stock} available)
                  </span>
                )}
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Variant</h3>
                <div className="flex gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-16 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!isInStock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Package className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-semibold text-gray-900">{formatWeight(product.weight)}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Shield className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Age Rating</p>
                <p className="font-semibold text-gray-900">{product.ageRating}</p>
              </div>
            </div>

            {/* Age Warning for Airsoft */}
            {product.category === 'airsoft' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Age Restriction Notice</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      This product requires you to be 18 years or older to purchase. 
                      By adding to cart, you confirm that you meet the age requirement.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Age Gate Modal */}
      <AgeGateModal
        isOpen={showAgeGate}
        onConfirm={handleAgeGateConfirm}
        onClose={handleAgeGateClose}
      />
    </div>
  );
}
