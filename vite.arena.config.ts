import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

// EFN ARENA site. Run from the repo root. SINGLE=1 builds one self-contained index.html.
const root = process.cwd();
export default defineConfig({
  root: path.resolve(root, "arena"),
  publicDir: path.resolve(root, "public"),
  base: "./",
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  build: {
    outDir: path.resolve(root, process.env.SINGLE ? "dist-arena-single" : "dist-arena"),
    emptyOutDir: true,
  },
});
