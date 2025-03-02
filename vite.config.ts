import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const packageName = "format-zod-errors";

export default defineConfig({
  plugins: [dts()],
  build: {
    outDir: "lib",
    emptyOutDir: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: packageName,
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
});
