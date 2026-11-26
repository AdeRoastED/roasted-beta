/* RoastED automated browser test suite (Playwright + Chrome/Chromium).
   Usage:  node tests/run_all.js <distDir> [--quick] [--out docs]
     distDir must contain normal/ and qa/ (output of tools/build.py).
   Every test records PASS / FAIL / SKIP with details. Nothing here needs network access.
   Real phones, real voices, real microphones and screen readers are NOT covered — see docs/TESTING_LIMITATIONS. */
const {chromium,devices}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path'),os=require('os');
const args=process.argv.slice(2);const DIST=path.resolve(args.find(a=>!a.startsWith('--'))||path.join(__dirname,'..','dist'));
const QUICK=args.includes('--quick');const OUT=(()=>{const i=args.indexOf('--out');return i>=0?path.resolve(args[i+1]):path.join(__dirname,'..','docs')})();
const CHROME=process.env.CHROME||['/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser'].find(p=>fs.existsSync(p));
const L=['it','en','fr','de','th','af'];
/* ---------- static server (serves DIST; ROOT can be swapped to simulate a new deployment) ---------- */
const MIME={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.webmanifest':'application/manifest+json'};
let ROOT=DIST,BLOCK=null;
const srv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(BLOCK&&BLOCK.test(u)){r.socket.destroy();return}if(u.endsWith('/'))u+='index.html';const f=path.join(ROOT,u);
 if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);r.end('nf');return}r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream','Cache-Control':'max-age=600'});fs.createReadStream(f).pipe(r)});
const PORT=8899,BASE=`http://localhost:${PORT}`;
/* ---------- tiny test framework ---------- */
const results=[];let browser;
async function test(id,name,fn,opt={}){if(QUICK&&opt.slow){results.push({id,name,status:'SKIP',details:'skipped in --quick mode'});console.log('SKIP',id,name);return}
 const t0=Date.now();try{const d=await fn();results.push({id,name,status:'PASS',details:d,ms:Date.now()-t0});console.log('PASS',id,name,((Date.now()-t0)/1000).toFixed(1)+'s')}
 catch(e){results.push({id,name,status:'FAIL',details:String(e&&e.message||e).slice(0,1500),ms:Date.now()-t0});console.log('FAIL',id,name,'\n   ',String(e&&e.message||e).slice(0,400))}}
const ok=(c,m)=>{if(!c)throw new Error(m)};
async function ctxNew(o={}){return browser.newContext(Object.assign({viewport:{width:390,height:844},acceptDownloads:true},o))}
async function open(ctx,kind,o={}){const p=await ctx.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));p.on('dialog',d=>d.accept());await p.route(/googleapis|gstatic/,r=>r.abort());
 if(o.init)await p.addInitScript(o.init);await p.goto(`${BASE}/${kind}/`);await p.waitForFunction(()=>typeof S!=='undefined'&&typeof loadData==='function',null,{timeout:15000});await p.waitForTimeout(o.wait||600);return p}
const HELP=()=>{window.__pick=(want)=>{const b=[...document.querySelectorAll('#opts button')].find(x=>(x.childNodes[0].textContent||'').replace(/^[A-D]\.\s/,'')===want);if(!b)throw new Error('option not found: '+want);b.click()};
 window.__playAll=(wrongFirst)=>{const n=S.qs.length;for(let i=0;i<n;i++){const q=S.qs[S.i];__pick(i===0&&wrongFirst?q.o.find((x,j)=>j!==q.c):q.o[q.c]);$('nextBtn').click()}};
 window.__pair=async(n,t)=>{if(window.MONET_CFG&&!window.__keepMon)MONET_CFG.enabled=false;S.n=n;S.t=t;await loadData(n);await loadData(t);try{labels()}catch(e){}}};
const noErr=p=>ok(!p.errs.length,'page errors: '+p.errs.slice(0,3).join(' | '));
(async()=>{
srv.listen(PORT);browser=await chromium.launch({executablePath:CHROME});
console.log('RoastED tests · dist',DIST,QUICK?'(quick)':'');
/* ===== builds ===== */
await test('B1','Normal build: opens on the first page, no QA tools inside',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(()=>({screen:S.screen,kind:APP.kind,build:BUILD,qa:!!document.querySelector('.qa-fab,.qa-ribbon,script[src="qa.js"]'),openQA:typeof openQAPanel,monet:MONET_CFG.enabled,lock:LOCK_LEVELS}));
 const files=fs.readdirSync(path.join(DIST,'normal'));await c.close();ok(r.screen==='Welcome','screen '+r.screen);ok(!r.qa&&r.openQA==='undefined','QA code present');ok(!files.includes('qa.js')&&!files.includes('tools'),'dev files present');ok(!r.monet,'monetization on in normal');noErr(p);return r});
await test('B2','QA build: QA tools present, separate storage and cache names',async()=>{const c=await ctxNew(),p=await open(c,'qa');
 const r=await p.evaluate(()=>({kind:APP.kind,store:APP.store,cache:APP.cache,fab:!!document.querySelector('.qa-fab'),lock:LOCK_LEVELS,monet:MONET_CFG.enabled}));await c.close();
 ok(r.kind==='qa'&&r.store==='roastedqa'&&r.fab&&!r.lock,'qa config wrong '+JSON.stringify(r));noErr(p);return r});
await test('W1','"What\'s new" pop-up after an update: shown once, in the user\'s language (all 6), never to first-time users',async()=>{const c=await ctxNew(),out={};
 for(const l of ['it','en','fr','de','th','af']){const p=await open(c,'normal');await p.evaluate(l=>{localStorage.setItem('roasted_native',l);localStorage.setItem('roasted_target',l==='en'?'it':'en');localStorage.setItem('roasted_ver','1.7')},l);
  await p.reload();await p.waitForFunction(()=>typeof S!=='undefined');await p.waitForTimeout(1200);out[l]=await p.evaluate(()=>({shown:$('whatsNewOverlay').style.display,title:document.querySelector('#whatsNewOverlay .whatsnew-head span').textContent,first:($('whatsNewBody').firstChild||{}).textContent,ver:localStorage.getItem('roasted_ver')}));
  await p.evaluate(()=>$('whatsNewOk').click());await p.reload();await p.waitForFunction(()=>typeof S!=='undefined');await p.waitForTimeout(800);out[l].again=await p.evaluate(()=>$('whatsNewOverlay').style.display);await p.close()}
 const p=await open(c,'normal');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForFunction(()=>typeof S!=='undefined');await p.waitForTimeout(800);const fresh=await p.evaluate(()=>$('whatsNewOverlay').style.display);await c.close();
 for(const l in out)ok(out[l].shown==='block'&&out[l].again!=='block'&&out[l].first&&!/\{l\d\}/.test(out[l].first)&&!/\(1, 2, 3\)|\(1 2 3\)/.test(out[l].first),'whats new '+l+JSON.stringify(out[l]));ok(new Set(Object.values(out).map(x=>x.title)).size===6,'titles not translated');ok(fresh!=='block','shown to first-time user');return out});
/* ===== whole content, every pair (QA build: everything unlocked) ===== */
await test('C1','All 30 language pairs × every topic × every level: play to the end (1 wrong + rest correct)',async()=>{const c=await ctxNew(),p=await open(c,'qa',{init:HELP});
 const r=await p.evaluate(async()=>{const out=[];let runs=0,qs=0;const L=['it','en','fr','de','th','af'];
  for(const n of L)for(const t of L){if(n===t)continue;await __pair(n,t);
   for(let lv=1;lv<=3;lv++){S.lvl=lv;for(const tp of curOrder()){if(tp==='num')continue;S.topic=tp;S.boss=0;S.review=0;S.duel=null;start();const N=S.qs.length;if(!N){out.push('empty '+n+t+tp+lv);continue}
     for(let i=0;i<N;i++){const q=S.qs[S.i];if(q.o[q.c]!==q.f&&!q.sf)out.push('key '+n+t+tp+lv);__pick(i===0?q.o.find((x,j)=>j!==q.c):q.o[q.c]);const fb=$('fb').textContent;if(/undefined|\{[a-z]+\}|NaN/.test(fb))out.push('fb '+n+t+tp+lv+': '+fb.slice(0,60));qs++;$('nextBtn').click()}
     if(!/📊|🔁|%/.test($('qbox').textContent))out.push('nofinish '+n+t+tp+lv);runs++}}}
  return {runs,qs,out:out.slice(0,20),nout:out.length}});await c.close();ok(!r.nout,JSON.stringify(r.out));noErr(p);return r},{slow:true});
await test('C2','Number sets: every pair, every number group (0 → 2 billion)',async()=>{const c=await ctxNew(),p=await open(c,'qa',{init:HELP});
 const r=await p.evaluate(async()=>{const out=[];let sets=0;for(const n of ['it','en','fr','de','th','af'])for(const t of ['it','en','fr','de','th','af']){if(n===t)continue;await __pair(n,t);
  for(let i=0;i<NUM_DECADES.length;i++){startNumSet(i);if(t==='th'&&!S.qs.every(q=>q.ph))out.push('noph '+n+i);__playAll(false);if(!$('qbox').textContent.includes('🔢'))out.push('nofinish '+n+t+i);sets++}}return {sets,out}});
 await c.close();ok(!r.out.length,JSON.stringify(r.out.slice(0,10)));noErr(p);return r},{slow:true});
await test('C3','Conversations: all 24 scenes × 30 pairs, every reply type, stars saved',async()=>{const c=await ctxNew(),p=await open(c,'qa');
 const r=await p.evaluate(async()=>{const out=[];let plays=0;await ensureScenes();for(const n of ['it','en','fr','de','th','af'])for(const t of ['it','en','fr','de','th','af']){if(n===t)continue;S.n=n;S.t=t;await loadData(n);await loadData(t);
  for(let k=0;k<SCENES.length;k++){startScene(k);for(let s=0;s<6;s++){const bs=[...document.querySelectorAll('#sceneReplies .reply')];if(bs.length<3){out.push('replies '+n+t+k+s);break}bs[(s+k)%3].click();const nx=document.querySelector('#sceneReplies .reply.next');if(!nx){out.push('next '+n+t+k+s);break}nx.click()}
   if($('sceneEnd').style.display==='none')out.push('noend '+n+t+SCENES[k].id);plays++}}return {plays,out:out.slice(0,10)}});await c.close();ok(!r.out.length,JSON.stringify(r.out));noErr(p);return r},{slow:true});
await test('C4','Vocabulary word lists: present, filled, Thai romanization, listen buttons',async()=>{const c=await ctxNew(),p=await open(c,'qa',{init:HELP});
 const r=await p.evaluate(async()=>{const out=[];let lists=0;for(const n of ['it','en','fr','de','th','af'])for(const t of ['it','en','fr','de','th','af']){if(n===t)continue;await __pair(n,t);
  for(const tp of ['food','travel','sports','culture','dailylife','greet','adj','basic'])for(const lv of [1,2,3]){S.lvl=lv;S.topic=tp;S.boss=0;S.review=0;start();const rows=[...$('wordList').querySelectorAll('.wrow')];
   if(rows.length<3&&curOrder().includes(tp))out.push('few '+n+t+tp+lv);if(rows.some(x=>!x.querySelector('button')))out.push('nolisten '+n+t+tp);if(t==='th'&&rows.length&&!rows[0].querySelector('.rom'))out.push('norom '+n+tp);lists++}}return {lists,out:out.slice(0,10)}});
 await c.close();ok(r.lists===720,'lists '+r.lists);ok(!r.out.length,JSON.stringify(r.out));noErr(p);return r},{slow:true});
await test('C5','Text tables complete in all 6 languages (trophies, reports, challenge, monetization, mic, review)',async()=>{const c=await ctxNew(),p=await open(c,'qa');
 const r=await p.evaluate(async()=>{for(const l of ['it','en','fr','de','th','af'])await loadData(l);const tabs={MOT,TRD,DU,MIC_SHORT,RV_EMPTY,X,L2};const out=[];const keys=o=>o&&typeof o==='object'?Object.keys(o).sort().join(','):'';
  for(const k in SYSM)for(const l of ['it','en','fr','de','th','af'])if(!SYSM[k][l])out.push('SYSM '+k+' '+l);for(const [nm,t] of Object.entries(tabs))for(const l of ['it','en','fr','de','th','af']){if(!(l in t)){out.push(nm+' missing '+l);continue}if(typeof t.en==='object'&&keys(t[l])!==keys(t.en))out.push(nm+' keys differ '+l)}return out});
 await c.close();ok(!r.length,JSON.stringify(r));return 'all tables complete'});
/* ===== learning logic (normal build) ===== */
await test('L1','Progression: next level locked until 60% on the previous level (normal build)',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const r=await p.evaluate(async()=>{await __pair('en','it');localStorage.removeItem('roasted');S.lvl=2;openTopic('food');const redirected=S.lvl;S.lvl=1;openTopic('food');const N=S.qs.length;
  for(let i=0;i<N;i++){const q=S.qs[S.i];__pick(i<5?q.o.find((x,j)=>j!==q.c):q.o[q.c]);$('nextBtn').click()}const s50=lstars('food',1);
  S.lvl=1;openTopic('food');for(let i=0;i<S.qs.length;i++){const q=S.qs[S.i];__pick(i<3?q.o.find((x,j)=>j!==q.c):q.o[q.c]);$('nextBtn').click()}S.lvl=2;openTopic('food');return {redirected,s50,after70:S.lvl}});
 await c.close();ok(r.redirected===1,'level 2 opened without level 1: '+JSON.stringify(r));ok(r.after70===2,'level 2 not opened after 70%: '+JSON.stringify(r));noErr(p);return r});
await test('L2','Scoring, stars, best score and results screen',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const r=await p.evaluate(async()=>{await __pair('it','en');localStorage.removeItem('roasted');S.lvl=1;openTopic('greet');__playAll(false);const perfect={stars:lstars('greet',1),txt:$('qbox').textContent.slice(0,80)};
  openTopic('greet');const N=S.qs.length;for(let i=0;i<N;i++){const q=S.qs[S.i];__pick(i<N?q.o.find((x,j)=>j!==q.c):q.o[q.c]);$('nextBtn').click()}return {perfect,zeroStarsKept:lstars('greet',1),lessons:$('lessonsLink').style.display}});
 await c.close();ok(r.perfect.stars===3,'perfect run not 3 stars');ok(r.zeroStarsKept===3,'best score overwritten by worse run');ok(r.lessons==='block','lessons link not on results');noErr(p);return r});
await test('L3','Undo (go back to correct) removes the mistake; lessons link never shown during a quiz',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const r=await p.evaluate(async()=>{await __pair('en','it');S.lvl=1;openTopic('greet');let q=S.qs[0];__pick(q.o.find((x,j)=>j!==q.c));const undo=$('undoBtn').style.display;$('undoBtn').click();q=S.qs[0];__pick(q.o[q.c]);
  return {undo,wrong:S.wrong.length,lessonsDuringQuiz:$('lessonsLink').style.display}});await c.close();ok(r.undo==='block'&&r.wrong===0,JSON.stringify(r));ok(r.lessonsDuringQuiz!=='block','lessons link during quiz');noErr(p);return r});
await test('L4','Torture Bench: correct fix accepted, wrong fix roasted, hints limited per day',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(async()=>{S.n='en';S.t='it';await loadData('en');await loadData('it');S.topic='food';S.lvl=1;S.benchAll=1;nav('Bench');bench();const a=S.bi.a;$('fixIn').value=a;$('fixBtn').click();const good=$('fixOut').classList.contains('ok');
  bench();$('fixIn').value='qwerty nonsense';$('fixBtn').click();const bad=$('fixOut').textContent.length>5&&!$('fixOut').classList.contains('ok');
  localStorage.removeItem('roasted_hints');let used=0;for(let i=0;i<8;i++){bench();const hb=$('hintBtn');if(hb.style.display==='none')continue;if(hintState().n>0){hb.click();used++}}return {good,bad,used,left:hintState().n}});
 await c.close();ok(r.good&&r.bad,'bench check failed '+JSON.stringify(r));ok(r.used<=5&&r.left===0,'hint limit '+JSON.stringify(r));noErr(p);return r});
await test('L5','Review My Mistakes: collects mistakes from all topic types; "Again" repeats the review',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const r=await p.evaluate(async()=>{await __pair('en','it');localStorage.removeItem('roasted');S.lvl=1;for(const tp of ['food','greet','pres']){openTopic(tp);__playAll(true)}startNumSet(0);__playAll(true);
  startReview();const tps=[...new Set(S.qs.map(q=>q.tp))].sort();__playAll(true);$('nextBtn').click();return {tps,again:S.review===1&&S.revMis===1}});
 await c.close();ok(r.tps.length>=4&&r.again,JSON.stringify(r));noErr(p);return r});
await test('L6','Streaks, streak freeze, comeback, daily goal, early/night trophies (Bangkok time 01:00)',async()=>{const c=await ctxNew({timezoneId:'Asia/Bangkok'}),p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await p.route(/googleapis|gstatic/,r=>r.abort());
 await p.addInitScript(()=>{const real=Date.now.bind(Date),off=new Date('2026-11-23T01:00:00+07:00').getTime()-real();Date.now=()=>real()+off;const RD=Date;window.Date=class extends RD{constructor(...a){a.length?super(...a):super(RD.now())}static now(){return RD.now()}}});await p.addInitScript(HELP);
 await p.goto(`${BASE}/normal/`);await p.waitForFunction(()=>typeof S!=='undefined');await p.waitForTimeout(500);
 const r=await p.evaluate(async()=>{await __pair('en','it');const o={day0:day(0)};let d=load();d.st={last:day(2),n:5};delete d.freeze;save(d);o.shown=streakNow(load());S.lvl=1;openTopic('greet');__playAll(false);d=load();o.after=d.st.n;o.freeze=!!d.freeze;o.goal=d.goal.n;o.early=d.badges.includes('early');
  d.st={last:day(10),n:3};save(d);openTopic('greet');__playAll(false);o.comeback=load().badges.includes('comeback');return o});
 await c.close();ok(r.day0==='2026-11-23','local date wrong '+r.day0);ok(r.shown===5&&r.after===6&&r.freeze,'freeze '+JSON.stringify(r));ok(r.comeback&&r.early,'trophies '+JSON.stringify(r));noErr(p);return r});
await test('L7','Pronunciation score: word order and repeated words count',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(()=>{S.t='en';S.readTarget='I like cats';const a=scoreReading('cats like I').pct,b=scoreReading('I like cats').pct;S.readTarget='I really really like it';const d=scoreReading('I really like it').pct;return {a,b,d}});
 await c.close();ok(r.a<100&&r.b===100&&r.d<100,JSON.stringify(r));return r});
await test('L8','Challenge a friend: 10 timed questions, link, friend plays the same questions in own pair, image card',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const r=await p.evaluate(async()=>{await __pair('en','it');localStorage.setItem('roasted_name','Tester');startDuel2({tp:'food',lv:1,idx:duelIdx('food',1)});__playAll(false);const link=duelLink();const pl=JSON.parse(decodeURIComponent(atob(link.split('#duel=')[1])));
  const blob=await duelCard();localStorage.setItem('roasted_native','fr');localStorage.setItem('roasted_target','de');pl.nm='A';startDuel(pl);await new Promise(r=>setTimeout(r,1200));const pair=S.n+S.t;document.querySelector('#duelPop .btn-roasted').click();const same=JSON.stringify(S.duel.idx)===JSON.stringify(pl.idx);__playAll(false);
  return {n:pl.idx.length,pair,same,card:blob&&blob.size,verdict:$('qbox').textContent.slice(0,80)}});
 await c.close();ok(r.n===10&&r.pair==='frde'&&r.same&&r.card>10000,JSON.stringify(r));noErr(p);return r});
await test('L9','Trophies page, calendar, roast level and daily goal render in all 6 languages',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(async()=>{const o={};for(const n of ['it','en','fr','de','th','af']){S.n=n;S.t=n==='en'?'it':'en';await loadData(n);labels();nav('Trophies');o[n]={t:document.querySelectorAll('#trophyGrid .trophy').length,cells:document.querySelectorAll('.cal-d').length,ring:!!document.querySelector('.ring')};
  document.querySelectorAll('#trophyGrid .trophy')[1].click();o[n].pop=$('trPop').style.display;$('trPop').style.display='none'}return o});
 await c.close();for(const n in r)ok(r[n].t>=20&&r[n].cells>=28&&r[n].ring&&r[n].pop==='block','trophies '+n+JSON.stringify(r[n]));noErr(p);return r});
/* ===== data safety ===== */
await test('D1','Backup export → import round trip; incomplete or broken files rejected',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const raw=await p.evaluate(async()=>{await __pair('en','it');S.lvl=1;openTopic('greet');__playAll(false);return localStorage.getItem('roasted')});
 const f=path.join(os.tmpdir(),'roasted-backup-test.json');fs.writeFileSync(f,raw);
 const r1=await p.evaluate(()=>({inc:validateBackupShape({lv:{}}),bad:validateBackupShape({st:{last:5}}),good:validateBackupShape(load())}));
 await p.evaluate(()=>localStorage.setItem('roasted','{"best":{},"st":{},"lv":{},"mis":{}}'));await p.setInputFiles('#importFile',f);await p.waitForTimeout(1500);
 const raw2=await p.evaluate(()=>localStorage.getItem('roasted')),prev=await p.evaluate(()=>!!localStorage.getItem('roasted_backup_before_import'));await c.close();
 ok(r1.inc&&r1.bad&&r1.good===null,'validation '+JSON.stringify(r1));ok(raw2===raw,'round trip differs');ok(prev,'no safety copy before import');return {roundTrip:true,safetyCopy:prev,rejected:[r1.inc,r1.bad]}});
await test('D2','Saved preferences: language pair and progress survive reload; app always reopens on the first page',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 await p.evaluate(async()=>{localStorage.setItem('roasted_native','de');localStorage.setItem('roasted_target','fr');await __pair('de','fr');S.lvl=1;openTopic('greet');__playAll(false)});await p.reload();await p.waitForFunction(()=>typeof S!=='undefined');await p.waitForTimeout(800);
 const r=await p.evaluate(()=>({screen:S.screen,nat:localStorage.getItem('roasted_native'),tgt:localStorage.getItem('roasted_target'),stars:Object.keys(load().lv).length}));await c.close();
 ok(r.screen==='Welcome','did not reopen on first page: '+r.screen);ok(r.nat==='de'&&r.tgt==='fr'&&r.stars>0,JSON.stringify(r));return r});
await test('D3','Old progress from v36 still loads (compatibility)',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(()=>{localStorage.setItem('roasted',JSON.stringify({best:{enitgreet:90},st:{last:day(1),n:4},lv:{enitgreet1:3,enitfood1:2},mis:{enit:['x']},badges:['streak3'],totalRuns:12,log:[day(1)]}));const d=load();S.n='en';S.t='it';return {stars:d.lv.enitgreet1,badges:d.badges,runs:d.totalRuns,streak:streakNow(d)}});
 await c.close();ok(r.stars===3&&r.badges[0]==='streak3'&&r.runs===12&&r.streak===4,JSON.stringify(r));return r});
/* ===== reporting ===== */
await test('R1','Question report: stable ID, pair, topic, level, shown options, expected answer, version; saved, listed, exported, survives reload',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 await p.evaluate(async()=>{localStorage.removeItem('roasted_reports');await __pair('th','fr');S.lvl=1;openTopic('food');const q=S.qs[0];__pick(q.o.find((x,j)=>j!==q.c));$('repBtn').click();document.querySelectorAll('#repPop .dp-t')[1].click();document.querySelector('#repPop textarea').value='test comment';[...document.querySelectorAll('#repPop .btn-roasted')].pop().click()});
 await p.reload();await p.waitForFunction(()=>typeof S!=='undefined');await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{const a=RoastedReports.load();nav('Settings');return {n:a.length,r:a[0],btn:$('sReports').textContent}});
 const dl=p.waitForEvent('download',{timeout:5000});await p.evaluate(()=>{openReportList();[...document.querySelectorAll('#repPop .btn-roasted')][0].click()});const d=await dl;const fpath=await d.path();const exp=JSON.parse(fs.readFileSync(fpath,'utf8'));
 await c.close();const x=r.r;ok(r.n===1&&/^food-\d+$/.test(x.qid)&&x.sig&&x.native==='th'&&x.target==='fr'&&x.topic==='food'&&x.level==='1'&&x.options.length===4&&x.expected&&x.version&&x.comment==='test comment'&&x.chosen,'report fields '+JSON.stringify(x));
 ok(exp.reports.length===1,'export');ok(!/@|ip|userAgent/i.test(JSON.stringify(Object.keys(x))),'personal data field');return {report:x,exported:d.suggestedFilename()}});
await test('R2','Reports from Torture Bench and conversations',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(async()=>{localStorage.removeItem('roasted_reports');S.n='en';S.t='it';await loadData('en');await loadData('it');S.topic='food';S.lvl=1;S.benchAll=1;nav('Bench');bench();openReport('bench');[...document.querySelectorAll('#repPop .btn-roasted')].pop().click();
  await ensureScenes();startScene(0);openReport('scene');[...document.querySelectorAll('#repPop .btn-roasted')].pop().click();return RoastedReports.load().map(x=>x.area+':'+x.qid)});
 await c.close();ok(r.length===2&&r[0].startsWith('torture-bench')&&r[1].startsWith('conversation:scene-'),JSON.stringify(r));noErr(p);return r});
await test('X1','Security: hostile challenge links are rejected or neutralised (bad language codes, HTML in names, huge lists)',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(async()=>{const enc=o=>btoa(encodeURIComponent(JSON.stringify(o)));const res={};
  res.badLang=cleanDuel({v:2,n:'../../evil',t:'it',tp:'food',lv:1,idx:[1],sc:1,tm:5});res.html=cleanDuel({v:2,n:'en',t:'it',tp:'food',lv:1,idx:[1,2],sc:1,tm:5,nm:'<img src=x onerror=alert(1)>'});
  res.huge=cleanDuel({v:2,n:'en',t:'it',tp:'food',lv:1,idx:Array(500).fill(1),sc:1,tm:5});res.badTopic=cleanDuel({v:2,n:'en',t:'it',tp:'__proto__',lv:1,idx:[1],sc:1,tm:5});
  let threw=false;try{await loadData('../x')}catch(e){threw=true}res.loadBlocked=threw;return res});await c.close();
 ok(r.badLang===null&&r.huge===null&&r.badTopic===null&&r.loadBlocked,'not rejected '+JSON.stringify(r));ok(!/[<>]/.test(r.html.nm),'HTML kept in name');return r});
/* ===== QA mode + monetization ===== */
await test('Q1','QA panel: any pair / topic / level / single question; IDs shown; progress kept separate from the normal app',async()=>{const c=await ctxNew(),p0=await open(c,'normal');await p0.evaluate(()=>{localStorage.setItem('roasted','{"best":{},"st":{},"lv":{"enitfood1":3},"mis":{}}')});
 const p=await open(c,'qa');const r=await p.evaluate(async()=>{localStorage.setItem('roastedqa_qa_st',JSON.stringify({n:'af',t:'th',tp:'past',lv:3}));openQAPanel();await new Promise(r=>setTimeout(r,1500));const items=document.querySelectorAll('#qaPop .qa-q').length;
  document.querySelectorAll('#qaPop .qa-q')[4].click();const o={items,pair:S.n+S.t,topic:S.topic,qs:S.qs.length,info:($('qaInfo')||{}).textContent};
  o.qaKeys=Object.keys(localStorage).filter(k=>k.startsWith('roastedqa')).length;o.normalLv=JSON.parse(localStorage.getItem('roasted')).lv;return o});
 await c.close();ok(r.items>0&&r.pair==='afth'&&r.topic==='past'&&/ID past-\d+/.test(r.info),JSON.stringify(r));ok(r.normalLv.enitfood1===3,'normal progress touched');return r});
await test('Q2','Monetization simulation (QA): locked level → simulated purchase; 3 corrections/day + ad refill; 3 hints/day + ad; ad after 10 questions; Premium removes limits',async()=>{const c=await ctxNew(),p=await open(c,'qa',{init:HELP});
 const r=await p.evaluate(async()=>{const o={};window.__keepMon=1;await __pair('en','it');MONET.resetAll();MONET_CFG.enabled=true;const clickBtn=(sel,txt)=>{const b=[...document.querySelectorAll(sel+' button')].find(x=>x.textContent.includes(txt));if(!b)throw new Error('no button '+txt+' in '+sel);b.click()};
  S.topic='food';S.lvl=3;S.boss=0;S.review=0;start();o.offer=$('monPop').style.display;clickBtn('#monPop','🔓');o.buyDlg=$('qaBuy').style.display;clickBtn('#qaBuy','successful');o.unlocked=MONET.canAccess('food',3)||MONET.ent().allLevels;
  MONET.resetAll();MONET.resetDaily();S.topic='greet';S.lvl=1;start();let used=0;for(let k=0;k<3;k++){const q=S.qs[S.i];__pick(q.o.find((x,j)=>j!==q.c));if($('undoBtn').style.display==='block'){$('undoBtn').click();used++}}
  const q=S.qs[S.i];__pick(q.o.find((x,j)=>j!==q.c));o.undoUsed=used;o.undoAfter3=$('undoBtn').style.display;o.adBtn=($('undoAd')||{}).style?$('undoAd').style.display:'none';
  const d=MONET.daily();d.q=10;d.allow=10;localStorage.setItem('roastedqa_mon',JSON.stringify(d));$('nextBtn').click();o.contDlg=$('monPop').style.display&&$('monPop').textContent.includes('10');
  $('monPop').style.display='none';MONET.resetDaily();S.topic='food';S.lvl=1;S.benchAll=1;nav('Bench');let hints=0;for(let k=0;k<6;k++){bench();const hb=$('hintBtn');if(hb.style.display==='none')continue;const before=MONET.daily().hints;hb.click();if(MONET.daily().hints<before)hints++}
  o.hintsFree=hints;o.hintAdDlg=$('monPop').style.display==='block'&&$('monPop').textContent.includes('🎬');
  MONET.grant('lifetime');o.premiumAccess=MONET.canAccess('food',3);return o});
 await c.close();ok(r.offer==='block'&&r.buyDlg==='block'&&r.unlocked,'purchase sim '+JSON.stringify(r));ok(r.undoUsed===3&&r.undoAfter3==='none'&&r.adBtn==='block','corrections '+JSON.stringify(r));ok(r.contDlg,'continue-after-10 ad');ok(r.hintsFree===3&&r.hintAdDlg,'hints '+JSON.stringify(r));ok(r.premiumAccess,'premium');noErr(p);return r});
await test('Q4','Rewarded ads (QA simulation): success gives the reward once; cancel/failure/error give nothing; double callbacks cannot duplicate rewards',async()=>{const c=await ctxNew(),p=await open(c,'qa',{init:HELP});
 const r=await p.evaluate(async()=>{window.__keepMon=1;await __pair('en','it');MONET_CFG.enabled=true;MONET.resetAll();MONET.resetDaily();const o={};const real=MONET.showAd;const setD=f=>{const d=MONET.daily();f(d);localStorage.setItem(APP.store+'_mon',JSON.stringify(d))};
  S.topic='greet';S.lvl=1;S.boss=0;S.review=0;start();const wrong=()=>{const q=S.qs[S.i];__pick(q.o.find((x,j)=>j!==q.c))};
  /* corrections: 2 used → ad button */
  setD(d=>{d.undo=1});wrong();o.adShown=$('undoAd').style.display;
  MONET.showAd=(k,done)=>{done(false)};$('undoAd').click();o.afterCancel=MONET.daily().undo;
  MONET.showAd=()=>{throw new Error('ad SDK failed')};$('undoAd').click();o.afterError=MONET.daily().undo;
  MONET.showAd=(k,done)=>{done(true);done(true);setTimeout(()=>done(true),10)};$('undoAd').click();await new Promise(r=>setTimeout(r,50));o.afterSuccess=MONET.daily().undo;
  /* hints: 0 left → ad → +1 exactly once */
  setD(d=>{d.hints=0;d.adHints=0});S.benchAll=1;nav('Bench');bench();$('hintBtn').click();o.hintDlg=$('monPop').style.display;[...document.querySelectorAll('#monPop button')][0].click();await new Promise(r=>setTimeout(r,50));o.hintsAfterAd=MONET.daily().hints;o.adHints=MONET.daily().adHints;
  /* continue after 10: cancelled ad keeps the block, successful ad continues */
  nav('Quiz');S.topic='adj';S.lvl=1;start();setD(d=>{d.q=10;d.allow=10});MONET.showAd=(k,done)=>done(false);const i0=S.i;show();[...document.querySelectorAll('#monPop button')][0].click();o.blockedAfterCancel=$('monPop').style.display==='block'&&S.i===i0;
  MONET.showAd=(k,done)=>{done(true);done(true)};[...document.querySelectorAll('#monPop button')][0].click();o.allowAfter=MONET.daily().allow;o.question=$('opts').children.length;
  /* the real QA ad overlay: close early = no reward; finish = reward */
  MONET.showAd=real;setD(d=>{d.hints=0});nav('Bench');bench();$('hintBtn').click();[...document.querySelectorAll('#monPop button')][0].click();o.overlay=$('qaAd').style.display;[...document.querySelectorAll('#qaAd button')][1].click();o.hintsAfterClose=MONET.daily().hints;
  $('hintBtn').click();[...document.querySelectorAll('#monPop button')][0].click();await new Promise(r=>setTimeout(r,3300));const fin=[...document.querySelectorAll('#qaAd button')][0];fin.click();fin.click();o.hintsAfterFinish=MONET.daily().hints;return o});
 await c.close();ok(r.adShown==='block','no ad button '+JSON.stringify(r));ok(r.afterCancel===1&&r.afterError===1,'reward on cancel/error '+JSON.stringify(r));ok(r.afterSuccess===3,'refill must be exactly 3 '+JSON.stringify(r));
 ok(r.hintDlg==='block'&&r.hintsAfterAd===1&&r.adHints===1,'hint reward '+JSON.stringify(r));ok(r.blockedAfterCancel&&r.allowAfter===20&&r.question===4,'continue gate '+JSON.stringify(r));
 ok(r.overlay==='block'&&r.hintsAfterClose===0&&r.hintsAfterFinish===1,'QA overlay rewards '+JSON.stringify(r));noErr(p);return r});
await test('Q5','Corrections after an ad refill behave exactly like before the refill (counter, mistake list, question count)',async()=>{const c=await ctxNew(),p=await open(c,'qa',{init:HELP});
 const r=await p.evaluate(async()=>{window.__keepMon=1;await __pair('en','it');MONET_CFG.enabled=true;MONET.resetAll();MONET.resetDaily();const o={steps:[]};const d0=MONET.daily();d0.undo=1;localStorage.setItem(APP.store+'_mon',JSON.stringify(d0));
  S.topic='greet';S.lvl=1;S.boss=0;S.review=0;start();MONET.showAd=(k,done)=>done(true);const wrong=()=>{const q=S.qs[S.i];__pick(q.o.find((x,j)=>j!==q.c))},right=()=>{const q=S.qs[S.i];__pick(q.o[q.c])};
  wrong();$('undoBtn').click();o.steps.push(['undo with 1 left',MONET.daily().undo,S.wrong.length]);right();$('nextBtn').click();
  wrong();o.steps.push(['0 left: undo button',$('undoBtn').style.display,'ad',$('undoAd').style.display]);$('undoAd').click();o.steps.push(['after refill',MONET.daily().undo,$('undoBtn').style.display]);
  const qBefore=MONET.daily().q;$('undoBtn').click();o.steps.push(['undo after refill',MONET.daily().undo,S.wrong.length,'q',MONET.daily().q-qBefore]);right();$('nextBtn').click();
  wrong();$('undoBtn').click();o.steps.push(['next undo',MONET.daily().undo,S.wrong.length]);return o});
 await c.close();const s=r.steps;ok(s[0][1]===0&&s[0][2]===0,'first undo '+JSON.stringify(s));ok(s[1][1]==='none'&&s[1][3]==='block','no ad when empty '+JSON.stringify(s));ok(s[2][1]===3&&s[2][2]==='block','refill '+JSON.stringify(s));
 ok(s[3][1]===2&&s[3][2]===0&&s[3][4]===-1,'undo after refill inconsistent '+JSON.stringify(s));ok(s[4][1]===1&&s[4][2]===0,'next undo '+JSON.stringify(s));noErr(p);return r});
await test('Q6','Lifetime Premium removes the daily correction, hint and continue limits and opens every level',async()=>{const c=await ctxNew(),p=await open(c,'qa',{init:HELP});
 const r=await p.evaluate(async()=>{window.__keepMon=1;await __pair('en','it');MONET_CFG.enabled=true;MONET.resetAll();MONET.resetDaily();MONET.grant('lifetime');const o={};let ads=0;MONET.showAd=(k,done)=>{ads++;done(false)};
  S.topic='greet';S.lvl=1;S.boss=0;S.review=0;start();let undos=0;for(let k=0;k<8;k++){const q=S.qs[S.i];__pick(q.o.find((x,j)=>j!==q.c));if($('undoBtn').style.display==='block'){$('undoBtn').click();undos++}}o.undos=undos;o.undoCounter=MONET.daily().undo;
  S.benchAll=1;nav('Bench');let hints=0;for(let k=0;k<10;k++){bench();if($('hintBtn').style.display==='none')continue;$('hintBtn').click();if(!$('hintBtn').disabled||document.querySelector('#bq .hint-u,#bq u'))hints++}o.hints=hints;
  nav('Quiz');const d=MONET.daily();d.q=500;d.allow=10;localStorage.setItem(APP.store+'_mon',JSON.stringify(d));S.topic='adj';S.lvl=3;start();o.noGate=!document.getElementById('monPop')||$('monPop').style.display!=='block';o.level3=S.qs.length;o.ads=ads;return o});
 await c.close();ok(r.undos===8&&r.undoCounter===3,'corrections limited '+JSON.stringify(r));ok(r.hints>=8,'hints limited '+JSON.stringify(r));ok(r.noGate&&r.level3>0&&r.ads===0,'gate/level/ads '+JSON.stringify(r));noErr(p);return r});
await test('Q3','Normal build never shows ads, purchase dialogs or locks from the commercial model',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const r=await p.evaluate(async()=>{await __pair('en','it');localStorage.removeItem('roasted');for(const tp of ['greet','adj','basic']){S.lvl=1;openTopic(tp);__playAll(true)}return {monPop:!!document.getElementById('monPop'),qaAd:!!document.getElementById('qaAd'),undoAd:!!document.getElementById('undoAd'),enabled:MONET_CFG.enabled}});
 await c.close();ok(!r.monPop&&!r.qaAd&&!r.undoAd&&!r.enabled,JSON.stringify(r));noErr(p);return r});
/* ===== offline, install, update, caches ===== */
async function swReady(p){await p.waitForFunction(()=>navigator.serviceWorker&&navigator.serviceWorker.controller,null,{timeout:15000})}
await test('S1','Offline: after the first visit the app and all language data work with no network',async()=>{const c=await ctxNew(),p=await open(c,'normal',{wait:1500});await p.reload();await swReady(p);await p.waitForTimeout(1500);
 await c.setOffline(true);await p.reload();await p.waitForFunction(()=>typeof S!=='undefined',null,{timeout:15000});await p.waitForTimeout(800);
 const r=await p.evaluate(async()=>{const o=[];for(const n of ['it','en','fr','de','th','af']){await loadData(n);o.push(n+':'+Object.keys(RE[n]).length)}await ensureScenes();S.n='th';S.t='af';labels();S.lvl=1;openTopic('food');return {data:o,scenes:SCENES.length,qs:S.qs.length}});
 await c.close();ok(r.scenes===24&&r.qs===10,JSON.stringify(r));noErr(p);return r});
await test('S2','Service worker deletes only its own old caches — other Adeba Studio apps and the QA build are untouched',async()=>{const c=await ctxNew();const p=await open(c,'normal');
 await p.evaluate(async()=>{for(const k of ['noise-smuggler-v3','timermask-v9','roasted-v30','roasted-qa-v36','other-app'])await (await caches.open(k)).put('/x',new Response('keep'));localStorage.setItem('ns_progress','keep')});
 const qa=await open(c,'qa',{wait:1500});await qa.reload();await qa.waitForTimeout(2500);await p.reload();await p.waitForTimeout(2500);
 const r=await p.evaluate(async()=>({caches:(await caches.keys()).sort(),ns:localStorage.getItem('ns_progress')}));await c.close();
 ok(['noise-smuggler-v3','timermask-v9','other-app'].every(k=>r.caches.includes(k)),'foreign cache deleted '+r.caches);ok(!r.caches.includes('roasted-v30'),'own old cache kept');ok(r.caches.some(k=>k.startsWith('roasted-qa-v'))&&r.caches.some(k=>/^roasted-v\d/.test(k)),'normal/qa caches mixed '+r.caches);ok(r.ns==='keep','foreign storage');return r});
await test('S3','"Force fresh reload" (crash screen) clears only RoastED caches and its own service worker',async()=>{const c=await ctxNew();const p=await open(c,'normal',{wait:1500});await p.reload();await swReady(p);
 await p.evaluate(async()=>{await (await caches.open('noise-smuggler-v3')).put('/x',new Response('k'))});const nav_=p.waitForEvent('framenavigated',{timeout:8000}).catch(()=>null);
 await p.evaluate(()=>{window._crashed=0;window.__booted=0;_showCrash({message:'test'});const b=document.getElementById('_hardReload');if(!b)throw new Error('crash screen did not appear');b.click()});await nav_;await p.waitForTimeout(1500);const r=await p.evaluate(async()=>(await caches.keys()).sort());await c.close();
 ok(r.includes('noise-smuggler-v3'),'foreign cache deleted by crash reload');return r});
await test('S4','Update: a new deployment is picked up automatically and the app reloads only on a safe screen',async()=>{const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'rupd-'));fs.cpSync(path.join(DIST,'normal'),path.join(tmp,'normal'),{recursive:true});ROOT=tmp;
 try{const c=await ctxNew();const p=await open(c,'normal',{wait:1500});await p.reload();await swReady(p);
  const appf=path.join(tmp,'normal','app.js'),swf=path.join(tmp,'normal','sw.js');fs.writeFileSync(appf,fs.readFileSync(appf,'utf8').replace(/const BUILD='(v\d+)';/,"const BUILD='$1-next';"));fs.writeFileSync(swf,fs.readFileSync(swf,'utf8').replace(/C=CP\+'(\d+)'/,"C=CP+'$1next'"));
  await p.evaluate(async()=>{S.n='en';S.t='it';await loadData('en');await loadData('it');labels();S.lvl=1;nav('Topics')});await p.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));await p.waitForTimeout(4000);const duringQuiz=await p.evaluate(()=>BUILD).catch(()=>'reloaded');
  await p.evaluate(()=>nav('Menu')).catch(()=>{});await p.waitForTimeout(5000);const after=await p.evaluate(()=>BUILD);await c.close();
  ok(duringQuiz.indexOf('-next')<0,'reloaded during a quiz');ok(after.endsWith('-next'),'not updated: '+after);return {duringQuiz,after}}finally{ROOT=DIST}});
await test('S5','Interrupted download: if a file fails while installing an update, the working version stays and the update retries later',async()=>{const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'rint-'));fs.cpSync(path.join(DIST,'normal'),path.join(tmp,'normal'),{recursive:true});ROOT=tmp;
 try{const c=await ctxNew();const p=await open(c,'normal',{wait:1500});await p.reload();await swReady(p);const v0=await p.evaluate(()=>BUILD);
  const swf=path.join(tmp,'normal','sw.js');fs.writeFileSync(swf,fs.readFileSync(swf,'utf8').replace(/C=CP\+'(\d+)'/,"C=CP+'$1b'"));BLOCK=/data\/th\.js/;
  await p.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();try{await r.update()}catch(e){}});await p.waitForTimeout(3000);
  await c.setOffline(true);await p.reload();await p.waitForFunction(()=>typeof S!=='undefined',null,{timeout:15000});const offlineOk=await p.evaluate(async()=>{await loadData('th');return Object.keys(RE.th).length>5});await c.setOffline(false);
  BLOCK=null;await p.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();try{await r.update()}catch(e){}});await p.waitForTimeout(3000);const ks=await p.evaluate(async()=>(await caches.keys()).filter(k=>k.startsWith('roasted-v')));await c.close();
  ok(offlineOk,'old version broken after failed update');ok(ks.some(k=>k.endsWith('b')),'update not installed on retry '+ks);return {v0,offlineOk,caches:ks}}finally{ROOT=DIST;BLOCK=null}});
await test('S6','Install metadata: manifest, icons and service worker valid for both builds',async()=>{const o={};for(const k of ['normal','qa']){const m=JSON.parse(fs.readFileSync(path.join(DIST,k,'manifest.json'),'utf8'));
  ok(m.name&&m.start_url&&m.display==='standalone'&&m.icons.some(i=>i.purpose==='maskable')&&m.icons.every(i=>fs.existsSync(path.join(DIST,k,i.src))),k+' manifest');o[k]={name:m.name,id:m.id||'(default)'}}
 ok(o.normal.name!==o.qa.name,'same install name');return o});
/* ===== mobile, accessibility, interruptions ===== */
await test('M1','Layouts: no sideways scrolling on small/large phones, tablet and landscape (main screens)',async()=>{const sizes=[[320,568],[360,740],[390,844],[430,932],[768,1024],[844,390]];const out=[];
 for(const [w,h] of sizes){const c=await ctxNew({viewport:{width:w,height:h},isMobile:w<700,hasTouch:true}),p=await open(c,'normal',{init:HELP});
  const r=await p.evaluate(async()=>{await __pair('th','de');const o=[];const chk=n=>{if(document.documentElement.scrollWidth>innerWidth+1)o.push(n+':'+document.documentElement.scrollWidth)};
   for(const n of ['Welcome','Home','Menu','Levels','Topics','Trophies','Settings','Story']){nav(n);chk(n)}S.lvl=1;openTopic('food');chk('Quiz');const q=S.qs[0];__pick(q.o[(q.c+1)%4]);chk('Quiz+sheet');nav('Bench');chk('Bench');await ensureScenes();startScene(20);chk('Scene');return o});
  if(r.length)out.push(w+'x'+h+' '+r.join(','));noErr(p);await c.close()}ok(!out.length,out.join(' | '));return sizes.map(s=>s.join('x')).join(', ')});
await test('M2','Accessibility basics: every button has a name, images have alt text, page language set, top-bar targets ≥ 38 px',async()=>{const c=await ctxNew(),p=await open(c,'normal');
 const r=await p.evaluate(async()=>{S.n='en';S.t='it';await loadData('en');labels();nav('Menu');const bad=[...document.querySelectorAll('button')].filter(b=>b.offsetParent&&!(b.textContent.trim()||b.getAttribute('aria-label')||b.title)).map(b=>b.id||b.className);
  const noalt=[...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).map(i=>i.src.split('/').pop());const small=['backBtn','homeBtn','voiceBtn','muteBtn'].map(id=>$(id)).filter(e=>e&&e.offsetParent&&(e.offsetWidth<38||e.offsetHeight<38)).map(e=>e.id);
  return {bad,noalt,small,lang:document.documentElement.lang}});await c.close();ok(!r.bad.length&&!r.noalt.length&&!r.small.length&&r.lang,JSON.stringify(r));return r});
await test('M3','Interruptions: app goes to background and back mid-quiz; state kept, no errors',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:HELP});
 const r=await p.evaluate(async()=>{await __pair('fr','en');S.lvl=1;openTopic('food');const q=S.qs[0];__pick(q.o[q.c]);$('nextBtn').click();const i=S.i;Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));await new Promise(r=>setTimeout(r,500));
  Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new Event('pageshow'));await new Promise(r=>setTimeout(r,500));return {screen:S.screen,i,iAfter:S.i,score:S.sc}});
 await c.close();ok(r.screen==='Quiz'&&r.i===r.iAfter,JSON.stringify(r));noErr(p);return r});
await test('M4','No text-to-speech available: listen buttons show a message, nothing crashes',async()=>{const c=await ctxNew(),p=await open(c,'normal',{init:()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true})}});
 const r=await p.evaluate(async()=>{S.n='en';S.t='it';await loadData('en');await loadData('it');labels();S.lvl=1;openTopic('food');const b=$('wordList').querySelector('.wrow button');b.click();const q=S.qs[0];[...document.querySelectorAll('#opts button')][0].click();$('sayBtn').click();return {toast:(document.querySelector('.toast,#toast')||{}).textContent||'shown'}});
 await c.close();noErr(p);return r});
await test('M5','Voices missing for a language (e.g. Afrikaans) and iPhone speech workaround: speech still requested, no crash',async()=>{const c=await ctxNew({...devices['iPhone 13']});
 const p=await open(c,'normal',{init:()=>{window.__said=[];let sp=false;const f={speak(u){window.__said.push(u.text+'|'+u.lang);sp=true;setTimeout(()=>{sp=false;u.onend&&u.onend()},200)},cancel(){sp=false},resume(){},getVoices(){return[]},get speaking(){return sp},pending:false,addEventListener(){}};Object.defineProperty(window,'speechSynthesis',{value:f})}});
 const r=await p.evaluate(async()=>{S.n='en';S.t='af';await loadData('en');await loadData('af');labels();S.lvl=1;openTopic('greet');const bs=$('wordList').querySelectorAll('.wrow button');bs[0].click();bs[1].click();await new Promise(r=>setTimeout(r,800));return {ios:IOS,said:__said.filter(x=>x.trim()!=='|').slice(-2)}});
 await c.close();ok(r.ios&&r.said.length>=2,JSON.stringify(r));noErr(p);return r});
await test('M6','Microphone: not supported / permission denied / no speech — clear messages; short-word message after 2 misses',async()=>{const c=await ctxNew();
 const p=await open(c,'normal',{init:()=>{window.SpeechRecognition=function(){const r=this;r.start=()=>setTimeout(()=>r.onerror&&r.onerror({error:window.__micErr||'not-allowed'}),50);r.stop=()=>{};r.abort=()=>{}};window.webkitSpeechRecognition=window.SpeechRecognition}});
 const r=await p.evaluate(async()=>{S.n='en';S.t='it';await loadData('en');await loadData('it');labels();S.lvl=1;openTopic('greet');const q=S.qs[0];[...document.querySelectorAll('#opts button')][0].click();const o={};
  const mb=$('readMicBtn');if(mb){mb.click();await new Promise(r=>setTimeout(r,300));o.denied=$('readOut').textContent;window.__micErr='no-speech';S.readTarget='No';mb.click();await new Promise(r=>setTimeout(r,300));mb.click();await new Promise(r=>setTimeout(r,300));o.noSpeech=$('readOut').textContent}return o});
 await c.close();ok(r.denied&&r.denied.length>3,'no message for denied mic '+JSON.stringify(r));noErr(p);return r});
await test('M7','Android back button: moves back through screens; on the first page asks before closing',async()=>{const c=await ctxNew({hasTouch:true,isMobile:true}),p=await open(c,'normal');
 await p.tap('body',{position:{x:200,y:300}});await p.evaluate(async()=>{S.n='en';S.t='it';await loadData('en');await loadData('it');labels();nav('Home');nav('Menu');nav('Levels')});await p.tap('body',{position:{x:200,y:700}}).catch(()=>{});
 const seq=[];for(let k=0;k<4;k++){await p.goBack({waitUntil:'commit'}).catch(()=>{});await p.waitForTimeout(300);seq.push(await p.evaluate(()=>S.screen+(document.getElementById('closeDlg').style.display==='block'?'+dialog':'')).catch(()=>'left'))}
 await c.close();ok(seq.some(s=>s.includes('dialog')),'no close dialog: '+seq);return seq});
/* ===== finish ===== */
await browser.close();srv.close();
const sum={pass:results.filter(r=>r.status==='PASS').length,fail:results.filter(r=>r.status==='FAIL').length,skip:results.filter(r=>r.status==='SKIP').length,date:new Date().toISOString(),dist:DIST,chrome:CHROME};
fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'test_results.json'),JSON.stringify({summary:sum,results},null,1));
const md=['# Automated browser test results','',`Run: ${sum.date} · Browser: Chrome (headless, Playwright) · ${sum.pass} passed, ${sum.fail} failed, ${sum.skip} skipped`,'',
 'These tests run in a desktop Chrome engine that imitates phones. They do **not** replace tests on real iPhones/Android phones, real voices, real microphones or screen readers.','',
 '| ID | Test | Result | Time |','|---|---|---|---:|',...results.map(r=>`| ${r.id} | ${r.name} | ${r.status==='PASS'?'✅ PASS':r.status==='FAIL'?'❌ FAIL':'⏭ SKIP'} | ${r.ms?(r.ms/1000).toFixed(1)+'s':''} |`),'',
 '## Details','',...results.map(r=>`### ${r.id} — ${r.status}\n\`\`\`\n${typeof r.details==='string'?r.details:JSON.stringify(r.details,null,1)}`.slice(0,2500)+'\n```')];
fs.writeFileSync(path.join(OUT,'TEST_RESULTS.md'),md.join('\n'));console.log(JSON.stringify(sum));process.exit(sum.fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
