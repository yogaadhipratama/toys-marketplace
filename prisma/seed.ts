import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.adminUser.upsert({
    where: { email: 'admin@toys.com' },
    update: {},
    create: {
      email: 'admin@toys.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample products
  const airsoftProduct = await prisma.product.upsert({
    where: { slug: 'airsoft-rifle-pro' },
    update: {},
    create: {
      slug: 'airsoft-rifle-pro',
      name: 'Airsoft Rifle Pro',
      description: 'High-quality airsoft rifle for competitive play',
      category: 'airsoft',
      ageRating: '18+',
      weight: 2.5,
      price: 1500000,
      originalPrice: 1800000,
      images: ['/images/airsoft-1.jpg'],
      isNew: true,
      status: 'ACTIVE',
    },
  });

  // Create product variants
  await prisma.productVariant.upsert({
    where: { sku: 'ASR-BLK-001' },
    update: {},
    create: {
      name: 'Black',
      sku: 'ASR-BLK-001',
      price: 1500000,
      stock: 10,
      productId: airsoftProduct.id,
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'ASR-TAN-001' },
    update: {},
    create: {
      name: 'Tan',
      sku: 'ASR-TAN-001',
      price: 1500000,
      stock: 5,
      productId: airsoftProduct.id,
    },
  });

  const rcProduct = await prisma.product.upsert({
    where: { slug: 'rc-car-racing' },
    update: {},
    create: {
      slug: 'rc-car-racing',
      name: 'RC Racing Car',
      description: 'Fast remote control racing car for outdoor fun',
      category: 'rc',
      ageRating: '8+',
      weight: 0.8,
      price: 800000,
      originalPrice: 1000000,
      images: ['/images/rc-1.jpg'],
      isNew: false,
      status: 'ACTIVE',
    },
  });

  // Create RC product variants
  await prisma.productVariant.upsert({
    where: { sku: 'RCC-RED-001' },
    update: {},
    create: {
      name: 'Red',
      sku: 'RCC-RED-001',
      price: 800000,
      stock: 15,
      productId: rcProduct.id,
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'RCC-BLU-001' },
    update: {},
    create: {
      name: 'Blue',
      sku: 'RCC-BLU-001',
      price: 800000,
      stock: 12,
      productId: rcProduct.id,
    },
  });

  console.log('✅ Sample products created');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      password: await bcrypt.hash('password123', 10),
      role: 'CUSTOMER',
      status: 'ACTIVE',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: await bcrypt.hash('password123', 10),
      role: 'CUSTOMER',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Sample users created');

  // Create sample orders
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+6281234567890',
      shippingAddress: {
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta',
        postalCode: '12345',
        country: 'Indonesia'
      },
      shippingMethod: 'standard',
      paymentMethod: 'cod',
      subtotal: 1500000,
      shippingCost: 25000,
      total: 1525000,
      status: 'DELIVERED',
      userId: user1.id,
    },
  });

  // Create order items
  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 1500000,
      orderId: order1.id,
      productId: airsoftProduct.id,
      productVariantId: (await prisma.productVariant.findFirst({ where: { sku: 'ASR-BLK-001' } }))!.id,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+6281234567891',
      shippingAddress: {
        address: 'Jl. Thamrin No. 456',
        city: 'Jakarta',
        postalCode: '12346',
        country: 'Indonesia'
      },
      shippingMethod: 'express',
      paymentMethod: 'bank',
      subtotal: 800000,
      shippingCost: 50000,
      total: 850000,
      status: 'PENDING',
      userId: user2.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 800000,
      orderId: order2.id,
      productId: rcProduct.id,
      productVariantId: (await prisma.productVariant.findFirst({ where: { sku: 'RCC-RED-001' } }))!.id,
    },
  });

  console.log('✅ Sample orders created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
