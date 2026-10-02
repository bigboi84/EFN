import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, Copy, Check, Loader2 } from "lucide-react";
import { submitBooking, type BookingKind } from "../lib/bookings";
import { CONTACT, TOURNAMENT_TITLES, SHOW_PACKAGES } from "../data";
import { sfx, unlockAudio } from "../lib/sound";
import { Reveal } from "./ui";

type Field = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
};

const CONTACT_FIELDS: Field[] = [
  { id: "name", label: "Your name", type: "text", required: true, placeholder: "First and last name" },
  { id: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+1 868 ..." },
];

const FORMS: Record<BookingKind, { title: string; button: string; fields: Field[] }> = {
  tournament: {
    title: "Book a tournament",
    button: "Lock in my booking",
    fields: [
      { id: "type", label: "I want to", type: "select", required: true, options: ["Enter an EFN tournament", "Host a tournament at the Arena", "Bring a tournament to our venue", "Run an online bracket", "Book a team practice / scrim"] },
      ...CONTACT_FIELDS,
      { id: "team", label: "Team, school or company", type: "text", placeholder: "Optional" },
      { id: "game", label: "Game", type: "select", required: true, options: [...TOURNAMENT_TITLES, "Other / not sure yet"] },
      { id: "players", label: "Number of players", type: "number", placeholder: "e.g. 16" },
      { id: "date", label: "Preferred date", type: "date" },
      { id: "notes", label: "Anything else?", type: "textarea", placeholder: "Format, venue, streaming, prizes...", full: true },
    ],
  },
  gameshow: {
    title: "Book the game show",
    button: "Book my game show",
    fields: [
      { id: "package", label: "Package", type: "select", required: true, options: SHOW_PACKAGES.map((p) => `${p.name} (${p.size})`) },
      ...CONTACT_FIELDS,
      { id: "players", label: "Group size", type: "number", required: true, placeholder: "e.g. 10" },
      { id: "date", label: "Preferred date", type: "date", required: true },
      { id: "time", label: "Time slot", type: "select", options: ["Afternoon (12–4pm)", "Early evening (4–7pm)", "Night (7–10pm)"] },
      { id: "food", label: "Add food?", type: "select", options: ["Yes, add party platters", "Maybe, show me options", "No food"] },
      { id: "notes", label: "Occasion and custom questions", type: "textarea", placeholder: "Birthday? Office team? Tell us who's playing.", full: true },
    ],
  },
  school: {
    title: "Book a school visit",
    button: "Request a visit",
    fields: [
      { id: "programme", label: "Programme", type: "select", required: true, options: ["School visit & learning corner", "Code & Create workshop", "Inclusive Play session", "Schools league / school tour"] },
      ...CONTACT_FIELDS,
      { id: "team", label: "School", type: "text", required: true },
      { id: "players", label: "Number of students", type: "number", placeholder: "e.g. 25" },
      { id: "date", label: "Preferred date", type: "date" },
      { id: "notes", label: "Ages, needs and goals", type: "textarea", placeholder: "Form level, any accessibility needs, what you'd like students to get out of it.", full: true },
    ],
  },
};

export function BookingForm({ kind, id }: { kind: BookingKind; id?: string }) {
  const form = FORMS[kind];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "saved" | "offline">("idle");
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const valueOf = (f: Field) => (values[f.id] ?? (f.type === "select" ? f.options?.[0] ?? "" : "")).trim();

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of form.fields) {
      const v = valueOf(f);
      if (f.required && !v) e[f.id] = `${f.label} is required.`;
      else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) e[f.id] = "Enter an email like name@example.com.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    unlockAudio();
    if (!validate()) {
      sfx.blip();
      const first = form.fields.find((f) => f.required && !valueOf(f));
      if (first) document.getElementById(`${kind}-${first.id}`)?.focus();
      return;
    }
    setState("sending");
    const fields: Record<string, string> = {};
    form.fields.forEach((f) => {
      const v = valueOf(f);
      if (v) fields[f.id] = v;
    });
    const res = await submitBooking(kind, fields);
    setRef(res.ref);
    setState(res.status);
    sfx.start();
  };

  const summary = () =>
    [`${form.title} — ${ref}`, ...form.fields.map((f) => `${f.label}: ${values[f.id] ?? (f.type === "select" ? f.options?.[0] : "") ?? ""}`)].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setValues({});
    setState("idle");
    setCopied(false);
  };

  return (
    <Reveal>
      <div className="booking panel" id={id}>
        <div className="panel__bar">
          <span className="px">
            <Ticket size={14} /> {form.title}
          </span>
          <span className="px booking__step">{state === "saved" || state === "offline" ? "Complete" : "Player 1 entry"}</span>
        </div>

        <AnimatePresence mode="wait">
          {state === "saved" || state === "offline" ? (
            <motion.div key="done" className="booking__done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="ticket">
                <p className="px ticket__k">{state === "saved" ? "Booking request received" : "Request ready"}</p>
                <p className="ticket__ref">{ref}</p>
                <p className="ticket__name">{values.name}</p>
              </div>
              {state === "saved" ? (
                <p className="booking__msg">
                  Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""}. The EFN team has your request and will confirm by email
                  {values.phone ? " or WhatsApp" : ""}. Keep your reference handy.
                </p>
              ) : (
                <>
                  <p className="booking__msg">
                    Online booking isn't connected in this preview yet. Copy your request and send it to the EFN team
                    {CONTACT.email ? ` at ${CONTACT.email}` : ""}
                    {CONTACT.phone ? ` or ${CONTACT.phone}` : ""}.
                  </p>
                  <button type="button" className="btn btn--ghost" onClick={copy}>
                    {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy my request"}
                  </button>
                  <pre className="booking__summary">{summary()}</pre>
                </>
              )}
              <button type="button" className="btn btn--gold" onClick={reset}>
                Make another booking
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" className="booking__form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {form.fields.map((f) => {
                const fid = `${kind}-${f.id}`;
                const err = errors[f.id];
                const common = {
                  id: fid,
                  name: f.id,
                  value: values[f.id] ?? "",
                  "aria-invalid": err ? true : undefined,
                  "aria-describedby": err ? `${fid}-err` : undefined,
                };
                return (
                  <div key={f.id} className={`field ${f.full || f.type === "textarea" ? "field--full" : ""} ${err ? "has-err" : ""}`}>
                    <label htmlFor={fid}>
                      {f.label}
                      {f.required && <span aria-hidden="true"> *</span>}
                    </label>
                    {f.type === "select" ? (
                      <select {...common} value={values[f.id] ?? f.options?.[0]} onChange={(e) => set(f.id, e.target.value)}>
                        {f.options?.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea {...common} rows={3} placeholder={f.placeholder} onChange={(e) => set(f.id, e.target.value)} />
                    ) : (
                      <input
                        {...common}
                        type={f.type}
                        min={f.type === "number" ? 1 : undefined}
                        inputMode={f.type === "number" ? "numeric" : undefined}
                        autoComplete={f.id === "name" ? "name" : f.id === "email" ? "email" : f.id === "phone" ? "tel" : undefined}
                        placeholder={f.placeholder}
                        onChange={(e) => set(f.id, e.target.value)}
                      />
                    )}
                    {err && (
                      <p className="field__err" id={`${fid}-err`}>
                        {err}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="field field--full booking__actions">
                <button type="submit" className="btn btn--red" disabled={state === "sending"}>
                  {state === "sending" ? <Loader2 size={18} className="spin" /> : <Ticket size={18} />}
                  {state === "sending" ? "Sending..." : form.button}
                </button>
                <p className="booking__fine">We only use your details to reply to this request. Under-18s need a parent or guardian to book.</p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
