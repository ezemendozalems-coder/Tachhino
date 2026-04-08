import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { AboutSection } from '@/components/home/about-section'
import { ServicesSection } from '@/components/home/services-section'
import { StatsSection } from '@/components/home/stats-section'
import { ZonesSection } from '@/components/home/zones-section'
import { ValuationCTA } from '@/components/home/valuation-cta'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <ZonesSection />
      <ValuationCTA />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
