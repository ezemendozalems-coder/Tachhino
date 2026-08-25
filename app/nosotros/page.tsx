import Image from 'next/image'
import Link from 'next/link'
import { Users, Award, Target, Heart, ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsSection } from '@/components/home/stats-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé la historia de Tacchino Propiedades: más de 40 años de experiencia en el mercado inmobiliario de Zona Oeste.',
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
              Nosotros
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 text-balance">
              Más de 40 años acompañando decisiones importantes.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              En Tacchino Propiedades combinamos experiencia, conocimiento del
              mercado local y un trato personalizado para acompañarte en cada
              decisión inmobiliaria.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=900&auto=format&fit=crop"
                  alt="Arquitectura residencial de Zona Oeste"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-primary text-white rounded-lg px-7 py-5 shadow-xl">
                <span className="block font-serif text-4xl leading-none">+40</span>
                <span className="text-xs uppercase tracking-wider opacity-90">Años de experiencia</span>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
                Cuatro décadas de trayectoria en Zona Oeste
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Tacchino Propiedades</strong> combina
                más de cuatro décadas de experiencia en el mercado inmobiliario
                con una atención cercana, profesional y personalizada.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Con un profundo conocimiento de Ciudad Jardín, El Palomar y Zona
                Oeste, acompañamos a cada cliente durante todo el proceso de
                compra, venta, alquiler o tasación.
              </p>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-sm border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Nuestra zona</div>
                  <div className="text-muted-foreground">Ciudad Jardín, El Palomar y Zona Oeste, Buenos Aires</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
              Nuestros valores
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
              Los principios que nos guían
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nuestra filosofía de trabajo se basa en valores sólidos que aplicamos
              en cada interacción con nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-lg p-6 border border-border/60 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{value.title}</h3>
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

      {/* CTA Section */}
      <section className="py-14 sm:py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
            ¿Listo para trabajar juntos?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Ya sea que busques comprar, vender o alquilar, nuestro equipo está
            preparado para ayudarte a alcanzar tus objetivos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 group rounded-sm" asChild>
              <Link href="/contacto">
                Contactanos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white rounded-sm" asChild>
              <Link href="/propiedades">Ver propiedades</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
