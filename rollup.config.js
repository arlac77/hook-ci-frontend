import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import vue from "rollup-plugin-vue";
import css from "rollup-plugin-css-only";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";
import history from "connect-history-api-fallback";
import proxy from "http-proxy-middleware";
import express from "express";
import { create as browserSyncFactory } from "browser-sync";

const isProduction = !process.env.ROLLUP_WATCH;
const dist = "build/dist";
const base = "/services/ci";
const api = "/api";

const globals = { vue: "Vue" };
const external = Object.keys(pkg.dependencies);

const config = {
  input: "src/main.mjs",
  //external,

  output: {
    //globals,
    file: `${dist}/bundle.js`,
    format: "esm"
  },
  /*
  output: {
    globals,
    name: 'bundle',
    file: `${dist}/bundle.js`,
    format: 'umd'
  },
  */
  watch: {
    include: "src/**/*"
  },
  plugins: [
    resolve(),
    commonjs(),
    css({ output: `${dist}/bundle.css` }),
    vue({
      template: {
        isProduction,
        compilerOptions: { preserveWhitespace: false }
      },
      css: false
    }),
    copy({
      targets: ["src/index.html"],
      outputFolder: dist,
      verbose: true
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};

if (isProduction) {
  process.env.NODE_ENV = "production";
} else {
  function browsersync() {
    const browserSync = browserSyncFactory();
    const app = express();

    app.use(
      api,
      proxy({
        target: "https://mfelten.dynv6.net/services/ci/",
        changeOrigin: true,
        logLevel: "debug"
      })
    );

    browserSync.init({
      server: dist,
      watch: true,
      middleware: [app,history()]
    });
  }

  setTimeout(() => {
    browsersync();
  }, 100);
}

export default config;
