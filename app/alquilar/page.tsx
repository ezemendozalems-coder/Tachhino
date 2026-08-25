import type { Metadata } from 'next'
import { PropertiesExplorer } from '@/components/properties/properties-explorer'

export const metadata: Metadata = {
  title: 'Alquilar propiedades',
  description: 'Propiedades en alquiler en Ciudad Jardín, El Palomar y Zona Oeste. Propiedades seleccionadas y acompañamiento durante todo el proceso.',
}

export default function AlquilarPage() {
  return (
    <div className="min-h-screen bg-background pt-28 sm:pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">
            Alquilar
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
            Propiedades seleccionadas para alquilar
          </h1>
          <p className="text-muted-foreground">
            Acompañamiento durante todo el proceso, en Ciudad Jardín, El Palomar y Zona Oeste.
          </p>
        </div>

        <PropertiesExplorer lockOperation="alquiler" />
      </div>
    </div>
  )
}
