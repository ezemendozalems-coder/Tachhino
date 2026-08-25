import Link from 'next/link'
import {
  Search,
  Home,
  Key,
  BarChart3,
  ShieldCheck,
  Users,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Search,
    title: 'Comprar',
    description: 'Encontrá la propiedad indicada para vos.',
    href: '/comprar',
  },
  {
    icon: Home,
    title: 'Vender',
    description: 'Comercializamos tu propiedad con estrategia, presentación profesional y seguimiento personalizado.',
    href: '/contacto?motivo=vender',
  },
  {
    icon: Key,
    title: 'Alquilar',
    description: 'Propiedades seleccionadas y acompañamiento durante todo el proceso.',
    href: '/alquilar',
  },
  {
    icon: BarChart3,
    title: 'Tasaciones',
    description: 'Conocé el valor real de mercado de tu propiedad.',
    href: '/tasaciones',
  },
  {
    icon: ShieldCheck,
    title: 'Apto crédito',
    description: 'Encontrá propiedades compatibles con financiación bancaria.',
    href: '/apto-credito',
  },
  {
    icon: Users,
    title: 'Asesoramiento',
    description: 'Acompañamiento profesional durante toda la operación.',
    href: '/servicios',
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
            Servicios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Todo lo que necesitás, en un mismo lugar.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className={cn(
                'group relative bg-card p-8 sm:p-10',
                'hover:bg-[var(--color-ink)] transition-colors duration-500'
              )}
            >
              <service.icon className="w-7 h-7 text-primary mb-6 group-hover:text-[var(--color-gold)] transition-colors" strokeWidth={1.5} />

              <h3 className="text-lg font-medium text-foreground mb-2.5 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 group-hover:text-white/60 transition-colors">
                {service.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Conocer más
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
