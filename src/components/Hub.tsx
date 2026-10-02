import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { HUB } from "../data";
import { Section, SectionHead, Reveal } from "./ui";

// Node positions on the orbit (percent of the square stage): top, right, bottom, left.
const POS = [
  { x: 50, y: 9 },
  { x: 91, y: 50 },
  { x: 50, y: 91 },
  { x: 9, y: 50 },
];

export function Hub() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (!inView || hover) return;
    const t = setInterval(() => setActive((a) => (a + 1) % HUB.length), 2600);
    return () => clearInterval(t);
  }, [inView, hover]);

  return (
    <Section id="hub" className="hub" achievement="Big picture: the flywheel is spinning">
      <div className="wrap">
        <SectionHead
          level="07"
          kicker="Structure"
          title={
            <>
              The hub that <span className="hl-red">powers</span> everything
            </>
          }
          lede="The Arena is the hub. Tournaments, membership, media and education all run through it, and each one feeds the next."
        />

        <div className="hub__grid">
          <Reveal className="hub__stage-wrap">
            <div className="hub__stage" ref={ref} onMouseLeave={() => setHover(false)}>
              <svg viewBox="0 0 100 100" className="hub__svg" aria-hidden="true">
                <defs>
                  <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" style={{ stopColor: "var(--red)" }} />
                    <stop offset="50%" style={{ stopColor: "var(--gold)" }} />
                    <stop offset="100%" style={{ stopColor: "var(--cyan)" }} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="41" fill="none" style={{ stroke: "var(--line)" }} strokeWidth="0.4" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.6" className="hub__flow" />
                {POS.map((p, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    style={{ stroke: i === active ? "var(--gold)" : "var(--line)" }}
                    strokeWidth={i === active ? 0.6 : 0.3}
                    strokeDasharray="1 1.5"
                    className="hub__spoke"
                  />
                ))}
                <circle cx="50" cy="50" r="29" fill="none" style={{ stroke: "var(--line)" }} strokeWidth="0.25" strokeDasharray="0.6 1.2" />
              </svg>

              <motion.div
                className="hub__orbiter"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 10.4, ease: "linear", repeat: Infinity }}
              >
                <span />
              </motion.div>

              <div className="hub__core">
                <span className="px hub__core-k">The hub</span>
                <strong>Arena &amp; Lounge</strong>
                <span className="hub__core-pulse" aria-hidden="true" />
              </div>

              {HUB.map((n, i) => {
                const Icon = n.icon;
                return (
                  <button
                    key={n.id}
                    className={`hub__node ${i === active ? "is-on" : ""}`}
                    style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                    onMouseEnter={() => {
                      setHover(true);
                      setActive(i);
                    }}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                  >
                    <Icon size={22} strokeWidth={1.7} />
                    <span>{n.name}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="hub__steps">
              {HUB.map((n, i) => (
                <li
                  key={n.id}
                  className={i === active ? "is-on" : ""}
                  onMouseEnter={() => {
                    setHover(true);
                    setActive(i);
                  }}
                  onMouseLeave={() => setHover(false)}
                >
                  <span className="px hub__step-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{n.name}</strong>
                    <p>{n.line}</p>
                  </div>
                  {i === active && <motion.span layoutId="hub-bar" className="hub__step-bar" />}
                </li>
              ))}
            </ol>
            <p className="hub__loop px">↻ Every loop grows the community</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
