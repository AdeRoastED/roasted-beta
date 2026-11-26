/* RoastED — question reporting (works offline, no GitHub needed).
   Each report: stable question ID, language pair, topic, level, mode, displayed options, expected answer,
   chosen answer, problem type, tester comment, app version. No personal data is collected.
   Reports are saved on the device immediately, so they cannot be lost before they are sent. */
(function(){
const REPORT_EMAIL='';           /* set an address later, e.g. 'qa@example.com'; empty = no email button */
const KEY=()=>APP.store+'_reports';
const RT={
en:{title:'🚩 Report a problem',type:'What is wrong?',types:['Wrong correct answer','More than one answer is correct','Unnatural or wrong translation','Typo or spelling','Roast or explanation','Audio / pronunciation','Other'],comment:'Comment (optional)',ph:'Tell us what should be correct…',share:'📤 Share',copy:'📋 Copy',email:'✉️ Email',save:'💾 Save for later',close:'✕',saved:'✔ Saved. Find it in Settings → Reports.',copied:'✔ Copied.',list:'📝 Reports',none:'No reports yet.',unsent:'{n} not sent yet',exportB:'⬇️ Export all (file)',shareAll:'📤 Share all',clearSent:'🗑️ Delete sent reports',confirmClear:'Delete the reports you already sent?',sent:'sent',notSent:'not sent'},
it:{title:'🚩 Segnala un problema',type:'Cosa non va?',types:['Risposta corretta sbagliata','Più di una risposta è corretta','Traduzione innaturale o sbagliata','Errore di battitura','Roast o spiegazione','Audio / pronuncia','Altro'],comment:'Commento (facoltativo)',ph:'Scrivi quale sarebbe la versione corretta…',share:'📤 Condividi',copy:'📋 Copia',email:'✉️ Email',save:'💾 Salva per dopo',close:'✕',saved:'✔ Salvata. La trovi in Impostazioni → Segnalazioni.',copied:'✔ Copiata.',list:'📝 Segnalazioni',none:'Nessuna segnalazione.',unsent:'{n} non ancora inviate',exportB:'⬇️ Esporta tutto (file)',shareAll:'📤 Condividi tutte',clearSent:'🗑️ Elimina quelle inviate',confirmClear:'Eliminare le segnalazioni già inviate?',sent:'inviata',notSent:'non inviata'},
fr:{title:'🚩 Signaler un problème',type:'Quel est le problème?',types:['Mauvaise réponse correcte','Plusieurs réponses sont correctes','Traduction peu naturelle ou fausse','Faute de frappe','Roast ou explication','Audio / prononciation','Autre'],comment:'Commentaire (facultatif)',ph:'Indiquez la bonne version…',share:'📤 Partager',copy:'📋 Copier',email:'✉️ E-mail',save:'💾 Garder pour plus tard',close:'✕',saved:'✔ Enregistré. Voir Réglages → Signalements.',copied:'✔ Copié.',list:'📝 Signalements',none:'Aucun signalement.',unsent:'{n} pas encore envoyés',exportB:'⬇️ Tout exporter (fichier)',shareAll:'📤 Tout partager',clearSent:'🗑️ Supprimer les envoyés',confirmClear:'Supprimer les signalements déjà envoyés?',sent:'envoyé',notSent:'non envoyé'},
de:{title:'🚩 Problem melden',type:'Was ist falsch?',types:['Falsche richtige Antwort','Mehr als eine Antwort ist richtig','Unnatürliche oder falsche Übersetzung','Tippfehler','Roast oder Erklärung','Audio / Aussprache','Sonstiges'],comment:'Kommentar (optional)',ph:'Was wäre richtig?…',share:'📤 Teilen',copy:'📋 Kopieren',email:'✉️ E-Mail',save:'💾 Für später speichern',close:'✕',saved:'✔ Gespeichert. Unter Einstellungen → Meldungen.',copied:'✔ Kopiert.',list:'📝 Meldungen',none:'Noch keine Meldungen.',unsent:'{n} noch nicht gesendet',exportB:'⬇️ Alle exportieren (Datei)',shareAll:'📤 Alle teilen',clearSent:'🗑️ Gesendete löschen',confirmClear:'Bereits gesendete Meldungen löschen?',sent:'gesendet',notSent:'nicht gesendet'},
af:{title:'🚩 Rapporteer \'n probleem',type:'Wat is fout?',types:['Verkeerde korrekte antwoord','Meer as een antwoord is korrek','Onnatuurlike of verkeerde vertaling','Tikfout','Roast of verduideliking','Klank / uitspraak','Ander'],comment:'Opmerking (opsioneel)',ph:'Wat behoort korrek te wees?…',share:'📤 Deel',copy:'📋 Kopieer',email:'✉️ E-pos',save:'💾 Stoor vir later',close:'✕',saved:'✔ Gestoor. Kyk Instellings → Verslae.',copied:'✔ Gekopieer.',list:'📝 Verslae',none:'Nog geen verslae nie.',unsent:'{n} nog nie gestuur nie',exportB:'⬇️ Voer alles uit (lêer)',shareAll:'📤 Deel alles',clearSent:'🗑️ Vee gestuurdes uit',confirmClear:'Vee die verslae uit wat reeds gestuur is?',sent:'gestuur',notSent:'nie gestuur nie'},
th:{title:'🚩 แจ้งปัญหา',type:'ผิดตรงไหน',types:['คำตอบที่ถูกไม่ถูกต้อง','มีคำตอบถูกมากกว่าหนึ่งข้อ','คำแปลไม่เป็นธรรมชาติหรือผิด','สะกดผิด','คำแซวหรือคำอธิบาย','เสียง / การออกเสียง','อื่น ๆ'],comment:'ความคิดเห็น (ไม่บังคับ)',ph:'บอกหน่อยว่าที่ถูกควรเป็นอย่างไร…',share:'📤 แชร์',copy:'📋 คัดลอก',email:'✉️ อีเมล',save:'💾 เก็บไว้ก่อน',close:'✕',saved:'✔ บันทึกแล้ว ดูได้ที่ ตั้งค่า → รายงาน',copied:'✔ คัดลอกแล้ว',list:'📝 รายงาน',none:'ยังไม่มีรายงาน',unsent:'ยังไม่ได้ส่ง {n} รายการ',exportB:'⬇️ ส่งออกทั้งหมด (ไฟล์)',shareAll:'📤 แชร์ทั้งหมด',clearSent:'🗑️ ลบรายการที่ส่งแล้ว',confirmClear:'ลบรายงานที่ส่งแล้วใช่ไหม',sent:'ส่งแล้ว',notSent:'ยังไม่ส่ง'}};
const rt=()=>RT[S.n]||RT.en;
function hash8(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return('00000000'+h.toString(16)).slice(-8)}
function findEntry(e){const R=RE[S.n]||{};for(const tp in R){const i=(R[tp]||[]).indexOf(e);if(i>=0)return{tp,i}}return null}
/* stable ID: topic + position in the data file, plus a signature of the native sentence (changes if the content changes) */
function qid(e){const f=e&&findEntry(e);return f?{qid:f.tp+'-'+f.i,tp:f.tp,sig:hash8(e.s||'')}:{qid:'unknown',tp:S.topic||'',sig:''}}
function mode(){return S.duel?'challenge':S.review?(S.revMis?'review-mistakes':'review'):S.boss?'final-test':S.numset?'numbers':S.story?'story':'quiz'}
function lvlOf(){return S.numset?((NUM_DECADES[S.nsIdx]||[])[2]||''):S.boss?'final':String(S.lvl||'')}
function ctxQuiz(){const q=S.qs&&S.qs[S.i];if(!q)return null;const id=qid(q._e),shown=[...document.querySelectorAll('#opts button')].map(b=>(b.childNodes[0]&&b.childNodes[0].textContent||b.textContent).replace(/^[A-D]\.\s*/,'').trim());
 const chosen=document.querySelector('#opts button.correct-ans,#opts button.wrong-ans,#opts button.picked');
 return{area:'quiz',qid:id.qid,sig:id.sig,topic:id.tp||S.topic,level:lvlOf(),mode:mode(),question:q.s,options:shown.length?shown:q.o.slice(),expected:q.f,romanization:q.ph?q.ph.f:undefined,chosen:S.lastPick||undefined}}
function ctxBench(){const b=S.bi;if(!b)return null;const id=qid(b.q&&b.q._e);return{area:'torture-bench',qid:id.qid,sig:id.sig,topic:S.benchAll?'all':S.topic,level:String(S.lvl||''),mode:'bench',question:b.p,meaning:b.m,expected:b.a,answerTyped:($('fixIn')&&$('fixIn').value)||undefined}}
function ctxScene(){const s=S.scene;if(!s)return null;const t=s.turns[Math.min(S.sti,s.turns.length-1)]||{},tg=S.t;return{area:'conversation',qid:'scene-'+s.id+'-turn'+(Math.min(S.sti,s.turns.length-1)+1),sig:hash8((t.say&&t.say[tg])||''),topic:s.id,level:String(s.lv),mode:'conversation',question:t.say&&t.say[tg],options:t.ok?[t.ok[tg],t.b1[tg],t.b2[tg]]:[],expected:t.ok&&t.ok[tg]}}
function build(area,type,comment){const c=(area==='bench'?ctxBench():area==='scene'?ctxScene():ctxQuiz())||{area};
 return Object.assign({app:'RoastED',version:(typeof BUILD!=='undefined'?BUILD:'?'),build:APP.kind,date:new Date().toISOString(),native:S.n,target:S.t},c,{problem:type,comment:comment||'',id:'R'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),sent:false})}
function load(){try{return JSON.parse(localStorage.getItem(KEY())||'[]')}catch(e){return[]}}
function store(a){try{localStorage.setItem(KEY(),JSON.stringify(a.slice(-500)))}catch(e){}}
function add(r){const a=load();a.push(r);store(a);return r}
function mark(ids){const a=load();a.forEach(r=>{if(ids.includes(r.id))r.sent=true});store(a)}
function asText(r){const L=[];L.push('RoastED report '+r.id+' · '+r.version+' ('+r.build+')');L.push('Question ID: '+r.qid+(r.sig?' ['+r.sig+']':''));L.push('Pair: '+r.native+' → '+r.target+' · Topic: '+r.topic+' · Level: '+r.level+' · Mode: '+r.mode);
 if(r.question)L.push('Question: '+r.question);if(r.meaning)L.push('Meaning: '+r.meaning);if(r.options&&r.options.length)L.push('Options shown: '+r.options.map((o,i)=>String.fromCharCode(65+i)+') '+o).join(' | '));
 if(r.expected)L.push('Expected answer: '+r.expected);if(r.romanization)L.push('Romanization: '+r.romanization);if(r.chosen)L.push('Chosen: '+r.chosen);if(r.answerTyped)L.push('Typed: '+r.answerTyped);
 L.push('Problem: '+r.problem);if(r.comment)L.push('Comment: '+r.comment);L.push('Date: '+r.date);return L.join('\n')}
async function shareText(text){if(navigator.share){try{await navigator.share({text});return true}catch(e){return false}}return copyText(text)}
async function copyText(text){try{await navigator.clipboard.writeText(text);return true}catch(e){try{const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();return ok}catch(_){return false}}}
function pop(){let p=document.getElementById('repPop');if(!p){p=document.createElement('div');p.id='repPop';p.className='tip-pop close-dlg rep-pop';p.style.display='none';p.setAttribute('role','dialog');p.setAttribute('aria-modal','true');document.body.appendChild(p)}return p}
function el(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
window.openReport=function(area){const T=rt(),p=pop();p.innerHTML='';const x=el('button','dp-x',T.close);x.type='button';x.setAttribute('aria-label','close');x.onclick=()=>{p.style.display='none'};p.appendChild(x);
 p.appendChild(el('b','dp-title',T.title));const ctx=(area==='bench'?ctxBench():area==='scene'?ctxScene():ctxQuiz())||{};if(ctx.question){const qq=el('p','rep-q',ctx.question+(ctx.expected?'  →  '+ctx.expected:''));p.appendChild(qq)}
 p.appendChild(el('small',null,T.type));const box=el('div','dp-topics');let type=T.types[0],typeEn=RT.en.types[0];
 T.types.forEach((t,i)=>{const b=el('button','dp-t'+(i?'':' on'),t);b.type='button';b.onclick=()=>{type=t;typeEn=RT.en.types[i];[...box.children].forEach(c=>c.classList.remove('on'));b.classList.add('on')};box.appendChild(b)});p.appendChild(box);
 const lab=el('label','dp-lab',T.comment);const ta=document.createElement('textarea');ta.maxLength=600;ta.rows=3;ta.placeholder=T.ph;ta.className='rep-ta';lab.appendChild(ta);p.appendChild(lab);
 let saved=null;const ensure=()=>{if(!saved)saved=add(build(area,typeEn+(type!==typeEn?' ('+type+')':''),ta.value.trim()));else{const a=load(),r=a.find(z=>z.id===saved.id);if(r){r.comment=ta.value.trim();store(a)}saved.comment=ta.value.trim()}return saved};
 const row=el('div','duel-btns');const btn=(l,f)=>{const b=el('button','btn-roasted',l);b.type='button';b.onclick=f;row.appendChild(b)};
 btn(T.share,async()=>{const r=ensure();if(await shareText(asText(r))){mark([r.id]);p.style.display='none';toast(T.saved,2500);refreshBadge()}});
 btn(T.copy,async()=>{const r=ensure();if(await copyText(asText(r))){mark([r.id]);toast(T.copied,2500);refreshBadge()}});
 if(REPORT_EMAIL)btn(T.email,()=>{const r=ensure();mark([r.id]);location.href='mailto:'+REPORT_EMAIL+'?subject='+encodeURIComponent('RoastED report '+r.qid)+'&body='+encodeURIComponent(asText(r))});
 btn(T.save,()=>{ensure();p.style.display='none';toast(T.saved,3000);refreshBadge()});
 p.appendChild(row);p.style.display='block';setTimeout(()=>{try{ta.focus()}catch(e){}},50)};
/* Settings → Reports list */
function download(name,text,type){const b=new Blob([text],{type});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}
window.openReportList=function(){const T=rt(),p=pop(),a=load();p.innerHTML='';const x=el('button','dp-x',T.close);x.type='button';x.onclick=()=>{p.style.display='none'};p.appendChild(x);
 p.appendChild(el('b','dp-title',T.list+' ('+a.length+')'));const un=a.filter(r=>!r.sent).length;if(un)p.appendChild(el('p','rep-un',T.unsent.replace('{n}',un)));
 if(!a.length)p.appendChild(el('p',null,T.none));const ul=el('div','rep-list');a.slice().reverse().slice(0,60).forEach(r=>{const d=el('div','rep-item');d.appendChild(el('b',null,r.qid+' · '+r.native+'→'+r.target));d.appendChild(el('span',null,(r.problem||'')+(r.comment?' — '+r.comment:'')));d.appendChild(el('small',null,(r.sent?T.sent:T.notSent)+' · '+(r.date||'').slice(0,16).replace('T',' ')));ul.appendChild(d)});p.appendChild(ul);
 const row=el('div','duel-btns');const btn=(l,f)=>{const b=el('button','btn-roasted',l);b.type='button';b.onclick=f;row.appendChild(b)};
 if(a.length){btn(T.exportB,()=>{const stamp=new Date().toISOString().slice(0,16).replace(/[:T]/g,'-');download('roasted-reports-'+stamp+'.json',JSON.stringify({app:'RoastED',exported:new Date().toISOString(),version:(typeof BUILD!=='undefined'?BUILD:'?'),build:APP.kind,reports:a},null,1),'application/json');
   download('roasted-reports-'+stamp+'.txt',a.map(asText).join('\n\n-----\n\n'),'text/plain');mark(a.map(r=>r.id));refreshBadge();openReportList()});
  btn(T.shareAll,async()=>{const un=a.filter(r=>!r.sent),list=un.length?un:a;if(await shareText(list.map(asText).join('\n\n-----\n\n'))){mark(list.map(r=>r.id));refreshBadge();openReportList()}});
  if(a.some(r=>r.sent))btn(T.clearSent,()=>{if(confirm(T.confirmClear)){store(load().filter(r=>!r.sent));refreshBadge();openReportList()}})}
 p.appendChild(row);p.style.display='block'};
function refreshBadge(){const b=document.getElementById('sReports');if(!b)return;const a=load(),un=a.filter(r=>!r.sent).length;b.textContent=rt().list+(a.length?' ('+a.length+')':'')+(un?' • '+rt().unsent.replace('{n}',un):'')}
window.refreshReportBadge=refreshBadge;window.RoastedReports={load,asText,build,qid};
/* Settings entry */
(function(){const anchor=document.getElementById('buildV');if(!anchor||document.getElementById('sReports'))return;const b=document.createElement('button');b.type='button';b.id='sReports';b.className='card tile rep-tile';b.onclick=()=>openReportList();anchor.parentNode.insertBefore(b,anchor);refreshBadge()})();
/* report buttons on the Torture Bench and in conversations */
(function(){const bq=document.getElementById('bq');if(bq&&!document.getElementById('benchRep')){const b=el('button','mini rep-mini','🚩');b.type='button';b.id='benchRep';b.setAttribute('aria-label','Report a problem');b.onclick=()=>openReport('bench');bq.parentNode.insertBefore(b,bq.nextSibling)}
 const sc=document.getElementById('sceneCrumb');if(sc&&!document.getElementById('sceneRep')){const b=el('button','mini rep-mini','🚩');b.type='button';b.id='sceneRep';b.setAttribute('aria-label','Report a problem');b.onclick=()=>openReport('scene');sc.parentNode.insertBefore(b,sc.nextSibling)}})();
/* remember what the user picked, for the report */
const _ans=window.answer;if(typeof _ans==='function')window.answer=function(oi){try{const q=S.qs[S.i];S.lastPick=q&&q.o?q.o[oi]:undefined}catch(e){}return _ans.apply(this,arguments)};
/* language change: refresh the Settings label */
const _lab=window.labels;if(typeof _lab==='function')window.labels=function(){const r=_lab.apply(this,arguments);try{refreshBadge()}catch(e){}return r};
/* clear the remembered pick on each new question */
const _show=window.show;if(typeof _show==='function')window.show=function(){S.lastPick=undefined;return _show.apply(this,arguments)};
})();
