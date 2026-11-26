# Automated browser test results

Run: 2026-11-26T05:36:56.822Z · Browser: Chrome (headless, Playwright) · 42 passed, 0 failed, 0 skipped

These tests run in a desktop Chrome engine that imitates phones. They do **not** replace tests on real iPhones/Android phones, real voices, real microphones or screen readers.

| ID | Test | Result | Time |
|---|---|---|---:|
| B1 | Normal build: opens on the first page, no QA tools inside | ✅ PASS | 1.1s |
| B2 | QA build: QA tools present, separate storage and cache names | ✅ PASS | 1.0s |
| W1 | "What's new" pop-up after an update: shown once, in the user's language (all 6), never to first-time users | ✅ PASS | 27.0s |
| C1 | All 30 language pairs × every topic × every level: play to the end (1 wrong + rest correct) | ✅ PASS | 45.9s |
| C2 | Number sets: every pair, every number group (0 → 2 billion) | ✅ PASS | 29.6s |
| C3 | Conversations: all 24 scenes × 30 pairs, every reply type, stars saved | ✅ PASS | 12.1s |
| C4 | Vocabulary word lists: present, filled, Thai romanization, listen buttons | ✅ PASS | 1.6s |
| C5 | Text tables complete in all 6 languages (trophies, reports, challenge, monetization, mic, review) | ✅ PASS | 1.2s |
| L1 | Progression: next level locked until 60% on the previous level (normal build) | ✅ PASS | 1.2s |
| L2 | Scoring, stars, best score and results screen | ✅ PASS | 1.1s |
| L3 | Undo (go back to correct) removes the mistake; lessons link never shown during a quiz | ✅ PASS | 1.1s |
| L4 | Torture Bench: correct fix accepted, wrong fix roasted, hints limited per day | ✅ PASS | 1.1s |
| L5 | Review My Mistakes: collects mistakes from all topic types; "Again" repeats the review | ✅ PASS | 1.3s |
| L6 | Streaks, streak freeze, comeback, daily goal, early/night trophies (Bangkok time 01:00) | ✅ PASS | 1.1s |
| L7 | Pronunciation score: word order and repeated words count | ✅ PASS | 0.9s |
| L8 | Challenge a friend: 10 timed questions, link, friend plays the same questions in own pair, image card | ✅ PASS | 2.5s |
| L9 | Trophies page, calendar, roast level and daily goal render in all 6 languages | ✅ PASS | 1.5s |
| D1 | Backup export → import round trip; incomplete or broken files rejected | ✅ PASS | 2.8s |
| D2 | Saved preferences: language pair and progress survive reload; app always reopens on the first page | ✅ PASS | 2.2s |
| D3 | Old progress from v36 still loads (compatibility) | ✅ PASS | 0.9s |
| R1 | Question report: stable ID, pair, topic, level, shown options, expected answer, version; saved, listed, exported, survives reload | ✅ PASS | 2.2s |
| R2 | Reports from Torture Bench and conversations | ✅ PASS | 1.2s |
| X1 | Security: hostile challenge links are rejected or neutralised (bad language codes, HTML in names, huge lists) | ✅ PASS | 1.0s |
| Q1 | QA panel: any pair / topic / level / single question; IDs shown; progress kept separate from the normal app | ✅ PASS | 3.5s |
| Q2 | Monetization simulation (QA): locked level → simulated purchase; 3 corrections/day + ad refill; 3 hints/day + ad; ad after 10 questions; Premium removes limits | ✅ PASS | 1.1s |
| Q4 | Rewarded ads (QA simulation): success gives the reward once; cancel/failure/error give nothing; double callbacks cannot duplicate rewards | ✅ PASS | 4.6s |
| Q5 | Corrections after an ad refill behave exactly like before the refill (counter, mistake list, question count) | ✅ PASS | 1.1s |
| Q6 | Lifetime Premium removes the daily correction, hint and continue limits and opens every level | ✅ PASS | 1.3s |
| Q3 | Normal build never shows ads, purchase dialogs or locks from the commercial model | ✅ PASS | 1.2s |
| S1 | Offline: after the first visit the app and all language data work with no network | ✅ PASS | 4.9s |
| S2 | Service worker deletes only its own old caches — other Adeba Studio apps and the QA build are untouched | ✅ PASS | 8.7s |
| S3 | "Force fresh reload" (crash screen) clears only RoastED caches and its own service worker | ✅ PASS | 3.8s |
| S4 | Update: a new deployment is picked up automatically and the app reloads only on a safe screen | ✅ PASS | 11.4s |
| S5 | Interrupted download: if a file fails while installing an update, the working version stays and the update retries later | ✅ PASS | 8.5s |
| S6 | Install metadata: manifest, icons and service worker valid for both builds | ✅ PASS |  |
| M1 | Layouts: no sideways scrolling on small/large phones, tablet and landscape (main screens) | ✅ PASS | 7.7s |
| M2 | Accessibility basics: every button has a name, images have alt text, page language set, top-bar targets ≥ 38 px | ✅ PASS | 1.0s |
| M3 | Interruptions: app goes to background and back mid-quiz; state kept, no errors | ✅ PASS | 2.2s |
| M4 | No text-to-speech available: listen buttons show a message, nothing crashes | ✅ PASS | 1.2s |
| M5 | Voices missing for a language (e.g. Afrikaans) and iPhone speech workaround: speech still requested, no crash | ✅ PASS | 2.0s |
| M6 | Microphone: not supported / permission denied / no speech — clear messages; short-word message after 2 misses | ✅ PASS | 2.0s |
| M7 | Android back button: moves back through screens; on the first page asks before closing | ✅ PASS | 2.5s |

## Details

### B1 — PASS
```
{
 "screen": "Welcome",
 "kind": "normal",
 "build": "v38",
 "qa": false,
 "openQA": "undefined",
 "monet": false,
 "lock": true
}
```
### B2 — PASS
```
{
 "kind": "qa",
 "store": "roastedqa",
 "cache": "roasted-qa-v",
 "fab": true,
 "lock": false,
 "monet": true
}
```
### W1 — PASS
```
{
 "it": {
  "shown": "block",
  "title": "✨ Novità",
  "first": "• 💬 24 conversazioni: 8 per livello (Principiante, Intermedio, Avanzato)",
  "ver": "1.7",
  "again": "none"
 },
 "en": {
  "shown": "block",
  "title": "✨ What's new",
  "first": "• 💬 24 conversations: 8 per level (Beginner, Intermediate, Advanced)",
  "ver": "1.7",
  "again": "none"
 },
 "fr": {
  "shown": "block",
  "title": "✨ Nouveautés",
  "first": "• 💬 24 conversations: 8 par niveau (Débutant, Intermédiaire, Avancé)",
  "ver": "1.7",
  "again": "none"
 },
 "de": {
  "shown": "block",
  "title": "✨ Neuigkeiten",
  "first": "• 💬 24 Gespräche: 8 pro Stufe (Anfänger, Mittelstufe, Fortgeschritten)",
  "ver": "1.7",
  "again": "none"
 },
 "th": {
  "shown": "block",
  "title": "✨ มีอะไรใหม่",
  "first": "• 💬 บทสนทนา 24 บท ระดับละ 8 บท (เริ่มต้น ระดับกลาง ขั้นสูง)",
  "ver": "1.7",
  "again": "none"
 },
 "af": {
  "shown": "block",
  "title": "✨ Wat is nuut",
  "first": "• 💬 24 gesprekke: 8 per vlak (Beginner, Intermediêr, Gevorderd)",
  "ver": "1.7",
  "again": "none"
 }
}
```
### C1 — PASS
```
{
 "runs": 1590,
 "qs": 15900,
 "out": [],
 "nout": 0
}
```
### C2 — PASS
```
{
 "sets": 450,
 "out": []
}
```
### C3 — PASS
```
{
 "plays": 720,
 "out": []
}
```
### C4 — PASS
```
{
 "lists": 720,
 "out": []
}
```
### C5 — PASS
```
all tables complete
```
### L1 — PASS
```
{
 "redirected": 1,
 "s50": 0,
 "after70": 2
}
```
### L2 — PASS
```
{
 "perfect": {
  "stars": 3,
  "txt": "📊 Punteggio: 10 / 10 (100%) ⭐⭐⭐Perfetto! Mi commuovo… ma non montarti la testa,"
 },
 "zeroStarsKept": 3,
 "lessons": "block"
}
```
### L3 — PASS
```
{
 "undo": "block",
 "wrong": 0,
 "lessonsDuringQuiz": "none"
}
```
### L4 — PASS
```
{
 "good": true,
 "bad": true,
 "used": 5,
 "left": 0
}
```
### L5 — PASS
```
{
 "tps": [
  "food",
  "greet",
  "num",
  "pres"
 ],
 "again": true
}
```
### L6 — PASS
```
{
 "day0": "2026-11-23",
 "shown": 5,
 "after": 6,
 "freeze": true,
 "goal": 1,
 "early": true,
 "comeback": true
}
```
### L7 — PASS
```
{
 "a": 33,
 "b": 100,
 "d": 80
}
```
### L8 — PASS
```
{
 "n": 10,
 "pair": "frde",
 "same": true,
 "card": 1337709,
 "verdict": "⚔️ Tester: 10/10 en 0:00A: 10/10 en 0:00🤝 Égalité!🔁 Proposer une revanche🖼️ P"
}
```
### L9 — PASS
```
{
 "it": {
  "t": 22,
  "cells": 30,
  "ring": true,
  "pop": "block"
 },
 "en": {
  "t": 22,
  "cells": 30,
  "ring": true,
  "pop": "block"
 },
 "fr": {
  "t": 22,
  "cells": 30,
  "ring": true,
  "pop": "block"
 },
 "de": {
  "t": 22,
  "cells": 30,
  "ring": true,
  "pop": "block"
 },
 "th": {
  "t": 22,
  "cells": 30,
  "ring": true,
  "pop": "block"
 },
 "af": {
  "t": 22,
  "cells": 30,
  "ring": true,
  "pop": "block"
 }
}
```
### D1 — PASS
```
{
 "roundTrip": true,
 "safetyCopy": true,
 "rejected": [
  "empty",
  "st"
 ]
}
```
### D2 — PASS
```
{
 "screen": "Welcome",
 "nat": "de",
 "tgt": "fr",
 "stars": 1
}
```
### D3 — PASS
```
{
 "stars": 3,
 "badges": [
  "streak3"
 ],
 "runs": 12,
 "streak": 4
}
```
### R1 — PASS
```
{
 "report": {
  "app": "RoastED",
  "version": "v38",
  "build": "normal",
  "date": "2026-11-26T05:35:44.631Z",
  "native": "th",
  "target": "fr",
  "area": "quiz",
  "qid": "food-19",
  "sig": "5efc4a5c",
  "topic": "food",
  "level": "1",
  "mode": "quiz",
  "question": "อาหารจานนี้ขาดเกลือ",
  "options": [
   "Ce plat manque le sel.",
   "Ce plat manque du sel.",
   "Ce plat manque de sel.",
   "Ce plat est manquant de sel."
  ],
  "expected": "Ce plat manque de sel.",
  "chosen": "Ce plat manque du sel.",
  "problem": "More than one answer is correct (มีคำตอบถูกมากกว่าหนึ่งข้อ)",
  "comment": "test comment",
  "id": "Rmwx4ct13gtit",
  "sent": false
 },
 "exported": "roasted-reports-2026-11-26-05-35.json"
}
```
### R2 — PASS
```
[
 "torture-bench:travel-8",
 "conversation:scene-trattoria-turn1"
]
```
### X1 — PASS
```
{
 "badLang": null,
 "html": {
  "v": 2,
  "n": "en",
  "t": "it",
  "tp": "food",
  "lv": 1,
  "idx": [
   1,
   2
  ],
  "sc": 1,
  "tm": 5,
  "nm": "img src=x onerror=al"
 },
 "huge": null,
 "badTopic": null,
 "loadBlocked": true
}
```
### Q1 — PASS
```
{
 "items": 18,
 "pair": "afth",
 "topic": "past",
 "qs": 18,
 "info": "ID past-40 [6c7b6f99] · af→th · ",
 "qaKeys": 4,
 "normalLv": {
  "enitfood1": 3
 }
}
```
### Q2 — PASS
```
{
 "offer": "block",
 "buyDlg": "block",
 "unlocked": true,
 "undoUsed": 3,
 "undoAfter3": "none",
 "adBtn": "block",
 "contDlg": true,
 "hintsFree": 3,
 "hintAdDlg": true,
 "premiumAccess": true
}
```
### Q4 — PASS
```
{
 "adShown": "block",
 "afterCancel": 1,
 "afterError": 1,
 "afterSuccess": 3,
 "hintDlg": "block",
 "hintsAfterAd": 1,
 "adHints": 1,
 "blockedAfterCancel": true,
 "allowAfter": 20,
 "question": 4,
 "overlay": "block",
 "hintsAfterClose": 0,
 "hintsAfterFinish": 1
}
```
### Q5 — PASS
```
{
 "steps": [
  [
   "undo with 1 left",
   0,
   0
  ],
  [
   "0 left: undo button",
   "none",
   "ad",
   "block"
  ],
  [
   "after refill",
   3,
   "block"
  ],
  [
   "undo after refill",
   2,
   0,
   "q",
   -1
  ],
  [
   "next undo",
   1,
   0
  ]
 ]
}
```
### Q6 — PASS
```
{
 "undos": 8,
 "undoCounter": 3,
 "hints": 10,
 "noGate": true,
 "level3": 10,
 "ads": 0
}
```
### Q3 — PASS
```
{
 "monPop": false,
 "qaAd": false,
 "undoAd": false,
 "enabled": false
}
```
### S1 — PASS
```
{
 "data": [
  "it:21",
  "en:21",
  "fr:21",
  "de:21",
  "th:20",
  "af:21"
 ],
 "scenes": 24,
 "qs": 10
}
```
### S2 — PASS
```
{
 "caches": [
  "noise-smuggler-v3",
  "other-app",
  "roasted-qa-v38",
  "roasted-v38",
  "timermask-v9"
 ],
 "ns": "keep"
}
```
### S3 — PASS
```
[
 "noise-smuggler-v3",
 "roasted-v38"
]
```
### S4 — PASS
```
{
 "duringQuiz": "v38",
 "after": "v38-next"
}
```
### S5 — PASS
```
{
 "v0": "v38",
 "offlineOk": true,
 "caches": [
  "roasted-v38b"
 ]
}
```
### S6 — PASS
```
{
 "normal": {
  "name": "RoastED",
  "id": "(default)"
 },
 "qa": {
  "name": "RoastED QA",
  "id": "roasted-qa"
 }
}
```
### M1 — PASS
```
320x568, 360x740, 390x844, 430x932, 768x1024, 844x390
```
### M2 — PASS
```
{
 "bad": [],
 "noalt": [],
 "small": [],
 "lang": "en"
}
```
### M3 — PASS
```
{
 "screen": "Quiz",
 "i": 1,
 "iAfter": 1,
 "score": 1
}
```
### M4 — PASS
```
{
 "toast": "shown"
}
```
### M5 — PASS
```
{
 "ios": true,
 "said": [
  "Goeie môre|af-ZA",
  "Hallo|af-ZA"
 ]
}
```
### M6 — PASS
```
{
 "denied": "Microphone blocked. Allow the microphone in your browser settings.",
 "noSpeech": "Didn't catch that. Tap 🎤 and speak a bit louder and slower.🎤 You got me! The mic doesn't always catch short words yet. I'm working on it, just move on to the next one."
}
```
### M7 — PASS
```
[
 "Menu",
 "Home",
 "Welcome",
 "Welcome+dialog"
]
```