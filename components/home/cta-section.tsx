import Link from 'next/link'
import { ArrowRight, Phone, FileText, TrendingUp, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ctaOptions = [
  {
    icon: Home,
    title: '¿Querés vender?',
    description: 'Comercializamos tu propiedad al mejor precio del mercado.',
    href: '/contacto?motivo=vender',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
  {
    icon: FileText,
    title: '¿Necesitás tasar?',
    description: 'Conocé el valor real de tu propiedad con un análisis profesional.',
    href: '/tasaciones',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  },
  {
    icon: TrendingUp,
    title: '¿Buscás invertir?',
    description: 'Te asesoramos sobre las mejores oportunidades de inversión.',
    href: '/inversiones',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
]

export function CTASection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Quick CTA Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {ctaOptions.map((option, index) => (
            <Link
              key={option.title}
              href={option.href}
              className={cn(
                'group flex items-start gap-4 p-6 rounded-2xl border bg-card',
                'hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
              )}
            >
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border',
                option.color
              )}>
                <option.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {option.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Main CTA */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 gradient-overlay" />

          {/* Content */}
          <div className="relative z-10 py-20 px-6 md:px-12 lg:px-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-6 max-w-3xl mx-auto text-balance">
              Si estás por vender, comprar o invertir, trabajá con profesionales
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Combinamos experiencia, estrategia y presencia profesional para ayudarte 
              a tomar las mejores decisiones inmobiliarias.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 group"
                asChild
              >
                <Link href="/contacto">
                  Contactar ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
                asChild
              >
                <a href="tel:+5491112345678">
                  <Phone className="w-4 h-4" />
                  Llamar ahora
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
