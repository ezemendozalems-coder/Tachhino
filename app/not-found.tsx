"use client"

import { motion } from "framer-motion"
import { Home, Search, ArrowLeft, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8">
            <div className="text-[200px] font-bold text-primary/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Página No Encontrada
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Lo sentimos, la página que buscás no existe o fue movida. 
            Pero no te preocupes, podemos ayudarte a encontrar lo que necesitás.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Volver al Inicio
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/propiedades">
              <Search className="mr-2 h-5 w-5" />
              Buscar Propiedades
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground mb-4">
            ¿Necesitás ayuda? Contactanos:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a 
              href="https://wa.me/5491112345678" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: +54 9 11 1234-5678
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a 
              href="mailto:info@alvarezbrokers.com" 
              className="text-primary hover:underline"
            >
              info@alvarezbrokers.com
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
