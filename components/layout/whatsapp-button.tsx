'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Placeholder — reemplazar por el número real de WhatsApp de Tacchino Propiedades.
const WHATSAPP_NUMBER = '5491144510000'

const quickOptions = [
  { label: 'Quiero comprar', message: 'Hola, quiero comprar una propiedad.' },
  { label: 'Busco alquiler', message: 'Hola, estoy buscando una propiedad en alquiler.' },
  { label: 'Quiero vender', message: 'Hola, quiero vender mi propiedad.' },
  { label: 'Necesito una tasación', message: 'Hola, necesito solicitar una tasación.' },
  { label: 'Consultar una propiedad', message: 'Hola, quiero consultar por una propiedad.' },
]

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // La ficha de propiedad ya tiene su propia barra sticky de WhatsApp en
  // mobile — subimos el botón flotante para que no se superpongan.
  const hasMobileStickyCta = /^\/propiedades\/[^/]+$/.test(pathname)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed right-5 lg:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 transition-[bottom] duration-300',
        hasMobileStickyCta ? 'bottom-36' : 'bottom-20'
      )}
    >
      {/* Panel de opciones rápidas */}
      {isOpen && (
        <div className="w-[300px] max-w-[calc(100vw-2.5rem)] bg-[var(--color-ink)] text-white rounded-lg shadow-2xl overflow-hidden animate-scale-in border border-white/10">
          <div className="flex items-start justify-between px-5 py-4 border-b border-white/10">
            <div>
              <p className="font-serif text-lg leading-none">Tacchino</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mt-1">Propiedades</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 -mr-1 -mt-1 hover:bg-white/10 rounded-sm transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>
          <p className="px-5 pt-4 pb-3 text-sm text-white/70">
            Hola. ¿En qué podemos ayudarte?
          </p>
          <div className="px-3 pb-4 flex flex-col gap-1.5">
            {quickOptions.map((option) => (
              <a
                key={option.label}
                href={waLink(option.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-3.5 py-2.5 rounded-sm text-sm text-white/90 hover:bg-primary hover:text-white transition-colors duration-200"
              >
                {option.label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'group relative flex items-center gap-2.5 h-12 rounded-full shadow-lg transition-all duration-300',
          'bg-[var(--color-ink)] hover:bg-primary text-white pl-3 pr-4 sm:pr-5',
          'animate-scale-in'
        )}
        aria-label="Contactar por WhatsApp"
        aria-expanded={isOpen}
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary group-hover:bg-white/15 transition-colors shrink-0">
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </span>
        <span className="hidden sm:flex flex-col items-start leading-none">
          <span className="text-[13px] font-medium">WhatsApp</span>
          <span className="text-[11px] text-white/60 group-hover:text-white/80">Hablemos</span>
        </span>
      </button>
    </div>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.763.463 3.483 1.343 4.997L2 22l5.117-1.334a9.96 9.96 0 0 0 4.887 1.28h.004c5.514 0 9.997-4.483 9.997-9.998 0-2.67-1.04-5.18-2.928-7.067a9.935 9.935 0 0 0-7.073-2.878zm0 18.166h-.003a8.16 8.16 0 0 1-4.158-1.14l-.298-.177-3.037.792.811-2.96-.194-.304a8.153 8.153 0 0 1-1.256-4.38c0-4.508 3.669-8.176 8.178-8.176 2.184 0 4.238.851 5.783 2.397a8.12 8.12 0 0 1 2.393 5.788c0 4.508-3.669 8.16-8.219 8.16z" />
    </svg>
  )
}
