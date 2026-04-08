"use client"

import { motion } from "framer-motion"
import { TrendingUp, Building2, PiggyBank, BarChart3, Shield, Clock, CheckCircle, ArrowRight, Phone, Mail, DollarSign, Target, Zap, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const investmentTypes = [
  {
    icon: Building2,
    title: "Propiedades para Renta",
    description: "Inversión en inmuebles con alta rentabilidad mensual en zonas de crecimiento sostenido.",
    returns: "6-8% anual",
    features: ["Ingresos pasivos mensuales", "Valorización del capital", "Protección contra inflación"]
  },
  {
    icon: TrendingUp,
    title: "Desarrollos en Pozo",
    description: "Accedé a proyectos inmobiliarios desde etapa inicial con planes de financiación flexibles.",
    returns: "15-25% al finalizar",
    features: ["Entrada accesible", "Financiación en pesos", "Mayor ganancia potencial"]
  },
  {
    icon: Target,
    title: "Terrenos Estratégicos",
    description: "Inversión en terrenos con potencial de desarrollo en zonas de expansión urbana.",
    returns: "10-20% anual",
    features: ["Bajo mantenimiento", "Alta plusvalía", "Flexibilidad de uso"]
  },
  {
    icon: BarChart3,
    title: "Locales Comerciales",
    description: "Propiedades comerciales con contratos de largo plazo y rentabilidad estable.",
    returns: "8-12% anual",
    features: ["Contratos a largo plazo", "Inquilinos corporativos", "Ajuste por inflación"]
  }
]

const benefits = [
  {
    icon: Shield,
    title: "Seguridad",
    description: "El real estate es el activo más seguro y estable para proteger tu capital."
  },
  {
    icon: DollarSign,
    title: "Rentabilidad",
    description: "Obtené retornos superiores a instrumentos financieros tradicionales."
  },
  {
    icon: LineChart,
    title: "Valorización",
    description: "Las propiedades bien ubicadas se valorizan constantemente en el tiempo."
  },
  {
    icon: Zap,
    title: "Liquidez",
    description: "Convertí tu inversión en efectivo cuando lo necesites."
  }
]

const stats = [
  { value: "USD 50M+", label: "En inversiones gestionadas" },
  { value: "200+", label: "Inversores activos" },
  { value: "95%", label: "Tasa de ocupación" },
  { value: "8.5%", label: "Rentabilidad promedio" }
]

const opportunities = [
  {
    title: "Complejo Residencial El Palomar",
    type: "Desarrollo en Pozo",
    location: "El Palomar, Zona Oeste",
    investment: "Desde USD 45,000",
    returns: "20% proyectado",
    status: "Últimas unidades",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop"
  },
  {
    title: "Local Comercial Av. Principal",
    type: "Renta Comercial",
    location: "Ciudad Jardín",
    investment: "USD 120,000",
    returns: "10% anual",
    status: "Disponible",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
  },
  {
    title: "Terreno 800m² con Proyecto",
    type: "Terreno Estratégico",
    location: "Caseros",
    investment: "USD 85,000",
    returns: "15% anual estimado",
    status: "Oportunidad única",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop"
  }
]

export default function InversionesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                Oportunidades de Inversión
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Invertí en <span className="text-accent">Real Estate</span> con Confianza
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Descubrí las mejores oportunidades de inversión inmobiliaria en Zona Oeste. 
                Asesoramiento experto para maximizar tu rentabilidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Ver Oportunidades
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/contacto">
                    Asesoramiento Gratuito
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-3xl" />
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop"
                  alt="Inversiones inmobiliarias"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">+25%</div>
                      <div className="text-muted-foreground text-sm">Rentabilidad 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por Qué Invertir en Inmuebles?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              El real estate sigue siendo la inversión más segura y rentable a largo plazo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tipos de Inversión
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Encontrá la estrategia de inversión que mejor se adapte a tus objetivos financieros.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {investmentTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <type.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm font-medium rounded-full">
                        {type.returns}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Oportunidades Actuales
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Propiedades seleccionadas con alto potencial de rentabilidad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={opp.image}
                    alt={opp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {opp.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {opp.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{opp.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{opp.location}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">Inversión mínima</div>
                      <div className="font-semibold text-foreground">{opp.investment}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Rentabilidad</div>
                      <div className="font-semibold text-green-600">{opp.returns}</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Más Información
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/propiedades">
                Ver Todas las Propiedades
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cómo Invertir con Nosotros
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un proceso simple y transparente para comenzar a invertir.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consulta Inicial", description: "Analizamos tu perfil inversor y objetivos financieros." },
              { step: "02", title: "Propuestas", description: "Te presentamos oportunidades acordes a tu perfil." },
              { step: "03", title: "Due Diligence", description: "Verificamos toda la documentación legal y técnica." },
              { step: "04", title: "Inversión", description: "Concretamos la operación con total seguridad jurídica." }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comenzá a Invertir Hoy
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Agendá una consulta gratuita con nuestros asesores de inversión y descubrí las mejores oportunidades del mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="mailto:inversiones@alvarezbrokers.com">
                  <Mail className="mr-2 h-5 w-5" />
                  inversiones@alvarezbrokers.com
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
