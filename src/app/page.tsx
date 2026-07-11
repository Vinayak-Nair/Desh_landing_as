import styles from "./page.module.css";
import { HeroSection } from "@/components/HeroSection";
import { OffersSection } from "@/components/OffersSection";
import { InvestmentCalculator } from "@/components/InvestmentCalculator";
import { CTASection } from "@/components/CTASection";
import { TickerDivider } from "@/components/TickerDivider";
import { ClosingSection } from "@/components/ClosingSection";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>

        {/* Hero + Problem section combined */}
        <HeroSection />

      </div>

      {/* Offers section — Grow your wealth as an NRI */}
      <OffersSection />

      {/* Third section — investment calculator */}
      <InvestmentCalculator />

      {/* Spacer between calculator and CTA */}
      <div className="w-full h-[100px] bg-[#FFC400]" />

      {/* Fourth section — CTA / WhatsApp community */}
      <CTASection />

      {/* Looping ticker divider */}
      <TickerDivider />

      {/* Closing quote + footer, merged into one gradient container */}
      <ClosingSection />
    </main>
  );
}
