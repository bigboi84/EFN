import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Utensils, Users, Clock, Sparkles, Scale, Flame } from "lucide-react";
import {
  MENU_SECTIONS,
  COMBOS,
  GAMES,
  HARDWARE,
  SHOW_ROUNDS,
  SHOW_PACKAGES,
  XP_PROGRAMMES,
  XP_PILLARS,
  TOURNAMENT_TITLES,
  type Platform,
} from "./data";
import { Section, SectionHead, Reveal, Photo } from "./components/ui";
import { PageHero, NextStage } from "./components/PageKit";
import { BookingForm } from "./components/Booking";
import { Modes } from "./components/Modes";
import { Schedule } from "./components/Schedule";
import { Cafe, Floor, GameShow } from "./components/Spaces";
import { Membership, Standards } from "./components/Membership";
import { Hub } from "./components/Hub";
import { What } from "./components/Zones";
import { Partners, NextLevel } from "./components/Partners";

/* ---------------- Tournaments ---------------- */

export function TournamentsPage() {
  return (
    <>
      <PageHero
        page="tournaments"
        image="oval-pit"
        title={
          <>
            Enter the <span className="hl-red">arena</span>
          </>
        }
        lede="EFN tournaments run in the Arena's gaming pit, at partner venues across Trinidad & Tobago and online. One rulebook, one season, one leaderboard."
      >
        <a href="#book-tournament" className="btn btn--red">
          Book a tournament
        </a>
        <a href="#modes" className="btn btn--ghost">
          See the formats
        </a>
      </PageHero>
      <Modes />
      <Section id="titles" className="titles">
        <div className="wrap">
          <SectionHead level="02" kicker="Season games" title={<>On the <span className="hl-gold">bracket</span></>} lede="The first season's games and calendar are confirmed before launch. These are the titles we're building around." />
          <div className="titles__row">
            {TOURNAMENT_TITLES.map((t, i) => (
              <Reveal key={t} delay={i * 0.04}>
                <span className="title-chip">
                  <Trophy size={16} /> {t}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal className="modes__rules">
            <Scale size={22} />
            <p>
              <strong>Fair play, every time.</strong> Supervised floors, a published code of conduct, age-appropriate game policies and
              parental consent for under-18 members. Brands, schools and other organisers can book the Arena for their own events.
            </p>
          </Reveal>
        </div>
      </Section>
      <Schedule />
      <Section id="book-tournament" className="book" achievement="Booked in: see you on the bracket">
        <div className="wrap book__grid">
          <SectionHead level="04" kicker="Bookings" title={<>Book your <span className="hl-red">match</span></>} lede="Enter a tournament, host your own in the gaming pit, bring EFN to your venue or run an online bracket. Tell us what you need and we'll confirm the details." />
          <BookingForm kind="tournament" />
        </div>
      </Section>
      <NextStage page="tournaments" />
    </>
  );
}

/* ---------------- Food ---------------- */

export function FoodPage() {
  const [tab, setTab] = useState(MENU_SECTIONS[0].id);
  const active = MENU_SECTIONS.find((s) => s.id === tab)!;
  return (
    <>
      <PageHero
        page="food"
        image="menu-pizza"
        title={
          <>
            Fuel the <span className="hl-gold">game</span>
          </>
        }
        lede="Wood-fired pizza, smash burgers, wings and cold drinks, served to your table, your sofa or straight to your gaming station."
      >
        <a href="#menu" className="btn btn--gold">
          See the menu
        </a>
      </PageHero>
      <Cafe />
      <Section id="menu" className="menu" achievement="Menu unlocked: order up">
        <div className="wrap">
          <SectionHead level="02" kicker="The menu" title={<>Pick your <span className="hl-red">loadout</span></>} lede="Prices in TT$. Sample menu for Phase 1; final dishes and prices are confirmed before launch." />
          <div className="menu__tabs" role="tablist" aria-label="Menu sections">
            {MENU_SECTIONS.map((s) => (
              <button key={s.id} role="tab" aria-selected={s.id === tab} className={s.id === tab ? "is-on" : ""} onClick={() => setTab(s.id)}>
                {s.title}
              </button>
            ))}
          </div>
          <div className="menu__board">
            <AnimatePresence mode="wait">
              <motion.div key={active.id} className="menu__panel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <figure className="frame menu__photo">
                  <Photo name={active.image} alt={active.title} sizes="(max-width: 900px) 100vw, 45vw" />
                  {active.note && <figcaption>{active.note}</figcaption>}
                </figure>
                <ul className="menu__list" role="tabpanel">
                  {active.items.map((it) => (
                    <li key={it.name}>
                      <div className="menu__line">
                        <span className="menu__name">{it.name}</span>
                        {it.tag && <span className="px menu__tag">{it.tag}</span>}
                        <span className="menu__dots" aria-hidden="true" />
                        <span className="menu__price">
                          <small>TT$</small>
                          {it.price}
                        </span>
                      </div>
                      <p className="menu__desc">{it.desc}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="combos">
            {COMBOS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <div className="combo">
                  <Flame size={20} />
                  <div>
                    <strong>{c.name}</strong>
                    <p>{c.desc}</p>
                  </div>
                  <span className="combo__price">
                    <small>TT$</small>
                    {c.price}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="menu__fine">
              <Utensils size={14} /> Order at the counter or from your station. Alcohol-free venue. Allergen info available on request.
            </p>
          </Reveal>
        </div>
      </Section>
      <NextStage page="food" />
    </>
  );
}

/* ---------------- Games ---------------- */

const FILTERS: ("All" | Platform | "Tournament" | "Family")[] = ["All", "PS5", "PC", "Switch", "Tournament", "Family"];
const GENRE_HUE: Record<string, string> = {};
const HUES = ["var(--red)", "var(--gold)", "var(--cyan)"];

export function GamesPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(
    () =>
      GAMES.filter((g) =>
        filter === "All" ? true : filter === "Tournament" ? g.tournament : filter === "Family" ? g.family : g.platforms.includes(filter),
      ),
    [filter],
  );
  return (
    <>
      <PageHero
        page="games"
        image="game-wide"
        title={
          <>
            Press <span className="hl-cyan">play</span>
          </>
        }
        lede="Next-gen consoles, a PC battle row and a sofa lounge, loaded with the games Trinidad & Tobago actually plays. Walk in by the hour or grab a day pass."
      >
        <a href="#library" className="btn btn--gold">
          Browse the library
        </a>
      </PageHero>
      <Floor />
      <Section id="hardware" className="hardware">
        <div className="wrap">
          <SectionHead level="02" kicker="Setups" title={<>Pick your <span className="hl-gold">rig</span></>} />
          <div className="hardware__grid">
            {HARDWARE.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <figure className="frame hw">
                  <Photo name={h.image} alt={h.title} sizes="(max-width: 900px) 100vw, 33vw" />
                  <figcaption className="hw__cap">
                    <strong>{h.title}</strong>
                    <span>{h.body}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <Section id="library" className="library" achievement="Collector: game library opened">
        <div className="wrap">
          <SectionHead level="03" kicker="Game library" title={<>{GAMES.length} games and <span className="hl-cyan">counting</span></>} lede="A starting line-up of the most-played titles. The full library is confirmed before launch, and members get a say in what's added." />
          <div className="library__filters" role="group" aria-label="Filter games">
            {FILTERS.map((f) => (
              <button key={f} className={f === filter ? "is-on" : ""} onClick={() => setFilter(f)} aria-pressed={f === filter}>
                {f}
              </button>
            ))}
          </div>
          <motion.ul layout className="library__grid">
            <AnimatePresence>
              {list.map((g) => {
                const hue = (GENRE_HUE[g.genre] ??= HUES[Object.keys(GENRE_HUE).length % 3]);
                return (
                  <motion.li
                    key={g.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="gcard"
                    style={{ ["--c" as string]: hue }}
                  >
                    <span className="gcard__glyph" aria-hidden="true">
                      {g.name
                        .split(/\s+/)
                        .filter((w) => /^[A-Z0-9]/.test(w))
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <span className="gcard__name">{g.name}</span>
                    <span className="px gcard__genre">{g.genre}</span>
                    <span className="gcard__chips">
                      {g.platforms.map((p) => (
                        <span key={p}>{p}</span>
                      ))}
                      {g.tournament && (
                        <span className="is-tour">
                          <Trophy size={11} /> Tournament
                        </span>
                      )}
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
          <Reveal>
            <p className="menu__fine">Game names are trademarks of their publishers and are listed to show the planned line-up.</p>
          </Reveal>
        </div>
      </Section>
      <NextStage page="games" />
    </>
  );
}

/* ---------------- Game show ---------------- */

export function GameShowPage() {
  return (
    <>
      <PageHero
        page="gameshow"
        image="show-win"
        title={
          <>
            It's <span className="hl-gold">showtime</span>
          </>
        }
        lede="A real game-show set inside the Arena. Light-up podiums, buzzers, a quiz board and the big wheel. Bring the family, the birthday crew or the whole office."
      >
        <a href="#book-gameshow" className="btn btn--gold">
          Book the game show
        </a>
      </PageHero>
      <GameShow />
      <Section id="rounds" className="rounds">
        <div className="wrap">
          <SectionHead level="02" kicker="How a game runs" title={<>Four rounds. <span className="hl-red">One trophy.</span></>} />
          <ol className="rounds__grid">
            {SHOW_ROUNDS.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.07}>
                <li className="round">
                  <span className="round__n">{i + 1}</span>
                  <strong>{r.title}</strong>
                  <p>{r.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>
      <Section id="packages" className="packages">
        <div className="wrap">
          <SectionHead level="03" kicker="Packages" title={<>Pick your <span className="hl-gold">party</span></>} lede="Pricing on request while Phase 1 rates are confirmed." />
          <div className="packages__grid">
            {SHOW_PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div className={`pkg ${p.tag ? "pkg--hot" : ""}`}>
                  {p.tag && <span className="px pkg__tag">{p.tag}</span>}
                  <strong className="pkg__name">{p.name}</strong>
                  <p className="pkg__meta">
                    <span>
                      <Users size={14} /> {p.size}
                    </span>
                    <span>
                      <Clock size={14} /> {p.time}
                    </span>
                  </p>
                  <p>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <Section id="book-gameshow" className="book" achievement="Contestants, take your podiums">
        <div className="wrap book__grid">
          <SectionHead level="04" kicker="Bookings" title={<>Book your <span className="hl-gold">show</span></>} lede="Pick a package, tell us your group size and date, and we'll lock in your slot." />
          <BookingForm kind="gameshow" />
        </div>
      </Section>
      <NextStage page="gameshow" />
    </>
  );
}

/* ---------------- Membership ---------------- */

export function MembershipPage() {
  return (
    <>
      <PageHero
        page="membership"
        image="oval-booth"
        title={
          <>
            Join the <span className="hl-cyan">squad</span>
          </>
        }
        lede="Anyone can visit the Arena. Members get guaranteed tournament places, half-price entry, member rates in the lounge and the private community."
      />
      <Membership />
      <Standards />
      <NextStage page="membership" />
    </>
  );
}

/* ---------------- About ---------------- */

export function AboutPage() {
  return (
    <>
      <PageHero
        page="about"
        image="oval-wide"
        title={
          <>
            Esports & <span className="hl-red">Fans</span> Network
          </>
        }
        lede="EFN's Phase 1 opens the Arena & Lounge as the home of esports and fans in Trinidad & Tobago, with a target of 1,000 players and 5,000 fans."
      />
      <What />
      <Hub />
      <Partners />
      <NextLevel />
      <NextStage page="about" />
    </>
  );
}

/* ---------------- NextGen XP ---------------- */

export function NextGenPage() {
  return (
    <>
      <PageHero
        page="nextgen"
        image="xp-schools"
        title={
          <>
            NextGen <span className="hl-cyan">XP</span>
          </>
        }
        lede="EFN's learning and giving-back programme. We open the Arena to schools in daytime hours, run special-education sessions, and use gaming to build skills that last."
      >
        <a href="#book-school" className="btn btn--gold">
          Bring your school
        </a>
      </PageHero>
      <Section id="pillars" className="pillars">
        <div className="wrap">
          <SectionHead level="01" kicker="Our mission" title={<>Learn. Play. <span className="hl-gold">Level up.</span></>} lede="Gaming is where young people already are. NextGen XP meets them there with structure, safety and a path forward." />
          <div className="pillars__grid">
            {XP_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="pillar">
                  <Sparkles size={20} />
                  <strong>{p.title}</strong>
                  <p>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <Section id="programmes" className="programmes" achievement="XP gained: NextGen programmes">
        <div className="wrap">
          <SectionHead level="02" kicker="Programmes" title={<>Four ways to <span className="hl-cyan">take part</span></>} lede="Programme concepts for Phase 1, shaped with schools and partners before launch." />
          <div className="programmes__list">
            {XP_PROGRAMMES.map((p, i) => (
              <Reveal key={p.title}>
                <article className={`prog ${i % 2 ? "prog--flip" : ""}`}>
                  <figure className="frame">
                    <Photo name={p.image} alt={p.title} sizes="(max-width: 900px) 100vw, 55vw" />
                  </figure>
                  <div className="prog__body">
                    <span className="px prog__tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <Section id="book-school" className="book">
        <div className="wrap book__grid">
          <SectionHead level="03" kicker="For schools" title={<>Bring your <span className="hl-gold">class</span></>} lede="Teachers and principals: tell us about your students and we'll plan a visit, workshop or league entry with you." />
          <BookingForm kind="school" />
        </div>
      </Section>
      <NextStage page="nextgen" />
    </>
  );
}
