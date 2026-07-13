"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import styles from "@/app/page.module.css";

export function AdvisorCard({ delay }: { delay: number }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" },
    });
  }, [controls, delay]);

  return (
    <motion.article
      className={`${styles.problemCard} ${styles.compact} ${styles.advisor}`}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      onHoverStart={() =>
        controls.start({ y: -8, transition: { duration: 0.25, ease: "easeIn" } })
      }
      onHoverEnd={() =>
        controls.start({ y: 0, transition: { duration: 0.25, ease: "easeOut" } })
      }
    >
      <div className={styles.cardTop}>
        <span className={styles.cardBullet} aria-hidden="true" />
        <h3 className={styles.cardTitle}>{"Personalized\nAdvice"}</h3>
      </div>
      <p className={styles.cardDescription}>
        Guidance from people who work exclusively with NRI finances, with
        support that works around your time zone.
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/advisor-icon.png"
        alt=""
        aria-hidden="true"
        className={styles.cardIcon}
      />
    </motion.article>
  );
}
