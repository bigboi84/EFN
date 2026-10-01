import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// SINGLE=1 builds a self-contained index.html (used for sharing the pitch as one file).
export default defineConfig({
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  build: { outDir: process.env.SINGLE ? "dist-single" : "dist" },
});
