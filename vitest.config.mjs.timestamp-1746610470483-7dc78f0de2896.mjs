// vitest.config.mjs
import { defineConfig as defineConfig2, mergeConfig } from "file:///C:/Users/mclin/Documents/guess-my-number/node_modules/vitest/dist/config.js";

// vite.config.mts
import angular from "file:///C:/Users/mclin/Documents/guess-my-number/node_modules/@analogjs/vite-plugin-angular/src/index.js";
import { defineConfig } from "file:///C:/Users/mclin/Documents/guess-my-number/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      angular()
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"]
    },
    define: {
      "import.meta.vitest": mode !== "production"
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  };
});

// vitest.config.mjs
var vitest_config_default = defineConfig2((env) => mergeConfig(
  vite_config_default(env),
  defineConfig2({
    test: {
      include: ["src/**/*.(test|spec).ts"],
      exclude: [".stryker-tmp", "node_modules/**", "src/**/*.e2e.spec.ts"]
    },
    pool: "vmThreads"
  })
));
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5tanMiLCAidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWNsaW5cXFxcRG9jdW1lbnRzXFxcXGd1ZXNzLW15LW51bWJlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWNsaW5cXFxcRG9jdW1lbnRzXFxcXGd1ZXNzLW15LW51bWJlclxcXFx2aXRlc3QuY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbWNsaW4vRG9jdW1lbnRzL2d1ZXNzLW15LW51bWJlci92aXRlc3QuY29uZmlnLm1qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbWVyZ2VDb25maWcgfSBmcm9tIFwidml0ZXN0L2NvbmZpZ1wiO1xyXG5pbXBvcnQgdml0ZUNvbmZpZyBmcm9tIFwiLi92aXRlLmNvbmZpZy5tanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoZW52KSA9PiBtZXJnZUNvbmZpZyhcclxuICAgIHZpdGVDb25maWcoZW52KSxcclxuICBkZWZpbmVDb25maWcoe1xyXG4gICAgdGVzdDoge1xyXG4gICAgICBpbmNsdWRlOiBbXCJzcmMvKiovKi4odGVzdHxzcGVjKS50c1wiXSxcclxuICAgICAgZXhjbHVkZTogW1wiLnN0cnlrZXItdG1wXCIsIFwibm9kZV9tb2R1bGVzLyoqXCIsIFwic3JjLyoqLyouZTJlLnNwZWMudHNcIl1cclxuICAgIH0sIHBvb2w6ICd2bVRocmVhZHMnLFxyXG4gIH0pXHJcbikpO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1jbGluXFxcXERvY3VtZW50c1xcXFxndWVzcy1teS1udW1iZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1jbGluXFxcXERvY3VtZW50c1xcXFxndWVzcy1teS1udW1iZXJcXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9tY2xpbi9Eb2N1bWVudHMvZ3Vlc3MtbXktbnVtYmVyL3ZpdGUuY29uZmlnLm10c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cclxuXHJcbmltcG9ydCBhbmd1bGFyIGZyb20gJ0BhbmFsb2dqcy92aXRlLXBsdWdpbi1hbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIGFuZ3VsYXIoKSxcclxuICAgICAgXHJcbiAgICBdLFxyXG4gICAgdGVzdDoge1xyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgc2V0dXBGaWxlczogWydzcmMvdGVzdC1zZXR1cC50cyddLFxyXG4gICAgICBpbmNsdWRlOiBbJyoqLyouc3BlYy50cyddLFxyXG4gICAgICByZXBvcnRlcnM6IFsnZGVmYXVsdCddLFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAnaW1wb3J0Lm1ldGEudml0ZXN0JzogbW9kZSAhPT0gJ3Byb2R1Y3Rpb24nLFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBULFNBQVMsZ0JBQUFBLGVBQWMsbUJBQW1COzs7QUNFcFcsT0FBTyxhQUFhO0FBRXBCLFNBQVMsb0JBQW9CO0FBRzdCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUVWO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixZQUFZLENBQUMsbUJBQW1CO0FBQUEsTUFDaEMsU0FBUyxDQUFDLGNBQWM7QUFBQSxNQUN4QixXQUFXLENBQUMsU0FBUztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixzQkFBc0IsU0FBUztBQUFBLElBQ2pDO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRDVCRCxJQUFPLHdCQUFRQyxjQUFhLENBQUMsUUFBUTtBQUFBLEVBQ2pDLG9CQUFXLEdBQUc7QUFBQSxFQUNoQkEsY0FBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLE1BQ0osU0FBUyxDQUFDLHlCQUF5QjtBQUFBLE1BQ25DLFNBQVMsQ0FBQyxnQkFBZ0IsbUJBQW1CLHNCQUFzQjtBQUFBLElBQ3JFO0FBQUEsSUFBRyxNQUFNO0FBQUEsRUFDWCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFsiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyJdCn0K
