import { motion } from "motion/react";
import { Building2, Bus, Wifi, Scale } from "lucide-react";
import { MODES } from "../data";
import { Section, SectionHead, Reveal } from "./ui";
import { sfx } from "../lib/sound";

const ICONS = [Building2, Bus, Wifi];

export function Modes() {
  return (
    <Section id="modes" className="modes" achievement="Game modes unlocked: home, away, online">
      <div className="wrap">
        <SectionHead
          level="09"
          kicker="Tournament circuit"
          title={
            <>
              Choose your <span className="hl-red">game mode</span>
            </>
          }
          lede="EFN tournaments run in three formats, so the circuit reaches players in the Arena, across the country and online."
        />

        <div className="modes__grid">
          {MODES.map((m, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={m.code} delay={i * 0.1}>
                <motion.article
                  className={`mode mode--${m.color}`}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onHoverStart={() => sfx.blip()}
                >
                  <div className="mode__top">
                    <span className="mode__icon">
                      <Icon size={26} strokeWidth={1.6} />
                    </span>
                    <span className="px mode__n">Mode {i + 1}</span>
                  </div>
                  <p className="mode__code">{m.code}</p>
                  <h3 className="mode__title">{m.title}</h3>
                  <dl className="mode__dl">
                    <div>
                      <dt className="px">Where</dt>
                      <dd>{m.where}</dd>
                    </div>
                    <div>
                      <dt className="px">Purpose</dt>
                      <dd>{m.purpose}</dd>
                    </div>
                  </dl>
                  <span className="mode__glow" aria-hidden="true" />
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="modes__rules">
          <Scale size={22} />
          <p>
            <strong>One rulebook.</strong> All formats follow the same rules, conduct standards and seasonal league
            structure. Brands, schools and other outside organisers can also book the Arena for their own events.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
