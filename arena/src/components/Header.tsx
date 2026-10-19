import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, MapPin } from "lucide-react";
import { NAV, type PageId } from "../data";
import { Btn } from "./kit";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className={`logo${light ? " logo--light" : ""}`} aria-label="EFN Arena home">
      <span className="logo__tag">
        <span className="logo__efn">EFN</span>
        <span className="logo__arena">ARENA</span>
      </span>
    </a>
  );
}

const LEFT: PageId[] = ["play", "birthdays", "groups", "leagues", "eat"];
const RIGHT: PageId[] = ["cards", "deals"];

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

  const link = (id: PageId) => {
    const n = NAV.find((x) => x.id === id)!;
    return (
      <a key={id} href={`#${id}`} className={page === id ? "is-on" : ""} aria-current={page === id ? "page" : undefined}>
        {n.label}
      </a>
    );
  };

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}`}>
      <div className="bar">
        <div className="bar__in">
          <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
          <nav className="nav nav--l" aria-label="Main">
            {LEFT.map(link)}
          </nav>
          <Logo />
          <nav className="nav nav--r" aria-label="More">
            <a href="#book" className={page === "book" ? "is-on is-strong" : "is-strong"}>
              Book a table
            </a>
            {RIGHT.map(link)}
            <a href="#visit" className="nav__pill">
              <MapPin size={16} /> Visit
            </a>
          </nav>
          <Btn href="#book" small className="bar__book">
            Book now
          </Btn>
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
