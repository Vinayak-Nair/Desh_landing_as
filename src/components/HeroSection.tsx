"use client";

import { useAnimation, useInView, motion } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import styles from "@/app/page.module.css";

// ── Problem card data ──────────────────────────────────────────

type ProblemCardData = {
  id: "kyc" | "fund" | "advisor" | "tax";
  size: "large" | "compact";
  title: string;
  description: string;
  image: string;
};

const problemCards: ProblemCardData[] = [
  {
    id: "kyc",
    size: "large",
    title: "Complex KYC\n& Paperwork",
    description:
      "Reams of documents, overseas\nnotarisation, and bank rejections.\nWe walk you through every form,\nstep by step.",
    image: "/figma/kyc-card-bg.png",
  },
  {
    id: "fund",
    size: "large",
    title: "Which Fund Do\nI Even Pick?",
    description:
      "Hundreds of funds, zero guidance. We\ncurate portfolios specifically designed\nfor NRI risk profiles and goals.",
    image: "/figma/fund-card-bg.png",
  },
  {
    id: "advisor",
    size: "compact",
    title: "No Trusted Advisor\nAbroad",
    description:
      "Local advisors do not understand Indian markets. We are your certified guide with deep expertise.",
    image: "/figma/advisor-card-bg.png",
  },
  {
    id: "tax",
    size: "compact",
    title: "Repatriation & Tax\nConfusion",
    description:
      "DTAA, TDS, and FEMA sound scary. We simplify the cross-border tax picture so your money moves freely.",
    image: "/figma/tax-card-bg.png",
  },
];

// ── ProblemCard ────────────────────────────────────────────────

function ProblemCard({ card, delay }: { card: ProblemCardData; delay: number }) {
  const isKycCard = card.id === "kyc";
  const isFundCard = card.id === "fund";

  return (
    <motion.article
      className={`${styles.problemCard} ${styles[card.size]} ${styles[card.id]}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <Image
        src={card.image}
        alt=""
        fill
        sizes={
          isKycCard
            ? "(min-width: 1200px) 335px, (min-width: 768px) calc((100vw - 66px) / 2), 44vw"
            : isFundCard
              ? "(min-width: 1200px) 685px, (min-width: 768px) calc(100vw - 405px), 44vw"
              : "(max-width: 480px) 44vw, 180px"
        }
        className={styles.cardBackground}
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardDescription}>{card.description}</p>
      </div>

      {isKycCard && (
        <div className={styles.paperStack}>
          <Image
            src="/figma/kyc-paper.png"
            alt=""
            width={249}
            height={253}
            sizes="(min-width: 1200px) 249px, (min-width: 768px) 32vw, 30vw"
            className={styles.paperImage}
          />
        </div>
      )}

      {isFundCard && (
        <div className={styles.fundPreviewStack} aria-hidden="true">
          <div className={styles.fundPreviewEcho} />
          <div className={styles.fundPreview}>
            <div className={styles.fundPreviewHeader}>
              <div className={styles.fundBadge}>
                <svg viewBox="0 0 49 49" className={styles.fundBadgeIcon} aria-hidden="true">
                  <rect width="49" height="49" rx="9" fill="#FFFDEA" />
                  <path d="M10 27.5c3.6-5.4 9-8.1 15.7-8.1 4.8 0 8.6 1.1 13.3 4.4"
                    fill="none" stroke="#129C45" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.1" />
                  <path d="M28.8 14.2c2.7.6 4.8 2.4 5.6 4.7-2.8.8-5.9-.1-8-2.3.5-1.5 1.3-2.1 2.4-2.4Z" fill="#F2C333" />
                  <path d="M11.5 31.8c6.6 2.9 12.6 3.3 19 1.1 4.7-1.6 7.1-1.8 10.7-.7"
                    fill="none" stroke="#5DB0F2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <div className={styles.fundCopy}>
                <strong>Parag Parikh Flexi</strong>
                <strong>Cap Fund</strong>
              </div>
            </div>
            <div className={styles.fundMeta}>
              <span>Commodities</span>
              <span className={styles.fundMetaDot} />
              <span>Silver</span>
            </div>
            <div className={styles.fundStats}>
              <strong>48.4%</strong>
              <span>3Y Annualised</span>
            </div>
            <div className={styles.fundGraph}>
              <svg viewBox="0 0 258 95" preserveAspectRatio="none" className={styles.fundGraphSvg}>
                <defs>
                  <linearGradient id="fund-area-gradient" x1="129" x2="129" y1="0" y2="95">
                    <stop offset="0%" stopColor="#AAFFBD" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M6 79C16 63 25 68 34 48c8-17 21-23 33-11 6 6 7 20 16 22 12 3 21-7 31-6 13 1 18 11 28 12 7 1 12-3 19-3 14 0 20 8 33 8 13 0 24-5 34 2 8 5 11 14 18 16 20-28 27-69 38-88v95H6Z"
                  fill="url(#fund-area-gradient)" />
                <path d="M6 79C16 63 25 68 34 48c8-17 21-23 33-11 6 6 7 20 16 22 12 3 21-7 31-6 13 1 18 11 28 12 7 1 12-3 19-3 14 0 20 8 33 8 13 0 24-5 34 2 8 5 11 14 18 16 20-28 27-69 38-88"
                  fill="none" stroke="#00A52C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.2" />
              </svg>
              <div className={styles.fundTag}>₹234</div>
              <span className={styles.fundGraphDot} />
            </div>
          </div>
        </div>
      )}
    </motion.article>
  );
}

// ── Combined HeroSection (page 1) + ProblemSection (page 2) ───

export function HeroSection() {
  const phoneControls = useAnimation();
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, margin: "-100px" });

  // Phone entrance + float loop
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
              <span><BlurredStagger text="You earned It abroad" delay={0.2} /></span>
              <span><BlurredStagger text="watch It grow back home" delay={0.76} /></span>
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
              transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
            />
            <motion.div
              className={styles.phonePositioner}
              initial={{ y: 100, opacity: 0 }}
              animate={phoneControls}
            >
              <motion.div
                className={styles.phoneFrame}
                style={{ x: "-50%" }}
              >
                <Image
                  src="/figma/Mobile.png"
                  alt="Desh mobile app preview"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 767px) 32vw, (max-width: 1199px) 200px, 220px"
                  className={styles.phoneScreen}
                />
              </motion.div>
            </motion.div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/fg.png" alt="" aria-hidden="true" className={styles.heroLandscape} />
          </div>
        </section>

      {/* ── Page 2: problem section ── */}
      <section className={styles.problemSection}>
        <div
          ref={cardsRef}
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
                    <BlurredStagger text="Investing in India shouldn't" delay={0.2} />
                  </span>
                  <span className="block">
                    <BlurredStagger text="feel like a full time job." delay={0.7} />
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

          {/* Cards */}
          {isInView && (
            <div className={`${styles.problemGrid} w-full max-w-[1040px] mt-8 md:mt-12`}>
              {problemCards.map((card, index) => (
                <ProblemCard key={card.id} card={card} delay={0.2 + index * 0.15} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
