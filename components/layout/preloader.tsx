'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SESSION_KEY = 'tacchino-preloader-shown'

/**
 * Preloader cinematográfico: una casa se dibuja con líneas (naranja el contorno,
 * rojo el techo), se enciende una luz interior, aparece el wordmark y la casa
 * se transforma en la flecha característica de la marca antes de revelar el Home.
 * Se muestra una vez por sesión de navegador.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<'draw' | 'text' | 'exit'>('draw')

  useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // sessionStorage no disponible — mostramos igual, sin persistir
    }

    if (alreadyShown) return

    setVisible(true)
    document.documentElement.style.overflow = 'hidden'

    const toText = setTimeout(() => setPhase('text'), 900)
    const toExit = setTimeout(() => setPhase('exit'), 1900)
    const toHide = setTimeout(() => {
      setVisible(false)
      document.documentElement.style.overflow = ''
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // ignorar
      }
    }, 2500)

    return () => {
      clearTimeout(toText)
      clearTimeout(toExit)
      clearTimeout(toHide)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-ink)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            animate={phase === 'exit' ? { y: -6, opacity: 0.35 } : {}}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Contorno de la casa — naranja/dorado */}
            <motion.path
              d="M20 62 L60 28 L100 62 L100 96 L20 96 Z"
              stroke="var(--color-gold)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
            {/* Techo — rojo Tacchino */}
            <motion.path
              d="M12 68 L60 24 L108 68"
              stroke="var(--color-tacchino-red)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.55 }}
            />
            {/* Puerta */}
            <motion.path
              d="M52 96 V74 H68 V96"
              stroke="var(--color-gold)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: 'easeInOut', delay: 1.0 }}
            />
            {/* Luz interior que se enciende */}
            <motion.circle
              cx="60"
              cy="84"
              r="3"
              fill="var(--color-gold)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 0.7, 1], scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />
          </motion.svg>

          <AnimatePresence>
            {phase !== 'draw' && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.4 } }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-serif text-white text-xl sm:text-2xl tracking-tight leading-none">
                  Tacchino
                </p>
                <p className="text-white/60 text-[11px] tracking-[0.35em] uppercase mt-1">
                  Propiedades
                </p>
                <p className="text-white/40 text-xs mt-4 tracking-wide">
                  Desde hace más de 40 años, encontrando tu lugar.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
