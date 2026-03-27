# FONE BAZAAR - Premium E-Commerce Platform

A fully functional, modern e-commerce website for FONE BAZAAR offering custom t-shirts, laser engraving, and 3D printing services. Built with Next.js 15, Framer Motion, and Tailwind CSS.

## Features

### Public Pages
- **Home Page**: Stunning hero with rotating background images, featured products, and smooth animations
- **Shop Page**: Browse products with filtering by category and search functionality
- **Product Detail**: Detailed product pages with customization options
- **Shopping Cart**: Full cart management with quantity controls
- **Checkout**: Secure checkout flow with shipping and payment info
- **Order Tracking**: View order status and delivery information
- **About Page**: Company information and values
- **Contact Page**: Contact form with business information

### Admin Dashboard
- **Dashboard Overview**: Key metrics (revenue, orders, products, users)
- **Product Management**: View and manage product catalog
- **Order Management**: Update order status in real-time
- **User Management**: Manage customer accounts
- **Analytics**: Sales insights, top products, and category performance

### Technical Highlights
- **Eye-Catching Animations**: Framer Motion animations throughout the site
- **Black & White Theme**: Premium minimalist design
- **Fully Functional**: Shopping cart, checkout, and order management
- **Admin Protected**: Role-based access control
- **Responsive Design**: Mobile-first approach
- **Local Storage**: Client-side data persistence

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

### Admin Account
- **Email**: admin@fonebazaar.com
- **Password**: admin123
- Access admin dashboard at `/admin`

### Customer Account
- **Email**: customer@fonebazaar.com
- **Password**: customer123

Use the demo buttons on the login page to auto-fill test accounts.

## Project Structure

```
app/
├── page.tsx                 # Home page with rotating hero
├── shop/                    # Shop with filtering & search
├── product/[id]/            # Product detail page
├── cart/                    # Shopping cart
├── checkout/                # Checkout flow
├── orders/                  # Order history
├── order/[id]/              # Order details
├── login/                   # Authentication
├── about/                   # About page
├── contact/                 # Contact page
└── admin/                   # Admin dashboard
    ├── page.tsx             # Admin overview
    ├── products/            # Product management
    ├── orders/              # Order management
    ├── users/               # User management
    └── analytics/           # Sales analytics

components/
├── Navigation.tsx           # Top navigation bar
└── Footer.tsx              # Footer component

lib/
├── types.ts                # TypeScript types
├── mockData.ts             # Sample data
├── animations.ts           # Animation presets
└── contexts/               # Context providers
    ├── AuthContext.tsx     # Authentication
    ├── CartContext.tsx     # Shopping cart
    └── OrdersContext.tsx   # Orders management
```

## Key Features in Detail

### Rotating Hero Images
The home page features a 5-second rotating hero with beautiful e-commerce images. Uses `AnimatePresence` for smooth transitions.

### Shopping Cart System
- Add products with customization notes
- Update quantities on the fly
- Automatic localStorage persistence
- Real-time total calculation

### Checkout Flow
- Complete shipping and payment forms
- Order status tracking
- Automatic order creation
- Order confirmation page

### Admin Features
- View all orders and update status
- Manage product catalog
- User management interface
- Sales analytics with charts
- Category-wise revenue breakdown

## Animations & Effects

The site uses Framer Motion for:
- Page transitions and fades
- Button hover effects with scale
- Staggered container animations
- Scroll-triggered reveals
- Image hover zoom effects
- Cart count badge animations
- Status timeline visualizations

## Styling

- **Color Scheme**: Pure black (#000000) and white (#ffffff)
- **Typography**: Geist font family with multiple weights
- **Spacing**: Tailwind CSS spacing scale
- **Components**: shadcn/ui component patterns
- **Animations**: Custom Tailwind animations + Framer Motion

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Optimizations

- Image lazy loading
- Component-level code splitting
- LocalStorage caching
- Smooth scroll behavior
- CSS animations for performance

## Customization

### Change Colors
Edit `/app/globals.css` CSS variables to adjust the black and white theme.

### Add More Products
Update `/lib/mockData.ts` with new products in the `mockProducts` array.

### Modify Animations
Use animation presets from `/lib/animations.ts` or create custom Framer Motion configs.

## Future Enhancements

- Real database integration (Supabase/Neon)
- Stripe payment processing
- Email notifications
- User reviews and ratings
- Inventory management
- Order fulfillment tracking

## Deployment

Deploy to Vercel with a single click:

```bash
pnpm build
# Then push to GitHub and connect to Vercel
```

Or use the Vercel CLI:
```bash
pnpm install -g vercel
vercel
```

## Support

For issues or questions:
- Email: support@fonebazaar.com
- Open an issue in the repository

## License

MIT License - Feel free to use this project as a template

---

Built with ❤️ using Next.js 15, Framer Motion, and Tailwind CSS
