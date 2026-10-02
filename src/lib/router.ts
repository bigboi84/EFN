import { useEffect, useState } from "react";
import { PAGES, type PageId } from "../data";

export type Route = { page: PageId | "home"; anchor: string | null };

const PAGE_IDS = new Set<string>(PAGES.map((p) => p.id));

function read(): Route {
  const h = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (PAGE_IDS.has(h)) return { page: h as PageId, anchor: null };
  return { page: "home", anchor: h || null };
}

/** Hash routing: `#food` opens a page; any other `#id` scrolls to that section on the home page. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
