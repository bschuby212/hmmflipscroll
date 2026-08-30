"use client";

import Image from "next/image";

const PHONE_WIDTH = 280;
const PHONE_HEIGHT = Math.round((PHONE_WIDTH / 409) * 868);
const SCREEN_WIDTH = Math.round((PHONE_WIDTH / 409) * 393);
const SCREEN_HEIGHT = Math.round((PHONE_WIDTH / 409) * 852);
const PHONE_DEPTH = 14;
const HALF_DEPTH = PHONE_DEPTH / 2;

type PhoneMockupProps = {
  rotation: number;
  screenImage: string;
  screenAlt: string;
};

export function PhoneMockup({
  rotation,
  screenImage,
  screenAlt,
}: PhoneMockupProps) {
  return (
    <div
      className="mx-auto flex items-center justify-center"
      style={{
        width: PHONE_WIDTH + 48,
        height: PHONE_HEIGHT + 48,
        perspective: "1200px",
      }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotation}deg)`,
          willChange: "transform",
        }}
      >
        <PhoneFace
          transform={`translateZ(${HALF_DEPTH}px)`}
          className="rounded-[36px] bg-[#080808] p-[6px] shadow-[0_30px_80px_rgba(0,0,0,0.35),inset_0_0_0_2px_#3a3a3e]"
        >
          <div
            className="relative overflow-hidden rounded-[30px] bg-white"
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[36px] items-start justify-between px-[18px] pt-[12px] text-[11px] font-semibold text-white">
              <span>9:41</span>
              <div className="absolute left-1/2 top-[8px] h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex gap-[3px]">
                <span className="h-[8px] w-[12px] rounded-[2px] border border-white/80" />
              </span>
            </div>
            <Image
              src={screenImage}
              alt={screenAlt}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              priority
              className="h-full w-full object-cover object-top"
              draggable={false}
            />
          </div>
        </PhoneFace>

        <PhoneFace
          transform={`rotateY(180deg) translateZ(${HALF_DEPTH}px)`}
          className="rounded-[36px] bg-[#1c1c1e] shadow-[inset_0_0_0_2px_#3a3a3e]"
        >
          <div className="absolute left-1/2 top-[72px] h-[108px] w-[108px] -translate-x-1/2 rounded-[28px] bg-[#2c2c2e] shadow-[inset_0_0_0_1px_#444446]">
            <div className="absolute left-[18px] top-[18px] grid grid-cols-2 gap-[8px]">
              <div className="h-[28px] w-[28px] rounded-full bg-[#0a0a0a] ring-1 ring-[#444446]" />
              <div className="h-[28px] w-[28px] rounded-full bg-[#0a0a0a] ring-1 ring-[#444446]" />
              <div className="h-[28px] w-[28px] rounded-full bg-[#0a0a0a] ring-1 ring-[#444446]" />
            </div>
            <div className="absolute bottom-[16px] right-[16px] h-[20px] w-[20px] rounded-full bg-[#0a0a0a] ring-1 ring-[#444446]" />
          </div>
          <div className="absolute bottom-[48px] left-1/2 h-[6px] w-[96px] -translate-x-1/2 rounded-full bg-[#3a3a3c]" />
        </PhoneFace>

        <PhoneEdge
          transform={`rotateY(90deg) translateZ(${PHONE_WIDTH / 2}px)`}
          width={PHONE_DEPTH}
          height={PHONE_HEIGHT}
          className="bg-[#2a2a2c]"
        />
        <PhoneEdge
          transform={`rotateY(-90deg) translateZ(${PHONE_WIDTH / 2}px)`}
          width={PHONE_DEPTH}
          height={PHONE_HEIGHT}
          className="bg-[#222224]"
        />
        <PhoneEdge
          transform={`rotateX(90deg) translateZ(${PHONE_HEIGHT / 2}px)`}
          width={PHONE_WIDTH}
          height={PHONE_DEPTH}
          className="bg-[#333335]"
        />
        <PhoneEdge
          transform={`rotateX(-90deg) translateZ(${PHONE_HEIGHT / 2}px)`}
          width={PHONE_WIDTH}
          height={PHONE_DEPTH}
          className="bg-[#1a1a1c]"
        />
      </div>
    </div>
  );
}

function PhoneFace({
  children,
  transform,
  className,
}: {
  children: React.ReactNode;
  transform: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 [backface-visibility:hidden] ${className ?? ""}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
}

function PhoneEdge({
  transform,
  width,
  height,
  className,
}: {
  transform: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 [backface-visibility:hidden] ${className ?? ""}`}
      style={{
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
        transform,
      }}
    />
  );
}

export const phoneDimensions = {
  width: PHONE_WIDTH,
  height: PHONE_HEIGHT,
};
