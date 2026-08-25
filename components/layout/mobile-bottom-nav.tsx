'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/use-favorites'
import { properties } from '@/lib/data'
import { PropertyCard } from '@/components/properties/property-card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

/** Barra inferior mobile: Inicio | Buscar | Favoritos | Contacto. */
export function MobileBottomNav() {
  const pathname = usePathname()
  const { favorites, mounted } = useFavorites()
  const [favoritesOpen, setFavoritesOpen] = useState(false)

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id))

  const items = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: Search, label: 'Buscar', href: '/propiedades' },
    { icon: Phone, label: 'Contacto', href: '/contacto' },
  ]

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border grid grid-cols-4 h-16 pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/"
          className={cn(
            'flex flex-col items-center justify-center gap-1 text-[11px]',
            pathname === '/' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Home className="w-5 h-5" />
          Inicio
        </Link>
        <Link
          href="/propiedades"
          className={cn(
            'flex flex-col items-center justify-center gap-1 text-[11px]',
            pathname.startsWith('/propiedades') ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Search className="w-5 h-5" />
          Buscar
        </Link>
        <button
          onClick={() => setFavoritesOpen(true)}
          className="relative flex flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground"
        >
          <Heart className="w-5 h-5" />
          Favoritos
          {mounted && favorites.length > 0 && (
            <span className="absolute top-1.5 right-[calc(50%-16px)] w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-semibold">
              {favorites.length}
            </span>
          )}
        </button>
        <Link
          href="/contacto"
          className={cn(
            'flex flex-col items-center justify-center gap-1 text-[11px]',
            pathname === '/contacto' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Phone className="w-5 h-5" />
          Contacto
        </Link>
      </nav>

      <Sheet open={favoritesOpen} onOpenChange={setFavoritesOpen}>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Tus favoritos</SheetTitle>
          </SheetHeader>
          {favoriteProperties.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              Todavía no guardaste ninguna propiedad. Tocá el corazón en una propiedad para guardarla acá.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 pb-6">
              {favoriteProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
