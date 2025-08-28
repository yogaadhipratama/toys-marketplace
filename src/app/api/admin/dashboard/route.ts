import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-auth';
import { prisma } from '@/lib/database';

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

    // Get statistics from database
    const [
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders,
      lowStockProducts
    ] = await Promise.all([
      // Total products
      prisma.product.count({ where: { status: 'ACTIVE' } }),
      
      // Total users
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      
      // Total orders
      prisma.order.count(),
      
      // Total revenue
      prisma.order.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { total: true }
      }),
      
      // Recent orders
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          orderNumber: true,
          customerName: true,
          total: true,
          status: true,
          createdAt: true
        }
      }),
      
      // Low stock products
      prisma.product.findMany({
        where: {
          variants: {
            some: {
              stock: { lte: 5 }
            }
          }
        },
        take: 5,
        select: {
          id: true,
          name: true,
          variants: {
            select: {
              stock: true
            }
          }
        }
      })
    ]);

    // Calculate total revenue
    const revenue = totalRevenue._sum.total || 0;

    // Process low stock products
    const processedLowStockProducts = lowStockProducts.map(product => ({
      id: product.id,
      name: product.name,
      stock: Math.min(...product.variants.map(v => v.stock))
    }));

    return NextResponse.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue: revenue,
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        customer: order.customerName,
        total: order.total,
        status: order.status.toLowerCase(),
        date: order.createdAt.toISOString()
      })),
      lowStockProducts: processedLowStockProducts
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
