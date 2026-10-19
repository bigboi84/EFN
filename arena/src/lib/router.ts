import { useEffect, useState } from "react";
import { NAV, type PageId } from "../data";

export type Route = { page: PageId | "home"; anchor: string | null };

export const PAGE_IDS = new Set<string>([...NAV.map((n) => n.id), "book"]);

function read(): Route {
  const h = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (PAGE_IDS.has(h)) return { page: h as PageId, anchor: null };
  return { page: "home", anchor: h || null };
}

/** Hash routing: `#birthdays` opens a page; any other `#id` scrolls to that section. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
