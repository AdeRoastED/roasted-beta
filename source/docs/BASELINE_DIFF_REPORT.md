# Translation guard — baseline diff review

Read-only report. The baseline (`tools/translation_baseline.json`, created 2026-11-16) was **not** changed or approved.

Raw guard totals: **20290 added, 175 removed, 640 modified** (records = native × topic × sentence × target).

Before the v37 audit the guard reported 20,290 added, 175 removed, 587 modified. The v37 audit added 53 modified records: the "Both…" question fixes (categories `f+sf`, `ns`, `o` — see NS_QUESTIONS_CHANGES.md). Nothing else in the data was changed by the audit.

| Category | Records | Needs human decision? |
|---|---:|---|
| ADDED: grammar topic items (new verbs per level) | 7455 | YES — native check |
| ADDED: new items in existing vocabulary topic adj (more levels) | 300 | YES — native check |
| ADDED: new items in existing vocabulary topic basic (more levels) | 300 | YES — native check |
| ADDED: new items in existing vocabulary topic col (more levels) | 300 | YES — native check |
| ADDED: new items in existing vocabulary topic greet (more levels) | 300 | YES — native check |
| ADDED: new items in existing vocabulary topic thalpha (more levels) | 90 | YES — native check |
| ADDED: new items in existing vocabulary topic time (more levels) | 270 | YES — native check |
| ADDED: new sentences (topics expanded to 30, Level 3) | 1500 | YES — native check |
| ADDED: new topic dir (created after the baseline) | 900 | YES — native check |
| ADDED: new topic months (created after the baseline) | 900 | YES — native check |
| ADDED: new topic pron (created after the baseline) | 900 | YES — native check |
| ADDED: new topic verbs (created after the baseline) | 900 | YES — native check |
| ADDED: numbers 100+ (Intermediate/Advanced) | 6000 | YES — native check |
| EDITED: native sentence changed (key changed) — CHECK it was an approved correction | 115 | YES — native check |
| MODIFIED: French spacing rule only (space before ? !) | 84 | confirm the rule, then approve |
| MODIFIED: Thai romanization only | 472 | YES — Thai speaker |
| MODIFIED: correct answer changed (c+f+o+r) — CHECK | 2 | YES — native check |
| MODIFIED: correct answer changed (c+o+r) — CHECK | 1 | YES — native check |
| MODIFIED: correct answer changed (f+o) — CHECK | 20 | YES — native check |
| MODIFIED: correct answer changed (f+o+ph+r) — CHECK | 2 | YES — native check |
| MODIFIED: correct answer changed (f+o+r) — CHECK | 4 | YES — native check |
| MODIFIED: correct answer changed (f+sf) — CHECK | 43 | YES — native check |
| MODIFIED: options/distractors (ns) | 5 | YES — native check |
| MODIFIED: options/distractors (o) | 5 | YES — native check |
| MODIFIED: options/distractors (o+r) | 1 | YES — native check |
| MODIFIED: options/distractors (ph+r) | 1 | YES — native check |
| RENAMED: French spacing rule (sentence key changed) | 52 | confirm the rule, then approve |
| RENAMED: French spacing rule (sentence key changed) + other changes | 8 | confirm the rule, then approve |

Full list: `baseline_diff.csv` (one row per record, with baseline and current values).

## Samples per category

### ADDED: grammar topic items (new verbs per level)
- `it.pres` “Noi giochiamo a calcio.” → en
- `it.pres` “Noi giochiamo a calcio.” → fr
- `it.pres` “Noi giochiamo a calcio.” → de
- `it.pres` “Noi giochiamo a calcio.” → th

### ADDED: new items in existing vocabulary topic adj (more levels)
- `it.adj` “giovane” → en
- `it.adj` “giovane” → fr
- `it.adj` “giovane” → de
- `it.adj` “giovane” → th

### ADDED: new items in existing vocabulary topic basic (more levels)
- `it.basic` “il cane” → en
- `it.basic` “il cane” → fr
- `it.basic` “il cane” → de
- `it.basic` “il cane” → th

### ADDED: new items in existing vocabulary topic col (more levels)
- `it.col` “verde scuro” → en
- `it.col` “verde scuro” → fr
- `it.col` “verde scuro” → de
- `it.col` “verde scuro” → th

### ADDED: new items in existing vocabulary topic greet (more levels)
- `it.greet` “Buon pomeriggio” → en
- `it.greet` “Buon pomeriggio” → fr
- `it.greet` “Buon pomeriggio” → de
- `it.greet` “Buon pomeriggio” → th

### ADDED: new items in existing vocabulary topic thalpha (more levels)
- `it.thalpha` “cembali” → th
- `it.thalpha` “catena” → th
- `it.thalpha` “donna” → th
- `it.thalpha` “soldato” → th

### ADDED: new items in existing vocabulary topic time (more levels)
- `it.time` “il mezzogiorno” → en
- `it.time` “il mezzogiorno” → fr
- `it.time` “il mezzogiorno” → de
- `it.time` “il mezzogiorno” → th

### ADDED: new sentences (topics expanded to 30, Level 3)
- `it.food` “Se l'avessi saputo, avrei ordinato il pesce.” → en
- `it.food` “Se l'avessi saputo, avrei ordinato il pesce.” → fr
- `it.food` “Se l'avessi saputo, avrei ordinato il pesce.” → de
- `it.food` “Se l'avessi saputo, avrei ordinato il pesce.” → th

### ADDED: new topic dir (created after the baseline)
- `it.dir` “a sinistra” → en
- `it.dir` “a sinistra” → fr
- `it.dir` “a sinistra” → de
- `it.dir` “a sinistra” → th

### ADDED: new topic months (created after the baseline)
- `it.months` “gennaio” → en
- `it.months` “gennaio” → fr
- `it.months` “gennaio” → de
- `it.months` “gennaio” → th

### ADDED: new topic pron (created after the baseline)
- `it.pron` “io” → en
- `it.pron` “io” → fr
- `it.pron` “io” → de
- `it.pron` “io” → th

### ADDED: new topic verbs (created after the baseline)
- `it.verbs` “essere” → en
- `it.verbs` “essere” → fr
- `it.verbs` “essere” → de
- `it.verbs` “essere” → th

### ADDED: numbers 100+ (Intermediate/Advanced)
- `it.num` “centouno” → en
- `it.num` “centouno” → fr
- `it.num` “centouno” → de
- `it.num` “centouno” → th

### EDITED: native sentence changed (key changed) — CHECK it was an approved correction
- `it.food` “Il ristorante era affollato” → en
  - before: `{"o": ["The restaurant was crowded of people.", "The restaurant was crowded by people.", "The restaurant was crowded with people.", "The restaurant was crowded in people."], "f": "The restaurant was crowded with people.", "r": "\"Crowded\" vuole rigorosamente \"with\". La prego di studiare."}`
  - now: `{"o": ["The restaurant was crowded.", "The restaurant was crowding.", "The restaurant were crowded.", "The restaurant was crowd."], "f": "The restaurant was crowded.", "r": "«Crowded» basta da solo, tesoro: vuol già dire pieno di gente. E il ristorante è uno solo: «was»."}`
- `it.food` “Il ristorante era affollato” → fr
  - before: `{"o": ["Le restaurant était bondé.", "Le restaurant était bondé par des gens.", "Le restaurant était bondé avec des gens.", "Le restaurant était plein gens."], "f": "Le restaurant était bondé.", "r": "Si dice «bondé de gens», con 'de', non 'par' o 'avec'. Il ristorante è pieno, tu sei vuoto."}`
  - now: `{"o": ["Le restaurant était bondé.", "Le restaurant était bondée.", "Le restaurant avait bondé.", "Le restaurant bondé était."], "f": "Le restaurant était bondé.", "r": "«Restaurant» è maschile: «bondé», senza la -e. E con «être», non «avoir», tesoro."}`
- `it.food` “Il ristorante era affollato” → de
  - before: `{"o": ["Das Restaurant war voll Menschen von.", "Das Restaurant war überfüllt.", "Das Restaurant war voll mit Mensche.", "Das Restaurant war gefüllt Leute."], "f": "Das Restaurant war überfüllt.", "r": "«Überfüllt von Menschen»: serve 'von' dopo 'überfüllt'. Il locale era pieno, tu a corto di prepos`
  - now: `{"o": ["Das Restaurant war überfüllt.", "Das Restaurant war überfüllte.", "Das Restaurant hatte überfüllt.", "Das Restaurant überfüllt war."], "f": "Das Restaurant war überfüllt.", "r": "Dopo «war» l'aggettivo non prende desinenza: «überfüllt». E il verbo resta al secondo posto, caro mio."}`
- `it.food` “Il ristorante era affollato” → th
  - before: `{"o": ["ร้านอาหารคนแน่นมาก", "ร้านอาหารมากคนแน่น", "คนร้านอาหารแน่นมาก", "ร้านอาหารแน่นมากคน"], "f": "ร้านอาหารคนแน่นมาก", "r": "ร้านอาหาร apre il discorso, คนแน่นมาก lo commenta — inverti l'ordine, e il ristorante sembra meno affollato, più infestato."}`
  - now: `{"o": ["ร้านอาหารแน่นมาก", "ร้านอาหารมากแน่น", "แน่นร้านอาหารมาก", "ร้านแน่นอาหารมาก"], "f": "ร้านอาหารแน่นมาก", "r": "Prima il posto, «ร้านอาหาร», poi «แน่น», e «มาก» in fondo, tesoro."}`

### MODIFIED: French spacing rule only (space before ? !)
- `it.food` “Mi passi i pesci?” → fr
  - before: `{"o": ["Tu me passes le poisson ?", "Tu me passes les poissons-là ?", "Tu me passes la poissons ?", "Tu me passes des poisson ?"], "f": "Tu me passes le poisson ?", "r": "Il plurale vuole la 's': «les poissons». Un solo pesce non fa una cena, né una frase giusta."}`
  - now: `{"o": ["Tu me passes le poisson?", "Tu me passes les poissons-là?", "Tu me passes la poissons?", "Tu me passes des poisson?"], "f": "Tu me passes le poisson?", "r": "Il plurale vuole la 's': «les poissons». Un solo pesce non fa una cena, né una frase giusta."}`
- `it.food` “Avete pane senza glutine?” → fr
  - before: `{"o": ["Avez-vous du pain sans gluten ?", "Avez-vous des pain sans gluten ?", "Avez-vous un pains sans gluten ?", "Avez-vous du pain au sans gluten ?"], "f": "Avez-vous du pain sans gluten ?", "r": "«Du pain sans gluten»: partitivo davanti al pane, senza aggiunte creative. Impara, tesoro."}`
  - now: `{"o": ["Avez-vous du pain sans gluten?", "Avez-vous des pain sans gluten?", "Avez-vous un pains sans gluten?", "Avez-vous du pain au sans gluten?"], "f": "Avez-vous du pain sans gluten?", "r": "«Du pain sans gluten»: partitivo davanti al pane, senza aggiunte creative. Impara, tesoro."}`
- `it.travel` “Puoi darmi qualche consiglio?” → fr
  - before: `{"o": ["Peux-tu me donner quelques conseils ?", "Peux-tu me donner quelques conseil ?", "Peux-tu me donner des conseil ?", "Peux-tu me donner un conseils ?"], "f": "Peux-tu me donner quelques conseils ?", "r": "«Des conseils» al plurale, e in francese si dice 'quelques conseils'. Consiglio gratis: s`
  - now: `{"o": ["Peux-tu me donner quelques conseils?", "Peux-tu me donner quelques conseil?", "Peux-tu me donner des conseil?", "Peux-tu me donner un conseils?"], "f": "Peux-tu me donner quelques conseils?", "r": "«Des conseils» al plurale, e in francese si dice 'quelques conseils'. Consiglio gratis: studia`
- `it.travel` “Quanto tempo ci vuole?” → fr
  - before: `{"o": ["Combien de temps faut-il ?", "Combien du temps faut-il ?", "Combien temps faut-il ?", "Combien de temps il faut ?"], "f": "Combien de temps faut-il ?", "r": "«Combien de temps» con 'de', tesoro. «Combien temps» sembra un telegramma."}`
  - now: `{"o": ["Combien de temps faut-il?", "Combien du temps faut-il?", "Combien temps faut-il?", "Combien de temps il faut?"], "f": "Combien de temps faut-il?", "r": "«Combien de temps» con 'de', tesoro. «Combien temps» sembra un telegramma."}`

### MODIFIED: Thai romanization only
- `it.food` “Preferisco la pizza alla pasta” → th
  - before: `{"o": ["ฉันชอบพิซซ่ามากกว่าพาสต้า", "ฉันชอบมากกว่าพิซซ่าพาสต้า", "ฉันมากกว่าชอบพิซซ่าพาสต้า", "ฉันชอบพิซซ่ากว่ามากพาสต้า"], "f": "ฉันชอบพิซซ่ามากกว่าพาสต้า", "r": "« มากกว่า » si mette proprio davanti a quello che superi, tesoro — non vagando come un turista perso al mercato di Chatuchak. Attaccalo `
  - now: `{"o": ["ฉันชอบพิซซ่ามากกว่าพาสต้า", "ฉันชอบมากกว่าพิซซ่าพาสต้า", "ฉันมากกว่าชอบพิซซ่าพาสต้า", "ฉันชอบพิซซ่ากว่ามากพาสต้า"], "f": "ฉันชอบพิซซ่ามากกว่าพาสต้า", "r": "« มากกว่า » si mette proprio davanti a quello che superi, tesoro — non vagando come un turista perso al mercato di Chatuchak. Attaccalo `
- `it.food` “Questo spaghetto è delizioso” → th
  - before: `{"o": ["สปาเกตตี้จานนี้อร่อยมาก", "สปาเกตตี้นี้จานอร่อยมาก", "จานสปาเกตตี้อร่อยนี้มาก", "สปาเกตตี้คนนี้อร่อยมาก"], "f": "สปาเกตตี้จานนี้อร่อยมาก", "r": "Il classificatore « จานนี้ » segue sempre il nome, mai lo precede — come si fa la fila con educazione per il riso glutinoso al mango, senza spinger`
  - now: `{"o": ["สปาเกตตี้จานนี้อร่อยมาก", "สปาเกตตี้นี้จานอร่อยมาก", "จานสปาเกตตี้อร่อยนี้มาก", "สปาเกตตี้คนนี้อร่อยมาก"], "f": "สปาเกตตี้จานนี้อร่อยมาก", "r": "Il classificatore « จานนี้ » segue sempre il nome, mai lo precede — come si fa la fila con educazione per il riso glutinoso al mango, senza spinger`
- `it.food` “Mangio qui da due ore” → th
  - before: `{"o": ["ฉันกินข้าวที่นี่มาสองชั่วโมงแล้ว", "ฉันกินข้าวที่นี่ชั่วโมงสองมาแล้ว", "ฉันกินข้าวที่นี่มาแล้วชั่วโมงสอง", "ฉันที่นี่กินข้าวมาชั่วโมงสองแล้ว"], "f": "ฉันกินข้าวที่นี่มาสองชั่วโมงแล้ว", "r": "« มา...แล้ว » avvolge la durata come un bel pranzo di famiglia che non finisce mai — non spezzare « ส`
  - now: `{"o": ["ฉันกินข้าวที่นี่มาสองชั่วโมงแล้ว", "ฉันกินข้าวที่นี่ชั่วโมงสองมาแล้ว", "ฉันกินข้าวที่นี่มาแล้วชั่วโมงสอง", "ฉันที่นี่กินข้าวมาชั่วโมงสองแล้ว"], "f": "ฉันกินข้าวที่นี่มาสองชั่วโมงแล้ว", "r": "« มา...แล้ว » avvolge la durata come un bel pranzo di famiglia che non finisce mai — non spezzare « ส`
- `it.food` “Prendo due caffè, per favore” → th
  - before: `{"o": ["ขอกาแฟสองแก้วหน่อย", "ขอกาแฟแก้วสองหน่อย", "ขอสองกาแฟแก้วหน่อย", "ขอกาแฟสองตัวหน่อย"], "f": "ขอกาแฟสองแก้วหน่อย", "r": "« สองแก้ว » segue กาแฟ in quest'ordine, con il classificatore giusto — il caffè non è un bufalo d'acqua, lascia « ตัว » agli animali."}`
  - now: `{"o": ["ขอกาแฟสองแก้วหน่อย", "ขอกาแฟแก้วสองหน่อย", "ขอสองกาแฟแก้วหน่อย", "ขอกาแฟสองตัวหน่อย"], "f": "ขอกาแฟสองแก้วหน่อย", "r": "« สองแก้ว » segue กาแฟ in quest'ordine, con il classificatore giusto — il caffè non è un bufalo d'acqua, lascia « ตัว » agli animali."}`

### MODIFIED: correct answer changed (c+f+o+r) — CHECK
- `fr.food` “Le restaurant était bondé.” → en
  - before: `{"o": ["The restaurant was crowded of people.", "The restaurant was crowded by people.", "The restaurant was crowded with people.", "The restaurant was crowded in people."], "f": "The restaurant was crowded with people.", "r": "«Crowded with people» : «crowded» appelle «with». Le restaurant était pl`
  - now: `{"o": ["The restaurant was crowded.", "The restaurant was crowding.", "The restaurant were crowded.", "The restaurant was crowd."], "f": "The restaurant was crowded.", "r": "«Crowded» se suffit à lui-même, mon cher : il veut déjà dire plein de monde. Un seul restaurant : «was»."}`
- `de.food` “Das Restaurant war überfüllt.” → en
  - before: `{"o": ["The restaurant was crowded of people.", "The restaurant was crowded by people.", "The restaurant was crowded with people.", "The restaurant was crowded in people."], "f": "The restaurant was crowded with people.", "r": "«Crowded with people»: «crowded» verlangt «with». Das Restaurant war vol`
  - now: `{"o": ["The restaurant was crowded.", "The restaurant was crowding.", "The restaurant were crowded.", "The restaurant was crowd."], "f": "The restaurant was crowded.", "r": "«Crowded» genügt, mein Lieber: es heißt schon voller Menschen. Ein Restaurant: «was»."}`

### MODIFIED: correct answer changed (c+o+r) — CHECK
- `fr.food` “Le restaurant était bondé.” → de
  - before: `{"o": ["Das Restaurant war voll Menschen von.", "Das Restaurant war überfüllt.", "Das Restaurant war voll mit Mensche.", "Das Restaurant war gefüllt Leute."], "f": "Das Restaurant war überfüllt.", "r": "«Überfüllt von Menschen» : «von» après «überfüllt». Le restaurant était plein, vous êtes à court `
  - now: `{"o": ["Das Restaurant war überfüllt.", "Das Restaurant war überfüllte.", "Das Restaurant hatte überfüllt.", "Das Restaurant überfüllt war."], "f": "Das Restaurant war überfüllt.", "r": "Après «war», l'adjectif ne prend pas de terminaison : «überfüllt». Et le verbe reste en deuxième position, mon ch`

### MODIFIED: correct answer changed (f+o) — CHECK
- `it.food` “Preferisco la pizza alla pasta” → de
  - before: `{"o": ["Ich bevorzuge Pizza als Pasta.", "Ich mag Pizza lieber als Pasta.", "Ich bevorzuge Pizza mehr als Pasta.", "Ich bevorzuge Pizza statt als Pasta."], "f": "Ich mag Pizza lieber als Pasta.", "r": "Per 'preferire a' si dice «gegenüber», caro. 'Als' è per i paragoni, non per i gusti."}`
  - now: `{"o": ["Ich bevorzuge Pizza als Pasta.", "Ich mag Pizza LIEBER als Pasta.", "Ich bevorzuge Pizza mehr als Pasta.", "Ich bevorzuge Pizza statt als Pasta."], "f": "Ich mag Pizza LIEBER als Pasta.", "r": "Per 'preferire a' si dice «gegenüber», caro. 'Als' è per i paragoni, non per i gusti."}`
- `it.travel` “Dov'è localizzato l'hotel?” → fr
  - before: `{"o": ["Où se trouve l'hôtel ?", "Où l'hôtel se trouve ?", "Où est située l'hôtel ?", "Où trouve l'hôtel ?"], "f": "Où se trouve l'hôtel ?", "r": "«Où se trouve l'hôtel ?»: il verbo riflessivo è la via maestra. Gli altri ordini sono vicoli ciechi."}`
  - now: `{"o": ["Où se trouve l'hôtel?", "Où l'hôtel se trouve?", "Où est située l'hôtel?", "Où trouve l'hôtel?"], "f": "Où se trouve l'hôtel?", "r": "«Où se trouve l'hôtel ?»: il verbo riflessivo è la via maestra. Gli altri ordini sono vicoli ciechi."}`
- `it.culture` “Preferisco l'arte moderna a quella classica” → de
  - before: `{"o": ["Ich mag moderne Kunst lieber als klassische.", "Ich bevorzuge moderne Kunst als klassische.", "Ich bevorzuge moderne Kunst von klassischer.", "Ich ziehe moderne Kunst die klassische vor."], "f": "Ich mag moderne Kunst lieber als klassische.", "r": "«Vorziehen» è separabile: «ziehe … vor». Il`
  - now: `{"o": ["Ich mag moderne Kunst LIEBER als klassische Kunst.", "Ich bevorzuge moderne Kunst als klassische.", "Ich bevorzuge moderne Kunst von klassischer.", "Ich ziehe moderne Kunst die klassische vor."], "f": "Ich mag moderne Kunst LIEBER als klassische Kunst.", "r": "«Vorziehen» è separabile: «zieh`
- `en.food` “I prefer pizza to pasta.” → de
  - before: `{"o": ["Ich bevorzuge Pizza als Pasta.", "Ich mag Pizza lieber als Pasta.", "Ich bevorzuge Pizza mehr als Pasta.", "Ich bevorzuge Pizza statt als Pasta."], "f": "Ich mag Pizza lieber als Pasta.", "r": "\"Gegenüber\" is how one prefers a thing in German, my dear sir — \"als\" is reserved for comparis`
  - now: `{"o": ["Ich bevorzuge Pizza als Pasta.", "Ich mag Pizza LIEBER als Pasta.", "Ich bevorzuge Pizza mehr als Pasta.", "Ich bevorzuge Pizza statt als Pasta."], "f": "Ich mag Pizza LIEBER als Pasta.", "r": "\"Gegenüber\" is how one prefers a thing in German, my dear sir — \"als\" is reserved for comparis`

### MODIFIED: correct answer changed (f+o+ph+r) — CHECK
- `fr.food` “Le restaurant était bondé.” → th
  - before: `{"o": ["ร้านอาหารคนแน่นมาก", "ร้านอาหารมากคนแน่น", "คนร้านอาหารแน่นมาก", "ร้านอาหารแน่นมากคน"], "f": "ร้านอาหารคนแน่นมาก", "r": "ร้านอาหาร pose le sujet, คนแน่นมาก commente dessus — inversez l'ordre, et le restaurant paraît moins bondé, plus hanté."}`
  - now: `{"o": ["ร้านอาหารแน่นมาก", "ร้านอาหารมากแน่น", "แน่นร้านอาหารมาก", "ร้านแน่นอาหารมาก"], "f": "ร้านอาหารแน่นมาก", "r": "D'abord le lieu, «ร้านอาหาร», puis «แน่น», et «มาก» à la fin, mon cher."}`
- `de.food` “Das Restaurant war überfüllt.” → th
  - before: `{"o": ["ร้านอาหารคนแน่นมาก", "ร้านอาหารมากคนแน่น", "คนร้านอาหารแน่นมาก", "ร้านอาหารแน่นมากคน"], "f": "ร้านอาหารคนแน่นมาก", "r": "ร้านอาหาร eröffnet das Thema, คนแน่นมาก kommentiert es — vertauschen Sie die Reihenfolge, und das Restaurant wirkt weniger überfüllt, eher heimgesucht."}`
  - now: `{"o": ["ร้านอาหารแน่นมาก", "ร้านอาหารมากแน่น", "แน่นร้านอาหารมาก", "ร้านแน่นอาหารมาก"], "f": "ร้านอาหารแน่นมาก", "r": "Erst der Ort, «ร้านอาหาร», dann «แน่น», und «มาก» am Ende, mein Lieber."}`

### MODIFIED: correct answer changed (f+o+r) — CHECK
- `fr.food` “Le restaurant était bondé.” → it
  - before: `{"o": ["Il ristorante era affollato di gente.", "Il ristorante era affollato da gente.", "Il ristorante era affollato con gente.", "Il ristorante era pieno gente."], "f": "Il ristorante era affollato di gente.", "r": "« Affollato di gente », mon cher — « di », jamais « da » ni « con ». Un restaurant`
  - now: `{"o": ["Il ristorante era affollato.", "Il ristorante era affollata.", "Il ristorante affollato era.", "Il ristorante aveva affollato."], "f": "Il ristorante era affollato.", "r": "«Ristorante» est masculin, mon cher : «affollato». Et «era» se place avant l'adjectif."}`
- `fr.food` “Le restaurant était bondé.” → af
  - before: `{"o": ["Die restaurant was propvol mense.", "Die was restaurant propvol mense.", "Die restaurant was mense propvol.", "restaurant Die was propvol mense."], "f": "Die restaurant was propvol mense.", "r": "\"Propvol\" — littéralement \"plein-de-bouchon\" — est le mot afrikaans merveilleusement imagé p`
  - now: `{"o": ["Die restaurant was propvol.", "Die restaurant was propvolle.", "Die was restaurant propvol.", "Die restaurant het propvol."], "f": "Die restaurant was propvol.", "r": "Après «was», l'adjectif reste simple : «propvol», sans -e. Et le verbe suit directement le sujet, mon cher."}`
- `de.food` “Das Restaurant war überfüllt.” → it
  - before: `{"o": ["Il ristorante era affollato di gente.", "Il ristorante era affollato da gente.", "Il ristorante era affollato con gente.", "Il ristorante era pieno gente."], "f": "Il ristorante era affollato di gente.", "r": "\"Affollato di gente\" — \"di\", mein Lieber, niemals \"da\" oder \"con\". Ein übe`
  - now: `{"o": ["Il ristorante era affollato.", "Il ristorante era affollata.", "Il ristorante affollato era.", "Il ristorante aveva affollato."], "f": "Il ristorante era affollato.", "r": "«Ristorante» ist männlich, mein Lieber: «affollato». Und «era» steht vor dem Adjektiv."}`
- `de.food` “Das Restaurant war überfüllt.” → af
  - before: `{"o": ["Die restaurant was propvol mense.", "Die was restaurant propvol mense.", "Die restaurant was mense propvol.", "restaurant Die was propvol mense."], "f": "Die restaurant was propvol mense.", "r": "\"Propvol\" — wörtlich \"korken-voll\" — ist das herrlich bildhafte afrikaanse Wort für zum Bers`
  - now: `{"o": ["Die restaurant was propvol.", "Die restaurant was propvolle.", "Die was restaurant propvol.", "Die restaurant het propvol."], "f": "Die restaurant was propvol.", "r": "Nach «was» bleibt das Adjektiv einfach: «propvol», ohne -e. Und das Verb folgt direkt dem Subjekt, mein Lieber."}`

### MODIFIED: correct answer changed (f+sf) — CHECK
- `it.travel` “Abbiamo attraversato il confine senza problemi” → en
  - before: `{"o": ["We crossed the border without a problems.", "We crossed the border without any problems.", "We crossed the border with no problem at all.", "Both B and C are correct."], "f": "We crossed the border with no problem at all.", "r": "B e C sono entrambe perfette. Una rara gioia che non cancella `
  - now: `{"o": ["We crossed the border without a problems.", "We crossed the border without any problems.", "We crossed the border with no problem at all.", "Both B and C are correct."], "f": "Both B and C are correct.", "r": "B e C sono entrambe perfette. Una rara gioia che non cancella i tuoi scivoloni."}`
- `it.sports` “Lei pratica yoga ogni mattina” → en
  - before: `{"o": ["She practice yoga every morning.", "She practices yoga every morning.", "She practises yoga every morning.", "Both B and C are correct (UK/US)."], "f": "She practices yoga every morning.", "r": "\"Practices\" e \"practises\" sono entrambe corrette. Una botta di fortuna immensa."}`
  - now: `{"o": ["She practice yoga every morning.", "She practices yoga every morning.", "She practises yoga every morning.", "Both B and C are correct (UK/US)."], "f": "Both B and C are correct (UK/US).", "r": "\"Practices\" e \"practises\" sono entrambe corrette. Una botta di fortuna immensa."}`
- `it.sports` “L'atleta ha battuto il suo record personale” → en
  - before: `{"o": ["The athlete beat his personal record.", "The athlete broke his personal record.", "Both A and B are widely used.", "The athlete won his personal record."], "f": "The athlete broke his personal record.", "r": "Sia \"beat\" che \"broke\" sono correnti. Inaspettato, ma corretto."}`
  - now: `{"o": ["The athlete beat his personal record.", "The athlete broke his personal record.", "Both A and B are widely used.", "The athlete won his personal record."], "f": "Both A and B are widely used.", "r": "Sia \"beat\" che \"broke\" sono correnti. Inaspettato, ma corretto."}`
- `it.sports` “Ho guardato la partita in televisione” → en
  - before: `{"o": ["I watched the match on television.", "I watched the match on TV.", "Both A and B are correct.", "I watched the match in television."], "f": "I watched the match on television.", "r": "'Television' e 'TV' vanno entrambe benissimo. Almeno sui media non hai fallito."}`
  - now: `{"o": ["I watched the match on television.", "I watched the match on TV.", "Both A and B are correct.", "I watched the match in television."], "f": "Both A and B are correct.", "r": "'Television' e 'TV' vanno entrambe benissimo. Almeno sui media non hai fallito."}`

### MODIFIED: options/distractors (ns)
- `it.culture` “Ha letto un libro sulla storia italiana” → en
  - before: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "Le nazionalità si scrivono con la maiuscola! Le basi della civiltà."}`
  - now: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "Le nazionalità si scrivono con la maiuscola! Le basi della civiltà."}`
- `fr.culture` “Elle a lu un livre sur l'histoire italienne” → en
  - before: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "Les nationalités prennent une majuscule : «Italian». Les bases de la civilisation`
  - now: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "Les nationalités prennent une majuscule : «Italian». Les bases de la civilisation`
- `de.culture` “Sie hat ein Buch über die italienische Geschichte gelesen” → en
  - before: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "Nationalitäten werden großgeschrieben: «Italian». Die Grundlagen der Zivilisation`
  - now: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "Nationalitäten werden großgeschrieben: «Italian». Die Grundlagen der Zivilisation`
- `th.culture` “เธออ่านหนังสือเกี่ยวกับประวัติศาสตร์อิตาลี” → en
  - before: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "สัญชาติต้องขึ้นต้นด้วยตัวใหญ่: “Italian” พื้นฐานอารยธรรมนะหนู"}`
  - now: `{"o": ["She read a book about italian history.", "She read a book about Italian history.", "She read a book on italy history.", "She read a book of Italy history."], "f": "She read a book about Italian history.", "r": "สัญชาติต้องขึ้นต้นด้วยตัวใหญ่: “Italian” พื้นฐานอารยธรรมนะหนู"}`

### MODIFIED: options/distractors (o)
- `it.culture` “Abbiamo discusso del film” → en
  - before: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We debated about the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "\"Discuss\" è transitivo, non vuole \"about\". Memorizzalo."}`
  - now: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We discussed of the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "\"Discuss\" è transitivo, non vuole \"about\". Memorizzalo."}`
- `fr.culture` “Nous avons discuté du film.” → en
  - before: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We debated about the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "«Discuss» est transitif : pas de «about». Un détail que je ne manquerai pas de souligner."}`
  - now: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We discussed of the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "«Discuss» est transitif : pas de «about». Un détail que je ne manquerai pas de souligner."}`
- `de.culture` “Wir haben über den Film diskutiert” → en
  - before: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We debated about the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "«Discuss» ist transitiv: kein «about». Ein Detail, das ich gern unterstreiche."}`
  - now: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We discussed of the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "«Discuss» ist transitiv: kein «about». Ein Detail, das ich gern unterstreiche."}`
- `th.culture` “เราคุยกันเรื่องหนัง” → en
  - before: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We debated about the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "“discuss” เป็นกริยาตรง ไม่ต้องมี “about” ป้าขอขีดเส้นใต้หน่อย"}`
  - now: `{"o": ["We discussed about the movie.", "We discussed the movie.", "We discussed of the movie.", "Both A and C are correct."], "f": "We discussed the movie.", "r": "“discuss” เป็นกริยาตรง ไม่ต้องมี “about” ป้าขอขีดเส้นใต้หน่อย"}`

### MODIFIED: options/distractors (o+r)
- `de.food` “Das Restaurant war überfüllt.” → fr
  - before: `{"o": ["Le restaurant était bondé.", "Le restaurant était bondé par des gens.", "Le restaurant était bondé avec des gens.", "Le restaurant était plein gens."], "f": "Le restaurant était bondé.", "r": "Es heißt «bondé de gens», mit «de», nicht «par» oder «avec». Das Lokal war voll, Sie sind leer."}`
  - now: `{"o": ["Le restaurant était bondé.", "Le restaurant était bondée.", "Le restaurant avait bondé.", "Le restaurant bondé était."], "f": "Le restaurant était bondé.", "r": "«Restaurant» ist männlich: «bondé», ohne -e. Und mit «être», nicht «avoir», mein Lieber."}`

### MODIFIED: options/distractors (ph+r)
- `fr.culture` “Ce musée était fantastique” → th
  - before: `{"o": ["พิพิธภัณฑ์นั้นยอดเยี่ยมมาก", "พิพิธภัณฑ์ยอดเยี่ยมนั้นมาก", "นั้นพิพิธภัณฑ์ยอดเยี่ยมมาก", "พิพิธภัณฑ์นั้นมากยอดเยี่ยม"], "f": "พิพิธภัณฑ์นั้นยอดเยี่ยมมาก", "r": "นั้น suit le nom qu'il désigne — les démonstratifs thaïs suivent, ils ne précèdent pas, contrairement à un guide touristique anglai`
  - now: `{"o": ["พิพิธภัณฑ์นั้นยอดเยี่ยมมาก", "พิพิธภัณฑ์ยอดเยี่ยมนั้นมาก", "นั้นพิพิธภัณฑ์ยอดเยี่ยมมาก", "พิพิธภัณฑ์นั้นมากยอดเยี่ยม"], "f": "พิพิธภัณฑ์นั้นยอดเยี่ยมมาก", "r": "นั้น suit le nom qu'il désigne — les démonstratifs thaïs suivent, ils ne précèdent pas, contrairement à un guide touristique anglai`

### RENAMED: French spacing rule (sentence key changed)
- `fr.food` “Tu me passes le poisson ?” → it
  - before: `{"o": ["Mi passi i pesci?", "Mi passi i pesce?", "Mi passi la pesce?", "Mi passi dei pesce?"], "f": "Mi passi i pesci?", "r": "« Il pesce », singulier, cher ami — « i pesce » n'est ni singulier ni pluriel, simplement faux, un poisson échoué entre deux rives grammaticales."}`
  - now: `{"o": ["Mi passi i pesci?", "Mi passi i pesce?", "Mi passi la pesce?", "Mi passi dei pesce?"], "f": "Mi passi i pesci?", "r": "« Il pesce », singulier, cher ami — « i pesce » n'est ni singulier ni pluriel, simplement faux, un poisson échoué entre deux rives grammaticales."}`
- `fr.food` “Tu me passes le poisson ?” → en
  - before: `{"o": ["Can you pass me the fishes?", "Can you pass me the fishs?", "Can you pass me the fish?", "Can you pass me fishies?"], "f": "Can you pass me the fish?", "r": "En anglais, le pluriel de «fish» est «fish». «Fishes» est réservé aux ichtyologues, cher ami."}`
  - now: `{"o": ["Can you pass me the fishes?", "Can you pass me the fishs?", "Can you pass me the fish?", "Can you pass me fishies?"], "f": "Can you pass me the fish?", "r": "En anglais, le pluriel de «fish» est «fish». «Fishes» est réservé aux ichtyologues, cher ami."}`
- `fr.food` “Tu me passes le poisson ?” → de
  - before: `{"o": ["Gibst du mir die Fische?", "Gibst du mir die Fischen?", "Gibst du mir den Fische?", "Gibst du mir die Fisch?"], "f": "Gibst du mir die Fische?", "r": "«Die Fische» au pluriel, avec le bon article. Un seul poisson ne fait pas un banquet."}`
  - now: `{"o": ["Gibst du mir die Fische?", "Gibst du mir die Fischen?", "Gibst du mir den Fische?", "Gibst du mir die Fisch?"], "f": "Gibst du mir die Fische?", "r": "«Die Fische» au pluriel, avec le bon article. Un seul poisson ne fait pas un banquet."}`
- `fr.food` “Tu me passes le poisson ?” → af
  - before: `{"o": ["Kan jy vir my die vis aangee?", "Kan vir jy my die vis aangee?", "Kan jy vir my die aangee vis?", "jy Kan vir my die vis aangee?"], "f": "Kan jy vir my die vis aangee?", "r": "\"Vir my\" marque le destinataire — à moi — et \"aangee\" est un seul mot, un verbe composé pour \"passer/tendre\". `
  - now: `{"o": ["Kan jy vir my die vis aangee?", "Kan vir jy my die vis aangee?", "Kan jy vir my die aangee vis?", "jy Kan vir my die vis aangee?"], "f": "Kan jy vir my die vis aangee?", "r": "\"Vir my\" marque le destinataire — à moi — et \"aangee\" est un seul mot, un verbe composé pour \"passer/tendre\". `

### RENAMED: French spacing rule (sentence key changed) + other changes
- `fr.food` “Tu me passes le poisson ?” → th
  - before: `{"o": ["ช่วยส่งปลาให้ฉันหน่อยได้ไหม", "ช่วยส่งให้ปลาฉันหน่อยได้ไหม", "ช่วยปลาส่งให้ฉันหน่อยได้ไหม", "ช่วยส่งให้ฉันหน่อยปลาได้ไหม"], "f": "ช่วยส่งปลาให้ฉันหน่อยได้ไหม", "r": "ปลา suit ส่ง directement — le poisson n'attend pas poliment derrière « ให้ฉัน », comme s'il faisait la queue pour le BTS à l'h`
  - now: `{"o": ["ช่วยส่งปลาให้ฉันหน่อยได้ไหม", "ช่วยส่งให้ปลาฉันหน่อยได้ไหม", "ช่วยปลาส่งให้ฉันหน่อยได้ไหม", "ช่วยส่งให้ฉันหน่อยปลาได้ไหม"], "f": "ช่วยส่งปลาให้ฉันหน่อยได้ไหม", "r": "ปลา suit ส่ง directement — le poisson n'attend pas poliment derrière « ให้ฉัน », comme s'il faisait la queue pour le BTS à l'h`
- `fr.food` “Avez-vous du pain sans gluten ?” → th
  - before: `{"o": ["มีขนมปังปลอดกลูเตนไหม", "มีปลอดขนมปังกลูเตนไหม", "มีขนมปังกลูเตนปลอดไหม", "ไหมมีขนมปังปลอดกลูเตน"], "f": "มีขนมปังปลอดกลูเตนไหม", "r": "ไหม clôt toujours la question — placez-le en tête, et vous semblez accuser la boulangerie de quelque chose, plutôt que de demander poliment."}`
  - now: `{"o": ["มีขนมปังปลอดกลูเตนไหม", "มีปลอดขนมปังกลูเตนไหม", "มีขนมปังกลูเตนปลอดไหม", "ไหมมีขนมปังปลอดกลูเตน"], "f": "มีขนมปังปลอดกลูเตนไหม", "r": "ไหม clôt toujours la question — placez-le en tête, et vous semblez accuser la boulangerie de quelque chose, plutôt que de demander poliment."}`
- `fr.travel` “Où se trouve l'hôtel ?” → th
  - before: `{"o": ["โรงแรมอยู่ที่ไหน", "โรงแรมที่ไหนอยู่", "ที่ไหนอยู่โรงแรม", "โรงแรมอยู่ไหนที่"], "f": "โรงแรมอยู่ที่ไหน", "r": "Le mot interrogatif « ที่ไหน » patiente sagement à la fin, nulle inversion requise — le thaï n'a pas, comme l'Angleterre, cette manie de faire marcher le verbe en tête tel un garde `
  - now: `{"o": ["โรงแรมอยู่ที่ไหน", "โรงแรมที่ไหนอยู่", "ที่ไหนอยู่โรงแรม", "โรงแรมอยู่ไหนที่"], "f": "โรงแรมอยู่ที่ไหน", "r": "Le mot interrogatif « ที่ไหน » patiente sagement à la fin, nulle inversion requise — le thaï n'a pas, comme l'Angleterre, cette manie de faire marcher le verbe en tête tel un garde `
- `fr.travel` “Peux-tu me donner quelques conseils ?” → th
  - before: `{"o": ["ช่วยให้คำแนะนำหน่อยได้ไหม", "ช่วยให้แนะนำคำหน่อยได้ไหม", "ช่วยคำแนะนำให้หน่อยได้ไหม", "ให้ช่วยคำแนะนำหน่อยได้ไหม"], "f": "ช่วยให้คำแนะนำหน่อยได้ไหม", "r": "« หน่อย » adoucit la demande juste avant que « ได้ไหม » ne la scelle poliment — sans cet ordre, vous sonnez moins en voyage, plus en tra`
  - now: `{"o": ["ช่วยให้คำแนะนำหน่อยได้ไหม", "ช่วยให้แนะนำคำหน่อยได้ไหม", "ช่วยคำแนะนำให้หน่อยได้ไหม", "ให้ช่วยคำแนะนำหน่อยได้ไหม"], "f": "ช่วยให้คำแนะนำหน่อยได้ไหม", "r": "« หน่อย » adoucit la demande juste avant que « ได้ไหม » ne la scelle poliment — sans cet ordre, vous sonnez moins en voyage, plus en tra`
