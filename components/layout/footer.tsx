import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerLinks = {
  propiedades: [
    { name: 'Casas en Venta', href: '/propiedades?operacion=venta&tipo=casa' },
    { name: 'Departamentos en Venta', href: '/propiedades?operacion=venta&tipo=departamento' },
    { name: 'Alquileres', href: '/propiedades?operacion=alquiler' },
    { name: 'Lotes', href: '/propiedades?operacion=venta&tipo=lote' },
    { name: 'Propiedades Destacadas', href: '/propiedades?destacadas=true' },
  ],
  servicios: [
    { name: 'Venta de Inmuebles', href: '/servicios#venta' },
    { name: 'Alquileres', href: '/servicios#alquiler' },
    { name: 'Tasaciones', href: '/tasaciones' },
    { name: 'Asesoramiento Legal', href: '/servicios#legal' },
    { name: 'Inversiones', href: '/inversiones' },
  ],
  empresa: [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Zonas de Trabajo', href: '/nosotros#zonas' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight">
                  ALVAREZ
                </span>
                <span className="text-xs tracking-[0.3em] uppercase -mt-1 opacity-80">
                  Brokers
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-sm">
              J. I. Alvarez Brokers Inmobiliarios. Más de 25 años de experiencia 
              en el mercado inmobiliario de Zona Oeste. Especialistas en 
              comercialización, tasaciones y asesoramiento legal.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 
                           flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Propiedades Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Propiedades
            </h3>
            <ul className="space-y-3">
              {footerLinks.propiedades.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground 
                             transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Servicios
            </h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground 
                             transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-primary-foreground/70" />
                <span className="text-primary-foreground/80 text-sm">
                  Marconi 680, El Palomar,<br />Buenos Aires
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 shrink-0 text-primary-foreground/70" />
                <a
                  href="tel:+5491112345678"
                  className="text-primary-foreground/80 hover:text-primary-foreground 
                           transition-colors duration-200 text-sm"
                >
                  +54 11 1234-5678
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 shrink-0 text-primary-foreground/70" />
                <a
                  href="mailto:info@alvarezbrokers.com.ar"
                  className="text-primary-foreground/80 hover:text-primary-foreground 
                           transition-colors duration-200 text-sm"
                >
                  info@alvarezbrokers.com.ar
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 shrink-0 text-primary-foreground/70" />
                <span className="text-primary-foreground/80 text-sm">
                  Lun - Vie: 9:00 - 18:00<br />
                  Sáb: 9:00 - 13:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              {new Date().getFullYear()} J. I. Alvarez Brokers Inmobiliarios. 
              Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacidad"
                className="text-primary-foreground/60 hover:text-primary-foreground 
                         transition-colors duration-200 text-sm"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-primary-foreground/60 hover:text-primary-foreground 
                         transition-colors duration-200 text-sm"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
