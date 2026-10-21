// Silent, lightweight visit timer. Counts active seconds only (tab visible + activity in last 2 min).
(()=>{try{
const q=new URLSearchParams(location.search);
if(q.get('notrack')==='1')localStorage.setItem('gd_notrack','1');
if(q.get('notrack')==='0')localStorage.removeItem('gd_notrack');
if(localStorage.getItem('gd_notrack')==='1'||navigator.webdriver)return;
const URL_=(window.ASKDAD_URL||'').replace(/\/$/,'');if(!URL_)return;
const SK='gd_visit',IDLE=30*60e3,now=()=>Date.now();
let v=null;try{v=JSON.parse(sessionStorage.getItem(SK)||localStorage.getItem(SK)||'null')}catch(e){}
const nv=()=>({id:(crypto.randomUUID?crypto.randomUUID():now().toString(36)+Math.random().toString(36).slice(2)),start:new Date().toISOString(),act:0,last:now(),secs:[]});
if(!v||now()-v.last>IDLE)v=nv();
const dev=(matchMedia('(display-mode: standalone)').matches||navigator.standalone)?'app':(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)?'mobile':'desktop');
let lastAct=now(),tickAt=now(),seen=new Set(v.secs);
const save=()=>{v.secs=[...seen].slice(0,80);try{localStorage.setItem(SK,JSON.stringify(v))}catch(e){}};
const accrue=()=>{const t=now();if(document.visibilityState==='visible'&&t-lastAct<120e3)v.act+=Math.min(t-tickAt,35e3)/1e3;tickAt=t};
const body=()=>JSON.stringify({session_id:v.id,start:v.start,active_seconds:Math.round(v.act),device:dev,sections:[...seen].slice(0,80)});
const send=b=>{try{if(b&&navigator.sendBeacon)navigator.sendBeacon(URL_+'/visit',new Blob([body()],{type:'text/plain'}));else fetch(URL_+'/visit',{method:'POST',headers:{'Content-Type':'text/plain'},body:body(),keepalive:true,mode:'cors'}).catch(()=>{})}catch(e){}};
const act=()=>{const t=now();if(t-v.last>IDLE){accrue();send(true);v=nv();seen=new Set();tickAt=t}lastAct=t;v.last=t};
['scroll','click','keydown','touchstart','pointerdown','mousemove'].forEach(e=>addEventListener(e,act,{passive:true,capture:true}));
setInterval(()=>{accrue();save();if(document.visibilityState==='visible'&&now()-lastAct<120e3)send(false)},30e3);
const fin=()=>{accrue();save();send(true)};
addEventListener('pagehide',fin);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')fin();else{tickAt=now();act()}});
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting&&x.target.id){seen.add(x.target.id)}}),{threshold:.3});document.querySelectorAll('section[id]').forEach(s=>io.observe(s))}
send(false);
}catch(e){}})();
