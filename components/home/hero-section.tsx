'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Home, MapPin, ChevronDown, Building2, DollarSign } from 'lucide-react'
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
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
    img.onload = () => setImageLoaded(true)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('operacion', operation)
    if (propertyType !== 'todos') params.set('tipo', propertyType)
    if (location !== 'todos') params.set('zona', location)
    if (priceRange !== 'todos') params.set('precio', priceRange)
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Zoom Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: imageLoaded ? 1 : 1.1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')`,
          }}
        />
      </motion.div>

      {/* Premium Dark Overlay - Clean, no patterns */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(10, 20, 40, 0.65) 0%,
            rgba(15, 25, 50, 0.75) 50%,
            rgba(10, 20, 45, 0.85) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Text Content */}
            <div className="text-center mb-12 md:mb-16">
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight text-balance"
              >
                Encontrá tu próxima propiedad con{' '}
                <span className="text-[#4A90D9]">Alvarez Brokers</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Especialistas en El Palomar, Ciudad Jardín y Zona Oeste. 
                Venta, alquiler y asesoramiento inmobiliario premium.
              </motion.p>
            </div>

            {/* Premium Search Box */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 max-w-5xl mx-auto">
                {/* Operation Tabs */}
                <div className="flex gap-2 mb-4">
                  {operationOptions.map((op) => (
                    <button
                      key={op.value}
                      onClick={() => setOperation(op.value)}
                      className={cn(
                        'flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300',
                        operation === op.value
                          ? 'bg-[#0F2A4A] text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>

                {/* Search Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {/* Property Type */}
                  <div className="relative lg:col-span-1">
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="h-14 pl-12 bg-gray-50 border-0 rounded-xl text-gray-800 hover:bg-gray-100 transition-colors">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <SelectValue placeholder="Tipo de propiedad" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="rounded-lg">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="relative lg:col-span-1">
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="h-14 pl-12 bg-gray-50 border-0 rounded-xl text-gray-800 hover:bg-gray-100 transition-colors">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <SelectValue placeholder="Ubicación" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {locations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value} className="rounded-lg">
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="relative lg:col-span-1">
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="h-14 pl-12 bg-gray-50 border-0 rounded-xl text-gray-800 hover:bg-gray-100 transition-colors">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <SelectValue placeholder="Precio" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {priceRanges.map((price) => (
                          <SelectItem key={price.value} value={price.value} className="rounded-lg">
                            {price.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button - spans 2 columns on lg */}
                  <Button
                    onClick={handleSearch}
                    size="lg"
                    className="h-14 rounded-xl text-base font-semibold gap-3 bg-[#0F2A4A] hover:bg-[#1a3d66] text-white shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2"
                  >
                    <Search className="w-5 h-5" />
                    Buscar propiedades
                  </Button>
                </div>
              </div>

              {/* Stats below search - subtle */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8 md:mt-10"
              >
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">+500</p>
                  <p className="text-sm text-white/60">Propiedades</p>
                </div>
                <div className="w-px h-10 bg-white/20 hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">+25</p>
                  <p className="text-sm text-white/60">Años de experiencia</p>
                </div>
                <div className="w-px h-10 bg-white/20 hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">+2000</p>
                  <p className="text-sm text-white/60">Clientes satisfechos</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium">
              Descubrí más
            </span>
            <ChevronDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
