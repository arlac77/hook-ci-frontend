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
  //server: "src",
  server: "build/dist",
  watch: true,
  middleware: [app]
});
