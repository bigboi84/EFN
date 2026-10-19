import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Loader2, Ticket } from "lucide-react";
import { submitBooking } from "../../../src/lib/bookings";
import { CONTACT } from "../data";
import { FORMS, type FieldDef, type FormDef } from "../forms";
import { Btn } from "./kit";

export function RequestForm({ kind, initial = {}, compact = false }: { kind: FormDef["kind"]; initial?: Record<string, string>; compact?: boolean }) {
  const form = FORMS[kind];
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "saved" | "offline">("idle");
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);

  const valueOf = (f: FieldDef) => (values[f.id] ?? (f.type === "select" ? (f.options?.[0] ?? "") : "")).trim();
  const set = (k: string, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of form.fields) {
      const v = valueOf(f);
      if (f.required && !v) e[f.id] = `${f.label} is required.`;
      else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) e[f.id] = "Enter an email like name@example.com.";
    }
    setErrors(e);
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    const firstBad = form.fields.find((f) => e[f.id]);
    if (firstBad) {
      document.getElementById(`${kind}-${firstBad.id}`)?.focus();
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
  };

  const summary = () => [`${form.title} (${ref})`, ...form.fields.map((f) => `${f.label}: ${valueOf(f)}`)].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const done = state === "saved" || state === "offline";

  return (
    <div className={`rform${compact ? " rform--compact" : ""}`}>
      <div className="rform__head">
        <span className="rform__icon">
          <Ticket size={20} />
        </span>
        <div>
          <h3>{form.title}</h3>
          <p>{form.intro}</p>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" className="rform__done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="stub">
              <span className="stub__k">{state === "saved" ? "Request received" : "Request ready"}</span>
              <span className="stub__ref">{ref}</span>
              <span className="stub__name">{values.name}</span>
            </div>
            {state === "saved" ? (
              <p>
                Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""}. The EFN Arena team has your request and will reply by email
                {values.phone ? " or WhatsApp" : ""}. Keep your reference handy.
              </p>
            ) : (
              <>
                <p>
                  Online booking isn't connected in this preview yet. Copy your request and send it to the Arena team
                  {CONTACT.email ? ` at ${CONTACT.email}` : ""}
                  {CONTACT.phone ? ` or ${CONTACT.phone}` : ""}.
                </p>
                <Btn tone="ghost" onClick={copy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy my request"}
                </Btn>
                <pre className="rform__sum">{summary()}</pre>
              </>
            )}
            <Btn
              tone="navy"
              onClick={() => {
                setState("idle");
                setCopied(false);
              }}
            >
              Make another request
            </Btn>
          </motion.div>
        ) : (
          <motion.form key="form" className="rform__grid" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {form.fields.map((f) => {
              const fid = `${kind}-${f.id}`;
              const err = errors[f.id];
              const common = { id: fid, name: f.id, "aria-invalid": err ? true : undefined, "aria-describedby": err ? `${fid}-err` : undefined };
              return (
                <div key={f.id} className={`field${f.full || f.type === "textarea" ? " field--full" : ""}${err ? " has-err" : ""}`}>
                  <label htmlFor={fid}>
                    {f.label}
                    {f.required && <span aria-hidden="true"> *</span>}
                  </label>
                  {f.type === "select" ? (
                    <select {...common} value={valueOf(f)} onChange={(e) => set(f.id, e.target.value)}>
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea {...common} rows={3} value={values[f.id] ?? ""} placeholder={f.placeholder} onChange={(e) => set(f.id, e.target.value)} />
                  ) : (
                    <input
                      {...common}
                      type={f.type}
                      value={values[f.id] ?? ""}
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
            <div className="field field--full rform__actions">
              <Btn type="submit" disabled={state === "sending"}>
                {state === "sending" ? <Loader2 size={18} className="spin" /> : <Ticket size={18} />}
                {state === "sending" ? "Sending..." : form.button}
              </Btn>
              <p>We only use your details to reply to this request. Under-18s need a parent or guardian to book.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
