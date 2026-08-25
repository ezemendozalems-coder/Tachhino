'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TacchinoLogo } from '@/components/brand/tacchino-logo'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const PHONE_NUMBER = '+54 11 4451-0000' // placeholder — reemplazar por el teléfono real

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Propiedades', href: '/propiedades' },
  {
    name: 'Operaciones',
    href: '/propiedades',
    children: [
      { name: 'Comprar', href: '/comprar' },
      { name: 'Alquilar', href: '/alquilar' },
      { name: 'Apto crédito', href: '/apto-credito' },
    ],
  },
  { name: 'Tasaciones', href: '/tasaciones' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Solo el Home (y Tasaciones, que abre con un hero oscuro) tienen contenido
  // oscuro pegado al header como para que el header transparente + texto
  // blanco sea legible antes de scrollear. En el resto de las páginas el
  // header arranca sólido para no perderse sobre fondo claro.
  const hasDarkHeroAtTop = pathname === '/' || pathname === '/tasaciones'
  const isSolid = isScrolled || !hasDarkHeroAtTop

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isSolid
          ? 'bg-[var(--color-cream)]/95 backdrop-blur-lg shadow-sm border-b border-border/60'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <TacchinoLogo theme={isSolid ? 'dark' : 'light'} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200',
                        isSolid
                          ? 'text-foreground hover:bg-secondary'
                          : 'text-white/90 hover:text-white hover:bg-white/10',
                        isActive(item.href) && (isSolid ? 'bg-secondary text-primary' : 'bg-white/15')
                      )}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link href={child.href} className="cursor-pointer">
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200',
                    isSolid
                      ? 'text-foreground hover:bg-secondary'
                      : 'text-white/90 hover:text-white hover:bg-white/10',
                    isActive(item.href) && (isSolid ? 'bg-secondary text-primary' : 'bg-white/15')
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'gap-2 transition-colors duration-300',
                isSolid
                  ? 'text-foreground hover:bg-secondary'
                  : 'text-white hover:bg-white/10 hover:text-white'
              )}
              asChild
            >
              <a href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, '')}`}>
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">{PHONE_NUMBER}</span>
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              asChild
            >
              <Link href="/tasaciones">Solicitar tasación</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'transition-colors duration-300',
                  isSolid
                    ? 'text-foreground hover:bg-secondary'
                    : 'text-white hover:bg-white/10 hover:text-white'
                )}
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <SheetHeader className="p-6 border-b border-border">
                <SheetTitle className="text-left">
                  <TacchinoLogo theme="dark" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6">
                <nav className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    item.children ? (
                      <div key={item.name} className="flex flex-col">
                        <span className="px-4 py-3 text-sm font-medium text-muted-foreground">
                          {item.name}
                        </span>
                        {item.children.map((child) => (
                          <SheetClose asChild key={child.name}>
                            <Link
                              href={child.href}
                              className={cn(
                                'px-6 py-3 text-sm font-medium rounded-sm transition-colors',
                                'hover:bg-secondary',
                                isActive(child.href) && 'bg-secondary text-primary'
                              )}
                            >
                              {child.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    ) : (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            'px-4 py-3 text-sm font-medium rounded-sm transition-colors',
                            'hover:bg-secondary',
                            isActive(item.href) && 'bg-secondary text-primary'
                          )}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    )
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
                  <Button variant="outline" className="w-full justify-start gap-2" asChild>
                    <a href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, '')}`}>
                      <Phone className="w-4 h-4" />
                      {PHONE_NUMBER}
                    </a>
                  </Button>
                  <SheetClose asChild>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/tasaciones">Solicitar tasación</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
