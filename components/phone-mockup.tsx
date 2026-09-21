"use client";

import Image from "next/image";

const PHONE_WIDTH = 280;
const PHONE_HEIGHT = Math.round((PHONE_WIDTH / 409) * 868);
const SCREEN_WIDTH = Math.round((PHONE_WIDTH / 409) * 393);
const SCREEN_HEIGHT = Math.round((PHONE_WIDTH / 409) * 852);
const PHONE_DEPTH = 18;
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
      className="phone-perspective mx-auto flex items-center justify-center"
      style={{
        width: PHONE_WIDTH + 64,
        height: PHONE_HEIGHT + 64,
      }}
      aria-hidden="true"
    >
      <div
        className="phone-stage relative"
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {/* Front */}
        <div
          className="phone-face absolute inset-0 rounded-[36px] bg-[#080808] p-[6px]"
          style={{
            transform: `translateZ(${HALF_DEPTH}px)`,
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.35), inset 0 0 0 2px #3a3a3e",
          }}
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
        </div>

        {/* Back */}
        <div
          className="phone-face absolute inset-0 rounded-[36px] bg-[#1c1c1e]"
          style={{
            transform: `rotateY(180deg) translateZ(${HALF_DEPTH}px)`,
            boxShadow: "inset 0 0 0 2px #3a3a3e",
          }}
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
        </div>

        {/* Right edge */}
        <div
          className="phone-edge absolute bg-[#2a2a2c]"
          style={{
            width: PHONE_DEPTH,
            height: PHONE_HEIGHT,
            left: "50%",
            top: "50%",
            marginLeft: -PHONE_DEPTH / 2,
            marginTop: -PHONE_HEIGHT / 2,
            transform: `rotateY(90deg) translateZ(${PHONE_WIDTH / 2}px)`,
          }}
        />
        {/* Left edge */}
        <div
          className="phone-edge absolute bg-[#222224]"
          style={{
            width: PHONE_DEPTH,
            height: PHONE_HEIGHT,
            left: "50%",
            top: "50%",
            marginLeft: -PHONE_DEPTH / 2,
            marginTop: -PHONE_HEIGHT / 2,
            transform: `rotateY(-90deg) translateZ(${PHONE_WIDTH / 2}px)`,
          }}
        />
        {/* Top edge */}
        <div
          className="phone-edge absolute bg-[#333335]"
          style={{
            width: PHONE_WIDTH,
            height: PHONE_DEPTH,
            left: "50%",
            top: "50%",
            marginLeft: -PHONE_WIDTH / 2,
            marginTop: -PHONE_DEPTH / 2,
            transform: `rotateX(90deg) translateZ(${PHONE_HEIGHT / 2}px)`,
          }}
        />
        {/* Bottom edge */}
        <div
          className="phone-edge absolute bg-[#1a1a1c]"
          style={{
            width: PHONE_WIDTH,
            height: PHONE_DEPTH,
            left: "50%",
            top: "50%",
            marginLeft: -PHONE_WIDTH / 2,
            marginTop: -PHONE_DEPTH / 2,
            transform: `rotateX(-90deg) translateZ(${PHONE_HEIGHT / 2}px)`,
          }}
        />
      </div>
    </div>
  );
}

export const phoneDimensions = {
  width: PHONE_WIDTH,
  height: PHONE_HEIGHT,
};
