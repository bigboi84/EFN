import { useEffect, useRef } from "react";
import { sfx } from "../lib/sound";

/**
 * Pixel-art "Stage 1" that plays on the arcade screen after PRESS START:
 * a player runs past the Port of Spain night skyline collecting EFN tokens,
 * reaches the neon Arena and runs through its glowing door. Drawn at a low
 * internal resolution so it stays crisp (pixelated) while the camera zooms in.
 */
const RED = "#ff2e4d";
const GOLD = "#ffc23d";
const CYAN = "#2ef2ff";
const VOID = "#07060f";

type Token = { x: number; y: number; got: boolean; pop: number };

export function GameScene({ duration = 2600 }: { duration?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const H = 144;
    const aspect = cv.clientWidth / Math.max(1, cv.clientHeight) || 1.4;
    const W = Math.round(H * aspect);
    cv.width = W;
    cv.height = H;
    ctx.imageSmoothingEnabled = false;

    const GROUND = Math.round(H * 0.78);
    const PX = Math.round(W * 0.26);
    const stars = Array.from({ length: 40 }, (_, i) => ({ x: (i * 53) % W, y: (i * 29) % Math.round(H * 0.45), p: i % 7 }));
    const tokens: Token[] = Array.from({ length: 6 }, (_, i) => ({ x: W * 0.55 + i * 34, y: GROUND - 18 - (i % 2) * 14, got: false, pop: 0 }));
    let score = 0;
    let start = 0;
    let raf = 0;

    const rect = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    };
    const text = (s: string, x: number, y: number, c: string, size = 6, align: CanvasTextAlign = "left") => {
      ctx.font = `${size}px "Press Start 2P", monospace`;
      ctx.textAlign = align;
      ctx.fillStyle = "#000";
      ctx.fillText(s, x + 1, y + 1);
      ctx.fillStyle = c;
      ctx.fillText(s, x, y);
    };

    const skyline = (off: number) => {
      // Northern Range hills
      ctx.fillStyle = "#1a1235";
      ctx.beginPath();
      ctx.moveTo(0, GROUND - 26);
      for (let x = 0; x <= W; x += 8) ctx.lineTo(x, GROUND - 30 - Math.sin((x + off * 0.2) / 23) * 7 - Math.sin((x + off * 0.2) / 9) * 2);
      ctx.lineTo(W, GROUND);
      ctx.lineTo(0, GROUND);
      ctx.fill();
      // City towers with lit windows
      for (let i = 0; i < 14; i++) {
        const bx = ((i * 37 - off * 0.45) % (W + 60) + W + 60) % (W + 60) - 30;
        const bh = 18 + ((i * 17) % 26);
        rect(bx, GROUND - bh, 14, bh, "#120d26");
        for (let wy = GROUND - bh + 3; wy < GROUND - 3; wy += 4)
          for (let wx = 2; wx < 12; wx += 4) if ((i + wx + wy) % 3 === 0) rect(bx + wx, wy, 1, 1, (i + wy) % 5 ? GOLD : CYAN);
      }
    };

    const palm = (x: number, h: number) => {
      rect(x, GROUND - h, 2, h, "#0b0818");
      ctx.fillStyle = "#0b0818";
      for (const [dx, dy] of [[-7, 2], [7, 2], [-5, -1], [5, -1], [0, -3]]) {
        ctx.beginPath();
        ctx.ellipse(x + 1 + dx, GROUND - h + dy, 6, 2, dx * 0.08, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const arena = (x: number, t: number) => {
      const w = 74;
      const top = GROUND - 46;
      rect(x, top + 10, w, 36, "#160f2c");
      // oval roof ring
      ctx.strokeStyle = CYAN;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, top + 10, w / 2 + 4, 7, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#0e0a1f";
      ctx.beginPath();
      ctx.ellipse(x + w / 2, top + 10, w / 2 + 2, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // sign
      rect(x + w / 2 - 14, top + 15, 28, 9, (t / 200) % 2 < 1 ? RED : "#c41a36");
      text("EFN", x + w / 2, top + 22, "#fff", 6, "center");
      // windows strip
      for (let i = 0; i < 8; i++) rect(x + 5 + i * 8.5, top + 28, 5, 3, i % 3 ? GOLD : CYAN);
      // door
      rect(x + w / 2 - 7, GROUND - 13, 14, 13, GOLD);
      rect(x + w / 2 - 5, GROUND - 11, 10, 11, "#ffe79a");
      return x + w / 2;
    };

    const player = (x: number, y: number, t: number) => {
      const f = Math.floor(t / 90) % 2;
      rect(x + 2, y, 6, 5, "#5a3a26"); // head
      rect(x + 2, y - 1, 6, 2, "#151020"); // hair
      rect(x + 1, y + 5, 8, 6, RED); // jersey
      rect(x + 3, y + 6, 4, 1, GOLD);
      rect(x + 1, y + 11, 8, 3, "#1b2a55"); // shorts
      rect(x + (f ? 1 : 5), y + 14, 3, 3, "#f1eefc"); // legs
      rect(x + (f ? 6 : 2), y + 14, 3, 2, "#f1eefc");
      rect(x + 8, y + 6 + f, 2, 3, "#5a3a26"); // arm
    };

    const coin = (x: number, y: number, t: number) => {
      const w = Math.max(1, Math.round(Math.abs(Math.cos(t / 120)) * 7));
      rect(x - w / 2, y - 4, w, 8, GOLD);
      if (w > 3) rect(x - w / 2 + 1, y - 3, 1, 4, "#fff3c4");
    };

    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      const k = Math.min(1, t / duration);
      const speed = 0.06; // px per ms of world scroll
      const scroll = t * speed;

      // sky
      const g = ctx.createLinearGradient(0, 0, 0, GROUND);
      g.addColorStop(0, VOID);
      g.addColorStop(0.65, "#2a0f3a");
      g.addColorStop(1, "#5a1636");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      for (const s of stars) if ((Math.floor(t / 150) + s.p) % 7) rect(s.x, s.y, 1, 1, "#d8d0ff");
      // striped sun
      const sx = W * 0.7, sy = GROUND - 16, sr = 30;
      for (let y = -sr; y < 0; y++) {
        if (y > -12 && (y + 40) % 4 < 1) continue;
        const half = Math.sqrt(sr * sr - y * y);
        rect(sx - half, sy + y, half * 2, 1, y < -18 ? GOLD : y < -8 ? "#ff8a3d" : RED);
      }
      skyline(scroll);
      for (let i = 0; i < 5; i++) palm(((i * 71 - scroll * 0.8) % (W + 40) + W + 40) % (W + 40) - 20, 22 + (i % 2) * 6);

      // arena slides in and stops
      const ax = Math.max(W * 0.58, W + 20 - scroll * 1.6);
      const doorX = arena(ax, t);

      // neon grid floor
      rect(0, GROUND, W, H - GROUND, "#0c0818");
      ctx.fillStyle = RED;
      for (let i = 0; i < 4; i++) rect(0, GROUND + 2 + i * i * 2.4, W, 1, i ? "#7a1530" : RED);
      for (let x = -((scroll * 1.6) % 16); x < W; x += 16) {
        ctx.strokeStyle = "#7a1530";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, GROUND);
        ctx.lineTo(W / 2 + (x - W / 2) * 2.4, H);
        ctx.stroke();
      }

      // player runs on, then into the door
      const arrived = ax <= W * 0.58 + 0.5;
      const tArrive = (W * 0.42 + 20) / (speed * 1.6);
      const px = arrived ? Math.min(doorX - 5, PX + (t - tArrive) * 0.085) : PX;
      const jump = Math.max(0, Math.sin(t / 260)) * 14 * (arrived ? 0 : 1);
      const py = GROUND - 17 - jump;
      if (px < doorX - 6 || !arrived) player(px, py, t);

      // tokens
      for (const tk of tokens) {
        const x = tk.x - scroll * 1.2;
        if (!tk.got) {
          if (x > -10 && x < W + 10) coin(x, tk.y, t + tk.x * 9);
          if (Math.abs(x - (px + 5)) < 7 && Math.abs(tk.y - (py + 6)) < 12) {
            tk.got = true;
            tk.pop = t;
            score += 100;
            sfx.blip();
          }
        } else if (t - tk.pop < 500) {
          text("+100", x, tk.y - 6 - (t - tk.pop) / 40, GOLD, 5, "center");
        }
      }

      // HUD
      text(`1UP ${String(1000 + score).padStart(6, "0")}`, 6, 11, "#fff", 5);
      text("STAGE 01", W / 2, 11, GOLD, 5, "center");
      text(`x${String(tokens.filter((x) => x.got).length).padStart(2, "0")}`, W - 6, 11, GOLD, 5, "right");
      if (t < 1100 && Math.floor(t / 220) % 2 === 0) text("ENTER THE ARENA", W / 2, H * 0.36, "#fff", 7, "center");

      // through the door: warm glow then dark, never white
      if (k > 0.72) {
        const d = (k - 0.72) / 0.28;
        const rg = ctx.createRadialGradient(doorX, GROUND - 6, 2, doorX, GROUND - 6, 10 + d * W);
        rg.addColorStop(0, `rgba(255,194,61,${0.9 * (1 - d * 0.6)})`);
        rg.addColorStop(0.4, `rgba(255,46,77,${0.55 * d})`);
        rg.addColorStop(1, `rgba(7,6,15,${d})`);
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, W, H);
      }

      // scanlines
      for (let y = 0; y < H; y += 2) rect(0, y, W, 1, "rgba(0,0,0,0.18)");
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return <canvas ref={ref} className="gamescene" aria-hidden="true" />;
}
