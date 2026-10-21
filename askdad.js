// Ask Dad live chat. Self-contained: replaces the old .fab/.ask form behaviour.
(()=>{const URL_=(window.ASKDAD_URL||'').replace(/\/$/,''),K='gudiya-askdad-v1';
const css=`.ad-p{position:fixed;right:16px;bottom:84px;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100dvh - 110px));background:#fff;border-radius:20px;box-shadow:0 18px 50px rgba(60,20,90,.28);display:none;flex-direction:column;overflow:hidden;z-index:9999;font-family:inherit}
.ad-p.on{display:flex}.ad-h{background:linear-gradient(135deg,#7b2ff7,#f107a3);color:#fff;padding:12px 14px;display:flex;align-items:center;gap:8px}.ad-h b{flex:1;font-size:1.05rem}.ad-h button{background:none;border:0;color:#fff;font-size:1.3rem;cursor:pointer;padding:4px 8px}
.ad-m{flex:1;overflow-y:auto;padding:12px;background:#faf7ff;display:flex;flex-direction:column;gap:8px}.ad-b{max-width:85%;padding:9px 12px;border-radius:16px;white-space:pre-wrap;line-height:1.4;font-size:.95rem;word-wrap:break-word}
.ad-u{align-self:flex-end;background:#7b2ff7;color:#fff;border-bottom-right-radius:4px}.ad-a{align-self:flex-start;background:#fff;border:1px solid #eadcff;color:#2b1a3d;border-bottom-left-radius:4px}.ad-e{align-self:center;background:#fff0f3;color:#a0153e;font-size:.85rem}
.ad-t span{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#b28cf5;animation:adb 1s infinite}.ad-t span:nth-child(2){animation-delay:.15s}.ad-t span:nth-child(3){animation-delay:.3s}@keyframes adb{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-4px)}}
.ad-f{display:flex;gap:6px;padding:10px;border-top:1px solid #eee;background:#fff}.ad-f textarea{flex:1;resize:none;border:1px solid #ddd;border-radius:14px;padding:9px 11px;font:inherit;font-size:16px;max-height:110px}.ad-f button{border:0;border-radius:14px;background:#7b2ff7;color:#fff;padding:0 16px;font-weight:600;cursor:pointer}.ad-f button:disabled{opacity:.5}
@media(max-width:600px){.ad-p{right:0;left:0;bottom:0;width:100vw;height:100dvh;border-radius:0}}`;
const s=document.createElement('style');s.textContent=css;document.head.append(s);
const p=document.createElement('div');p.className='ad-p';p.setAttribute('role','dialog');p.setAttribute('aria-label','Ask Dad chat');
p.innerHTML='<div class="ad-h"><b>💬 Ask Dad</b><button class="ad-c" title="New chat" aria-label="Start a new chat">↺</button><button class="ad-x" aria-label="Close">×</button></div><div class="ad-m" aria-live="polite"></div><form class="ad-f"><textarea rows="1" maxlength="4000" placeholder="Ask me anything…"></textarea><button type="submit">Send</button></form>';
document.body.append(p);const M=p.querySelector('.ad-m'),ta=p.querySelector('textarea'),btn=p.querySelector('.ad-f button');
let H=[];try{H=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){}
const save=()=>localStorage.setItem(K,JSON.stringify(H.slice(-60)));
function add(c,t){const d=document.createElement('div');d.className='ad-b '+c;d.textContent=t;M.append(d);M.scrollTop=M.scrollHeight;return d}
function render(){M.innerHTML='';add('ad-a','Hi Gudiya 💜 Ask me anything about the course, a tool, or your day. I\'m here.');H.forEach(m=>add(m.role==='user'?'ad-u':'ad-a',m.content))}
render();
const old=document.querySelector('.fab');const oldAsk=document.querySelector('.ask');if(oldAsk)oldAsk.remove();
let fab=old;if(old){fab=old.cloneNode(true);old.replaceWith(fab)}
const open=v=>{p.classList.toggle('on',v);if(v){M.scrollTop=M.scrollHeight;setTimeout(()=>ta.focus(),150)}};
fab&&fab.addEventListener('click',()=>open(!p.classList.contains('on')));document.querySelector('.fab-l')?.addEventListener('click',()=>open(true));
p.querySelector('.ad-x').onclick=()=>open(false);document.addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
p.querySelector('.ad-c').onclick=()=>{H=[];save();render()};
ta.addEventListener('input',()=>{ta.style.height='auto';ta.style.height=Math.min(ta.scrollHeight,110)+'px'});
ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();p.querySelector('form').requestSubmit()}});
p.querySelector('form').onsubmit=async e=>{e.preventDefault();const q=ta.value.trim();if(!q||btn.disabled)return;
ta.value='';ta.style.height='auto';H.push({role:'user',content:q});save();add('ad-u',q);
const t=add('ad-a ad-t','');t.innerHTML='<span></span><span></span><span></span>';btn.disabled=true;
try{if(!URL_)throw new Error('Dad\'s chat is getting set up. Please try again soon.');
const r=await fetch(URL_+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:H.slice(-20)})});
const d=await r.json().catch(()=>({}));if(!r.ok||!d.answer)throw new Error(d.error||'Hmm, that didn’t go through. Please try again in a moment.');
t.remove();H.push({role:'assistant',content:d.answer});save();add('ad-a',d.answer)}
catch(err){t.remove();H.pop();save();add('ad-e',err.message);ta.value=q}finally{btn.disabled=false}};
})();
