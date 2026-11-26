# Licensing and external dependencies (v38)

I am not a lawyer; this is an inventory, not legal advice.

## The app itself
- `LICENSE`: "Copyright (c) 2026 Adeba Studio. All rights reserved." The same line appears in Settings.
- No third-party JavaScript libraries are shipped. Everything in `app.js`, `monet.js`, `report.js`, `qa.js`, `sw.js` is project code.

## Runtime dependencies (used by the app on users' devices)
| Item | Source | Licence / terms | Notes |
|---|---|---|---|
| Font "Prompt" | Google Fonts (fonts.googleapis.com) | SIL Open Font License 1.1 | Free for commercial use. Still loaded from Google: the font files were not available in this build environment. Once you provide them, they will be bundled with `OFL.txt` and the Google request removed. |
| Text-to-speech, speech recognition | The browser/OS (Web Speech API) | Part of the user's browser | Quality and languages depend on the device. Chrome on Android may send speech to Google for recognition. Mention this in the privacy policy. |
| Share sheet, clipboard, downloads | Browser APIs | — | No external service. |

## Assets
| Asset | Origin (as told by you) | Action |
|---|---|---|
| Tutor images (6), banner, icons, flags in banner | Created by you (partly with ChatGPT image generation) | Keep a record of how/when they were made; check the AI tool's terms for commercial use (OpenAI's terms currently assign output rights to the user). Flags are not copyrighted, but avoid official emblems. |
| Sentences, translations, roasts, conversations | Written by you, your friends and AI assistance | Keep the friends' written consent that their roast lines/corrections may be used commercially. |
| Cultural references in roasts (Molière, Napoléon/Waterloo, the Springboks, etc.) | Generic references | No quoted copyrighted text found. "Springbokke"/"Springboks" is a team name used descriptively. |

## Development-only tools (NOT in the builds)
| Tool | Licence | Used for |
|---|---|---|
| Playwright | Apache-2.0 | Browser tests (`tests/run_all.js`) |
| Google Chrome (headless) | Google terms | Running tests |
| Python 3 standard library | PSF | `tools/*.py` |
| esbuild (evaluated only) | MIT | Minification measurement |

No paid dependencies were added.

## Trademark
"RoastED" has not been checked against trademark registers. Do a search (EUIPO, USPTO, WIPO, Google Play) before commercial launch.
