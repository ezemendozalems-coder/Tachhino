'use client'

import { Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export function PropertyShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // el usuario canceló el share nativo — no hacemos nada
      }
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      toast.success('Enlace copiado al portapapeles')
    } catch {
      toast.error('No se pudo copiar el enlace')
    }
  }

  return (
    <Button variant="outline" size="icon" className="rounded-full" onClick={handleShare}>
      <Share2 className="w-5 h-5" />
      <span className="sr-only">Compartir</span>
    </Button>
  )
}
