import { useEffect, useRef, useState } from "react";
import { animate, motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ChevronRight, Pause, Play } from "lucide-react";
import { TARGETS } from "../data";
import { ease, Photo, mediaUrl, hasMedia } from "./ui";

const WORDS = ["Esports", "Food", "Game Shows", "Finals", "Trivia", "Scrims", "Family Fun"];

function Counter({ to, label, color }: { to: number; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <div className={`obj obj--${color}`} ref={ref}>
      <div className="obj__head">
        <span className="px">{label}</span>
        <span className="px obj__target">TARGET</span>
      </div>
      <div className="obj__num">{n.toLocaleString("en-US")}</div>
      <div className="obj__bar">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />
      </div>
    </div>
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % WORDS.length), 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <motion.div className="hero__photos" style={{ y: photoY }}>
          {reduce ? (
            <div className="hero__photo">
              <Photo name="oval-wide" alt="" eager />
            </div>
          ) : (
            <video
              ref={video}
              className="hero__video"
              poster={mediaUrl("hero-poster.webp")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              {hasMedia("hero-loop.webm") && <source src={mediaUrl("hero-loop.webm")} type="video/webm" />}
              <source src={mediaUrl("hero-loop.mp4")} type="video/mp4" />
            </video>
          )}
        </motion.div>
        <div className="hero__scan" />
        <motion.div className="hero__grid" style={{ y: gridY }} />
        <div className="hero__haze" />
      </div>

      {!reduce && (
        <button className="hero__playbtn" onClick={togglePlay} aria-label={playing ? "Pause background video" : "Play background video"}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}

      <div className="wrap hero__inner">
        <div className="hero__copy">
          <motion.p
            className="hero__eyebrow px"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <span className="dot" /> Trinidad &amp; Tobago
          </motion.p>

          <h1 className="hero__title">
            <motion.span
              className="hero__line"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              One arena.
            </motion.span>
            <motion.span
              className="hero__line"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.42 }}
            >
              Endless
            </motion.span>
            <motion.span
              className="hero__line hero__swap"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.54 }}
            >
              <span className="hero__swap-in">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[i]}
                    className="hero__word"
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-70%", opacity: 0 }}
                    transition={{ duration: 0.38, ease }}
                  >
                    {WORDS[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
          >
            The EFN Arena &amp; Lounge is the home of Esports &amp; Fans Network: a premium, supervised gaming venue with a
            café, a competition stage, a family game-show zone, a learning corner and a private room. Open every day for
            play and food. EFN's tournament venue on event days.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
          >
            <a href="#levels" className="btn btn--gold">
              Enter the Arena <ChevronRight size={18} />
            </a>
            <a href="#partners" className="btn btn--ghost">
              See partner opportunities
            </a>
          </motion.div>
        </div>

        <motion.aside
          className="panel hero__panel"
          aria-label="Arena goals"
          initial={{ opacity: 0, x: 40, rotateY: -12 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
        >
          <div className="panel__bar">
            <span className="px">Arena goals</span>
            <span className="panel__lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <Counter to={TARGETS.players} label="Players" color="red" />
          <Counter to={TARGETS.fans} label="Fans" color="gold" />
          <dl className="hero__mini">
            <div>
              <dt className="px">Zones</dt>
              <dd>6</dd>
            </div>
            <div>
              <dt className="px">Tournament formats</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt className="px">Member tiers</dt>
              <dd>2</dd>
            </div>
            <div>
              <dt className="px">Open</dt>
              <dd>Daily</dd>
            </div>
          </dl>
        </motion.aside>
      </div>

    </section>
  );
}

export function Ticker() {
  const items = ["Play", "Eat", "Compete", "Watch", "Learn", "Meet", "Repeat"];
  const row = [...items, ...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {row.map((w, k) => (
          <span key={k} className="ticker__item">
            {w}
            <i className="ticker__sep">◆</i>
          </span>
        ))}
      </div>
    </div>
  );
}
