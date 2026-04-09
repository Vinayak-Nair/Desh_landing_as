"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { CommunityOrbit } from "@/components/CommunityOrbit";

const disclaimerItems = [
  "NO SPAM. NO SALES CALLS.",
  "JUST EXPERT GUIDANCE WHEN YOU NEED IT.",
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-white w-full relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-0 md:min-h-[686px] flex items-center justify-between relative gap-8">

        {/* Left content */}
        <div className="flex flex-col items-start justify-center gap-10 md:gap-14 w-full md:max-w-[560px] relative z-10">
          {/* Badge */}
          {isInView && (
            <motion.div
              className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#008a251f] rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <span className="font-['General_Sans'] font-medium text-[#008a25] text-sm tracking-[0] leading-[16.8px] whitespace-nowrap">
                Limited Early Access
              </span>
            </motion.div>
          )}

          {/* Heading + subtitle */}
          <div className="flex flex-col items-start justify-center gap-6 md:gap-[31px] w-full">
            <h2 className="font-['General_Sans'] font-medium text-black text-[1.75rem] md:text-[2.5rem] tracking-[-1px] leading-[1.3] md:leading-[60px]">
              {isInView && (
                <span className="block">
                  <BlurredStagger
                    text="India is growing, Are you in?"
                    delay={0.2}
                  />
                </span>
              )}
            </h2>
            {isInView && (
              <motion.p
                className="font-['General_Sans'] font-medium text-[#686868] text-sm md:text-base tracking-[0] leading-6 max-w-[498px]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 1.2, ease: "easeOut" }}
              >
                Join our exclusive WhatsApp community. Get guided, get invested,
                and build wealth back home from wherever you are in the world.
              </motion.p>
            )}
          </div>

          {/* WhatsApp CTA button */}
          {isInView && (
            <motion.button
              type="button"
              className="flex w-full max-w-[292px] h-[54px] items-center justify-center gap-3 px-6 py-3 bg-[#00ba33] rounded-[999px] border-[3px] border-solid border-[#0ec8411c] shadow-[0px_8px_17px_#054d0d1a,0px_31px_31px_#054d0d17,0px_71px_42px_#054d0d0d,0px_126px_50px_#054d0d03,0px_197px_55px_transparent] cursor-pointer hover:bg-[#00a82e] transition-colors"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5, ease: "easeOut" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M10 0C4.477 0 0 4.477 0 10c0 1.76.457 3.413 1.257 4.852L0 20l5.29-1.218A9.953 9.953 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0z"
                  fill="white"
                />
                <path
                  d="M14.346 12.072c-.197-.099-1.166-.575-1.347-.641-.18-.066-.312-.099-.443.099-.131.197-.509.641-.624.772-.115.131-.23.148-.427.05-.197-.1-.832-.307-1.585-.978-.586-.522-.981-1.167-1.096-1.364-.115-.197-.012-.304.086-.402.089-.088.197-.23.296-.345.099-.115.131-.197.197-.328.066-.132.033-.247-.017-.345-.05-.1-.443-1.069-.607-1.463-.16-.384-.322-.332-.443-.338l-.378-.007a.725.725 0 00-.525.247c-.18.197-.69.674-.69 1.643s.706 1.905.805 2.037c.099.131 1.39 2.122 3.369 2.977.47.203.838.325 1.124.415.473.15.903.129 1.243.078.379-.057 1.166-.477 1.331-.937.165-.46.165-.854.115-.937-.05-.082-.181-.131-.378-.23z"
                  fill="#00BA33"
                />
              </svg>
              <span className="font-['General_Sans'] font-semibold text-white text-base tracking-[0] leading-[19.2px] whitespace-nowrap">
                Join Whatsapp Community
              </span>
            </motion.button>
          )}

          {/* Disclaimer items */}
          {isInView && (
            <motion.div
              className="inline-flex flex-col items-start gap-4 md:gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8, ease: "easeOut" }}
            >
              {disclaimerItems.map((item, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 md:gap-4"
                >
                  <div className="w-3 h-3 flex-shrink-0 bg-[#f2a100] rounded-md border-[3px] border-solid border-[#f2a10024]" />
                  <p className="font-['General_Sans'] font-medium text-[#f2a100] text-xs md:text-sm tracking-[2px] leading-7 whitespace-nowrap">
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right side — community orbit */}
        <div className="hidden md:flex items-center justify-end flex-shrink-0">
          <CommunityOrbit />
        </div>

      </div>
    </section>
  );
}
