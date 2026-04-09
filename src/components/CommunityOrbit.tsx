"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import Image from "next/image";

const CX = 221.5; // orbit centre x
const CY = 219;   // orbit centre y

type DotDef = {
  top: number; left: number; size: number;
  color: string; borderRadius: string; speed: number;
};
type ImgDef = {
  top: number; left: number; size: number;
  src: string; speed: number;
};

const decorativeDots: DotDef[] = [
  { top: 247, left: 0,   size: 5,  color: "#008a25", borderRadius: "2.65px", speed: 0.003  },
  { top: 184, left: 326, size: 6,  color: "#008a25", borderRadius: "3.01px", speed: 0.005  },
  { top: 0.5, left: 259, size: 5,  color: "#008a25", borderRadius: "2.5px",  speed: 0.004  },
  { top: 376, left: 278, size: 5,  color: "#ffc400", borderRadius: "2.59px", speed: 0.007  },
  { top: 141, left: 9,   size: 8,  color: "#ffc400", borderRadius: "3.98px", speed: 0.0035 },
  { top: 96,  left: 338, size: 8,  color: "#ffc400", borderRadius: "4.12px", speed: 0.006  },
  { top: 220, left: 100, size: 9,  color: "#ffc400", borderRadius: "4.52px", speed: 0.004  },
  { top: 392, left: 88,  size: 8,  color: "#008a25", borderRadius: "4.04px", speed: 0.005  },
  { top: 221, left: 433, size: 10, color: "#ffc400", borderRadius: "5.04px", speed: 0.003  },
  { top: 329, left: 208, size: 11, color: "#ffc400", borderRadius: "5.72px", speed: 0.0055 },
];

const memberImages: ImgDef[] = [
  { top: 187, left: 379, size: 23, src: "/figma/dp/11.png", speed: 0.004  },
  { top: 409, left: 295, size: 23, src: "/figma/dp/22.png", speed: 0.003  },
  { top: 279, left: 120, size: 26, src: "/figma/dp/33.png", speed: 0.0055 },
  { top: 271, left: 304, size: 26, src: "/figma/dp/44.png", speed: 0.0035 },
  { top: 25,  left: 87,  size: 23, src: "/figma/dp/55.png", speed: 0.006  },
  { top: 161, left: 44,  size: 23, src: "/figma/dp/66.png", speed: 0.004  },
  { top: 85,  left: 391, size: 23, src: "/figma/dp/77.png", speed: 0.003  },
  { top: 92,  left: 208, size: 26, src: "/figma/dp/88.png", speed: 0.005  },
  { top: 297, left: 9,   size: 23, src: "/figma/dp/99.png", speed: 0.0045 },
];

/** Convert Cartesian element position → polar relative to orbit centre */
function toPolar(left: number, top: number, size: number) {
  const ex = left + size / 2;
  const ey = top + size / 2;
  const dx = ex - CX;
  const dy = ey - CY;
  return {
    orbitalRadius: Math.sqrt(dx * dx + dy * dy),
    initAngle: Math.atan2(dy, dx), // radians
  };
}

// Precompute polar coords once (outside component to avoid recalc)
const dotPolars = decorativeDots.map((d) => toPolar(d.left, d.top, d.size));
const imgPolars  = memberImages.map((m)  => toPolar(m.left,  m.top,  m.size));

// ─── Count-up ──────────────────────────────────────────────────────────────
function CountUp({ target, active }: { target: number; active: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const duration = 2200;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target]);

  return <>{count.toLocaleString()}</>;
}

// ─── Main component ─────────────────────────────────────────────────────────
export function CommunityOrbit() {
  const ref     = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Refs to DOM nodes for direct style mutation (no re-render per frame)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const DEG_TO_RAD = Math.PI / 180;

    // Mutable angle state per element
    const dotAngles = dotPolars.map((p) => p.initAngle);
    const imgAngles  = imgPolars.map((p) => p.initAngle);

    let last: number | null = null;
    let raf: number;

    function tick(now: number) {
      const delta = last !== null ? now - last : 0;
      last = now;

      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        dotAngles[i] += decorativeDots[i].speed * delta * DEG_TO_RAD;
        const { orbitalRadius } = dotPolars[i];
        const x = CX + orbitalRadius * Math.cos(dotAngles[i]) - decorativeDots[i].size / 2;
        const y = CY + orbitalRadius * Math.sin(dotAngles[i]) - decorativeDots[i].size / 2;
        el.style.transform = `translate(${x}px,${y}px)`;
      });

      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        imgAngles[i] += memberImages[i].speed * delta * DEG_TO_RAD;
        const { orbitalRadius } = imgPolars[i];
        const x = CX + orbitalRadius * Math.cos(imgAngles[i]) - memberImages[i].size / 2;
        const y = CY + orbitalRadius * Math.sin(imgAngles[i]) - memberImages[i].size / 2;
        el.style.transform = `translate(${x}px,${y}px)`;
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="relative w-[443px] h-[438px] flex-shrink-0">

      {/* Concentric circle strokes — static */}
      <div className="absolute top-0 left-px w-[438px] h-[438px] rounded-[219px] border-[0.3px] border-solid border-[#e2e2e2]" />
      <div className="absolute top-12 left-12 w-[342px] h-[342px] rounded-[171.07px] border-[0.31px] border-solid border-[#e2e2e2]" />
      <div className="absolute top-[105px] left-[105px] w-[229px] h-[229px] rounded-[114.73px] border-[0.34px] border-solid border-[#e2e2e2]" />

      {/* Decorative dots — top-left anchored at (0,0), moved via transform */}
      {decorativeDots.map((dot, i) => (
        <div
          key={i}
          ref={(el: HTMLDivElement | null) => { dotRefs.current[i] = el; }}
          className="absolute top-0 left-0"
          style={{
            width:           dot.size,
            height:          dot.size,
            backgroundColor: dot.color,
            borderRadius:    dot.borderRadius,
            transform:       `translate(${dot.left}px,${dot.top}px)`,
          }}
        />
      ))}

      {/* Avatars — top-left anchored at (0,0), moved via transform */}
      {memberImages.map((img, i) => (
        <div
          key={i}
          ref={(el: HTMLDivElement | null) => { imgRefs.current[i] = el; }}
          className="absolute top-0 left-0 overflow-hidden rounded-full"
          style={{
            width:     img.size,
            height:    img.size,
            transform: `translate(${img.left}px,${img.top}px)`,
          }}
        >
          <Image
            src={img.src}
            alt="Member"
            width={img.size}
            height={img.size}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      {/* Centre label — always static */}
      <div className="flex flex-col w-[130px] items-center absolute top-[168px] left-[154px]">
        <span className="font-['General_Sans'] font-medium text-[#686868] text-sm text-center leading-[21px]">
          community of
        </span>
        <span className="font-['General_Sans'] font-medium text-[#ffc400] text-[40px] text-center tracking-[-1px] leading-[60px] tabular-nums">
          <CountUp target={1000} active={isInView} />
        </span>
        <span className="font-['General_Sans'] font-medium text-[#686868] text-sm text-center leading-[21px]">
          members &amp; growing
        </span>
      </div>
    </div>
  );
}
