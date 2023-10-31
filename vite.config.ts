import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "https://pos.virtualrx.com.ng/",
    https: true,
    origin: "https://pos.virtualrx.com.ng",
  },
});
