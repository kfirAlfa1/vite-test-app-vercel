import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    // Allow requests from the sandbox preview proxy hosts.
    allowedHosts: true,
  },
  plugins: [react()],
  define: {
    // Only expose whether the key is set, never the key itself.
    __GEMINI_KEY_CONFIGURED__: JSON.stringify(Boolean(process.env.GEMINI_API_KEY)),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
