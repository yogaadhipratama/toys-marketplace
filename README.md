# 🧸 ToysStore - E-commerce Toy Website

A modern, full-stack e-commerce platform for toys and collectibles built with Next.js 14, TypeScript, Tailwind CSS, and MySQL. Features a complete admin CMS for product management, user management, and order tracking.

## ✨ Features

### 🛍️ Frontend (Customer)
- **Homepage** with featured products and categories
- **Product Catalog** with advanced filtering and search
- **Product Details** with variants, images, and age-gate for restricted items
- **Shopping Cart** with persistent storage
- **Checkout Process** with multiple payment and shipping options
- **User Account** with order history and tracking
- **Responsive Design** optimized for all devices

### 🎛️ Admin CMS
- **Dashboard** with real-time statistics and analytics
- **Product Management** - Add, edit, delete products with variants
- **User Management** - View and manage customer accounts
- **Order Management** - Track and update order statuses
- **Image Upload** - Drag & drop image management
- **Secure Authentication** - JWT-based admin login

### 🗄️ Backend
- **RESTful API** with Next.js API routes
- **MySQL Database** with Prisma ORM
- **JWT Authentication** for admin users
- **File Upload** for product images
- **Data Validation** and error handling

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn**
- **XAMPP** (for local MySQL database)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yogaadhipratama/toys-marketplace.git
cd toys-marketplace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Verify both services are running (green status)

#### Create Database
1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click **New** on the left sidebar
3. Enter database name: `toys_store`
4. Click **Create**

#### Configure Environment Variables
1. Copy the environment template:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and update the configuration:
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

   # Prisma Database URL
   DATABASE_URL="mysql://root:@localhost:3306/toys_store"
   ```

### 4. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔐 Default Admin Access

After seeding the database, you can access the admin panel:

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@toys.com`
- **Password**: `admin123`

## 📁 Project Structure

```
toys-store/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin panel pages
│   │   │   ├── login/         # Admin authentication
│   │   │   ├── products/      # Product management
│   │   │   ├── users/         # User management
│   │   │   └── orders/        # Order management
│   │   ├── api/               # API routes
│   │   │   └── admin/         # Admin API endpoints
│   │   ├── catalog/           # Product catalog
│   │   ├── product/           # Product details
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout process
│   │   └── account/           # User account
│   ├── components/            # Reusable components
│   │   ├── ui/                # UI components (Button, Input, etc.)
│   │   └── shared/            # Shared components (Navbar, Footer, etc.)
│   ├── lib/                   # Utility libraries
│   │   ├── database.ts        # Database connection
│   │   ├── admin-auth.ts      # Admin authentication
│   │   └── api.ts             # API functions
│   └── store/                 # State management (Zustand)
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeder
├── public/                    # Static assets
└── .env.local                 # Environment variables
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## 🗄️ Database Schema

The application uses the following database tables:

- **users** - Customer accounts and information
- **products** - Product details and metadata
- **product_variants** - Product variants (size, color, stock)
- **orders** - Customer orders and shipping details
- **order_items** - Order line items and quantities
- **admin_users** - Admin account credentials

## 🔧 Development

### Adding New Products

1. **Via Admin Panel**:
   - Login to admin panel
   - Navigate to Products → Add New
   - Fill in product details and variants
   - Upload product images

2. **Via Database**:
   - Use Prisma Studio: `npm run db:studio`
   - Direct database access via phpMyAdmin

### Customizing Styles

The project uses Tailwind CSS for styling. Main configuration files:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles and CSS variables

### API Development

API routes are located in `src/app/api/`. Each route follows Next.js 13+ conventions:
- `route.ts` files for API endpoints
- Support for GET, POST, PUT, DELETE methods
- Built-in request/response handling

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   - Push code to GitHub
   - Connect repository to Vercel
   - Set environment variables in Vercel dashboard

2. **Environment Variables**:
   ```env
   DATABASE_URL="your-production-database-url"
   JWT_SECRET="your-production-jwt-secret"
   NODE_ENV="production"
   ```

3. **Database Setup**:
   - Use PlanetScale, Supabase, or your preferred MySQL provider
   - Run `npm run db:push` to deploy schema
   - Run `npm run db:seed` to populate initial data

### Traditional Hosting

1. **Build the Application**:
   ```bash
   npm run build
   npm run start
   ```

2. **Database Setup**:
   - Configure production MySQL database
   - Update `DATABASE_URL` in environment
   - Run database migrations

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Kill existing processes
   pkill -f "next dev"
   # Or use different port
   npm run dev -- -p 3001
   ```

2. **Database Connection Failed**:
   - Verify XAMPP MySQL service is running
   - Check database credentials in `.env.local`
   - Ensure database `toys_store` exists

3. **Prisma Client Not Generated**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **JWT Authentication Fails**:
   - Verify `JWT_SECRET` is set in `.env.local`
   - Check token expiration (default: 24 hours)
   - Clear browser localStorage and re-login

### Getting Help

- **Check Console Logs** - Both browser and terminal
- **Verify Environment Variables** - Ensure `.env.local` is configured
- **Database Status** - Use `npm run db:studio` to inspect data
- **API Testing** - Use browser dev tools or Postman

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database ORM by [Prisma](https://prisma.io/)
- Icons by [Lucide React](https://lucide.dev/)

---

**Happy coding! 🚀**
