'use client'

import { useEffect } from 'react'
import { useRecentlyViewed } from '@/hooks/use-recently-viewed'

/** Registra silenciosamente la propiedad actual como "vista recientemente". */
export function RecentlyViewedTracker({ propertyId }: { propertyId: string }) {
  const { addRecentlyViewed } = useRecentlyViewed()

  useEffect(() => {
    addRecentlyViewed(propertyId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId])

  return null
}
