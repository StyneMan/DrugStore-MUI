import { defineConfig } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    build: {
      outDir: "dist",
    },
  },
  renderer: {
    build: {
      outDir: "dist/renderer",
    },
    plugins: [react()],
  },
});
