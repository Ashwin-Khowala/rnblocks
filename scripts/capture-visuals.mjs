import puppeteer from "puppeteer-core";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const viewports = [
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "mobile-375", width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 60000 });
    
    // Smooth scroll down to trigger all IntersectionObservers
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
            window.scrollTo(0, 0); // scroll back to top
            resolve();
          }
        }, 100);
      });
    });

    // Wait for animations and React Native Web SVG to render after scroll
    await new Promise((r) => setTimeout(r, 2000));

    // 1. Hero viewport capture
    const heroPath = path.join(process.cwd(), `capture-hero-${vp.name}.png`);
    await page.screenshot({ path: heroPath, fullPage: false });
    console.log(`Saved hero screenshot: ${heroPath}`);

    // 2. Full page capture
    const fullPath = path.join(process.cwd(), `capture-full-${vp.name}.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved full screenshot: ${fullPath}`);

    await page.close();
  }

  await browser.close();
  console.log("Capture completed successfully.");
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
