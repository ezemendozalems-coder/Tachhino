'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { propertyTypes, operationTypes, neighborhoods, features } from '@/lib/data'

export interface FilterState {
  operation: string
  propertyType: string
  neighborhood: string
  priceMin: string
  priceMax: string
  currency: string
  rooms: string
  bedrooms: string
  bathrooms: string
  search: string
  features: string[]
  sortBy: string
}

interface PropertyFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  resultsCount: number
}

const defaultFilters: FilterState = {
  operation: 'todos',
  propertyType: 'todos',
  neighborhood: 'todos',
  priceMin: '',
  priceMax: '',
  currency: 'USD',
  rooms: 'todos',
  bedrooms: 'todos',
  bathrooms: 'todos',
  search: '',
  features: [],
  sortBy: 'recientes',
}

export function PropertyFilters({ filters, onFilterChange, resultsCount }: PropertyFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: string | string[]) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature]
    updateFilter('features', newFeatures)
  }

  const clearFilters = () => {
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'sortBy') return false
    if (Array.isArray(value)) return value.length > 0
    return value !== 'todos' && value !== '' && value !== 'USD'
  })

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Search */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Buscar</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o ubicación..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 h-11 rounded-lg"
          />
        </div>
      </div>

      {/* Operation Type */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Operación</Label>
        <div className="flex gap-2">
          <Button
            variant={filters.operation === 'todos' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateFilter('operation', 'todos')}
            className="flex-1 h-10 rounded-lg text-xs sm:text-sm"
          >
            Todas
          </Button>
          {operationTypes.map((op) => (
            <Button
              key={op.value}
              variant={filters.operation === op.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('operation', op.value)}
              className="flex-1 h-10 rounded-lg text-xs sm:text-sm"
            >
              {op.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Tipo de propiedad</Label>
        <Select value={filters.propertyType} onValueChange={(v) => updateFilter('propertyType', v)}>
          <SelectTrigger className="h-11 rounded-lg">
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="todos">Todos los tipos</SelectItem>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Ubicación</Label>
        <Select value={filters.neighborhood} onValueChange={(v) => updateFilter('neighborhood', v)}>
          <SelectTrigger className="h-11 rounded-lg">
            <SelectValue placeholder="Seleccionar zona" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="todos">Todas las zonas</SelectItem>
            {neighborhoods.map((n) => (
              <SelectItem key={n.value} value={n.value}>
                {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Rango de precio</Label>
        <div className="flex items-center gap-2">
          <Select value={filters.currency} onValueChange={(v) => updateFilter('currency', v)}>
            <SelectTrigger className="w-20 h-11 rounded-lg text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="ARS">ARS</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Mín"
            value={filters.priceMin}
            onChange={(e) => updateFilter('priceMin', e.target.value)}
            className="flex-1 h-11 rounded-lg text-xs"
          />
          <span className="text-muted-foreground text-sm">-</span>
          <Input
            type="number"
            placeholder="Máx"
            value={filters.priceMax}
            onChange={(e) => updateFilter('priceMax', e.target.value)}
            className="flex-1 h-11 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Rooms */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Ambientes</Label>
        <Select value={filters.rooms} onValueChange={(v) => updateFilter('rooms', v)}>
          <SelectTrigger className="h-11 rounded-lg">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Dormitorios</Label>
        <Select value={filters.bedrooms} onValueChange={(v) => updateFilter('bedrooms', v)}>
          <SelectTrigger className="h-11 rounded-lg">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bathrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Baños</Label>
        <Select value={filters.bathrooms} onValueChange={(v) => updateFilter('bathrooms', v)}>
          <SelectTrigger className="h-11 rounded-lg">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            Características
            {isAdvancedOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <label
                key={feature.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={filters.features.includes(feature.value)}
                  onCheckedChange={() => toggleFeature(feature.value)}
                />
                <span className="text-sm text-foreground">{feature.label}</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full h-11 rounded-lg mt-4" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-foreground">Filtros</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {resultsCount}
            </span>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2 h-11 rounded-lg">
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle>Filtrar propiedades</SheetTitle>
            </SheetHeader>
            <FilterContent />
            <div className="mt-6">
              <SheetClose asChild>
                <Button className="w-full h-11 rounded-lg">
                  Ver {resultsCount} resultados
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
