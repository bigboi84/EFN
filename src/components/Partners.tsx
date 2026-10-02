import { motion } from "motion/react";
import { CalendarDays, Trophy, Radio, ShieldCheck, MapPinned, Zap, Lock, Mail, Phone, RotateCcw, ArrowUp } from "lucide-react";
import { POWER_UPS, TO_CONFIRM, CONTACT, TARGETS } from "../data";
import { Section, SectionHead, Reveal } from "./ui";
import { Token } from "./Token";

const REASONS = [
  { icon: CalendarDays, title: "Open every day", body: "Daily play and café traffic, not just event-day spikes." },
  { icon: Trophy, title: "A big moment monthly", body: "Tournaments and finals on the Arena stage." },
  { icon: Radio, title: "Content from every event", body: "Streamed on Twitch and YouTube by EFN Media." },
  { icon: ShieldCheck, title: "Trusted by families", body: "Supervised floors, safeguarding and a code of conduct." },
  { icon: MapPinned, title: "Nationwide reach", body: "Partner venues and online brackets across T&T." },
];

export function Partners() {
  return (
    <Section id="partners" className="partners" achievement="Power-up found: partner opportunities">
      <div className="wrap">
        <SectionHead
          level="12"
          kicker="For sponsors & partners"
          title={
            <>
              Grab a <span className="hl-gold">power-up</span>
            </>
          }
          lede={`Phase 1 is built to reach ${TARGETS.players.toLocaleString("en-US")} players and ${TARGETS.fans.toLocaleString("en-US")} fans. Partners get a brand presence in a venue people use every day, plus the big nights on stage and on stream.`}
        />

        <Reveal className="reasons">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="reason">
                <Icon size={22} strokeWidth={1.7} />
                <strong>{r.title}</strong>
                <p>{r.body}</p>
              </div>
            );
          })}
        </Reveal>

        <div className="powerups">
          {POWER_UPS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08}>
              <motion.article
                className={`pu pu--${p.color}`}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <div className="pu__top">
                  <span className="pu__icon">
                    <Zap size={18} />
                  </span>
                  <span className="px pu__rarity">{p.rarity}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="powerups__note">Packages are shaped with each partner. Partner-venue activations can run alongside any of them.</p>
        </Reveal>
      </div>
    </Section>
  );
}

export function NextLevel() {
  return (
    <Section id="next" className="next">
      <div className="wrap">
        <SectionHead
          level="13"
          kicker="Before launch"
          title={
            <>
              Next level <span className="hl-cyan">loading</span>
            </>
          }
          lede="These details are being locked in for launch. Partners who join now help shape them."
        />
        <ul className="locks">
          {TO_CONFIRM.map((t, i) => (
            <Reveal key={t} delay={(i % 2) * 0.06} y={16}>
              <li>
                <Lock size={15} />
                <span>{t}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Finale({ onReplay }: { onReplay: () => void }) {
  const hasContact = Boolean(CONTACT.email || CONTACT.phone);
  return (
    <Section id="finale" className="finale" achievement="Game complete: thanks for playing">
      <div className="wrap finale__inner">
        <motion.div
          className="finale__token"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          <Token size={96} />
        </motion.div>
        <p className="px finale__k">Player 2 has entered the game</p>
        <h2 className="finale__title">
          Your brand.
          <br />
          <span className="hl-gold">Our arena.</span>
        </h2>
        <p className="finale__lede">
          Join EFN as a Phase 1 partner and be part of the home of esports, food and family entertainment in Trinidad
          &amp; Tobago.
        </p>
        {hasContact && (
          <div className="finale__contact">
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="btn btn--gold">
                <Mail size={18} /> {CONTACT.email}
              </a>
            )}
            {CONTACT.phone && (
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="btn btn--ghost">
                <Phone size={18} /> {CONTACT.phone}
              </a>
            )}
          </div>
        )}
        <div className="finale__ctas">
          <button className="btn btn--red" onClick={onReplay}>
            <RotateCcw size={18} /> Replay the intro
          </button>
          <a href="#top" className="btn btn--ghost">
            <ArrowUp size={18} /> Back to start
          </a>
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <span className="hud__mark">EFN</span>
          <div>
            <strong>Esports &amp; Fans Network</strong>
            <p>Arena &amp; Lounge · Phase 1 · Trinidad &amp; Tobago</p>
          </div>
        </div>
        <p className="px footer__secret">↑ ↑ ↓ ↓ ← → ← → B A</p>
      </div>
    </footer>
  );
}
