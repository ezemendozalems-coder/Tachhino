import type { Metadata, Viewport } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { Preloader } from '@/components/layout/preloader'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tacchino Propiedades | Más de 40 años en Zona Oeste',
    template: '%s | Tacchino Propiedades',
  },
  description: 'Tacchino Propiedades — más de 40 años de experiencia en venta, alquiler, tasaciones y asesoramiento inmobiliario en Ciudad Jardín, El Palomar y Zona Oeste.',
  keywords: ['inmobiliaria', 'tacchino propiedades', 'ciudad jardín', 'el palomar', 'zona oeste', 'propiedades', 'casas', 'departamentos', 'tasaciones', 'apto crédito', 'buenos aires'],
  authors: [{ name: 'Tacchino Propiedades' }],
  creator: 'Tacchino Propiedades',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://tacchinopropiedades.com.ar',
    siteName: 'Tacchino Propiedades',
    title: 'Tacchino Propiedades | Más de 40 años en Zona Oeste',
    description: 'Más de 40 años de experiencia en venta, alquiler, tasaciones y asesoramiento inmobiliario en Ciudad Jardín, El Palomar y Zona Oeste.',
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
  themeColor: '#0B0D0F',
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
    <html lang="es" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Tacchino Propiedades',
              description: 'Más de 40 años de experiencia en venta, alquiler, tasaciones y asesoramiento inmobiliario en Ciudad Jardín, El Palomar y Zona Oeste.',
              url: 'https://tacchinopropiedades.com.ar',
              areaServed: ['Ciudad Jardín', 'El Palomar', 'Caseros', 'Villa Bosch', 'Martín Coronado', 'Hurlingham', 'San Martín'],
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Buenos Aires',
                addressCountry: 'AR',
              },
            }),
          }}
        />
        <Preloader />
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
