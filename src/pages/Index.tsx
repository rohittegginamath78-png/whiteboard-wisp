import { Header } from "@/components/Header";
import InteractiveHero from "@/components/ui/hero-section-nexus";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <InteractiveHero />
      <Features />
      <CTA />
    </div>
  );
};

export default Index;
