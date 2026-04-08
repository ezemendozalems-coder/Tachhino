'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Home,
  FileText,
  TrendingUp,
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

const contactInfo = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Marconi 680, El Palomar, Buenos Aires',
    href: 'https://maps.google.com/?q=Marconi+680+El+Palomar+Buenos+Aires',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+54 11 1234-5678',
    href: 'tel:+5491112345678',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@alvarezbrokers.com.ar',
    href: 'mailto:info@alvarezbrokers.com.ar',
  },
  {
    icon: Clock,
    label: 'Horarios',
    value: 'Lun-Vie 9:00-18:00 | Sáb 9:00-13:00',
    href: null,
  },
]

const quickOptions = [
  {
    icon: Home,
    title: '¿Querés vender?',
    description: 'Comercializamos tu propiedad',
    value: 'vender',
  },
  {
    icon: Search,
    title: '¿Querés comprar?',
    description: 'Encontramos tu hogar ideal',
    value: 'comprar',
  },
  {
    icon: FileText,
    title: '¿Necesitás tasar?',
    description: 'Valuación profesional',
    value: 'tasar',
  },
  {
    icon: TrendingUp,
    title: '¿Buscás invertir?',
    description: 'Oportunidades de inversión',
    value: 'invertir',
  },
]

const reasons = [
  { value: 'vender', label: 'Quiero vender mi propiedad' },
  { value: 'comprar', label: 'Quiero comprar una propiedad' },
  { value: 'alquilar', label: 'Quiero alquilar una propiedad' },
  { value: 'tasar', label: 'Necesito una tasación' },
  { value: 'invertir', label: 'Busco oportunidades de inversión' },
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
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Contacto
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
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
                  'flex flex-col items-center p-6 rounded-2xl border transition-all',
                  'bg-card hover:bg-secondary hover:border-primary/30 hover:shadow-lg',
                  selectedReason === option.value && 'border-primary bg-primary/5'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">
                Información de contacto
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Visitanos en nuestra oficina de El Palomar o contactanos por cualquiera 
                de los siguientes medios. Te responderemos a la brevedad.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      {info.href ? (
                        <a 
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      ¿Preferís WhatsApp?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Chateá con nosotros de forma instantánea
                    </p>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600" asChild>
                    <a 
                      href="https://wa.me/5491112345678?text=Hola, me gustaría recibir información sobre..." 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chatear
                    </a>
                  </Button>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 aspect-video bg-secondary rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Mapa de ubicación</p>
                  <p className="text-sm text-muted-foreground">Marconi 680, El Palomar</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form">
              <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Envianos tu consulta
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Mensaje enviado
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Gracias por contactarnos. Te responderemos a la brevedad.
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Enviar otra consulta
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Tu nombre"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="11 1234-5678"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="tu@email.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reason">Motivo de consulta</Label>
                      <Select value={selectedReason} onValueChange={setSelectedReason}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Seleccionar motivo" />
                        </SelectTrigger>
                        <SelectContent>
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
                        className="mt-1 resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
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
