import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PAGES, type PageId } from "../data";
import { Photo, Reveal, Section, SectionHead, ease } from "./ui";

const colorVar = { red: "var(--red)", gold: "var(--gold)", cyan: "var(--cyan)" };

export function PageHero({
  page,
  title,
  lede,
  image,
  children,
}: {
  page: PageId;
  title: ReactNode;
  lede: string;
  image: string;
  children?: ReactNode;
}) {
  const idx = PAGES.findIndex((p) => p.id === page);
  const meta = PAGES[idx];
  return (
    <section className="phero" id="top" style={{ ["--c" as string]: colorVar[meta.color] }}>
      <div className="phero__bg" aria-hidden="true">
        <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1.03 }} transition={{ duration: 6, ease: "easeOut" }} className="phero__img">
          <Photo name={image} alt="" eager />
        </motion.div>
        <div className="phero__shade" />
        <div className="hero__scan" />
      </div>
      <div className="wrap phero__inner">
        <motion.a href="#" className="phero__back px" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <ArrowLeft size={14} /> Arena map
        </motion.a>
        <motion.p className="shead__kicker px" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.25 }}>
          <span className="shead__lvl shead__lvl--static">Stage {String(idx + 1).padStart(2, "0")}</span>
          <span>{meta.label}</span>
        </motion.p>
        <motion.h1 className="phero__title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.32 }}>
          {title}
        </motion.h1>
        <motion.p className="phero__lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.45 }}>
          {lede}
        </motion.p>
        {children && (
          <motion.div className="hero__ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.55 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** "Next stage" footer link at the bottom of each page. */
export function NextStage({ page }: { page: PageId }) {
  const idx = PAGES.findIndex((p) => p.id === page);
  const next = PAGES[(idx + 1) % PAGES.length];
  return (
    <a href={`#${next.id}`} className="nextstage" style={{ ["--c" as string]: colorVar[next.color] }}>
      <Photo name={next.image} alt="" sizes="100vw" />
      <span className="nextstage__shade" />
      <span className="wrap nextstage__inner">
        <span className="px">Next stage</span>
        <span className="nextstage__title">
          {next.label} <ArrowRight size={36} />
        </span>
        <span className="nextstage__blurb">{next.blurb}</span>
      </span>
    </a>
  );
}

/** Home-page grid linking to every page. */
export function LevelSelect() {
  return (
    <Section id="levels" className="levels" achievement="Level select: seven stages unlocked">
      <div className="wrap">
        <SectionHead
          level="03"
          kicker="Explore the Arena"
          title={
            <>
              Choose your <span className="hl-gold">stage</span>
            </>
          }
          lede="Every part of EFN has its own stage. Pick one to dive in."
        />
        <div className="levels__grid">
          {PAGES.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06} className={`levels__cell levels__cell--${i}`}>
              <a href={`#${p.id}`} className="lcard" style={{ ["--c" as string]: colorVar[p.color] }}>
                <Photo name={p.image} alt="" sizes="(max-width: 720px) 100vw, 33vw" />
                <span className="lcard__shade" />
                <span className="lcard__body">
                  <span className="px lcard__n">Stage {String(i + 1).padStart(2, "0")}</span>
                  <span className="lcard__title">{p.label}</span>
                  <span className="lcard__blurb">{p.blurb}</span>
                </span>
                <span className="lcard__go" aria-hidden="true">
                  <ArrowRight size={20} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
