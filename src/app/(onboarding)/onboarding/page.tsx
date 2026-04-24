"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { SlidePerfil } from "@/components/onboarding/slide-perfil";
import { SlideEcossistema } from "@/components/onboarding/slide-ecossistema";
import { SlideLiga } from "@/components/onboarding/slide-ligas";

const slides = [SlidePerfil, SlideEcossistema, SlideLiga];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const isLast = current === slides.length - 1;
  const SlideComponent = slides[current];

  function handleNext() {
    if (isLast) {
      router.push("/completar-perfil");
    } else {
      setCurrent((prev) => prev + 1);
    }
  }

  function handleSkip() {
    router.push("/completar-perfil");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      {/* Logo */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary text-xl font-bold text-white">
          S
        </div>
        <p className="text-sm text-placeholder">Rede social de quem constroi junto</p>
      </div>

      {/* Slide content */}
      <SlideComponent />

      {/* Controls */}
      <div className="flex flex-col items-center gap-3.5">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-[3px] transition-all ${
                i === current
                  ? "h-1.5 w-6 bg-primary"
                  : "h-1.5 w-1.5 bg-placeholder/50"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <Button onClick={handleNext} size="lg" className="w-[340px]">
          {isLast ? "Comecar" : "Proximo"}
        </Button>
        <button
          onClick={handleSkip}
          className="text-sm text-placeholder hover:text-body transition-colors"
        >
          Pular
        </button>
      </div>
    </div>
  );
}
