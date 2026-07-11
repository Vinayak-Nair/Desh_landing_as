"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import posthog from "posthog-js";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import styles from "./ClosingSection.module.css";

export function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={styles.wrapper}>
      <section className={styles.quote}>
        <h2 className={styles.heading}>
          {isInView && (
            <>
              <span className={styles.line}>
                <BlurredStagger text="Distance is just geography." delay={0.2} />
              </span>
              <span className={styles.line}>
                <BlurredStagger
                  text="Your money can still belong here."
                  delay={0.8}
                />
              </span>
            </>
          )}
        </h2>
        <div className={styles.buttons}>
          <a
            href="https://cal.com/vinayak-nair-vbtd74/1-1-call-with-aswin-investing-from-abroad"
            className={styles.buttonOutline}
            data-cal-link="vinayak-nair-vbtd74/1-1-call-with-aswin-investing-from-abroad"
            data-cal-config='{"layout":"month_view"}'
            onClick={() => {
              posthog.capture("book_a_call_clicked", { location: "closing_section" });
            }}
          >
            Book a Call
          </a>
          <a
            href="https://chat.whatsapp.com/KmasCJMGJ42Bqn9a4PkMw6?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonSolid}
            onClick={() => {
              posthog.capture("whatsapp_community_clicked", { location: "closing_section" });
            }}
          >
            Join us
          </a>
        </div>
      </section>
      <footer className={styles.footer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/closing/footer-hills.png"
          alt=""
          aria-hidden="true"
          className={styles.hills}
        />
      </footer>
    </div>
  );
}
