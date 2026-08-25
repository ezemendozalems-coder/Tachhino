import Link from 'next/link'
import {
  Search,
  Home,
  Key,
  BarChart3,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Servicios inmobiliarios integrales: comprar, vender, alquilar, tasaciones, apto crédito y asesoramiento en Zona Oeste.',
}

const services = [
  {
    id: 'comprar',
    icon: Search,
    title: 'Comprar',
    description: 'Encontrá la propiedad indicada para vos.',
    features: [
      'Búsqueda según tus necesidades y presupuesto',
      'Acompañamiento en cada visita',
      'Asesoramiento en la negociación',
      'Seguimiento hasta el cierre de la operación',
    ],
    cta: { label: 'Ver propiedades en venta', href: '/comprar' },
  },
  {
    id: 'venta',
    icon: Home,
    title: 'Vender',
    description: 'Comercializamos tu propiedad con estrategia, presentación profesional y seguimiento personalizado.',
    features: [
      'Fotografía y presentación profesional',
      'Publicación en los canales de Tacchino',
      'Estrategia de precio basada en el mercado',
      'Acompañamiento hasta la escrituración',
    ],
  },
  {
    id: 'alquiler',
    icon: Key,
    title: 'Alquilar',
    description: 'Propiedades seleccionadas y acompañamiento durante todo el proceso.',
    features: [
      'Selección de inquilinos',
      'Contratos ajustados a la normativa vigente',
      'Seguimiento durante toda la locación',
      'Atención directa ante cualquier consulta',
    ],
    cta: { label: 'Ver propiedades en alquiler', href: '/alquilar' },
  },
  {
    id: 'tasaciones',
    icon: BarChart3,
    title: 'Tasaciones',
    description: 'Conocé el valor real de mercado de tu propiedad.',
    features: [
      'Relevamiento de la propiedad',
      'Análisis comparativo de mercado',
      'Informe con valor estimado',
      'Asesoramiento sobre precio de venta',
    ],
    cta: { label: 'Solicitar tasación', href: '/tasaciones' },
  },
  {
    id: 'apto-credito',
    icon: ShieldCheck,
    title: 'Apto crédito',
    description: 'Encontrá propiedades compatibles con financiación bancaria.',
    features: [
      'Catálogo filtrado de propiedades aptas',
      'Orientación sobre el proceso de crédito',
      'Acompañamiento junto a tu entidad bancaria',
      'Seguimiento hasta la aprobación',
    ],
    cta: { label: 'Ver propiedades apto crédito', href: '/apto-credito' },
  },
  {
    id: 'asesoramiento',
    icon: Users,
    title: 'Asesoramiento',
    description: 'Acompañamiento profesional durante toda la operación.',
    features: [
      'Atención cercana y personalizada',
      'Conocimiento profundo de Zona Oeste',
      'Más de 40 años de trayectoria',
      'Un mismo asesor durante todo el proceso',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
              Servicios
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 text-balance">
              Todo lo que necesitás, en un mismo lugar.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ofrecemos un servicio completo y personalizado, desde la primera
              consulta hasta el cierre de cada operación.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-primary/10 mb-6">
                    <service.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-serif text-3xl text-foreground mb-3">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-[18px] h-[18px] text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="gap-2 group bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm" asChild>
                    <Link href={service.cta?.href ?? '/contacto'}>
                      {service.cta?.label ?? 'Consultar servicio'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

                <div className={cn('relative aspect-square rounded-lg bg-secondary/60 flex items-center justify-center', index % 2 === 1 ? 'lg:order-1' : '')}>
                  <service.icon className="w-28 h-28 text-primary/15" strokeWidth={1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="bg-[var(--color-ink)] rounded-lg p-8 md:p-12 lg:p-16 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
              ¿Necesitás asesoramiento personalizado?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte. Contactanos y conversemos
              sobre tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 group bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm" asChild>
                <Link href="/contacto">
                  Contactar ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white rounded-sm" asChild>
                <a href="tel:+541144510000">
                  <Phone className="w-4 h-4" />
                  Llamar: +54 11 4451-0000
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
