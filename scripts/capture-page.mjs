import puppeteer from "puppeteer-core";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const route = process.argv[2] || "/blocks";
const prefix = process.argv[3] || "capture-blocks";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const viewports = [
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "mobile-375", width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle0", timeout: 30000 });

    // Smooth scroll down to trigger IntersectionObservers
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });

    await new Promise((r) => setTimeout(r, 2000));

    const outPath = path.join(process.cwd(), `${prefix}-${vp.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved screenshot: ${outPath}`);
    await page.close();
  }

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
