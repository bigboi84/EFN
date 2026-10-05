# EFN Arena & Lounge

Interactive website for the EFN (Esports & Fans Network) Arena & Lounge in Trinidad & Tobago, built for officials, sponsors, players and families.

## The experience

1. **Arcade intro** — a gold EFN token hovers in front of an arcade cabinet. Tap it (or press Enter) to drop it in the coin slot, the CRT boots the Arena ("stations online, café hot, stage live…"), then **PRESS START** zooms the camera into the screen and the site powers on. `Esc` or *Skip intro* jumps straight in.
2. **Home** — video hero with player/fan goals · What happens here · The Bowl (oval layout) · Stage select · Zone select · Finale.
   **Pages** (hash links) — `#tournaments`, `#food` (menu with prices), `#games` (game library), `#gameshow`, `#membership`, `#about`, `#nextgen` (EFN NextGen XP: schools & education). Booking forms on Tournaments, Game Show and NextGen XP.
3. **Game touches** — HUD nav with XP/scroll bar and level counter, chiptune sound effects (Web Audio, mute toggle, no audio files), achievement toasts as sections are reached, and a Konami-code easter egg (↑ ↑ ↓ ↓ ← → ← → B A).

Respects `prefers-reduced-motion`, works at phone width, all controls keyboard accessible.

## Stack

React 18 + TypeScript + Vite, [Motion](https://motion.dev) for animation, Lucide icons. Fonts: Russo One, Chakra Petch, Press Start 2P (Google Fonts).

## Run it

```bash
npm install
npm run dev           # local dev server
npm run build         # production build → dist/
npm run build:single  # one self-contained HTML file → dist-single/index.html
```

`dist-single/index.html` is handy for emailing or presenting offline (fonts still load from Google Fonts when online).

## Edit content

All copy lives in `src/data.ts` (zones, hub, schedule, tournament formats, membership benefits, standards, partner packages, to-confirm list).

**Before sharing:** fill in `CONTACT.email` / `CONTACT.phone` in `src/data.ts` so the finale shows a real partnership contact.
