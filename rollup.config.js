import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import vue from "rollup-plugin-vue";
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'

const isProduction = !process.env.ROLLUP_WATCH;
const dist = "build/dist";

const config = {
  input: "src/main.mjs",
  output: {
    //globals: { vue: 'Vue' },
    file: `${dist}/main.mjs`,
    format: "esm"
  },
  watch: {
    include: "src/**/*"
  },
  plugins: [
    resolve(),
    commonjs(),
    css(),
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
    })
  ]
};

if (isProduction) {
  process.env.NODE_ENV = "production";
  config.plugins.push(
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  );
}

export default config;
