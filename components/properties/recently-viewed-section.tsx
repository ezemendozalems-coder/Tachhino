'use client'

import { useRecentlyViewed } from '@/hooks/use-recently-viewed'
import { properties } from '@/lib/data'
import { PropertyCard } from '@/components/properties/property-card'

/** Sección "Vistos recientemente" — solo se muestra si hay historial en este navegador. */
export function RecentlyViewedSection({ excludeId }: { excludeId: string }) {
  const { ids, mounted } = useRecentlyViewed()

  if (!mounted) return null

  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3)

  if (items.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl text-foreground mb-8">
        Vistos recientemente
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  )
}
