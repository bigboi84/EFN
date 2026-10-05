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
  page: PageId;
};

export const ZONES: Zone[] = [
  {
    id: "floor",
    page: "games",
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
    page: "food",
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
    page: "tournaments",
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
    page: "gameshow",
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
    page: "nextgen",
    name: "Learning Corner",
    // Education lives in EFN NextGen XP.
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
    page: "gameshow",
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


export const HERO_SLIDES = [
  { image: "food-dining", tag: "The Café", caption: "Pizza, burgers and wings, with the game on every screen" },
  { image: "oval-booth", tag: "Dine above the action", caption: "Raised booths behind glass, looking straight down on the gaming pit" },
  { image: "food-sofa", tag: "Lounge", caption: "Sink into the sofas, grab a controller, share a pie" },
  { image: "food-booth", tag: "Booths", caption: "Your crew, your table, a front-row view of the action" },
  { image: "food-kitchen", tag: "Open kitchen", caption: "Wood-fired pizza and smash burgers, made in front of you" },
  { image: "food-overview", tag: "The whole Arena", caption: "Dining, gaming, a stage and a game show under one roof" },
];


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

/* ---------- Pages ---------- */

export type PageId = "tournaments" | "food" | "games" | "gameshow" | "membership" | "about" | "nextgen";

export const PAGES: { id: PageId; label: string; short: string; image: string; blurb: string; color: "red" | "gold" | "cyan" }[] = [
  { id: "tournaments", label: "Tournaments", short: "Tournaments", image: "oval-pit", blurb: "Compete in the Arena, at partner venues or online.", color: "red" },
  { id: "food", label: "Food & Drink", short: "Food", image: "menu-pizza", blurb: "Wood-fired pizza, smash burgers, wings and more.", color: "gold" },
  { id: "games", label: "Games", short: "Games", image: "game-bank", blurb: "32 console stations, PCs and the full game library.", color: "cyan" },
  { id: "gameshow", label: "Game Show", short: "Game Show", image: "show-win", blurb: "Buzzers, the big wheel and bragging rights.", color: "gold" },
  { id: "membership", label: "Membership", short: "Membership", image: "food-booth", blurb: "Gamer Pro and Gamers Elite perks.", color: "cyan" },
  { id: "about", label: "About EFN", short: "About", image: "oval-wide", blurb: "The plan, the hub and how it all connects.", color: "red" },
  { id: "nextgen", label: "EFN NextGen XP", short: "NextGen XP", image: "xp-coding", blurb: "Schools, learning and giving back through gaming.", color: "cyan" },
];

export const MODE_IMAGES = ["oval-pit", "tour-venue", "tour-online"];

export const TOURNAMENT_TITLES = ["EA Sports FC", "Fortnite", "Marvel Rivals", "Rocket League", "Tekken 8", "Super Smash Bros. Ultimate", "NBA 2K", "Valorant"];

export type MenuItem = { name: string; desc: string; price: string; tag?: string };
export type MenuSection = { id: string; title: string; image: string; note?: string; items: MenuItem[] };

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "pizza",
    title: "Wood-fired pizza",
    image: "menu-pizza",
    note: '12" pies, fired to order',
    items: [
      { name: "Margherita", desc: "San Marzano tomato, mozzarella, fresh basil", price: "95" },
      { name: "Pepperoni Power-Up", desc: "Double pepperoni, mozzarella, hot honey drizzle", price: "115", tag: "Fan fave" },
      { name: "Jerk Chicken", desc: "Jerk chicken, peppers, red onion, scotch bonnet aioli", price: "125", tag: "Local twist" },
      { name: "BBQ Boss Level", desc: "Smoky BBQ chicken, bacon, caramelised onion", price: "125" },
      { name: "Veggie Combo", desc: "Mushroom, peppers, olives, sweet corn, spinach", price: "105" },
    ],
  },
  {
    id: "burgers",
    title: "Smash burgers",
    image: "menu-burger",
    note: "Served with fries or cassava fries",
    items: [
      { name: "Classic Smash", desc: "Beef patty, cheddar, pickles, house sauce", price: "85" },
      { name: "Double Smash", desc: "Two patties, double cheddar, caramelised onions", price: "110", tag: "Fan fave" },
      { name: "Crispy Chicken", desc: "Buttermilk fried chicken, slaw, pepper mayo", price: "90" },
      { name: "Jerk Burger", desc: "Jerk-spiced patty, pineapple chow salsa, lettuce", price: "105", tag: "Local twist" },
    ],
  },
  {
    id: "wings",
    title: "Wings",
    image: "menu-wings",
    note: "6 pc / 12 pc, with celery and dip",
    items: [
      { name: "Buffalo", desc: "Classic hot sauce, blue cheese dip", price: "65 / 120" },
      { name: "Honey Garlic", desc: "Sticky glaze, toasted sesame", price: "65 / 120" },
      { name: "Jerk", desc: "Dry-rubbed and grilled, spring onion", price: "70 / 125", tag: "Local twist" },
      { name: "Tamarind Pepper", desc: "Sweet, sour and a little fire", price: "70 / 125" },
    ],
  },
  {
    id: "sides",
    title: "Sides & snacks",
    image: "menu-squad",
    items: [
      { name: "Loaded Fries", desc: "Cheese sauce, bacon bits, scallions", price: "55" },
      { name: "Cassava Fries", desc: "Crispy cassava, garlic pepper dip", price: "45" },
      { name: "Mozzarella Sticks", desc: "Six sticks, marinara", price: "50" },
      { name: "Squad Box", desc: "Whole pizza, 4 sliders, 12 wings, loaded fries, 4 drinks", price: "420", tag: "Feeds 4" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    image: "menu-drinks",
    note: "Alcohol-free menu",
    items: [
      { name: "Sorrel Spritz", desc: "Sorrel, ginger, orange, soda", price: "35", tag: "Local twist" },
      { name: "Mango Passion Smoothie", desc: "Mango, passion fruit, yoghurt", price: "40" },
      { name: "Blue Raspberry Lemonade", desc: "Made fresh, crushed ice", price: "30" },
      { name: "Iced Mauby", desc: "Spiced, sweet and refreshing", price: "25" },
      { name: "Sodas & water", desc: "Cans and bottled water", price: "15" },
    ],
  },
];

export const COMBOS = [
  { name: "Gamer Combo", desc: "2 slices, 6 wings, fries and a drink", price: "99" },
  { name: "Station Snack", desc: "Mozzarella sticks or fries and a soda, delivered to your seat", price: "60" },
  { name: "Family Feast", desc: "2 pizzas, 12 wings, 2 sides, 4 drinks", price: "480" },
];

export type Platform = "PS5" | "PC" | "Switch";
export type Game = { name: string; genre: string; platforms: Platform[]; tournament?: boolean; family?: boolean };

export const GAMES: Game[] = [
  { name: "EA Sports FC", genre: "Football", platforms: ["PS5", "PC"], tournament: true },
  { name: "Fortnite", genre: "Battle royale", platforms: ["PS5", "PC", "Switch"], tournament: true },
  { name: "Marvel Rivals", genre: "Hero shooter", platforms: ["PS5", "PC"], tournament: true },
  { name: "Call of Duty", genre: "Shooter", platforms: ["PS5", "PC"] },
  { name: "NBA 2K", genre: "Basketball", platforms: ["PS5"], tournament: true },
  { name: "Rocket League", genre: "Car football", platforms: ["PS5", "PC", "Switch"], tournament: true, family: true },
  { name: "Tekken 8", genre: "Fighting", platforms: ["PS5", "PC"], tournament: true },
  { name: "Street Fighter 6", genre: "Fighting", platforms: ["PS5", "PC"] },
  { name: "Mortal Kombat 1", genre: "Fighting", platforms: ["PS5"] },
  { name: "Super Smash Bros. Ultimate", genre: "Party fighter", platforms: ["Switch"], tournament: true, family: true },
  { name: "Mario Kart", genre: "Racing", platforms: ["Switch"], family: true },
  { name: "Gran Turismo 7", genre: "Racing", platforms: ["PS5"] },
  { name: "Valorant", genre: "Tactical shooter", platforms: ["PC"], tournament: true },
  { name: "Counter-Strike 2", genre: "Tactical shooter", platforms: ["PC"] },
  { name: "League of Legends", genre: "MOBA", platforms: ["PC"] },
  { name: "Apex Legends", genre: "Battle royale", platforms: ["PS5", "PC"] },
  { name: "Overwatch 2", genre: "Hero shooter", platforms: ["PS5", "PC"] },
  { name: "Minecraft", genre: "Sandbox", platforms: ["PS5", "PC", "Switch"], family: true },
  { name: "Fall Guys", genre: "Party", platforms: ["PS5", "PC", "Switch"], family: true },
  { name: "Just Dance", genre: "Dance", platforms: ["Switch"], family: true },
];

export const HARDWARE = [
  { image: "game-bank", title: "32 console stations", body: "Two banks of next-gen consoles, eight a side, back to back, with gaming chairs and headsets." },
  { image: "game-pc", title: "PC battle row", body: "High-end PCs with high-refresh monitors for shooters, MOBAs and PC-first titles." },
  { image: "sofa-smash", title: "Sofa lounge", body: "Big screens and couches for party games, Smash nights and casual play with food." },
];

export const SHOW_ROUNDS = [
  { title: "Survey says", body: "Feud-style rounds where teams guess the top answers from a survey of Trinbagonians." },
  { title: "Trivia board", body: "Pick a category and a value. Sport, music, food, T&T history, gaming and pop culture." },
  { title: "Spin the wheel", body: "The wheel decides double points, steals, wild cards and the final bonus." },
  { title: "Buzzer blitz", body: "Fast-fire questions. First to the buzzer answers, wrong answers hand it over." },
];

export const SHOW_PACKAGES = [
  { name: "Family Night", size: "6–12 players", time: "60 min", body: "Two teams, all four rounds, scoreboard and a trophy for the winners." },
  { name: "Birthday Battle", size: "8–16 players", time: "90 min", body: "Custom questions about the birthday star, party food and a prize for the winning team.", tag: "Popular" },
  { name: "Office Showdown", size: "10–20 players", time: "90 min", body: "Team building with company trivia, food platters and a winners' photo." },
  { name: "School Trip", size: "Up to 30 students", time: "2 hours", body: "Curriculum-friendly trivia rounds, lunch and supervised play." },
];

export const XP_PROGRAMMES = [
  { image: "xp-learning", tag: "Learning corner", title: "School visits", body: "Daytime visits to the learning corner: e-books, digital reading and seminars on digital skills, online safety and healthy gaming habits." },
  { image: "xp-coding", tag: "Workshops", title: "Code & Create", body: "Hands-on game design and coding sessions where students build and play their own levels." },
  { image: "xp-inclusive", tag: "Special education", title: "Inclusive Play", body: "Calm, supervised special-education sessions with adaptive controllers and games chosen for every ability." },
  { image: "xp-schools", tag: "Schools league", title: "School tours", body: "Inter-school tournaments at the Arena and on tour at schools and community centres." },
];

export const XP_PILLARS = [
  { title: "Learn", body: "Digital literacy, coding, game design and online safety." },
  { title: "Play", body: "Supervised, age-appropriate gaming that builds teamwork." },
  { title: "Level up", body: "A look at careers in esports: casting, streaming, events and design." },
  { title: "Give back", body: "Off-peak hours set aside for schools, community groups and special education." },
];
