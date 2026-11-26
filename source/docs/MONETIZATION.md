# Free / Premium model — status

**Nothing in the app takes real payments or shows real ads.**
- **Normal build:** the commercial model is switched off (`MONET_CFG.enabled = false`). Users get the full learning experience with the existing limits only (1 free "undo" per quiz, 5 Torture Bench hints per day). No ad placeholders, no purchase dialogs, no locks.
- **QA build:** the model is simulated. Ads are a 3-second overlay labelled "SIMULATED AD"; purchases are a dialog labelled "SIMULATED PURCHASE — no payment". Testers can switch the simulation off, grant/remove Lifetime Premium and reset daily counters in the QA panel.

Rewarded ads: a reward is given **only** when the ad finishes successfully, and **only once** per ad (tests Q4/Q5). Cancelled, failed or crashing ads give nothing; for "continue after 10 questions" the block stays.

All rules live in **one object, `MONET_CFG` at the top of `monet.js`** — change numbers there, no other code changes needed.

| Agreed rule | Status | Config key |
|---|---|---|
| Free levels spread across all difficulty tiers (not only Beginner) | ✅ Implemented (QA simulation). **The split is a placeholder** — the final split is not decided. | `freeLevels` (topic → free levels; `'*'` = default) |
| 3 free "go back to correct" per day | ✅ Implemented (QA) | `undo.perDay` |
| After 2 used, a rewarded ad restores the balance to 3 (no stacking above 3) | ✅ Implemented (QA) | `undo.refillAfterUsed`, `undo.max` |
| 3 free hints per day | ✅ Implemented (QA) | `hints.perDay` |
| More hints through rewarded ads; daily ad limit **not decided** | ✅ Implemented, limit = none until decided | `hints.perAd`, `hints.adMaxPerDay` (`null` = no limit) |
| Watch an ad to continue after 10 questions | ✅ Implemented (QA) — counts questions per day; challenge mode excluded | `continueAfter` (0 = off) |
| Lifetime Premium (primary purchase) | ✅ Simulated purchase; removes the daily correction, hint and continue limits and unlocks everything (verified by test Q6) | `products.lifetime` (price `null` = not decided) |
| Unlock one topic / unlock all levels | ✅ Simulated purchases | `products.topic`, `products.allLevels` |
| No subscriptions | ✅ None exist | — |
| Lessons link in menu and results, never during a quiz | ✅ Verified by test L2/L3 | `lessonsLink` (documentation only) |

## Missing before real money (needs decisions and infrastructure, not just code)
1. **Prices and the final free/premium split** (your decision).
2. **A payment provider.** Options: Google Play Billing (if the app ships to Play Store as a TWA), or a web payment provider (e.g. Stripe, Paddle, Lemon Squeezy) — each has fees and legal requirements. **Not chosen, nothing added.**
3. **An ad network with rewarded ads.** Rewarded ads in a web app/PWA are limited; Play Store (TWA) has more options. Needs a consent banner (GDPR/ePrivacy) and a privacy policy. **Not chosen, nothing added.**
4. **Purchase verification and "restore purchases".** In the simulation, Premium is stored on the device and can be edited by a technical user. Real Premium must be verified by the store or a server.
5. **Legal texts:** privacy policy, terms of sale, refund policy, ad consent.
6. **Free-tier UX copy** in all 6 languages (current dialog texts are drafts — see the language checklist).
