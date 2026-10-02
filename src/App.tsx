import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Trophy } from "lucide-react";
import { Intro } from "./components/Intro";
import { Hud } from "./components/Hud";
import { Hero, Ticker } from "./components/Hero";
import { What, Zones } from "./components/Zones";
import { Hub } from "./components/Hub";
import { Bowl } from "./components/Spaces";
import { Schedule } from "./components/Schedule";
import { Standards } from "./components/Membership";
import { Partners, NextLevel, Finale, Footer } from "./components/Partners";
import { LevelSelect } from "./components/PageKit";
import { AchievementCtx } from "./components/ui";
import { sfx } from "./lib/sound";
import { useRoute } from "./lib/router";
import { PAGES } from "./data";
import { TournamentsPage, FoodPage, GamesPage, GameShowPage, MembershipPage, AboutPage, NextGenPage } from "./pages";

const PAGE_VIEWS = {
  tournaments: TournamentsPage,
  food: FoodPage,
  games: GamesPage,
  gameshow: GameShowPage,
  membership: MembershipPage,
  about: AboutPage,
  nextgen: NextGenPage,
};

type Toast = { id: number; label: string };

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function App() {
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [party, setParty] = useState(false);
  const seen = useRef(new Set<string>());
  const route = useRoute();
  const [wipe, setWipe] = useState<string | null>(null);
  const first = useRef(true);

  // Page changes: play the level-loading wipe and start at the top; home anchors scroll to their section.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (route.page !== "home" || !route.anchor) {
      const label = route.page === "home" ? "Arena map" : PAGES.find((p) => p.id === route.page)!.label;
      setWipe(label);
      sfx.select();
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      const t = window.setTimeout(() => setWipe(null), 650);
      return () => window.clearTimeout(t);
    }
    const id = route.anchor;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
    return () => window.clearTimeout(t);
  }, [route.page, route.anchor]);

  // In-page anchors (#book-tournament, #menu...) scroll without changing the route.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || PAGES.some((p) => p.id === id)) return;
      const el = document.getElementById(id);
      if (el && route.page !== "home") {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [route.page]);

  const PageView = route.page === "home" ? null : PAGE_VIEWS[route.page];

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
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <motion.div
              key={`hud-${run}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{ position: "relative", zIndex: 50 }}
            >
              <Hud page={route.page} />
            </motion.div>
            <motion.div
              key={`site-${run}`}
              className="site"
              initial={{ opacity: 0, scale: 1.12, filter: "brightness(2.4) blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <main key={route.page} id="main">
                {PageView ? (
                  <PageView />
                ) : (
                  <>
                    <Hero />
                    <Ticker />
                    <What />
                    <Bowl />
                    <LevelSelect />
                    <Zones />
                    <Hub />
                    <Schedule />
                    <Standards />
                    <Partners />
                    <NextLevel />
                    <Finale onReplay={replay} />
                  </>
                )}
              </main>
              <Footer />
            </motion.div>
          </>
        )}

        <AnimatePresence>
          {wipe && (
            <motion.div
              key={wipe}
              className="wipe"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ clipPath: "inset(0 0 0 100%)" }}
              transition={{ duration: 0.32, ease: [0.7, 0, 0.3, 1] }}
              aria-hidden="true"
            >
              <span className="px wipe__k">Loading level</span>
              <span className="wipe__t">{wipe}</span>
              <span className="wipe__bar" />
            </motion.div>
          )}
        </AnimatePresence>

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
