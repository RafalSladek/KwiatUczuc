#!/usr/bin/env node
/**
 * Generate user-journey GIF for kONtakt app.
 * Usage: node scripts/gif.js [--device <name>] [--out <path>] [--fps <n>]
 *
 * Requires: ffmpeg
 * Default: iPhone SE, output to docs/screenshots/user-journey.gif, 3 fps
 */
const { chromium, devices } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const DEVICES = {
  iphonese: { ...devices['iPhone SE'], name: 'iphonese' },
  iphone14: { ...devices['iPhone 14'], name: 'iphone14' },
  pixel5: { ...devices['Pixel 5'], name: 'pixel5' },
  desktop: { viewport: { width: 1280, height: 800 }, name: 'desktop' },
};

function seedDate(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

// Seed entries spanning 4 weeks
const SEED_ENTRIES = [
  { date: seedDate(-27), emotions: ['radość', 'zaskoczenie'] },
  { date: seedDate(-25), emotions: ['smutek'] },
  { date: seedDate(-22), emotions: ['strach', 'złość'] },
  { date: seedDate(-13), emotions: ['wstręt'] },
  { date: seedDate(-11), emotions: ['radość', 'dyskomfort'] },
  { date: seedDate(-9), emotions: ['zaskoczenie', 'strach'] },
  { date: seedDate(-5), emotions: ['radość'] },
  { date: seedDate(-3), emotions: ['smutek', 'strach'] },
  { date: seedDate(-1), emotions: ['złość'] },
];

(async () => {
  const args = process.argv.slice(2);
  let deviceKey = 'iphonese';
  let outPath = path.resolve(__dirname, '..', 'docs', 'screenshots', 'user-journey.gif');
  let fps = 3;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--device' && args[i + 1]) deviceKey = args[++i];
    if (args[i] === '--out' && args[i + 1]) outPath = path.resolve(args[++i]);
    if (args[i] === '--fps' && args[i + 1]) fps = parseInt(args[++i], 10);
  }

  const dev = DEVICES[deviceKey];
  if (!dev) { console.error(`Unknown device: ${deviceKey}`); process.exit(1); }

  const tmpDir = path.join(require('os').tmpdir(), 'kontakt-gif-frames');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  fs.mkdirSync(tmpDir);

  const browser = await chromium.launch();
  const contextOpts = { ...dev };
  delete contextOpts.name;
  const ctx = await browser.newContext(contextOpts);
  const page = await ctx.newPage();
  const url = 'file://' + path.resolve(__dirname, '..', 'index.html');

  // Seed entries (no today entry — user will select in the flow)
  await page.addInitScript((entries) => {
    localStorage.setItem('kontakt_entries', JSON.stringify(entries));
    localStorage.removeItem('kontakt_last_vote');
    localStorage.removeItem('kontakt_theme');
  }, SEED_ENTRIES);

  await page.goto(url);
  await page.waitForTimeout(800);

  let f = 0;
  const shot = async () => {
    await page.screenshot({ path: path.join(tmpDir, `frame-${String(f++).padStart(4, '0')}.png`) });
  };
  const hold = async (n) => { for (let i = 0; i < n; i++) await shot(); };
  const click = async (sel) => {
    await page.evaluate((s) => { const el = document.querySelector(s); if (el) el.click(); }, sel);
  };
  const animate = async (steps, delay) => {
    for (let i = 0; i < steps; i++) { await page.waitForTimeout(delay); await shot(); }
  };

  console.log('Recording frames...');

  // 1. Pastel circle (hold)
  await hold(3);

  // 2. Circle → flower animation
  await click('#layoutToggle');
  await animate(5, 200);
  await hold(3);

  // 3. Flower → circle
  await click('#layoutToggle');
  await animate(5, 200);
  await hold(2);

  // 4. Multi-select: click 2 emotions
  await page.evaluate(() => {
    const emos = document.querySelectorAll('.emo');
    if (emos[0]) emos[0].click();
  });
  await page.waitForTimeout(400);
  await shot();
  await page.evaluate(() => {
    const emos = document.querySelectorAll('.emo');
    if (emos[3]) emos[3].click();
  });
  await page.waitForTimeout(400);
  await hold(2); // Show multi-select with Gotowe button

  // 5. Confirm → screen2 with "dziś" (spiral animation)
  await click('#confirmBtn');
  await animate(4, 300);
  await hold(3);

  // 6. Switch to "tydzień" (spiral animation)
  await page.evaluate(() => {
    const btn = document.querySelector('[data-period="week"]');
    if (btn) btn.click();
  });
  await animate(4, 300);
  await hold(2);

  // 7. Switch to "4 tyg" (spiral animation)
  await page.evaluate(() => {
    const btn = document.querySelector('[data-period="4weeks"]');
    if (btn) btn.click();
  });
  await animate(4, 300);
  await hold(3);

  // 8. Go back
  await click('.back-btn');
  await page.waitForTimeout(500);
  await hold(2);

  // 9. Switch to dark
  await click('#themeToggle');
  await page.waitForTimeout(500);
  await hold(3);

  // 10. Dark flower
  await click('#layoutToggle');
  await animate(5, 200);
  await hold(3);

  // 11. Back to dark circle
  await click('#layoutToggle');
  await animate(4, 200);
  await hold(2);

  await browser.close();
  console.log(`Captured ${f} frames`);

  // Generate GIF with ffmpeg
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Encoding GIF...');
  execFileSync('ffmpeg', [
    '-y',
    '-framerate', String(fps),
    '-i', path.join(tmpDir, 'frame-%04d.png'),
    '-vf', 'scale=-1:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer',
    '-loop', '0',
    outPath,
  ], { stdio: 'inherit' });

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true });

  const size = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`Done → ${outPath} (${size} KB)`);
})();
