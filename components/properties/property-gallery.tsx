'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { Property } from '@/lib/types'

interface PropertyGalleryProps {
  property: Property
}

// Use placeholder images for demo
const galleryImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
]

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const images = galleryImages

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-secondary">
        {/* Main Image */}
        <div className="relative aspect-[16/10]">
          <Image
            src={images[currentIndex]}
            alt={`${property.title} - Imagen ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          
          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/90 backdrop-blur-sm shadow-lg"
            onClick={prevImage}
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/90 backdrop-blur-sm shadow-lg"
            onClick={nextImage}
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Fullscreen Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-card/90 backdrop-blur-sm shadow-lg"
            onClick={() => setIsFullscreen(true)}
            aria-label="Ver en pantalla completa"
          >
            <Expand className="w-5 h-5" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-foreground shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-3 bg-card border-t border-border">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'relative flex-1 aspect-video rounded-lg overflow-hidden',
                'ring-2 ring-offset-2 ring-offset-card transition-all',
                index === currentIndex ? 'ring-primary' : 'ring-transparent hover:ring-border'
              )}
            >
              <Image
                src={image}
                alt={`${property.title} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-0">
          <DialogTitle className="sr-only">Galería de imágenes - {property.title}</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[currentIndex]}
              alt={`${property.title} - Imagen ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
            
            {/* Navigation */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
              onClick={nextImage}
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-foreground">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-card/80 backdrop-blur-sm rounded-xl">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'relative w-16 h-12 rounded-lg overflow-hidden',
                    'ring-2 ring-offset-1 ring-offset-card transition-all',
                    index === currentIndex ? 'ring-primary' : 'ring-transparent hover:ring-border'
                  )}
                >
                  <Image
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
