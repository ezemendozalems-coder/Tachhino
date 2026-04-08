'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PropertyCard } from '@/components/properties/property-card'
import { properties } from '@/lib/data'

export function FeaturedProperties() {
  const featuredProperties = properties.filter(p => p.featured).slice(0, 6)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Propiedades Destacadas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
              Encontrá tu próximo hogar
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Selección exclusiva de propiedades en las mejores ubicaciones de Zona Oeste, 
              El Palomar y Ciudad Jardín.
            </p>
          </div>
          <Button variant="outline" size="lg" className="shrink-0 gap-2 group" asChild>
            <Link href="/propiedades">
              Ver todas las propiedades
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <div 
              key={property.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
