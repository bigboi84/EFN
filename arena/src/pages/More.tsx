import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Flame, Gift, Coins, Mail, MapPin, Phone, ShieldCheck, Utensils, Clock, Ticket, CalendarDays } from "lucide-react";
import { Photo } from "../../../src/components/ui";
import { CONTACT, COMBOS, DEALS, MENU_SECTIONS, PLAN_OPTIONS, RULES, STANDARDS, ACTIVITIES, type BookKind } from "../data";
import { usePlan } from "../lib/plan";
import { Btn, Coin, CtaBand, Faq, Head, PageHero, Reveal, Sec } from "../components/kit";
import { RequestForm } from "../components/RequestForm";
import { FORMS } from "../forms";

/* ------------------------------- Eat ------------------------------- */

export function EatPage() {
  const [tab, setTab] = useState(MENU_SECTIONS[0].id);
  const active = MENU_SECTIONS.find((s) => s.id === tab)!;
  const { plan } = usePlan();
  const initial: Record<string, string> = plan.kind === "table" ? { date: plan.date, size: plan.size } : {};
  return (
    <>
      <PageHero image="menu-pizza" eyebrow="Eat & drink" title={<>Fuel the <span>game</span></>} lede="Wood-fired pizza, smash burgers, wings and cold drinks, served to your table, your sofa or straight to your gaming station.">
        <Btn href="#menu">See the menu</Btn>
        <Btn href="#table" tone="white">
          Book a table
        </Btn>
      </PageHero>

      <Sec id="menu">
        <Head eyebrow="The menu" title={<>Pick your <em>loadout</em></>} lede="Prices in TT$. Sample menu; final dishes and prices are confirmed before launch. Alcohol-free." />
        <div className="tabs" role="tablist" aria-label="Menu sections">
          {MENU_SECTIONS.map((s) => (
            <button key={s.id} role="tab" aria-selected={s.id === tab} className={s.id === tab ? "is-on" : ""} onClick={() => setTab(s.id)}>
              {s.title}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active.id} className="menu" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <figure className="menu__photo">
              <Photo name={active.image} alt={active.title} sizes="(max-width: 900px) 100vw, 45vw" />
              {active.note && <figcaption>{active.note}</figcaption>}
            </figure>
            <ul className="menu__list" role="tabpanel">
              {active.items.map((it) => (
                <li key={it.name}>
                  <div className="menu__line">
                    <span className="menu__name">{it.name}</span>
                    {it.tag && <span className="menu__tag">{it.tag}</span>}
                    <span className="menu__dots" aria-hidden="true" />
                    <span className="menu__price">
                      <small>TT$</small>
                      {it.price}
                    </span>
                  </div>
                  <p>{it.desc}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </Sec>

      <Sec tone="mist">
        <Head eyebrow="Bundles" title={<>Share the <em>feast</em></>} />
        <div className="combos">
          {COMBOS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.07}>
              <div className="combo">
                <Flame size={22} />
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
        <p className="fine">
          <Utensils size={14} /> Order at the counter or from your station. Allergen information available on request.
        </p>
      </Sec>

      <Sec tone="navy" id="table">
        <div className="start">
          <Reveal className="start__copy">
            <p className="eyebrow eyebrow--light">Reserve</p>
            <h2 className="start__title">
              Book a <em>table</em>
            </h2>
            <p>Booths, sofas and high-tops with a front-row view of the games. Tell us when and how many.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RequestForm kind="table" initial={initial} />
          </Reveal>
        </div>
      </Sec>
    </>
  );
}

/* ------------------------------ Cards ------------------------------ */

export function CardsPage() {
  return (
    <>
      <PageHero image="arena-cards" eyebrow="Gift & play cards" title={<>Give the gift of <span>game time</span></>} lede="Gift cards for any gamer, and a Token Card that holds credit for games and food.">
        <Btn href="#card-form">Order a card</Btn>
      </PageHero>

      <Sec>
        <div className="cards2">
          <Reveal>
            <div className="pc pc--navy pc--lg">
              <span className="pc__top">
                <Coin size={34} /> EFN ARENA
              </span>
              <span className="pc__big">Gift card</span>
              <span className="pc__chip" />
            </div>
            <h3 className="cards2__h">
              <Gift size={20} /> Gift card
            </h3>
            <p>The easy present for a birthday, a thank-you or a gamer who has everything. Choose an amount and add a message.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pc pc--red pc--lg">
              <span className="pc__top">
                <Coin size={34} /> EFN ARENA
              </span>
              <span className="pc__big">Token Card</span>
              <span className="pc__chip" />
            </div>
            <h3 className="cards2__h">
              <Coins size={20} /> Token Card
            </h3>
            <p>Load credit once and use it across games and food at the counter. One balance, no fumbling for cash.</p>
          </Reveal>
        </div>
      </Sec>

      <Sec tone="mist">
        <Head eyebrow="How it works" title={<>Three steps to <em>loaded</em></>} align="center" />
        <ol className="steps steps--3">
          {[
            ["Choose", "Pick a gift card or a Token Card and an amount."],
            ["Confirm", "We reply with a payment link. The card is issued once you've paid."],
            ["Play", "Show the card at the counter to pay for games, food and more."],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={i * 0.07}>
              <li>
                <span className="steps__n">{i + 1}</span>
                <strong>{t}</strong>
                <p>{b}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="fine fine--c">Cards launch with the Arena. Amounts and terms are confirmed before launch.</p>
      </Sec>

      <Sec tone="navy" id="card-form">
        <div className="start">
          <Reveal className="start__copy">
            <p className="eyebrow eyebrow--light">Order</p>
            <h2 className="start__title">
              Get your <em>card</em>
            </h2>
            <p>Tell us what you'd like. We'll confirm the details and send a payment link.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RequestForm kind="card" />
          </Reveal>
        </div>
      </Sec>
    </>
  );
}

/* ------------------------------- Deals ------------------------------ */

export function DealsPage() {
  return (
    <>
      <PageHero image="oval-booth" eyebrow="Deals & specials" title={<>Bonus <span>power-ups</span></>} lede="Member rates, family nights and shareable boxes. Offer details are confirmed before launch.">
        <Btn href="#offers">Get offers by email</Btn>
      </PageHero>
      <Sec>
        <div className="bigdeals">
          {DEALS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 0.08}>
              <article className="bdeal">
                <div className="bdeal__img">
                  <Photo name={d.image} alt="" sizes="(max-width: 900px) 100vw, 40vw" />
                  <span className="deal__tag">{d.tag}</span>
                </div>
                <div className="bdeal__body">
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Sec>
      <Sec tone="navy" id="offers">
        <div className="start">
          <Reveal className="start__copy">
            <p className="eyebrow eyebrow--light">Stay in the loop</p>
            <h2 className="start__title">
              First to know <em>about launch</em>
            </h2>
            <p>Launch week, member offers and tournament dates. No spam, just the good stuff.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RequestForm kind="offers" compact />
          </Reveal>
        </div>
      </Sec>
    </>
  );
}

/* ------------------------------- Visit ------------------------------ */

export function VisitPage() {
  return (
    <>
      <PageHero image="oval-wide" eyebrow="Visit" title={<>Plan your <span>visit</span></>} lede="Everything you need to know before you walk in: where, when, what to expect and the house rules.">
        <Btn href="#book">Book now</Btn>
      </PageHero>

      <Sec>
        <div className="info">
          <Reveal>
            <div className="info__card">
              <MapPin size={26} />
              <h3>Location</h3>
              <p>The Arena is in Trinidad &amp; Tobago. The address and directions will be announced before launch.</p>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="info__card">
              <Clock size={26} />
              <h3>Hours</h3>
              <p>Open daily. Opening hours and hourly rates are being finalised and will be announced before launch.</p>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="info__card">
              <Phone size={26} />
              <h3>Contact</h3>
              {CONTACT.email || CONTACT.phone ? (
                <p>
                  {CONTACT.email && (
                    <>
                      <Mail size={14} /> {CONTACT.email}
                      <br />
                    </>
                  )}
                  {CONTACT.phone && (
                    <>
                      <Phone size={14} /> {CONTACT.phone}
                    </>
                  )}
                </p>
              ) : (
                <p>Contact details will be announced before launch. For now, send a request from the Book page.</p>
              )}
            </div>
          </Reveal>
        </div>
      </Sec>

      <Sec tone="mist">
        <Head eyebrow="Inside the Arena" title={<>What to <em>expect</em></>} lede="An oval Arena with the gaming pit on the floor and the restaurant on a raised tier behind glass, so every table has a view." />
        <div className="inside">
          <Reveal className="inside__img">
            <Photo name="oval-wide" alt="The oval Arena: gaming pit on the floor and diners on a raised glass tier" sizes="(max-width: 900px) 100vw, 55vw" />
          </Reveal>
          <ul className="inside__list">
            {ACTIVITIES.map((a) => (
              <li key={a.id}>
                <strong>{a.name}</strong>
                <span>{a.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </Sec>

      <Sec>
        <Head eyebrow="House rules" title={<>Good vibes <em>only</em></>} />
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
        <Reveal>
          <div className="safe">
            <ShieldCheck size={26} />
            <div>
              <h3>Safe play, always</h3>
              <ul>
                {STANDARDS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Sec>

      <Sec tone="mist">
        <Head eyebrow="FAQ" title={<>Good <em>questions</em></>} />
        <Faq />
      </Sec>

      <CtaBand title={<>See you at <em>the Arena</em></>} body="Plan a party, a team night or just a game and a pizza." />
    </>
  );
}

/* ------------------------------- Book ------------------------------- */

const TAB_FORMS: BookKind[] = ["birthday", "group", "gameshow", "league", "table"];
const TAB_LABEL: Record<BookKind, string> = {
  birthday: "Birthday party",
  group: "Group event",
  gameshow: "Game show",
  league: "Tournament",
  table: "Table",
};

export function BookPage() {
  const { plan } = usePlan();
  const [kind, setKind] = useState<BookKind>(plan.kind);
  useEffect(() => setKind(plan.kind), [plan.kind]);
  const initial = { ...(plan.date ? { date: plan.date } : {}), ...(plan.size ? { size: plan.size } : {}) };
  const label = PLAN_OPTIONS.find((o) => o.kind === kind)?.label ?? "";
  return (
    <>
      <PageHero image="show-win" eyebrow="Book" title={<>Let's get you <span>booked</span></>} lede="Choose what you're planning, fill in the details and our team will reply with a confirmed slot.">
      </PageHero>
      <Sec tone="mist">
        <div className="booking">
          <div>
            <div className="seg seg--wrap" role="tablist" aria-label="What are you booking?">
              {TAB_FORMS.map((k) => (
                <button key={k} role="tab" aria-selected={kind === k} className={kind === k ? "is-on" : ""} onClick={() => setKind(k)}>
                  {TAB_LABEL[k]}
                </button>
              ))}
            </div>
            <RequestForm key={kind} kind={kind} initial={initial} />
          </div>
          <aside className="next">
            <h3>
              <Ticket size={20} /> What happens next
            </h3>
            <ol>
              <li>We check the room, the host and the date for {label ? label.toLowerCase() : "your plan"}.</li>
              <li>We reply by email or WhatsApp to confirm.</li>
              <li>For parties and events we send a payment link to lock it in.</li>
              <li>You turn up and play.</li>
            </ol>
            <p className="fine">
              <CalendarDays size={14} /> {FORMS[kind].title}
            </p>
          </aside>
        </div>
      </Sec>
    </>
  );
}
