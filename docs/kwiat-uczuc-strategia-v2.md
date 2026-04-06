# Kwiat Uczuć — strategia v2.0

## 1. Decyzje fundacyjne

| Pytanie | Decyzja |
|---------|---------|
| Język | PL only |
| Platforma | PWA, potem WebView (TWA Android, ewentualnie iOS) |
| Target | dzieci 6–12 (rodzic jako współużytkownik) |
| Monetyzacja | free now → płatny eksport raportów later |

---

## 2. Positioning

**„Kwiat Uczuć — aplikacja do śledzenia emocji dziecka i rozmowy z nim"**

### Value proposition

- dziecko: nazywam co czuję, to jest fajne (gra, nie obowiązek)
- rodzic: widzę emocje dziecka w czasie, wiem o czym rozmawiać
- terapeuta: dostaję dane między sesjami

### Czym NIE jesteśmy

- nie journal / dziennik (za dużo pisania)
- nie habit tracker (nie mierzymy "produktywności")
- nie apka terapeutyczna (zero diagnozy, zero medycznego vibe)

---

## 3. Nazwa i domena

### Nazwa: **Kwiat Uczuć**

Metafora = produkt: emocje to płatki, kwiat zmienia się w czasie.

### Domeny do sprawdzenia (priorytet)

1. kwiatuczuc.pl
2. kwiatuczuc.app
3. koloryuczuc.pl (backup)

---

## 4. Target users

### Primary: rodzic dziecka 6–12

- szuka sposobu na rozmowę o emocjach
- widzi że dziecko "coś czuje" ale nie umie nazwać
- może być po wizycie u psychologa (polecenie)
- wiek dziecka 6–12: umie czytać, ale potrzebuje prostoty

### Secondary: psycholog / terapeuta dziecięcy

- szuka narzędzia do pracy z pacjentem między sesjami
- chce dane, nie opowieści
- potrzebuje raportu (PDF)

### NIE targetujemy (na start)

- dorosłych w terapii (inny produkt)
- szkół (B2B za wcześnie)
- rynku EN (za wcześnie)

---

## 5. Produkt — co zmienić vs obecny stan

### Obecny produkt (kONtakt)

- koło/kwiat 7 emocji + custom
- autocomplete z ~200 uczuć (dorosły słownik)
- pie chart z radialnym tekstem
- ciemny/jasny motyw
- PWA + service worker

### Wymagane zmiany dla dzieci 6–12

| Obszar | Teraz | Docelowo |
|--------|-------|----------|
| Emocje | 7 + custom + autocomplete 200 słów | 5–7 podstawowych z emoji/ikonkami |
| Wybór | tap na koło/kwiat | duże kolorowe przyciski z twarzami |
| Feedback | przejście na pie chart | animacja — kwiat "rośnie", nagroda |
| Historia | pie chart z radialnym tekstem | seria kwiatków (prosty timeline) |
| Język | abstrakcyjny (dyskomfort, wstręt) | prosty (smutno mi, boję się, jestem zły) |
| Motyw | ciemny/jasny | jasny only (kolorowy, ciepły) |
| Tekst | dużo | minimum, ikony > tekst |

### Nowe ekrany

1. **Ekran dziecka** — duży kwiat, tap płatek = emocja, animacja potwierdzenia
2. **Ekran rodzica** — timeline kwiatków + szczegóły + eksport
3. **Raport** — generowany PDF z podsumowaniem tygodnia/miesiąca

### Co zostaje

- architektura single-file PWA
- client-side only (bez backendu)
- localStorage
- Nunito font
- koncept kwiatu emocji
- spiral unwind animacja (dostosowana)

---

## 6. Branding

### Styl wizualny

- soft, rounded, ciepły
- friendly dla dzieci — zero kliniczne
- duże elementy dotykowe (min 48px tap target)
- kolory nasycone ale nie krzykliwe

### Paleta emocji (uproszczona)

| Emocja | Kolor | Emoji |
|--------|-------|-------|
| radość | zolty #F0D860 | 😊 |
| smutek | niebieski #6B9DC8 | 😢 |
| zlosc | czerwony #E88878 | 😠 |
| strach | zielony #A8C878 | 😨 |
| spokoj | fiolet #C8A0D0 | 😌 |

### Font

- Nunito (primary) — zaokraglony, przyjazny
- fallback: system-ui

---

## 7. Monetyzacja

### Faza 1: free (teraz)

- cala apka za darmo
- wszystkie emocje, historia, animacje
- cel: zbieranie uzytkownikow, feedback, product-market fit

### Faza 2: platny eksport (po PMF)

| Feature | Cena | Model |
|---------|------|-------|
| Raport PDF (tydzien) | 5–10 PLN | jednorazowy |
| Raport PDF (miesiac) | 15–20 PLN | jednorazowy |
| Nielimitowane raporty | 20 PLN/mies | subskrypcja |

### Implementacja (bez backendu)

- PDF generowany client-side (jsPDF / html2canvas)
- odblokowanie via kod / prosty paywall (Stripe link → kod)
- zero kont, zero logowania

### Faza 3: psycholog dashboard (walidacja najpierw)

- dopiero gdy >50 terapeutow uzywa apki
- osobny widok web z kodem dostepu od rodzica
- SaaS B2B: 50–100 PLN/mies za terapeutę
- wymaga backendu — to osobna decyzja

---

## 8. Growth strategy

### Kanal 1: Psychologowie (najwyzszy priorytet)

**Dlaczego**: jeden terapeuta = 10–50 rodzicow/rok. Darmowy CAC.

**Jak**:
- lista 50 psychologow dzieciecych w PL (Instagram, ZnanyLekarz, lokalne)
- DM/email: "Zrobilem darmowa apke do sledzenia emocji dziecka, chce Ci dac dostep"
- zero pitchowania — daj narzedzie, zbieraj feedback
- cel: 10 aktywnych terapeutow w 60 dni

**Co im dac**:
- apka free
- eksport PDF free (dla terapeutow zawsze)
- ich logo/nazwa w raporcie (opcjonalnie)

### Kanal 2: SEO (dlugoterminowy)

**Frazy docelowe** (PL, niska konkurencja):
- "emocje dziecka aplikacja"
- "jak rozmawiać z dzieckiem o emocjach"
- "dziennik emocji dziecka"
- "koło uczuć dla dzieci"
- "kwiat uczuć"

**Content plan**:
- landing page z frazami
- 5 artykulow blogowych (nie 10 — jakosc > ilosc)
- linkowanie z profili psychologow

**Realistyczny timeline**: 3–6 miesiecy do ruchu organicznego.

### Kanal 3: Social (build in public)

**Platformy**: X, LinkedIn, Instagram (PL rodzice = Instagram)

**Content**:
- proces budowania apki
- rozmowy z psychologami
- dane o emocjach dzieci (zagregowane, anonimowe)
- screenshoty i animacje (juz mamy GIFy)

**Czestotliwosc**: 2–3x/tydzien (nie daily — nie da sie utrzymac solo)

### Kanal 4: Reddit — ODLOZONY

Powod: produkt PL, Reddit = EN. Wrocimy gdy/jesli bedzie wersja EN.

---

## 9. Konkurencja

### Bezposrednia (PL)

Brak. Nie ma polskiej apki do emocji dziecka. To jest przewaga.

### Posrednia (EN, globalna)

| Apka | Model | Roznica |
|------|-------|---------|
| Daylio | habit + mood tracker | dorośli, EN, general purpose |
| Moodflow | mood journal | dorośli, EN, za dużo pisania |
| How We Feel | emocje + wellbeing | dorośli, EN, Yale-backed |
| Breathe, Think, Do (Sesame) | dzieci, regulacja emocji | EN, gra nie tracker |

**Nasza nisza**: PL + dzieci + tracking + eksport dla terapeuty. Nikt tego nie robi.

---

## 10. Metryki sukcesu

### 30 dni

| Metryka | Cel |
|---------|-----|
| Psychologowie kontaktowani | 30 |
| Psychologowie aktywni | 5 |
| Uzytkownicy (rodzice) | 50 |
| Retencja 7-dniowa | >30% |

### 90 dni

| Metryka | Cel |
|---------|-----|
| Psychologowie aktywni | 15 |
| Uzytkownicy | 300 |
| Retencja 30-dniowa | >20% |
| Pierwszy platny raport | 1 (walidacja) |

### 180 dni

| Metryka | Cel |
|---------|-----|
| Uzytkownicy | 1000 |
| MRR | 500 PLN |
| NPS | >40 |

---

## 11. Plan wykonania

### Tydzien 1–2: Redesign dla dzieci

- uproszczenie emocji do 5–7 z emoji
- nowy UI ekranu dziecka (duze przyciski)
- prosty timeline zamiast pie chart
- jasny motyw only
- testy z 2–3 dziecmi (znajomi)

### Tydzien 3–4: Landing + domena

- kupno domeny kwiatuczuc.pl (lub dostepnej)
- landing page: headline + screenshot + CTA (zainstaluj PWA)
- podstawowe SEO (meta tagi, OG, schema)

### Tydzien 5–6: Outreach psychologowie

- lista 50 terapeutow
- szablon wiadomosci
- wyslanie pierwszych 20 DM/emaili
- zbieranie feedbacku

### Tydzien 7–8: Content + iteracja

- 3 artykuly SEO na blogu
- iteracja UI na podstawie feedbacku
- poczatek social media (Instagram)

### Tydzien 9–12: Monetyzacja MVP

- generowanie PDF client-side
- prosty paywall (Stripe payment link)
- test z 5 rodzicami: czy zaplaciliby?

---

## 12. Messaging

### Headline

**„Kwiat Uczuć — zobacz co czuje Twoje dziecko"**

### Sub

**„Proste narzędzie do śledzenia emocji. Dla dzieci, rodziców i terapeutów."**

### CTA

**„Wypróbuj za darmo"**

---

## 13. Ryzyka i mitygacja

| Ryzyko | Prawdopodobienstwo | Mitygacja |
|--------|-------------------|-----------|
| Dzieci nie chca uzywac | wysokie | testuj z dziecmi PRZED buildem |
| Rodzice nie widza wartosci | srednie | eksport PDF = namacalny output |
| Psychologowie nie odpowiadaja | srednie | daj wartosc first, nie pitchuj |
| PWA nie instaluje sie dobrze | niskie | TWA Android jako backup |
| Ktos skopiuje pomysl | niskie | execution > idea, jestes pierwszy w PL |

---

## 14. Czego NIE robimy (anty-roadmap)

- wersja EN (nie teraz)
- native app iOS/Android (nie teraz)
- backend / konta uzytkownikow (nie teraz)
- integracja z innymi apkami (nie teraz)
- AI analiza emocji (nie teraz)
- gamifikacja / achievements (nie teraz — prostota first)
- B2B szkoly (nie teraz)

---

## 15. Brutalna prawda v2

- produkt ma potencjal — potwierdzone przez brak konkurencji w PL
- ale obecna wersja jest dla doroslych, nie dla dzieci — wymaga redesignu
- psychologowie to jedyny kanal ktory da uzytkownikow w <30 dni
- SEO i social to 3-6 miesiecy — nie liczc na to wczesniej
- monetyzacja przed product-market fit = strata czasu
- cel na start: 5 terapeutow ktory aktywnie polecaja = sukces
