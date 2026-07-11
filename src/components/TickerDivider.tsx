import { Fragment } from "react";
import styles from "./TickerDivider.module.css";

const ITEMS = ["EXPERT GUIDANCE", "NO SPAM", "NO SALES CALLS", "1:1 CALLS"];

export function TickerDivider() {
  // Render the list twice back-to-back so the -50% translateX loop is seamless
  // and never visibly restarts.
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className={styles.section} aria-hidden="true">
      <div className={styles.track}>
        {doubled.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span className={styles.chip}>{item}</span>
            <span className={styles.dot} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
