import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "lib",
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  clean: true,
});
