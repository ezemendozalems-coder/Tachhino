import { cn } from '@/lib/utils'

interface TacchinoLogoProps {
  /** 'dark' = para fondos claros (texto tinta). 'light' = para fondos oscuros/transparentes (texto blanco). */
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Wordmark provisorio de Tacchino Propiedades.
 * Reemplazar por el isotipo real en cuanto esté disponible el archivo del cliente
 * (public/brand/tacchino-logo.svg) — este componente concentra el único lugar
 * a actualizar en todo el sitio.
 */
export function TacchinoLogo({ theme = 'dark', size = 'md', className }: TacchinoLogoProps) {
  const isLight = theme === 'light'
  const sizes = {
    sm: { mark: 22, title: 'text-base', sub: 'text-[9px]' },
    md: { mark: 28, title: 'text-xl', sub: 'text-[10px]' },
    lg: { mark: 36, title: 'text-2xl sm:text-3xl', sub: 'text-xs' },
  }[size]

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width={sizes.mark}
        height={sizes.mark}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M4 22 L14 10 L20 17 L28 6"
          stroke="var(--color-tacchino-red)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 6 H28 V14"
          stroke="var(--color-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif font-semibold tracking-tight',
            sizes.title,
            isLight ? 'text-white' : 'text-[var(--color-ink)]'
          )}
        >
          Tacchino
        </span>
        <span
          className={cn(
            'uppercase tracking-[0.32em] font-medium mt-0.5',
            sizes.sub,
            isLight ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          Propiedades
        </span>
      </span>
    </span>
  )
}
