import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { NAV } from "../data";
import { isMuted, setMuted, sfx, unlockAudio } from "../lib/sound";

export function Hud() {
  const { scrollYProgress } = useScroll();
  const xp = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [active, setActive] = useState("");
  const [muted, setM] = useState(isMuted());
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const level = Math.max(1, NAV.findIndex((n) => n.id === active) + 2);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setM(next);
    if (!next) {
      unlockAudio();
      sfx.select();
    }
  };

  return (
    <header className={`hud ${scrolled ? "is-scrolled" : ""}`}>
      <div className="hud__inner">
        <a href="#top" className="hud__brand" aria-label="EFN Arena & Lounge, back to top">
          <span className="hud__mark">EFN</span>
          <span className="hud__name">
            Arena <em>&amp;</em> Lounge
          </span>
        </a>

        <nav className="hud__nav" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "is-active" : ""}>
              {active === n.id && <motion.span layoutId="nav-cursor" className="hud__cursor" />}
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="hud__right">
          <button className="icon-btn" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} aria-pressed={!muted}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <a href="#partners" className="btn btn--red btn--sm hud__cta">
            Partner with EFN
          </a>
          <button className="icon-btn hud__menu" onClick={() => setOpen((o) => !o)} aria-label="Open menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="hud__xp" aria-hidden="true">
        <span className="px hud__lvl">LVL {String(level).padStart(2, "0")}</span>
        <div className="hud__xp-track">
          <motion.div className="hud__xp-fill" style={{ scaleX: xp }} />
        </div>
        <span className="px hud__lvl">XP</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="hud__sheet"
            aria-label="Sections"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
                <span className="px">{String(i + 2).padStart(2, "0")}</span>
                {n.label}
              </a>
            ))}
            <a href="#partners" className="btn btn--red" onClick={() => setOpen(false)}>
              Partner with EFN
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
