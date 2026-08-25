import type { Metadata } from 'next'
import { PropertiesExplorer } from '@/components/properties/properties-explorer'

export const metadata: Metadata = {
  title: 'Propiedades aptas para crédito',
  description: 'Propiedades compatibles con financiación bancaria en Ciudad Jardín, El Palomar y Zona Oeste.',
}

export default function AptoCreditoPage() {
  return (
    <div className="min-h-screen bg-background pt-28 sm:pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-primary uppercase tracking-wider mb-3 px-2.5 py-1 rounded-sm">
            ✓ Apto crédito
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
            Propiedades compatibles con financiación bancaria
          </h1>
          <p className="text-muted-foreground">
            Encontrá propiedades aptas para crédito hipotecario en Ciudad Jardín, El Palomar y Zona Oeste.
          </p>
        </div>

        <PropertiesExplorer lockCreditReady />
      </div>
    </div>
  )
}
