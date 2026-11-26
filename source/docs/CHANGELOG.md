# RoastED — Changelog

## v38 — final corrections before external QA (2026-11-26)
Requested checks after the independent review of v37. No new features, no translation changes.

### Fixed — simulated commercial model (QA build only; the normal build is unaffected)
- **Duplicate rewards:** every rewarded ad now goes through one guard, so a reward can be given only once per ad, even on double taps or repeated callbacks. Cancelled, failed and crashing ads give no reward.
- **"Continue after 10 questions":** a cancelled or failed ad used to let the quiz continue anyway. Now the block stays until an ad is finished (or the user stops).
- **Corrections after an ad refill:** the refill used a second, different undo handler (it did not adjust the wrong-answer streak or the daily question count and could go below zero). One shared handler is now used before and after a refill; the balance is refilled to exactly 3, never more.
- **Lifetime Premium:** it fell back to the normal-build limits (1 correction per quiz, 5 hints per day). Premium now really removes the daily correction, hint and continue limits.
- **Hint counter:** while the model is on, the hint button now shows the model's daily count (3), not the normal-build count (5).

### Changed
- **"What's new" pop-up** rewritten for the current app and translated into all 6 languages (title, items, level names). Shown once after an update, never to first-time users.
- **Copyright** standardised: "© 2026 Adeba Studio. All rights reserved." (Settings line and LICENSE).

### Not done (needs a file from you)
- **Local Prompt font:** the font files are not available in this environment (no internet access here), so the app still loads Prompt from Google Fonts. Send the font files (free download, SIL Open Font License) and they will be bundled with the licence and the Google request removed.

### Tests
- 4 new tests (W1 What's new, Q4 rewarded ads, Q5 corrections after refill, Q6 Lifetime Premium) — 42 tests in total, all passing on the final packaged builds.


## v37 — QA-readiness release (2026-11-26)

No new learning features. Focus: stability, safety, content correctness, testing readiness.

### Fixed — critical (cross-app safety)
- **Service worker deleted other apps' caches.** On every update RoastED deleted *every* cache on `aderoasted.github.io`, including other Adeba Studio apps. It now deletes only older RoastED caches of the same build kind (`roasted-v…` for normal, `roasted-qa-v…` for QA). Tested with foreign caches present (test S2).
- **Crash-recovery "Force fresh reload" removed every service worker and cache on the domain.** It now removes only RoastED's own service worker (same scope) and RoastED caches (test S3).

### Fixed — security
- **Challenge links** (`#duel=…`) are external input. They are now validated (language codes, topic, level, list length, numbers) and player names are escaped before display. Previously a crafted link could inject HTML/script into the results screen (test X1).
- `loadData()` accepts only the six language codes.

### Fixed — content
- **"Both A and B are correct" questions (55 records = 11 English questions × 5 native languages):** in 9 questions the scored answer was "Both…", but the correction shown to the learner was a single sentence. The correction now matches the scored answer; the example sentence is kept for listening/reading practice. One ambiguous distractor replaced (culture-17), one unnecessary no-shuffle flag removed (culture-3). Every change: `NS_QUESTIONS_CHANGES.md`. **Needs native-speaker confirmation.**
- 12 system messages (backup/export/import, microphone not supported, empty challenge link, empty bench) were English-only; now in all 6 languages.

### New — testing infrastructure (no user-facing features)
- **One source → two builds** (`tools/build.py`):
  - **Normal build:** no QA code at all (`qa.js` physically excluded); levels unlock at 60% as designed; no ads, no purchase dialogs.
  - **QA build:** QA panel (any language pair, topic, level, single question; question IDs and optional correct answers on screen), simulated free/premium model (fake ads and purchases, clearly labelled), separate storage (`roastedqa*`), separate caches (`roasted-qa-v*`), separate install name "RoastED QA".
- **Question reporting without GitHub** (`report.js`): every report has a stable question ID (`topic-index` + content signature), language pair, topic, level, mode, the options exactly as shown, expected answer, chosen answer, problem type, comment, app version. Share (WhatsApp/Telegram/email through the phone's share sheet), copy, or save for later; Settings → Reports lists them, exports a JSON + text file, and shows how many are not sent yet. Reports are saved immediately (survive reload/closing). No personal data collected. Report buttons also on the Torture Bench and in conversations.
- **Commercial model, configurable** (`monet.js`): all rules in one config object (`MONET_CFG`). Disabled in the normal build. See `MONETIZATION.md`.
- **Automated tests**: `tests/run_all.js` (38 browser tests), `tests/validate_content.js` (29,610 answer records + UI + word lists + conversations), `tools/baseline_report.py` (categorised translation-guard diff, read-only).

### Changed
- Normal build: **level locking is ON again** (next level opens at 60% on the previous level). It was switched off for internal testing; the QA build keeps everything open.
- Version shown in Settings: `build v37 · © 2026 RoastED. All rights reserved.`

### Unchanged on purpose
- Translation guard and its baseline (`tools/translation_baseline.json`) — not approved, not overwritten.
- All existing content, characters, roasts, humour, levels and features.
- Storage keys of the normal app — existing user progress loads unchanged (test D3).

## Earlier builds (summary)
- v36 auto-update fix · v35 iPhone speech workarounds · v34 conversations use the Levels screen · v33 top-bar icon sizes · v32 "Beat my score" challenge, 24 conversations, short-word mic message, LICENSE · v31 advanced conversations, trophy pop-ups, loading banner · v30 trophies/streak freeze/calendar + 8 audit fixes · v29 tutor roasts for all 6 languages · v28 numbers to 2 billion, new verbs per level, French spacing.
