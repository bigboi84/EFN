import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Volume2, VolumeX, Pizza, Monitor, Eye, Layers } from "lucide-react";
import { MENU, FLOOR_SPECS, SHOW_FEATURES } from "../data";
import { Section, SectionHead, Reveal, Photo, mediaUrl } from "./ui";

/* Top-down plan of the oval: sunken gaming pit in the middle, raised dining ring behind glass. */
function BowlPlan() {
  const station = (x: number, y: number, k: string) => <rect key={k} x={x} y={y} width="5.2" height="3.4" rx="0.6" className="plan__seat" />;
  const banks = [36, 56].flatMap((by, b) =>
    Array.from({ length: 8 }, (_, i) => [
      station(29 + i * 6.2, by - 4.2, `${b}-t-${i}`),
      station(29 + i * 6.2, by + 0.8, `${b}-b-${i}`),
    ]).flat(),
  );
  const tables = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2;
    return <circle key={i} cx={50 + Math.cos(a) * 45} cy={46 + Math.sin(a) * 37} r="1.7" className="plan__table" />;
  });
  return (
    <svg viewBox="0 0 100 96" className="plan" role="img" aria-label="Floor plan: an oval gaming pit with 32 stations in two banks and a big screen, ringed by a raised restaurant behind glass">
      <ellipse cx="50" cy="46" rx="49" ry="41" className="plan__tier" />
      {tables}
      <ellipse cx="50" cy="46" rx="39" ry="31" className="plan__glass" />
      <ellipse cx="50" cy="46" rx="38" ry="30" className="plan__pit" />
      <rect x="38" y="19.5" width="24" height="2.2" rx="0.6" className="plan__screen" />
      <line x1="29" y1="36" x2="79" y2="36" className="plan__spine" />
      <line x1="29" y1="56" x2="79" y2="56" className="plan__spine" />
      {banks}
      <text x="50" y="26.2" className="plan__label">BIG SCREEN</text>
      <text x="50" y="47.2" className="plan__label plan__label--pit">GAMING PIT · FLOOR LEVEL</text>
      <text x="50" y="93.5" className="plan__label plan__label--tier">RESTAURANT · RAISED TIER</text>
    </svg>
  );
}

export function Bowl() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  return (
    <Section id="bowl" className="bowl" achievement="Map unlocked: welcome to the Bowl">
      <div className="wrap">
        <SectionHead
          level="02"
          kicker="The layout"
          title={
            <>
              Welcome to <span className="hl-gold">the Bowl</span>
            </>
          }
          lede="The Arena is built like a mini stadium. The gaming pit sits on the floor in the middle. The restaurant wraps around it on a raised tier behind glass, so every table is a front-row seat."
        />
      </div>

      <div className="wrap bowl__grid">
        <Reveal className="bowl__hero">
          <div className="frame" ref={ref}>
            <motion.div style={{ scale }} className="frame__zoom">
              <Photo name="oval-wide" alt="Concept: the oval Arena, with gaming stations in a sunken pit and diners on a raised tier behind curved glass" sizes="(max-width: 900px) 100vw, 60vw" />
            </motion.div>
            <span className="frame__tag px">Concept render</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="bowl__side">
          <div className="panel bowl__plan">
            <div className="panel__bar">
              <span className="px">Floor plan</span>
              <span className="px bowl__plan-note">Top-down</span>
            </div>
            <BowlPlan />
          </div>
          <ul className="bowl__points">
            <li>
              <Layers size={20} />
              <div>
                <strong>Two levels</strong>
                <p>Players on the floor. Diners one step up, looking in.</p>
              </div>
            </li>
            <li>
              <Eye size={20} />
              <div>
                <strong>Glass all the way round</strong>
                <p>Every seat sees the action without noise spilling into the café.</p>
              </div>
            </li>
            <li>
              <Monitor size={20} />
              <div>
                <strong>One big screen</strong>
                <p>The whole room follows the match on the end wall.</p>
              </div>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="wrap bowl__duo">
        <Reveal>
          <figure className="frame frame--sm">
            <Photo name="oval-booth" alt="Friends eating pizza and burgers in a raised booth, looking down through glass at the gaming pit" sizes="(max-width: 720px) 100vw, 50vw" />
            <figcaption>From the restaurant tier</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="frame frame--sm">
            <Photo name="oval-pit" alt="A player celebrating in the gaming pit while diners cheer from the glass balcony above" sizes="(max-width: 720px) 100vw, 50vw" />
            <figcaption>From the gaming pit</figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}

export function Cafe() {
  return (
    <Section id="cafe" className="cafe" achievement="Refuelled: the café is open">
      <div className="wrap">
        <SectionHead
          level="03"
          kicker="Food & drink"
          title={
            <>
              Refuel <span className="hl-red">station</span>
            </>
          }
          lede="Wood-fired pizza, smash burgers and wings, served to the tables, the booths, the sofas and straight to the gaming stations. Classy enough for a night out and built for teens and young adults who came to play."
        />

        <div className="cafe__bento">
          <Reveal className="cafe__a">
            <figure className="frame">
              <Photo name="food-kitchen" alt="Chefs pulling a wood-fired pizza from the oven next to burgers, wings and fries on the counter" sizes="(max-width: 900px) 100vw, 58vw" />
              <figcaption>Open kitchen</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08} className="cafe__b">
            <figure className="frame">
              <Photo name="food-booth" alt="Friends laughing over pizza, burgers and wings in a red leather booth" sizes="(max-width: 900px) 100vw, 40vw" />
              <figcaption>Booths</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.12} className="cafe__c">
            <figure className="frame">
              <Photo name="food-sofa" alt="Friends on sofas with controllers and food, facing a big screen" sizes="(max-width: 900px) 100vw, 40vw" />
              <figcaption>Sofa lounge</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.16} className="cafe__menu panel">
            <p className="px cafe__menu-k">
              <Pizza size={16} /> On the menu
            </p>
            <ul>
              {MENU.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="cafe__menu-note">Served to stations and tables. Full menu confirmed before launch.</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Floor() {
  return (
    <Section id="floor" className="floor" achievement="Player ready: 32 stations online">
      <div className="wrap">
        <SectionHead
          level="04"
          kicker="Gaming pit"
          title={
            <>
              32 seats. <span className="hl-cyan">One champion.</span>
            </>
          }
          lede="Two banks of console stations, eight a side and back to back, facing one big monitoring screen. The same rigs run hourly play every day and every tournament on event days."
        />

        <Reveal>
          <figure className="frame floor__lead">
            <Photo name="game-wide" alt="Two long banks of console gaming stations, all seats filled, facing a big screen with a tournament bracket" sizes="100vw" />
            <dl className="floor__specs">
              {FLOOR_SPECS.map((s) => (
                <div key={s.v}>
                  <dt>{s.k}</dt>
                  <dd className="px">{s.v}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </Reveal>

        <div className="floor__duo">
          <Reveal>
            <figure className="frame frame--sm">
              <Photo name="game-bank" alt="Looking down one bank of stations, a player fist-pumping after a goal" sizes="(max-width: 720px) 100vw, 50vw" />
              <figcaption>Eight a side, back to back</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="frame frame--sm">
              <Photo name="game-overhead" alt="Overhead view of both banks of stations and the admin desk below the big screen" sizes="(max-width: 720px) 100vw, 50vw" />
              <figcaption>Admin desk under the big screen</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const CLIPS = [
  { file: "show-video.mp4", poster: "show-still-sm.webp", label: "Spin the wheel" },
  { file: "show-video-2.mp4", poster: "show-buzz-sm.webp", label: "Buzzer battle" },
];

export function GameShow() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [clip, setClip] = useState(0);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) void v.play().catch(() => {});
  };

  return (
    <Section id="gameshow" className="gameshow" achievement="Big wheel spun: game show night">
      <div className="wrap">
        <SectionHead
          level="05"
          kicker="Family game-show zone"
          title={
            <>
              Spin it. <span className="hl-gold">Buzz it.</span> Win it.
            </>
          }
          lede="A real game-show set for families, friends and office teams. Light-up podiums, buzzers, a big quiz screen and the prize wheel."
        />

        <div className="gameshow__grid">
          <Reveal className="gameshow__video-wrap">
            <div className="frame gameshow__video">
              <video
                ref={video}
                key={clip}
                src={mediaUrl(CLIPS[clip].file)}
                poster={mediaUrl(CLIPS[clip].poster)}
                autoPlay
                muted={muted}
                playsInline
                onEnded={() => setClip((c) => (c + 1) % CLIPS.length)}
                preload="metadata"
                aria-label="Teams playing in the game-show room: spinning the prize wheel, hitting buzzers and celebrating under confetti"
              />
              <button className="gameshow__sound" onClick={toggle} aria-pressed={!muted}>
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                {muted ? "Tap for sound" : "Sound on"}
              </button>
              <span className="frame__tag px">Concept video</span>
            </div>
            <div className="gameshow__clips" role="group" aria-label="Choose clip">
              {CLIPS.map((c, i) => (
                <button key={c.file} className={i === clip ? "is-on" : ""} onClick={() => setClip(i)} aria-pressed={i === clip}>
                  <span className="px">{String(i + 1).padStart(2, "0")}</span> {c.label}
                </button>
              ))}
            </div>
          </Reveal>

          <ul className="gameshow__list">
            {SHOW_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <li>
                  <span className="px gameshow__n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="gameshow__strip">
          {[
            { n: "show-host", c: "Meet your host" },
            { n: "show-buzz", c: "First to the buzzer" },
            { n: "show-win", c: "Winners take the trophy" },
          ].map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <figure className="frame frame--sm">
                <Photo name={p.n} alt={p.c} sizes="(max-width: 720px) 100vw, 33vw" />
                <figcaption>{p.c}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
