import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import CalculatorSection from "@/components/CalculatorSection";
import PositioningSection from "@/components/PositioningSection";
import VideoBookingSection from "@/components/VideoBookingSection";

const Index = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection onCTAClick={() => scrollTo(calculatorRef)} />
      <div ref={calculatorRef}>
        <CalculatorSection onComplete={() => scrollTo(positioningRef)} />
      </div>
      <div ref={positioningRef}>
        <PositioningSection />
      </div>
      <VideoBookingSection />
    </div>
  );
};

export default Index;
