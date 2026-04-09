import styles from "./page.module.css";
import { HeroSection } from "@/components/HeroSection";
import { InvestmentCalculator } from "@/components/InvestmentCalculator";
import { ProblemSection } from "@/components/ProblemSection";
import { CTASection } from "@/components/CTASection";
import { QuoteSection } from "@/components/QuoteSection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>

        {/* Hero — stays pinned while second section scrolls over it */}
        <div className={styles.heroWrapper}>
          <HeroSection />
        </div>

        {/* Second section — white card that slides over the hero */}
        <section className={styles.problemSection}>
          <ProblemSection />
        </section>

      </div>

      {/* Third section — investment calculator */}
      <InvestmentCalculator />

      {/* Spacer between calculator and CTA */}
      <div className="w-full h-[100px] bg-[#FFC400]" />

      {/* Fourth section — CTA / WhatsApp community */}
      <CTASection />

      {/* Quote section */}
      <QuoteSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
