"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

/* ── Financial constants (ported from reference wealth-slider.js) ── */
const DEFAULT_SAVINGS_RATE = 0.0007; // ~0.84% annual (typical savings account)
const INVESTING_RATE = 0.07; // 7% annual (normal investing)
const YEARS = 30;
const GRAPH_HEADROOM_MULTIPLIER = 1.03;

const MIN_DEPOSIT = 5000;
const MAX_DEPOSIT = 200000;
const DEFAULT_DEPOSIT = 25000;
const STEP = 1000;

/* ── Helpers ── */

function formatINR(value: number): string {
  const str = Math.round(value).toString();
  if (str.length <= 3) return "\u20B9" + str;
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
  return "\u20B9" + formatted;
}

/** Future value of an annuity-due (monthly deposits, annual rate, N years) */
function calculateFutureValue(
  monthlyDeposit: number,
  annualRate: number,
  years: number,
): number {
  const periods = 12 * years;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  return Math.round(
    monthlyDeposit *
      ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate) *
      (1 + monthlyRate),
  );
}

/** Generate year-by-year series for a given monthly deposit + annual rate */
function calculateSeries(monthlyDeposit: number, annualRate: number) {
  const yearlyTotals: number[] = [];
  for (let year = 1; year <= YEARS; year++) {
    yearlyTotals.push(calculateFutureValue(monthlyDeposit, annualRate, year));
  }
  return {
    totalValue: yearlyTotals[yearlyTotals.length - 1] ?? 0,
    years: yearlyTotals,
  };
}

const GRAPH_CEILING =
  calculateSeries(MAX_DEPOSIT, INVESTING_RATE).totalValue *
  GRAPH_HEADROOM_MULTIPLIER;

export function InvestmentCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(DEFAULT_DEPOSIT);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* ── Derived data ── */
  const savingsResult = useMemo(
    () => calculateSeries(monthlyDeposit, DEFAULT_SAVINGS_RATE),
    [monthlyDeposit],
  );
  const investingResult = useMemo(
    () => calculateSeries(monthlyDeposit, INVESTING_RATE),
    [monthlyDeposit],
  );

  const graphCeiling = Math.max(GRAPH_CEILING, 1);

  const sliderPercent =
    ((monthlyDeposit - MIN_DEPOSIT) / (MAX_DEPOSIT - MIN_DEPOSIT)) * 100;

  return (
    <motion.section
      ref={sectionRef}
      className="overflow-hidden w-full min-h-[900px] relative mt-16"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                Monthly deposit
              </div>
              <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#e8b200] rounded-lg">
                <div className="font-['General_Sans'] font-semibold text-black text-sm md:text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  {formatINR(monthlyDeposit)}
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
                className="absolute top-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                style={{ left: `${sliderPercent}%` }}
              >
                <Image
                  src="/figma/slider-coin.png"
                  alt="Drag to adjust"
                  width={40}
                  height={40}
                  sizes="40px"
                  draggable={false}
                  className="w-10 h-10 max-w-none rounded-full"
                />
              </div>
              {/* Range input — must be on top (z-30) to capture all pointer events */}
              <input
                type="range"
                min={MIN_DEPOSIT}
                max={MAX_DEPOSIT}
                step={STEP}
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                aria-label="Monthly deposit amount"
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
                  {formatINR(savingsResult.totalValue)}
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
                  {formatINR(investingResult.totalValue)}
                </div>
              </div>
            </div>

            {/* Bar chart — 30 bars (one per year), each bar is a column
                 with green (extra investing growth) on top and black (savings) on bottom */}
            <div className="relative self-stretch w-full h-[225px] md:h-[270px]">
              <div className="flex items-end justify-between w-full h-full gap-[3px]">
                {savingsResult.years.map((_, yearIndex) => {
                  const savVal = savingsResult.years[yearIndex];
                  const invVal = investingResult.years[yearIndex];
                  const extraInvestingGrowth = Math.max(invVal - savVal, 0);

                  // The stacked height equals the investing result, with savings as the baseline.
                  const savH = (savVal / graphCeiling) * 100;
                  const invH = (extraInvestingGrowth / graphCeiling) * 100;

                  return (
                    <div
                      key={yearIndex}
                      className="flex flex-col justify-end flex-1 h-full"
                    >
                      {/* Green (investing) bar */}
                      <div
                        className="w-full bg-[#008a25] rounded-t-sm transition-all duration-300"
                        style={{ height: `${invH}%` }}
                      />
                      {/* Black (savings) bar */}
                      <div
                        className="w-full bg-black transition-all duration-300"
                        style={{ height: `${savH}%` }}
                      />
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
    </motion.section>
  );
}
