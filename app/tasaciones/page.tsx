"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, FileText, TrendingUp, Clock, CheckCircle, Building2, Home, MapPin, Phone, Mail, ArrowRight, Shield, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const benefits = [
  {
    icon: Calculator,
    title: "Valuación Precisa",
    description: "Análisis detallado del mercado y comparativas actualizadas para determinar el valor real de tu propiedad."
  },
  {
    icon: FileText,
    title: "Informe Profesional",
    description: "Documentación completa con respaldo técnico para uso legal, bancario o comercial."
  },
  {
    icon: TrendingUp,
    title: "Análisis de Mercado",
    description: "Estudio de tendencias y proyecciones del mercado inmobiliario en tu zona."
  },
  {
    icon: Clock,
    title: "Entrega Rápida",
    description: "Recibí tu tasación en 48-72 horas hábiles con toda la información necesaria."
  }
]

const process = [
  {
    step: "01",
    title: "Solicitud",
    description: "Completá el formulario con los datos de tu propiedad."
  },
  {
    step: "02",
    title: "Visita",
    description: "Coordinamos una visita para inspeccionar el inmueble."
  },
  {
    step: "03",
    title: "Análisis",
    description: "Evaluamos comparativas y condiciones del mercado."
  },
  {
    step: "04",
    title: "Informe",
    description: "Entregamos el informe de tasación completo."
  }
]

const stats = [
  { value: "+2,500", label: "Tasaciones realizadas" },
  { value: "48hs", label: "Tiempo de entrega" },
  { value: "15+", label: "Años de experiencia" },
  { value: "100%", label: "Clientes satisfechos" }
]

export default function TasacionesPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoPropiedad: "",
    direccion: "",
    barrio: "",
    superficie: "",
    mensaje: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Hola, solicito una tasación:\n\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nTipo: ${formData.tipoPropiedad}\nDirección: ${formData.direccion}\nBarrio: ${formData.barrio}\nSuperficie: ${formData.superficie}m²\n\nMensaje: ${formData.mensaje}`
    window.open(`https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
              Servicio Profesional
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Tasaciones <span className="text-accent">Inmobiliarias</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Conocé el valor real de tu propiedad con nuestro servicio de tasación profesional. 
              Más de 15 años de experiencia en el mercado inmobiliario de Zona Oeste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Calculator className="mr-2 h-5 w-5" />
                Solicitar Tasación
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/contacto">
                  Consultar Ahora
                </Link>
              </Button>
            </div>
          </motion.div>
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

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por Qué Elegirnos
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestras tasaciones combinan experiencia, tecnología y conocimiento profundo del mercado local.
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
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
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
              Proceso de Tasación
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un proceso simple y transparente para obtener la valuación de tu propiedad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < process.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Solicitá Tu Tasación <span className="text-primary">Gratuita</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Completá el formulario y nos pondremos en contacto dentro de las próximas 24 horas para coordinar la visita.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Confidencialidad Garantizada</h3>
                    <p className="text-muted-foreground">Tus datos están protegidos y son tratados con absoluta reserva.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Tasadores Certificados</h3>
                    <p className="text-muted-foreground">Nuestro equipo cuenta con las certificaciones profesionales necesarias.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Atención Personalizada</h3>
                    <p className="text-muted-foreground">Un asesor dedicado te acompañará durante todo el proceso.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="juan@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="11 1234-5678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipoPropiedad">Tipo de propiedad *</Label>
                    <Select
                      value={formData.tipoPropiedad}
                      onValueChange={(value) => setFormData({ ...formData, tipoPropiedad: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="departamento">Departamento</SelectItem>
                        <SelectItem value="ph">PH</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                        <SelectItem value="local">Local Comercial</SelectItem>
                        <SelectItem value="oficina">Oficina</SelectItem>
                        <SelectItem value="galpon">Galpón</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="direccion">Dirección de la propiedad *</Label>
                    <Input
                      id="direccion"
                      required
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      placeholder="Av. Ejemplo 1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barrio">Barrio / Localidad *</Label>
                    <Input
                      id="barrio"
                      required
                      value={formData.barrio}
                      onChange={(e) => setFormData({ ...formData, barrio: e.target.value })}
                      placeholder="El Palomar"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="superficie">Superficie aproximada (m²)</Label>
                    <Input
                      id="superficie"
                      type="number"
                      value={formData.superficie}
                      onChange={(e) => setFormData({ ...formData, superficie: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="mensaje">Información adicional</Label>
                    <Textarea
                      id="mensaje"
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Contanos más sobre tu propiedad..."
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full mt-6">
                  Solicitar Tasación Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </motion.div>
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
              ¿Preferís hablar con un asesor?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está disponible para responder todas tus consultas sobre tasaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="mailto:tasaciones@alvarezbrokers.com">
                  <Mail className="mr-2 h-5 w-5" />
                  tasaciones@alvarezbrokers.com
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
