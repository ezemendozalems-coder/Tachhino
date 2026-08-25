import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram } from 'lucide-react'
import { TacchinoLogo } from '@/components/brand/tacchino-logo'

// Placeholders — reemplazar por los datos reales de contacto de Tacchino Propiedades.
const PHONE_NUMBER = '+54 11 4451-0000'
const EMAIL = 'info@tacchinopropiedades.com.ar'
const INSTAGRAM_HANDLE = '@tacchinopropiedades'
const INSTAGRAM_URL = 'https://instagram.com/tacchinopropiedades'
const WHATSAPP_URL = 'https://wa.me/5491144510000'

const footerLinks = {
  propiedades: [
    { name: 'Comprar', href: '/comprar' },
    { name: 'Alquilar', href: '/alquilar' },
    { name: 'Apto crédito', href: '/apto-credito' },
    { name: 'Propiedades destacadas', href: '/propiedades?destacadas=true' },
  ],
  servicios: [
    { name: 'Tasaciones', href: '/tasaciones' },
    { name: 'Venta', href: '/servicios#venta' },
    { name: 'Alquiler', href: '/servicios#alquiler' },
    { name: 'Asesoramiento', href: '/servicios#asesoramiento' },
  ],
  zonas: [
    { name: 'Ciudad Jardín', href: '/propiedades?zona=ciudad-jardin' },
    { name: 'El Palomar', href: '/propiedades?zona=el-palomar' },
    { name: 'Caseros', href: '/propiedades?zona=caseros' },
    { name: 'Villa Bosch', href: '/propiedades?zona=villa-bosch' },
    { name: 'Zona Oeste', href: '/propiedades' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <TacchinoLogo theme="light" size="lg" />
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm">
              Tacchino Propiedades — más de 40 años de experiencia en el rubro
              inmobiliario. Venta, alquiler, tasaciones y asesoramiento en
              Ciudad Jardín, El Palomar y Zona Oeste.
            </p>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-white/10 hover:bg-primary
                         flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Propiedades Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              Propiedades
            </h3>
            <ul className="space-y-3">
              {footerLinks.propiedades.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white
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
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              Servicios
            </h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white
                             transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zonas + Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              Zonas
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.zonas.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white
                             transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-4 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            WhatsApp: {PHONE_NUMBER}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            {EMAIL}
          </a>
          <div className="flex items-center gap-3 text-white/70 text-sm">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            Zona Oeste, Buenos Aires
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Tacchino Propiedades — Más de 40 años de experiencia en el rubro inmobiliario.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacidad"
                className="text-white/50 hover:text-white
                         transition-colors duration-200 text-sm"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-white/50 hover:text-white
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
