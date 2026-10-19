import type { LucideIcon } from "lucide-react";
import { Briefcase, GraduationCap, Users, MessageSquareOff, WineOff, CigaretteOff, Handshake, Gamepad2, Crown } from "lucide-react";

// Shared with the EFN site so menus, games and packages stay in sync.
export { MENU_SECTIONS, COMBOS, GAMES, SHOW_PACKAGES, SHOW_ROUNDS, STANDARDS, TOURNAMENT_TITLES, MODES, MODE_IMAGES, CONTACT } from "../../src/data";

export type PageId = "play" | "birthdays" | "groups" | "leagues" | "eat" | "cards" | "deals" | "visit" | "book";

export const NAV: { id: PageId; label: string }[] = [
  { id: "play", label: "Play" },
  { id: "birthdays", label: "Birthdays" },
  { id: "groups", label: "Groups & Events" },
  { id: "leagues", label: "Leagues" },
  { id: "eat", label: "Eat & Drink" },
  { id: "cards", label: "Gift Cards" },
  { id: "deals", label: "Deals" },
  { id: "visit", label: "Visit" },
];

export type BookKind = "birthday" | "group" | "gameshow" | "league" | "table";

export const PLAN_OPTIONS: { kind: BookKind; label: string }[] = [
  { kind: "birthday", label: "A birthday party" },
  { kind: "group", label: "A group or company event" },
  { kind: "gameshow", label: "A game show night" },
  { kind: "league", label: "A tournament or league" },
  { kind: "table", label: "Play and eat (table)" },
];

export const ACTIVITIES = [
  {
    id: "floor",
    name: "Gaming Floor",
    tag: "32 console stations",
    image: "game-wide",
    blurb: "Two banks of next-gen consoles, eight a side and back to back, facing one big screen. Play by the hour or grab a day pass.",
    facts: ["Hourly play and day passes", "Scrims and league nights", "Supervised floor"],
  },
  {
    id: "pc",
    name: "PC Battle Row",
    tag: "High-refresh PCs",
    image: "game-pc",
    blurb: "High-end PCs with fast monitors, mechanical keyboards and headsets for shooters, MOBAs and PC-first titles.",
    facts: ["Competitive PC titles", "Team practice sessions", "Headsets on every seat"],
  },
  {
    id: "sofa",
    name: "Sofa Lounge",
    tag: "Party games and food",
    image: "sofa-smash",
    blurb: "Deep sofas and big screens for party games, Smash nights and casual play. Pizza and wings come straight to you.",
    facts: ["Party and family games", "Served by the café", "Great for groups of 4 to 8"],
  },
  {
    id: "show",
    name: "Game Show Rooms",
    tag: "Buzzers and the big wheel",
    image: "show-still",
    blurb: "A real game-show set with light-up podiums, a quiz board and a prize wheel. Teams of friends, family or coworkers battle for the trophy.",
    facts: ["Four rounds, hosted live", "6 to 30 players", "Family nights and parties"],
  },
  {
    id: "stage",
    name: "Stage & Screens",
    tag: "Finals and watch parties",
    image: "food-watchparty",
    blurb: "Finals, league nights and watch parties for major esports events, with live casting on the big screens.",
    facts: ["Monthly tournaments", "Streamed on EFN Media", "Watch parties"],
  },
  {
    id: "party",
    name: "Party Room",
    tag: "Bookable for groups",
    image: "arena-birthday",
    blurb: "A private room for birthdays, team practice and company events, with its own screen and food service.",
    facts: ["Birthdays and celebrations", "Corporate bookings", "Team practice"],
  },
];

export const BIRTHDAY_PACKAGES = [
  {
    name: "Level Up",
    size: "Up to 8 guests",
    time: "2 hours",
    tone: "cyan" as const,
    items: ["Private party room", "One hosted game show round", "1 hour of console play", "Pizza and drinks for every guest"],
  },
  {
    name: "Boss Level",
    size: "Up to 15 guests",
    time: "2.5 hours",
    tone: "red" as const,
    tag: "Most popular",
    items: ["Decorated private party room", "Full four-round game show", "90 minutes of console or PC play", "Pizza, wings and drinks", "A dedicated party host"],
  },
  {
    name: "Mega Party",
    size: "Up to 25 guests",
    time: "3 hours",
    tone: "gold" as const,
    items: ["Party room and game show room", "Full game show with trophy and prizes", "2 hours of gaming for the group", "Full party food spread", "Dedicated host and a winners' photo"],
  },
];

export const BIRTHDAY_STEPS = [
  { title: "Pick a package", body: "Choose the size and style of party that fits your crew." },
  { title: "Send a request", body: "Tell us the date, the guests and who is turning a year older." },
  { title: "We confirm", body: "Our team checks the room, confirms your slot and sends a payment link." },
  { title: "Party time", body: "Your host welcomes everyone. You enjoy the party." },
];

export const GROUP_TYPES: { icon: LucideIcon; title: string; body: string; image: string; perks: string[] }[] = [
  {
    icon: Briefcase,
    title: "Corporate and team building",
    body: "Game show showdowns, tournaments and food platters for teams, with a host who runs the whole night.",
    image: "arena-corporate",
    perks: ["Hosted game show for 10 to 30", "Gaming tournaments", "Food platters", "Private room option"],
  },
  {
    icon: GraduationCap,
    title: "Schools and youth groups",
    body: "Daytime visits with supervised play, learning sessions and lunch. Part of EFN NextGen XP.",
    image: "xp-learning",
    perks: ["Off-peak daytime hours", "Learning corner sessions", "Supervised, age-appropriate play", "Special-education sessions"],
  },
  {
    icon: Users,
    title: "Clubs and teams",
    body: "Team practice, scrims and watch parties in the private room or on the gaming floor.",
    image: "oval-pit",
    perks: ["Scrims and practice blocks", "Watch parties", "Team meals", "Season league entry"],
  },
];

export const LEAGUE_NIGHTS = [
  { day: "Weekly", what: "Scrims and league nights", detail: "Regular play to build your ranking before the monthly events." },
  { day: "Weekly", what: "Family nights", detail: "Team trivia and Family Feud-style games for all ages." },
  { day: "Weekly", what: "Watch parties", detail: "Major esports events on the big screens with food and friends." },
  { day: "Monthly", what: "Arena tournaments", detail: "Flagship events on the stage, streamed on EFN Media." },
];

export const DEALS = [
  { title: "Member rates", tag: "Members", image: "oval-booth", body: "Gamer Pro and Gamers Elite members get member rates in the lounge and 50% off tournament entry." },
  { title: "Squad Box", tag: "TT$420", image: "menu-squad", body: "A whole pizza, 4 sliders, 12 wings, loaded fries and 4 drinks. Feeds 4." },
  { title: "Family Night", tag: "Weekly", image: "show-host", body: "Weekly family nights with team trivia and Family Feud-style rounds." },
  { title: "Daytime sessions", tag: "Schools", image: "xp-learning", body: "Off-peak hours set aside for school visits, seminars and special-education sessions." },
];

export const CARD_AMOUNTS = ["TT$100", "TT$250", "TT$500", "TT$1,000", "Other amount"];

export const FAQS = [
  { q: "Do I need to be a member to visit?", a: "No. Anyone can visit the lounge. Members get priority, discounts and access to the private community." },
  { q: "Is there an age limit?", a: "The Arena has age-appropriate game policies. Under-18 members need parental consent, and children's parties and school visits are supervised." },
  { q: "Is alcohol served?", a: "No. EFN Arena is alcohol-free, smoke-free and vape-free." },
  { q: "What are the opening hours and prices?", a: "Opening hours and hourly rates are being finalised and will be announced before launch." },
  { q: "Where is the Arena?", a: "The location is being confirmed and will be announced before launch." },
  { q: "Can I book the Arena for my own event?", a: "Yes. Brands, schools and other organisers can book the Arena. Send a request on the Book page and our team will reply." },
  { q: "How do tournaments work?", a: "Tournaments run at the Arena, at partner venues and online, all under the same rules and seasonal league. See the Leagues page." },
];

export const RULES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: MessageSquareOff, title: "Keep it clean", body: "No cursing, slurs or personal trash talk. Hype your squad, never put down a player." },
  { icon: WineOff, title: "Zero alcohol", body: "No alcohol in the Arena. Sodas, smoothies and mocktails only." },
  { icon: CigaretteOff, title: "No smoking or vaping", body: "No cigarettes, vapes or e-cigs inside or at the entrance." },
  { icon: Handshake, title: "Respect everyone", body: "No bullying or harassment of players, parents, staff or the ref." },
  { icon: Gamepad2, title: "Respect the rigs", body: "No slamming controllers or headsets. Leave your station clean." },
  { icon: Crown, title: "Play fair", body: "No cheats, hacks, exploits or account sharing. The admin's call is final." },
];

export const MARQUEE = ["Gaming", "Game Shows", "Birthdays", "Tournaments", "Wood-fired pizza", "League nights", "Watch parties", "Family fun"];
