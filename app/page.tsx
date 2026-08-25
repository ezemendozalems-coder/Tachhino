import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { HistorySection } from '@/components/home/history-section'
import { ServicesSection } from '@/components/home/services-section'
import { ValuationCTA } from '@/components/home/valuation-cta'
import { ZonesSection } from '@/components/home/zones-section'
import { StatsSection } from '@/components/home/stats-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <HistorySection />
      <ServicesSection />
      <ValuationCTA />
      <ZonesSection />
      <StatsSection />
      <CTASection />
    </>
  )
}
