import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { PAGES, type PageId } from "../data";
import { isMuted, setMuted, sfx, unlockAudio } from "../lib/sound";

export function Hud({ page }: { page: PageId | "home" }) {
  const { scrollYProgress } = useScroll();
  const xp = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [level, setLevel] = useState(1);
  const [muted, setM] = useState(isMuted());
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setLevel(els.indexOf(e.target as HTMLElement) + 1);
        });
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
  }, [page]);


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
        <a href="#" className="hud__brand" aria-label="EFN Arena & Lounge home">
          <span className="hud__mark">EFN</span>
          <span className="hud__name">
            Arena <em>&amp;</em> Lounge
          </span>
        </a>

        <nav className="hud__nav" aria-label="Sections">
          {PAGES.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={page === n.id ? "is-active" : ""} aria-current={page === n.id ? "page" : undefined}>
              {page === n.id && <motion.span layoutId="nav-cursor" className="hud__cursor" />}
              <span>{n.short}</span>
            </a>
          ))}
        </nav>

        <div className="hud__right">
          <button className="icon-btn" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} aria-pressed={!muted}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <a href="#about" className="btn btn--red btn--sm hud__cta">
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
            <a href="#" onClick={() => setOpen(false)}>
              <span className="px">00</span>
              Arena map
            </a>
            {PAGES.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} aria-current={page === n.id ? "page" : undefined}>
                <span className="px">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </a>
            ))}
            <a href="#about" className="btn btn--red" onClick={() => setOpen(false)}>
              Partner with EFN
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
