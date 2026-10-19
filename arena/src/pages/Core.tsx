import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Clock, Crown, Pause, Play, Trophy, Users, Volume2, VolumeX } from "lucide-react";
import { Photo, mediaUrl, hasMedia } from "../../../src/components/ui";
import {
  ACTIVITIES,
  BIRTHDAY_PACKAGES,
  BIRTHDAY_STEPS,
  GAMES,
  GROUP_TYPES,
  LEAGUE_NIGHTS,
  MODES,
  MODE_IMAGES,
  SHOW_PACKAGES,
  SHOW_ROUNDS,
  TOURNAMENT_TITLES,
} from "../data";
import { usePlan } from "../lib/plan";
import { Btn, CtaBand, Head, PageHero, Reveal, Sec } from "../components/kit";
import { RequestForm } from "../components/RequestForm";

/* ------------------------------ Play ------------------------------ */

const FILTERS = ["All", "PS5", "PC", "Switch", "Tournament", "Family"] as const;

export function PlayPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(
    () =>
      GAMES.filter((g) => (filter === "All" ? true : filter === "Tournament" ? g.tournament : filter === "Family" ? g.family : (g.platforms as string[]).includes(filter))),
    [filter],
  );
  return (
    <>
      <PageHero image="game-wide" eyebrow="Play" title={<>Pick your <span>player mode</span></>} lede="Consoles, PCs, party games and a full game show set. Walk in by the hour or grab a day pass.">
        <Btn href="#book">Book now</Btn>
        <Btn href="#library" tone="white">
          Game library
        </Btn>
      </PageHero>

      <Sec>
        <Head eyebrow="Activities" title={<>Everything under <em>one roof</em></>} lede="Hourly rates and day passes are announced before launch." />
        <div className="rows">
          {ACTIVITIES.map((a, i) => (
            <Reveal key={a.id}>
              <article className={`arow${i % 2 ? " arow--flip" : ""}`}>
                <div className="arow__img">
                  <Photo name={a.image} alt={a.name} sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className="arow__body">
                  <span className="act__tag">{a.tag}</span>
                  <h3>{a.name}</h3>
                  <p>{a.blurb}</p>
                  <ul className="ticks">
                    {a.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec tone="navy">
        <div className="stats">
          {[
            ["32", "console stations"],
            ["2", "banks of 16"],
            ["8 + 8", "back to back"],
            ["1", "big screen"],
          ].map(([n, l]) => (
            <Reveal key={l} className="stat">
              <strong>{n}</strong>
              <span>{l}</span>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec tone="mist" id="library">
        <Head eyebrow="Game library" title={<>{GAMES.length} games and <em>counting</em></>} lede="A starting line-up of the most-played titles. The full library is confirmed before launch." />
        <div className="filters" role="group" aria-label="Filter games">
          {FILTERS.map((f) => (
            <button key={f} className={f === filter ? "is-on" : ""} onClick={() => setFilter(f)} aria-pressed={f === filter}>
              {f}
            </button>
          ))}
        </div>
        <motion.ul layout className="games">
          <AnimatePresence>
            {list.map((g) => (
              <motion.li key={g.name} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.2 }} className="game">
                <strong>{g.name}</strong>
                <span className="game__genre">{g.genre}</span>
                <span className="game__chips">
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
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="fine">Game names are trademarks of their publishers and are listed to show the planned line-up.</p>
      </Sec>

      <CtaBand title={<>Ready to hit <em>start</em>?</>} body="Tell us the date and the crew. We'll take it from there." cta="Plan my visit" />
    </>
  );
}

/* ---------------------------- Birthdays ---------------------------- */

export function BirthdaysPage() {
  const { plan } = usePlan();
  const initial: Record<string, string> = plan.kind === "birthday" ? { date: plan.date, size: plan.size } : {};
  return (
    <>
      <PageHero image="arena-birthday" eyebrow="Birthdays" title={<>The best party <span>you'll level up to</span></>} lede="A private party room, a hosted game show, gaming time and food. Pick a package and we'll handle the rest.">
        <Btn href="#birthday-form">Request a party</Btn>
        <Btn href="#packages" tone="white">
          See packages
        </Btn>
      </PageHero>

      <Sec id="packages">
        <Head eyebrow="Party packages" title={<>Choose your <em>level</em></>} lede="Sample packages. Final inclusions and pricing are confirmed when we reply to your request." />
        <div className="pkgs">
          {BIRTHDAY_PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className={`pkg pkg--${p.tone}`}>
                {p.tag && <span className="pkg__tag">{p.tag}</span>}
                <h3>{p.name}</h3>
                <p className="pkg__meta">
                  <span>
                    <Users size={15} /> {p.size}
                  </span>
                  <span>
                    <Clock size={15} /> {p.time}
                  </span>
                </p>
                <ul className="checks">
                  {p.items.map((it) => (
                    <li key={it}>
                      <Check size={16} /> {it}
                    </li>
                  ))}
                </ul>
                <Btn href="#birthday-form" tone={p.tone === "red" ? "red" : "navy"} small>
                  Pick {p.name}
                </Btn>
              </article>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec tone="mist">
        <Head eyebrow="How it works" title={<>Four steps to <em>party time</em></>} align="center" />
        <ol className="steps">
          {BIRTHDAY_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <li>
                <span className="steps__n">{i + 1}</span>
                <strong>{s.title}</strong>
                <p>{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Sec>

      <Sec tone="navy" id="birthday-form">
        <div className="start">
          <Reveal className="start__copy">
            <p className="eyebrow eyebrow--light">Request a party</p>
            <h2 className="start__title">
              Let's plan <em>the big day</em>
            </h2>
            <p>Send your request and our team will confirm the room, the host and your payment link.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RequestForm kind="birthday" initial={initial} />
          </Reveal>
        </div>
      </Sec>
    </>
  );
}

/* ------------------------------ Groups ------------------------------ */

const CLIPS = [
  { file: "show-video.mp4", poster: "show-still-sm.webp", label: "Spin the wheel" },
  { file: "show-video-2.mp4", poster: "show-buzz-sm.webp", label: "Buzzer battle" },
];

function ShowVideo() {
  const [clip, setClip] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const toggleSound = () => setMuted((m) => !m);
  return (
    <div className="vid">
      <video
        key={clip}
        className="vid__el"
        poster={mediaUrl(CLIPS[clip].poster)}
        autoPlay
        muted={muted}
        playsInline
        loop={false}
        preload="metadata"
        onEnded={() => setClip((c) => (c + 1) % CLIPS.length)}
        ref={(el) => {
          if (!el) return;
          if (paused && !el.paused) el.pause();
          if (!paused && el.paused) void el.play().catch(() => {});
        }}
        aria-label="Teams playing the game show: spinning the wheel, hitting buzzers and celebrating"
      >
        {hasMedia(CLIPS[clip].file.replace(".mp4", ".webm")) && <source src={mediaUrl(CLIPS[clip].file.replace(".mp4", ".webm"))} type="video/webm" />}
        {hasMedia(CLIPS[clip].file) && <source src={mediaUrl(CLIPS[clip].file)} type="video/mp4" />}
      </video>
      <div className="vid__bar">
        <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play video" : "Pause video"}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button onClick={toggleSound} aria-pressed={!muted}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />} {muted ? "Sound off" : "Sound on"}
        </button>
        <span className="vid__clips">
          {CLIPS.map((c, i) => (
            <button key={c.file} className={i === clip ? "is-on" : ""} onClick={() => setClip(i)}>
              {c.label}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}

export function GroupsPage() {
  const { plan } = usePlan();
  const [tab, setTab] = useState<"group" | "gameshow">(plan.kind === "gameshow" ? "gameshow" : "group");
  const initial: Record<string, string> = plan.kind === tab ? { date: plan.date, size: plan.size } : {};
  return (
    <>
      <PageHero image="arena-corporate" eyebrow="Groups & events" title={<>Team nights that <span>actually rock</span></>} lede="Corporate events, school trips and club nights with a live host, a private room and food to match.">
        <Btn href="#group-form">Plan an event</Btn>
        <Btn href="#game-show" tone="white">
          See the game show
        </Btn>
      </PageHero>

      <Sec>
        <Head eyebrow="Who it's for" title={<>An event for <em>every</em> group</>} />
        <div className="rows">
          {GROUP_TYPES.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title}>
                <article className={`arow${i % 2 ? " arow--flip" : ""}`}>
                  <div className="arow__img">
                    <Photo name={g.image} alt={g.title} sizes="(max-width: 900px) 100vw, 50vw" />
                  </div>
                  <div className="arow__body">
                    <span className="gt__icon gt__icon--lg">
                      <Icon size={24} />
                    </span>
                    <h3>{g.title}</h3>
                    <p>{g.body}</p>
                    <ul className="ticks">
                      {g.perks.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Sec>

      <Sec tone="navy" id="game-show">
        <div className="show">
          <Reveal>
            <ShowVideo />
          </Reveal>
          <div>
            <Head eyebrow="The game show" title={<>Spin it. Buzz it. <em>Win it.</em></>} lede="A real game-show set with light-up podiums, a quiz board and the big wheel, hosted live by our team." />
            <ol className="rounds">
              {SHOW_ROUNDS.map((r, i) => (
                <li key={r.title}>
                  <span>{i + 1}</span>
                  <div>
                    <strong>{r.title}</strong>
                    <p>{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Sec>

      <Sec tone="mist">
        <Head eyebrow="Game show packages" title={<>Pick your <em>party</em></>} lede="Pricing on request." />
        <div className="pkgs pkgs--4">
          {SHOW_PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className={`pkg pkg--plain${p.tag ? " pkg--hot" : ""}`}>
                {p.tag && <span className="pkg__tag">{p.tag}</span>}
                <h3>{p.name}</h3>
                <p className="pkg__meta">
                  <span>
                    <Users size={15} /> {p.size}
                  </span>
                  <span>
                    <Clock size={15} /> {p.time}
                  </span>
                </p>
                <p>{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec id="group-form">
        <div className="start start--light">
          <Reveal className="start__copy">
            <p className="eyebrow">Book it</p>
            <h2 className="start__title">
              Let's plan <em>your night</em>
            </h2>
            <div className="seg" role="tablist" aria-label="Request type">
              <button role="tab" aria-selected={tab === "group"} className={tab === "group" ? "is-on" : ""} onClick={() => setTab("group")}>
                Group event
              </button>
              <button role="tab" aria-selected={tab === "gameshow"} className={tab === "gameshow" ? "is-on" : ""} onClick={() => setTab("gameshow")}>
                Game show
              </button>
            </div>
            <p>Corporate, school or club nights and game show bookings both come to the same team. We reply with a confirmed slot.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RequestForm key={tab} kind={tab} initial={initial} />
          </Reveal>
        </div>
      </Sec>
    </>
  );
}

/* ------------------------------ Leagues ------------------------------ */

export function LeaguesPage() {
  const { plan } = usePlan();
  const initial: Record<string, string> = plan.kind === "league" ? { date: plan.date, size: plan.size } : {};
  return (
    <>
      <PageHero image="arena-league" eyebrow="Leagues & tournaments" title={<>Step into the <span>arena</span></>} lede="Weekly league nights, monthly Arena tournaments, events at partner venues and online brackets. One rulebook, one season.">
        <Btn href="#league-form">Join the circuit</Btn>
        <Btn href="#formats" tone="white">
          See the formats
        </Btn>
      </PageHero>

      <Sec id="formats">
        <Head eyebrow="Three formats" title={<>Choose your <em>game mode</em></>} lede="All formats follow the same rules, conduct standards and seasonal league structure." />
        <div className="trio trio--light">
          {MODES.map((m, i) => (
            <Reveal key={m.code} delay={i * 0.08}>
              <article className={`fmt mode--${m.color}`}>
                <div className="fmt__img">
                  <Photo name={MODE_IMAGES[i]} alt="" sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
                <div className="fmt__body">
                  <span className="mode__code">{m.code}</span>
                  <h3>{m.title}</h3>
                  <p>
                    <b>Where:</b> {m.where}
                  </p>
                  <p>
                    <b>Purpose:</b> {m.purpose}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec tone="mist">
        <Head eyebrow="The rhythm" title={<>Something on <em>every week</em></>} />
        <ul className="nights">
          {LEAGUE_NIGHTS.map((n, i) => (
            <Reveal key={n.what} delay={i * 0.06}>
              <li>
                <span className="nights__day">{n.day}</span>
                <strong>{n.what}</strong>
                <p>{n.detail}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Sec>

      <Sec>
        <div className="perk">
          <Reveal>
            <Head eyebrow="Season games" title={<>On the <em>bracket</em></>} lede="The first season's games and calendar are confirmed before launch. These are the titles we're building around." />
            <div className="chips">
              {TOURNAMENT_TITLES.map((t) => (
                <span key={t}>
                  <Trophy size={15} /> {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="perk__card">
              <Crown size={28} />
              <h3>Members play for less</h3>
              <p>Gamer Pro and Gamers Elite members get a guaranteed place in every Mega Tournament and 50% off entry fees, plus weekly sessions and a private community.</p>
              <Btn href="#book" tone="gold" small>
                Become a member <ArrowRight size={16} />
              </Btn>
            </div>
          </Reveal>
        </div>
      </Sec>

      <Sec tone="navy" id="league-form">
        <div className="start">
          <Reveal className="start__copy">
            <p className="eyebrow eyebrow--light">Sign up</p>
            <h2 className="start__title">
              Join the <em>circuit</em>
            </h2>
            <p>Enter an event, join a league or bring a tournament to your venue. Fair play, supervised floors and a published code of conduct on every format.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RequestForm kind="league" initial={initial} />
          </Reveal>
        </div>
      </Sec>
    </>
  );
}
