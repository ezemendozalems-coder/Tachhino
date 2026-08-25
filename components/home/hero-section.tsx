'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, MapPin, Building2, DollarSign, BedDouble, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
  { value: 'todos', label: 'Tipo de propiedad' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'duplex', label: 'Dúplex' },
  { value: 'ph', label: 'PH' },
  { value: 'lote', label: 'Lote / Terreno' },
]

const locations = [
  { value: 'todos', label: 'Zona' },
  { value: 'ciudad-jardin', label: 'Ciudad Jardín' },
  { value: 'el-palomar', label: 'El Palomar' },
  { value: 'caseros', label: 'Caseros' },
  { value: 'villa-bosch', label: 'Villa Bosch' },
  { value: 'martin-coronado', label: 'Martín Coronado' },
  { value: 'hurlingham', label: 'Hurlingham' },
  { value: 'san-martin', label: 'San Martín' },
]

const roomOptions = [
  { value: 'todos', label: 'Ambientes' },
  { value: '1', label: '1 ambiente' },
  { value: '2', label: '2 ambientes' },
  { value: '3', label: '3 ambientes' },
  { value: '4', label: '4 ambientes' },
  { value: '5+', label: '5 o más' },
]

const priceRanges = [
  { value: 'todos', label: 'Precio' },
  { value: '0-50000', label: 'Hasta USD 50.000' },
  { value: '50000-100000', label: 'USD 50.000 - 100.000' },
  { value: '100000-200000', label: 'USD 100.000 - 200.000' },
  { value: '200000+', label: 'Más de USD 200.000' },
]

export function HeroSection() {
  const router = useRouter()
  const [operation, setOperation] = useState('venta')
  const [propertyType, setPropertyType] = useState('todos')
  const [location, setLocation] = useState('todos')
  const [rooms, setRooms] = useState('todos')
  const [priceRange, setPriceRange] = useState('todos')
  const [creditReady, setCreditReady] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('operacion', operation)
    if (propertyType !== 'todos') params.set('tipo', propertyType)
    if (location !== 'todos') params.set('zona', location)
    if (rooms !== 'todos') params.set('ambientes', rooms)
    if (priceRange !== 'todos') params.set('precio', priceRange)
    if (creditReady) params.set('aptoCredito', 'true')
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <section className="relative">
      <div className="relative h-[78vh] sm:h-[88vh] min-h-[480px] sm:min-h-[620px] max-h-[720px] sm:max-h-none flex items-center overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
          quality={80}
        />

        {/* Overlay negro/grafito elegante */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/70 text-sm tracking-[0.25em] uppercase mb-5"
              >
                Ciudad Jardín · El Palomar · Zona Oeste
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] mb-6 tracking-tight text-balance"
              >
                Más de <span className="text-primary">40 años</span> encontrando
                el lugar indicado.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed mb-10"
              >
                Venta, alquiler y tasaciones en Ciudad Jardín, El Palomar y Zona Oeste.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2" asChild>
                  <Link href="/propiedades">Ver propiedades</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/tasaciones">Tasá tu propiedad</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Buscador — panel flotante superpuesto al hero */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-5xl mx-auto -mt-24 sm:-mt-20"
        >
          <div className="bg-white rounded-lg shadow-2xl p-2 sm:p-3">
            {/* Operation Tabs */}
            <div className="flex gap-1 mb-2 sm:mb-3">
              {operationOptions.map((op) => (
                <button
                  key={op.value}
                  onClick={() => setOperation(op.value)}
                  className={cn(
                    'flex-1 sm:flex-auto px-6 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300',
                    operation === op.value
                      ? 'bg-[var(--color-ink)] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {op.label}
                </button>
              ))}
            </div>

            {/* Search Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
              <div className="relative col-span-1">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12 pl-10 bg-gray-50 border-0 rounded-sm text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-colors">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-sm">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative col-span-1">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12 pl-10 bg-gray-50 border-0 rounded-sm text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-colors">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Zona" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    {locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value} className="text-sm">
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative col-span-1">
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger className="h-12 pl-10 bg-gray-50 border-0 rounded-sm text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-colors">
                    <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Ambientes" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    {roomOptions.map((r) => (
                      <SelectItem key={r.value} value={r.value} className="text-sm">
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative col-span-1">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-12 pl-10 bg-gray-50 border-0 rounded-sm text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-colors">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Precio" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    {priceRanges.map((price) => (
                      <SelectItem key={price.value} value={price.value} className="text-sm">
                        {price.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center gap-2.5 h-12 px-4 rounded-sm bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <Checkbox checked={creditReady} onCheckedChange={(v) => setCreditReady(v === true)} />
                <span className="text-xs sm:text-sm text-gray-700">Apto crédito</span>
              </label>

              <Button
                onClick={handleSearch}
                size="lg"
                className="h-12 rounded-sm text-sm font-semibold gap-2 bg-primary hover:bg-primary/90 text-primary-foreground col-span-1 sm:col-span-2 lg:col-span-1"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </Button>
            </div>

            <div className="flex justify-end pt-2 pr-1">
              <Link
                href="/propiedades"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Búsqueda avanzada
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
