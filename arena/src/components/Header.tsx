import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Clock, Gift, Tag } from "lucide-react";
import { NAV, type PageId } from "../data";
import { Btn, Coin } from "./kit";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className={`logo${light ? " logo--light" : ""}`} aria-label="EFN Arena home">
      <Coin size={34} />
      <span className="logo__words">
        <span className="logo__efn">EFN</span>
        <span className="logo__arena">ARENA</span>
      </span>
    </a>
  );
}

export function Header({ page }: { page: PageId | "home" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [page]);

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}`}>
      <div className="util">
        <div className="wrap util__in">
          <p className="util__hours">
            <Clock size={14} /> Open daily. Hours and address announced at launch
          </p>
          <nav className="util__links" aria-label="Quick links">
            <a href="#cards">
              <Gift size={14} /> Gift &amp; play cards
            </a>
            <a href="#deals">
              <Tag size={14} /> Deals
            </a>
          </nav>
        </div>
      </div>
      <div className="bar">
        <div className="wrap bar__in">
          <Logo />
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={page === n.id ? "is-on" : ""} aria-current={page === n.id ? "page" : undefined}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="bar__right">
            <Btn href="#book" small>
              Book now
            </Btn>
            <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="sheet" aria-label="Menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} aria-current={page === n.id ? "page" : undefined}>
                {n.label}
              </a>
            ))}
            <Btn href="#book">Book now</Btn>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
