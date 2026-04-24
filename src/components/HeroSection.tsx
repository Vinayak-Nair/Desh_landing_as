"use client";

import { useAnimation, useInView, motion } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { KycCard } from "@/components/ui/KycCard";
import { FundCard } from "@/components/ui/FundCard";
import { AdvisorCard } from "@/components/ui/AdvisorCard";
import { TaxCard } from "@/components/ui/TaxCard";
import styles from "@/app/page.module.css";

export function HeroSection() {
  const phoneControls = useAnimation();
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function sequence() {
      await phoneControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
      });
      phoneControls.start({
        y: [0, -9, 0],
        transition: {
          duration: 8.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop" as const,
        },
      });
    }
    sequence();
  }, [phoneControls]);

  return (
    <>
      {/* ── Page 1: hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>
            <span>
              <BlurredStagger text="You earned It abroad" delay={0.2} />
            </span>
            <span>
              <BlurredStagger text="watch It grow back home" delay={0.76} />
            </span>
          </h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.9, ease: "easeOut" }}
          >
            A simpler way to invest, manage, and stay compliant in India
          </motion.p>
        </div>

        <div className={styles.heroVisual}>
          <motion.div
            className={styles.heroSun}
            aria-hidden="true"
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.3,
            }}
          />
          <motion.div
            className={styles.phonePositioner}
            initial={{ y: 100, opacity: 0 }}
            animate={phoneControls}
          >
            <motion.div className={styles.phoneFrame} style={{ x: "-50%" }}>
              <iframe
                src="https://asset-animator-vinayakvnair08.replit.app/wealth-hero/"
                title="Desh mobile app preview"
                className={styles.phoneScreen}
                scrolling="no"
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </motion.div>
          </motion.div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/fg.png"
            alt=""
            aria-hidden="true"
            className={styles.heroLandscape}
          />
        </div>
      </section>

      {/* ── Page 2: problem section ── */}
      <section className={styles.problemSection}>
        <div
          ref={cardsRef}
          className="flex flex-col w-full max-w-[1200px] mx-auto items-center px-4 md:px-6"
        >
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
                Most NRIs give up before they start. Here&apos;s what&apos;s
                been holding you back and how we fix all of it.
              </motion.p>
            )}
          </div>

          {isInView && (
            <div
              className={`${styles.problemGrid} w-full max-w-[1040px] mt-8 md:mt-12`}
            >
              <KycCard delay={0.2} />
              <FundCard delay={0.35} />
              <AdvisorCard delay={0.5} />
              <TaxCard delay={0.65} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
