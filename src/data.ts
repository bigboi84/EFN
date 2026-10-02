import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  UtensilsCrossed,
  Mic2,
  PartyPopper,
  BookOpen,
  DoorClosed,
  Trophy,
  BadgeCheck,
  Radio,
  GraduationCap,
} from "lucide-react";

/** Fill this in before sharing so the final call-to-action shows a real contact. */
export const CONTACT = {
  email: "",
  phone: "",
};

export const TARGETS = { players: 1000, fans: 5000 };

export type Zone = {
  id: string;
  name: string;
  short: string;
  icon: LucideIcon;
  color: "red" | "gold" | "cyan";
  offers: string;
  usedFor: string[];
  partnerFit: string;
  image?: string;
};

export const ZONES: Zone[] = [
  {
    id: "floor",
    image: "game-wide",
    name: "Gaming Floor",
    short: "Floor",
    icon: Monitor,
    color: "red",
    offers:
      "Premium PC and console stations running Fortnite, EA FC, Marvel Rivals and more. The same rigs power every tournament, so the hardware works every day, not only on event days.",
    usedFor: ["Hourly play", "Day passes", "Scrims", "League nights"],
    partnerFit: "Hardware, peripherals, connectivity",
  },
  {
    id: "cafe",
    image: "food-kitchen",
    name: "Café",
    short: "Café",
    icon: UtensilsCrossed,
    color: "gold",
    offers:
      "Food, drinks and snacks served straight to stations and tables. Players refuel without leaving the match.",
    usedFor: ["Everyday visits", "Event-day crowds"],
    partnerFit: "Food & beverage, energy drinks, snacks",
  },
  {
    id: "stage",
    image: "food-watchparty",
    name: "Stage & Screens",
    short: "Stage",
    icon: Mic2,
    color: "cyan",
    offers:
      "A competition stage with big screens, streaming and a casting desk. This is where finals are played and the crowd watches live.",
    usedFor: ["Tournaments", "Finals", "Watch parties"],
    partnerFit: "Title & naming rights, broadcast",
  },
  {
    id: "family",
    image: "show-still",
    name: "Family Game-Show Zone",
    short: "Game Show",
    icon: PartyPopper,
    color: "gold",
    offers:
      "Team trivia and Family Feud-style games with buzzers and a scoreboard. Parents, kids and friends play on the same side.",
    usedFor: ["Family nights", "Group bookings", "Parties"],
    partnerFit: "Family brands, retail, telecom",
  },
  {
    id: "learn",
    name: "Learning Corner",
    short: "Learning",
    icon: BookOpen,
    color: "cyan",
    offers:
      "E-books, digital reading and a seminar space that keeps the Arena busy and useful during daytime hours.",
    usedFor: ["Seminars", "School visits", "Special-education sessions"],
    partnerFit: "Education, banking, public sector",
  },
  {
    id: "private",
    image: "food-sofa",
    name: "Private Room",
    short: "Private",
    icon: DoorClosed,
    color: "red",
    offers:
      "A bookable room for groups, with its own space for a party, a team practice or a company event.",
    usedFor: ["Parties", "Team practice", "Corporate bookings"],
    partnerFit: "Corporate hospitality",
  },
];

export type HubNode = {
  id: string;
  name: string;
  icon: LucideIcon;
  line: string;
};

export const HUB: HubNode[] = [
  {
    id: "tournaments",
    name: "Tournaments",
    icon: Trophy,
    line: "Tournaments and watch parties bring people into the lounge.",
  },
  {
    id: "membership",
    name: "Membership",
    icon: BadgeCheck,
    line: "Lounge visitors become members, with priority, discounts and a private community.",
  },
  {
    id: "media",
    name: "EFN Media",
    icon: Radio,
    line: "EFN Media turns every event into streams and content.",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    line: "Education programmes fill daytime hours and build trust with parents and schools.",
  },
];

export const RHYTHM = [
  {
    when: "Daily",
    tag: "Daily quest",
    what: "Open play by the hour, café service, member rates and perks.",
    color: "cyan" as const,
  },
  {
    when: "Daytime off-peak",
    tag: "Side quest",
    what: "School visits, special-education sessions and seminars.",
    color: "gold" as const,
  },
  {
    when: "Weekly",
    tag: "Weekly challenge",
    what: "Scrims, league nights, family nights and watch parties for major esports events.",
    color: "red" as const,
  },
  {
    when: "Monthly & seasonal",
    tag: "Boss level",
    what: "EFN tournaments on the Arena stage, streamed on EFN Media.",
    color: "gold" as const,
  },
];

export const MODES = [
  {
    code: "HOME",
    title: "Home events",
    where: "EFN Arena",
    purpose: "Flagship tournaments, league finals and watch parties.",
    color: "red" as const,
  },
  {
    code: "AWAY",
    title: "Partner-venue events",
    where: "Malls, schools, community centres and partner sites such as Charran's World",
    purpose: "Reach other regions, run school tours and host sponsor activations.",
    color: "gold" as const,
  },
  {
    code: "ONLINE",
    title: "Online events",
    where: "Discord-run brackets, streamed on Twitch and YouTube",
    purpose: "Weekly scrims, qualifiers and nationwide reach.",
    color: "cyan" as const,
  },
];

export const TIER_ROWS: { benefit: string; pro: string | boolean; elite: string | boolean }[] = [
  { benefit: "Place in all EFN Mega Tournaments", pro: "Guaranteed", elite: "Guaranteed" },
  { benefit: "Tournament entry fees", pro: "50% off", elite: "50% off" },
  { benefit: "Private online gaming community", pro: true, elite: true },
  { benefit: "Weekly gaming sessions and scrims", pro: true, elite: true },
  { benefit: "Perks, prizes and giveaways", pro: true, elite: true },
  { benefit: "Lounge benefits", pro: "Member rates", elite: "Member rates + Elite perks" },
  { benefit: "Full Discord access (Elite channels)", pro: false, elite: true },
  { benefit: "Priority for special community events", pro: false, elite: true },
  { benefit: "Elite-only activities", pro: false, elite: true },
];

export const STANDARDS = [
  "Supervised floor staff at all times",
  "A published code of conduct for players and visitors",
  "Age-appropriate game policies",
  "Safeguarding rules for minors, with parental consent for under-18 members",
  "A moderated online community on Discord",
];

export const POWER_UPS = [
  {
    name: "Stage Title Partner",
    rarity: "Legendary",
    color: "gold" as const,
    body: "Your name on the competition stage, the big screens and the casting desk, at every final and watch party.",
  },
  {
    name: "Tournament Series Partner",
    rarity: "Epic",
    color: "red" as const,
    body: "Present the monthly Arena tournaments and league finals, streamed live on EFN Media.",
  },
  {
    name: "Café & Refuel Partner",
    rarity: "Epic",
    color: "red" as const,
    body: "Be the food and drink served to every station and table, every day the doors are open.",
  },
  {
    name: "Hardware Partner",
    rarity: "Rare",
    color: "cyan" as const,
    body: "Power the PC and console stations that are played daily and used for every tournament.",
  },
  {
    name: "Community & Schools Partner",
    rarity: "Rare",
    color: "cyan" as const,
    body: "Back the school visits, seminars and special-education sessions that run in daytime hours.",
  },
  {
    name: "Road Tour Partner",
    rarity: "Rare",
    color: "cyan" as const,
    body: "Take EFN tournaments to malls, schools and community centres across Trinidad & Tobago.",
  },
];

export const TO_CONFIRM = [
  "Arena location, size and floor layout",
  "Number of stations, consoles and PCs",
  "Opening hours and hourly rates",
  "Café menu",
  "Member lounge rates and Elite-only perks",
  "Membership monthly prices",
  "First season's tournament calendar and games",
  "Partner venues and terms with Charran's World",
  "Staffing plan for floor, café and events",
  "Code of conduct and safeguarding policy",
];

export const NAV = [
  { id: "bowl", label: "The Bowl" },
  { id: "cafe", label: "Café" },
  { id: "floor", label: "Gaming" },
  { id: "gameshow", label: "Game Show" },
  { id: "modes", label: "Tournaments" },
  { id: "membership", label: "Membership" },
  { id: "partners", label: "Partners" },
];

export const HERO_SLIDES = [
  { image: "food-dining", tag: "The Café", caption: "Pizza, burgers and wings, with the game on every screen" },
  { image: "oval-booth", tag: "Dine above the action", caption: "Raised booths behind glass, looking straight down on the gaming pit" },
  { image: "food-sofa", tag: "Lounge", caption: "Sink into the sofas, grab a controller, share a pie" },
  { image: "food-booth", tag: "Booths", caption: "Your crew, your table, a front-row view of the action" },
  { image: "food-kitchen", tag: "Open kitchen", caption: "Wood-fired pizza and smash burgers, made in front of you" },
  { image: "food-overview", tag: "The whole Arena", caption: "Dining, gaming, a stage and a game show under one roof" },
];

export const MENU = ["Wood-fired pizza", "Smash burgers", "Wings & dips", "Loaded fries", "Mocktails & sodas"];

export const FLOOR_SPECS = [
  { k: "32", v: "Console stations" },
  { k: "2", v: "Banks of 16" },
  { k: "8 + 8", v: "Back to back per bank" },
  { k: "1", v: "Big monitoring screen" },
];

export const SHOW_FEATURES = [
  { title: "Spin the wheel", body: "A full-size prize wheel decides the round, the points and the bragging rights." },
  { title: "Buzzer podiums", body: "Light-up podiums with real buzzers and live scores for every team." },
  { title: "Team trivia & Feud-style rounds", body: "Family Feud-style survey rounds and trivia boards built for groups." },
  { title: "Party-ready", body: "Family nights, birthdays, office teams and group bookings." },
];
