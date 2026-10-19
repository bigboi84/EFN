import { NAV, CONTACT } from "../data";
import { Logo } from "./Header";

export function Footer() {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Play",
      links: [
        { label: "Gaming & games", href: "#play" },
        { label: "Leagues & tournaments", href: "#leagues" },
        { label: "Game show", href: "#groups" },
        { label: "Game library", href: "#play" },
      ],
    },
    {
      title: "Plan",
      links: [
        { label: "Birthdays", href: "#birthdays" },
        { label: "Groups & events", href: "#groups" },
        { label: "Book now", href: "#book" },
        { label: "Gift & play cards", href: "#cards" },
      ],
    },
    {
      title: "Eat & drink",
      links: [
        { label: "Menu", href: "#eat" },
        { label: "Deals", href: "#deals" },
        { label: "Book a table", href: "#book" },
      ],
    },
    {
      title: "Visit",
      links: [
        { label: "Hours & location", href: "#visit" },
        { label: "House rules", href: "#visit" },
        { label: "FAQ", href: "#visit" },
      ],
    },
  ];
  return (
    <footer className="ftr">
      <div className="wrap ftr__top">
        <div className="ftr__brand">
          <Logo light />
          <p>Gaming, game shows and great food under one roof in Trinidad &amp; Tobago.</p>
          {(CONTACT.email || CONTACT.phone) && (
            <p className="ftr__contact">
              {CONTACT.email}
              {CONTACT.email && CONTACT.phone ? " · " : ""}
              {CONTACT.phone}
            </p>
          )}
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title} className="ftr__col">
            <h3>{c.title}</h3>
            {c.links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="wrap ftr__bar">
        <p>Alcohol-free. Smoke-free. Family-friendly. Part of Esports &amp; Fans Network.</p>
        <nav aria-label="Pages" className="ftr__mini">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
