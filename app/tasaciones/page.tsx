'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Building2,
  Warehouse,
  MapPinned,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  ShieldCheck,
  Users,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { neighborhoods } from '@/lib/data'

// Placeholder — reemplazar por los datos reales de contacto de Tacchino Propiedades.
const WHATSAPP_NUMBER = '5491144510000'

const propertyTypeOptions = [
  { value: 'casa', label: 'Casa / Chalet', icon: Home },
  { value: 'departamento', label: 'Departamento', icon: Building2 },
  { value: 'duplex', label: 'Dúplex / PH', icon: Warehouse },
  { value: 'lote', label: 'Lote / Terreno', icon: MapPinned },
]

const steps = ['Tipo de propiedad', 'Ubicación', 'Características', 'Datos de contacto']

interface FormData {
  tipoPropiedad: string
  direccion: string
  barrio: string
  superficie: string
  ambientes: string
  antiguedad: string
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

const initialFormData: FormData = {
  tipoPropiedad: '',
  direccion: '',
  barrio: '',
  superficie: '',
  ambientes: '',
  antiguedad: '',
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
}

export default function TasacionesPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const canAdvance = () => {
    if (step === 0) return formData.tipoPropiedad !== ''
    if (step === 1) return formData.direccion.trim() !== '' && formData.barrio !== ''
    if (step === 2) return true
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const whatsappMessage = `Hola, solicito una tasación:\n\nTipo: ${formData.tipoPropiedad}\nDirección: ${formData.direccion}\nBarrio: ${formData.barrio}\nSuperficie: ${formData.superficie ? formData.superficie + ' m²' : '-'}\nAmbientes: ${formData.ambientes || '-'}\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\n\n${formData.mensaje}`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[var(--color-ink)] overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 bg-white/10 text-white/80 rounded-sm text-xs uppercase tracking-wider mb-6">
            Tasación profesional
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-5 text-balance leading-[1.1]">
            ¿Querés saber cuánto vale tu propiedad?
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            Solicitá una tasación profesional. Un asesor de Tacchino analizará tu
            propiedad con datos reales del mercado de Zona Oeste.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-card rounded-lg border border-border/60 shadow-lg p-6 sm:p-10">
            {isSubmitted ? (
              <ThankYou whatsappUrl={whatsappUrl} />
            ) : (
              <>
                {/* Progress */}
                <div className="flex items-center justify-between mb-10">
                  {steps.map((label, index) => (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                            index <= step ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                          )}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <span className="hidden sm:block text-[11px] text-muted-foreground text-center max-w-[80px] leading-tight">
                          {label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={cn('flex-1 h-px mx-2', index < step ? 'bg-primary' : 'bg-border')} />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      {step === 0 && (
                        <div>
                          <h2 className="text-lg font-medium text-foreground mb-6">Tipo de propiedad</h2>
                          <div className="grid grid-cols-2 gap-3">
                            {propertyTypeOptions.map((option) => (
                              <button
                                type="button"
                                key={option.value}
                                onClick={() => update('tipoPropiedad', option.value)}
                                className={cn(
                                  'flex flex-col items-center gap-2 p-5 rounded-sm border text-sm font-medium transition-colors',
                                  formData.tipoPropiedad === option.value
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border hover:border-primary/40 text-foreground'
                                )}
                              >
                                <option.icon className="w-6 h-6" />
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="space-y-5">
                          <h2 className="text-lg font-medium text-foreground mb-2">Ubicación</h2>
                          <div>
                            <Label htmlFor="direccion">Dirección de la propiedad</Label>
                            <Input
                              id="direccion"
                              value={formData.direccion}
                              onChange={(e) => update('direccion', e.target.value)}
                              placeholder="Ej: De las Violetas 6159"
                              className="mt-1.5 rounded-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="barrio">Barrio / Zona</Label>
                            <Select value={formData.barrio} onValueChange={(v) => update('barrio', v)}>
                              <SelectTrigger className="mt-1.5 rounded-sm">
                                <SelectValue placeholder="Seleccionar zona" />
                              </SelectTrigger>
                              <SelectContent className="rounded-sm">
                                {neighborhoods.map((n) => (
                                  <SelectItem key={n.value} value={n.label}>
                                    {n.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-5">
                          <h2 className="text-lg font-medium text-foreground mb-2">Características</h2>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="superficie">Superficie aprox. (m²)</Label>
                              <Input
                                id="superficie"
                                type="number"
                                value={formData.superficie}
                                onChange={(e) => update('superficie', e.target.value)}
                                placeholder="150"
                                className="mt-1.5 rounded-sm"
                              />
                            </div>
                            <div>
                              <Label htmlFor="ambientes">Ambientes</Label>
                              <Input
                                id="ambientes"
                                type="number"
                                value={formData.ambientes}
                                onChange={(e) => update('ambientes', e.target.value)}
                                placeholder="4"
                                className="mt-1.5 rounded-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="antiguedad">Antigüedad aproximada</Label>
                            <Input
                              id="antiguedad"
                              value={formData.antiguedad}
                              onChange={(e) => update('antiguedad', e.target.value)}
                              placeholder="Ej: a estrenar, 10 años, a reciclar..."
                              className="mt-1.5 rounded-sm"
                            />
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-5">
                          <h2 className="text-lg font-medium text-foreground mb-2">Datos de contacto</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="nombre">Nombre completo</Label>
                              <Input
                                id="nombre"
                                required
                                value={formData.nombre}
                                onChange={(e) => update('nombre', e.target.value)}
                                placeholder="Tu nombre"
                                className="mt-1.5 rounded-sm"
                              />
                            </div>
                            <div>
                              <Label htmlFor="telefono">Teléfono</Label>
                              <Input
                                id="telefono"
                                type="tel"
                                required
                                value={formData.telefono}
                                onChange={(e) => update('telefono', e.target.value)}
                                placeholder="11 1234-5678"
                                className="mt-1.5 rounded-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => update('email', e.target.value)}
                              placeholder="tu@email.com"
                              className="mt-1.5 rounded-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="mensaje">Información adicional (opcional)</Label>
                            <Textarea
                              id="mensaje"
                              rows={3}
                              value={formData.mensaje}
                              onChange={(e) => update('mensaje', e.target.value)}
                              placeholder="Contanos algo más sobre tu propiedad..."
                              className="mt-1.5 resize-none rounded-sm"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-10">
                    <Button
                      type="button"
                      variant="ghost"
                      className="gap-2 rounded-sm"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Atrás
                    </Button>

                    {step < steps.length - 1 ? (
                      <Button
                        type="button"
                        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm"
                        onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                        disabled={!canAdvance()}
                      >
                        Siguiente
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner />
                            Enviando...
                          </>
                        ) : (
                          'Solicitar tasación'
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      {!isSubmitted && (
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm text-muted-foreground">Confidencialidad garantizada</p>
              </div>
              <div>
                <Users className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm text-muted-foreground">Atención personalizada</p>
              </div>
              <div>
                <Home className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm text-muted-foreground">Más de 40 años de experiencia</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
            ¿Preferís hablar con un asesor?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Nuestro equipo está disponible para responder tus consultas sobre tasaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm" asChild>
              <a href="https://wa.me/5491144510000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" className="gap-2 rounded-sm" asChild>
              <Link href="/contacto">
                <Phone className="w-4 h-4" />
                Ir a contacto
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function ThankYou({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <div className="py-8 text-center">
      <motion.svg
        width="88"
        height="88"
        viewBox="0 0 88 88"
        fill="none"
        className="mx-auto mb-6"
      >
        <motion.path
          d="M14 46 L44 20 L74 46 L74 72 L14 72 Z"
          stroke="var(--color-tacchino-red)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M32 52 L41 61 L58 42"
          stroke="var(--color-gold)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeInOut' }}
        />
      </motion.svg>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <h2 className="font-serif text-2xl text-foreground mb-3">Gracias.</h2>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Un asesor de Tacchino se pondrá en contacto con vos.
        </p>
        <Button variant="outline" className="gap-2 rounded-sm" asChild>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Continuar por WhatsApp
          </a>
        </Button>
      </motion.div>
    </div>
  )
}
