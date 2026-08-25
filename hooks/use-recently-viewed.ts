'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'tacchino-recently-viewed'
const MAX_ITEMS = 6

function readStored(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/** Registro de propiedades vistas recientemente (persistente por navegador). */
export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIds(readStored())
    setMounted(true)
  }, [])

  const addRecentlyViewed = useCallback((id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((existing) => existing !== id)].slice(0, MAX_ITEMS)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // localStorage no disponible
      }
      return next
    })
  }, [])

  return { ids, addRecentlyViewed, mounted }
}
