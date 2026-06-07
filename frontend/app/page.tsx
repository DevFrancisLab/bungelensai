import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import ProblemSection from '@/components/problem-section'
import SolutionSection from '@/components/solution-section'
import FeaturesSection from '@/components/features-section'
import HowItWorksSection from '@/components/how-it-works-section'
import ImpactSection from '@/components/impact-section'
import CTASection from '@/components/cta-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ImpactSection />
      <CTASection />
      <Footer />
    </main>
  )
}
