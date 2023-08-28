import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    hmr: {
      clientPort: 3000
    },
    port: 3000,
    proxy: {
      "/api": {
        target: "https://localhost:7132/api/", // TODO: Refactor for production
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "styled-system": path.resolve(__dirname, "./styled-system/")
    }
  },
  plugins: [
    react(),
  ],
});