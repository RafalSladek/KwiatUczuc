# kONtakt

**Wlacz sie na siebie**

Emocje, potrzeby, wewnetrzne spelnienie (dobrostan psychiczny).

## Opis

kONtakt pomaga rodzicom i dzieciom w codziennym rozpoznawaniu i nazywaniu swoich stanow emocjonalnych. Wieczorny rytual polega na wybraniu emocji z kola emocji opartego na Feelings Wheel (Dr. Gloria Willcox). Aplikacja oferuje 7 podstawowych emocji z mozliwoscia dodawania wlasnych stanow.

## Funkcje

- Kolo emocji z 7 podstawowymi stanami (radosc, smutek, wstret, zlosc, strach, dyskomfort, zaskoczenie)
- Animowany przelacznik kolo/kwiat emocji
- Mozliwosc dodawania wlasnych stanow emocjonalnych
- 2 palety kolorow: ciemna i pastelowa
- Responsywny layout — telefon, tablet, desktop
- Dane zapisywane lokalnie (brak backendu)

## User Journey

![User Journey](docs/screenshots/user-journey.gif)

## Screenshoty

| Widok | Ciemny | Pastelowy |
|-------|--------|-----------|
| Kolo emocji | ![Dark circle](docs/screenshots/mobile-dark-circle.png) | ![Pastel circle](docs/screenshots/mobile-pastel-circle.png) |
| Kwiat emocji | ![Dark flower](docs/screenshots/mobile-dark-flower.png) | ![Pastel flower](docs/screenshots/mobile-pastel-flower.png) |

| Desktop |
|---------|
| ![Desktop dark](docs/screenshots/desktop-dark-circle.png) |
| ![Desktop flower](docs/screenshots/desktop-dark-flower.png) |

## Live

**https://kontakt.rafal-sladek.com/**

Mirror: https://rafalsladek.github.io/kONtakt/

Kazdy push na `main` automatycznie deployuje nowa wersje via GitHub Pages.

## Technologia

- Single-file HTML/CSS/JS — brak build stepu
- PWA offline-first (planowane)
- Dane lokalne (localStorage)
- Brak backendu

## Uruchomienie

Otworz `index.html` w przegladarce. Nie wymaga serwera ani build stepu.

## Spec

Szczegolowy design: [docs/superpowers/specs/2026-04-04-pani-gosia-design.md](docs/superpowers/specs/2026-04-04-pani-gosia-design.md)
