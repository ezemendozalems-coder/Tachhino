import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const highlights = [
  'Más de 25 años de experiencia en el mercado',
  'Especialistas en El Palomar y Ciudad Jardín',
  'Asesoramiento legal integral en cada operación',
  'Tasaciones profesionales con datos de mercado',
]

export function AboutSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"
                    alt="Interior de propiedad moderna"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop"
                    alt="Fachada de casa elegante"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                    alt="Living moderno"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop"
                    alt="Casa con jardín"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <span className="block text-4xl font-bold">25+</span>
                <span className="text-sm opacity-80">Años de<br />Experiencia</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              Experiencia, confianza y compromiso en cada operación
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              En <strong className="text-foreground">Alvarez Brokers</strong> combinamos más de dos décadas 
              de trayectoria con un profundo conocimiento del mercado inmobiliario de Zona Oeste. 
              Nuestro equipo de profesionales brinda un servicio personalizado, transparente 
              y orientado a resultados.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Desde 1999, hemos acompañado a miles de familias en la compra, venta y alquiler 
              de propiedades, construyendo relaciones basadas en la confianza y el compromiso 
              con cada cliente.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button size="lg" className="gap-2 group" asChild>
              <Link href="/nosotros">
                Conocé nuestra historia
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
