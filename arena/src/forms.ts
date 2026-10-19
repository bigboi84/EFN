import { BIRTHDAY_PACKAGES, CARD_AMOUNTS, SHOW_PACKAGES, TOURNAMENT_TITLES } from "./data";

export type FieldDef = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
};

export type FormDef = {
  kind: "birthday" | "group" | "league" | "table" | "card" | "offers" | "gameshow";
  title: string;
  intro: string;
  button: string;
  fields: FieldDef[];
};

const CONTACT: FieldDef[] = [
  { id: "name", label: "Your name", type: "text", required: true, placeholder: "First and last name" },
  { id: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+1 868 ..." },
];

const TIMES = ["Morning (9am to 12pm)", "Afternoon (12 to 4pm)", "Early evening (4 to 7pm)", "Night (7 to 10pm)"];

export const FORMS: Record<FormDef["kind"], FormDef> = {
  birthday: {
    kind: "birthday",
    title: "Birthday party request",
    intro: "Tell us about the party and we'll confirm your slot and send a payment link.",
    button: "Request my party",
    fields: [
      { id: "package", label: "Package", type: "select", required: true, options: BIRTHDAY_PACKAGES.map((p) => `${p.name} (${p.size})`) },
      { id: "child", label: "Birthday star's name", type: "text", required: true },
      { id: "age", label: "Turning", type: "number", placeholder: "e.g. 12" },
      { id: "size", label: "Number of guests", type: "number", required: true, placeholder: "e.g. 10" },
      { id: "date", label: "Preferred date", type: "date", required: true },
      { id: "time", label: "Time slot", type: "select", options: TIMES },
      ...CONTACT,
      { id: "notes", label: "Anything we should know?", type: "textarea", placeholder: "Favourite games, allergies, theme...", full: true },
    ],
  },
  group: {
    kind: "group",
    title: "Group or company event",
    intro: "Corporate nights, school trips and club events. Tell us what you have in mind.",
    button: "Send my request",
    fields: [
      { id: "type", label: "Type of group", type: "select", required: true, options: ["Company or team", "School or youth group", "Club or sports team", "Brand or organiser"] },
      { id: "org", label: "Organisation", type: "text", placeholder: "Company, school or club name" },
      { id: "size", label: "Group size", type: "number", required: true, placeholder: "e.g. 20" },
      { id: "date", label: "Preferred date", type: "date", required: true },
      { id: "wants", label: "What are you after?", type: "select", options: ["Game show night", "Gaming tournament", "Gaming plus food", "Private room only", "Not sure yet"] },
      { id: "time", label: "Time slot", type: "select", options: TIMES },
      ...CONTACT,
      { id: "notes", label: "Goals and details", type: "textarea", placeholder: "Budget, dietary needs, how you'd like the night to go...", full: true },
    ],
  },
  gameshow: {
    kind: "gameshow",
    title: "Game show booking",
    intro: "Pick a package and a date and we'll lock in the room and the host.",
    button: "Book my game show",
    fields: [
      { id: "package", label: "Package", type: "select", required: true, options: SHOW_PACKAGES.map((p) => `${p.name} (${p.size})`) },
      { id: "size", label: "Group size", type: "number", required: true, placeholder: "e.g. 10" },
      { id: "date", label: "Preferred date", type: "date", required: true },
      { id: "time", label: "Time slot", type: "select", options: TIMES },
      { id: "food", label: "Add food?", type: "select", options: ["Yes, add party platters", "Maybe, show me options", "No food"] },
      ...CONTACT,
      { id: "notes", label: "Occasion and custom questions", type: "textarea", placeholder: "Birthday? Office team? Tell us who's playing.", full: true },
    ],
  },
  league: {
    kind: "league",
    title: "Tournament and league sign-up",
    intro: "Enter an event, join the league, or bring EFN to your venue.",
    button: "Lock in my entry",
    fields: [
      { id: "type", label: "I want to", type: "select", required: true, options: ["Enter an EFN tournament", "Join a league", "Host a tournament at the Arena", "Bring a tournament to our venue", "Run an online bracket"] },
      { id: "game", label: "Game", type: "select", required: true, options: [...TOURNAMENT_TITLES, "Other / not sure yet"] },
      { id: "team", label: "Team or school", type: "text", placeholder: "Optional" },
      { id: "size", label: "Number of players", type: "number", placeholder: "e.g. 8" },
      { id: "date", label: "Preferred date", type: "date" },
      ...CONTACT,
      { id: "notes", label: "Anything else?", type: "textarea", placeholder: "Format, venue, streaming, prizes...", full: true },
    ],
  },
  table: {
    kind: "table",
    title: "Table request",
    intro: "Reserve a booth, sofa or table for food and a front-row view of the games.",
    button: "Request a table",
    fields: [
      { id: "size", label: "Party size", type: "number", required: true, placeholder: "e.g. 4" },
      { id: "date", label: "Date", type: "date", required: true },
      { id: "time", label: "Time", type: "select", options: TIMES },
      { id: "seat", label: "Seating", type: "select", options: ["Booth", "Sofa lounge", "High-top near the big screen", "Anywhere is fine"] },
      ...CONTACT,
      { id: "notes", label: "Occasion or requests", type: "textarea", placeholder: "Birthday, date night, high chair...", full: true },
    ],
  },
  card: {
    kind: "card",
    title: "Order a card",
    intro: "Choose a card and an amount. We'll confirm and send a payment link before the card is issued.",
    button: "Order my card",
    fields: [
      { id: "card", label: "Card type", type: "select", required: true, options: ["Gift card", "Token Card (play and food credit)"] },
      { id: "amount", label: "Amount", type: "select", required: true, options: CARD_AMOUNTS },
      { id: "recipient", label: "Who is it for?", type: "text", placeholder: "Name of the lucky player" },
      ...CONTACT,
      { id: "notes", label: "Message or other amount", type: "textarea", placeholder: "A note to print or the amount you'd like", full: true },
    ],
  },
  offers: {
    kind: "offers",
    title: "Get Arena offers",
    intro: "Be first to hear about launch week, member offers and tournament dates.",
    button: "Sign me up",
    fields: [
      { id: "name", label: "Your name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
    ],
  },
};
