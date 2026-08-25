'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'tacchino-favorites'

function readStoredFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/**
 * Favoritos persistentes en localStorage (por dispositivo/navegador).
 * `mounted` evita mismatches de hidratación: hasta que sea true, se asume
 * que nada está marcado como favorito.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setFavorites(readStoredFavorites())
    setMounted(true)
  }, [])

  const persist = useCallback((next: string[]) => {
    setFavorites(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // localStorage no disponible — el estado sigue funcionando en memoria
    }
  }, [])

  const isFavorite = useCallback(
    (id: string) => mounted && favorites.includes(id),
    [favorites, mounted]
  )

  const toggleFavorite = useCallback(
    (id: string) => {
      persist(
        favorites.includes(id)
          ? favorites.filter((f) => f !== id)
          : [...favorites, id]
      )
    },
    [favorites, persist]
  )

  return { favorites, isFavorite, toggleFavorite, mounted }
}
