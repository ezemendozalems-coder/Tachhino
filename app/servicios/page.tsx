import Link from 'next/link'
import { 
  Home, 
  Key, 
  BarChart3, 
  Shield, 
  TrendingUp, 
  Search,
  ArrowRight,
  CheckCircle2,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Servicios inmobiliarios integrales: venta, alquiler, tasaciones, asesoramiento legal e inversiones en Zona Oeste.',
}

const services = [
  {
    id: 'venta',
    icon: Home,
    title: 'Venta de Inmuebles',
    description: 'Comercializamos tu propiedad con las mejores estrategias del mercado para lograr una venta exitosa al mejor precio.',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    features: [
      'Fotografía profesional y tours virtuales',
      'Publicación en los principales portales',
      'Marketing digital segmentado',
      'Cartelería y difusión en zona',
      'Negociación profesional',
      'Acompañamiento hasta la escrituración',
    ],
  },
  {
    id: 'alquiler',
    icon: Key,
    title: 'Alquileres',
    description: 'Gestionamos el alquiler de tu propiedad con un proceso profesional que garantiza seguridad para propietarios e inquilinos.',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    features: [
      'Selección rigurosa de inquilinos',
      'Verificación de garantías y antecedentes',
      'Contratos ajustados a la ley vigente',
      'Gestión de cobro de alquileres',
      'Seguimiento durante toda la locación',
      'Administración integral opcional',
    ],
  },
  {
    id: 'tasaciones',
    icon: BarChart3,
    title: 'Tasaciones Profesionales',
    description: 'Determinamos el valor real de tu propiedad con un análisis técnico basado en datos actuales del mercado.',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    features: [
      'Relevamiento completo de la propiedad',
      'Análisis comparativo de mercado',
      'Evaluación de factores de plusvalía',
      'Informe detallado de tasación',
      'Asesoramiento sobre precio de venta',
      'Actualización de valores si es necesario',
    ],
    cta: {
      label: 'Solicitar tasación',
      href: '/tasaciones',
    },
  },
  {
    id: 'legal',
    icon: Shield,
    title: 'Asesoramiento Legal',
    description: 'Contamos con respaldo legal especializado en derecho inmobiliario para garantizar operaciones seguras.',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    features: [
      'Revisión de documentación',
      'Estudio de títulos',
      'Redacción de contratos',
      'Asesoramiento en sucesiones',
      'Gestión de escrituras',
      'Resolución de conflictos',
    ],
  },
  {
    id: 'inversiones',
    icon: TrendingUp,
    title: 'Inversiones y Desarrollos',
    description: 'Identificamos oportunidades de inversión con análisis de rentabilidad y acompañamiento en todo el proceso.',
    color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    features: [
      'Análisis de oportunidades de inversión',
      'Proyección de rentabilidad',
      'Asesoramiento en pozo y desarrollos',
      'Diversificación de portafolio',
      'Gestión de inversiones grupales',
      'Seguimiento post-inversión',
    ],
    cta: {
      label: 'Conocer oportunidades',
      href: '/inversiones',
    },
  },
  {
    id: 'busqueda',
    icon: Search,
    title: 'Búsqueda Personalizada',
    description: 'Encontramos la propiedad ideal para vos según tus necesidades, preferencias y presupuesto.',
    color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    features: [
      'Relevamiento de necesidades',
      'Búsqueda activa y pasiva',
      'Pre-selección de propiedades',
      'Coordinación de visitas',
      'Negociación en representación',
      'Seguimiento hasta la operación',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Nuestros Servicios
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
              Soluciones integrales para tus necesidades inmobiliarias
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ofrecemos un servicio completo y personalizado, desde la primera consulta 
              hasta el cierre exitoso de cada operación.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border ${service.color}`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {service.cta ? (
                    <Button size="lg" className="gap-2 group" asChild>
                      <Link href={service.cta.href}>
                        {service.cta.label}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  ) : (
                    <Button size="lg" className="gap-2 group" asChild>
                      <Link href="/contacto">
                        Consultar servicio
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Visual */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`aspect-square rounded-3xl ${service.color} bg-opacity-30 p-8 flex items-center justify-center`}>
                    <service.icon className="w-32 h-32 opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl p-8 md:p-12 lg:p-16 border border-border/50 shadow-xl text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              ¿Necesitás asesoramiento personalizado?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nuestro equipo de profesionales está listo para ayudarte. 
              Contactanos y conversemos sobre tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 group" asChild>
                <Link href="/contacto">
                  Contactar ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="tel:+5491112345678">
                  <Phone className="w-4 h-4" />
                  Llamar: 11 1234-5678
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
