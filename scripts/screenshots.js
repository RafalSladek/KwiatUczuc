#!/usr/bin/env node
/**
 * Take screenshots of kONtakt app in all variants.
 * Usage: node scripts/screenshots.js [--device <name>] [--out <dir>]
 *
 * Devices: iphonese, iphone14, pixel5, desktop
 * Default: all devices, output to docs/screenshots/
 */
const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

const DEVICES = {
  iphonese: { ...devices['iPhone SE'], name: 'iphonese' },
  iphone14: { ...devices['iPhone 14'], name: 'iphone14' },
  pixel5: { ...devices['Pixel 5'], name: 'pixel5' },
  desktop: { viewport: { width: 1280, height: 800 }, name: 'desktop' },
};

// 3-4 past entries to seed screen2 pie chart
const SEED_ENTRIES = [
  { date: seedDate(-3), emotions: ['radość'] },
  { date: seedDate(-2), emotions: ['smutek'] },
  { date: seedDate(-1), emotions: ['strach'] },
  { date: seedDate(0), emotions: ['złość'] },
];

function seedDate(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

async function takeScreenshots(deviceKey, outDir) {
  const dev = DEVICES[deviceKey];
  const browser = await chromium.launch();
  const contextOpts = { ...dev };
  delete contextOpts.name;
  const ctx = await browser.newContext(contextOpts);
  const page = await ctx.newPage();
  const url = 'file://' + path.resolve(__dirname, '..', 'index.html');

  // Seed entries for pie chart on screen2
  await page.addInitScript((entries) => {
    localStorage.setItem('panigosia_entries', JSON.stringify(entries));
    localStorage.removeItem('panigosia_last_vote');
    localStorage.removeItem('panigosia_theme');
  }, SEED_ENTRIES);

  await page.goto(url);
  await page.waitForTimeout(800);

  const prefix = dev.name;
  const shot = (name) => page.screenshot({ path: path.join(outDir, `${prefix}-${name}.png`) });

  // --- Pastel (default) ---
  // Circle
  await shot('pastel-circle');

  // Flower
  await page.evaluate(() => document.querySelector('#layoutToggle').click());
  await page.waitForTimeout(1200);
  await shot('pastel-flower');

  // Back to circle
  await page.evaluate(() => document.querySelector('#layoutToggle').click());
  await page.waitForTimeout(1000);

  // Select emotion → screen2 with pie chart
  await page.evaluate(() => {
    const emos = document.querySelectorAll('.emo');
    if (emos[0]) emos[0].click();
  });
  await page.waitForTimeout(600);
  await shot('pastel-pie');

  // Go back to screen1
  await page.evaluate(() => {
    const btn = document.querySelector('.back-btn');
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);

  // --- Dark ---
  await page.evaluate(() => document.querySelector('#themeToggle').click());
  await page.waitForTimeout(500);

  // Circle
  await shot('dark-circle');

  // Flower
  await page.evaluate(() => document.querySelector('#layoutToggle').click());
  await page.waitForTimeout(1200);
  await shot('dark-flower');

  // Back to circle
  await page.evaluate(() => document.querySelector('#layoutToggle').click());
  await page.waitForTimeout(1000);

  // Select emotion → screen2
  await page.evaluate(() => {
    const emos = document.querySelectorAll('.emo');
    if (emos[1]) emos[1].click();
  });
  await page.waitForTimeout(600);
  await shot('dark-pie');

  await browser.close();
  console.log(`  ${prefix}: 6 screenshots`);
}

(async () => {
  const args = process.argv.slice(2);
  let deviceFilter = null;
  let outDir = path.resolve(__dirname, '..', 'docs', 'screenshots');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--device' && args[i + 1]) deviceFilter = args[++i];
    if (args[i] === '--out' && args[i + 1]) outDir = path.resolve(args[++i]);
  }

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const targets = deviceFilter ? [deviceFilter] : Object.keys(DEVICES);
  console.log('Taking screenshots...');
  for (const key of targets) {
    if (!DEVICES[key]) { console.error(`Unknown device: ${key}`); continue; }
    await takeScreenshots(key, outDir);
  }
  console.log(`Done → ${outDir}`);
})();
