import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Check, Lock, Shield, Users, ShieldCheck } from "lucide-react";
import { TIER_ROWS, STANDARDS } from "../data";
import { Section, SectionHead, Reveal } from "./ui";

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check size={18} className="ok" aria-label="Included" />;
  if (v === false) return <Lock size={15} className="no" aria-label="Not included" />;
  return <span className="val">{v}</span>;
}

function TierCard({ tier }: { tier: "pro" | "elite" }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const elite = tier === "elite";
  return (
    <motion.div
      ref={ref}
      className={`tier tier--${tier}`}
      style={{ rotateX: rx, rotateY: ry, ["--gx" as string]: glareX, ["--gy" as string]: glareY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="tier__inner">
        <div className="tier__head">
          <span className="px tier__rank">Tier {elite ? 2 : 1}</span>
          {elite && <span className="px tier__badge">Best loot</span>}
        </div>
        <h3 className="tier__name">{elite ? "Gamers Elite" : "Gamer Pro"}</h3>
        <p className="tier__price">
          <span className="px">Monthly price</span> announced at launch
        </p>
        <ul className="tier__list">
          {TIER_ROWS.map((r) => {
            const v = elite ? r.elite : r.pro;
            return (
              <li key={r.benefit} className={v === false ? "is-locked" : ""}>
                <span>{r.benefit}</span>
                <Cell v={v} />
              </li>
            );
          })}
        </ul>
      </div>
      <span className="tier__glare" aria-hidden="true" />
    </motion.div>
  );
}

export function Membership() {
  return (
    <Section id="membership" className="membership" achievement="Tier unlocked: welcome to the club">
      <div className="wrap">
        <SectionHead
          level="10"
          kicker="Paid membership"
          title={
            <>
              Pick your <span className="hl-gold">tier</span>
            </>
          }
          lede="EFN runs as a membership-based community so it stays safe, structured and high quality. Anyone can visit the lounge. Members get priority, discounts and the private community."
        />

        <div className="tiers">
          <Reveal>
            <TierCard tier="pro" />
          </Reveal>
          <Reveal delay={0.12}>
            <TierCard tier="elite" />
          </Reveal>
        </div>

        <Reveal className="why">
          <span className="px">Why membership</span>
          <ul>
            <li>Safety</li>
            <li>Structure</li>
            <li>Standards</li>
            <li>Quality</li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export function Standards() {
  return (
    <Section id="standards" className="standards" achievement="Safe play protocol: verified">
      <div className="wrap standards__inner">
        <div>
          <SectionHead
            level="11"
            kicker="Standards"
            title={
              <>
                Safe play <span className="hl-cyan">protocol</span>
              </>
            }
            lede="Built for parents, schools and officials to trust. Every visit, every event and every online space runs on the same standards."
          />
          <Reveal className="standards__aud">
            <span>
              <Users size={16} /> Parents
            </span>
            <span>
              <Shield size={16} /> Schools
            </span>
            <span>
              <ShieldCheck size={16} /> Officials
            </span>
          </Reveal>
        </div>

        <ul className="protocol">
          {STANDARDS.map((s, i) => (
            <Reveal key={s} delay={i * 0.07}>
              <li>
                <span className="protocol__check">
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className="protocol__text">{s}</span>
                <span className="px protocol__state">Required</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
