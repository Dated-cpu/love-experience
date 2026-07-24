import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { ParticleField } from "@/components/ui/ParticleField";
import { GradientBackground } from "@/components/effects/GradientBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { SurpriseSection } from "@/components/sections/SurpriseSection";
import { FinalScene } from "@/components/sections/FinalScene";

export default function Home() {
  return (
    <main className="relative">
      <GradientBackground />
      <ParticleField />
      <FloatingHearts />
      <CustomCursor />

      <div className="relative z-10">
        <HeroSection />

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent" />
          <GallerySection />
        </div>

        <TimelineSection />

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
          <ReasonsSection />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent" />
          <SurpriseSection />
        </div>

        <FinalScene />
      </div>

      <footer className="relative z-10 border-t border-white/5 px-4 py-8 text-center">
        <p className="text-xs text-white/30">
          Создано с любовью ❤️
        </p>
      </footer>
    </main>
  );
}