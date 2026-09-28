"use client";

import { useEffect, useState, type RefObject } from "react";

import {
  clampProgress,
  getSectionProgress,
} from "@/lib/scroll-animation";

const LERP = 0.18;

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
    let running = true;
    let current = 0;
    let target = 0;

    const readTarget = () => {
      const rect = section.getBoundingClientRect();
      target = getSectionProgress(
        rect.top,
        section.offsetHeight,
        window.innerHeight,
      );
    };

    const tick = () => {
      if (!running) {
        return;
      }

      readTarget();
      const delta = target - current;

      if (Math.abs(delta) < 0.0004) {
        current = target;
      } else {
        current += delta * LERP;
      }

      setProgress(current);
      frame = window.requestAnimationFrame(tick);
    };

    readTarget();
    current = target;
    setProgress(current);
    frame = window.requestAnimationFrame(tick);

    const onScrollOrResize = () => {
      readTarget();
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      running = false;
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  return clampProgress(progress);
}
