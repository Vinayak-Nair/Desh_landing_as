"use client";

import {
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
  motion,
} from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import styles from "@/app/page.module.css";

export function HeroSection() {
  const phoneControls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const rawScale = useTransform(scrollY, [0, 600], [1, 1.25]);
  const phoneScale = useSpring(rawScale, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

  // Blur the hero out as the problem section scrolls over it (0 → 8px over 600px scroll)
  const rawBlur = useTransform(scrollY, [0, 600], [0, 8]);
  const heroFilter = useTransform(rawBlur, (v) => (v > 0 ? `blur(${v}px)` : "none"));

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
    <motion.section ref={sectionRef} className={styles.hero} style={{ filter: heroFilter }}>
      {/* ── Text ── */}
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

      {/* ── Visual area ── */}
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
          <motion.div
            className={styles.phoneFrame}
            style={{ x: "-50%", scale: phoneScale }}
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
      </div>

      {/* ── Landscape ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/fg.png"
        alt=""
        aria-hidden="true"
        className={styles.heroLandscape}
      />
    </motion.section>
  );
}
