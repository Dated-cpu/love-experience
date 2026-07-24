import { CustomCursor } from "@/components/ui/CustomCursor";
import { ParticleField } from "@/components/ui/ParticleField";
import { GradientBackground } from "@/components/effects/GradientBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { NavigationDots } from "@/components/ui/NavigationDots";
import { BackToTop } from "@/components/ui/BackToTop";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { FinalScene } from "@/components/sections/FinalScene";
import { lazy, Suspense } from "react";

const SurpriseSection = lazy(() =>
  import("@/components/sections/SurpriseSection").then((m) => ({ default: m.SurpriseSection })),
);

export default function Home() {
  return (
    <main className="relative">
      <GradientBackground />
      <ParticleField />
      <ScrollProgress />
      <NavigationDots />
      <BackToTop />
      <CustomCursor />

      <div className="relative z-10">
        <HeroSection />

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/[0.03] to-transparent" />
          <GallerySection />
        </div>

        <SectionDivider />

        <TimelineSection />

        <SectionDivider />

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" />
          <ReasonsSection />
        </div>

        <SectionDivider />

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/[0.03] to-transparent" />
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
              </div>
            }
          >
            <SurpriseSection />
          </Suspense>
        </div>

        <FinalScene />
      </div>

      <footer className="relative z-10 border-t border-white/5 px-4 py-8 text-center">
        <p className="text-xs text-white/30">
          Создано с любовью
        </p>
      </footer>
    </main>
  );
}