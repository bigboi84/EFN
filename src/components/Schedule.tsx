import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { RHYTHM } from "../data";
import { Section, SectionHead, Reveal } from "./ui";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// Illustrative 4-week month: every day open, weekday daytime sessions,
// two weekly nights, one monthly tournament on the stage.
type Cell = { edu: boolean; weekly: boolean; boss: boolean };
const MONTH: Cell[] = Array.from({ length: 28 }, (_, i) => {
  const dow = i % 7;
  return {
    edu: dow < 5,
    weekly: dow === 2 || dow === 4 || dow === 5,
    boss: i === 26,
  };
});

export function Schedule() {
  return (
    <Section id="schedule" className="schedule" achievement="Every day counts: the calendar is full">
      <div className="wrap">
        <SectionHead
          level="04"
          kicker="How it runs"
          title={
            <>
              Something on <span className="hl-cyan">every day</span>. A boss level every month.
            </>
          }
          lede="The Arena runs on a set rhythm, so the doors are always open for play and food and there is a big moment on the stage every month."
        />

        <div className="schedule__grid">
          <ol className="quests">
            {RHYTHM.map((r, i) => (
              <Reveal key={r.when} delay={i * 0.08}>
                <li className={`quest quest--${r.color}`}>
                  <span className="quest__tag px">{r.tag}</span>
                  <div className="quest__body">
                    <h3>{r.when}</h3>
                    <p>{r.what}</p>
                  </div>
                  {i === RHYTHM.length - 1 && <Trophy className="quest__trophy" size={26} />}
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.15}>
            <div className="panel month">
              <div className="panel__bar">
                <span className="px">A month at the Arena</span>
                <span className="px month__note">Illustrative</span>
              </div>
              <div className="month__head" aria-hidden="true">
                {DAYS.map((d, i) => (
                  <span key={i} className="px">
                    {d}
                  </span>
                ))}
              </div>
              <div className="month__grid" role="img" aria-label="Illustrative month: open play every day, daytime education on weekdays, three weekly event nights and one monthly tournament.">
                {MONTH.map((c, i) => (
                  <motion.div
                    key={i}
                    className={`day ${c.boss ? "day--boss" : ""}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.2 + i * 0.022, type: "spring", stiffness: 380, damping: 22 }}
                  >
                    <span className="day__n">{i + 1}</span>
                    {c.boss ? (
                      <Trophy size={16} className="day__trophy" />
                    ) : (
                      <span className="day__pips">
                        {c.edu && <i className="pip pip--gold" />}
                        {c.weekly && <i className="pip pip--red" />}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
              <ul className="month__legend">
                <li>
                  <i className="pip pip--cyan" /> Open play + café, every day
                </li>
                <li>
                  <i className="pip pip--gold" /> Schools &amp; seminars
                </li>
                <li>
                  <i className="pip pip--red" /> Scrims, league &amp; family nights
                </li>
                <li>
                  <Trophy size={13} className="legend-trophy" /> Arena tournament
                </li>
              </ul>
              <p className="month__foot">First-season calendar and games are confirmed before launch.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
