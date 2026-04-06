import Image from "next/image";
import styles from "./page.module.css";

type ProblemCardData = {
  id: "kyc" | "fund" | "advisor" | "tax";
  size: "large" | "compact";
  title: string;
  description: string;
  image: string;
};

const problemCards: ProblemCardData[] = [
  {
    id: "kyc",
    size: "large",
    title: "Complex KYC\n& Paperwork",
    description:
      "Reams of documents, overseas notarisation, and bank rejections. We walk you through every form, step by step.",
    image: "/figma/kyc-card-bg.png",
  },
  {
    id: "fund",
    size: "large",
    title: "Which Fund Do\nI Even Pick?",
    description:
      "Hundreds of funds, zero guidance. We curate portfolios specifically designed for NRI risk profiles and goals.",
    image: "/figma/fund-card-bg.png",
  },
  {
    id: "advisor",
    size: "compact",
    title: "No Trusted Advisor\nAbroad",
    description:
      "Local advisors do not understand Indian markets. We are your certified guide with deep expertise.",
    image: "/figma/advisor-card-bg.png",
  },
  {
    id: "tax",
    size: "compact",
    title: "Repatriation & Tax\nConfusion",
    description:
      "DTAA, TDS, and FEMA sound scary. We simplify the cross-border tax picture so your money moves freely.",
    image: "/figma/tax-card-bg.png",
  },
];

const fundBars = [14, 16, 20, 24, 26, 32, 42, 54];

const orbitAvatars = [
  { className: "avatarOne", src: "/figma/avatar-1.png" },
  { className: "avatarTwo", src: "/figma/avatar-2.png" },
  { className: "avatarThree", src: "/figma/avatar-3.png" },
  { className: "avatarFour", src: "/figma/avatar-4.png" },
  { className: "avatarFive", src: "/figma/avatar-5.png" },
  { className: "avatarSix", src: "/figma/avatar-6.png" },
  { className: "avatarSeven", src: "/figma/avatar-7.png" },
  { className: "avatarEight", src: "/figma/avatar-8.png" },
] as const;

function ProblemCard({ card }: { card: ProblemCardData }) {
  return (
    <article
      className={`${styles.problemCard} ${styles[card.size]} ${styles[card.id]}`}
    >
      <Image
        src={card.image}
        alt=""
        fill
        sizes="(max-width: 480px) 44vw, 180px"
        className={styles.cardBackground}
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardDescription}>{card.description}</p>
      </div>

      {card.id === "kyc" ? (
        <div className={styles.paperStack}>
          <Image
            src="/figma/kyc-paper.png"
            alt=""
            width={126}
            height={128}
            className={styles.paperImage}
          />
        </div>
      ) : null}

      {card.id === "fund" ? (
        <div className={styles.fundPreview}>
          <div className={styles.fundPreviewHeader}>
            <div className={styles.fundBadge}>PP</div>
            <div className={styles.fundCopy}>
              <strong>Parag Parikh Flexi</strong>
              <span>Commodities • Silver</span>
            </div>
          </div>
          <div className={styles.fundStats}>
            <strong>48.4%</strong>
            <span>3Y annualised</span>
          </div>
          <div className={styles.fundGraph}>
            {fundBars.map((height, index) => (
              <span key={index} style={{ height }} />
            ))}
            <div className={styles.fundTag}>₹234</div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.whatsAppIcon}
    >
      <path
        fill="currentColor"
        d="M19.05 4.94A9.94 9.94 0 0 0 12 2a10 10 0 0 0-8.67 15l-1.3 4.76 4.87-1.28A10 10 0 1 0 19.05 4.94ZM12 20.12a8.08 8.08 0 0 1-4.12-1.13l-.3-.18-2.89.76.77-2.81-.2-.29A8.12 8.12 0 1 1 12 20.12Zm4.45-5.93c-.24-.12-1.43-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.49-.4-.42-.54-.43h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 1.99 0 1.17.86 2.3.98 2.46.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              <span>You earned It abroad</span>
              <span>watch It grow back home</span>
            </h1>
            <p className={styles.heroSubtitle}>
              A simpler way to invest, manage, and stay compliant in India
            </p>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroSun} aria-hidden="true" />
            <div className={styles.heroLandscape}>
              <Image
                src="/figma/landscape.png"
                alt=""
                fill
                priority
                loading="eager"
                sizes="100vw"
                className={styles.landscapeBase}
              />
            </div>

            <div className={styles.phoneFrame}>
              <span className={styles.phoneSpeaker} aria-hidden="true" />
              <Image
                src="/figma/phone-screen.png"
                alt="Desh mobile app preview"
                fill
                priority
                loading="eager"
                sizes="(max-width: 767px) 32vw, (max-width: 1199px) 248px, 318px"
                className={styles.phoneScreen}
              />
            </div>
          </div>
        </section>

        <section className={styles.problemSection}>
          <div className={styles.sectionHeading}>
            <h2>
              <span>Investing in India should not</span>
              <span>feel like a full time job.</span>
            </h2>
            <p>
              Most NRIs give up before they start. Here is what has been holding
              you back and how we fix all of it.
            </p>
          </div>

          <div className={styles.problemGrid}>
            {problemCards.map((card) => (
              <ProblemCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className={styles.growthSection}>
          <div className={styles.growthInner}>
            <h2 className={styles.growthTitle}>
              <span>Investing is the key to</span>
              <span>building wealth.</span>
            </h2>
            <p className={styles.growthSubtitle}>
              Start the plan once, watch your money grow every year after.
            </p>

            <div className={styles.depositMeta}>
              <span>Monthly deposits</span>
              <strong>₹ 4,44,440</strong>
            </div>

            <div className={styles.depositTrack} aria-hidden="true">
              <span className={styles.depositFill} />
              <span className={styles.depositThumb} />
            </div>

            <div className={styles.chartFrame}>
              <Image
                src="/figma/growth-chart.png"
                alt="Projected investment growth chart"
                fill
                sizes="(max-width: 480px) 88vw, 360px"
                className={styles.chartImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.communitySection}>
          <div className={styles.communityTag}>Limited Early Access</div>
          <h2 className={styles.communityTitle}>India is growing, Are you in?</h2>
          <p className={styles.communityBody}>
            Join our exclusive WhatsApp community. Get guided, get invested, and
            build wealth back home from wherever you are in the world.
          </p>

          <div className={styles.orbitStage}>
            <div className={`${styles.orbitRing} ${styles.orbitRingOuter}`} />
            <div className={`${styles.orbitRing} ${styles.orbitRingMid}`} />
            <div className={`${styles.orbitRing} ${styles.orbitRingInner}`} />
            <div className={`${styles.orbitRing} ${styles.orbitRingCore}`} />

            {orbitAvatars.map((avatar, index) => (
              <div
                key={avatar.src}
                className={`${styles.orbitAvatar} ${styles[avatar.className]}`}
                style={{ animationDelay: `${index * 0.25}s` }}
              >
                <Image
                  src={avatar.src}
                  alt={`Community member ${index + 1}`}
                  width={40}
                  height={48}
                />
              </div>
            ))}

            <a
              href="https://www.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
              className={styles.communityButton}
            >
              <WhatsAppIcon />
              <span>Join WhatsApp Community</span>
            </a>
          </div>

          <p className={styles.communityNote}>
            <span>No spam. No sales calls.</span>
            <span>Just expert guidance when you need it.</span>
          </p>
        </section>

        <section className={styles.closingSection}>
          <h2 className={styles.closingTitle}>
            <span>Distance is just geography.</span>
            <span>Your money can still belong here.</span>
          </h2>

          <div className={styles.closingLandscape}>
            <Image
              src="/figma/landscape.png"
              alt=""
              fill
              sizes="(max-width: 480px) 100vw, 430px"
              className={styles.closingLandscapeImage}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
