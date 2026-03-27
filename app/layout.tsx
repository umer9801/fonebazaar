import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import { CartProvider } from '@/lib/contexts/CartContext'
import { OrdersProvider } from '@/lib/contexts/OrdersContext'

const geistSans = Geist({ subsets: ["latin"], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'FONE BAZAAR - Premium Tech Services',
  description: 'Custom t-shirts, laser engraving, and 3D printing services',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-black`}>
        <AuthProvider>
          <CartProvider>
            <OrdersProvider>
              {children}
              <Analytics />
            </OrdersProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
