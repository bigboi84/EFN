import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, AnimatePresence } from "motion/react";
import { Token } from "./Token";
import { GameScene } from "./GameScene";
import { sfx, unlockAudio } from "../lib/sound";

type Phase = "idle" | "inserting" | "loading" | "ready" | "entering";

const BOOT_LINES = [
  { at: 12, text: "PC + CONSOLE STATIONS", ok: "ONLINE" },
  { at: 30, text: "CAFÉ KITCHEN", ok: "HOT" },
  { at: 48, text: "STAGE LIGHTS + SCREENS", ok: "LIVE" },
  { at: 64, text: "FAMILY GAME-SHOW BUZZERS", ok: "ARMED" },
  { at: 80, text: "EFN MEDIA STREAM", ok: "ON AIR" },
  { at: 94, text: "FANS CONNECTED", ok: "5,000" },
];

export function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [credits, setCredits] = useState(0);

  const cabRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const spin = useMotionValue(0);
  const spinCtl = useRef<ReturnType<typeof animate> | null>(null);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  }, [onDone]);

  // Idle: the token spins and waits.
  useEffect(() => {
    if (phase !== "idle" || reduce) return;
    spinCtl.current = animate(spin, [spin.get(), spin.get() + 360], {
      duration: 2.2,
      ease: "linear",
      repeat: Infinity,
    });
    return () => spinCtl.current?.stop();
  }, [phase, reduce, spin]);

  const insertCoin = useCallback(async () => {
    if (phase !== "idle") return;
    unlockAudio();
    setPhase("inserting");
    spinCtl.current?.stop();
    const el = coinRef.current;
    if (el && !reduce) {
      const edge = Math.ceil(spin.get() / 360) * 360 + 90;
      animate(spin, edge - 90, { duration: 0.35, ease: "easeOut" });
      await animate(el, { y: 0, scale: 0.86 }, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
      await animate(spin, edge, { duration: 0.16, ease: "easeIn" });
      sfx.coin();
      await animate(el, { y: 26, opacity: 0, scale: 0.6 }, { duration: 0.18, ease: "easeIn" });
    } else {
      sfx.coin();
    }
    setCredits(1);
    setPhase("loading");
  }, [phase, reduce, spin]);

  // Insert automatically if nobody taps the token.
  useEffect(() => {
    if (phase !== "idle") return;
    const t = window.setTimeout(insertCoin, 3800);
    return () => window.clearTimeout(t);
  }, [phase, insertCoin]);

  // Loading bar with boot lines.
  useEffect(() => {
    if (phase !== "loading") return;
    let last = 0;
    const ctl = animate(0, 100, {
      duration: reduce ? 0.6 : 2.6,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => {
        const n = Math.round(v);
        setProgress(n);
        const passed = BOOT_LINES.filter((l) => n >= l.at).length;
        if (passed > last) {
          last = passed;
          sfx.blip();
        }
      },
      onComplete: () => setPhase("ready"),
    });
    return () => ctl.stop();
  }, [phase, reduce]);

  const pressStart = useCallback(async () => {
    if (phase !== "ready") return;
    unlockAudio();
    sfx.start();
    setPhase("entering");
    const cab = cabRef.current;
    const scr = screenRef.current;
    if (cab && scr && !reduce) {
      const c = cab.getBoundingClientRect();
      const s = scr.getBoundingClientRect();
      const ox = ((s.left + s.width / 2 - c.left) / c.width) * 100;
      const oy = ((s.top + s.height / 2 - c.top) / c.height) * 100;
      cab.style.transformOrigin = `${ox}% ${oy}%`;
      const dx = window.innerWidth / 2 - (s.left + s.width / 2);
      const dy = window.innerHeight / 2 - (s.top + s.height / 2);
      const scale = Math.max(window.innerWidth / s.width, window.innerHeight / s.height) * 1.08;
      await new Promise((r) => setTimeout(r, 900));
      await animate(cab, { x: dx, y: dy, scale }, { duration: 1.0, ease: [0.65, 0, 0.35, 1] });
      await new Promise((r) => setTimeout(r, 1150));
    } else {
      await new Promise((r) => setTimeout(r, 400));
    }
    finish();
  }, [phase, reduce, finish]);

  // Keyboard: Enter / Space drive the machine, Escape skips.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return finish();
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (phase === "idle") insertCoin();
      if (phase === "ready") pressStart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, insertCoin, pressStart, finish]);

  const visibleLines = BOOT_LINES.filter((l) => progress >= l.at);
  const hint =
    phase === "idle"
      ? "Tap the token to insert"
      : phase === "ready"
        ? "Press start · Enter ↵"
        : phase === "entering"
          ? "Get ready…"
          : "Loading the arena…";

  return (
    <motion.div
      className={`intro intro--${phase}`}
      role="dialog"
      aria-label="EFN Arena intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__floor" aria-hidden="true" />

      <header className="intro__hud" aria-hidden="true">
        <div>
          <span className="px px--red">1UP</span>
          <span className="px">001000</span>
        </div>
        <div>
          <span className="px px--red">HI-SCORE</span>
          <span className="px">005000</span>
        </div>
        <div>
          <span className="px px--red">CREDIT</span>
          <span className="px">{String(credits).padStart(2, "0")}</span>
        </div>
      </header>

      <button className="intro__skip" onClick={finish}>
        Skip intro <span aria-hidden="true">▸▸</span>
      </button>

      <div className="intro__stage">
        <div className="cab" ref={cabRef}>
          <div className="cab__marquee">
            <span className="cab__marquee-text">EFN ARENA</span>
            <span className="cab__marquee-sub">ESPORTS &amp; FANS NETWORK</span>
          </div>

          <div className="cab__bezel">
            <div
              className="cab__screen crt"
              ref={screenRef}
              onClick={() => (phase === "idle" ? insertCoin() : pressStart())}
            >
              <div className="crt__content">
                <AnimatePresence mode="wait">
                  {(phase === "idle" || phase === "inserting") && (
                    <motion.div
                      key="attract"
                      className="scr scr--attract"
                      exit={{ opacity: 0, scaleY: 0.02, transition: { duration: 0.18 } }}
                    >
                      <div className="scr__logo">EFN</div>
                      <div className="scr__tag">ARENA &amp; LOUNGE</div>
                      <div className="scr__blink px">INSERT COIN</div>
                      <div className="scr__foot px">1 TOKEN = 1 PLAY</div>
                    </motion.div>
                  )}
                  {phase === "loading" && (
                    <motion.div
                      key="loading"
                      className="scr scr--loading"
                      initial={{ opacity: 0, scaleY: 0.02 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="px scr__title">LOADING ARENA</div>
                      <ul className="scr__boot">
                        {visibleLines.map((l) => (
                          <li key={l.text}>
                            <span>&gt; {l.text}</span>
                            <b>{l.ok}</b>
                          </li>
                        ))}
                      </ul>
                      <div className="scr__bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                        {Array.from({ length: 20 }, (_, i) => (
                          <i key={i} className={progress >= (i + 1) * 5 ? "on" : ""} />
                        ))}
                      </div>
                      <div className="px scr__pct">{String(progress).padStart(3, "0")}%</div>
                    </motion.div>
                  )}
                  {phase === "ready" && (
                    <motion.div
                      key="ready"
                      className="scr scr--ready"
                      initial={{ opacity: 0, scale: 1.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <div className="scr__player px">PLAYER 1</div>
                      <button
                        className="scr__start px"
                        onClick={(e) => {
                          e.stopPropagation();
                          pressStart();
                        }}
                        autoFocus
                      >
                        PRESS START
                      </button>
                      <div className="scr__foot px">© 2026 EFN · TRINIDAD &amp; TOBAGO</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {phase === "entering" && !reduce && <GameScene duration={3050} />}
            </div>
          </div>

          <div className="cab__panel" aria-hidden="true">
            <div className="cab__stick">
              <span className="cab__stick-ball" />
            </div>
            <div className="cab__buttons">
              <span className="btn-a" />
              <span className="btn-b" />
              <span className="btn-c" />
            </div>
            <span className={`cab__startbtn ${phase === "ready" ? "is-live" : ""}`}>START</span>
          </div>

          <div className="cab__body">
            <div className="cab__door">
              <div className="cab__slots">
                <div className={`cab__slot ${phase === "inserting" ? "is-hot" : ""} ${credits ? "is-paid" : ""}`}>
                  <span className="cab__slot-slit" />
                  <span className="cab__slot-label px">{credits ? "PAID" : "TOKEN"}</span>
                  {(phase === "idle" || phase === "inserting") && (
                    <div className="coin-anchor">
                      <motion.div
                        ref={coinRef}
                        className="coin-move"
                        initial={{ y: 118, scale: 1.45, opacity: 1 }}
                      >
                        <button
                          className="coin-btn"
                          onClick={insertCoin}
                          aria-label="Insert token"
                          disabled={phase !== "idle"}
                        >
                          <motion.span className="coin-spin" style={{ rotateY: spin }}>
                            <Token size={56} />
                          </motion.span>
                        </button>
                      </motion.div>
                    </div>
                  )}
                </div>
                <div className="cab__slot is-dead">
                  <span className="cab__slot-slit" />
                  <span className="cab__slot-label px">TOKEN</span>
                </div>
              </div>

              <div className="cab__return" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <p className="intro__hint px" aria-live="polite">
        {hint}
      </p>
    </motion.div>
  );
}
