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

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const images = property.images.length > 0 ? property.images : ['/placeholder.jpg']

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      {/* Galería editorial */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-lg overflow-hidden">
        {/* Foto principal grande */}
        <button
          onClick={() => {
            setCurrentIndex(0)
            setIsFullscreen(true)
          }}
          className="relative col-span-4 sm:col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto"
        >
          <Image
            src={images[0]}
            alt={`${property.title} - Foto principal`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </button>

        {/* 4 fotos secundarias */}
        {images.slice(1, 5).map((image, i) => (
          <button
            key={image + i}
            onClick={() => {
              setCurrentIndex(i + 1)
              setIsFullscreen(true)
            }}
            className="relative hidden sm:block aspect-square"
          >
            <Image
              src={image}
              alt={`${property.title} - Foto ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white text-sm font-medium">
                +{images.length - 5} fotos
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-muted-foreground">
          {pad(1)} / {pad(images.length)}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-sm"
          onClick={() => {
            setCurrentIndex(0)
            setIsFullscreen(true)
          }}
        >
          <Expand className="w-4 h-4" />
          Ver todas las fotos
        </Button>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-full w-full h-screen sm:h-[90vh] p-0 bg-black border-0 sm:rounded-none">
          <DialogTitle className="sr-only">Galería de imágenes - {property.title}</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[currentIndex]}
              alt={`${property.title} - Imagen ${currentIndex + 1}`}
              fill
              className="object-contain"
            />

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

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white tracking-wider">
              {pad(currentIndex + 1)} / {pad(images.length)}
            </div>

            <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-lg max-w-[90vw] overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'relative w-16 h-12 shrink-0 rounded-sm overflow-hidden',
                    'ring-2 ring-offset-1 ring-offset-black transition-all',
                    index === currentIndex ? 'ring-primary' : 'ring-transparent hover:ring-white/40'
                  )}
                >
                  <Image src={image} alt={`Miniatura ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
