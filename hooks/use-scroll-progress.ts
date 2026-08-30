"use client";

import { useEffect, useState, type RefObject } from "react";

import {
  clampProgress,
  getSectionProgress,
} from "@/lib/scroll-animation";

export function useScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const nextProgress = getSectionProgress(
        rect.top,
        section.offsetHeight,
        window.innerHeight,
      );
      setProgress((current) =>
        current === nextProgress ? current : nextProgress,
      );
    };

    const scheduleUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  return clampProgress(progress);
}
