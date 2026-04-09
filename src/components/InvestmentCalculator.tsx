"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

const chartData = [
  { savings: 8, investing: 4 },
  { savings: 10, investing: 6 },
  { savings: 12, investing: 8 },
  { savings: 14, investing: 10 },
  { savings: 16, investing: 13 },
  { savings: 18, investing: 16 },
  { savings: 20, investing: 20 },
  { savings: 23, investing: 25 },
  { savings: 26, investing: 31 },
  { savings: 29, investing: 38 },
  { savings: 33, investing: 46 },
  { savings: 37, investing: 56 },
  { savings: 42, investing: 67 },
  { savings: 47, investing: 80 },
  { savings: 53, investing: 95 },
  { savings: 60, investing: 112 },
  { savings: 68, investing: 132 },
  { savings: 77, investing: 155 },
  { savings: 87, investing: 181 },
  { savings: 100, investing: 210 },
];

const MIN_RATE = 1;
const MAX_RATE = 20;
const DEFAULT_RATE = 8;

function formatINR(value: number): string {
  const str = Math.round(value).toString();
  if (str.length <= 3) return "\u20B9" + str;
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
  return "\u20B9" + formatted;
}

function calculateValues(rate: number) {
  const principal = 10000;
  const years = 30;
  const savingsRate = 0.035;
  const investingRate = rate / 100;
  const savings = principal * Math.pow(1 + savingsRate, years);
  const investing = principal * Math.pow(1 + investingRate, years);
  return {
    savings: Math.round(savings),
    investing: Math.round(investing),
    total: Math.round(savings + investing),
  };
}

export function InvestmentCalculator() {
  const [sliderValue, setSliderValue] = useState(DEFAULT_RATE);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { savings, investing, total } = calculateValues(sliderValue);

  const sliderPercent =
    ((sliderValue - MIN_RATE) / (MAX_RATE - MIN_RATE)) * 100;

  const maxBarValue = Math.max(
    ...chartData.map((d) => d.savings + d.investing)
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden w-full min-h-[900px] relative mt-16"
      style={{
        backgroundImage: "url('/figma/yellowbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Content — centred at max 1040px to match cards grid */}
      <div className="relative z-10 max-w-[1040px] mx-auto flex flex-col items-center px-4 md:px-6 pb-[80px] md:pb-[120px]">
        {/* Heading */}
        <div className="flex flex-col items-center gap-3 md:gap-4 pt-[100px] md:pt-[140px]">
          <h2 className="font-['General_Sans'] font-medium text-black text-[1.5rem] md:text-[2.5rem] text-center tracking-[-1px] md:tracking-[-2px] leading-[1.15] md:leading-[1.2]">
            {isInView && (
              <>
                <span className="block">
                  <BlurredStagger text="Investing is the key to" delay={0.2} />
                </span>
                <span className="block">
                  <BlurredStagger text="building wealth." delay={0.7} />
                </span>
              </>
            )}
          </h2>
          {isInView && (
            <motion.p
              className="font-['General_Sans'] font-normal text-black text-sm md:text-base text-center leading-[1.5]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.6, ease: "easeOut" }}
            >
              See how your money can grow over time.
            </motion.p>
          )}
        </div>

        {/* Slider + card area */}
        <div className="flex flex-col w-full items-start gap-[39px] mt-[40px]">
          {/* Slider controls */}
          <div className="flex flex-col items-start gap-[30px] relative self-stretch w-full">
            {/* Label row */}
            <div className="flex items-center justify-between relative self-stretch w-full">
              <div className="font-['General_Sans'] font-medium text-black text-sm md:text-base text-center tracking-[0] leading-[19.2px] whitespace-nowrap">
                Expected return rate (p.a)
              </div>
              <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#e8b200] rounded-lg">
                <div className="font-['General_Sans'] font-semibold text-black text-sm md:text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  {formatINR(total)}
                </div>
              </div>
            </div>

            {/* Slider track + coin */}
            <div className="relative w-full h-[40px]">
              {/* White track bar — vertically centred */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] bg-white rounded-[999px] pointer-events-none">
                <div
                  className="absolute top-0 left-0 h-full bg-[#024d53] rounded-full transition-all duration-150"
                  style={{ width: `${sliderPercent}%` }}
                />
              </div>
              {/* Coin — vertically centred on the track, pointer-events-none so input below receives clicks */}
              <div
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
                style={{ left: `calc(${sliderPercent}% - 20px)` }}
              >
                <Image
                  src="/figma/slider-coin.png"
                  alt="Drag to adjust"
                  width={40}
                  height={40}
                  draggable={false}
                  className="rounded-full"
                />
              </div>
              {/* Range input — must be on top (z-30) to capture all pointer events */}
              <input
                type="range"
                min={MIN_RATE}
                max={MAX_RATE}
                step={0.1}
                value={sliderValue}
                onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                aria-label="Expected return rate per annum"
              />
            </div>
          </div>

          {/* Result card */}
          <div className="flex flex-col items-start gap-[21px] p-4 md:p-6 relative self-stretch w-full bg-white rounded-[14px] shadow-lg">
            {/* Two-column results */}
            <div className="flex flex-col md:flex-row items-start gap-5 relative self-stretch w-full">
              {/* Savings column */}
              <div className="flex flex-col flex-1 items-start gap-6 relative">
                <div className="flex flex-col items-start gap-[13px] relative self-stretch w-full">
                  <div className="w-6 h-6 mt-[-4px] ml-[-4px] bg-black rounded border-4 border-[#00000033] aspect-square" />
                  <p className="self-stretch font-['General_Sans'] font-medium text-black text-sm md:text-base tracking-[0] leading-6">
                    Typical savings account <br />
                    after 30 years
                  </p>
                </div>
                <div className="self-stretch font-['General_Sans'] font-medium text-black text-xl md:text-2xl tracking-[0] leading-9">
                  {formatINR(savings)}
                </div>
              </div>

              {/* Investing column */}
              <div className="flex flex-col flex-1 items-start gap-6 relative">
                <div className="flex flex-col items-start gap-[13px] relative self-stretch w-full">
                  <div className="w-6 h-6 mt-[-4px] ml-[-4px] bg-[#008a25] rounded border-4 border-[#008a2533] aspect-square" />
                  <p className="self-stretch font-['General_Sans'] font-medium text-black text-sm md:text-base tracking-[0] leading-6">
                    Normal Investing account <br />
                    after 30 years
                  </p>
                </div>
                <div className="self-stretch font-['General_Sans'] font-medium text-black text-xl md:text-2xl tracking-[0] leading-9">
                  {formatINR(investing)}
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="relative self-stretch w-full h-[200px] md:h-[240px]">
              <div className="flex items-end justify-between w-full h-full gap-[3px]">
                {chartData.map((bar, index) => {
                  const totalBarValue = bar.savings + bar.investing;
                  const totalHeightPercent =
                    (totalBarValue / maxBarValue) * 100;
                  const savingsHeightPercent =
                    (bar.savings / totalBarValue) * 100;
                  const investingHeightPercent =
                    (bar.investing / totalBarValue) * 100;
                  return (
                    <div
                      key={index}
                      className="flex flex-col justify-end flex-1 h-full"
                    >
                      <div
                        className="flex flex-col w-full rounded-sm overflow-hidden transition-all duration-300"
                        style={{ height: `${totalHeightPercent}%` }}
                      >
                        <div
                          className="w-full bg-[#008a25]"
                          style={{ height: `${investingHeightPercent}%` }}
                        />
                        <div
                          className="w-full bg-black"
                          style={{ height: `${savingsHeightPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Axis labels */}
            <div className="flex items-center justify-between relative self-stretch w-full">
              <div className="font-['General_Sans'] font-medium text-black text-sm md:text-base tracking-[0] leading-6 whitespace-nowrap">
                Today
              </div>
              <div className="font-['General_Sans'] font-medium text-black text-sm md:text-base tracking-[0] leading-6 whitespace-nowrap">
                After 30 years
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
