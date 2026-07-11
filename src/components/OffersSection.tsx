"use client";

import { motion, useAnimation } from "motion/react";
import styles from "./OffersSection.module.css";

const OFFERS = [
  {
    key: "invest",
    image: "/images/offers/offer-invest.jpg",
    imageAlt: "City skyline at dusk",
    panel: "/images/offers/ui-sip-calendar.png",
    panelAlt: "SIP calendar dashboard panel",
    title: "Build your India portfolio over time.",
    description:
      "Invest in top mutual funds through your NRE/NRO account, via SIP or lump sum.",
  },
  {
    key: "account",
    image: "/images/offers/offer-account.jpg",
    imageAlt: "Desert sand dunes at sunset",
    panel: "/images/offers/ui-gift-city.png",
    panelAlt: "GIFT City USD account flow panel",
    title: "Keep your money in AED",
    description:
      "Access eligible GIFT City investments in a USD denominated structure.",
  },
  {
    key: "advisory",
    image: "/images/offers/offer-advisory.jpg",
    imageAlt: "Leather portfolio on a desk",
    panel: "/images/offers/ui-wealth-advisory.png",
    panelAlt: "Wealth advisory activity panel",
    title: "Put your portfolio in good hands.",
    description:
      "A dedicated manager maintains and reviews your portfolio on your behalf.",
  },
];

function OfferCard({
  offer,
  delay,
}: {
  offer: (typeof OFFERS)[number];
  delay: number;
}) {
  const controls = useAnimation();
  const { image, imageAlt, panel, panelAlt, title, description } = offer;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() =>
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: "easeOut" },
        })
      }
      onHoverStart={() =>
        controls.start({ y: -8, transition: { duration: 0.25, ease: "easeIn" } })
      }
      onHoverEnd={() =>
        controls.start({ y: 0, transition: { duration: 0.25, ease: "easeOut" } })
      }
    >
      <div className={styles.cardInner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt} className={styles.cardImage} />
        <div className={styles.cardScrim} aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={panel} alt={panelAlt} className={styles.panelImage} />
        <div className={styles.caption}>
          <p className={styles.captionTitle}>{title}</p>
          <p className={styles.captionDescription}>{description}</p>
          <p className={styles.captionLabel}>SIP + LUMPSUM</p>
        </div>
      </div>
    </motion.div>
  );
}

export function OffersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>WHAT WE&apos;RE OFFERING RIGHT NOW</p>
          <h2 className={styles.title}>Grow your wealth as an NRI</h2>
          <p className={styles.subtitle}>
            Invest in India. Hold value in USD. Keep your portfolio looked
            after.
          </p>
        </div>
        <div className={styles.cardsRow}>
          {OFFERS.map((offer, index) => (
            <OfferCard key={offer.key} offer={offer} delay={index * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
