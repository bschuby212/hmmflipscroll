"use client";

import Image from "next/image";
import { useRef } from "react";

import { PhoneMockup } from "@/components/phone-mockup";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { comparisonContent } from "@/lib/comparison-content";
import {
  getActiveScreen,
  getAfterCopyOpacity,
  getBeforeCopyOpacity,
  getRotationFromProgress,
} from "@/lib/scroll-animation";

const SECTION_HEIGHT_VH = 260;

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

      {/* Sticky stage keeps phone + copy vertically centered together */}
      <div className="sticky top-0 flex h-screen w-full items-center">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-12">
          <div className="flex justify-center">
            <PhoneMockup
              rotation={rotation}
              screenImage={activeContent.image}
              screenAlt={`${activeContent.label} app screen`}
            />
          </div>

          <div className="relative mx-auto w-full max-w-md md:mx-0">
            <CopyBlock
              content={comparisonContent.before}
              opacity={beforeOpacity}
              isActive={beforeOpacity > 0.5}
              stacked
            />
            <CopyBlock
              content={comparisonContent.after}
              opacity={afterOpacity}
              isActive={afterOpacity > 0.5}
              stacked
            />
            {/* Invisible spacer so stacked absolute copy has height */}
            <div className="invisible pointer-events-none" aria-hidden="true">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.12em]">
                {comparisonContent.before.label}
              </p>
              <h2 className="mb-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {comparisonContent.before.heading}
              </h2>
              <p className="text-lg leading-relaxed">
                {comparisonContent.before.description}
              </p>
            </div>
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
  stacked,
}: {
  content: (typeof comparisonContent)["before"];
  opacity: number;
  isActive: boolean;
  stacked?: boolean;
}) {
  return (
    <article
      className={
        stacked
          ? "absolute inset-0 flex flex-col justify-center"
          : "flex flex-col justify-center"
      }
      style={{
        opacity,
        pointerEvents: isActive ? "auto" : "none",
      }}
      aria-hidden={!isActive}
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        {content.label}
      </p>
      <h2 className="mb-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
        {content.heading}
      </h2>
      <p className="text-lg leading-relaxed text-[var(--muted)]">
        {content.description}
      </p>
    </article>
  );
}
