'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Propiedades', href: '/propiedades' },
  { 
    name: 'Servicios', 
    href: '/servicios',
    children: [
      { name: 'Todos los Servicios', href: '/servicios' },
      { name: 'Tasaciones', href: '/tasaciones' },
      { name: 'Inversiones', href: '/inversiones' },
    ]
  },
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/95 backdrop-blur-lg shadow-lg border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={cn(
              "flex flex-col transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-primary-foreground"
            )}>
              <span className="text-xl font-serif font-bold tracking-tight">
                ALVAREZ
              </span>
              <span className="text-xs tracking-[0.3em] uppercase -mt-1 opacity-80">
                Brokers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        isScrolled
                          ? 'text-foreground hover:bg-secondary'
                          : 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10',
                        isActive(item.href) && (isScrolled ? 'bg-secondary text-primary' : 'bg-primary-foreground/20')
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
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isScrolled
                      ? 'text-foreground hover:bg-secondary'
                      : 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10',
                    isActive(item.href) && (isScrolled ? 'bg-secondary text-primary' : 'bg-primary-foreground/20')
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
                isScrolled
                  ? 'text-foreground hover:bg-secondary'
                  : 'text-primary-foreground hover:bg-primary-foreground/10'
              )}
              asChild
            >
              <a href="tel:+5491112345678">
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">11 1234-5678</span>
              </a>
            </Button>
            <Button
              size="sm"
              className={cn(
                'transition-all duration-300',
                isScrolled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
              )}
              asChild
            >
              <Link href="/tasaciones">Solicitar Tasación</Link>
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
                  isScrolled
                    ? 'text-foreground hover:bg-secondary'
                    : 'text-primary-foreground hover:bg-primary-foreground/10'
                )}
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <SheetHeader className="p-6 border-b border-border">
                <SheetTitle className="text-left">
                  <div className="flex flex-col">
                    <span className="text-xl font-serif font-bold tracking-tight text-primary">
                      ALVAREZ
                    </span>
                    <span className="text-xs tracking-[0.3em] uppercase -mt-1 text-muted-foreground">
                      Brokers
                    </span>
                  </div>
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
                                'px-6 py-3 text-sm font-medium rounded-lg transition-colors',
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
                            'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
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
                    <a href="tel:+5491112345678">
                      <Phone className="w-4 h-4" />
                      11 1234-5678
                    </a>
                  </Button>
                  <SheetClose asChild>
                    <Button className="w-full" asChild>
                      <Link href="/tasaciones">Solicitar Tasación</Link>
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
