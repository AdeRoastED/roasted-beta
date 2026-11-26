# Remaining issues and limitations (v38)

Prioritised by severity. "Automated" means checked by a script or a headless browser — **not** by a person on a real phone and **not** by a native speaker.

## Critical
None known. All reproducible defects found in this audit were fixed (see CHANGELOG).

## High
| # | Issue | Why it matters | What is needed |
|---|---|---|---|
| H1 | **No native-speaker validation yet** for: all Afrikaans and Thai content; the grammar items generated in v28 (new verbs per level); numbers 100 → 2 billion; the 16 conversations added in v31–v32; all interface texts added in v29–v38 (trophies, daily goal, challenge, reports, monetization dialogs, system messages); the 11 "Both…" questions. | Automated checks cannot judge naturalness or correctness. | Native speakers / teachers using `QA_LANGUAGE_CHECKLIST.md`. Full list: `HUMAN_REVIEW_REQUIRED.md`. |
| H2 | **Not tested on real phones**: iPhone voice output (fix in v35 untested on a real iPhone), Android back button, installing to the home screen, real microphone permissions, real voices per language, phone calls/notifications interrupting. | Browser engines on phones behave differently from the desktop engine used here. | Technical testers using `QA_TECHNICAL_CHECKLIST.md`. |
| H3 | **Public repository.** The GitHub repository is public, so all content can be copied. The QA build has no password. | Content protection; QA build must not reach users. | Your decision (private repo + private hosting). Deploy the QA build only to a private/unlisted location in a **different folder** from the normal app. Nothing was changed on GitHub. |

## Medium
| # | Issue | Notes |
|---|---|---|
| M1 | Simulated Premium is stored on the device. | Fine for simulation; real purchases need store/server verification (`MONETIZATION.md`). |
| M2 | Private-lessons link points to `teacherandrea.netlify.app`. | Netlify credits were exhausted earlier — please check the link still opens. |
| M3 | Font "Prompt" is still loaded from Google Fonts. | The font files are not available in this environment, so they could not be bundled. Works offline after the first visit. Loading fonts from Google can be a GDPR issue in the EU. **Fix:** provide the Prompt font files (free, SIL OFL) → bundle + licence, remove the Google request. |
| M4 | ~~"What's new" pop-up English-only and outdated~~ | **Fixed in v38** (all 6 languages). The new texts still need native review. |
| M5 | Speech recognition struggles with short words and Thai numbers. | Browser/OS limitation. The app now shows a friendly message after 2 misses. |
| M6 | "Both A and B are correct" format: a learner who picks one of the two correct sentences alone is marked wrong. | Pedagogical decision for you/teachers (`NS_QUESTIONS_CHANGES.md`). |
| M7 | 30 "parallel" items where different native languages lead to different correct target sentences. | Probably intended (each native sentence is worded differently) — confirm (`CONTENT_VALIDATION.md`, code `parallel-diff`). |
| M8 | Translation baseline is outdated (created 2026-11-16). | 20,290 added / 175 removed / 587 modified before this audit (+53 modified by the "Both…" fixes = 640 now), categorised in `BASELINE_DIFF_REPORT.md`. **Not approved** — approve only after native review. |

## Low
| # | Issue |
|---|---|
| L1 | Share-preview image (`og.jpg`) is older than the current banner. |
| L2 | 5 questions have two options differing only by capital letters and 50 only by punctuation/apostrophes (intended traps? confirm). |
| L3 | Accessibility: colour contrast, screen readers (TalkBack/VoiceOver), font-size control and dyslexia font are not verified/implemented. Basic checks pass (button names, alt text, page language, 38 px top-bar targets). |
| L4 | First download ≈ 10 MB (language data 7.1 MB uncompressed, ≈1 MB compressed by GitHub Pages). |
| L5 | Report e-mail button is hidden until an address is set (`REPORT_EMAIL` in `report.js`). |
| L6 | QA build with simulated Lifetime Premium shows the hint count as 99 (meaning unlimited). Cosmetic, QA only. |

## Not tested by me (environment limits)
- Real iPhone/Android devices, real installation prompts, real microphones, real text-to-speech voices, screen readers, low-end phone performance, slow/unstable mobile networks (only simulated offline and failed downloads), app-store packaging.
- Linguistic correctness — only structural checks were automated.

## Minification / obfuscation — evaluated, not applied
Measured with **esbuild 0.28** (reliable, MIT licence, already installed here — not homemade):

| File | Original (gzip) | Minified (gzip) | Saving |
|---|---:|---:|---:|
| app.js | 54.1 KB | 50.7 KB | 6 % |
| report.js | 6.2 KB | 5.5 KB | 11 % |
| monet.js | 4.3 KB | 3.4 KB | 21 % |
| qa.js | 3.9 KB | 3.5 KB | 12 % |

The whole download is dominated by language data and images (≈1 MB compressed); minifying the code saves about 5 KB in total and does not hide the content (sentences, translations and roasts are plain data files). Obfuscation would make the app slower and larger and debugging harder. **Recommendation:** do not minify or obfuscate for now; the source stays readable. If wanted later, add an esbuild step to `tools/build.py` and re-run the full test suite on the minified build.

## Licensing and external dependencies
See `LICENSING_AND_DEPENDENCIES.md`.
