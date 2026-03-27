import { Product, User } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Black T-Shirt',
    description: 'High-quality cotton t-shirt perfect for custom designs and branding',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'tshirt',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: '2',
    name: 'Classic White T-Shirt',
    description: 'Versatile white cotton tee with excellent print quality',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
    category: 'tshirt',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: '3',
    name: 'Designer Oversized Tee',
    description: 'Trendy oversized t-shirt for modern style',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1608318503487-4bcf5f8e8f1b?w=500&h=500&fit=crop',
    category: 'tshirt',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: '4',
    name: 'Custom Laser Engraving Service',
    description: 'Professional laser engraving on wood, leather, and acrylic materials',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&h=500&fit=crop',
    category: 'laser',
    rating: 4.9,
    reviews: 124,
  },
  {
    id: '5',
    name: 'Metal Laser Engraving',
    description: 'Precision laser engraving on aluminum, stainless steel, and brass',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65b?w=500&h=500&fit=crop',
    category: 'laser',
    rating: 5.0,
    reviews: 78,
  },
  {
    id: '6',
    name: 'Wood Sign Engraving',
    description: 'Custom wood sign with professional laser engraving',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&h=500&fit=crop',
    category: 'laser',
    rating: 4.8,
    reviews: 95,
  },
  {
    id: '7',
    name: 'Basic 3D Printing Service',
    description: 'High-quality 3D printing in multiple materials and colors',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=500&fit=crop',
    category: '3d-printing',
    rating: 4.7,
    reviews: 112,
  },
  {
    id: '8',
    name: 'Advanced 3D Model Printing',
    description: 'Large-scale 3D printing with advanced materials and finishes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1618519236347-5ca3a6f75d0c?w=500&h=500&fit=crop',
    category: '3d-printing',
    rating: 4.9,
    reviews: 67,
  },
  {
    id: '9',
    name: 'Prototype 3D Printing',
    description: 'Perfect for prototyping and product development',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576059200161-991a0a3997d4?w=500&h=500&fit=crop',
    category: '3d-printing',
    rating: 4.8,
    reviews: 45,
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@fonebazaar.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    email: 'customer@fonebazaar.com',
    name: 'John Doe',
    role: 'customer',
    createdAt: new Date('2024-01-15').toISOString(),
  },
];

export const heroImages = [
  '/hero-1.jpg',
  '/hero-2.jpg',
  '/hero-3.jpg',
  ];

export const categoryLabels: Record<string, string> = {
  tshirt: 'T-Shirts',
  laser: 'Laser Engraving',
  '3d-printing': '3D Printing',
};
