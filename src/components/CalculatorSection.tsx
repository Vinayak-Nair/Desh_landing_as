"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";

const MAX = 10_000_000; // ₹1,00,00,000
const BAR_COUNT = 15;

/** Format in Indian numbering: ₹XX,XX,XXX */
function formatIndian(n: number): string {
  const rounded = Math.round(n);
  const s = rounded.toString();
  if (s.length <= 3) return `₹${s}`;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${formatted},${last3}`;
}

function calcSavings(amount: number): number {
  return amount; // 1×
}

function calcInvesting(amount: number): number {
  return amount * 2; // 2×
}

/** Generate bar chart data — exponential growth curve */
function generateBars(amount: number) {
  const bars = [];
  for (let i = 1; i <= BAR_COUNT; i++) {
    const progress = i / BAR_COUNT;
    const sav = amount * progress;
    const inv = amount * 2 * Math.pow(progress, 1.8);
    bars.push({ savings: sav, investing: inv });
  }
  return bars;
}

export function CalculatorSection() {
  const [amount, setAmount] = useState(6_500_000);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pct = (amount / MAX) * 100;
  const savingsTotal = calcSavings(amount);
  const investTotal = calcInvesting(amount);
  const bars = generateBars(amount);
  const maxBar = bars.length > 0 ? Math.max(...bars.map((b) => Math.max(b.investing, b.savings))) : 1;

  const updateFromPointer = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));
    const val = Math.round((ratio * MAX) / 10_000) * 10_000;
    setAmount(val);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  }, [updateFromPointer]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromPointer(e.clientX);
  }, [updateFromPointer]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <section className={styles.calcSection}>
      {/* bg.svg as full background */}
      <img
        src="/figma/calc-bg.svg"
        alt=""
        className={styles.calcBg}
        aria-hidden="true"
      />

      <div className={styles.calcInner}>
        {/* ── Top area: heading + subtitle + slider ── */}
        <div className={styles.calcTop}>
          <h2 className={styles.calcTitle}>
            <span>Investing is the key to</span>
            <span>building wealth.</span>
          </h2>
          <p className={styles.calcSubtitle}>
            See how your money can grow over time.
          </p>

          <div className={styles.sliderRow}>
            <span className={styles.sliderLabel}>Expected return rate (p.a)</span>
            <span className={styles.sliderBadge}>{formatIndian(amount)}</span>
          </div>

          <div
            ref={trackRef}
            className={styles.sliderTrack}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <div className={styles.sliderFill} style={{ width: `${pct}%` }} />
            <div className={styles.coinThumb} style={{ left: `${pct}%` }}>
              <Image
                src="/figma/coin.png"
                alt="Drag to adjust"
                width={44}
                height={44}
                draggable={false}
                className={styles.coinImg}
              />
            </div>
          </div>
        </div>

        {/* ── White result card — ~50% of section height ── */}
        <div className={styles.calcCard}>
          <div className={styles.resultColumns}>
            <div className={styles.resultCol}>
              <span className={styles.legendDot} data-variant="black" />
              <span className={styles.legendText}>
                Typical savings account after 30 accounts
              </span>
              <span className={styles.resultValue} data-variant="black">
                {formatIndian(savingsTotal)}
              </span>
            </div>
            <div className={styles.resultCol}>
              <span className={styles.legendDot} data-variant="green" />
              <span className={styles.legendText}>
                Normal Investing account after 30 years
              </span>
              <span className={styles.resultValue} data-variant="green">
                {formatIndian(investTotal)}
              </span>
            </div>
          </div>

          <div className={styles.chartBars}>
            {bars.map((b, i) => {
              const savH = maxBar > 0 ? (b.savings / maxBar) * 100 : 0;
              const invH = maxBar > 0 ? (b.investing / maxBar) * 100 : 0;
              return (
                <div key={i} className={styles.barGroup}>
                  <div className={styles.barGreen} style={{ height: `${invH}%` }} />
                  <div className={styles.barBlack} style={{ height: `${savH}%` }} />
                </div>
              );
            })}
          </div>

          <div className={styles.chartAxis}>
            <span>Today</span>
            <span>After 30 years</span>
          </div>
        </div>
      </div>
    </section>
  );
}
