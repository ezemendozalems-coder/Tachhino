import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { zones } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ZonesSection() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/40">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
            Zonas de trabajo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Conocemos Zona Oeste como nuestra casa.
          </h2>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {zones.map((zone, index) => (
            <Link
              key={zone.id}
              href={zone.href}
              className={cn(
                'group relative rounded-lg overflow-hidden aspect-[3/4] animate-fade-up',
                index === 0 && 'col-span-2 row-span-2 aspect-square md:aspect-[3/4]'
              )}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <Image
                src={zone.image}
                alt={zone.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                <h3 className="font-serif text-lg sm:text-xl text-white mb-1">
                  {zone.name}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed mb-2 line-clamp-2 hidden sm:block">
                  {zone.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 group-hover:gap-2.5 transition-all">
                  Ver propiedades
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
