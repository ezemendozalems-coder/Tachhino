import { MessageCircle } from 'lucide-react'

interface PropertyStickyMobileCTAProps {
  formattedPrice: string
  isRental: boolean
  whatsappUrl: string
}

export function PropertyStickyMobileCTA({ formattedPrice, isRental, whatsappUrl }: PropertyStickyMobileCTAProps) {
  return (
    <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-4">
      <div>
        <div className="text-lg font-semibold text-foreground leading-none">
          {formattedPrice}
          {isRental && <span className="text-sm text-muted-foreground font-normal">/mes</span>}
        </div>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-sm shrink-0"
      >
        <MessageCircle className="w-4 h-4" />
        Consultar
      </a>
    </div>
  )
}
