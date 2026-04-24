"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/page.module.css";

export function AdvisorCard({ delay }: { delay: number }) {
  return (
    <motion.article
      className={`${styles.problemCard} ${styles.compact} ${styles.advisor}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <Image
        src="/figma/advisor-card-bg.png"
        alt=""
        fill
        sizes="(max-width: 480px) 44vw, 180px"
        className={styles.cardBackground}
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{"No Trusted Advisor\nAbroad"}</h3>
        <p className={styles.cardDescription}>
          Local advisors do not understand Indian markets. We are your certified
          guide with deep expertise.
        </p>
      </div>
    </motion.article>
  );
}
