import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, Pause, Play, Users, Sparkles, Trophy, Utensils } from "lucide-react";
import { Photo, mediaUrl, hasMedia } from "../../../src/components/ui";
import { ACTIVITIES, DEALS, GROUP_TYPES, MENU_SECTIONS, PLAN_OPTIONS, RULES, MODES, type BookKind } from "../data";
import { usePlan } from "../lib/plan";
import { Btn, Coin, Head, Marquee, Reveal, Sec, ease } from "../components/kit";
import { RequestForm } from "../components/RequestForm";

const TABS: { id: string; label: string; kinds: BookKind[] }[] = [
  { id: "act", label: "Activities", kinds: ["table", "league", "gameshow"] },
  { id: "bday", label: "Birthdays", kinds: ["birthday"] },
  { id: "event", label: "Events", kinds: ["group"] },
];

const ACT_HREF: Record<string, string> = { floor: "#play", pc: "#play", sofa: "#play", show: "#groups", stage: "#leagues", party: "#birthdays" };

function PlanWidget() {
  const { plan, setPlan } = usePlan();
  const [tab, setTab] = useState(TABS[0]);
  const [kind, setKind] = useState<BookKind>(plan.kind in { table: 1, league: 1, gameshow: 1 } ? plan.kind : "table");
  const [date, setDate] = useState(plan.date);
  const today = new Date().toISOString().slice(0, 10);
  const options = PLAN_OPTIONS.filter((o) => tab.kinds.includes(o.kind));

  const pick = (t: (typeof TABS)[number]) => {
    setTab(t);
    setKind(t.kinds[0]);
  };

  const go = (e: FormEvent) => {
    e.preventDefault();
    setPlan({ kind, date, size: plan.size });
    window.location.hash = "book";
  };

  return (
    <motion.div className="plan" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.5 }}>
      <div className="plan__tabs" role="tablist" aria-label="What are you planning?">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab.id === t.id} className={tab.id === t.id ? "is-on" : ""} onClick={() => pick(t)}>
            {t.label}
          </button>
        ))}
      </div>
      <form className="plan__bar" onSubmit={go} aria-label="Plan your visit">
        <label className="plan__f">
          <span>What are we playing today?</span>
          <select value={kind} onChange={(e) => setKind(e.target.value as BookKind)}>
            {options.map((o) => (
              <option key={o.kind} value={o.kind}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="plan__f">
          <span>Select a date</span>
          <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <Btn type="submit">Book now</Btn>
      </form>
    </motion.div>
  );
}

export function Home() {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const dishes = MENU_SECTIONS.flatMap((s) => s.items.slice(0, 1).map((i) => ({ ...i, section: s.title })));

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero__card">
          <div className="hero__media" aria-hidden="true">
            {reduce ? (
              <Photo name="oval-wide" alt="" eager />
            ) : (
              <video ref={video} className="hero__video" poster={mediaUrl("hero-poster.webp")} autoPlay muted loop playsInline preload="auto">
                {hasMedia("hero-loop.webm") && <source src={mediaUrl("hero-loop.webm")} type="video/webm" />}
                {hasMedia("hero-loop.mp4") && <source src={mediaUrl("hero-loop.mp4")} type="video/mp4" />}
              </video>
            )}
            <div className="hero__shade" />
          </div>
          <div className="hero__in">
            <motion.h1 className="hero__h1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 }}>
              Awesome awaits
              <br />
              at EFN Arena
            </motion.h1>
            <motion.p className="hero__lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.25 }}>
              32 console stations, a real game show set, a stage and a wood-fired kitchen. Gaming, game shows and food in Trinidad &amp; Tobago. All under one roof. Let the fun begin.
            </motion.p>
            <PlanWidget />
          </div>
          {!reduce && (
            <button className="hero__pause" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>
        <a href="#whats-on" className="hero__more">
          Click for details
        </a>
      </section>

      <Sec id="whats-on">
        <Head
          eyebrow="What's on"
          title={
            <>
              Six ways to <em>play</em>
            </>
          }
          lede="Whether you want a quick game, a full night out or a party, there is a zone for you."
          action={
            <Btn href="#play" tone="ghost">
              All activities <ArrowRight size={18} />
            </Btn>
          }
        />
        <div className="acts">
          {ACTIVITIES.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 0.06} className={`acts__cell acts__cell--${i}`}>
              <a href={ACT_HREF[a.id] ?? "#play"} className="act">
                <Photo name={a.image} alt="" sizes={i === 0 || i === 5 ? "(max-width: 720px) 100vw, 66vw" : "(max-width: 720px) 100vw, 33vw"} />
                <span className="act__body">
                  <span className="act__name">{a.name}</span>
                  <span className="act__blurb">{a.blurb}</span>
                  <span className="act__btn">Learn more</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Marquee />

      <Sec tone="mist" id="birthdays-feature">
        <div className="split">
          <Reveal className="split__img">
            <Photo name="arena-birthday" alt="Kids celebrating a birthday party with cake and a game on the big screen" sizes="(max-width: 900px) 100vw, 50vw" />
            <span className="sticker">Parties from 8 to 25 guests</span>
          </Reveal>
          <div className="split__copy">
            <Head
              eyebrow="Birthdays"
              title={
                <>
                  Make it a <em>boss-level</em> birthday
                </>
              }
              lede="A private party room, a hosted game show, gaming time and a pizza-and-wings spread. You bring the crew, we handle the rest."
            />
            <ul className="ticks">
              <li>A dedicated party host</li>
              <li>Hosted game show with buzzers and a trophy</li>
              <li>Food and drinks included</li>
            </ul>
            <div className="row">
              <Btn href="#birthdays">See party packages</Btn>
              <Btn href="#book" tone="ghost">
                Request a date
              </Btn>
            </div>
          </div>
        </div>
      </Sec>

      <Sec id="eat-feature">
        <div className="split split--flip">
          <div className="split__copy">
            <Head
              eyebrow="Eat & drink"
              title={
                <>
                  Fuel for <em>every</em> round
                </>
              }
              lede="Wood-fired pizza, smash burgers, wings and cold drinks, served to your table, your sofa or your gaming station."
            />
            <ul className="dishes">
              {dishes.map((d) => (
                <li key={d.name}>
                  <div>
                    <strong>{d.name}</strong>
                    <span>{d.section}</span>
                  </div>
                  <em>TT${d.price}</em>
                </li>
              ))}
            </ul>
            <div className="row">
              <Btn href="#eat" tone="navy">
                <Utensils size={18} /> See the full menu
              </Btn>
            </div>
          </div>
          <Reveal className="split__img">
            <Photo name="menu-pizza" alt="A wood-fired pepperoni pizza with a cheese pull" sizes="(max-width: 900px) 100vw, 50vw" />
            <span className="sticker sticker--gold">Alcohol-free menu</span>
          </Reveal>
        </div>
      </Sec>

      <Sec tone="navy" id="groups-feature">
        <Head
          eyebrow="Groups & events"
          title={
            <>
              Bring the whole <em>squad</em>
            </>
          }
          lede="Team nights, school trips and club events, with a host, a private room and food to match."
          align="center"
        />
        <div className="trio">
          {GROUP_TYPES.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <a href="#groups" className="gt">
                  <span className="gt__img">
                    <Photo name={g.image} alt="" sizes="(max-width: 900px) 100vw, 33vw" />
                  </span>
                  <span className="gt__body">
                    <span className="gt__icon">
                      <Icon size={22} />
                    </span>
                    <strong>{g.title}</strong>
                    <span>{g.body}</span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Sec>

      <Sec id="cards-feature">
        <div className="split">
          <Reveal className="cardart">
            <motion.div className="pc pc--navy" whileHover={{ rotate: -4, y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <span className="pc__top">
                <Coin size={30} /> EFN ARENA
              </span>
              <span className="pc__big">Gift card</span>
              <span className="pc__chip" />
            </motion.div>
            <motion.div className="pc pc--red" whileHover={{ rotate: 4, y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <span className="pc__top">
                <Coin size={30} /> EFN ARENA
              </span>
              <span className="pc__big">Token Card</span>
              <span className="pc__chip" />
            </motion.div>
          </Reveal>
          <div className="split__copy">
            <Head
              eyebrow="Gift & play cards"
              title={
                <>
                  Give the gift of <em>game time</em>
                </>
              }
              lede="Send a gift card to any gamer, or load a Token Card with credit for games and food. One balance, no fuss at the counter."
            />
            <div className="row">
              <Btn href="#cards" tone="gold">
                Get a card
              </Btn>
            </div>
          </div>
        </div>
      </Sec>

      <Sec tone="mist" id="leagues-feature">
        <Head
          eyebrow="Leagues & tournaments"
          title={
            <>
              Ready to <em>compete</em>?
            </>
          }
          lede="Weekly scrims, league nights and monthly Arena tournaments, plus events at partner venues and online."
          action={
            <Btn href="#leagues" tone="ghost">
              Join a league <ArrowRight size={18} />
            </Btn>
          }
        />
        <div className="trio trio--light">
          {MODES.map((m, i) => (
            <Reveal key={m.code} delay={i * 0.08}>
              <div className={`mode mode--${m.color}`}>
                <span className="mode__code">{m.code}</span>
                <strong>{m.title}</strong>
                <p>{m.purpose}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec id="deals-feature">
        <Head eyebrow="Deals & specials" title={<>Bonus <em>power-ups</em></>} lede="Member rates, family nights and shareable boxes. Details are confirmed before launch." />
        <div className="deals">
          {DEALS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <a href="#deals" className="deal">
                <span className="deal__img">
                  <Photo name={d.image} alt="" sizes="(max-width: 720px) 100vw, 25vw" />
                  <span className="deal__tag">{d.tag}</span>
                </span>
                <strong>{d.title}</strong>
                <span>{d.body}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec tone="mist" id="house-rules">
        <Head eyebrow="House rules" title={<>Good vibes <em>only</em></>} lede="Everyone plays by the same code, from first-timers to champions." align="center" />
        <ul className="rules">
          {RULES.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={(i % 3) * 0.05}>
                <li className="rule">
                  <span className="rule__icon">
                    <Icon size={22} />
                  </span>
                  <strong>{r.title}</strong>
                  <p>{r.body}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Sec>

      <Sec tone="navy" id="start">
        <div className="start">
          <Reveal className="start__copy">
            <p className="eyebrow eyebrow--light">
              <Sparkles size={14} /> Ready player one
            </p>
            <h2 className="start__title">
              Your table is <em>waiting</em>
            </h2>
            <p>Tell us what you're planning and we'll get back to you with a confirmed slot.</p>
            <ul className="start__stats">
              <li>
                <Users size={18} /> 32 console stations
              </li>
              <li>
                <Trophy size={18} /> Monthly tournaments
              </li>
              <li>
                <CalendarDays size={18} /> Open daily
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <RequestForm kind="table" compact />
          </Reveal>
        </div>
      </Sec>
    </>
  );
}
