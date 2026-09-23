/* ===========================================================================
   FleetWise — standalone PWA (Base44 replacement)
   Vanilla JS · IndexedDB storage · Anthropic AI (optional) · no login
   =========================================================================== */
'use strict';

/* ---------- icon set (lucide-style) ---------- */
const I = {
  truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  history:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  alert:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  clipboard:'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  calendar:'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  plus:'<path d="M5 12h14M12 5v14"/>',
  user:'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  warn:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4M12 17h.01"/>',
  bell:'<path d="M10.27 21a1.94 1.94 0 0 0 3.46 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  disc:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>',
  trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  menu:'<path d="M4 12h16M4 6h16M4 18h16"/>',
  settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  mappin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  sparkles:'<path d="M9.94 14.06 12 22l2.06-7.94L22 12l-7.94-2.06L12 2 9.94 9.94 2 12z"/>',
  trash:'<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
};
const icon = (n,cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]||''}</svg>`;

/* ---------- tiny DOM helpers ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const el = (tag,props={},...kids)=>{const e=document.createElement(tag);for(const k in props){if(k==='class')e.className=props[k];else if(k==='html')e.innerHTML=props[k];else if(k.startsWith('on'))e.addEventListener(k.slice(2).toLowerCase(),props[k]);else if(k==='dataset')Object.assign(e.dataset,props[k]);else if(props[k]!=null)e.setAttribute(k,props[k]);}for(const c of kids.flat()){if(c==null)continue;e.append(c.nodeType?c:document.createTextNode(c));}return e;};
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- formatting ---------- */
const DEPOTS=['DAB1 Aberdeen','DDD1 Dundee','DEH1 Edinburgh'];
const fmtDate=(ts,full)=>{if(!ts)return '—';const d=new Date(ts);return d.toLocaleString('en-GB',full?{weekday:'short',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}:{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});};
const fmtDay=ts=>ts?new Date(ts).toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short'}):'—';
const gbp=n=>'£'+Number(n||0).toLocaleString('en-GB');
const titleCase=s=>String(s||'').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const sevChip={minor:'warn',moderate:'warn',major:'danger',low:'ok',medium:'warn',high:'danger'};
const statusChip={pending:'warn',in_progress:'info',approved:'ok',completed:'ok',rejected:'danger',available:'ok',unavailable:'muted',maintenance:'warn',assigned:'info',audit_required:'danger',requires_action:'danger'};

window.FW = { icon, el, $, $$, esc, DEPOTS, fmtDate, fmtDay, gbp, titleCase, sevChip, statusChip };

/* ===========================================================================
   DB — IndexedDB with a Base44-compatible entity API
   base44.entities.X.{list,filter,create,update,delete,get,subscribe}
   =========================================================================== */
const DB_NAME='fleetwise', DB_VER=1;
const STORES=['Vehicle','VehicleAudit','AccidentReport','IncidentReport','MaintenanceRequest','TireReplacementRequest','BreakdownRequest','DAAvailability','Notification','Message','Chat','ChatMessage','OnboardingDocument','DrivingBehavior','User','_meta'];

function openDB(){
  return new Promise((res,rej)=>{
    const r=indexedDB.open(DB_NAME,DB_VER);
    r.onupgradeneeded=()=>{const db=r.result;STORES.forEach(s=>{if(!db.objectStoreNames.contains(s))db.createObjectStore(s,{keyPath:'id'});});};
    r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error);
  });
}
let _db=null, _mem=null;
const db=async()=>{ if(_db)return _db; try{ _db=await openDB(); return _db; }catch(e){ console.warn('IndexedDB unavailable, using in-memory store'); _mem=_mem||{}; STORES.forEach(s=>_mem[s]=_mem[s]||new Map()); return null; } };
function memStore(name){
  const map=_mem[name]; const tcb={};
  const fire=()=>{ setTimeout(()=>{ tcb.oncomplete&&tcb.oncomplete(); },0); };
  return {
    transaction:tcb,
    get(id){const r={};setTimeout(()=>{r.result=map.get(id);r.onsuccess&&r.onsuccess({target:r});},0);return r;},
    put(rec){map.set(rec.id,rec);fire();},
    delete(id){map.delete(id);fire();},
    clear(){map.clear();fire();},
    openCursor(){const r={};const items=[...map.values()];let i=0;setTimeout(()=>{const step=()=>{if(i<items.length){const val=items[i++];r.onsuccess&&r.onsuccess({target:{result:{value:val,continue:()=>setTimeout(step,0)}}});}else{r.onsuccess&&r.onsuccess({target:{result:null}});}};step();},0);return r;},
  };
}
async function tx(store,mode='readonly'){ const d=await db(); if(d)return d.transaction(store,mode).objectStore(store); return memStore(store); }
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);

const subscribers={}; // entity -> [fn]
function notify(entity){(subscribers[entity]||[]).forEach(fn=>{try{fn();}catch(e){}});}

function makeEntity(name){
  return {
    async list(sort,limit){
      const store=await tx(name);
      return new Promise(res=>{const out=[];const c=store.openCursor();c.onsuccess=e=>{const cur=e.target.result;if(cur){out.push(cur.value);cur.continue();}else res(applySort(out,sort,limit));};});
    },
    async filter(query,sort,limit){
      const all=await this.list();
      const matched=all.filter(r=>Object.entries(query||{}).every(([k,v])=>r[k]===v));
      return applySort(matched,sort,limit);
    },
    async get(id){const store=await tx(name);return new Promise(res=>{const r=store.get(id);r.onsuccess=()=>res(r.result||null);});},
    async create(data){
      const rec={id:uid(),created_date:new Date().toISOString(),updated_date:new Date().toISOString(),created_by:App.user?.email||'demo@fleetwise.app',...data};
      const store=await tx(name,'readwrite');store.put(rec);
      return new Promise(res=>{store.transaction.oncomplete=()=>{notify(name);res(rec);};});
    },
    async update(id,data){
      const cur=await this.get(id);const rec={...cur,...data,id,updated_date:new Date().toISOString()};
      const store=await tx(name,'readwrite');store.put(rec);
      return new Promise(res=>{store.transaction.oncomplete=()=>{notify(name);res(rec);};});
    },
    async delete(id){
      const store=await tx(name,'readwrite');store.delete(id);
      return new Promise(res=>{store.transaction.oncomplete=()=>{notify(name);res(true);};});
    },
    subscribe(fn){(subscribers[name]=subscribers[name]||[]).push(fn);return()=>{subscribers[name]=subscribers[name].filter(f=>f!==fn);};},
  };
}
function applySort(arr,sort,limit){
  if(sort){const desc=sort.startsWith('-');const key=desc?sort.slice(1):sort;arr.sort((a,b)=>{const x=a[key],y=b[key];return (x>y?1:x<y?-1:0)*(desc?-1:1);});}
  return limit?arr.slice(0,limit):arr;
}

const entities={};STORES.forEach(s=>{if(s!=='_meta')entities[s]=makeEntity(s);});

/* auth shim — login removed, identity follows the role switcher */
const ROLE_USERS={
  driver:{email:'driver@fleetwise.app',full_name:'Jordan Mills',role:'driver',depot:'DEH1 Edinburgh',transporter_id:'A1QX7K2',phone:'07700 900111'},
  manager:{email:'manager@fleetwise.app',full_name:'Sam Okafor',role:'manager',depot:'DDD1 Dundee',transporter_id:'MGR-204'},
  admin:{email:'admin@fleetwise.app',full_name:'Alex Rhodes',role:'admin',depot:'DAB1 Aberdeen',transporter_id:'ADM-001'},
};
const auth={
  async me(){return App.user;},
  async updateMe(data){App.user={...App.user,...data};return App.user;},
  async logout(){toast('Logout is disabled in test mode');},
  redirectToLogin(){},
};

const base44={entities,auth,integrations:{Core:{}}}; // integrations filled by ai.js section
window.base44=base44;

/* ===========================================================================
   AI / integrations — replaces base44.integrations.Core.*
   InvokeLLM: real Anthropic call when an API key is set, else demo generator
   =========================================================================== */
const settings={
  get apiKey(){return localStorage.getItem('fw_api_key')||'';},
  set apiKey(v){v?localStorage.setItem('fw_api_key',v):localStorage.removeItem('fw_api_key');},
  get demo(){return localStorage.getItem('fw_force_demo')==='1' || !this.apiKey;},
  set forceDemo(v){localStorage.setItem('fw_force_demo',v?'1':'0');},
  get model(){return localStorage.getItem('fw_model')||'claude-sonnet-4-6';},
};

async function InvokeLLM({prompt,response_json_schema,file_urls}){
  if(settings.demo) return demoLLM(prompt,response_json_schema,file_urls);
  const content=[];
  for(const u of (file_urls||[])){
    const m=/^data:(.*?);base64,(.*)$/.exec(u);
    if(m) content.push({type:'image',source:{type:'base64',media_type:m[1],data:m[2]}});
  }
  let p=prompt;
  if(response_json_schema) p+=`\n\nReturn ONLY a JSON object matching this schema (no markdown, no commentary):\n${JSON.stringify(response_json_schema)}`;
  content.push({type:'text',text:p});
  const res=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{'Content-Type':'application/json','x-api-key':settings.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
    body:JSON.stringify({model:settings.model,max_tokens:1500,temperature:0,messages:[{role:'user',content}]})
  });
  const data=await res.json();
  if(data.error) throw new Error(data.error.message||'AI error');
  let text=(data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('').trim();
  if(response_json_schema){
    text=text.replace(/```json/gi,'').replace(/```/g,'').trim();
    const a=text.indexOf('{'),b=text.lastIndexOf('}');
    if(a>-1&&b>-1)return JSON.parse(text.slice(a,b+1));
    throw new Error('Could not parse AI response');
  }
  return text;
}

/* deterministic PRNG seeded from actual photo bytes — so re-running on the SAME
   photos always returns the SAME result instead of fabricating new damage each time */
function hashPhotos(files){
  if(!files||!files.length)return 42;
  let h=2166136261;
  for(const f of files){
    const s=String(f);
    const sample=s.length+'|'+s.slice(40,160)+'|'+s.slice(-160);
    for(let i=0;i<sample.length;i++){h^=sample.charCodeAt(i);h=Math.imul(h,16777619);}
  }
  return h>>>0;
}
function seededRandom(seed){
  let s=seed>>>0;
  return function(){s|=0;s=(s+0x6D2B79F5)|0;let t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};
}
/* demo generator — fabricates believable, schema-shaped output */
function demoLLM(prompt,schema,files){
  return new Promise(res=>setTimeout(()=>{
    const p=(prompt||'').toLowerCase();
    if(p.includes('damage')&&(schema?.properties?.damage_detected||p.includes('detect'))){
      const rand=seededRandom(hashPhotos(files));
      const n=files&&files.length?Math.min(files.length,1+Math.floor(rand()*3)):1+Math.floor(rand()*2);
      const spots=[['Front bumper','scuff'],['Nearside front wing','dent'],['Offside rear door','scratch'],['Rear bumper','crack'],['Windscreen','chip'],['Alloy wheel','kerb damage'],['Wing mirror','cracked housing'],['Tailgate','dent']];
      const sevs=['minor','minor','moderate','major'];
      const used=new Set();const dmg=[];
      for(let i=0;i<n;i++){let s;do{s=spots[Math.floor(rand()*spots.length)];}while(used.has(s[0])&&used.size<spots.length);used.add(s[0]);
        const sev=sevs[Math.floor(rand()*sevs.length)];
        const base=sev==='major'?[450,1200]:sev==='moderate'?[180,420]:[60,160];
        dmg.push({location:s[0],severity:sev,type:s[1],description:`${titleCase(sev)} ${s[1]} on ${s[0].toLowerCase()}, consistent with low-speed contact.`,is_new:rand()>0.4,estimated_repair_cost_min:base[0],estimated_repair_cost_max:base[1],repair_action:sev==='major'?'panel repair / replace':sev==='moderate'?'smart repair':'monitor'});}
      const min=dmg.reduce((a,d)=>a+d.estimated_repair_cost_min,0),max=dmg.reduce((a,d)=>a+d.estimated_repair_cost_max,0);
      const worst=dmg.some(d=>d.severity==='major')?'poor':dmg.some(d=>d.severity==='moderate')?'fair':'good';
      return res({vehicle_present:true,vehicle_make:'Ford',vehicle_model:'Transit',vehicle_year:2021,image_quality:'good',damage_detected:dmg,total_estimated_cost_min:min,total_estimated_cost_max:max,overall_condition:worst,safety_critical:dmg.some(d=>/windscreen|wheel|tyre|mirror/i.test(d.location)&&d.severity!=='minor'),summary:`${dmg.length} item(s) of visible exterior damage detected. Overall condition assessed as ${worst}. Estimated repair ${gbp(min)}–${gbp(max)}.`,confidence:78+Math.floor(rand()*15)});
    }
    if(schema?.properties?.critical_vehicles){
      return res({critical_vehicles:[{vehicle_number:'SF21 XYZ',risk_level:'high',issue:'Recurring offside damage across 3 audits',recommendation:'Inspect suspension & book body shop within 7 days',estimated_days_until_failure:9},{vehicle_number:'LD70 KFP',risk_level:'medium',issue:'Tyre wear trend on nearside front',recommendation:'Rotate/replace tyres at next service',estimated_days_until_failure:21}],summary:'2 vehicles flagged from damage-trend analysis. 1 high-risk requiring action this week.'});
    }
    // generic fallback
    const out={};if(schema?.properties)for(const k in schema.properties){const t=schema.properties[k].type;out[k]=t==='array'?[]:t==='number'?0:t==='boolean'?false:'(demo) generated value';}
    out.summary='Demo response generated locally (no API key set).';
    res(out);
  }, 1400+Math.random()*900));
}

async function UploadFile({file}){ // returns {file_url} — stored locally as data URL
  return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res({file_url:r.result});r.onerror=rej;r.readAsDataURL(file);});
}
async function SendEmail(opts){console.info('[demo email]',opts);return{success:true};}

Object.assign(base44.integrations.Core,{InvokeLLM,UploadFile,SendEmail});
window.FW.settings=settings; window.FW.InvokeLLM=InvokeLLM;

/* ---------- image resize (keeps stored photos small) ---------- */
function resizeImage(file,maxDim=1024,quality=0.8){
  return new Promise(res=>{const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const sc=Math.min(1,maxDim/Math.max(img.width,img.height));const w=Math.round(img.width*sc),h=Math.round(img.height*sc);const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);res(c.toDataURL('image/jpeg',quality));};img.onerror=()=>res(r.result);img.src=r.result;};r.readAsDataURL(file);});
}
window.FW.resizeImage=resizeImage;

/* ===========================================================================
   SEED — demo fleet data so every screen is populated for testing
   =========================================================================== */
async function seedIfEmpty(force){
  const meta=await tx('_meta'); const done=await new Promise(r=>{const q=meta.get('seeded');q.onsuccess=()=>r(q.result);});
  if(done && !force) return;
  if(force){ for(const s of STORES){ if(s==='_meta')continue; const st=await tx(s,'readwrite'); st.clear(); } }
  const now=Date.now(), day=864e5;
  const vehicles=[
    {vehicle_number:'SF21 XYZ',vehicle_type:'van',make:'Ford',model:'Transit',year:2021,depot_location:'DEH1 Edinburgh',assigned_to_email:'driver@fleetwise.app',assigned_to_name:'Jordan Mills',transporter_id:'A1QX7K2',status:'assigned',mileage:48210,insurance_expiry:new Date(now+40*day).toISOString().slice(0,10)},
    {vehicle_number:'LD70 KFP',vehicle_type:'van',make:'Mercedes',model:'Sprinter',year:2020,depot_location:'DDD1 Dundee',assigned_to_name:'Priya Shah',transporter_id:'B7TT2M9',status:'available',mileage:71540,insurance_expiry:new Date(now+9*day).toISOString().slice(0,10)},
    {vehicle_number:'SA19 LMN',vehicle_type:'van',make:'Vauxhall',model:'Vivaro',year:2019,depot_location:'DAB1 Aberdeen',status:'maintenance',mileage:96320,insurance_expiry:new Date(now+120*day).toISOString().slice(0,10)},
    {vehicle_number:'SG22 RTX',vehicle_type:'truck',make:'DAF',model:'LF',year:2022,depot_location:'DDD1 Dundee',status:'audit_required',mileage:33110,insurance_expiry:new Date(now+200*day).toISOString().slice(0,10)},
  ];
  for(const v of vehicles) await entities.Vehicle.create(v);

  const drivers=[
    {full_name:'Jordan Mills',email:'driver@fleetwise.app',role:'driver',depot:'DEH1 Edinburgh',transporter_id:'A1QX7K2',phone:'07700 900111',status:'active'},
    {full_name:'Priya Shah',email:'driver2@fleetwise.app',role:'driver',depot:'DDD1 Dundee',transporter_id:'B7TT2M9',phone:'07700 900222',status:'active'},
    {full_name:'Connor Reid',email:'driver3@fleetwise.app',role:'driver',depot:'DAB1 Aberdeen',transporter_id:'C3RR9P1',phone:'07700 900333',status:'active'},
  ];
  for(const d of drivers) await entities.User.create(d);

  await entities.MaintenanceRequest.create({vehicle_number:'SF21 XYZ',delivery_associate:'Jordan Mills',home_site_location:'DEH1 Edinburgh',issue_type:'brakes',description:'Grinding noise from front brakes under load.',urgency:'high',current_mileage:48210,status:'pending',created_by:'driver@fleetwise.app'});
  await entities.MaintenanceRequest.create({vehicle_number:'LD70 KFP',delivery_associate:'Priya Shah',home_site_location:'DDD1 Dundee',issue_type:'warning_light',description:'Engine management light intermittent.',urgency:'medium',current_mileage:71540,status:'in_progress',created_by:'driver2@fleetwise.app'});
  await entities.TireReplacementRequest.create({vehicle_number:'SF21 XYZ',delivery_associate:'Jordan Mills',home_site_location:'DEH1 Edinburgh',tire_position:'front_nearside',tire_size:'215/65 R16',reason:'worn',description:'Tread below limit on nearside front.',urgency:'medium',current_mileage:48210,status:'pending',created_by:'driver@fleetwise.app'});
  await entities.AccidentReport.create({vehicle_number:'SA19 LMN',delivery_associate:'Connor Reid',home_site_location:'DAB1 Aberdeen',accident_date:new Date(now-2*day).toISOString(),location:'Union Street, Aberdeen',weather_conditions:'rain',description:'Low-speed contact with bollard while reversing.',severity:'minor',injuries:false,police_involved:false,status:'pending',created_by:'driver3@fleetwise.app'});
  await entities.IncidentReport.create({vehicle_number:'LD70 KFP',delivery_associate:'Priya Shah',home_site_location:'DDD1 Dundee',contact_number:'07700 900222',incident_date:new Date(now-5*day).toISOString(),location:'Depot yard',da_statement:'Slipped on wet ramp carrying parcels.',injury_sustained:'Bruised wrist',correct_ppe_worn:true,status:'pending',created_by:'driver2@fleetwise.app'});

  await entities.VehicleAudit.create({vehicle_number:'SG22 RTX',vehicle_make:'DAF',vehicle_model:'LF',audit_type:'routine',exterior_photos:[],damage_detected:[{location:'Front bumper',severity:'moderate',type:'crack',description:'Cracked lower valance.',is_new:true,estimated_repair_cost_min:180,estimated_repair_cost_max:420}],total_estimated_cost_min:180,total_estimated_cost_max:420,overall_condition:'fair',mileage:33110,fuel_level:'half',cleanliness:'good',audit_status:'completed',created_by:'manager@fleetwise.app'});

  for(let i=0;i<6;i++){const d=new Date(now+i*day);await entities.DAAvailability.create({date:d.toISOString().slice(0,10),status:i%4===0?'unavailable':'available',manager_status:'pending',shift_start:'08:00',shift_end:'18:00',created_by:'driver@fleetwise.app'});}

  await entities.Notification.create({user_email:'driver@fleetwise.app',title:'Maintenance request received',message:'Your brake request for SF21 XYZ is pending review.',type:'maintenance',priority:'high',read:false});
  await entities.Notification.create({user_email:'driver@fleetwise.app',title:'Audit due',message:'SG22 RTX requires a routine audit this week.',type:'audit',priority:'medium',read:false});
  await entities.Message.create({subject:'Locker access',message:'Can I get access to the Dundee depot locker?',priority:'normal',status:'open',created_by:'driver@fleetwise.app'});

  const m2=await tx('_meta','readwrite'); m2.put({id:'seeded',value:true,at:Date.now()});
  await new Promise(r=>{m2.transaction.oncomplete=r;});
}
window.FW.seedIfEmpty=seedIfEmpty;

/* ===========================================================================
   UI helpers — toast & modal
   =========================================================================== */
let toastTimer;
function toast(msg,kind='ok'){
  $$('.toast').forEach(t=>t.remove());
  const t=el('div',{class:'toast'},el('span',{html:icon(kind==='ok'?'check':kind==='err'?'x':'bell')}),msg);
  document.body.append(t);clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.remove(),2600);
}
function modal(title,bodyNode,actions){
  const bg=el('div',{class:'modal-bg',onClick:e=>{if(e.target===bg)bg.remove();}});
  const m=el('div',{class:'modal'});
  m.append(el('h3',{},title));
  if(typeof bodyNode==='string')m.append(el('div',{html:bodyNode}));else if(bodyNode)m.append(bodyNode);
  if(actions)m.append(el('div',{class:'row',style:'margin-top:16px;justify-content:flex-end'},...actions));
  bg.append(m);document.body.append(bg);return bg;
}
window.FW.toast=toast; window.FW.modal=modal;

/* ===========================================================================
   APP — state, navigation, router, shell
   =========================================================================== */
const App={user:ROLE_USERS.driver,role:'driver',route:'Dashboard',navOpen:false};
window.App=App;

const NAV={
  driver:[
    {g:'Driver',items:[['Dashboard','chart'],['VehicleAudit','clipboard'],['DAAvailability','calendar'],['NewRequest','alert'],['MyRequests','history'],['Chats','msg'],['NotificationCenter','bell'],['Profile','user']]},
  ],
  manager:[
    {g:'Manager',items:[['ManagerDashboard','shield'],['DriverManagement','users'],['TeamAvailability','calendar'],['Onboarding','truck'],['NewRequest','plus']]},
    {g:'Fleet',items:[['FleetDashboard','truck'],['AuditTracking','clipboard'],['NewDamages','warn'],['DamageTrends','trend'],['Reports','chart'],['GlobalSearch','search']]},
  ],
  admin:[
    {g:'Admin',items:[['AdminDashboard','shield'],['FleetDashboard','truck'],['DriverManagement','users'],['AuditTracking','clipboard'],['Reports','chart'],['AdminMessages','msg'],['GlobalSearch','search']]},
  ],
};
const PAGE_TITLES={Dashboard:['Dashboard','Your fleet at a glance'],VehicleAudit:['Vehicle Audit','AI-assisted walkaround inspection'],DAAvailability:['My Availability','Set your working days'],NewRequest:['New Request','Report an issue or request support'],MyRequests:['My Requests','Track everything you have submitted'],Chats:['Chat','Message your team'],NotificationCenter:['Notifications','Alerts and updates'],Profile:['My Profile','Your details'],ManagerDashboard:['Manager Dashboard','Team & fleet overview'],DriverManagement:['Driver Management','Your delivery associates'],TeamAvailability:['Team Availability','Who is working this week'],Onboarding:['Onboarding','New starter documents'],FleetDashboard:['Fleet Dashboard','Vehicles & status'],AuditTracking:['Audit Tracking','Inspection history'],NewDamages:['New Damages','Recently detected damage'],DamageTrends:['Damage Trends','AI pattern analysis'],Reports:['Reports & Analytics','Operational metrics'],GlobalSearch:['Global Search','Find anything'],AdminDashboard:['Admin Dashboard','System overview'],AdminMessages:['User Messages','Driver enquiries'],Settings:['Settings','AI & data']};

function renderShell(){
  document.body.innerHTML='';
  const app=el('div',{class:'app'+(App.navOpen?' nav-open':'')});

  // sidebar
  const side=el('aside',{class:'sidebar'});
  side.append(el('div',{class:'brand'},
    el('div',{class:'logo',html:icon('truck')}),
    el('div',{},el('div',{class:'nm'},'FleetWise'),el('div',{class:'tg'},'Fleet Ops'))
  ));
  const nav=el('div',{class:'navscroll'});
  NAV[App.role].forEach(grp=>{
    nav.append(el('div',{class:'navgroup-label'},grp.g));
    grp.items.forEach(([route,ic])=>{
      const item=el('a',{class:'navitem'+(App.route===route?' active':''),href:'#'+route,html:icon(ic)+'<span>'+(PAGE_TITLES[route]?.[0]||route)+'</span>'});
      if(route==='NotificationCenter'&&App._unread)item.append(el('span',{class:'badge'},String(App._unread)));
      nav.append(item);
    });
  });
  nav.append(el('div',{class:'navgroup-label'},'System'));
  nav.append(el('a',{class:'navitem'+(App.route==='Settings'?' active':''),href:'#Settings',html:icon('settings')+'<span>Settings</span>'}));
  side.append(nav);
  side.append(el('div',{class:'foot'},el('div',{class:'userchip'},
    el('div',{class:'av'},(App.user.full_name||'U').split(' ').map(w=>w[0]).join('').slice(0,2)),
    el('div',{},el('div',{class:'nm'},App.user.full_name),el('div',{class:'rl'},titleCase(App.role)+' · '+(App.user.depot||'')))
  )));
  app.append(side);
  app.append(el('div',{class:'backdrop',onClick:()=>{App.navOpen=false;renderShell();}}));

  // main
  const main=el('div',{class:'main'});
  const [title,sub]=PAGE_TITLES[App.route]||[App.route,''];
  const top=el('header',{class:'topbar'});
  top.append(el('button',{class:'iconbtn menu',html:icon('menu'),onClick:()=>{App.navOpen=!App.navOpen;renderShell();}}));
  top.append(el('div',{},el('h1',{},title),el('div',{class:'sub'},sub)));
  top.append(el('div',{class:'spacer'}));
  const rs=el('div',{class:'roleswitch'});
  rs.append(el('span',{class:'rl-txt',style:'font-size:11px;color:var(--muted);align-self:center;padding:0 6px;font-weight:600'},'View as'));
  ['driver','manager','admin'].forEach(r=>rs.append(el('button',{class:App.role===r?'on':'',onClick:()=>switchRole(r)},titleCase(r))));
  top.append(rs);
  const bell=el('button',{class:'iconbtn',html:icon('bell'),onClick:()=>go('NotificationCenter')});
  if(App._unread)bell.append(el('span',{class:'dot'}));
  top.append(bell);
  main.append(top);
  const content=el('main',{class:'content',id:'content'});
  main.append(content);
  app.append(main);
  document.body.append(app);

  renderPage(content);
}

function switchRole(r){App.role=r;App.user=ROLE_USERS[r];const first=NAV[r][0].items[0][0];App.route=first;location.hash=first;renderShell();toast('Viewing as '+titleCase(r));}
function go(route){location.hash=route;}

async function refreshBadges(){
  try{const notes=await entities.Notification.filter({user_email:App.user.email});App._unread=notes.filter(n=>!n.read).length;}catch(e){App._unread=0;}
}

window.addEventListener('hashchange',()=>{const r=location.hash.slice(1)||'Dashboard';App.route=r;App.navOpen=false;renderShell();});

async function boot(){
  await seedIfEmpty();
  await refreshBadges();
  App.route=location.hash.slice(1)||(App.role==='driver'?'Dashboard':NAV[App.role][0].items[0][0]);
  renderShell();
  if('serviceWorker' in navigator){try{await navigator.serviceWorker.register('./sw.js');}catch(e){}}
}

/* ===========================================================================
   Generic form engine — drives all request forms from field specs
   =========================================================================== */
function field(spec,state){
  const wrap=el('label',{class:'fld'+(spec.full?' full':'')});
  if(spec.full)wrap.style.gridColumn='1 / -1';
  if(spec.type!=='checkbox')wrap.append(el('span',{html:esc(spec.label)+(spec.required?' <span class="req">*</span>':'')}));
  let input;
  if(spec.type==='select'){
    input=el('select',{class:'inp'});
    input.append(el('option',{value:''},spec.placeholder||'Select…'));
    spec.options.forEach(o=>{const v=Array.isArray(o)?o[0]:o,l=Array.isArray(o)?o[1]:titleCase(o);input.append(el('option',{value:v},l));});
    input.value=state[spec.key]||'';
    input.onchange=()=>state[spec.key]=input.value;
  }else if(spec.type==='textarea'){
    input=el('textarea',{class:'inp',placeholder:spec.placeholder||''});input.value=state[spec.key]||'';
    input.oninput=()=>state[spec.key]=input.value;
  }else if(spec.type==='checkbox'){
    input=el('input',{type:'checkbox'});input.checked=!!state[spec.key];
    input.onchange=()=>state[spec.key]=input.checked;
    wrap.style.display='flex';wrap.style.alignItems='center';wrap.style.gap='9px';
    wrap.append(input,el('span',{style:'margin:0',html:esc(spec.label)}));
    return wrap;
  }else if(spec.type==='photos'||spec.type==='photo'){
    return photoField(spec,state);
  }else{
    input=el('input',{class:'inp',type:spec.type||'text',placeholder:spec.placeholder||'',maxlength:spec.maxlength});
    input.value=state[spec.key]||'';
    input.oninput=()=>state[spec.key]=input.value;
  }
  wrap.append(input);
  return wrap;
}
function photoField(spec,state){
  const wrap=el('label',{class:'fld'});wrap.style.gridColumn='1 / -1';
  wrap.append(el('span',{html:esc(spec.label)+(spec.required?' <span class="req">*</span>':'')}));
  state[spec.key]=state[spec.key]||(spec.type==='photo'?'':[]);
  const dz=el('div',{class:'dropzone',html:icon('camera')+'<div>Tap to add photo'+(spec.type==='photos'?'s':'')+'</div>'});
  const input=el('input',{type:'file',accept:'image/*',multiple:spec.type==='photos',style:'display:none'});
  if(spec.capture)input.setAttribute('capture','environment');
  const grid=el('div',{class:'photos'});
  const draw=()=>{grid.innerHTML='';const arr=spec.type==='photo'?(state[spec.key]?[state[spec.key]]:[]):state[spec.key];
    arr.forEach((src,i)=>{const ph=el('div',{class:'photo'},el('img',{src}),el('button',{class:'x',type:'button',html:'×',onClick:()=>{if(spec.type==='photo')state[spec.key]='';else state[spec.key].splice(i,1);draw();}}));grid.append(ph);});};
  dz.onclick=()=>input.click();
  input.onchange=async()=>{for(const f of input.files){const data=await resizeImage(f,1024,0.78);if(spec.type==='photo')state[spec.key]=data;else state[spec.key].push(data);}input.value='';draw();};
  wrap.append(dz,input,grid);draw();return wrap;
}
function buildForm(fields,state,onSubmit,submitLabel){
  const form=el('form',{onSubmit:e=>{e.preventDefault();
    for(const f of fields){if(f.required&&!state[f.key]&&!(Array.isArray(state[f.key])&&state[f.key].length)){toast('Please complete: '+f.label,'err');return;}}
    onSubmit();}});
  const grid=el('div',{class:'formgrid'});
  fields.forEach(f=>grid.append(field(f,state)));
  form.append(grid);
  form.append(el('button',{class:'btn primary full',type:'submit',html:icon('check')+(submitLabel||'Submit')}));
  return form;
}
window.FW.buildForm=buildForm;

/* ---------- request form field specs ---------- */
const REQUEST_FORMS={
  Accident:{entity:'AccidentReport',icon:'car',color:'var(--danger)',title:'Accident Report',desc:'Report a road traffic accident',fields:[
    {key:'vehicle_number',label:'Vehicle registration',required:true,maxlength:16},
    {key:'delivery_associate',label:'Delivery associate'},
    {key:'home_site_location',label:'Depot',type:'select',options:DEPOTS,required:true},
    {key:'accident_date',label:'Date & time of accident',type:'datetime-local',required:true},
    {key:'location',label:'Accident location',full:true},
    {key:'weather_conditions',label:'Weather',type:'select',options:['dry','rain','snow','ice','fog']},
    {key:'severity',label:'Severity',type:'select',options:['minor','moderate','severe'],required:true},
    {key:'description',label:'What happened?',type:'textarea',full:true,required:true},
    {key:'injuries',label:'Were there any injuries?',type:'checkbox'},
    {key:'police_involved',label:'Police involved?',type:'checkbox'},
    {key:'other_party_involved',label:'Third party involved?',type:'checkbox'},
    {key:'your_vehicle_photos',label:'Photos of your vehicle',type:'photos',capture:true},
    {key:'driver_signature_confirmation',label:'I confirm this report is accurate',type:'checkbox'},
  ]},
  Incident:{entity:'IncidentReport',icon:'warn',color:'var(--warn)',title:'Incident / Injury Report',desc:'Report a workplace incident or injury',fields:[
    {key:'home_site_location',label:'Depot',type:'select',options:DEPOTS,required:true},
    {key:'delivery_associate',label:'Delivery associate'},
    {key:'contact_number',label:'Contact number',type:'tel'},
    {key:'incident_date',label:'Date & time',type:'datetime-local',required:true},
    {key:'location',label:'Location',full:true},
    {key:'da_statement',label:'Your statement',type:'textarea',full:true,required:true},
    {key:'injury_sustained',label:'Injury sustained (if any)',full:true},
    {key:'correct_ppe_worn',label:'Correct PPE worn?',type:'checkbox'},
    {key:'witness_available',label:'Witness available?',type:'checkbox'},
    {key:'photos_urls',label:'Photos',type:'photos',capture:true},
  ]},
  Maintenance:{entity:'MaintenanceRequest',icon:'wrench',color:'var(--brand-2)',title:'Maintenance Request',desc:'Book a repair or report a fault',fields:[
    {key:'vehicle_number',label:'Vehicle registration',required:true,maxlength:16},
    {key:'delivery_associate',label:'Delivery associate'},
    {key:'home_site_location',label:'Depot',type:'select',options:DEPOTS,required:true},
    {key:'issue_type',label:'Issue type',type:'select',options:['brakes','engine','tyres','electrical','warning_light','bodywork','other'],required:true},
    {key:'urgency',label:'Urgency',type:'select',options:['low','medium','high'],required:true},
    {key:'current_mileage',label:'Current mileage',type:'number'},
    {key:'description',label:'Describe the issue',type:'textarea',full:true,required:true},
    {key:'dashboard_photo_url',label:'Dashboard / fault photo',type:'photo',capture:true},
  ]},
  Tire:{entity:'TireReplacementRequest',icon:'disc',color:'#0f172a',title:'Tyre Replacement',desc:'Request a tyre change',fields:[
    {key:'vehicle_number',label:'Vehicle registration',required:true,maxlength:16},
    {key:'delivery_associate',label:'Delivery associate'},
    {key:'home_site_location',label:'Depot',type:'select',options:DEPOTS,required:true},
    {key:'tire_position',label:'Tyre position',type:'select',options:[['front_nearside','Front nearside'],['front_offside','Front offside'],['rear_nearside','Rear nearside'],['rear_offside','Rear offside'],['spare','Spare']],required:true},
    {key:'tire_size',label:'Tyre size',placeholder:'e.g. 215/65 R16'},
    {key:'reason',label:'Reason',type:'select',options:['worn','puncture','damage','blowout']},
    {key:'urgency',label:'Urgency',type:'select',options:['low','medium','high'],required:true},
    {key:'current_mileage',label:'Current mileage',type:'number'},
    {key:'description',label:'Notes',type:'textarea',full:true},
    {key:'tire_photos',label:'Tyre photos',type:'photos',capture:true},
  ]},
  Breakdown:{entity:'BreakdownRequest',icon:'alert',color:'#ea580c',title:'Breakdown / Recovery',desc:'Request roadside assistance now',fields:[
    {key:'vehicle_number',label:'Vehicle registration',required:true,maxlength:16},
    {key:'delivery_associate',label:'Delivery associate'},
    {key:'home_site_location',label:'Depot',type:'select',options:DEPOTS,required:true},
    {key:'location',label:'Your current location',full:true,required:true},
    {key:'issue_type',label:'Problem',type:'select',options:['wont_start','flat_tyre','accident','warning_light','out_of_fuel','other'],required:true},
    {key:'description',label:'Describe what happened',type:'textarea',full:true,required:true},
    {key:'safe_location',label:'Are you in a safe location?',type:'checkbox'},
  ]},
};
window.FW.REQUEST_FORMS=REQUEST_FORMS;

/* ===========================================================================
   PAGES
   =========================================================================== */
function statCard(label,val,ic,delta,color){
  return el('div',{class:'card stat'},
    el('div',{class:'lab',html:icon(ic)+'<span>'+esc(label)+'</span>'}),
    el('div',{class:'val',style:color?('color:'+color):''},String(val)),
    delta?el('div',{class:'delta'},delta):null);
}
function chip(text,kind){return el('span',{class:'chip '+(kind||'muted')},titleCase(text));}
async function loadAllRequests(mine){
  const types=[['AccidentReport','Accident','car'],['IncidentReport','Incident','warn'],['MaintenanceRequest','Maintenance','wrench'],['TireReplacementRequest','Tyre','disc'],['BreakdownRequest','Breakdown','alert']];
  let out=[];
  for(const [ent,label,ic] of types){
    const rows=mine?await entities[ent].filter({created_by:App.user.email}):await entities[ent].list();
    rows.forEach(r=>out.push({...r,_type:label,_icon:ic,_entity:ent}));
  }
  out.sort((a,b)=>(b.created_date>a.created_date?1:-1));
  return out;
}
function requestRow(r){
  const sev=r.severity||r.urgency||r.status;
  const row=el('a',{class:'listrow',href:'javascript:void 0',onClick:()=>openRequestDetail(r)});
  row.append(el('span',{class:'band',style:'background:'+(REQUEST_FORMS[r._type]?.color||'var(--brand-2)')}));
  row.append(el('div',{class:'ic',style:'width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex:none;background:var(--surface-2);color:var(--slate)',html:icon(r._icon)}));
  row.append(el('div',{style:'flex:1;min-width:0'},
    el('div',{class:'ttl'},r._type+' · '+(r.vehicle_number||r.home_site_location||'—')),
    el('div',{class:'mt'},(r.description||r.da_statement||r.issue_type||'').slice(0,70)+' · '+fmtDate(r.created_date))));
  const rt=el('div',{class:'rt'});
  rt.append(chip(r.status||'pending',statusChip[r.status]||'warn'));
  if(r.urgency||r.severity)rt.append(chip(r.urgency||r.severity,sevChip[r.urgency||r.severity]||'muted'));
  row.append(rt);
  return row;
}
function openRequestDetail(r){
  const body=el('div',{});
  const spec=REQUEST_FORMS[r._type];
  body.append(el('div',{class:'row',style:'margin:8px 0 14px'},chip(r.status||'pending',statusChip[r.status]||'warn'),r.urgency?chip(r.urgency,sevChip[r.urgency]):null,r.severity?chip(r.severity,sevChip[r.severity]):null));
  const dl=el('div',{class:'grid',style:'gap:8px'});
  const skip=new Set(['id','_type','_icon','_entity','created_date','updated_date','created_by','status']);
  Object.entries(r).forEach(([k,v])=>{
    if(skip.has(k)||v==null||v==='')return;
    if(Array.isArray(v)&&v.length&&typeof v[0]==='string'&&v[0].startsWith('data:')){
      dl.append(el('div',{},el('div',{style:'font-size:12px;color:var(--muted);font-weight:600;margin-bottom:5px'},titleCase(k)),el('div',{class:'photos'},...v.map(src=>el('div',{class:'photo'},el('img',{src}))))));return;
    }
    if(typeof v==='string'&&v.startsWith('data:')){dl.append(el('div',{},el('div',{style:'font-size:12px;color:var(--muted);font-weight:600;margin-bottom:5px'},titleCase(k)),el('div',{class:'photo',style:'max-width:160px'},el('img',{src:v}))));return;}
    if(typeof v==='object')return;
    dl.append(el('div',{style:'display:flex;justify-content:space-between;gap:14px;border-bottom:1px solid var(--line);padding:7px 0'},el('span',{style:'color:var(--muted);font-size:13px'},titleCase(k)),el('b',{style:'font-size:13px;text-align:right'},typeof v==='boolean'?(v?'Yes':'No'):String(v))));
  });
  body.append(dl);
  const actions=[el('button',{class:'btn ghost',onClick:e=>e.target.closest('.modal-bg').remove()},'Close')];
  if(App.role!=='driver'){
    actions.unshift(el('button',{class:'btn primary',onClick:async e=>{await entities[r._entity].update(r.id,{status:'approved'});e.target.closest('.modal-bg').remove();toast('Marked approved');renderShell();},html:icon('check')+'Approve'}));
  }
  modal(r._type+' · '+(r.vehicle_number||''),body,actions);
}

async function pageDashboard(c){
  const reqs=await loadAllRequests(true);
  const avail=await entities.DAAvailability.filter({created_by:App.user.email});
  const pending=reqs.filter(r=>(r.status||'pending')==='pending').length;
  c.append(el('div',{class:'banner info',html:icon('sparkles')+'<div><div class="bt">Welcome back, '+esc(App.user.full_name.split(' ')[0])+'</div><div class="bd">Login is disabled for testing — use the “View as” switch (top right) to explore Driver, Manager and Admin.</div></div>'}));
  const sg=el('div',{class:'statgrid'});
  sg.append(statCard('Open requests',pending,'history',pending?'Awaiting review':'All clear',pending?'var(--warn)':'var(--ok)'));
  sg.append(statCard('Total submitted',reqs.length,'file'));
  sg.append(statCard('Days available',avail.filter(a=>a.status==='available').length,'calendar','this period'));
  sg.append(statCard('Assigned vehicle','SF21 XYZ','truck','Ford Transit'));
  c.append(sg);
  c.append(el('h2',{class:'sec',html:icon('plus')+'Quick actions'}));
  const qa=el('div',{class:'grid',style:'grid-template-columns:repeat(auto-fit,minmax(150px,1fr))'});
  [['Accident','car'],['Maintenance','wrench'],['Tire','disc'],['Breakdown','alert']].forEach(([t])=>{const f=REQUEST_FORMS[t];qa.append(el('button',{class:'tile',onClick:()=>go('NewRequest')},el('div',{class:'ic',style:'background:var(--surface-2);color:'+f.color,html:icon(f.icon)}),el('div',{},el('div',{class:'t'},f.title),el('div',{class:'d'},f.desc))));});
  c.append(qa);
  c.append(el('h2',{class:'sec',html:icon('history')+'Recent requests'}));
  if(!reqs.length)c.append(el('div',{class:'empty',html:'<div class="ic">📋</div>No requests yet. Tap New Request to get started.'}));
  else{const list=el('div',{class:'list'});reqs.slice(0,6).forEach(r=>list.append(requestRow(r)));c.append(list);}
}

function pageNewRequest(c){
  c.append(el('div',{class:'banner info',html:icon('alert')+'<div><div class="bt">What do you need to report?</div><div class="bd">Pick a request type. Photos and details are saved on this device.</div></div>'}));
  const grid=el('div',{class:'grid',style:'grid-template-columns:repeat(auto-fit,minmax(240px,1fr))'});
  Object.entries(REQUEST_FORMS).forEach(([key,f])=>{
    grid.append(el('button',{class:'tile',onClick:()=>{location.hash='NewRequest/'+key;}},
      el('div',{class:'ic',style:'background:var(--surface-2);color:'+f.color,html:icon(f.icon)}),
      el('div',{},el('div',{class:'t'},f.title),el('div',{class:'d'},f.desc))));
  });
  c.append(grid);
}
function pageRequestForm(c,type){
  const f=REQUEST_FORMS[type];if(!f){go('NewRequest');return;}
  c.append(el('button',{class:'btn ghost sm',style:'margin-bottom:14px',onClick:()=>go('NewRequest'),html:'← Back to requests'}));
  c.append(el('div',{class:'row',style:'align-items:center;gap:12px;margin-bottom:16px'},el('div',{class:'ic',style:'width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--surface);border:1px solid var(--line);color:'+f.color,html:icon(f.icon)}),el('div',{},el('div',{style:'font-size:18px;font-weight:700'},f.title),el('div',{class:'sub',style:'font-size:13px;color:var(--muted)'},f.desc))));
  const state={delivery_associate:App.user.full_name,home_site_location:App.user.depot};
  const card=el('div',{class:'card pad'});
  card.append(buildForm(f.fields,state,async()=>{
    await entities[f.entity].create({...state,status:f.entity==='BreakdownRequest'?'pending':'pending'});
    await entities.Notification.create({user_email:App.user.email,title:f.title+' submitted',message:'Your '+f.title.toLowerCase()+' for '+(state.vehicle_number||state.home_site_location||'')+' was received.',type:'request',priority:'medium',read:false});
    toast(f.title+' submitted');location.hash='MyRequests';
  },'Submit '+f.title));
  c.append(card);
}

async function pageMyRequests(c){
  const reqs=await loadAllRequests(App.role==='driver');
  c.append(el('div',{class:'row',style:'margin-bottom:14px'},el('button',{class:'btn primary',onClick:()=>go('NewRequest'),html:icon('plus')+'New request'})));
  if(!reqs.length){c.append(el('div',{class:'empty',html:'<div class="ic">📭</div>No requests found.'}));return;}
  const list=el('div',{class:'list'});reqs.forEach(r=>list.append(requestRow(r)));c.append(list);
}

async function pageAvailability(c){
  const all=await entities.DAAvailability.filter({created_by:App.user.email});
  const byDate={};all.forEach(a=>byDate[a.date]=a);
  c.append(el('div',{class:'banner info',html:icon('calendar')+'<div><div class="bt">Tap a day to toggle availability</div><div class="bd">Managers see this in Team Availability.</div></div>'}));
  const grid=el('div',{class:'grid',style:'grid-template-columns:repeat(auto-fill,minmax(150px,1fr))'});
  for(let i=0;i<14;i++){
    const d=new Date(Date.now()+i*864e5);const ds=d.toISOString().slice(0,10);const rec=byDate[ds];
    const status=rec?.status||'unset';
    const tile=el('button',{class:'card pad',style:'text-align:left;cursor:pointer'},
      el('div',{style:'font-size:12px;color:var(--muted);font-weight:600'},d.toLocaleDateString('en-GB',{weekday:'short'})),
      el('div',{style:'font-size:18px;font-weight:800;margin:2px 0 8px'},d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'})),
      chip(status==='unset'?'not set':status,status==='available'?'ok':status==='unavailable'?'muted':'warn'));
    tile.onclick=async()=>{const next=status==='available'?'unavailable':'available';if(rec)await entities.DAAvailability.update(rec.id,{status:next});else await entities.DAAvailability.create({date:ds,status:next,manager_status:'pending',shift_start:'08:00',shift_end:'18:00'});toast('Set '+ds+' → '+next);renderShell();};
    grid.append(tile);
  }
  c.append(grid);
}

async function pageNotifications(c){
  const notes=await entities.Notification.filter({user_email:App.user.email},'-created_date');
  if(notes.some(n=>!n.read))c.append(el('div',{class:'row',style:'margin-bottom:12px'},el('button',{class:'btn ghost sm',onClick:async()=>{for(const n of notes)if(!n.read)await entities.Notification.update(n.id,{read:true});await refreshBadges();renderShell();toast('All marked read');},html:icon('check')+'Mark all read'})));
  if(!notes.length){c.append(el('div',{class:'empty',html:'<div class="ic">🔔</div>No notifications.'}));return;}
  const list=el('div',{class:'list'});
  notes.forEach(n=>{const row=el('a',{class:'listrow',href:'javascript:void 0',style:n.read?'opacity:.6':'',onClick:async()=>{if(!n.read){await entities.Notification.update(n.id,{read:true});await refreshBadges();renderShell();}}});
    row.append(el('span',{class:'band',style:'background:'+(n.priority==='high'?'var(--danger)':n.priority==='medium'?'var(--warn)':'var(--brand-2)')}));
    row.append(el('div',{style:'flex:1'},el('div',{class:'ttl'},n.title),el('div',{class:'mt'},n.message+' · '+fmtDate(n.created_date))));
    if(!n.read)row.append(el('span',{class:'chip info'},'New'));list.append(row);});
  c.append(list);
}

function pageProfile(c){
  const u=App.user;
  const card=el('div',{class:'card pad'});
  const state={...u};
  card.append(buildForm([
    {key:'full_name',label:'Full name'},{key:'email',label:'Email',type:'email'},
    {key:'phone',label:'Phone',type:'tel'},{key:'transporter_id',label:'Transporter ID'},
    {key:'depot',label:'Depot',type:'select',options:DEPOTS},
  ],state,async()=>{await auth.updateMe(state);toast('Profile saved');renderShell();},'Save profile'));
  c.append(el('div',{class:'row',style:'align-items:center;gap:14px;margin-bottom:16px'},el('div',{class:'userchip',style:'padding:0'},el('div',{class:'av',style:'width:54px;height:54px;font-size:20px;background:var(--brand-2)'},(u.full_name||'U').split(' ').map(w=>w[0]).join('').slice(0,2))),el('div',{},el('div',{style:'font-size:18px;font-weight:700'},u.full_name),el('div',{style:'color:var(--muted);font-size:13px'},titleCase(u.role)+' · '+u.depot))));
  c.append(card);
}

async function pageChats(c){
  c.append(el('div',{class:'banner info',html:icon('msg')+'<div><div class="bt">Team chat (local demo)</div><div class="bd">Messages are stored on this device for testing.</div></div>'}));
  const msgs=await entities.ChatMessage.list('-created_date',50);
  const box=el('div',{class:'card pad',style:'display:flex;flex-direction:column;gap:10px;max-height:50vh;overflow-y:auto'});
  if(!msgs.length)box.append(el('div',{class:'empty',style:'padding:24px',html:'No messages yet. Say hello 👋'}));
  msgs.slice().reverse().forEach(m=>{const mine=m.sender_email===App.user.email;box.append(el('div',{style:'align-self:'+(mine?'flex-end':'flex-start')+';max-width:75%'},el('div',{style:'font-size:11px;color:var(--muted);margin-bottom:3px'},mine?'You':m.sender_name),el('div',{style:'padding:9px 13px;border-radius:13px;font-size:14px;background:'+(mine?'var(--brand-2)':'var(--surface-2)')+';color:'+(mine?'#fff':'var(--ink)')},m.message)));});
  c.append(box);
  const inp=el('input',{class:'inp',placeholder:'Type a message…',style:'flex:1'});
  const send=async()=>{if(!inp.value.trim())return;await entities.ChatMessage.create({chat_id:'team',message:inp.value.trim(),sender_email:App.user.email,sender_name:App.user.full_name});inp.value='';renderShell();};
  inp.onkeydown=e=>{if(e.key==='Enter')send();};
  c.append(el('div',{class:'row',style:'margin-top:12px'},inp,el('button',{class:'btn primary',onClick:send,html:icon('msg')+'Send'})));
}

/* ---------- Vehicle Audit (AI damage assessment) ---------- */
function pageVehicleAudit(c){
  const state={audit_type:'routine',exterior_photos:[],exterior_photo_marks:[],fuel_level:'half',cleanliness:'good'};
  let assessment=null,assessTimer=null,lastSig=null;
  c.append(el('div',{class:'banner '+(FW.settings.demo?'warn':'info'),html:icon('sparkles')+'<div><div class="bt">'+(FW.settings.demo?'Demo AI mode':'Live AI (Anthropic)')+'</div><div class="bd">'+(FW.settings.demo?'Add an API key in Settings to use the real model. Demo generates realistic, repeatable results for the same photos.':'Using your Anthropic API key for real damage detection.')+'</div></div>'}));
  const card=el('div',{class:'card pad'});
  const grid=el('div',{class:'formgrid'});
  const vehField=field({key:'vehicle_number',label:'Vehicle registration',required:true,maxlength:16},state);
  vehField.querySelector('input').addEventListener('input',()=>scheduleAssess());
  grid.append(vehField);
  [{key:'audit_type',label:'Audit type',type:'select',options:[['pre_contract','Pre-contract'],['post_contract','Post-contract'],['routine','Routine'],['damage_report','Damage report']],required:true},
   {key:'mileage',label:'Mileage',type:'number'},
   {key:'fuel_level',label:'Fuel level',type:'select',options:[['empty','Empty'],['quarter','¼'],['half','½'],['three_quarter','¾'],['full','Full']]},
   {key:'cleanliness',label:'Cleanliness',type:'select',options:['poor','acceptable','good','excellent']},
  ].forEach(f=>grid.append(field(f,state)));
  card.append(grid);
  const zone=el('div',{style:'margin-top:8px'});
  const photosUI=cameraCapture(state,'exterior_photos','exterior_photo_marks',{
    label:'Exterior photos (front, sides, rear)',required:true,
    onChange:()=>scheduleAssess()
  });
  card.append(photosUI.node);
  card.append(zone);
  c.append(card);

  function photosSig(){return state.exterior_photos.length+':'+state.exterior_photos.map(s=>s.length).join(',');}
  function idle(msg){zone.innerHTML='';zone.append(el('div',{class:'banner info',html:icon('sparkles')+'<div><div class="bt">Automatic AI assessment</div><div class="bd">'+msg+'</div></div>'}));}
  function scheduleAssess(){
    clearTimeout(assessTimer);
    if(!state.exterior_photos.length){assessment=null;lastSig=null;idle('Take or add photos above — assessment starts automatically, no button needed.');return;}
    if(!state.vehicle_number){idle('Enter the vehicle registration to start the AI damage assessment.');return;}
    assessTimer=setTimeout(runAssessment,900);
  }
  async function runAssessment(){
    const sig=photosSig();
    if(sig===lastSig)return;
    lastSig=sig;
    photosUI.grid().classList.add('scanning');
    zone.innerHTML='';zone.append(el('div',{class:'banner info',html:'<span class="spin dark"></span><div><div class="bt">Assessing '+state.exterior_photos.length+' photo(s)…</div><div class="bd">Detecting and pricing visible exterior damage</div></div>'}));
    try{
      assessment=await InvokeLLM({
        prompt:'You are a commercial-vehicle damage inspector reviewing walkaround photos for a UK fleet operator. Carefully examine each attached photo before answering. Only report damage that is clearly and directly visible in the attached photos — never guess or invent damage that is not visible. If a photo is blurry, poorly lit, or does not clearly show the vehicle, reflect that in image_quality and lower confidence rather than fabricating findings. If no damage is visible, return an empty damage_detected array. Use UK terms (nearside=left, offside=right). Estimate repair cost ranges in GBP.',
        file_urls:state.exterior_photos,
        response_json_schema:{type:'object',properties:{vehicle_make:{type:'string'},vehicle_model:{type:'string'},image_quality:{type:'string'},overall_condition:{type:'string',enum:['excellent','good','fair','poor']},safety_critical:{type:'boolean'},damage_detected:{type:'array',items:{type:'object',properties:{location:{type:'string'},type:{type:'string'},severity:{type:'string',enum:['minor','moderate','major']},description:{type:'string'},is_new:{type:'boolean'},estimated_repair_cost_min:{type:'number'},estimated_repair_cost_max:{type:'number'},repair_action:{type:'string'}}}},total_estimated_cost_min:{type:'number'},total_estimated_cost_max:{type:'number'},summary:{type:'string'},confidence:{type:'number'}}}
      });
      renderAuditVerdict(zone,assessment,state);
    }catch(err){zone.innerHTML='';zone.append(el('div',{class:'banner warn',html:icon('warn')+'<div><div class="bt">Assessment failed</div><div class="bd">'+esc(err.message)+'</div></div>'}));}
    finally{photosUI.grid().classList.remove('scanning');}
  }
  idle('Take or add photos above — assessment starts automatically, no button needed.');
}
/* continuous in-page camera: tap shutter, photo saves in the background, shutter stays
   ready to snap the next one immediately (no per-shot round-trip to a native camera app).
   Also supports tap-to-mark damage locations on each captured photo. */
function cameraCapture(state,key,marksKey,opts){
  const wrap=el('div',{class:'fld'});
  wrap.append(el('span',{html:esc(opts.label)+(opts.required?' <span class="req">*</span>':'')}));
  state[key]=state[key]||[];state[marksKey]=state[marksKey]||[];
  const dz=el('div',{class:'dropzone',html:icon('camera')+'<div>Tap to open camera</div><div style="font-size:11.5px;margin-top:2px">or choose from gallery</div>'});
  const galleryInput=el('input',{type:'file',accept:'image/*',multiple:true,style:'display:none'});
  const gridEl=el('div',{class:'photos'});
  const notify=()=>{draw();opts.onChange&&opts.onChange();};
  const draw=()=>{
    gridEl.innerHTML='';
    state[key].forEach((src,i)=>{
      const ph=el('div',{class:'photo'});
      ph.append(el('img',{src}));
      (state[marksKey][i]||[]).forEach(m=>ph.append(el('span',{class:'markpin',style:`left:${m.x}%;top:${m.y}%`})));
      ph.append(el('button',{class:'x',type:'button',html:'×',onClick:e=>{e.stopPropagation();state[key].splice(i,1);state[marksKey].splice(i,1);notify();}}));
      ph.addEventListener('click',()=>openMarkModal(i));
      gridEl.append(ph);
    });
  };
  function openMarkModal(i){
    const marks=state[marksKey][i]=state[marksKey][i]||[];
    const box=el('div',{class:'markbox'},el('img',{src:state[key][i]}));
    const pins=el('div',{class:'markpins'});box.append(pins);
    const renderPins=()=>{pins.innerHTML='';marks.forEach((m,mi)=>pins.append(el('span',{class:'markpin lg',style:`left:${m.x}%;top:${m.y}%`,onClick:e=>{e.stopPropagation();marks.splice(mi,1);renderPins();draw();}},String(mi+1))));};
    box.addEventListener('click',e=>{
      if(e.target.closest('.markpin'))return;
      const r=box.getBoundingClientRect();
      marks.push({x:Number((((e.clientX-r.left)/r.width)*100).toFixed(1)),y:Number((((e.clientY-r.top)/r.height)*100).toFixed(1))});
      renderPins();draw();
    });
    renderPins();
    const body=el('div',{},el('p',{style:'font-size:12.5px;color:var(--muted);margin-bottom:8px'},'Tap the photo to mark where the damage is. Tap a marker to remove it.'),box);
    modal('Mark damage — photo '+(i+1),body,[el('button',{class:'btn primary',onClick:e=>e.target.closest('.modal-bg').remove()},'Done')]);
  }
  async function snapToDataUrl(video){
    const vw=video.videoWidth||1024,vh=video.videoHeight||768;
    const scale=Math.min(1,1024/Math.max(vw,vh));
    const canvas=document.createElement('canvas');
    canvas.width=Math.round(vw*scale);canvas.height=Math.round(vh*scale);
    canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
    return canvas.toDataURL('image/jpeg',0.78);
  }
  async function openCamera(){
    let stream;
    try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});}
    catch(e){galleryInput.setAttribute('capture','environment');galleryInput.click();galleryInput.removeAttribute('capture');return;}
    const video=el('video',{autoplay:true,playsinline:true,muted:true});
    video.srcObject=stream;
    const count=el('span',{},String(state[key].length)+' captured');
    const topbar=el('div',{class:'camera-topbar'},count,el('button',{class:'camera-close',type:'button',html:icon('x'),onClick:close}));
    const flash=el('div',{class:'camera-flash'});
    const shutter=el('button',{class:'camera-shutter',type:'button','aria-label':'Capture photo'});
    const doneBtn=el('button',{class:'camera-done',type:'button'},'Done');
    const overlay=el('div',{class:'camera-overlay'},video,flash,topbar,el('div',{class:'camera-controls'},el('span',{style:'width:64px'}),shutter,doneBtn));
    document.body.append(overlay);
    shutter.onclick=async()=>{
      shutter.disabled=true;
      const dataUrl=await snapToDataUrl(video);
      state[key].push(dataUrl);state[marksKey].push([]);
      notify();
      count.textContent=String(state[key].length)+' captured';
      flash.classList.add('pop');setTimeout(()=>flash.classList.remove('pop'),160);
      shutter.disabled=false;
      // camera stays open — ready to snap the next photo immediately
    };
    function close(){stream.getTracks().forEach(t=>t.stop());overlay.remove();}
    doneBtn.onclick=close;
  }
  galleryInput.onchange=async()=>{
    for(const f of galleryInput.files){const data=await resizeImage(f,1024,0.78);state[key].push(data);state[marksKey].push([]);}
    galleryInput.value='';notify();
  };
  dz.onclick=e=>{
    if(!navigator.mediaDevices?.getUserMedia){galleryInput.setAttribute('capture','environment');galleryInput.click();galleryInput.removeAttribute('capture');return;}
    openCamera();
  };
  wrap.append(dz,galleryInput,gridEl);
  draw();
  return {node:wrap,grid:()=>gridEl};
}
function renderAuditVerdict(zone,a,state){
  zone.innerHTML='';
  const cond=a.overall_condition||'good';
  const condColor={excellent:'var(--ok)',good:'var(--ok)',fair:'var(--warn)',poor:'var(--danger)'}[cond];
  const dmg=a.damage_detected||[];
  const head=el('div',{class:'card pad',style:'margin-top:14px;border-left:4px solid '+condColor});
  head.append(el('div',{class:'row',style:'align-items:center'},
    el('div',{style:'flex:1'},el('div',{class:'eyebrow'},'Overall condition'),el('div',{style:'font-size:24px;font-weight:800;color:'+condColor},titleCase(cond))),
    el('div',{style:'text-align:right'},el('div',{class:'eyebrow'},'Est. repair'),el('div',{style:'font-size:20px;font-weight:800'},gbp(a.total_estimated_cost_min)+'–'+gbp(a.total_estimated_cost_max))),
    el('div',{style:'text-align:right;margin-left:18px'},el('div',{class:'eyebrow'},'Confidence'),el('div',{style:'font-size:20px;font-weight:800'},(Math.round(a.confidence||0))+'%'))));
  if(a.safety_critical)head.append(el('div',{class:'banner warn',style:'margin:12px 0 0',html:icon('warn')+'<div><div class="bt">Safety-critical damage flagged</div><div class="bd">Do not drive without a qualified inspection.</div></div>'}));
  head.append(el('p',{style:'margin-top:12px;font-size:14px;color:var(--slate)'},a.summary||''));
  zone.append(head);
  if(dmg.length){
    const dc=el('div',{class:'card pad',style:'margin-top:12px'});
    dc.append(el('div',{class:'eyebrow'},dmg.length+' damage item(s) detected'));
    dmg.forEach(d=>{const col={minor:'var(--warn)',moderate:'#ea580c',major:'var(--danger)'}[d.severity]||'var(--muted)';
      dc.append(el('div',{class:'damagecard'},el('div',{class:'sv',style:'background:'+col}),el('div',{style:'flex:1'},
        el('div',{style:'font-weight:700'},titleCase(d.location||'Area')+(d.is_new===false?' (pre-existing)':'')),
        el('div',{style:'font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-top:2px'},(d.type||'damage')+' · '+d.severity),
        el('div',{style:'font-size:13.5px;color:var(--slate);margin-top:6px'},d.description||''),
        el('div',{class:'row',style:'margin-top:7px;align-items:center'},chip(d.severity,sevChip[d.severity]),d.repair_action?el('span',{class:'chip muted'},titleCase(d.repair_action)):null,el('span',{style:'margin-left:auto;font-weight:700;font-size:13px'},gbp(d.estimated_repair_cost_min)+'–'+gbp(d.estimated_repair_cost_max)))
      )));});
    zone.append(dc);
  }
  zone.append(el('button',{class:'btn dark full',style:'margin-top:12px',html:icon('clipboard')+'Save audit to record',onClick:async()=>{
    await entities.VehicleAudit.create({vehicle_number:state.vehicle_number.toUpperCase(),vehicle_make:a.vehicle_make,vehicle_model:a.vehicle_model,audit_type:state.audit_type,exterior_photos:state.exterior_photos,exterior_photo_marks:state.exterior_photo_marks,damage_detected:dmg,total_estimated_cost_min:a.total_estimated_cost_min,total_estimated_cost_max:a.total_estimated_cost_max,overall_condition:cond,mileage:state.mileage?Number(state.mileage):null,fuel_level:state.fuel_level,cleanliness:state.cleanliness,audit_status:a.safety_critical?'requires_action':'completed',confidence:a.confidence});
    toast('Audit saved');location.hash='AuditTracking';
  }}));
}

/* ---------- Fleet dashboard / vehicle management ---------- */
async function pageFleetDashboard(c){
  const vehicles=await entities.Vehicle.list('-created_date');
  const audits=await entities.VehicleAudit.list();
  const sg=el('div',{class:'statgrid'});
  sg.append(statCard('Total vehicles',vehicles.length,'truck'));
  sg.append(statCard('Available',vehicles.filter(v=>v.status==='available').length,'check',null,'var(--ok)'));
  sg.append(statCard('In maintenance',vehicles.filter(v=>v.status==='maintenance').length,'wrench',null,'var(--warn)'));
  sg.append(statCard('Audit required',vehicles.filter(v=>v.status==='audit_required').length,'clipboard',null,'var(--danger)'));
  c.append(sg);
  c.append(el('div',{class:'row',style:'margin:18px 0 0;justify-content:space-between;align-items:center'},el('h2',{class:'sec',style:'margin:0',html:icon('truck')+'Vehicles'}),el('button',{class:'btn primary sm',onClick:addVehicleModal,html:icon('plus')+'Add vehicle'})));
  const card=el('div',{class:'card',style:'margin-top:12px;overflow-x:auto'});
  const t=el('table',{class:'tbl'});
  t.innerHTML='<tr><th>Reg</th><th>Make / model</th><th>Depot</th><th>Mileage</th><th>Status</th></tr>';
  vehicles.forEach(v=>{const tr=el('tr',{style:'cursor:pointer'});tr.innerHTML='<td><b>'+esc(v.vehicle_number)+'</b></td><td>'+esc((v.make||'')+' '+(v.model||''))+' '+(v.year||'')+'</td><td>'+esc(v.depot_location||'')+'</td><td>'+(v.mileage?v.mileage.toLocaleString():'—')+'</td>';
    const td=el('td');td.append(chip(v.status,statusChip[v.status]||'muted'));tr.append(td);
    tr.onclick=()=>vehicleDetail(v,audits);t.append(tr);});
  card.append(t);c.append(card);
}
function addVehicleModal(){
  const state={vehicle_type:'van',status:'available'};
  const body=el('div',{});
  body.append(buildForm([
    {key:'vehicle_number',label:'Registration',required:true},
    {key:'vehicle_type',label:'Type',type:'select',options:['van','car','truck'],required:true},
    {key:'make',label:'Make'},{key:'model',label:'Model'},{key:'year',label:'Year',type:'number'},
    {key:'depot_location',label:'Depot',type:'select',options:DEPOTS,required:true},
    {key:'mileage',label:'Mileage',type:'number'},
    {key:'assigned_to_name',label:'Assigned driver'},
  ],state,async()=>{await entities.Vehicle.create({...state,year:state.year?Number(state.year):null,mileage:state.mileage?Number(state.mileage):null});$$('.modal-bg').forEach(m=>m.remove());toast('Vehicle added');renderShell();},'Add vehicle'));
  modal('Add vehicle',body);
}
function vehicleDetail(v,audits){
  const va=(audits||[]).filter(a=>a.vehicle_number===v.vehicle_number);
  const body=el('div',{});
  body.append(el('div',{class:'row',style:'margin:6px 0 12px'},chip(v.status,statusChip[v.status]),chip(v.vehicle_type,'muted')));
  [['Make',(v.make||'')+' '+(v.model||'')],['Year',v.year],['Depot',v.depot_location],['Mileage',v.mileage?.toLocaleString()],['Assigned to',v.assigned_to_name||'Unassigned'],['Transporter ID',v.transporter_id],['Insurance expiry',v.insurance_expiry]].forEach(([k,val])=>{if(val)body.append(el('div',{style:'display:flex;justify-content:space-between;border-bottom:1px solid var(--line);padding:7px 0'},el('span',{style:'color:var(--muted);font-size:13px'},k),el('b',{style:'font-size:13px'},String(val))));});
  body.append(el('div',{class:'eyebrow',style:'margin-top:14px'},va.length+' audit(s) on record'));
  modal(v.vehicle_number,body,[el('button',{class:'btn ghost',onClick:e=>e.target.closest('.modal-bg').remove()},'Close')]);
}

/* ---------- Manager / Admin dashboards ---------- */
async function pageManagerDashboard(c){
  const reqs=await loadAllRequests(false);
  const avail=await entities.DAAvailability.list();
  const sg=el('div',{class:'statgrid'});
  sg.append(statCard('Open requests',reqs.filter(r=>(r.status||'pending')==='pending').length,'history',null,'var(--warn)'));
  sg.append(statCard('Drivers available today',avail.filter(a=>a.date===new Date().toISOString().slice(0,10)&&a.status==='available').length,'users',null,'var(--ok)'));
  sg.append(statCard('Accidents (all)',reqs.filter(r=>r._type==='Accident').length,'car'));
  sg.append(statCard('Maintenance',reqs.filter(r=>r._type==='Maintenance').length,'wrench'));
  c.append(sg);
  c.append(el('h2',{class:'sec',html:icon('history')+'Requests needing review'}));
  const pend=reqs.filter(r=>(r.status||'pending')==='pending');
  if(!pend.length)c.append(el('div',{class:'empty',html:'<div class="ic">✅</div>Nothing pending.'}));
  else{const list=el('div',{class:'list'});pend.slice(0,8).forEach(r=>list.append(requestRow(r)));c.append(list);}
}
async function pageAdminDashboard(c){
  const reqs=await loadAllRequests(false);const vehicles=await entities.Vehicle.list();const audits=await entities.VehicleAudit.list();const users=await ensureDrivers();
  const sg=el('div',{class:'statgrid'});
  sg.append(statCard('Vehicles',vehicles.length,'truck'));
  sg.append(statCard('Users',users.length,'users'));
  sg.append(statCard('Total requests',reqs.length,'file'));
  sg.append(statCard('Audits',audits.length,'clipboard'));
  c.append(sg);
  c.append(el('div',{class:'banner info',style:'margin-top:18px',html:icon('sparkles')+'<div><div class="bt">System healthy</div><div class="bd">All data stored locally (IndexedDB). Manage AI & data in Settings.</div></div>'}));
  c.append(el('h2',{class:'sec',html:icon('history')+'Recent activity'}));
  const list=el('div',{class:'list'});reqs.slice(0,8).forEach(r=>list.append(requestRow(r)));c.append(list.children.length?list:el('div',{class:'empty'},'No activity yet'));
}

async function pageAuditTracking(c){
  const audits=await entities.VehicleAudit.list('-created_date');
  if(!audits.length){c.append(el('div',{class:'empty',html:'<div class="ic">📋</div>No audits recorded yet. Run one from Vehicle Audit.'}));return;}
  const list=el('div',{class:'list'});
  audits.forEach(a=>{const cond=a.overall_condition||'good';const col={excellent:'var(--ok)',good:'var(--ok)',fair:'var(--warn)',poor:'var(--danger)'}[cond];
    const row=el('a',{class:'listrow',href:'javascript:void 0',onClick:()=>auditDetail(a)});
    row.append(el('span',{class:'band',style:'background:'+col}));
    row.append(el('div',{style:'flex:1'},el('div',{class:'ttl'},a.vehicle_number+' · '+titleCase(a.audit_type||'')),el('div',{class:'mt'},(a.damage_detected||[]).length+' damage item(s) · '+fmtDate(a.created_date))));
    const rt=el('div',{class:'rt'});rt.append(chip(cond,cond==='poor'?'danger':cond==='fair'?'warn':'ok'));if(a.total_estimated_cost_max)rt.append(el('b',{style:'font-size:13px'},gbp(a.total_estimated_cost_min)+'–'+gbp(a.total_estimated_cost_max)));row.append(rt);
    list.append(row);});
  c.append(list);
}
function auditDetail(a){
  const body=el('div',{});
  body.append(el('div',{class:'row',style:'margin:6px 0 12px'},chip(a.overall_condition||'good',a.overall_condition==='poor'?'danger':a.overall_condition==='fair'?'warn':'ok'),el('b',{style:'margin-left:auto'},gbp(a.total_estimated_cost_min)+'–'+gbp(a.total_estimated_cost_max))));
  if(a.exterior_photos?.length)body.append(el('div',{class:'photos',style:'margin-bottom:12px'},...a.exterior_photos.map((src,i)=>el('div',{class:'photo'},el('img',{src}),...((a.exterior_photo_marks?.[i]||[]).map(m=>el('span',{class:'markpin',style:`left:${m.x}%;top:${m.y}%`})))))));
  (a.damage_detected||[]).forEach(d=>{const col={minor:'var(--warn)',moderate:'#ea580c',major:'var(--danger)'}[d.severity];body.append(el('div',{class:'damagecard'},el('div',{class:'sv',style:'background:'+col}),el('div',{style:'flex:1'},el('b',{},titleCase(d.location)),el('div',{style:'font-size:13px;color:var(--slate);margin-top:4px'},d.description),el('div',{style:'font-size:12px;color:var(--muted);margin-top:4px'},gbp(d.estimated_repair_cost_min)+'–'+gbp(d.estimated_repair_cost_max)))));});
  modal('Audit · '+a.vehicle_number,body,[el('button',{class:'btn ghost',onClick:e=>e.target.closest('.modal-bg').remove()},'Close')]);
}
async function pageNewDamages(c){
  const audits=await entities.VehicleAudit.list('-created_date');
  const damages=[];audits.forEach(a=>(a.damage_detected||[]).forEach(d=>damages.push({...d,vehicle:a.vehicle_number,date:a.created_date})));
  if(!damages.length){c.append(el('div',{class:'empty',html:'<div class="ic">🔧</div>No damage records yet.'}));return;}
  const list=el('div',{class:'list'});
  damages.sort((x,y)=>y.date>x.date?1:-1).forEach(d=>{const col={minor:'var(--warn)',moderate:'#ea580c',major:'var(--danger)'}[d.severity];
    const row=el('div',{class:'listrow'});row.append(el('span',{class:'band',style:'background:'+col}));
    row.append(el('div',{style:'flex:1'},el('div',{class:'ttl'},d.vehicle+' · '+titleCase(d.location)),el('div',{class:'mt'},(d.description||'').slice(0,80))));
    row.append(el('div',{class:'rt'},chip(d.severity,sevChip[d.severity]),el('b',{style:'font-size:13px'},gbp(d.estimated_repair_cost_min)+'–'+gbp(d.estimated_repair_cost_max))));list.append(row);});
  c.append(list);
}
async function pageDamageTrends(c){
  c.append(el('div',{class:'banner info',html:icon('sparkles')+'<div><div class="bt">AI predictive maintenance</div><div class="bd">Analyses audit history to flag at-risk vehicles.</div></div>'}));
  const btn=el('button',{class:'btn primary',html:icon('sparkles')+'Run AI trend analysis'});
  const zone=el('div',{style:'margin-top:14px'});
  btn.onclick=async()=>{btn.disabled=true;zone.innerHTML='';zone.append(el('div',{class:'banner info',html:'<span class="spin dark"></span><div><div class="bt">Analysing audit history…</div></div>'}));
    try{const audits=await entities.VehicleAudit.list();
      const r=await InvokeLLM({prompt:'Analyze these vehicle audits and predict which vehicles need urgent attention. Identify escalating damage patterns and recurring locations.\n\nDATA:\n'+JSON.stringify(audits.slice(0,40).map(a=>({vehicle:a.vehicle_number,date:a.created_date,damages:a.damage_detected}))),response_json_schema:{type:'object',properties:{critical_vehicles:{type:'array',items:{type:'object',properties:{vehicle_number:{type:'string'},risk_level:{type:'string',enum:['high','medium','low']},issue:{type:'string'},recommendation:{type:'string'},estimated_days_until_failure:{type:'number'}}}},summary:{type:'string'}}}});
      zone.innerHTML='';zone.append(el('div',{class:'card pad'},el('p',{style:'font-weight:600;margin-bottom:12px'},r.summary||'')));
      (r.critical_vehicles||[]).forEach(v=>{const col={high:'var(--danger)',medium:'var(--warn)',low:'var(--ok)'}[v.risk_level];zone.append(el('div',{class:'card pad',style:'margin-top:10px;border-left:4px solid '+col},el('div',{class:'row',style:'align-items:center'},el('b',{style:'flex:1'},v.vehicle_number),chip(v.risk_level,sevChip[v.risk_level])),el('div',{style:'font-size:14px;margin-top:6px'},v.issue),el('div',{style:'font-size:13px;color:var(--brand);margin-top:6px;font-weight:600'},'→ '+v.recommendation),v.estimated_days_until_failure?el('div',{style:'font-size:12px;color:var(--muted);margin-top:4px'},'~'+v.estimated_days_until_failure+' days until likely failure'):null));});
    }catch(e){zone.innerHTML='';zone.append(el('div',{class:'banner warn',html:icon('warn')+'<div>'+esc(e.message)+'</div>'}));}
    finally{btn.disabled=false;}};
  c.append(btn,zone);
}
async function pageReports(c){
  const reqs=await loadAllRequests(false);
  const byType={};reqs.forEach(r=>byType[r._type]=(byType[r._type]||0)+1);
  const max=Math.max(1,...Object.values(byType));
  c.append(el('h2',{class:'sec',html:icon('chart')+'Requests by type'}));
  const card=el('div',{class:'card pad'});
  Object.entries(REQUEST_FORMS).forEach(([k,f])=>{const n=byType[f.title.split(' ')[0]]||byType[k]||0;
    card.append(el('div',{style:'margin-bottom:12px'},el('div',{style:'display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px'},el('span',{},f.title),el('b',{},String(n))),el('div',{class:'bar'},el('i',{style:'width:'+(n/max*100)+'%;background:'+f.color}))));});
  c.append(card);
  const byDepot={};reqs.forEach(r=>{const d=r.home_site_location||'Unknown';byDepot[d]=(byDepot[d]||0)+1;});
  c.append(el('h2',{class:'sec',html:icon('mappin')+'Requests by depot'}));
  const card2=el('div',{class:'card pad'});const dmax=Math.max(1,...Object.values(byDepot));
  Object.entries(byDepot).forEach(([d,n])=>card2.append(el('div',{style:'margin-bottom:12px'},el('div',{style:'display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px'},el('span',{},d),el('b',{},String(n))),el('div',{class:'bar'},el('i',{style:'width:'+(n/dmax*100)+'%'})))));
  c.append(card2);
}
async function ensureDrivers(){
  let drivers=await entities.User.list('full_name');
  if(!drivers.length){
    const defaults=[
      {full_name:'Jordan Mills',email:'driver@fleetwise.app',role:'driver',depot:'DEH1 Edinburgh',transporter_id:'A1QX7K2',phone:'07700 900111',status:'active'},
      {full_name:'Priya Shah',email:'driver2@fleetwise.app',role:'driver',depot:'DDD1 Dundee',transporter_id:'B7TT2M9',phone:'07700 900222',status:'active'},
      {full_name:'Connor Reid',email:'driver3@fleetwise.app',role:'driver',depot:'DAB1 Aberdeen',transporter_id:'C3RR9P1',phone:'07700 900333',status:'active'},
    ];
    for(const d of defaults) await entities.User.create(d);
    drivers=await entities.User.list('full_name');
  }
  return drivers;
}
async function pageDriverManagement(c){
  const drivers=await ensureDrivers();
  const addBtn=el('button',{class:'btn primary',html:icon('plus')+'Add driver',onClick:()=>{
    const s={role:'driver',status:'active'};
    const form=buildForm([
      {key:'full_name',label:'Full name',required:true},
      {key:'email',label:'Email',type:'email'},
      {key:'depot',label:'Depot',type:'select',options:DEPOTS,required:true},
      {key:'transporter_id',label:'Transporter ID'},
      {key:'phone',label:'Phone'},
    ],s,async()=>{await entities.User.create(s);$$('.modal-bg').forEach(m=>m.remove());toast('Driver added');renderShell();},'Add driver');
    modal('New driver',form);
  }});
  c.append(el('div',{class:'row',style:'margin-bottom:14px'},addBtn));
  if(!drivers.length){c.append(el('div',{class:'empty',html:'<div class="ic">🧑‍✈️</div>No drivers yet. Add one to get started.'}));return;}
  const list=el('div',{class:'list'});
  drivers.forEach(d=>{
    const row=el('a',{class:'listrow',href:'javascript:void 0',onClick:()=>driverDetail(d)});
    row.append(el('div',{class:'av',style:'width:38px;height:38px;border-radius:50%;background:var(--brand-2);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex:none'},(d.full_name||'?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()));
    row.append(el('div',{style:'flex:1'},el('div',{class:'ttl'},d.full_name),el('div',{class:'mt'},(d.depot||'—')+' · '+(d.transporter_id||'—'))));
    row.append(chip(d.status||'active',d.status==='inactive'?'muted':'ok'));
    list.append(row);
  });
  c.append(list);
}
function driverDetail(d){
  const body=el('div',{});
  body.append(el('div',{class:'row',style:'margin:6px 0 14px'},chip(d.status||'active',d.status==='inactive'?'muted':'ok'),el('span',{class:'chip muted',style:'margin-left:auto'},d.depot||'No depot')));
  body.append(el('div',{style:'font-size:13.5px;color:var(--slate);line-height:1.7'},
    el('div',{},'Email: '+(d.email||'—')),
    el('div',{},'Phone: '+(d.phone||'—')),
    el('div',{},'Transporter ID: '+(d.transporter_id||'—'))));
  modal(d.full_name,body,[
    el('button',{class:'btn danger',html:icon('trash')+'Remove driver',onClick:async e=>{
      await entities.User.delete(d.id);
      e.target.closest('.modal-bg').remove();
      toast('Driver removed');renderShell();
    }}),
    el('button',{class:'btn ghost',onClick:e=>e.target.closest('.modal-bg').remove()},'Close')
  ]);
}
async function pageTeamAvailability(c){
  const all=await entities.DAAvailability.list('-date');
  const today=new Date().toISOString().slice(0,10);
  c.append(el('div',{class:'banner info',html:icon('calendar')+'<div><div class="bt">Team availability</div><div class="bd">Submitted working days across drivers.</div></div>'}));
  if(!all.length){c.append(el('div',{class:'empty'},'No availability submitted.'));return;}
  const card=el('div',{class:'card',style:'overflow-x:auto'});const t=el('table',{class:'tbl'});t.innerHTML='<tr><th>Date</th><th>Driver</th><th>Shift</th><th>Status</th></tr>';
  all.forEach(a=>{const tr=el('tr');tr.innerHTML='<td>'+fmtDay(a.date)+(a.date===today?' <span class="chip info">today</span>':'')+'</td><td>'+esc((a.created_by||'').split('@')[0])+'</td><td>'+(a.shift_start||'—')+'–'+(a.shift_end||'—')+'</td>';const td=el('td');td.append(chip(a.status,a.status==='available'?'ok':'muted'));tr.append(td);t.append(tr);});
  card.append(t);c.append(card);
}
async function pageOnboarding(c){
  const docs=await entities.OnboardingDocument.list('-created_date');
  const addBtn=el('button',{class:'btn primary',html:icon('plus')+'Add starter',onClick:()=>{
    const s={onboarding_status:'pending'};
    const form=buildForm([{key:'employee_name',label:'Name',required:true},{key:'employee_email',label:'Email',type:'email'},{key:'transporter_id',label:'Transporter ID'},{key:'onboarding_status',label:'Status',type:'select',options:['pending','in_progress','complete']}],s,async()=>{await entities.OnboardingDocument.create(s);$$('.modal-bg').forEach(m=>m.remove());toast('Starter added');renderShell();},'Add starter');
    modal('New starter',form);
  }});
  c.append(el('div',{class:'row',style:'margin-bottom:14px'},addBtn));
  if(!docs.length){c.append(el('div',{class:'empty',html:'<div class="ic">📄</div>No onboarding records.'}));return;}
  const list=el('div',{class:'list'});docs.forEach(d=>{const row=el('div',{class:'listrow'});row.append(el('div',{style:'flex:1'},el('div',{class:'ttl'},d.employee_name),el('div',{class:'mt'},(d.employee_email||'')+' · '+(d.transporter_id||''))));row.append(chip(d.onboarding_status||'pending',statusChip[d.onboarding_status]||'warn'));list.append(row);});c.append(list);
}
async function pageAdminMessages(c){
  const msgs=await entities.Message.list('-created_date');
  if(!msgs.length){c.append(el('div',{class:'empty',html:'<div class="ic">💬</div>No messages.'}));return;}
  const list=el('div',{class:'list'});
  msgs.forEach(m=>{const row=el('a',{class:'listrow',href:'javascript:void 0',onClick:()=>{const body=el('div',{});body.append(el('p',{style:'margin:8px 0;color:var(--slate)'},m.message));const ta=el('textarea',{class:'inp',placeholder:'Reply…'});ta.value=m.admin_reply||'';body.append(ta);modal(m.subject||'Message',body,[el('button',{class:'btn ghost',onClick:e=>e.target.closest('.modal-bg').remove()},'Close'),el('button',{class:'btn primary',onClick:async e=>{await entities.Message.update(m.id,{admin_reply:ta.value,status:'replied',replied_at:new Date().toISOString()});e.target.closest('.modal-bg').remove();toast('Reply saved');renderShell();}},'Send reply')]);}});
    row.append(el('div',{style:'flex:1'},el('div',{class:'ttl'},m.subject||'(no subject)'),el('div',{class:'mt'},(m.created_by||'')+' · '+(m.message||'').slice(0,60))));row.append(chip(m.status||'open',m.status==='replied'?'ok':'warn'));list.append(row);});
  c.append(list);
}
async function pageGlobalSearch(c){
  const inp=el('input',{class:'inp',placeholder:'Search vehicles, requests, audits…',style:'font-size:16px'});
  const out=el('div',{style:'margin-top:16px'});
  c.append(el('div',{class:'card pad',style:'display:flex;gap:10px;align-items:center'},el('span',{html:icon('search'),style:'color:var(--muted)'}),inp));
  c.append(out);
  const run=async()=>{const q=inp.value.trim().toLowerCase();out.innerHTML='';if(q.length<2)return;
    const vehicles=await entities.Vehicle.list();const reqs=await loadAllRequests(false);const audits=await entities.VehicleAudit.list();
    const hits=[];
    vehicles.filter(v=>JSON.stringify(v).toLowerCase().includes(q)).forEach(v=>hits.push(['Vehicle',v.vehicle_number,(v.make||'')+' '+(v.model||''),()=>vehicleDetail(v,audits)]));
    reqs.filter(r=>JSON.stringify(r).toLowerCase().includes(q)).forEach(r=>hits.push([r._type,r.vehicle_number||r.home_site_location,(r.description||'').slice(0,50),()=>openRequestDetail(r)]));
    audits.filter(a=>JSON.stringify(a).toLowerCase().includes(q)).forEach(a=>hits.push(['Audit',a.vehicle_number,titleCase(a.overall_condition||''),()=>auditDetail(a)]));
    if(!hits.length){out.append(el('div',{class:'empty'},'No matches for “'+esc(q)+'”'));return;}
    const list=el('div',{class:'list'});hits.slice(0,30).forEach(([type,ttl,sub,fn])=>{const row=el('a',{class:'listrow',href:'javascript:void 0',onClick:fn});row.append(el('span',{class:'chip muted'},type));row.append(el('div',{style:'flex:1'},el('div',{class:'ttl'},ttl||'—'),el('div',{class:'mt'},sub)));list.append(row);});out.append(list);};
  inp.oninput=run;
}

/* ---------- Settings ---------- */
function pageSettings(c){
  const s=FW.settings;
  const card=el('div',{class:'card pad'});
  card.append(el('h2',{class:'sec',style:'margin-top:0',html:icon('sparkles')+'AI configuration'}));
  const keyInp=el('input',{class:'inp',type:'password',placeholder:'sk-ant-…',value:s.apiKey});
  card.append(el('label',{class:'fld'},el('span',{},'Anthropic API key (stored only on this device)'),keyInp));
  card.append(el('div',{style:'font-size:12px;color:var(--muted);margin:-8px 0 14px'},'Leave blank to use demo mode. Calls go directly from your browser to Anthropic.'));
  const demoChk=el('input',{type:'checkbox'});demoChk.checked=localStorage.getItem('fw_force_demo')==='1';
  card.append(el('label',{class:'fld',style:'display:flex;gap:9px;align-items:center'},demoChk,el('span',{style:'margin:0'},'Force demo mode even if a key is set')));
  card.append(el('button',{class:'btn primary',html:icon('check')+'Save AI settings',onClick:()=>{s.apiKey=keyInp.value.trim();s.forceDemo=demoChk.checked;toast('Settings saved');renderShell();}}));
  c.append(card);

  const dataCard=el('div',{class:'card pad',style:'margin-top:16px'});
  dataCard.append(el('h2',{class:'sec',style:'margin-top:0',html:icon('truck')+'Data'}));
  dataCard.append(el('div',{style:'font-size:13px;color:var(--muted);margin-bottom:12px'},'All FleetWise data lives in your browser (IndexedDB). Nothing is uploaded.'));
  dataCard.append(el('div',{class:'row'},
    el('button',{class:'btn ghost',html:icon('download')+'Export data (JSON)',onClick:exportData}),
    el('button',{class:'btn ghost',html:icon('sparkles')+'Reset demo data',onClick:async()=>{await seedIfEmpty(true);await refreshBadges();toast('Demo data reset');renderShell();}}),
    el('button',{class:'btn danger',html:icon('trash')+'Wipe everything',onClick:async()=>{for(const st of STORES){const o=await tx(st,'readwrite');o.clear();}toast('All data cleared');await seedIfEmpty(true);renderShell();}})));
  c.append(dataCard);

  const aboutCard=el('div',{class:'card pad',style:'margin-top:16px'});
  aboutCard.append(el('h2',{class:'sec',style:'margin-top:0',html:icon('shield')+'About'}));
  aboutCard.append(el('div',{style:'font-size:13.5px;color:var(--slate);line-height:1.6'},'FleetWise — standalone PWA. Replaces the Base44 backend with on-device storage and optional Anthropic AI. Login is disabled for testing; use the “View as” switch to explore each role. Install via your browser’s “Add to Home Screen / Install app”.'));
  c.append(aboutCard);
}
async function exportData(){
  const dump={};for(const st of STORES){if(st==='_meta')continue;dump[st]=await entities[st]?.list?.()||[];}
  const blob=new Blob([JSON.stringify(dump,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='fleetwise-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Exported');
}

/* ---------- dispatcher ---------- */
const PAGES={Dashboard:pageDashboard,NewRequest:pageNewRequest,MyRequests:pageMyRequests,VehicleAudit:pageVehicleAudit,DAAvailability:pageAvailability,NotificationCenter:pageNotifications,Profile:pageProfile,Chats:pageChats,ManagerDashboard:pageManagerDashboard,AdminDashboard:pageAdminDashboard,FleetDashboard:pageFleetDashboard,AuditTracking:pageAuditTracking,NewDamages:pageNewDamages,DamageTrends:pageDamageTrends,Reports:pageReports,DriverManagement:pageDriverManagement,TeamAvailability:pageTeamAvailability,Onboarding:pageOnboarding,AdminMessages:pageAdminMessages,GlobalSearch:pageGlobalSearch,Settings:pageSettings};
async function renderPage(content){
  const raw=location.hash.slice(1)||'Dashboard';
  const [route,arg]=raw.split('/');
  content.innerHTML='';
  try{
    if(route==='NewRequest'&&arg){await pageRequestForm(content,arg);return;}
    const fn=PAGES[route];
    if(fn)await fn(content);else content.append(el('div',{class:'empty'},'Page not found: '+esc(route)));
  }catch(e){console.error(e);content.append(el('div',{class:'banner warn',html:icon('warn')+'<div><div class="bt">Something went wrong</div><div class="bd">'+esc(e.message)+'</div></div>'}));}
}

boot();
