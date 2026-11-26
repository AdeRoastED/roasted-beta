# Content that needs human (native-speaker / teacher) review

Automated validation (`CONTENT_VALIDATION.md`) found **0 structural errors** in 29,610 answer records, all word lists and all 24 conversations. That only means the data is *consistent* (answer keys point to the right option, every Thai answer has romanization, no empty fields, French spacing rule followed…). **It does not mean the language is correct or natural.**

Use the QA build: 🧪 → choose language pair → topic → level → tap any question. Turn on "show the correct answer". Report problems with 🚩 (they include the question ID automatically).

## Priority 1 — never reviewed by a native speaker
| Content | Where | Size | Who |
|---|---|---|---|
| **Afrikaans** (as native and as target), including Oom Koos UI texts | all topics, conversations, UI | ~5,000 records + 24 conversations | Afrikaans speaker |
| **Thai** (as native and target) + **romanization** of every Thai answer | all topics, conversations, words | ~5,000 records | Thai speaker |
| Grammar topics generated in v28: **new verbs per level** (past, future, negation, questions) | topics pres/past/fut/neg/ques | ~7,500 records | all languages |
| **Numbers 100 → 2,000,000,000** written in words | numbers, Intermediate + Advanced | 6,000 records | all languages (especially Afrikaans and Thai) |
| **16 conversations** added in v31–v32 (8 Advanced, 5 Beginner, 3 Intermediate) | Conversations | 16 × 6 turns × 6 languages | all languages |
| Interface texts added in v29–v38: "What's new" pop-up (v38), trophies, daily goal, streak freeze, calendar, challenge, report dialog, monetization dialogs, system messages, mic short-word message | app.js / report.js / monet.js | ~250 strings × 6 | all languages (Italian and English were also written by me) |
| New vocabulary topics (pronouns, verbs, months, directions) | topics pron/verbs/months/dir | 3,600 records | all languages |

## Priority 2 — changed by me in this audit
- The 11 "Both … are correct" English questions (`NS_QUESTIONS_CHANGES.md`) — confirm the answers, and decide if you keep this question format.

## Priority 3 — flagged by the automated checks
- 29 records where the correct answer changed since the baseline before this audit, plus the 43 "Both…" records changed by me (`BASELINE_DIFF_REPORT.md`, categories marked **CHECK**) — confirm they were approved corrections.
- 472 records where only the Thai romanization changed since the baseline — Thai speaker to confirm.
- 115 records whose native sentence changed since the baseline (e.g. "crowded with people" fix, German friend corrections) — confirm.
- 5 questions with options that differ only by capital letters, 50 only by punctuation/apostrophes (`CONTENT_VALIDATION.md`) — confirm they are fair.
- 30 items where different native languages lead to different correct target sentences (`parallel-diff`) — confirm each matches its own native sentence.

## Already reviewed by native speakers (per your earlier messages) — do not change without asking
- Italian and English roasts (approved by you); French and German tutor roasts (friends' corrections applied); Oom Koos and ป้าส้ม roasts (as sent by friends); French and German corrections from your French-native friend; Thai UI fixes from your Thai friend.
