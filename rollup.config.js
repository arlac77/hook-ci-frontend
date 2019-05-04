import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;
const dist = 'dist';

const config = {
  input: "src/main.mjs",
  output: {
    file: `${dist}/bundle.js`,
    format: "cjs"
  },
  watch: {
    include: 'src/**/*'
  },
  plugins: [
    copy({
      targets: ["src/index.html"],
      outputFolder: dist,
      verbose: true
    })
  ]
};

if(!production) {
config.plugins.push(
  serve({
    contentBase: `./${dist}/`,
    open: true
  }),
  livereload({
    watch: dist,
    verbose: true,
    https: false
  })
);
}

export default config;
