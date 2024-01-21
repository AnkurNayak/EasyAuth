import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import tailwindcss from "tailwindcss";
import daisyui from "daisyui";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tailwindcss(), daisyui],
  base: "/easyauth/",
});
