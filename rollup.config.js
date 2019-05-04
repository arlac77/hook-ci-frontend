import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;
const dist = 'build';

const config = {
  input: "src/main.mjs",
  output: {
    file: `${dist}/main.mjs`,
    format: "esm"
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

export default config;
