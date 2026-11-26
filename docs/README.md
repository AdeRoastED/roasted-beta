# RoastED v38 — QA package

## What is in this package
| Folder / file | What it is |
|---|---|
| `builds/roasted-v38-normal.zip` | **Normal build** — for real users and technical testers. No QA tools, no ads, levels unlock at 60%. |
| `builds/roasted-v38-qa.zip` | **QA build** — QA panel, everything unlocked, simulated ads/purchases, separate storage. **Never publish it publicly.** |
| `source/` | Complete development source (the one authoritative source for both builds), including tools and tests. |
| `docs/` | Changelog, test results, content validation, baseline diff review, checklists, limitations. |

## Start here
1. `docs/CHANGELOG.md` — what changed.
2. `docs/TEST_RESULTS.md` — automated browser tests (run on the final packaged builds).
3. `docs/ISSUES_AND_LIMITATIONS.md` — what is still open, by severity, and what could not be tested.
4. `docs/HUMAN_REVIEW_REQUIRED.md` — content that needs native speakers.
5. Checklists: `docs/QA_TECHNICAL_CHECKLIST.md` (technical testers), `docs/QA_LANGUAGE_CHECKLIST.md` (native speakers and teachers).
6. `docs/MONETIZATION.md` — free/premium model: implemented vs missing.

## Deploying (nothing was published)
- Normal build: upload the **contents** of `roasted-v38-normal.zip` to the app folder (today: the `roasted-app` repository root). Existing user progress is kept.
- QA build: upload to a **different, private folder or site** (never the same folder as the normal build — they would share one service worker). Example: a private repository `roasted-app-qa`.
- After uploading, wait ~10 minutes and reopen the app twice; Settings must show `build v38`.

## Rebuilding and testing (for developers)
```
cd source
python3 tools/build.py ../dist              # makes dist/normal and dist/qa
node tests/validate_content.js . docs       # content checks (exit code 1 = errors)
python3 tools/baseline_report.py docs       # translation guard diff, grouped (read-only)
node tests/run_all.js ../dist [--quick]     # 42 browser tests (needs Playwright + Chrome)
```
`tools/translation_guard.py` and `tools/translation_baseline.json` are kept unchanged and are **not** part of either build.
