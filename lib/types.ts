// Product Types
export type ServiceType = 'tshirt' | 'laser' | '3d-printing';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ServiceType;
  rating: number;
  reviews: number;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  customization?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryDate?: string;
  shippingAddress: Address;
}

// User Types
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

// Auth Types
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, name: string, password: string) => Promise<void>;
  isLoading: boolean;
}

// Cart Context Type
export interface CartContextType {
  cart: Cart;
  addToCart: (productId: string, quantity: number, customization?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

// Orders Context Type
export interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
}
