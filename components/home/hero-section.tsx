'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Home, MapPin, DollarSign, Bed, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const operationOptions = [
  { value: 'venta', label: 'Comprar' },
  { value: 'alquiler', label: 'Alquilar' },
]

const propertyTypes = [
  { value: 'todos', label: 'Todos los tipos' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'ph', label: 'PH' },
  { value: 'lote', label: 'Lote' },
  { value: 'oficina', label: 'Oficina' },
]

const locations = [
  { value: 'todos', label: 'Todas las zonas' },
  { value: 'el-palomar', label: 'El Palomar' },
  { value: 'ciudad-jardin', label: 'Ciudad Jardín' },
  { value: 'zona-oeste', label: 'Zona Oeste' },
]

export function HeroSection() {
  const router = useRouter()
  const [operation, setOperation] = useState('venta')
  const [propertyType, setPropertyType] = useState('todos')
  const [location, setLocation] = useState('todos')

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('operacion', operation)
    if (propertyType !== 'todos') params.set('tipo', propertyType)
    if (location !== 'todos') params.set('zona', location)
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-primary-foreground/90 font-medium">
              Especialistas en Zona Oeste desde 1999
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-primary-foreground leading-tight mb-6 animate-fade-up text-balance" style={{ animationDelay: '0.1s' }}>
            Tu próxima propiedad comienza con una{' '}
            <span className="text-accent">decisión inteligente</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Encontrá el hogar de tus sueños en El Palomar, Ciudad Jardín y toda Zona Oeste 
            con el respaldo de más de 25 años de experiencia inmobiliaria.
          </p>

          {/* Search Box */}
          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2 max-w-4xl mx-auto border border-border/50">
              {/* Operation Tabs */}
              <div className="flex gap-1 p-1 mb-2">
                {operationOptions.map((op) => (
                  <button
                    key={op.value}
                    onClick={() => setOperation(op.value)}
                    className={cn(
                      'flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200',
                      operation === op.value
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    {op.label}
                  </button>
                ))}
              </div>

              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
                {/* Property Type */}
                <div className="relative">
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-14 pl-12 bg-secondary/50 border-0 rounded-xl text-foreground">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="relative">
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-14 pl-12 bg-secondary/50 border-0 rounded-xl text-foreground">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rooms */}
                <div className="relative">
                  <Select defaultValue="todos">
                    <SelectTrigger className="h-14 pl-12 bg-secondary/50 border-0 rounded-xl text-foreground">
                      <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <SelectValue placeholder="Ambientes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="1">1 ambiente</SelectItem>
                      <SelectItem value="2">2 ambientes</SelectItem>
                      <SelectItem value="3">3 ambientes</SelectItem>
                      <SelectItem value="4">4+ ambientes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="h-14 rounded-xl text-base font-semibold gap-2"
                >
                  <Search className="w-5 h-5" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <span className="text-primary-foreground/60 text-sm">Búsquedas populares:</span>
              <Link 
                href="/propiedades?operacion=venta&tipo=casa" 
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground underline underline-offset-4 transition-colors"
              >
                Casas en venta
              </Link>
              <Link 
                href="/propiedades?operacion=alquiler&tipo=departamento" 
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground underline underline-offset-4 transition-colors"
              >
                Departamentos en alquiler
              </Link>
              <Link 
                href="/propiedades?zona=el-palomar" 
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground underline underline-offset-4 transition-colors"
              >
                El Palomar
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-primary-foreground/60 text-xs uppercase tracking-wider">
              Descubrí más
            </span>
            <ChevronDown className="w-6 h-6 text-primary-foreground/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
