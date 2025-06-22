import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "217.154.124.214",
    // host: "10.0.80.47",
  },
});
