import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { BookKind } from "../data";

/** "Plan your visit" answers carried from the home hero to the booking page. */
export type Plan = { kind: BookKind; date: string; size: string };

type Ctx = { plan: Plan; setPlan: (p: Partial<Plan>) => void };

const PlanContext = createContext<Ctx>({ plan: { kind: "birthday", date: "", size: "" }, setPlan: () => {} });

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setState] = useState<Plan>({ kind: "birthday", date: "", size: "" });
  const value = useMemo<Ctx>(() => ({ plan, setPlan: (p) => setState((s) => ({ ...s, ...p })) }), [plan]);
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export const usePlan = () => useContext(PlanContext);
