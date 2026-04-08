import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const zones = [
  {
    name: 'El Palomar',
    description: 'Zona residencial con excelente conectividad, todos los servicios y una comunidad consolidada.',
    properties: 45,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    href: '/propiedades?zona=el-palomar',
  },
  {
    name: 'Ciudad Jardín',
    description: 'Barrio exclusivo con amplios espacios verdes, calles arboladas y alta calidad de vida.',
    properties: 32,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    href: '/propiedades?zona=ciudad-jardin',
  },
  {
    name: 'Zona Oeste',
    description: 'Amplia cobertura regional con las mejores oportunidades en propiedades y desarrollos.',
    properties: 78,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
    href: '/propiedades?zona=zona-oeste',
  },
]

export function ZonesSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
            Zonas de Trabajo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
            Especialistas en las mejores zonas del oeste
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Conocemos cada barrio, cada calle y cada oportunidad. Nuestra experiencia 
            local nos permite ofrecerte el mejor asesoramiento.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {zones.map((zone, index) => (
            <Link
              key={zone.name}
              href={zone.href}
              className={cn(
                'group relative rounded-2xl overflow-hidden',
                'aspect-[4/5] md:aspect-[3/4]',
                'animate-fade-up'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <Image
                src={zone.image}
                alt={zone.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{zone.properties} propiedades</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-foreground mb-2">
                  {zone.name}
                </h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4 line-clamp-2">
                  {zone.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground group-hover:gap-3 transition-all">
                  Ver propiedades
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
