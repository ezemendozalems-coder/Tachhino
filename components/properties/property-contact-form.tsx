'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2 } from 'lucide-react'

interface PropertyContactFormProps {
  propertyCode: string
  propertyTitle: string
}

export function PropertyContactForm({ propertyCode, propertyTitle }: PropertyContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </div>
        <h4 className="font-semibold text-foreground mb-2">Consulta enviada</h4>
        <p className="text-sm text-muted-foreground">
          Gracias por tu interés. Nos pondremos en contacto a la brevedad.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium">
          Nombre completo
        </Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Tu nombre"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-sm font-medium">
          Teléfono
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="11 1234-5678"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
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
        <Label htmlFor="message" className="text-sm font-medium">
          Mensaje
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          defaultValue={`Hola, me interesa la propiedad "${propertyTitle}" (${propertyCode}). Me gustaría coordinar una visita.`}
          className="mt-1 resize-none"
        />
      </div>
      <input type="hidden" name="propertyCode" value={propertyCode} />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner className="mr-2" />
            Enviando...
          </>
        ) : (
          'Enviar consulta'
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Al enviar aceptás nuestra política de privacidad.
      </p>
    </form>
  )
}
