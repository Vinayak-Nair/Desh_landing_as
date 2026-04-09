"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

export function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-white w-full"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div className="max-w-[1040px] mx-auto px-6 flex justify-center">
        <h2 className="font-['General_Sans'] font-medium text-black text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] text-center tracking-[-0.04em] leading-[1.2]">
          {isInView && (
            <>
              <span style={{ display: "block", textAlign: "center" }}>
                <BlurredStagger text="Distance is just geography." delay={0.2} />
              </span>
              <span style={{ display: "block", textAlign: "center", marginTop: "8px" }}>
                <BlurredStagger
                  text="Your money can still belong here."
                  delay={0.8}
                />
              </span>
            </>
          )}
        </h2>
      </div>
    </section>
  );
}
