const browserSync = require("browser-sync").create();
const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  proxy({
    target: "https://mfelten.dynv6.net/services/ci/",
    changeOrigin: true
    //logLevel: "debug"
  })
);

browserSync.init({
  server: "build",
  watch: true,
  middleware: [app]
});
