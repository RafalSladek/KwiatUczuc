# Kwiat Uczuć — Claude Instructions

## Project Overview

**Kwiat Uczuć** is an evening emotional ritual PWA for families. Single-page app, single HTML file, no build step.

**Live app:** https://kwiatuczuc.pl/ (mirror: https://rafalsladek.github.io/kONtakt/)
**Repo:** https://github.com/RafalSladek/kONtakt
**Deployed via:** GitHub Pages from `main` branch, root `/`
**Custom domain:** `kwiatuczuc.pl` via Cloudflare DNS → CNAME file in repo

## Architecture

Single-file app — all HTML, CSS, and JS live in `index.html`:

| File | Purpose |
|---|---|
| `index.html` | Entire app — markup, styles, and logic |
| `CNAME` | Custom domain for GitHub Pages |
| `icons/` | Favicon + app icons (16, 32, 180, 192, 512px + SVG flower of emotions) |
| `scripts/screenshots.js` | Automated screenshots (iPhone SE/14, Pixel 5, Desktop) |
| `scripts/gif.js` | User journey GIF generator (requires ffmpeg) |
| `docs/screenshots/` | Generated screenshots and user-journey.gif |
| `docs/research/` | Reference materials (Feelings Wheel image) |

## Screens

- **Screen 1** — Emotion wheel: 7 core emotions from the Feelings Wheel (Dr. Gloria Willcox) arranged in a circle, with toggle to flower layout. Users can add custom emotions.
- **Screen 2** — Pie chart: shows last 7 entries as a pie chart with emotion colors.

## Data Storage

All user data is stored **client-side only**:

- `kwiatuczuc_entries` — JSON array of `{date, emotions[]}` entries
- `kwiatuczuc_custom` — JSON array of custom emotion names
- `kwiatuczuc_theme` — `"pastel"` (default) or `"dark"`
- `kwiatuczuc_last_vote` — date string of last vote (shows pie chart on revisit)
- `kwiatuczuc_layout` — `"circle"` (default) or `"flower"`
- `kwiatuczuc_reminder` — reminder time (HH:MM), `"skipped"`, or `"denied"`
- No backend, no sync, no accounts
- Migration from old `kontakt_` prefix runs automatically on load

## Key Implementation Details

- **7 core emotions**: radosc, smutek, wstret, zlosc, strach, dyskomfort, zaskoczenie
- **Colors**: based on original Feelings Wheel — Happy=#F0D860, Sad=#6B9DC8, Disgusted=#7AB48C, Angry=#E88878, Fearful=#A8C878, Bad=#8BA0C0, Surprised=#C8A0D0
- **Two palettes**: dark (rgba 0.28 opacity bg, light text) and pastel (rgba 0.45 opacity bg, dark text). Default is pastel.
- **Two layouts**: circle (equal circles on a ring) and flower (identical oval petals rotated toward center, horizontal counter-rotated text)
- **Circle layout geometry**: `R = (D + gap) / (2 * sin(PI/N))` ensures no overlap
- **Flower layout**: all petals have identical dimensions (arcW x petalLen), each rotated by its angle + 90deg, text counter-rotated to stay horizontal
- **Layout animation**: CSS transitions (0.9s ease) on position, size, and transform — DOM elements persist, only styles change
- **Adding custom emotion**: element appended at center with zero size, then `applyPositions()` triggers animated reflow
- **Emotions shuffled**: `renderWheel()` shuffles baseEmotions on each render
- **Date**: `today()` returns `YYYY-MM-DD` via `toISOString().slice(0,10)`

## Development Notes

- No build tooling — edit `index.html` directly, changes are immediately deployable
- Deploy by pushing to `main` (GitHub Pages auto-builds)
- Do not use `git push --force` on main
- Google Fonts loaded non-blocking (preconnect + preload)
- No `user-scalable=no` in viewport

## Scripts

- `node scripts/screenshots.js` — take screenshots for all devices (seeds localStorage with sample entries)
- `node scripts/screenshots.js --device iphonese` — single device
- `node scripts/gif.js` — generate user-journey.gif (requires ffmpeg)
- `node scripts/gif.js --device desktop --fps 4` — custom options

## Pre-Commit Checklist

1. **Update screenshots**: if any UI change, run `node scripts/screenshots.js` and `node scripts/gif.js`
2. **Visual review**: read screenshots with Read tool, verify layout correctness
3. **Update docs**: if architecture or features changed, update `CLAUDE.md` and `README.md`
