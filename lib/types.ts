export interface Property {
  id: string
  slug: string
  title: string
  operationType: 'venta' | 'alquiler' | 'temporal'
  propertyType: 'casa' | 'departamento' | 'duplex' | 'ph' | 'lote' | 'oficina' | 'local' | 'cochera' | 'galpon'
  address: string
  neighborhood: string
  city: string
  price: number
  currency: 'USD' | 'ARS'
  shortDescription: string
  longDescription: string
  rooms: number
  bedrooms: number
  bathrooms: number
  garages: number
  coveredArea: number
  totalArea: number
  age: number
  condition: 'nuevo' | 'excelente' | 'muy-bueno' | 'bueno' | 'regular' | 'a-reciclar'
  features: string[]
  images: string[]
  featured: boolean
  creditReady: boolean
  reserved: boolean
  isNew: boolean
  location?: {
    lat: number
    lng: number
  }
  propertyCode: string
  createdAt: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

export interface Zone {
  id: string
  name: string
  description: string
  image: string
  href: string
}

export interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
}
