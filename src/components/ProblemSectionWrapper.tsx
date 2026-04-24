"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/page.module.css";

export function ProblemSectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hero wrapper height = 100dvh - 56px (nav). Background goes fully opaque
    // exactly when the problem section has scrolled up to cover the entire hero.
    const getHeroHeight = () => window.innerHeight - 56;

    const handleScroll = () => {
      const progress = Math.min(Math.max(window.scrollY / getHeroHeight(), 0), 1);
      el.style.background = `rgba(255, 255, 255, ${progress})`;
    };

    // Start transparent on mount, then track scroll
    el.style.background = "rgba(255, 255, 255, 0)";
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} className={styles.problemSection}>
      {children}
    </section>
  );
}
