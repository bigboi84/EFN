import { useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "motion/react";
import { Handshake } from "lucide-react";
import { ZONES } from "../data";
import { Section, SectionHead, Reveal, ease } from "./ui";
import { sfx } from "../lib/sound";

const VERBS = ["Train", "Compete", "Watch", "Eat", "Meet"];

function Verb({ word, i, progress }: { word: string; i: number; progress: MotionValue<number> }) {
  const start = 0.12 + i * 0.1;
  const opacity = useTransform(progress, [start, start + 0.12], [0.14, 1]);
  const x = useTransform(progress, [start, start + 0.12], [-24, 0]);
  return (
    <motion.span className="verb" style={{ opacity, x }}>
      {word}
      <span className="verb__dot">.</span>
    </motion.span>
  );
}

export function What() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <Section id="what" className="what">
      <div className="wrap what__inner" ref={ref}>
        <div className="what__verbs" aria-label="Train, compete, watch, eat, meet.">
          {VERBS.map((v, i) => (
            <Verb key={v} word={v} i={i} progress={scrollYProgress} />
          ))}
        </div>
        <Reveal className="what__copy">
          <p className="px what__label">Not a cybercafé · not a casual hangout</p>
          <p className="what__big">
            The Arena &amp; Lounge is the physical heart of EFN. It is the place players train, compete, watch, eat and
            meet, with supervised floors and a café that feeds the whole room.
          </p>
          <p className="what__small">
            It runs every day as a gaming and food venue, then switches into tournament mode on event days. Tournaments
            also run at partner venues and online, so EFN reaches players across Trinidad &amp; Tobago.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

const colorVar = { red: "var(--red)", gold: "var(--gold)", cyan: "var(--cyan)" };

export function Zones() {
  const [sel, setSel] = useState(0);
  const zone = ZONES[sel];
  const Icon = zone.icon;

  const pick = (i: number) => {
    if (i === sel) return;
    setSel(i);
    sfx.select();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const cols = window.matchMedia("(max-width: 720px)").matches ? 3 : 2;
    const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols };
    const d = moves[e.key];
    if (d === undefined) return;
    e.preventDefault();
    const next = (sel + d + ZONES.length) % ZONES.length;
    pick(next);
    const btns = e.currentTarget.querySelectorAll<HTMLButtonElement>("button");
    btns[next]?.focus();
  };

  return (
    <Section id="zones" className="zones" achievement="Zone explorer: six zones discovered">
      <div className="wrap">
        <SectionHead
          level="02"
          kicker="The Arena & Lounge"
          title={
            <>
              Select your <span className="hl-gold">zone</span>
            </>
          }
          lede="Six zones under one roof. Gaming is the headline act, with food, a stage, family game shows, learning and a private room around it. There is something for every visitor, every day."
        />

        <div className="zones__grid">
          <Reveal className="zones__picker">
            <div className="zones__tiles" role="tablist" aria-label="Arena zones" onKeyDown={onKey}>
              {ZONES.map((z, i) => {
                const ZIcon = z.icon;
                const on = i === sel;
                return (
                  <button
                    key={z.id}
                    role="tab"
                    id={`zone-tab-${z.id}`}
                    aria-selected={on}
                    aria-controls="zone-panel"
                    tabIndex={on ? 0 : -1}
                    className={`tile ${on ? "is-on" : ""}`}
                    style={{ ["--c" as string]: colorVar[z.color] }}
                    onClick={() => pick(i)}
                    onMouseEnter={() => pick(i)}
                  >
                    {on && (
                      <motion.span layoutId="zone-cursor" className="tile__cursor" transition={{ type: "spring", stiffness: 420, damping: 32 }}>
                        <span className="px tile__p1">P1</span>
                      </motion.span>
                    )}
                    <ZIcon className="tile__icon" size={30} strokeWidth={1.6} />
                    <span className="tile__name">{z.short}</span>
                    <span className="px tile__num">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
            <p className="zones__help px">Tap, hover or use arrow keys to switch</p>
          </Reveal>

          <Reveal delay={0.1} className="zones__detail-wrap">
            <div
              className="panel zones__detail"
              id="zone-panel"
              role="tabpanel"
              aria-labelledby={`zone-tab-${zone.id}`}
              style={{ ["--c" as string]: colorVar[zone.color] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease }}
                  className="zd"
                >
                  <div className="zd__top">
                    <motion.div
                      className="zd__emblem"
                      initial={{ rotate: -90, scale: 0.4 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 16 }}
                    >
                      <Icon size={44} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <p className="px zd__count">
                        Zone {String(sel + 1).padStart(2, "0")} / {String(ZONES.length).padStart(2, "0")}
                      </p>
                      <h3 className="zd__name">{zone.name}</h3>
                    </div>
                  </div>
                  <p className="zd__offers">{zone.offers}</p>
                  <div className="zd__row">
                    <p className="px zd__label">Used for</p>
                    <ul className="chips">
                      {zone.usedFor.map((u, k) => (
                        <motion.li
                          key={u}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + k * 0.06 }}
                        >
                          {u}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="zd__partner">
                    <Handshake size={18} />
                    <span className="px">Partner fit</span>
                    <strong>{zone.partnerFit}</strong>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
