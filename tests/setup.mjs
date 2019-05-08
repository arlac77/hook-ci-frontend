import puppeteer from "puppeteer";
import express from "express";
import proxy from "http-proxy-middleware";

export async function withPage(t, run) {
  const browser = await puppeteer.launch( /*{ headless: false, slowMo: 5000 }*/);
  const page = await browser.newPage();
  try {
    await run(t, page);
  } finally {
    await page.close();
    await browser.close();
  }
}

export async function apiProxy() {
  const app = express();

  app.use(
    "/api",
    proxy({
      target: "https://mfelten.dynv6.net/services/ci/",
      changeOrigin: true,
      ws: true,
      logLevel: "debug"
    })
  );

  app.use("/", express.static("build/dist"));
  return app.listen(3000);
}
