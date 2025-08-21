# ToysStore - E-commerce Toy Website

A modern, responsive e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS for selling toys, collectibles, and hobby items.

## 🚀 Features

### Core Functionality
- **Product Catalog** - Browse products by category with advanced filtering
- **Product Details** - Detailed product pages with variants and images
- **Shopping Cart** - Persistent cart with Zustand state management
- **Checkout Process** - Complete checkout flow with address and shipping
- **Order Tracking** - Track orders with AWB numbers (dummy data)
- **User Account** - Profile management and order history

### Product Categories
- **Airsoft & Gel Blaster** - High-performance airsoft guns (18+)
- **RC Vehicles** - Remote control cars, drones, and vehicles
- **LEGO Sets** - Building blocks and construction sets
- **Action Figures** - Collectible action figures and figurines

### Technical Features
- **Age Gate System** - 18+ verification for restricted products
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript implementation
- **State Management** - Zustand for cart and user state
- **Mock API** - Local JSON data with simulated network delays
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **UI Components**: Custom design system
- **Build Tool**: Vite (via Next.js)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups
│   ├── catalog/           # Product catalog page
│   ├── product/[slug]/    # Product detail page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── track/             # Order tracking page
│   └── account/           # User account page
├── components/            # React components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── shared/           # Shared components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── ProductCard.tsx
│       ├── SearchBar.tsx
│       └── AgeGateModal.tsx
├── lib/                  # Utility functions
│   ├── api.ts           # Mock API functions
│   ├── format.ts        # Formatting utilities
│   ├── slug.ts          # URL slug helpers
│   └── utils.ts         # General utilities
├── store/               # State management
│   └── cart.ts         # Cart store with Zustand
└── data/               # Mock data
    ├── products.json   # Product data
    └── categories.json # Category data
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd toys-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features Explained

### Age Gate System
- Automatically shows for airsoft/gel blaster products
- Stores verification in localStorage
- Prevents access to restricted products for underage users

### Shopping Cart
- Persistent storage with localStorage
- Add/remove items, update quantities
- Real-time total calculations
- Checkout integration

### Product Filtering
- Category-based filtering
- Price range filtering
- Stock availability filtering
- Search functionality
- Responsive grid/list views

### Mock Data
- 10 sample products across all categories
- Realistic pricing in Indonesian Rupiah
- Multiple variants per product
- Stock management simulation

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Component Variants
- **Buttons**: default, outline, secondary, destructive, ghost, link
- **Badges**: default, secondary, destructive, outline, success
- **Cards**: Standard card components with header, content, footer
- **Inputs**: Text, email, tel, number with error states

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 📱 Pages Overview

### Home (`/`)
- Hero banner with call-to-action
- Featured categories
- New products showcase
- Customer testimonials

### Catalog (`/catalog`)
- Product grid with filtering
- Category pills navigation
- Search functionality
- Pagination support

### Product Detail (`/product/[slug]`)
- Product images with thumbnails
- Variant selection
- Add to cart functionality
- Age restrictions (if applicable)

### Cart (`/cart`)
- Cart item management
- Quantity updates
- Order summary
- Checkout navigation

### Checkout (`/checkout`)
- Customer information form
- Shipping address
- Shipping method selection
- Order confirmation

### Track Order (`/track`)
- AWB number input
- Order timeline display
- Demo tracking data

### Account (`/account`)
- Profile management
- Order history
- Account settings

## 🔧 Customization

### Adding New Products
1. Edit `src/data/products.json`
2. Add product images to `public/images/`
3. Update category counts in `src/data/categories.json`

### Modifying Categories
1. Edit `src/data/categories.json`
2. Update navigation in `src/components/shared/Navbar.tsx`
3. Update footer links in `src/components/shared/Footer.tsx`

### Styling Changes
1. Modify `src/app/globals.css` for global styles
2. Update `tailwind.config.ts` for theme customization
3. Use Tailwind utility classes in components

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Vercel will auto-detect Next.js
3. Deploy with zero configuration

### Other Platforms
1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Deploy the `dist` folder to your hosting provider

## 📊 Performance

### Lighthouse Scores Target
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Optimization Features
- Image optimization with Next.js Image component
- Lazy loading for components
- Efficient state management
- Minimal bundle size

## 🧪 Testing

### Manual Testing Checklist
- [ ] Responsive design on all screen sizes
- [ ] Cart functionality (add, remove, update)
- [ ] Age gate for restricted products
- [ ] Form validation in checkout
- [ ] Navigation between pages
- [ ] Search and filtering
- [ ] Order tracking demo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: support@toysstore.com

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Real payment gateway integration
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] PWA capabilities
- [ ] Real-time inventory management

---

**Note**: This is a demo project with mock data. Replace placeholder images and implement real backend services before production use.
