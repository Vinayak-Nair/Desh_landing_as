"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

const cards = [
  {
    title: ["Complex KYC", "& Paperwork"],
    description:
      "Reams of documents, overseas notarisation, and bank rejections. We walk you through every form, step by step.",
    image: "/figma/paper.png",
  },
  {
    title: ["Which Fund Do", "I Even Pick?"],
    description:
      "Hundreds of funds, zero guidance. We curate portfolios specifically designed for NRI risk profiles and goals.",
    image: "/figma/ruppee.png",
  },
  {
    title: ["No Trusted", "Advisor Abroad"],
    description:
      "Local advisors don't understand Indian markets. We're your certified guide familiar face, deep expertise.",
    image: "/figma/shield.png",
  },
  {
    title: ["Repatriation &", "Tax Confusion"],
    description:
      "DTAA, TDS, FEMA sounds scary. We simplify the cross border tax picture so your money moves freely.",
    image: "/figma/money.png",
  },
];

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="flex flex-col w-full max-w-[1200px] mx-auto items-center px-4 md:px-6"
    >
      {/* Heading */}
      <div className="flex flex-col items-center gap-3 md:gap-4 pt-10 md:pt-[72px]">
        {isInView && (
          <motion.p
            className="font-['General_Sans'] font-semibold text-[#f2a100] text-[10px] md:text-xs tracking-[0.14em] uppercase"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            NRI STRUGGLE IS REAL
          </motion.p>
        )}
        <h2 className="font-['General_Sans'] font-medium text-black text-[1.5rem] md:text-[2.5rem] text-center tracking-[-1px] md:tracking-[-2px] leading-[1.15] md:leading-[1.2]">
          {isInView && (
            <>
              <span className="block">
                <BlurredStagger
                  text="Investing in India shouldn't"
                  delay={0.2}
                />
              </span>
              <span className="block">
                <BlurredStagger
                  text="feel like a full time job."
                  delay={0.7}
                />
              </span>
            </>
          )}
        </h2>
        {isInView && (
          <motion.p
            className="font-['General_Sans'] font-normal text-[#6b7280] text-sm md:text-base text-center leading-[1.5]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.6, ease: "easeOut" }}
          >
            Most NRIs give up before they start. Here&apos;s what&apos;s been
            holding you back and how we fix all of it.
          </motion.p>
        )}
      </div>

      {/* Cards -- 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full max-w-[1040px] mt-8 md:mt-12">
        {cards.map((card, index) => (
          <motion.div
            key={card.title[0]}
            className="relative flex flex-col bg-[#f6f6f6] border border-[#f2f2f2] rounded-[20px] p-6 md:p-8 min-h-[260px] md:min-h-[284px] overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 1.8 + index * 0.15,
              ease: "easeOut",
            }}
          >
            {/* Top area: dot + title + image */}
            <div className="flex items-start justify-between w-full">
              {/* Left: dot + title */}
              <div className="flex flex-col items-start">
                <span className="w-[7px] h-[7px] rounded-full bg-black mb-5" />
                <h3 className="font-['General_Sans'] font-semibold text-black text-[1.25rem] md:text-[1.75rem] leading-[1.2] tracking-[-0.5px]">
                  {card.title[0]}
                  <br />
                  {card.title[1]}
                </h3>
              </div>
              {/* Right: image */}
              <div className="relative w-[72px] h-[72px] md:w-[100px] md:h-[100px] flex-shrink-0">
                <Image
                  src={card.image}
                  alt={card.title.join(" ")}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Bottom: description */}
            <p className="font-['General_Sans'] font-normal text-[#6b7280] text-xs md:text-sm leading-[1.6] mt-auto max-w-[380px]">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
