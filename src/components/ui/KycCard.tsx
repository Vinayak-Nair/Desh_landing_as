"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/page.module.css";

export function KycCard({ delay }: { delay: number }) {
  return (
    <motion.article
      className={`${styles.problemCard} ${styles.large} ${styles.kyc}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <Image
        src="/figma/kyc-card-bg.png"
        alt=""
        fill
        sizes="(min-width: 1200px) 335px, (min-width: 768px) calc((100vw - 66px) / 2), 44vw"
        className={styles.cardBackground}
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{"Complex KYC\n& Paperwork"}</h3>
        <p className={styles.cardDescription}>
          {
            "Reams of documents, overseas\nnotarisation, and bank rejections.\nWe walk you through every form,\nstep by step."
          }
        </p>
      </div>
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
    </motion.article>
  );
}
