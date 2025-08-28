# 🗄️ Database Setup Guide

This guide will help you set up the MySQL database for the Toys Store admin CMS using XAMPP.

## 📋 Prerequisites

- XAMPP installed and running
- MySQL service started in XAMPP
- Node.js and npm installed

## 🚀 Step-by-Step Setup

### 1. Start XAMPP Services

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Verify both services are running (green status)

### 2. Create Database

1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click **New** on the left sidebar
3. Enter database name: `toys_store`
4. Click **Create**

### 3. Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and update the database configuration:
   ```env
   # Database Configuration (XAMPP MySQL)
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=toys_store
   
   # JWT Secret for Admin Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # App Configuration
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Add the DATABASE_URL to `.env.local`:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/toys_store"
   ```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Database Schema

```bash
npm run db:push
```

### 6. Seed Database with Sample Data

```bash
npm run db:seed
```

### 7. Start Development Server

```bash
npm run dev
```

## 🔐 Default Admin Credentials

After seeding the database, you can login with:
- **Email**: `admin@toys.com`
- **Password**: `admin123`

## 🛠️ Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## 📊 Database Schema

The database includes the following tables:

- **users** - Customer accounts
- **products** - Product information
- **product_variants** - Product variants (size, color, etc.)
- **orders** - Customer orders
- **order_items** - Order line items
- **admin_users** - Admin accounts

## 🔍 Troubleshooting

### Common Issues:

1. **Connection Refused**
   - Ensure MySQL service is running in XAMPP
   - Check if port 3306 is available

2. **Access Denied**
   - Verify username is `root` and password is empty
   - Check if database `toys_store` exists

3. **Prisma Client Not Generated**
   - Run `npm run db:generate` first
   - Check if `.env.local` has correct DATABASE_URL

4. **Migration Errors**
   - Drop and recreate the database
   - Run `npm run db:push` again

## 🌐 Access Points

- **Frontend**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin`
- **Admin Login**: `http://localhost:3000/admin/login`
- **phpMyAdmin**: `http://localhost/phpmyadmin`

## 📝 Notes

- The database uses Prisma ORM for type-safe database operations
- All passwords are hashed using bcrypt
- JWT tokens are used for admin authentication
- Sample data includes products, users, and orders for testing
