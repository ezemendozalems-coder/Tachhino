import Link from 'next/link'
import { 
  Home, 
  Key, 
  BarChart3, 
  Shield, 
  TrendingUp, 
  Search,
  ArrowRight 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Home,
    title: 'Venta de Inmuebles',
    description: 'Comercializamos tu propiedad con estrategias efectivas, fotografía profesional y presencia en los principales portales.',
    href: '/servicios#venta',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: Key,
    title: 'Alquileres',
    description: 'Gestionamos el alquiler de tu propiedad con selección rigurosa de inquilinos y contratos seguros.',
    href: '/servicios#alquiler',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: BarChart3,
    title: 'Tasaciones',
    description: 'Determinamos el valor real de mercado de tu propiedad con análisis profesional y datos actualizados.',
    href: '/tasaciones',
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: Shield,
    title: 'Asesoramiento Legal',
    description: 'Respaldo legal completo en todas las operaciones inmobiliarias para tu total tranquilidad.',
    href: '/servicios#legal',
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Inversiones',
    description: 'Identificamos oportunidades de inversión con análisis de rentabilidad y potencial de valorización.',
    href: '/inversiones',
    color: 'bg-rose-500/10 text-rose-600',
  },
  {
    icon: Search,
    title: 'Búsqueda Personalizada',
    description: 'Encontramos la propiedad ideal según tus necesidades específicas y presupuesto.',
    href: '/contacto',
    color: 'bg-cyan-500/10 text-cyan-600',
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
            Soluciones integrales para todas tus necesidades inmobiliarias
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ofrecemos un servicio completo y personalizado, desde la tasación hasta 
            el cierre de la operación, con el respaldo profesional que tu inversión merece.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={cn(
                'group relative bg-card rounded-2xl p-8 border border-border/50',
                'hover:border-primary/30 hover:shadow-xl transition-all duration-500',
                'hover:-translate-y-1'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
                'transition-transform duration-300 group-hover:scale-110',
                service.color
              )}>
                <service.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Link */}
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Conocer más
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
