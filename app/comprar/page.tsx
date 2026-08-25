import type { Metadata } from 'next'
import { PropertiesExplorer } from '@/components/properties/properties-explorer'

export const metadata: Metadata = {
  title: 'Comprar propiedades',
  description: 'Propiedades en venta en Ciudad Jardín, El Palomar y Zona Oeste. Encontrá la propiedad indicada para vos.',
}

export default function ComprarPage() {
  return (
    <div className="min-h-screen bg-background pt-28 sm:pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">
            Comprar
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
            Encontrá la propiedad indicada para vos
          </h1>
          <p className="text-muted-foreground">
            Propiedades en venta en Ciudad Jardín, El Palomar y Zona Oeste.
          </p>
        </div>

        <PropertiesExplorer lockOperation="venta" />
      </div>
    </div>
  )
}
