/*index.tsx*/
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import PortfolioPreview from '@/components/PortfolioPreview';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesOverview />
      <PortfolioPreview />
      <TestimonialsSlider />
      <Footer />
    </div>
  );
};

export default Index;
