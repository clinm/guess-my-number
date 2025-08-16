import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.mjs";

export default defineConfig((env) => mergeConfig(
    viteConfig(env),
  defineConfig({
    test: {
      include: ["src/**/*.(test|spec).ts"],
      exclude: [".stryker-tmp", "node_modules/**"]
    }, pool: 'vmThreads',
  })
));
