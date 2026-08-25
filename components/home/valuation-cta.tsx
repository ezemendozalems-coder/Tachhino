import Link from 'next/link'
import { ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Análisis comparativo del mercado actual',
  'Evaluación de características y estado',
  'Informe con valor de mercado estimado',
  'Estrategia comercial personalizada',
]

export function ValuationCTA() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-primary/10 mb-6">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Tasación profesional</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
              ¿Querés saber cuánto vale tu propiedad?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Solicitá una tasación profesional. Nuestro equipo analiza cada
              detalle para brindarte una valuación precisa, basada en datos
              reales del mercado inmobiliario de Zona Oeste.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 group" asChild>
                <Link href="/tasaciones">
                  Solicitar tasación
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-secondary/60 rounded-lg p-8 lg:p-10">
              <div className="bg-card rounded-lg shadow-xl border border-border/60 overflow-hidden">
                <div className="bg-[var(--color-ink)] p-6 text-white">
                  <h3 className="text-base font-medium mb-1">Informe de tasación</h3>
                  <p className="text-xs text-white/60">Ejemplo ilustrativo</p>
                </div>
                <div className="p-6 space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tipo de propiedad</span>
                      <span className="text-foreground">Chalet 4 ambientes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ubicación</span>
                      <span className="text-foreground">Ciudad Jardín</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Superficie</span>
                      <span className="text-foreground">151 m² totales</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-2">Rango de mercado estimado</div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
