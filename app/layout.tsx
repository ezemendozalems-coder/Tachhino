import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Alvarez Brokers | Inmobiliaria Premium en Zona Oeste',
    template: '%s | Alvarez Brokers',
  },
  description: 'J. I. Alvarez Brokers Inmobiliarios - Especialistas en comercialización de inmuebles, tasaciones profesionales y asesoramiento legal en El Palomar, Ciudad Jardín y Zona Oeste. Más de 25 años de experiencia.',
  keywords: ['inmobiliaria', 'el palomar', 'ciudad jardín', 'zona oeste', 'propiedades', 'casas', 'departamentos', 'tasaciones', 'buenos aires'],
  authors: [{ name: 'Alvarez Brokers' }],
  creator: 'Alvarez Brokers',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://alvarezbrokers.com.ar',
    siteName: 'Alvarez Brokers',
    title: 'Alvarez Brokers | Inmobiliaria Premium en Zona Oeste',
    description: 'Especialistas en comercialización de inmuebles, tasaciones profesionales y asesoramiento legal en El Palomar, Ciudad Jardín y Zona Oeste.',
  },
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

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
