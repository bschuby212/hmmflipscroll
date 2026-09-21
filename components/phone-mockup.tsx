"use client";

import Image from "next/image";

/** MagicUI-accurate iPhone proportions (scaled for layout). */
const FRAME_W = 433;
const FRAME_H = 882;
const SCREEN_X = 21.25;
const SCREEN_Y = 19.25;
const SCREEN_W = 389.5;
const SCREEN_H = 843.5;
const SCREEN_R = 55.75;

const DISPLAY_WIDTH = 300;
const SCALE = DISPLAY_WIDTH / FRAME_W;
const DISPLAY_HEIGHT = FRAME_H * SCALE;
const PHONE_DEPTH = 22;
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
        width: DISPLAY_WIDTH + 80,
        height: DISPLAY_HEIGHT + 80,
      }}
      aria-hidden="true"
    >
      <div
        className="phone-stage relative"
        style={{
          width: DISPLAY_WIDTH,
          height: DISPLAY_HEIGHT,
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        <FrontFace screenImage={screenImage} screenAlt={screenAlt} />
        <BackFace />
        <SideEdges />
      </div>
    </div>
  );
}

function FrontFace({
  screenImage,
  screenAlt,
}: {
  screenImage: string;
  screenAlt: string;
}) {
  const leftPct = (SCREEN_X / FRAME_W) * 100;
  const topPct = (SCREEN_Y / FRAME_H) * 100;
  const widthPct = (SCREEN_W / FRAME_W) * 100;
  const heightPct = (SCREEN_H / FRAME_H) * 100;
  const radiusH = (SCREEN_R / SCREEN_W) * 100;
  const radiusV = (SCREEN_R / SCREEN_H) * 100;

  return (
    <div
      className="phone-face absolute inset-0 overflow-hidden"
      style={{
        transform: `translateZ(${HALF_DEPTH}px)`,
        borderRadius: 48 * SCALE,
        boxShadow: "0 28px 70px rgba(0,0,0,0.28)",
      }}
    >
      <div
        className="pointer-events-none absolute z-0 overflow-hidden bg-black"
        style={{
          left: `${leftPct}%`,
          top: `${topPct}%`,
          width: `${widthPct}%`,
          height: `${heightPct}%`,
          borderRadius: `${radiusH}% / ${radiusV}%`,
        }}
      >
        <Image
          src={screenImage}
          alt={screenAlt}
          fill
          priority
          sizes={`${Math.round(SCREEN_W * SCALE)}px`}
          className="object-cover object-top"
          draggable={false}
        />
      </div>

      <svg
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full"
        style={{ transform: "translateZ(0)" }}
      >
        <g mask="url(#iphoneScreenPunch)">
          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            fill="#2C2C2E"
          />
          <path
            d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
            fill="#3A3A3C"
          />
          <path
            d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
            fill="#3A3A3C"
          />
          <path
            d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
            fill="#3A3A3C"
          />
          <path
            d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
            fill="#3A3A3C"
          />
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            fill="#1C1C1E"
          />
        </g>

        <path
          opacity="0.55"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          fill="#636366"
        />

        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
          fill="#2C2C2E"
          stroke="#2C2C2E"
          strokeWidth="0.5"
          mask="url(#iphoneScreenPunch)"
        />

        {/* Dynamic Island */}
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          fill="#000000"
        />
        <path
          d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
          fill="#0A0A0A"
        />
        <path
          d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
          fill="#1C1C1E"
        />

        <defs>
          <mask id="iphoneScreenPunch" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={FRAME_W} height={FRAME_H} fill="white" />
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_W}
              height={SCREEN_H}
              rx={SCREEN_R}
              ry={SCREEN_R}
              fill="black"
            />
          </mask>
        </defs>
      </svg>
    </div>
  );
}

function BackFace() {
  return (
    <div
      className="phone-face absolute inset-0 overflow-hidden"
      style={{
        transform: `rotateY(180deg) translateZ(${HALF_DEPTH}px)`,
        borderRadius: 48 * SCALE,
        background:
          "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* Outer titanium rim */}
      <div
        className="absolute inset-[3px] rounded-[42px]"
        style={{
          boxShadow:
            "inset 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 40px rgba(0,0,0,0.35)",
        }}
      />

      {/* Camera island */}
      <div
        className="absolute left-[18%] top-[8%] rounded-[28px]"
        style={{
          width: "42%",
          aspectRatio: "1 / 1.08",
          background:
            "linear-gradient(145deg, #48484a 0%, #1c1c1e 45%, #2c2c2e 100%)",
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)",
        }}
      >
        <Lens className="left-[14%] top-[12%]" size="34%" />
        <Lens className="right-[14%] top-[12%]" size="34%" />
        <Lens className="left-[14%] bottom-[14%]" size="34%" />
        <Flash className="right-[18%] bottom-[18%]" />
      </div>

      {/* Apple logo mark */}
      <div
        className="absolute left-1/2 top-[58%] h-[36px] w-[30px] -translate-x-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, #636366 0%, #3a3a3c 55%, transparent 70%)",
        }}
      />
    </div>
  );
}

function Lens({
  className,
  size,
}: {
  className: string;
  size: string;
}) {
  return (
    <div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        aspectRatio: "1",
        background:
          "radial-gradient(circle at 35% 30%, #3a3a3c 0%, #0a0a0a 55%, #000 100%)",
        boxShadow:
          "inset 0 0 0 2px #48484a, inset 0 0 0 5px #1c1c1e, 0 2px 6px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "42%",
          height: "42%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 40% 35%, #1a3a5c 0%, #0a1520 60%, #000 100%)",
        }}
      />
    </div>
  );
}

function Flash({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full ${className}`}
      style={{
        width: "18%",
        aspectRatio: "1",
        background:
          "radial-gradient(circle at 40% 35%, #f5f0d8 0%, #c4b896 50%, #8a7d5c 100%)",
        boxShadow: "inset 0 0 0 1.5px #636366, 0 1px 3px rgba(0,0,0,0.4)",
      }}
    />
  );
}

function SideEdges() {
  return (
    <>
      <div
        className="phone-edge absolute"
        style={{
          width: PHONE_DEPTH,
          height: DISPLAY_HEIGHT,
          left: "50%",
          top: "50%",
          marginLeft: -PHONE_DEPTH / 2,
          marginTop: -DISPLAY_HEIGHT / 2,
          transform: `rotateY(90deg) translateZ(${DISPLAY_WIDTH / 2}px)`,
          background:
            "linear-gradient(90deg, #1c1c1e 0%, #48484a 45%, #2c2c2e 100%)",
        }}
      />
      <div
        className="phone-edge absolute"
        style={{
          width: PHONE_DEPTH,
          height: DISPLAY_HEIGHT,
          left: "50%",
          top: "50%",
          marginLeft: -PHONE_DEPTH / 2,
          marginTop: -DISPLAY_HEIGHT / 2,
          transform: `rotateY(-90deg) translateZ(${DISPLAY_WIDTH / 2}px)`,
          background:
            "linear-gradient(90deg, #2c2c2e 0%, #48484a 55%, #1c1c1e 100%)",
        }}
      />
      <div
        className="phone-edge absolute"
        style={{
          width: DISPLAY_WIDTH,
          height: PHONE_DEPTH,
          left: "50%",
          top: "50%",
          marginLeft: -DISPLAY_WIDTH / 2,
          marginTop: -PHONE_DEPTH / 2,
          transform: `rotateX(90deg) translateZ(${DISPLAY_HEIGHT / 2}px)`,
          background:
            "linear-gradient(180deg, #636366 0%, #2c2c2e 40%, #1c1c1e 100%)",
        }}
      />
      <div
        className="phone-edge absolute"
        style={{
          width: DISPLAY_WIDTH,
          height: PHONE_DEPTH,
          left: "50%",
          top: "50%",
          marginLeft: -DISPLAY_WIDTH / 2,
          marginTop: -PHONE_DEPTH / 2,
          transform: `rotateX(-90deg) translateZ(${DISPLAY_HEIGHT / 2}px)`,
          background:
            "linear-gradient(0deg, #48484a 0%, #1c1c1e 50%, #2c2c2e 100%)",
        }}
      />
    </>
  );
}

export const phoneDimensions = {
  width: DISPLAY_WIDTH,
  height: DISPLAY_HEIGHT,
};
