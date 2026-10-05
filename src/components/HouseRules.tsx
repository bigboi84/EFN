import { MessageSquareOff, WineOff, CigaretteOff, Handshake, Gamepad2, Crown, TriangleAlert, Timer, Ban } from "lucide-react";
import { Section, SectionHead, Reveal } from "./ui";

const RULES = [
  { icon: MessageSquareOff, code: "R1", title: "Keep it clean", body: "No cursing, slurs or trash talk that gets personal. Hype your squad, roast the play, never the player.", tag: "GG only" },
  { icon: WineOff, code: "R2", title: "Zero alcohol", body: "No alcohol in the Arena, ever. The only drinks here are sodas, smoothies and mocktails.", tag: "Power-ups only" },
  { icon: CigaretteOff, code: "R3", title: "No smoking or vaping", body: "No cigarettes, vapes or e-cigs anywhere inside or at the entrance. Clean air, clear head.", tag: "Smoke-free zone" },
  { icon: Handshake, code: "R4", title: "Respect every player", body: "No bullying, harassment or rage at anyone: players, parents, staff or the ref. Win humble, lose with class.", tag: "Good sport" },
  { icon: Gamepad2, code: "R5", title: "Respect the rigs", body: "No slamming controllers or headsets. Report any issue to floor staff and leave your station clean.", tag: "Protect the gear" },
  { icon: Crown, code: "R6", title: "Play fair", body: "No cheats, hacks, exploits, smurfing or account sharing. The admin's call is final.", tag: "Earn the W" },
];

const PENALTIES = [
  { icon: TriangleAlert, label: "Warning", body: "Staff give you a heads-up" },
  { icon: Timer, label: "Respawn timer", body: "Time out from your station" },
  { icon: Ban, label: "Game over", body: "Asked to leave or banned" },
];

export function HouseRules() {
  return (
    <Section id="rules" className="rules" achievement="Code accepted: you know the house rules">
      <div className="wrap">
        <SectionHead
          level="00"
          kicker="House rules"
          title={
            <>
              The player <span className="hl-red">code</span>
            </>
          }
          lede="Six rules keep the Arena fun, safe and family-friendly. Everyone who walks in plays by them, from first-timers to champions."
        />
        <ol className="rules__grid">
          {RULES.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.code} delay={(i % 3) * 0.07}>
                <li className="rule">
                  <span className="rule__icon">
                    <Icon size={26} strokeWidth={1.8} />
                  </span>
                  <span className="px rule__code">{r.code}</span>
                  <strong className="rule__title">{r.title}</strong>
                  <p className="rule__body">{r.body}</p>
                  <span className="px rule__tag">{r.tag}</span>
                </li>
              </Reveal>
            );
          })}
        </ol>
        <Reveal>
          <div className="penalty">
            <p className="px penalty__k">Break the code</p>
            <ol className="penalty__steps">
              {PENALTIES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <li key={p.label} className={`penalty__step penalty__step--${i}`}>
                    <Icon size={20} />
                    <div>
                      <strong>{p.label}</strong>
                      <span>{p.body}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
