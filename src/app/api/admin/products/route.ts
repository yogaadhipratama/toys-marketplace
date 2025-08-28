import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-auth';
import { prisma } from '@/lib/database';
import { slugify } from '@/lib/slug';

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const authResult = await verifyAdminToken(request);
    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    // Get all products with variants
    const products = await prisma.product.findMany({
      include: {
        variants: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format products for admin view
    const adminProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: Math.min(...product.variants.map(v => v.price)),
      stock: product.variants.reduce((sum, v) => sum + v.stock, 0),
      status: product.status,
      createdAt: product.createdAt.toISOString(),
      image: Array.isArray(product.images) ? product.images[0] : ''
    }));

    return NextResponse.json(adminProducts);

  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authResult = await verifyAdminToken(request);
    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    const productData = await request.json();

    // Validate required fields
    if (!productData.name || !productData.category || !productData.variants) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create product with variants using transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create product
      const product = await tx.product.create({
        data: {
          slug: slugify(productData.name),
          name: productData.name,
          description: productData.description || '',
          category: productData.category,
          ageRating: productData.ageRating,
          weight: productData.weight ? parseFloat(productData.weight) : null,
          price: Math.min(...productData.variants.map((v: any) => parseFloat(v.price))),
          originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
          images: productData.images || [],
          isNew: productData.isNew || false,
          status: productData.status || 'ACTIVE',
        }
      });

      // Create variants
      const variants = await Promise.all(
        productData.variants.map((variant: any) =>
          tx.productVariant.create({
            data: {
              name: variant.name,
              sku: variant.sku,
              price: parseFloat(variant.price),
              stock: parseInt(variant.stock),
              productId: product.id
            }
          })
        )
      );

      return { product, variants };
    });

    return NextResponse.json({
      message: 'Product created successfully',
      product: result.product
    }, { status: 201 });

  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
