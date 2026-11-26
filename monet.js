/* RoastED — commercial model, fully configurable.
   ⚠ NOTHING HERE TAKES REAL PAYMENTS OR SHOWS REAL ADS.
   - Normal build: MONET_CFG.enabled = false → no limits, no locks, no ads (coherent learning experience).
   - QA build: qa.js switches the simulation on and supplies FAKE ads/purchases, clearly labelled.
   Prices and the exact free/premium split are NOT decided yet: every value below is a placeholder to tune later. */
window.MONET_CFG={
 enabled:false,
 undo:{perDay:3,refillAfterUsed:2,max:3},          /* 3 free "go back to correct" per day; after 2 used, a rewarded ad restores to 3 (no accumulation above 3) */
 hints:{perDay:3,perAd:1,adMaxPerDay:null},         /* 3 free hints per day; rewarded ad = +1 hint; daily ad limit NOT decided (null = no limit) */
 continueAfter:10,                                  /* after every 10 questions in a day: watch an ad to continue (0 = off) */
 /* free levels spread across all difficulty tiers — PLACEHOLDER split, to be decided:
    topic → list of free levels. '*' = default for topics not listed. Numbers: level = number tier. */
 freeLevels:{'*':[1],greet:[1,2,3],food:[1,2],travel:[1,3],pres:[1,2],past:[1,3],num:[1,2],adj:[1,2],dailylife:[1,3]},
 products:{                                         /* prices NOT decided (null) */
  lifetime:{price:null,label:'Lifetime Premium'},
  allLevels:{price:null,label:'Unlock all levels'},
  topic:{price:null,label:'Unlock this topic'}},
 lessonsLink:{menu:true,results:true,duringQuiz:false} /* link to private lessons: menu + results only, never during a quiz */
};
(function(){
const C=()=>window.MONET_CFG,ON=()=>!!C().enabled;
const K=s=>APP.store+'_'+s;
function get(k,d){try{return JSON.parse(localStorage.getItem(K(k))||'null')||d}catch(e){return d}}
function put(k,v){try{localStorage.setItem(K(k),JSON.stringify(v))}catch(e){}}
function ent(){return get('ent',{lifetime:false,allLevels:false,topics:[]})}
function daily(){let m=get('mon',null);if(!m||m.d!==day(0))m={d:day(0),undo:C().undo.perDay,hints:C().hints.perDay,adHints:0,q:0,allow:C().continueAfter};return m}
function saveDaily(m){put('mon',m)}
const premium=()=>{const e=ent();return !!e.lifetime};
function canAccess(tp,lv){if(!ON())return true;const e=ent();if(e.lifetime||e.allLevels||(e.topics||[]).includes(tp))return true;const f=C().freeLevels,l=f[tp]||f['*']||[];return l.includes(lv)}
/* ad + purchase providers: real ones do not exist; qa.js installs simulated ones */
const M=window.MONET={on:ON,premium,ent,daily,canAccess,
 showAd:(kind,done)=>{done&&done(false)},               /* replaced by the QA simulation */
 buy:(product,arg,done)=>{done&&done(false)},
 grant(product,arg){const e=ent();if(product==='lifetime')e.lifetime=true;else if(product==='allLevels')e.allLevels=true;else if(product==='topic'&&arg&&!e.topics.includes(arg))e.topics.push(arg);put('ent',e)},
 resetAll(){put('ent',{lifetime:false,allLevels:false,topics:[]});put('mon',null)},
 resetDaily(){put('mon',null)}};
const T={en:{locked:'🔒 This level is part of Premium.',lifetime:'⭐ Lifetime Premium',all:'🔓 Unlock all levels',topic:'🔓 Unlock this topic',later:'Not now',undoAd:'🎬 Watch an ad: get your 3 corrections back',undoNone:'No corrections left today.',hintAd:'🎬 Watch an ad: +1 hint',cont:'You did {n} questions today. Watch a short ad to continue?',contB:'🎬 Watch an ad and continue',stop:'Stop here'},
 it:{locked:'🔒 Questo livello fa parte di Premium.',lifetime:'⭐ Premium a vita',all:'🔓 Sblocca tutti i livelli',topic:'🔓 Sblocca questo argomento',later:'Non ora',undoAd:'🎬 Guarda un annuncio: torni a 3 correzioni',undoNone:'Correzioni finite per oggi.',hintAd:'🎬 Guarda un annuncio: +1 suggerimento',cont:'Oggi hai fatto {n} domande. Guardi un breve annuncio per continuare?',contB:'🎬 Guarda l\'annuncio e continua',stop:'Mi fermo qui'},
 fr:{locked:'🔒 Ce niveau fait partie de Premium.',lifetime:'⭐ Premium à vie',all:'🔓 Débloquer tous les niveaux',topic:'🔓 Débloquer ce sujet',later:'Pas maintenant',undoAd:'🎬 Regardez une pub: retrouvez vos 3 corrections',undoNone:'Plus de corrections aujourd’hui.',hintAd:'🎬 Regardez une pub: +1 indice',cont:'Vous avez fait {n} questions aujourd’hui. Regarder une courte pub pour continuer?',contB:'🎬 Regarder la pub et continuer',stop:'J’arrête ici'},
 de:{locked:'🔒 Diese Stufe gehört zu Premium.',lifetime:'⭐ Premium auf Lebenszeit',all:'🔓 Alle Stufen freischalten',topic:'🔓 Dieses Thema freischalten',later:'Nicht jetzt',undoAd:'🎬 Werbung ansehen: wieder 3 Korrekturen',undoNone:'Heute keine Korrekturen mehr.',hintAd:'🎬 Werbung ansehen: +1 Tipp',cont:'Sie haben heute {n} Fragen gemacht. Kurze Werbung ansehen und weitermachen?',contB:'🎬 Werbung ansehen und weiter',stop:'Hier aufhören'},
 af:{locked:'🔒 Hierdie vlak is deel van Premium.',lifetime:'⭐ Lewenslange Premium',all:'🔓 Ontsluit alle vlakke',topic:'🔓 Ontsluit hierdie onderwerp',later:'Nie nou nie',undoAd:'🎬 Kyk \'n advertensie: kry jou 3 regstellings terug',undoNone:'Geen regstellings oor vandag nie.',hintAd:'🎬 Kyk \'n advertensie: +1 wenk',cont:'Jy het vandag {n} vrae gedoen. Kyk \'n kort advertensie om aan te gaan?',contB:'🎬 Kyk die advertensie en gaan aan',stop:'Ek stop hier'},
 th:{locked:'🔒 ระดับนี้เป็นส่วนของพรีเมียม',lifetime:'⭐ พรีเมียมตลอดชีพ',all:'🔓 ปลดล็อกทุกระดับ',topic:'🔓 ปลดล็อกหัวข้อนี้',later:'ไว้ทีหลัง',undoAd:'🎬 ดูโฆษณา: ได้สิทธิ์แก้คำตอบคืน 3 ครั้ง',undoNone:'วันนี้ใช้สิทธิ์แก้คำตอบหมดแล้ว',hintAd:'🎬 ดูโฆษณา: +1 คำใบ้',cont:'วันนี้ทำไปแล้ว {n} ข้อ ดูโฆษณาสั้น ๆ เพื่อเล่นต่อไหม',contB:'🎬 ดูโฆษณาแล้วเล่นต่อ',stop:'พอแค่นี้'}};
const t=()=>T[S.n]||T.en;
function dlg(title,buttons){let p=document.getElementById('monPop');if(!p){p=document.createElement('div');p.id='monPop';p.className='tip-pop close-dlg ad-pop';p.setAttribute('role','dialog');document.body.appendChild(p)}
 p.innerHTML='';const b=document.createElement('b');b.className='dp-title';b.textContent=title;p.appendChild(b);const row=document.createElement('div');row.className='duel-btns';
 buttons.forEach(([l,f,cls])=>{const x=document.createElement('button');x.type='button';x.className=cls||'btn-roasted';x.textContent=l;x.onclick=()=>{p.style.display='none';f&&f()};row.appendChild(x)});p.appendChild(row);p.style.display='block'}
M.offer=function(tp,lv,then){const T_=t();dlg(T_.locked,[[T_.lifetime,()=>M.buy('lifetime',null,ok=>{if(ok)then&&then()})],[T_.all,()=>M.buy('allLevels',null,ok=>{if(ok)then&&then()})],[T_.topic,()=>M.buy('topic',tp,ok=>{if(ok)then&&then()})],[T_.later,null,'next-question-btn alt']])};
/* --- hooks: all of them do nothing unless MONET_CFG.enabled --- */
const _start=window.start;window.start=function(){if(ON()&&!S.boss&&!S.review&&!canAccess(S.topic,S.lvl)){const tp=S.topic,lv=S.lvl;M.offer(tp,lv,()=>_start.apply(this,[]));return}return _start.apply(this,arguments)};
const _sns=window.startNumSet;window.startNumSet=function(i){const lv=(NUM_DECADES[i]||[])[3]||1;if(ON()&&!canAccess('num',lv)){M.offer('num',lv,()=>_sns(i));return}return _sns.apply(this,arguments)};
const _rtm=window.renderTopicsMenu;window.renderTopicsMenu=function(){const r=_rtm.apply(this,arguments);if(ON())try{const kids=$('tpCards').children;curOrder().forEach((tp,i)=>{if(kids[i]&&!canAccess(tp,S.lvl)){const s=kids[i].querySelector('small');if(s)s.textContent='🔒 '+s.textContent}})}catch(e){}return r};
/* every rewarded ad goes through M.ad(): the reward callback can run ONCE only (no duplicate rewards, even on double taps) */
M.ad=function(kind,cb){let settled=false;try{M.showAd(kind,ok=>{if(settled)return;settled=true;cb(!!ok)})}catch(e){if(!settled){settled=true;cb(false)}}};
/* daily question allowance: after N questions, a rewarded ad lets you continue (failed/closed ad = still blocked) */
const _show=window.show;window.show=function(){const self=this;if(ON()&&!premium()&&C().continueAfter>0&&!S.duel){const m=daily();if(m.q>=m.allow){const T_=t();
  dlg(T_.cont.replace('{n}',m.q),[[T_.contB,()=>M.ad('continue',ok=>{if(ok){const d=daily();d.allow=d.q+C().continueAfter;saveDaily(d)}window.show.apply(self,[])})],[T_.stop,()=>nav('Menu'),'next-question-btn alt']]);return}}
 return _show.apply(this,arguments)};
/* corrections ("go back to correct"): 3 per day; after 2 used a rewarded ad refills to 3 (never above 3); Premium = unlimited */
function undoCore(q){const wi=S.wrong.lastIndexOf(q);if(wi>=0)S.wrong.splice(wi,1);S.wr=Math.max(0,(S.wr||0)-1);const d=daily();if(!S.duel&&d.q>0){d.q--;saveDaily(d)}show()}
function adBtn(){let a=document.getElementById('undoAd');if(!a){const ub=$('undoBtn');a=document.createElement('button');a.type='button';a.id='undoAd';a.className='next-question-btn alt';ub.parentNode.insertBefore(a,ub.nextSibling)}return a}
function paintUndo(q){const ub=$('undoBtn'),T_=t(),m=daily(),a=document.getElementById('undoAd');
 if(premium()){ub.style.display='block';ub.onclick=()=>undoCore(q);if(a)a.style.display='none';return}
 if(m.undo>0){ub.style.display='block';ub.onclick=()=>{const d=daily();if(d.undo<=0){paintUndo(q);return}d.undo--;saveDaily(d);undoCore(q)}}else ub.style.display='none';
 const used=C().undo.max-m.undo;
 if(used>=C().undo.refillAfterUsed){const b=adBtn();b.textContent=(m.undo>0?'':T_.undoNone+' ')+T_.undoAd;b.style.display='block';b.disabled=false;
  b.onclick=()=>{b.disabled=true;M.ad('undo',ok=>{if(ok){const d=daily();d.undo=C().undo.max;saveDaily(d)}b.disabled=false;paintUndo(q)})}}
 else if(a)a.style.display='none'}
const _ans=window.answer;window.answer=function(oi){const r=_ans.apply(this,arguments);if(!ON())return r;
 try{const q=S.qs[S.i],ok=oi===q.c;if(!S.duel&&!premium()){const m=daily();m.q++;saveDaily(m)}
  const a=document.getElementById('undoAd');if(ok||S.boss||S.duel){if(a)a.style.display='none';if(S.duel)$('undoBtn').style.display='none';return r}
  paintUndo(q)}catch(e){}return r};
const _show2=window.show;window.show=function(){const a=document.getElementById('undoAd');if(a)a.style.display='none';return _show2.apply(this,arguments)};
/* Torture Bench hints: 3 per day, a rewarded ad = +1 (daily ad limit configurable); Premium = unlimited.
   The app's own hint counter is redirected to these daily counters while the model is on. */
const _hs=window.hintState,_hsv=window.hintSave;
window.hintState=function(){if(!ON())return _hs.apply(this,arguments);return{d:day(0),n:premium()?99:daily().hints}};
window.hintSave=function(h){if(!ON())return _hsv.apply(this,arguments);if(premium())return;const d=daily();d.hints=Math.max(0,h.n);saveDaily(d)};
window.addEventListener('load',()=>{const hb=document.getElementById('hintBtn');if(!hb)return;const orig=hb.onclick;hb.onclick=function(ev){if(!ON()||premium())return orig&&orig.call(this,ev);
 const m=daily();if(m.hints>0)return orig&&orig.call(this,ev);const lim=C().hints.adMaxPerDay;if(lim!=null&&m.adHints>=lim){toast(nt().noHint,3000);return}
 dlg(nt().noHint,[[t().hintAd,()=>M.ad('hint',ok=>{if(ok){const d=daily();d.hints+=C().hints.perAd;d.adHints++;saveDaily(d);try{hb.textContent=nt().hint.replace('{n}',d.hints);hb.disabled=false}catch(e){}}})],[t().later,null,'next-question-btn alt']])}});
})();
