import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="relative py-24 sm:py-28 bg-primary overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Detalle gráfico: línea naranja */}
        <div className="w-14 h-[3px] bg-[var(--color-gold)] mx-auto mb-8 rounded-full" />

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 max-w-3xl mx-auto text-balance leading-[1.15]">
          Tu próxima propiedad puede estar más cerca de lo que imaginás.
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 gap-2 group"
            asChild
          >
            <Link href="/propiedades">
              Ver propiedades
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/contacto">Hablar con un asesor</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
