/* RoastED content validator — read-only.
   node tests/validate_content.js [projectRoot] [outDir]
   Checks every answer record, Thai romanization, roasts, UI strings, word lists and conversations.
   Exit code 1 if any ERROR is found. WARNINGS/INFO need a human decision (they are not automatically wrong). */
const fs=require('fs'),path=require('path');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..')),out=process.argv[3]||path.join(root,'docs');
global.window=global;const L=['it','en','fr','de','th','af'];
for(const l of L){require(path.join(root,'data',l+'.js'));require(path.join(root,'data','ui-'+l+'.js'))}
require(path.join(root,'data','words.js'));require(path.join(root,'data','scenes.js'));
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const TOP=eval(app.match(/const TOP=(\[[^\]]*\])/)[1]);
const issues=[];const add=(sev,code,where,msg,extra)=>issues.push({sev,code,where,msg,extra});
const TH=/[฀-๿]/;const norm=s=>String(s).toLowerCase().replace(/[“”"«»„‘’'.,!?¿¡…:;\-–—]/g,'').replace(/\s+/g,' ').trim();
const BOTH=/^(both|entrambe|entrambi|les deux|toutes les deux|beide|albei|ทั้ง)\b.*\b([A-D])\b.*\b([A-D])\b/i;
let records=0,entries=0;
for(const n of L){
 for(const tp of Object.keys(RE[n])){
  const arr=RE[n][tp];const seen=new Map();
  arr.forEach((e,i)=>{entries++;const W=`${n}.${tp}#${i}`;
   if(!e.s||!String(e.s).trim())add('ERROR','empty-sentence',W,'native sentence is empty');
   if(n==='th'&&tp!=='thalpha'&&!TH.test(e.s))add('WARN','th-native-no-thai',W,'Thai native sentence has no Thai script',e.s);
   if(n!=='th'&&TH.test(e.s)&&tp!=='thalpha')add('WARN','thai-in-native',W,'Thai script inside a non-Thai native sentence',e.s);
   if(seen.has(e.s))add('WARN','duplicate-sentence',W,'same native sentence appears twice in this topic (also #'+seen.get(e.s)+')',e.s);else seen.set(e.s,i);
   const tg=Object.keys(e.t||{});const expect=L.filter(x=>x!==n);
   if(tp!=='thalpha'){const miss=expect.filter(x=>!tg.includes(x));if(miss.length)add('WARN','missing-target',W,'no translation for: '+miss.join(','),e.s)}
   for(const t of tg){records++;const r=e.t[t],R=`${n}>${t} ${tp}#${i}`;
    if(!Array.isArray(r.o)||r.o.length<2){add('ERROR','options',R,'options missing');continue}
    if(r.o.length!==4)add('INFO','option-count',R,'has '+r.o.length+' options');
    if(!(r.c>=0&&r.c<r.o.length))add('ERROR','bad-index',R,'correct index out of range',r.c);
    if(r.o[r.c]!==r.f)add('ERROR','f-mismatch',R,'answer key points to a different option than the correct answer text',{key:r.o[r.c],f:r.f});
    r.o.forEach((o,j)=>{if(!String(o).trim())add('ERROR','empty-option',R,'option '+j+' empty');if(o!==String(o).trim()||/\s{2,}/.test(o))add('WARN','whitespace',R,'extra spaces in option',o)});
    const nn=r.o.map(norm);if(new Set(r.o).size!==r.o.length)add('ERROR','dup-option',R,'two options are identical',r.o);
    else{const lc=r.o.map(x=>String(x).toLowerCase().replace(/\s+/g,' ').trim());if(new Set(lc).size!==lc.length)add('WARN','case-only-diff',R,'two options differ only by capital letters — check it is a fair question',r.o);else if(new Set(nn).size!==nn.length)add('INFO','punctuation-only-diff',R,'two options differ only by punctuation/apostrophes (intended trap? check)',r.o)}
    r.o.forEach((o,j)=>{const m=String(o).match(BOTH);if(m){if(!r.ns)add('ERROR','both-shuffled',R,'"Both…" option but the options can be shuffled',o);
      [m[2],m[3]].forEach(Lt=>{const k=Lt.charCodeAt(0)-65;if(k>=r.o.length||k===j)add('ERROR','both-ref',R,'"Both…" refers to a missing option',o)})}});
    if(r.ns&&!r.o.some(o=>BOTH.test(o)))add('INFO','ns-without-both',R,'no-shuffle flag but no "Both…" option — could be shuffled');
    if(t==='th'){if(!r.ph||!Array.isArray(r.ph.o))add('ERROR','th-no-rom',R,'Thai answer without romanization');
     else{if(r.ph.o.length!==r.o.length)add('ERROR','th-rom-len',R,'romanization count ≠ options');if(r.ph.f!==r.ph.o[r.c])add('ERROR','th-rom-key',R,'romanization of the correct answer does not match',{f:r.ph.f,key:r.ph.o[r.c]});
      r.ph.o.forEach(p=>{if(!String(p).trim())add('ERROR','th-rom-empty',R,'empty romanization');if(TH.test(p))add('ERROR','th-rom-script',R,'Thai script inside romanization',p)})}
     if(!r.o.every(o=>TH.test(o)||/^[\d\s.,:]+$/.test(o)))add('WARN','th-target-latin',R,'a Thai option has no Thai script',r.o)}
    else if(r.o.some(o=>TH.test(o)))add('ERROR','thai-in-target',R,'Thai script in a non-Thai target',r.o);
    if(t==='fr'&&r.o.concat([r.f]).some(o=>/\S[   ][?!]/.test(o)))add('WARN','fr-space',R,'French: space before ? or !',r.o);
    if(r.r!=null){if(!String(r.r).trim())add('ERROR','empty-roast',R,'empty roast');if(/\{[a-z]+\}|undefined|NaN/.test(r.r))add('ERROR','roast-placeholder',R,'placeholder left in roast',r.r);
     if(n==='fr'&&/\S[   ][?!]/.test(r.r))add('WARN','fr-space-roast',R,'French roast: space before ? or !',r.r)}
    if(r.o.some(o=>norm(o)===norm(e.s))&&n!==t&&!['col','num','thalpha'].includes(tp))add('INFO','option-equals-native',R,'an option is identical to the native sentence',e.s);
   }});
 }
}
/* same item index in different native files should translate to the same target answer (sentence topics are parallel) */
const SENT=['food','travel','sports','culture','dailylife'];let align=0;
for(const tp of SENT)for(const t of L){const ref=L.filter(n=>n!==t&&RE[n][tp]);const len=Math.min(...ref.map(n=>RE[n][tp].length));
 for(let i=0;i<len;i++){const fs_=new Map();ref.forEach(n=>{const r=RE[n][tp][i].t[t];if(r)fs_.set(n,r.f)});const vals=[...new Set(fs_.values())];
  if(vals.length>1){align++;add('INFO','parallel-diff',`${tp}#${i} →${t}`,'natives give different correct answers for the same item (may be intended: each native sentence is slightly different)',Object.fromEntries(fs_))}}}
/* UI strings: same keys in every language */
const flat=(o,p='')=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==='object'&&!Array.isArray(v)?flat(v,p+k+'.'):[p+k]);
const en=new Set(flat(UI.en));for(const l of L){const k=new Set(flat(UI[l]));[...en].filter(x=>!k.has(x)).forEach(x=>add('ERROR','ui-missing',`ui-${l}`,'missing UI text',x));
 if(UI[l].T.topics.length!==TOP.length)add('ERROR','ui-topics',`ui-${l}`,'topic names count ≠ topics',UI[l].T.topics.length)}
/* word lists */
for(const tp in WORDS)WORDS[tp].forEach((w,i)=>{L.forEach(l=>{if(!w[l]||!String(w[l]).trim())add('ERROR','word-missing',`words.${tp}#${i}`,'missing '+l)});if(!w.thr)add('ERROR','word-no-rom',`words.${tp}#${i}`,'Thai word without romanization')});
/* conversations */
const F=['say','ok','b1','b2','re1'];
SCENES.forEach(s=>{['title','intro'].forEach(k=>L.forEach(l=>{if(!s[k]||!s[k][l])add('ERROR','scene-missing',`scene.${s.id}`,k+' missing '+l)}));
 if(s.turns.length!==6)add('WARN','scene-turns',`scene.${s.id}`,'turns: '+s.turns.length);
 s.turns.forEach((t,i)=>{F.forEach(f=>L.forEach(l=>{const v=t[f]&&t[f][l];if(!v||!String(v).trim())add('ERROR','scene-missing',`scene.${s.id}#${i+1}`,f+' missing '+l);else if(l==='fr'&&/\S[   ][?!]/.test(v))add('WARN','fr-space',`scene.${s.id}#${i+1}`,'French: space before ? or !',v)}));
  ['sayR','okR','b1R','b2R'].forEach(f=>{if(!t[f]||TH.test(t[f]))add('ERROR','scene-th-rom',`scene.${s.id}#${i+1}`,f+' romanization missing/invalid')});
  L.forEach(l=>{const v=[t.ok[l],t.b1[l],t.b2[l]];if(new Set(v).size<3)add('ERROR','scene-dup-reply',`scene.${s.id}#${i+1}`,'two replies identical in '+l)})})});
/* text tables inside app.js / report.js / monet.js: every language must have the same keys */
function tables(file){const src=fs.readFileSync(path.join(root,file),'utf8');const res=[];const rx=/const (\w+)=\{\s*\n?en:\{/g;let m;while((m=rx.exec(src))){res.push(m[1])}return res}
for(const f of ['app.js','report.js','monet.js']){if(!fs.existsSync(path.join(root,f)))continue}
const by=s=>issues.filter(i=>i.sev===s);
const sum={records,entries,errors:by('ERROR').length,warnings:by('WARN').length,info:by('INFO').length,codes:{}};issues.forEach(i=>{sum.codes[i.sev+' '+i.code]=(sum.codes[i.sev+' '+i.code]||0)+1});
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'content_validation.json'),JSON.stringify({summary:sum,issues},null,1));
const md=['# Automated content validation','',`Records checked: **${records}** (answer records = native × item × target), items: ${entries}, conversations: ${SCENES.length}, word-list words: ${Object.values(WORDS).reduce((a,b)=>a+b.length,0)}.`,'',
 'Automated checks find structural problems (wrong answer keys, missing romanization, duplicates…). They **cannot** judge whether a sentence is natural or correct — that needs native speakers.','',
 '| Severity | Check | Count |','|---|---|---:|',...Object.entries(sum.codes).sort().map(([k,v])=>{const [s,c]=k.split(' ');return `| ${s} | ${c} | ${v} |`}),'',
 '## Errors (first 50)','',...by('ERROR').slice(0,50).map(i=>`- **${i.code}** ${i.where}: ${i.msg}${i.extra!=null?' — `'+JSON.stringify(i.extra).slice(0,200)+'`':''}`),'',
 '## Warnings (first 80)','',...by('WARN').slice(0,80).map(i=>`- **${i.code}** ${i.where}: ${i.msg}${i.extra!=null?' — `'+JSON.stringify(i.extra).slice(0,200)+'`':''}`),'',
 'Full list with every item: `content_validation.json`.'];
fs.writeFileSync(path.join(out,'CONTENT_VALIDATION.md'),md.join('\n'));
console.log(JSON.stringify(sum,null,1));process.exitCode=sum.errors?1:0;
