# RoastED v38 — Technical QA checklist

**Use real phones.** Automated tests already passed in a desktop browser engine (`TEST_RESULTS.md`); this checklist covers what only real devices can show.

Record for every problem: device + OS version + browser, build number (Settings), steps, expected vs actual, screenshot/video. For content problems use 🚩 inside the app.

## Devices to cover (minimum)
- [ ] Android, Chrome, recent phone · [ ] Android, older/cheap phone (2–3 GB RAM) · [ ] iPhone, Safari, current iOS · [ ] iPhone, older iOS (15/16) · [ ] Tablet (any) · [ ] Desktop Chrome / Edge / Firefox / Safari

## 1. Install, update, offline
- [ ] First visit loads; Settings shows `build v38`.
- [ ] Install to home screen (Android: install prompt/menu; iPhone: Share → Add to Home Screen). Icon has **no black bars**; loading banner appears.
- [ ] Installed app opens on the **first page** (language choice) every time.
- [ ] Airplane mode → close → reopen: app works; switch native and target languages; play a quiz; open a conversation.
- [ ] Update: when a new build is published, the app updates by itself after reopening (may need 2 reopenings), never in the middle of a quiz.
- [ ] Slow/unstable network (e.g. weak signal): app still opens; no blank/white page. If a crash screen appears, "Force fresh reload" fixes it.
- [ ] Normal and QA builds installed side by side do not share progress, reports or settings.

## 2. Navigation
- [ ] Android back button goes back screen by screen; on the first page it asks "Close RoastED?"; Yes closes, No stays.
- [ ] Top bar: all buttons the same size and aligned; Home always returns to the menu.
- [ ] Rotating the phone (portrait ↔ landscape) keeps the screen usable; no sideways scrolling.
- [ ] Long texts (German, Afrikaans, Thai) fit buttons; nothing cut off.

## 3. Learning flow (normal build)
- [ ] Level 2 opens only after ≥60% on Level 1 of the same topic (levels are locked in the normal build).
- [ ] Results screen: score, stars, roast, next-topic buttons, private-lessons link. Lessons link **never appears during a quiz**.
- [ ] Wrong answer: popup with roast, listen, mic, report; "go back to correct" (undo) once per quiz.
- [ ] Torture Bench: type and speak answers; hints (5 per day); report button.
- [ ] Review My Mistakes includes mistakes from words, numbers, grammar and sentences; "Again" repeats the review.
- [ ] Numbers: Beginner 0–100, Intermediate 100–1000, Advanced 1000+.
- [ ] Conversations: Level → list of 8 → play; listen to the whole conversation (pauses + highlighted line).
- [ ] Challenge: create, share link (WhatsApp/Telegram), friend opens link on another phone, same 10 questions, winner shown, rematch, **share image** opens the share sheet.
- [ ] Trophies: tap each trophy → popup; calendar shows today; daily goal ring; streak freeze line.
- [ ] Export progress → file saved; Import it on another phone → progress restored. Import a random file → refused, progress untouched.

## 4. Audio and microphone (most device-dependent)
- [ ] 🔊 buttons read the sentence in the **target** language. iPhone: test with the silent switch **off** and **on** (note the result).
- [ ] Languages without a phone voice (often Afrikaans, sometimes Thai): app uses a fallback voice or shows a message — never crashes.
- [ ] First mic use asks for permission. Deny → clear message. Allow later in phone settings → works.
- [ ] Mic during a phone call / with Bluetooth earbuds / after switching apps.
- [ ] Short words: after 2 misses the tutor message appears.

## 5. Interruptions
- [ ] Incoming call / notification / lock screen mid-quiz → return: same question, same score.
- [ ] Switch to another app for 10 minutes → return: no crash; audio still works.
- [ ] Low battery saver mode: app still usable.

## 6. Reporting (both builds)
- [ ] 🚩 on a quiz question → choose problem → comment → **Share** (WhatsApp/Telegram/email) and **Copy** both work.
- [ ] "Save for later" → close app → reopen → Settings → Reports shows it as "not sent".
- [ ] Export all → JSON + text files downloaded; can be sent to the team.

## 7. QA build only
- [ ] Purple "QA BUILD" bar visible; 🧪 opens the QA panel.
- [ ] Choose any pair/topic/level/question; question ID shown under each question.
- [ ] Simulated ads: "Close early" gives no reward; "Finish ad" gives it once (tap Finish twice: still only once).
- [ ] Simulated monetization: locked level → simulated purchase; 3 corrections/day then ad button; 3 hints/day then ad; ad after 10 questions; Lifetime Premium removes all limits. Every ad/purchase is labelled SIMULATED and costs nothing.
- [ ] "Reset ALL QA data" does not touch the normal app's progress.

## 8. Accessibility (manual)
- [ ] TalkBack (Android) / VoiceOver (iPhone): main buttons are announced with a sensible name.
- [ ] Phone font size set to large: text still fits, no overlap.
- [ ] Colour contrast readable in bright sunlight.
