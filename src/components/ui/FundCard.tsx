"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/page.module.css";

export function FundCard({ delay }: { delay: number }) {
  return (
    <motion.article
      className={`${styles.problemCard} ${styles.large} ${styles.fund}`}
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
        <p className={styles.cardDescription}>
          {
            "Hundreds of funds, zero guidance. We\ncurate portfolios specifically designed\nfor NRI risk profiles and goals."
          }
        </p>
      </div>

      <div className={styles.fundPreviewStack} aria-hidden="true">
        <div className={styles.fundPreviewEcho} />
        <div className={styles.fundPreview}>
          <div className={styles.fundPreviewHeader}>
            <div className={styles.fundBadge}>
              <img
                src="/figma/funds-box-paragh.png"
                alt=""
                className={styles.fundBadgeIcon}
              />

              {/* <svg
                viewBox="0 0 49 49"
                className={styles.fundBadgeIcon}
                aria-hidden="true"
              >
                <rect width="49" height="49" rx="9" fill="#FFFDEA" />
                <path
                  d="M10 27.5c3.6-5.4 9-8.1 15.7-8.1 4.8 0 8.6 1.1 13.3 4.4"
                  fill="none"
                  stroke="#129C45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4.1"
                />
                <path
                  d="M28.8 14.2c2.7.6 4.8 2.4 5.6 4.7-2.8.8-5.9-.1-8-2.3.5-1.5 1.3-2.1 2.4-2.4Z"
                  fill="#F2C333"
                />
                <path
                  d="M11.5 31.8c6.6 2.9 12.6 3.3 19 1.1 4.7-1.6 7.1-1.8 10.7-.7"
                  fill="none"
                  stroke="#5DB0F2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg> */}
            </div>
            <div className={styles.fundCopy}>
              <p>Parag Parikh Flexi</p>
              <p>Cap Fund</p>
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
            <img
              src="/figma/graph.png"
              alt=""
              className={styles.fundBadgeIcon}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
