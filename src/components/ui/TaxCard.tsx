"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/page.module.css";

export function TaxCard({ delay }: { delay: number }) {
  return (
    <motion.article
      className={`${styles.problemCard} ${styles.compact} ${styles.tax}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <Image
        src="/figma/tax-card-bg.png"
        alt=""
        fill
        sizes="(max-width: 480px) 44vw, 180px"
        className={styles.cardBackground}
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{"Repatriation & Tax\nConfusion"}</h3>
        <p className={styles.cardDescription}>
          DTAA, TDS, and FEMA sound scary. We simplify the cross-border tax
          picture so your money moves freely.
        </p>
      </div>
    </motion.article>
  );
}
