import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircle2, 
  Users, 
  Award, 
  Target, 
  Heart,
  ArrowRight,
  MapPin 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsSection } from '@/components/home/stats-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé la historia y trayectoria de Alvarez Brokers, más de 25 años de experiencia en el mercado inmobiliario de Zona Oeste.',
}

const values = [
  {
    icon: Heart,
    title: 'Confianza',
    description: 'Construimos relaciones duraderas basadas en la honestidad y transparencia en cada operación.',
  },
  {
    icon: Award,
    title: 'Profesionalismo',
    description: 'Un equipo capacitado y actualizado para brindarte el mejor servicio inmobiliario.',
  },
  {
    icon: Target,
    title: 'Compromiso',
    description: 'Nos involucramos en cada detalle para lograr los mejores resultados para nuestros clientes.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Atención personalizada y trato directo con nuestro equipo en cada etapa del proceso.',
  },
]

const timeline = [
  {
    year: '1999',
    title: 'Fundación',
    description: 'Nace Alvarez Brokers con el objetivo de profesionalizar el mercado inmobiliario de Zona Oeste.',
  },
  {
    year: '2005',
    title: 'Expansión',
    description: 'Ampliamos nuestra cobertura a Ciudad Jardín y consolidamos nuestra presencia en El Palomar.',
  },
  {
    year: '2012',
    title: 'Innovación',
    description: 'Incorporamos las últimas tecnologías y plataformas digitales para mejorar la experiencia del cliente.',
  },
  {
    year: '2018',
    title: 'Liderazgo',
    description: 'Nos posicionamos como referentes del sector inmobiliario en toda la Zona Oeste.',
  },
  {
    year: 'Hoy',
    title: 'Excelencia',
    description: 'Más de 25 años de trayectoria, miles de operaciones exitosas y la confianza de toda la comunidad.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Sobre Nosotros
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
              Más de 25 años construyendo confianza
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              En Alvarez Brokers combinamos experiencia, conocimiento del mercado local 
              y un trato personalizado para acompañarte en cada decisión inmobiliaria.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"
                      alt="Oficina de Alvarez Brokers"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="pt-12 space-y-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                      alt="Propiedades de calidad"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
                Una historia de compromiso y resultados
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">J. I. Alvarez Brokers Inmobiliarios</strong> nació 
                en 1999 con una visión clara: elevar los estándares del mercado inmobiliario de Zona 
                Oeste a través de un servicio profesional, transparente y centrado en las necesidades 
                de cada cliente.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Desde nuestra sede en El Palomar, hemos acompañado a miles de familias en la compra, 
                venta y alquiler de propiedades, construyendo una reputación basada en resultados 
                concretos y relaciones duraderas.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Hoy, con más de dos décadas de experiencia, seguimos fieles a nuestros valores 
                fundacionales: honestidad, profesionalismo y un compromiso genuino con el éxito 
                de cada operación.
              </p>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Nuestra oficina</div>
                  <div className="text-muted-foreground">Marconi 680, El Palomar, Buenos Aires</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Nuestros Valores
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
              Los principios que nos guían
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nuestra filosofía de trabajo se basa en valores sólidos que aplicamos 
              en cada interacción con nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Nuestra Historia
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
              Un camino de crecimiento
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 pb-8 last:pb-0">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-foreground mb-6">
            ¿Listo para trabajar juntos?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Ya sea que busques comprar, vender o invertir, nuestro equipo está 
            preparado para ayudarte a alcanzar tus objetivos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 group"
              asChild
            >
              <Link href="/contacto">
                Contactanos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/propiedades">Ver propiedades</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
