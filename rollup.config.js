import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import vue from "rollup-plugin-vue";
import css from "rollup-plugin-css-only";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const isProduction = !process.env.ROLLUP_WATCH;
const dist = "build/dist";

const config = {
  input: "src/main.mjs",
  output: {
    //globals: { vue: 'Vue' },
    file: `${dist}/bundle.mjs`,
    format: "esm"
  },
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
    const browserSync = require("browser-sync").create();
    const express = require("express");
    const proxy = require("http-proxy-middleware");

    const app = express();

    app.use(
      "/api",
      proxy({
        target: "https://mfelten.dynv6.net/services/ci/",
        changeOrigin: true,
        //logLevel: "debug"
      })
    );

    browserSync.init({
      server: dist,
      watch: true,
      middleware: [app]
    });
  }

  setTimeout(() => {
    browsersync();
  }, 100);

  console.log("XXX");
}

export default config;
