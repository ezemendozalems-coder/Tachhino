'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/use-favorites'

export function PropertyFavoriteButton({ propertyId }: { propertyId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(propertyId)

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => toggleFavorite(propertyId)}
      aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
    >
      <Heart className={cn('w-5 h-5 transition-colors', favorite && 'fill-primary text-primary')} />
    </Button>
  )
}
