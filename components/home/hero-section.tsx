'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, MapPin, ChevronDown, Building2, DollarSign } from 'lucide-react'
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
  { value: 'lote', label: 'Lote / Terreno' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'local', label: 'Local Comercial' },
]

const locations = [
  { value: 'todos', label: 'Todas las zonas' },
  { value: 'el-palomar', label: 'El Palomar' },
  { value: 'ciudad-jardin', label: 'Ciudad Jardín' },
  { value: 'caseros', label: 'Caseros' },
  { value: 'saenz-pena', label: 'Sáenz Peña' },
  { value: 'haedo', label: 'Haedo' },
  { value: 'moron', label: 'Morón' },
  { value: 'zona-oeste', label: 'Zona Oeste' },
]

const priceRanges = [
  { value: 'todos', label: 'Cualquier precio' },
  { value: '0-50000', label: 'Hasta USD 50.000' },
  { value: '50000-100000', label: 'USD 50.000 - 100.000' },
  { value: '100000-200000', label: 'USD 100.000 - 200.000' },
  { value: '200000-500000', label: 'USD 200.000 - 500.000' },
  { value: '500000+', label: 'Más de USD 500.000' },
]

export function HeroSection() {
  const router = useRouter()
  const [operation, setOperation] = useState('venta')
  const [propertyType, setPropertyType] = useState('todos')
  const [location, setLocation] = useState('todos')
  const [priceRange, setPriceRange] = useState('todos')

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('operacion', operation)
    if (propertyType !== 'todos') params.set('tipo', propertyType)
    if (location !== 'todos') params.set('zona', location)
    if (priceRange !== 'todos') params.set('precio', priceRange)
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <section className="relative h-screen min-h-[600px] sm:min-h-[750px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image - Optimized for mobile with lazy loading */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-auto"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop')`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay - Cleaner and faster */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(135deg, rgba(15, 42, 74, 0.7) 0%, rgba(20, 35, 60, 0.8) 50%, rgba(10, 25, 50, 0.85) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto">
            {/* Text Content */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-4 md:mb-6 tracking-tight text-balance"
              >
                Encontrá tu próxima propiedad con{' '}
                <span className="text-[#4A90D9]">Alvarez Brokers</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Especialistas en El Palomar, Ciudad Jardín y Zona Oeste
              </motion.p>
            </div>

            {/* Premium Search Box - Optimized Layout */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-3 md:p-4 max-w-6xl mx-auto">
                {/* Operation Tabs */}
                <div className="flex gap-1 sm:gap-2 mb-3 md:mb-4">
                  {operationOptions.map((op) => (
                    <button
                      key={op.value}
                      onClick={() => setOperation(op.value)}
                      className={cn(
                        'flex-1 sm:flex-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300',
                        operation === op.value
                          ? 'bg-[#0F2A4A] text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>

                {/* Search Fields Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
                  {/* Property Type */}
                  <div className="relative">
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="h-12 sm:h-13 md:h-14 pl-10 sm:pl-11 bg-gray-50 border-0 rounded-lg text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-colors">
                        <Building2 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="rounded-md text-xs sm:text-sm">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="relative">
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="h-12 sm:h-13 md:h-14 pl-10 sm:pl-11 bg-gray-50 border-0 rounded-lg text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-colors">
                        <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <SelectValue placeholder="Zona" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {locations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value} className="rounded-md text-xs sm:text-sm">
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="relative">
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="h-12 sm:h-13 md:h-14 pl-10 sm:pl-11 bg-gray-50 border-0 rounded-lg text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-colors">
                        <DollarSign className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <SelectValue placeholder="Precio" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {priceRanges.map((price) => (
                          <SelectItem key={price.value} value={price.value} className="rounded-md text-xs sm:text-sm">
                            {price.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <Button
                    onClick={handleSearch}
                    size="lg"
                    className="h-12 sm:h-13 md:h-14 rounded-lg text-xs sm:text-sm font-semibold gap-2 bg-[#0F2A4A] hover:bg-[#1a3d66] text-white shadow-lg hover:shadow-xl transition-all duration-300 col-span-1 sm:col-span-2 lg:col-span-1"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Buscar</span>
                  </Button>
                </div>
              </div>

              {/* Stats - Simplified for mobile */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 md:mt-8"
              >
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">+500</p>
                  <p className="text-xs sm:text-sm text-white/60">Propiedades</p>
                </div>
                <div className="w-px h-8 bg-white/20 hidden sm:block" />
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">+25</p>
                  <p className="text-xs sm:text-sm text-white/60">Años</p>
                </div>
                <div className="w-px h-8 bg-white/20 hidden sm:block" />
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">+2000</p>
                  <p className="text-xs sm:text-sm text-white/60">Clientes</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium hidden sm:block">
              Descubrí más
            </span>
            <ChevronDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
