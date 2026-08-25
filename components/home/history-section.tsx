import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function HistorySection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[var(--color-ink)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Imagen histórica / arquitectónica en blanco y negro */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop"
                alt="Arquitectura residencial de Zona Oeste"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent" />
            </div>

            {/* Número gigante */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-primary text-white rounded-lg px-8 py-6 shadow-2xl">
              <span className="block font-serif text-5xl sm:text-6xl leading-none">+40</span>
              <span className="text-xs uppercase tracking-[0.2em] opacity-90 block mt-1">
                Años de<br />experiencia
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3 block">
              Nuestra historia
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 text-balance leading-[1.1]">
              Más de 40 años acompañando decisiones importantes.
            </h2>
            <p className="text-white/75 leading-relaxed mb-5 text-lg">
              Tacchino Propiedades combina más de cuatro décadas de experiencia
              en el mercado inmobiliario con una atención cercana, profesional
              y personalizada.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Con un profundo conocimiento de Ciudad Jardín, El Palomar y Zona
              Oeste, acompañamos a cada cliente durante todo el proceso de
              compra, venta, alquiler o tasación.
            </p>

            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 text-white font-medium group border-b border-primary pb-1 hover:gap-3 transition-all"
            >
              Conocé nuestra historia
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
