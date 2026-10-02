import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Trophy } from "lucide-react";
import { Intro } from "./components/Intro";
import { Hud } from "./components/Hud";
import { Hero, Ticker } from "./components/Hero";
import { What, Zones } from "./components/Zones";
import { Hub } from "./components/Hub";
import { Bowl, Cafe, Floor, GameShow } from "./components/Spaces";
import { Schedule } from "./components/Schedule";
import { Modes } from "./components/Modes";
import { Membership, Standards } from "./components/Membership";
import { Partners, NextLevel, Finale, Footer } from "./components/Partners";
import { AchievementCtx } from "./components/ui";
import { sfx } from "./lib/sound";

type Toast = { id: number; label: string };

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function App() {
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [party, setParty] = useState(false);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    document.body.style.overflow = started ? "" : "hidden";
  }, [started]);

  const unlock = useCallback((id: string, label: string) => {
    if (seen.current.has(id)) return;
    seen.current.add(id);
    const t = { id: Date.now() + Math.random(), label };
    setToasts([t]);
    sfx.achievement();
    window.setTimeout(() => setToasts((x) => x.filter((y) => y.id !== t.id)), 3200);
  }, []);

  // Konami code easter egg.
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === KONAMI[pos] ? pos + 1 : k === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        sfx.start();
        setParty(true);
        unlock("konami", "Secret found: +30 lives");
        window.setTimeout(() => setParty(false), 3500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock]);

  const replay = () => {
    window.scrollTo({ top: 0 });
    setStarted(false);
    setRun((r) => r + 1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AchievementCtx.Provider value={unlock}>
        <AnimatePresence>{!started && <Intro key={run} onDone={() => setStarted(true)} />}</AnimatePresence>

        {started && (
          <>
            <a href="#zones" className="skip-link">
              Skip to content
            </a>
            <motion.div
              key={`hud-${run}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{ position: "relative", zIndex: 50 }}
            >
              <Hud />
            </motion.div>
            <motion.div
              key={`site-${run}`}
              className="site"
              initial={{ opacity: 0, scale: 1.12, filter: "brightness(2.4) blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <main>
                <Hero />
                <Ticker />
                <What />
                <Bowl />
                <Cafe />
                <Floor />
                <GameShow />
                <Zones />
                <Hub />
                <Schedule />
                <Modes />
                <Membership />
                <Standards />
                <Partners />
                <NextLevel />
                <Finale onReplay={replay} />
              </main>
              <Footer />
            </motion.div>
          </>
        )}

        <div className="toasts" aria-live="polite">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                className="toast"
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <span className="toast__icon">
                  <Trophy size={18} />
                </span>
                <div>
                  <p className="px toast__k">Achievement unlocked</p>
                  <p className="toast__t">{t.label}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {party && (
          <div className="party" aria-hidden="true">
            {Array.from({ length: 40 }, (_, i) => (
              <span key={i} style={{ ["--i" as string]: i, left: `${(i * 37) % 100}%` }} />
            ))}
          </div>
        )}
      </AchievementCtx.Provider>
    </MotionConfig>
  );
}
