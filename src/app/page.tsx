import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustStrip from '@/components/TrustStrip';
import ProblemSection from '@/components/ProblemSection';
import BeforeAfterDemo from '@/components/BeforeAfterDemo';
import HowItWorks from '@/components/HowItWorks';
import ProductPreview from '@/components/ProductPreview';
import UseCases from '@/components/UseCases';
import LanguageSection from '@/components/LanguageSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingPreview from '@/components/PricingPreview';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import VelocityMarquee from '@/components/VelocityMarquee';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <VelocityMarquee text="HINGLISH CAPTIONS · MADE FOR SHORTS · EDIT LESS, POST MORE" />
        <ProblemSection />
        <BeforeAfterDemo />
        <HowItWorks />
        <ProductPreview />
        <UseCases />
        <LanguageSection />
        <FeaturesSection />
        <VelocityMarquee text="JOIN EARLY ACCESS · SHAPE THE FIRST VERSION · FREE FOR CREATORS" baseSpeed={-40} />
        <PricingPreview />
        <EarlyAccessForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
