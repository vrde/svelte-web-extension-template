import copy from "rollup-plugin-copy";
import json from "rollup-plugin-json";
import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default [
  // Background is just javascript, without a UI.
  {
    input: "src/background/",
    output: {
      sourcemap: true,
      format: "iife",
      name: "background",
      file: "build/background/bundle.js"
    },
    plugins: [
      copy({
        targets: [
          {
            src: "src/manifest.json",
            dest: "build/"
          },
          {
            src: "src/images",
            dest: "build/"
          }
        ]
      }),
      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration —
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),

      // Watch the `build` directory and refresh the
      // browser on changes when not in production
      //!production && livereload("build"),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser()
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true
      }
    }
  },
  {
    input: "src/default_popup/",
    output: {
      sourcemap: true,
      format: "iife",
      name: "default_popup",
      file: "build/default_popup/bundle.js"
    },
    plugins: [
      copy({
        targets: [
          {
            src: "src/default_popup/index.html",
            dest: "build/default_popup"
          }
        ]
      }),
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        // we'll extract any component CSS out into
        // a separate file — better for performance
        css: css => {
          css.write("build/default_popup/bundle.css");
        }
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration —
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),

      // Watch the `build` directory and refresh the
      // browser on changes when not in production
      //!production && livereload("build"),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser()
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true
      }
    }
  },
  {
    input: "src/content_scripts/",
    output: {
      sourcemap: true,
      format: "iife",
      name: "content_scripts",
      file: "build/content_scripts/bundle.js"
    },
    plugins: [
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        // we'll extract any component CSS out into
        // a separate file — better for performance
        css: css => {
          css.write("build/content_scripts/bundle.css");
        }
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration —
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),

      // Watch the `build` directory and refresh the
      // browser on changes when not in production
      // !production && livereload("build"),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser()
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true
      }
    }
  }
];
