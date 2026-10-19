import { useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRoute } from "./lib/router";
import { PAGE_IDS } from "./lib/router";
import { PlanProvider } from "./lib/plan";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Btn } from "./components/kit";
import { Home } from "./pages/Home";
import { PlayPage, BirthdaysPage, GroupsPage, LeaguesPage } from "./pages/Core";
import { EatPage, CardsPage, DealsPage, VisitPage, BookPage } from "./pages/More";
import type { PageId } from "./data";

const VIEWS: Record<PageId, () => JSX.Element> = {
  play: PlayPage,
  birthdays: BirthdaysPage,
  groups: GroupsPage,
  leagues: LeaguesPage,
  eat: EatPage,
  cards: CardsPage,
  deals: DealsPage,
  visit: VisitPage,
  book: BookPage,
};

export default function App() {
  const route = useRoute();
  const View = route.page === "home" ? Home : VIEWS[route.page];

  // New page: start at the top. Home anchors scroll to their section.
  useEffect(() => {
    if (route.page === "home" && route.anchor) {
      const id = route.anchor;
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route.page, route.anchor]);

  // In-page anchors (#menu, #packages...) scroll without leaving the current page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || PAGE_IDS.has(id)) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <PlanProvider>
        <a href="#main" className="skip" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
          Skip to content
        </a>
        <Header page={route.page} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main key={route.page} id="main" tabIndex={-1} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
            <View />
          </motion.main>
        </AnimatePresence>
        <Footer />
        {route.page !== "book" && (
          <div className="dock">
            <Btn href="#book">Book now</Btn>
          </div>
        )}
      </PlanProvider>
    </MotionConfig>
  );
}
