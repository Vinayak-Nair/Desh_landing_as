"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/page.module.css";

export function FundCard({ delay }: { delay: number }) {
  return (
    <motion.article
      className={`${styles.problemCard} ${styles.fund}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <Image
        src="/figma/fund-card-bg.png"
        alt=""
        fill
        sizes="(min-width: 1200px) 685px, (min-width: 768px) calc(100vw - 405px), 44vw"
        className={styles.cardBackground}
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{"Which Fund Do\nI Even Pick?"}</h3>
        <p
          className={`${styles.cardDescription} ${styles.cardDescriptionFund}`}
        >
          {
            "Hundreds of funds, zero guidance. We curate portfolios specifically designed for NRI risk profiles and goals."
          }
        </p>
      </div>

      <div className={styles.fundPreviewStack} aria-hidden="true">
        <img
          src="/figma/fund-preview.png"
          alt=""
          className={styles.fundPreview}
        />
      </div>
    </motion.article>
  );
}
