"use client";

import Image from "next/image";
import { useRef } from "react";

import { PhoneMockup, phoneDimensions } from "@/components/phone-mockup";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { comparisonContent } from "@/lib/comparison-content";
import {
  getActiveScreen,
  getAfterCopyOpacity,
  getBeforeCopyOpacity,
  getRotationFromProgress,
} from "@/lib/scroll-animation";

const SECTION_HEIGHT_VH = 230;
const STICKY_TOP = `calc(50vh - ${phoneDimensions.height / 2}px)`;

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  const rotation = getRotationFromProgress(progress);
  const activeScreen = getActiveScreen(progress);
  const activeContent = comparisonContent[activeScreen];
  const beforeOpacity = getBeforeCopyOpacity(progress);
  const afterOpacity = getAfterCopyOpacity(progress);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--surface)]"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Before and after mobile redesign comparison"
    >
      <div className="sr-only" aria-hidden="true">
        <Image
          src={comparisonContent.before.image}
          alt=""
          width={393}
          height={852}
          priority
        />
        <Image
          src={comparisonContent.after.image}
          alt=""
          width={393}
          height={852}
          priority
        />
      </div>
      <div className="mx-auto h-full max-w-[1200px] px-4 md:px-12">
        <div className="grid h-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative lg:min-h-0">
            <div
              className="flex items-center justify-center lg:sticky"
              style={{ top: STICKY_TOP }}
            >
              <PhoneMockup
                rotation={rotation}
                screenImage={activeContent.image}
                screenAlt={`${activeContent.label} app screen`}
              />
            </div>
          </div>

          <div className="relative flex flex-col pb-[20vh] lg:pb-0">
            <CopyBlock
              content={comparisonContent.before}
              opacity={beforeOpacity}
              isActive={beforeOpacity > 0.5}
              className="min-h-[85vh] lg:min-h-[100vh]"
            />
            <CopyBlock
              content={comparisonContent.after}
              opacity={afterOpacity}
              isActive={afterOpacity > 0.5}
              className="min-h-[85vh] lg:min-h-[100vh]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyBlock({
  content,
  opacity,
  isActive,
  className,
}: {
  content: (typeof comparisonContent)["before"];
  opacity: number;
  isActive: boolean;
  className?: string;
}) {
  return (
    <article
      className={`flex flex-col justify-center transition-opacity duration-150 ${className ?? ""}`}
      style={{ opacity }}
      aria-hidden={!isActive}
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        {content.label}
      </p>
      <h2 className="mb-5 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
        {content.heading}
      </h2>
      <p className="max-w-md text-lg leading-relaxed text-[var(--muted)]">
        {content.description}
      </p>
    </article>
  );
}
