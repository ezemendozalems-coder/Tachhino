'use client'

import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Home,
  FileText,
  Key,
  Search,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

// Placeholders — reemplazar por los datos reales de contacto de Tacchino Propiedades.
const PHONE_NUMBER = '+54 11 4451-0000'
const EMAIL = 'info@tacchinopropiedades.com.ar'
const WHATSAPP_URL = 'https://wa.me/5491144510000?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre...'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Zona de atención',
    value: 'Ciudad Jardín, El Palomar y Zona Oeste, Buenos Aires',
    href: null,
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER.replace(/[^+\d]/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Clock,
    label: 'Horarios',
    value: 'Lun-Vie 9:00-18:00 | Sáb 9:00-13:00',
    href: null,
  },
]

const quickOptions = [
  { icon: Home, title: '¿Querés vender?', description: 'Comercializamos tu propiedad', value: 'vender' },
  { icon: Search, title: '¿Querés comprar?', description: 'Encontramos tu hogar ideal', value: 'comprar' },
  { icon: Key, title: '¿Buscás alquilar?', description: 'Propiedades seleccionadas', value: 'alquilar' },
  { icon: FileText, title: '¿Necesitás tasar?', description: 'Valuación profesional', value: 'tasar' },
]

const reasons = [
  { value: 'vender', label: 'Quiero vender mi propiedad' },
  { value: 'comprar', label: 'Quiero comprar una propiedad' },
  { value: 'alquilar', label: 'Quiero alquilar una propiedad' },
  { value: 'tasar', label: 'Necesito una tasación' },
  { value: 'otro', label: 'Otro motivo' },
]

export default function ContactPage() {
  const [selectedReason, setSelectedReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleQuickOption = (value: string) => {
    setSelectedReason(value)
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
              Contacto
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 text-balance">
              Estamos para ayudarte
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cualquier consulta que tengas, nuestro equipo está disponible
              para brindarte el mejor asesoramiento inmobiliario.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Options */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuickOption(option.value)}
                className={cn(
                  'flex flex-col items-center p-6 rounded-lg border transition-all text-center',
                  'bg-card hover:border-primary/40 hover:shadow-lg',
                  selectedReason === option.value ? 'border-primary bg-primary/5' : 'border-border/60'
                )}
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-3">
                  <option.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-foreground mb-1">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6">
                Información de contacto
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Contactanos por cualquiera de los siguientes medios. Te
                responderemos a la brevedad.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-foreground font-medium">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-[var(--color-ink)] rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">
                      ¿Preferís WhatsApp?
                    </h3>
                    <p className="text-sm text-white/60">
                      Chateá con nosotros de forma instantánea
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-sm" asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Chatear
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form">
              <div className="bg-card rounded-lg border border-border/60 p-8 shadow-sm">
                <h2 className="font-serif text-2xl text-foreground mb-6">
                  Envianos tu consulta
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground mb-2">
                      Mensaje enviado
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Gracias por contactarnos. Te responderemos a la brevedad.
                    </p>
                    <Button variant="outline" className="rounded-sm" onClick={() => setIsSubmitted(false)}>
                      Enviar otra consulta
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" name="name" required placeholder="Tu nombre" className="mt-1 rounded-sm" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" name="phone" type="tel" required placeholder="11 1234-5678" className="mt-1 rounded-sm" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required placeholder="tu@email.com" className="mt-1 rounded-sm" />
                    </div>

                    <div>
                      <Label htmlFor="reason">Motivo de consulta</Label>
                      <Select value={selectedReason} onValueChange={setSelectedReason}>
                        <SelectTrigger className="mt-1 rounded-sm">
                          <SelectValue placeholder="Seleccionar motivo" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm">
                          {reasons.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Contanos en qué podemos ayudarte..."
                        className="mt-1 resize-none rounded-sm"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Spinner className="mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Al enviar aceptás nuestra política de privacidad y términos de uso.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
