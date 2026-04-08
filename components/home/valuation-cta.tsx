import Link from 'next/link'
import { ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Análisis comparativo del mercado actual',
  'Evaluación de características y estado',
  'Informe detallado con valor de mercado',
  'Estrategia comercial personalizada',
]

export function ValuationCTA() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Tasación Profesional</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              Conocé el valor real de tu propiedad
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nuestro equipo de tasadores profesionales analiza cada detalle para 
              brindarte una valuación precisa y actualizada, basada en datos reales 
              del mercado inmobiliario de Zona Oeste.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 group" asChild>
                <Link href="/tasaciones">
                  Solicitar tasación gratuita
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a 
                  href="https://wa.me/5491112345678?text=Hola, me gustaría solicitar una tasación de mi propiedad." 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-3xl p-8 lg:p-12">
              {/* Mock Valuation Card */}
              <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                <div className="bg-primary p-6 text-primary-foreground">
                  <h3 className="text-lg font-semibold mb-1">Informe de Tasación</h3>
                  <p className="text-sm opacity-80">Análisis de mercado profesional</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Valor estimado</span>
                    <span className="text-2xl font-bold text-foreground">USD 185.000</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tipo de propiedad</span>
                      <span className="text-foreground">Casa 3 ambientes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ubicación</span>
                      <span className="text-foreground">El Palomar</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Superficie</span>
                      <span className="text-foreground">180 m² cubiertos</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estado</span>
                      <span className="text-foreground">Excelente</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-2">Rango de mercado</div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>USD 170.000</span>
                      <span>USD 200.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
