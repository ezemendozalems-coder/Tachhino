'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const whatsappNumber = '5491112345678'
const defaultMessage = 'Hola, me contacto desde la web de Alvarez Brokers. Me gustaría recibir información sobre...'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`
    window.open(url, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative animate-fade-in">
          <div className="bg-card shadow-xl rounded-xl p-4 pr-10 max-w-[280px] border border-border">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <p className="text-sm text-foreground font-medium mb-1">
              ¿Necesitás ayuda?
            </p>
            <p className="text-xs text-muted-foreground">
              Chateá con nosotros por WhatsApp y te asesoramos al instante.
            </p>
          </div>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-b border-r border-border transform rotate-45" />
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className={cn(
          'group relative w-14 h-14 rounded-full shadow-lg transition-all duration-300',
          'bg-[#25D366] hover:bg-[#20BD5A] hover:scale-110',
          'flex items-center justify-center',
          'animate-scale-in'
        )}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      </button>
    </div>
  )
}
