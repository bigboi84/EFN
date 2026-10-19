import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Photo } from "../../../src/components/ui";
import { FAQS, MARQUEE } from "../data";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

type Tone = "white" | "mist" | "navy" | "gold";

export function Sec({ id, tone = "white", className = "", children }: { id?: string; tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`sec sec--${tone} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Head({
  eyebrow,
  title,
  lede,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <Reveal className={`head head--${align}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="head__title">{title}</h2>
        {lede && <p className="head__lede">{lede}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function PageHero({
  image,
  eyebrow,
  title,
  lede,
  children,
}: {
  image: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="phero">
      <motion.div className="phero__img" initial={{ scale: 1.12 }} animate={{ scale: 1.02 }} transition={{ duration: 5, ease: "easeOut" }}>
        <Photo name={image} alt="" eager />
      </motion.div>
      <div className="phero__shade" />
      <div className="wrap phero__in">
        <motion.p className="eyebrow eyebrow--light" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.1 }}>
          {eyebrow}
        </motion.p>
        <motion.h1 className="phero__title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.18 }}>
          {title}
        </motion.h1>
        <motion.p className="phero__lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.28 }}>
          {lede}
        </motion.p>
        {children && (
          <motion.div className="row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.38 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function Btn({
  href,
  tone = "red",
  small,
  children,
  onClick,
  type,
  disabled,
  className = "",
}: {
  href?: string;
  tone?: "red" | "gold" | "navy" | "ghost" | "white";
  small?: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const cls = `btn btn--${tone}${small ? " btn--sm" : ""}${className ? ` ${className}` : ""}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Marquee({ tone = "gold" }: { tone?: "gold" | "navy" }) {
  const row = [...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className={`marquee marquee--${tone}`} aria-hidden="true">
      <div className="marquee__track">
        {row.map((w, i) => (
          <span key={i} className="marquee__item">
            {w}
            <i>★</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CtaBand({ title, body, cta = "Plan my visit", href = "#book" }: { title: ReactNode; body: string; cta?: string; href?: string }) {
  return (
    <section className="cta">
      <div className="wrap cta__in">
        <Reveal className="cta__copy">
          <h2 className="cta__title">{title}</h2>
          <p>{body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Btn href={href} tone="gold">
            {cta} <ArrowRight size={18} />
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="faq">
      {FAQS.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className={on ? "is-open" : ""}>
            <button className="faq__q" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? null : i)}>
              <span>{f.q}</span>
              <ChevronDown size={20} className="faq__chev" />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`faq-${i}`}
                  className="faq__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/** Small CSS arcade token used in the logo and card art. */
export function Coin({ size = 28 }: { size?: number }) {
  return (
    <span className="coin" style={{ width: size, height: size, fontSize: size }} aria-hidden="true">
      <span className="coin__in">E</span>
    </span>
  );
}
