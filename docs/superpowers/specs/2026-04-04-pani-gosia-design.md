# kONtakt — Design Spec

## Overview

Evening emotional ritual app for families (parent + child). Users select their emotional state from a randomized circle, and the app tracks emotions over time, showing a weekly pie chart summary.

**Name:** kONtakt
**Tagline:** Włącz się na siebie
**Focus:** Emocje, potrzeby, wewnętrzne spełnienie (dobrostan psychiczny)
**Type:** PWA (offline-first, no backend)
**Target:** SvelteKit + IndexedDB
**Users:** Parent-child pairs, guided by a psychologist/consultant

## Core Flow

1. User opens app in the evening
2. Emotion wheel shows 6 base emotions in randomized positions
3. User taps one emotion → entry saved → immediate transition to summary screen
4. Summary screen shows pie chart of last 7 days
5. "Wstecz" button returns to emotion wheel

## Profiles

Two profiles per device: **child** and **parent**.

- Child profile: simpler emotion set (age-appropriate labels)
- Parent profile: more nuanced emotions
- Profile switching in header, without interrupting the ritual
- Each profile has independent data storage

## Emotion Wheel

- 6 base emotions arranged in a circle: radosc, spokoj, zlosc, smutek, strach, ciekawosc
- Positions randomized on each session open
- Single-select: one tap = one entry saved
- Custom emotions: user can add their own (stored persistently)
- Color palette per emotion (consistent across wheel and pie chart):

| Emotion | Background | Text |
|---------|-----------|------|
| radosc | rgba(239,83,80,0.3) | #ef5350 |
| spokoj | rgba(66,165,245,0.3) | #42a5f5 |
| zlosc | rgba(255,167,38,0.3) | #ffa726 |
| smutek | rgba(126,87,194,0.3) | #7e57c2 |
| strach | rgba(171,71,188,0.3) | #ab47bc |
| ciekawosc | rgba(102,187,106,0.3) | #66bb6a |

Custom emotions get assigned from a secondary palette.

## Summary Screen (Pie Chart)

- Full pie chart (not donut) showing emotion proportions from last 7 entries
- Labels positioned centrally inside each slice
- Same colors as emotion wheel
- Subtle divider lines from center
- "Ostatnie 7 dni" label below

## Visual Design

- Dark nocturnal theme (evening ritual context)
- Glassmorphism: blurred background orbs, semi-transparent panels
- Gradient background: #1a1a2e → #16213e → #0f3460
- Soft, rounded shapes (border-radius: 22-40px)
- Gradient app title: pink → indigo → teal
- No emoji in UI

## Responsive Layout

App fills 100% of available screen space on every device — no phone frame, no wasted margins.

- **Szerokosc 100%** na kazdym urzadzeniu — brak max-width, brak marginesow bocznych. Zawartosc rozciaga sie na cala szerokosc ekranu.
- **Mobile:** Full-screen single column. Touch-optimized tap targets.
- **Tablet:** Wieksze kolo i wykres, landscape moze pokazac oba obok siebie.
- **Desktop:** Emotion wheel i pie chart obok siebie, rozciagniete na cala szerokosc.

## Data Storage

- All data client-side only (IndexedDB in production, localStorage in prototype)
- Entry format: `{ date: "YYYY-MM-DD", emotions: ["name"] }`
- Custom emotions stored separately
- Per-profile data isolation
- Export/import JSON for cross-device migration

## Tech Stack

- **Framework:** SvelteKit
- **Storage:** IndexedDB (with localStorage fallback)
- **Deployment:** PWA, installable, offline-first
- **No backend, no accounts, no sync** (MVP)

## Out of Scope (MVP)

- Habit tracking
- Psychoeducation content
- Multi-select emotions (one tap = one entry)
- Backend / cloud sync
- Analytics
- Onboarding flow
