'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function AnimatedYears({ value, isVisible, duration = 1400 }: { value: number; isVisible: boolean; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let startTime: number
    let raf: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * value))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, duration, isVisible])

  return <span>+{count}</span>
}

const items = [
  { kind: 'years' as const, top: 40, bottom: 'Años de experiencia' },
  { kind: 'text' as const, top: 'Venta', bottom: 'y alquiler' },
  { kind: 'text' as const, top: 'Zona Oeste', bottom: 'especialistas locales' },
  { kind: 'text' as const, top: 'Atención', bottom: 'personalizada' },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <div
              key={item.bottom}
              className={cn('text-center', isVisible && 'animate-fade-up')}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="font-serif text-4xl sm:text-5xl text-primary mb-2">
                {item.kind === 'years' ? (
                  <AnimatedYears value={item.top} isVisible={isVisible} />
                ) : (
                  item.top
                )}
              </div>
              <div className="text-muted-foreground text-sm sm:text-base">
                {item.bottom}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
