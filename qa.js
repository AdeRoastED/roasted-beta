/* RoastED — QA tools. Included ONLY in the QA build (the build script leaves this file out of the normal build).
   QA progress, settings, reports and caches are separate from the normal app (storage prefix 'roastedqa', cache 'roasted-qa-v…').
   All ads and purchases here are SIMULATED: no network, no payment, no ad SDK. */
(function(){
if(!window.APP||APP.kind!=='qa')return;
const K=s=>APP.store+'_qa_'+s;
const get=(k,d)=>{try{const v=localStorage.getItem(K(k));return v==null?d:JSON.parse(v)}catch(e){return d}};
const put=(k,v)=>{try{localStorage.setItem(K(k),JSON.stringify(v))}catch(e){}};
const LN={it:'Italiano',en:'English',fr:'Français',de:'Deutsch',th:'ไทย',af:'Afrikaans'};
/* ---------- ribbon + floating button ---------- */
const rib=document.createElement('div');rib.className='qa-ribbon';rib.textContent='QA BUILD · not for users';document.body.appendChild(rib);
const fab=document.createElement('button');fab.type='button';fab.className='qa-fab';fab.textContent='🧪';fab.setAttribute('aria-label','Open QA panel');fab.onclick=()=>openPanel();document.body.appendChild(fab);
/* ---------- monetization simulation ---------- */
MONET_CFG.enabled=get('monOn',true);
MONET.showAd=function(kind,done){const p=pop('qaAd','ad-pop');p.innerHTML='<b class="dp-title">🎬 SIMULATED AD ('+kind+')</b><p>QA only. No real advertising, no network.</p><p class="qa-count">3</p>';
 const row=document.createElement('div');row.className='duel-btns';const fin=document.createElement('button');fin.className='btn-roasted';fin.type='button';fin.textContent='✔ Finish ad (reward)';fin.disabled=true;
 const fail=document.createElement('button');fail.className='next-question-btn alt';fail.type='button';fail.textContent='✕ Close early (no reward)';row.appendChild(fin);row.appendChild(fail);p.appendChild(row);p.style.display='block';
 let n=3;const c=p.querySelector('.qa-count');const tm=setInterval(()=>{n--;c.textContent=n>0?n:'✔';if(n<=0){clearInterval(tm);fin.disabled=false}},1000);
 fin.onclick=()=>{p.style.display='none';log('ad '+kind+' rewarded');done&&done(true)};fail.onclick=()=>{clearInterval(tm);p.style.display='none';log('ad '+kind+' closed early');done&&done(false)}};
MONET.buy=function(product,arg,done){const p=pop('qaBuy','ad-pop');const cfg=MONET_CFG.products[product]||{};p.innerHTML='<b class="dp-title">💳 SIMULATED PURCHASE</b><p>'+(cfg.label||product)+(arg?' — '+arg:'')+'<br>Price: '+(cfg.price==null?'not decided':cfg.price)+'<br>QA only. No payment is made.</p>';
 const row=document.createElement('div');row.className='duel-btns';const ok=document.createElement('button');ok.className='btn-roasted';ok.type='button';ok.textContent='✔ Simulate successful purchase';const no=document.createElement('button');no.className='next-question-btn alt';no.type='button';no.textContent='✕ Simulate cancel / failure';
 row.appendChild(ok);row.appendChild(no);p.appendChild(row);p.style.display='block';ok.onclick=()=>{MONET.grant(product,arg);p.style.display='none';log('purchase '+product+' '+(arg||''));done&&done(true)};no.onclick=()=>{p.style.display='none';log('purchase cancelled '+product);done&&done(false)}};
function log(m){const a=get('log',[]);a.push(new Date().toISOString().slice(11,19)+' '+m);put('log',a.slice(-100))}
/* ---------- question IDs / answer overlay ---------- */
const _show=window.show;window.show=function(){const r=_show.apply(this,arguments);try{qaInfo()}catch(e){}return r};
function qaInfo(){let d=document.getElementById('qaInfo');const on=get('ids',true);if(!on){if(d)d.remove();return}const q=S.qs&&S.qs[S.i];if(!q)return;
 if(!d){d=document.createElement('div');d.id='qaInfo';d.className='qa-info';const qb=$('qbox');qb.parentNode.insertBefore(d,qb.nextSibling)}
 const id=RoastedReports.qid(q._e);d.textContent='ID '+id.qid+' ['+id.sig+'] · '+S.n+'→'+S.t+' · '+(q._e&&q._e.ns?'ns ':'')+(get('ans',false)?'✓ '+q.f:'');}
/* ---------- level item lists (same rules as the app) ---------- */
function levelItems(tp,lv){const sv=[S.topic,S.lvl,S.boss];S.topic=tp;S.lvl=lv;S.boss=0;let p=[];try{p=pool()}catch(e){}
 if(lv!=='all'&&!(TENSE.includes(tp)||BEGIN_ONLY.includes(tp)||(lv===3&&p.length<30)))p=p.slice((lv-1)*10,lv*10);[S.topic,S.lvl,S.boss]=sv;return p}
function allItems(tp){return (RE[S.n][tp]||[]).filter(e=>e.t[S.t]).map(mapq)}
function startQA(list,from,tp,lv){if(!list.length)return;S.boss=0;S.review=1;S.revMis=0;S.story=0;S.numset=0;S.benchAll=0;S.duel=null;S.undoUsed=0;S.topic=tp;S.lvl=typeof lv==='number'?lv:1;
 S.qs=list.slice(from).concat(list.slice(0,from));S.pool=S.qs.slice();S.i=0;S.sc=0;S.wrong=[];S.retry=0;S.wr=0;nav('Quiz');$('benchSec').style.display='none';$('wordList').style.display='none';
 $('drillT').textContent='🧪 QA · '+tp+' · '+(lv==='all'?'all levels':'L'+lv)+' · '+S.qs.length+' q';show()}
/* ---------- panel ---------- */
function pop(id,cls){let p=document.getElementById(id);if(!p){p=document.createElement('div');p.id=id;p.className='tip-pop close-dlg '+cls;p.setAttribute('role','dialog');document.body.appendChild(p)}return p}
function sel(opts,val,on){const s=document.createElement('select');opts.forEach(([v,l])=>{const o=document.createElement('option');o.value=v;o.textContent=l;if(String(v)===String(val))o.selected=true;s.appendChild(o)});s.onchange=()=>on(s.value);return s}
function openPanel(){const p=pop('qaPop','qa-pop');p.innerHTML='';const st=get('st',{n:S.n||'en',t:S.t||'it',tp:'food',lv:1});
 const close=document.createElement('button');close.className='dp-x';close.type='button';close.textContent='✕';close.onclick=()=>{p.style.display='none'};p.appendChild(close);
 const h=document.createElement('b');h.className='dp-title';h.textContent='🧪 QA panel · '+(typeof BUILD!=='undefined'?BUILD:'');p.appendChild(h);
 const info=document.createElement('p');info.className='qa-small';info.textContent='Storage: '+APP.store+'* · Cache: '+APP.cache+'* · separate from the normal app';p.appendChild(info);
 const L=Object.keys(LN).map(k=>[k,LN[k]]);const row=document.createElement('div');row.className='qa-row';
 const save=()=>put('st',st);
 row.appendChild(sel(L,st.n,v=>{st.n=v;if(st.t===v)st.t=v==='en'?'it':'en';save();openPanel()}));row.appendChild(document.createTextNode('→'));row.appendChild(sel(L.filter(x=>x[0]!==st.n),st.t,v=>{st.t=v;save();openPanel()}));p.appendChild(row);
 const box=document.createElement('div');box.className='qa-list';box.textContent='Loading…';
 Promise.all([loadData(st.n),loadData(st.t)]).then(()=>{if(S.n!==st.n||S.t!==st.t){S.n=st.n;S.t=st.t;try{localStorage.setItem(APP.store+'_native',S.n);localStorage.setItem(APP.store+'_target',S.t)}catch(e){}try{texts()}catch(e){}try{labels()}catch(e){}}
  const tps=TOP.filter(tp=>(RE[S.n][tp]||[]).some(e=>e.t[S.t]));if(!tps.includes(st.tp))st.tp=tps[0];
  const r2=document.createElement('div');r2.className='qa-row';r2.appendChild(sel(tps.map(tp=>[tp,(u().topics[TOP.indexOf(tp)]||tp)]),st.tp,v=>{st.tp=v;save();openPanel()}));
  r2.appendChild(sel([[1,'Level 1'],[2,'Level 2'],[3,'Level 3'],['all','All items']],st.lv,v=>{st.lv=v==='all'?'all':+v;save();openPanel()}));box.before(r2);
  const list=st.lv==='all'?allItems(st.tp):levelItems(st.tp,st.lv);box.innerHTML='';
  const go=document.createElement('button');go.type='button';go.className='btn-roasted';go.textContent='▶ Play these '+list.length+' questions';go.onclick=()=>{p.style.display='none';startQA(list,0,st.tp,st.lv)};box.appendChild(go);
  list.forEach((q,i)=>{const b=document.createElement('button');b.type='button';b.className='qa-q';const id=RoastedReports.qid(q._e);b.textContent=(i+1)+'. ['+id.qid+'] '+q.s+(q._e&&q._e.ns?'  ·ns':'');b.onclick=()=>{p.style.display='none';startQA(list,i,st.tp,st.lv)};box.appendChild(b)})}).catch(()=>{box.textContent='Could not load data'});
 p.appendChild(box);
 /* toggles */
 const tg=(label,key,def,after)=>{const l=document.createElement('label');l.className='qa-tog';const c=document.createElement('input');c.type='checkbox';c.checked=get(key,def);c.onchange=()=>{put(key,c.checked);after&&after(c.checked)};l.appendChild(c);l.appendChild(document.createTextNode(' '+label));p.appendChild(l)};
 tg('Show question ID under each question','ids',true);tg('Also show the correct answer (for checking content)','ans',false);
 tg('Simulate free/premium model (fake ads + purchases)','monOn',true,v=>{MONET_CFG.enabled=v});
 const e=MONET.ent(),m=MONET.daily();const ms=document.createElement('p');ms.className='qa-small';ms.textContent='Premium: '+(e.lifetime?'lifetime ':'')+(e.allLevels?'all-levels ':'')+((e.topics||[]).join(',')||'none')+' · today: corrections '+m.undo+', hints '+m.hints+', questions '+m.q+'/'+m.allow;p.appendChild(ms);
 const r3=document.createElement('div');r3.className='duel-btns';const bt=(l,f,c)=>{const b=document.createElement('button');b.type='button';b.className=c||'next-question-btn alt';b.textContent=l;b.onclick=f;r3.appendChild(b)};
 bt('⭐ Toggle simulated Lifetime Premium',()=>{const x=MONET.ent();if(x.lifetime){MONET.resetAll()}else MONET.grant('lifetime');openPanel()});
 bt('↺ Reset today\'s free counters',()=>{MONET.resetDaily();openPanel()});
 bt('↺ Remove all simulated purchases',()=>{MONET.resetAll();openPanel()});
 bt('📝 Reports',()=>{p.style.display='none';openReportList()});
 bt('🗑️ Reset ALL QA data (progress, reports, settings)',()=>{if(!confirm('Delete all QA data on this device? The normal RoastED app is not affected.'))return;const ks=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.indexOf(APP.store)===0)ks.push(k)}ks.forEach(k=>localStorage.removeItem(k));location.reload()});
 p.appendChild(r3);
 const lg=document.createElement('details');lg.innerHTML='<summary>Simulation log</summary>';const pre=document.createElement('pre');pre.className='qa-log';pre.textContent=get('log',[]).slice(-30).join('\n')||'—';lg.appendChild(pre);p.appendChild(lg);
 p.style.display='block'}
window.openQAPanel=openPanel;
})();
