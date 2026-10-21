// Ask Dad live chat. Self-contained: replaces the old .fab/.ask form behaviour.
(()=>{const URL_=(window.ASKDAD_URL||'').replace(/\/$/,''),K='gudiya-askdad-v1';
const css=`.ad-p{position:fixed;right:16px;bottom:84px;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100dvh - 110px));background:#fff;border-radius:20px;box-shadow:0 18px 50px rgba(60,20,90,.28);display:none;flex-direction:column;overflow:hidden;z-index:9999;font-family:inherit}
.ad-p.on{display:flex}.ad-h{background:linear-gradient(135deg,#7b2ff7,#f107a3);color:#fff;padding:12px 14px;display:flex;align-items:center;gap:8px}.ad-h b{flex:1;font-size:1.05rem}.ad-h button{background:none;border:0;color:#fff;font-size:1.3rem;cursor:pointer;padding:4px 8px}
.ad-m{flex:1;overflow-y:auto;padding:12px;background:#faf7ff;display:flex;flex-direction:column;gap:8px}.ad-b{max-width:85%;padding:9px 12px;border-radius:16px;white-space:pre-wrap;line-height:1.4;font-size:.95rem;word-wrap:break-word}
.ad-u{align-self:flex-end;background:#7b2ff7;color:#fff;border-bottom-right-radius:4px}.ad-a{align-self:flex-start;background:#fff;border:1px solid #eadcff;color:#2b1a3d;border-bottom-left-radius:4px}.ad-e{align-self:center;background:#fff0f3;color:#a0153e;font-size:.85rem}
.ad-t span{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#b28cf5;animation:adb 1s infinite}.ad-t span:nth-child(2){animation-delay:.15s}.ad-t span:nth-child(3){animation-delay:.3s}@keyframes adb{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-4px)}}
.ad-f{display:flex;gap:6px;padding:10px;border-top:1px solid #eee;background:#fff}.ad-f textarea{flex:1;resize:none;border:1px solid #ddd;border-radius:14px;padding:9px 11px;font:inherit;font-size:16px;max-height:110px}.ad-f button{border:0;border-radius:14px;background:#7b2ff7;color:#fff;padding:0 16px;font-weight:600;cursor:pointer}.ad-f button:disabled{opacity:.5}
.ad-v{align-self:flex-start;display:flex;flex-direction:column;gap:6px;max-width:85%}.ad-v a{display:flex;gap:9px;align-items:center;background:#fff;border:1px solid #f3c4e4;border-radius:14px;padding:6px;text-decoration:none;color:#2b1a3d}.ad-v a:hover{border-color:#f107a3}.ad-v img{width:96px;height:54px;object-fit:cover;border-radius:9px;flex:none}.ad-v .vt{font-size:.85rem;font-weight:600;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.ad-v .vc{font-size:.75rem;color:#8a6aa8;margin-top:2px}.ad-v .vl{font-size:.75rem;color:#a0153e;font-weight:600}
.ad-mic{border:0;border-radius:50%;width:44px;height:44px;min-width:44px;background:#f3ecff;color:#7b2ff7;font-size:1.25rem;cursor:pointer;position:relative;align-self:flex-end}.ad-mic.on{background:#e0245e;color:#fff;animation:adp 1.2s infinite}@keyframes adp{0%{box-shadow:0 0 0 0 rgba(224,36,94,.55)}70%{box-shadow:0 0 0 12px rgba(224,36,94,0)}100%{box-shadow:0 0 0 0 rgba(224,36,94,0)}}.ad-mic.busy{opacity:.6}
.ad-o{display:flex;align-items:center;gap:6px;padding:0 12px 8px;font-size:.78rem;color:#8a6aa8;background:#fff}.ad-o[hidden]{display:none}.ad-n{align-self:center;background:#fff7e6;color:#8a5a00;font-size:.85rem}
.ad-f .ad-s{align-self:flex-end;height:44px}
@media(max-width:600px){.ad-mic{width:52px;height:52px;min-width:52px;font-size:1.4rem}.ad-f .ad-s{height:52px}.ad-p{right:0;left:0;bottom:0;width:100vw;height:100dvh;border-radius:0}}`;
const s=document.createElement('style');s.textContent=css;document.head.append(s);
const p=document.createElement('div');p.className='ad-p';p.setAttribute('role','dialog');p.setAttribute('aria-label','Ask Dad chat');
p.innerHTML='<div class="ad-h"><b>💬 Ask Dad</b><button class="ad-c" title="New chat" aria-label="Start a new chat">↺</button><button class="ad-x" aria-label="Close">×</button></div><div class="ad-m" aria-live="polite"></div><form class="ad-f"><textarea rows="1" maxlength="4000" placeholder="Ask me anything…"></textarea><button type="button" class="ad-mic" aria-label="Speak your question" title="Tap to speak" hidden>🎤</button><button type="submit" class="ad-s">Send</button></form><label class="ad-o" hidden><input type="checkbox" class="ad-auto"> Send automatically when I stop talking</label>';
document.body.append(p);const M=p.querySelector('.ad-m'),ta=p.querySelector('textarea'),btn=p.querySelector('.ad-s');
let H=[];try{H=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){}
const save=()=>localStorage.setItem(K,JSON.stringify(H.slice(-60)));
function add(c,t){const d=document.createElement('div');d.className='ad-b '+c;d.textContent=t;M.append(d);M.scrollTop=M.scrollHeight;return d}
function vids(v){if(!v||!v.length)return;const w=document.createElement('div');w.className='ad-v';w.innerHTML='<div class="vl">▶ Watch this</div>';v.forEach(x=>{const m=(x.url||'').match(/v=([\w-]{11})/);if(!m)return;const a=document.createElement('a');a.href='https://www.youtube.com/watch?v='+m[1];a.target='_blank';a.rel='noopener';const i=document.createElement('img');i.src='https://i.ytimg.com/vi/'+m[1]+'/mqdefault.jpg';i.alt='';i.loading='lazy';const d=document.createElement('div');const t=document.createElement('div');t.className='vt';t.textContent=x.title||'YouTube video';const c=document.createElement('div');c.className='vc';c.textContent=(x.channel||'')+(x.date?' · '+x.date:'');d.append(t,c);a.append(i,d);w.append(a)});M.append(w);M.scrollTop=M.scrollHeight}
function render(){M.innerHTML='';add('ad-a','Hi Gudiya 💜 Ask me anything about the course, a tool, or your day. I\'m here.');H.forEach(m=>{add(m.role==='user'?'ad-u':'ad-a',m.content);vids(m.videos)})}
render();
const old=document.querySelector('.fab');const oldAsk=document.querySelector('.ask');if(oldAsk)oldAsk.remove();
let fab=old;if(old){fab=old.cloneNode(true);old.replaceWith(fab)}
const open=v=>{p.classList.toggle('on',v);if(v){M.scrollTop=M.scrollHeight;setTimeout(()=>ta.focus(),150)}};
fab&&fab.addEventListener('click',()=>open(!p.classList.contains('on')));document.querySelector('.fab-l')?.addEventListener('click',()=>open(true));
p.querySelector('.ad-x').onclick=()=>open(false);document.addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
p.querySelector('.ad-c').onclick=()=>{H=[];save();render()};
ta.addEventListener('input',()=>{ta.style.height='auto';ta.style.height=Math.min(ta.scrollHeight,110)+'px'});
ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();p.querySelector('form').requestSubmit()}});

// ---- Voice input ----
const mic=p.querySelector('.ad-mic'),opt=p.querySelector('.ad-o'),auto=p.querySelector('.ad-auto');
auto.checked=localStorage.getItem(K+'-auto')==='1';auto.onchange=()=>localStorage.setItem(K+'-auto',auto.checked?'1':'0');
function note(t){const d=add('ad-b ad-n',t);setTimeout(()=>d.remove(),6000)}
function grow(){ta.style.height='auto';ta.style.height=Math.min(ta.scrollHeight,110)+'px'}
function done(){mic.classList.remove('on','busy');mic.setAttribute('aria-label','Speak your question');if(auto.checked&&ta.value.trim())p.querySelector('form').requestSubmit();else ta.focus()}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null,listening=false,base='',heard=false;
if(SR){mic.hidden=false;opt.hidden=false;
 mic.onclick=()=>{if(listening){rec&&rec.stop();return}
  rec=new SR();rec.lang='en-US';rec.interimResults=true;rec.continuous=true;base=ta.value.trim()?ta.value.trim()+' ':'';heard=false;
  rec.onresult=e=>{let t='';for(let i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;heard=heard||!!t.trim();ta.value=base+t;grow()};
  rec.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed')note('🎤 I need permission to use your microphone. Tap the lock icon by the address bar, allow the microphone, then try again.');else if(e.error==='no-speech')note('I didn’t hear anything. Tap the mic and try again 💜');else if(e.error==='audio-capture')note('No microphone found on this device.');else if(e.error!=='aborted')note('Voice typing had a hiccup. Please try again or type instead.')};
  rec.onend=()=>{listening=false;if(!heard&&!ta.value.trim()){}done()};
  try{rec.start();listening=true;mic.classList.add('on');mic.setAttribute('aria-label','Stop listening')}catch(e){note('Voice typing isn’t available right now. Please type instead.')}};
}else if(window.MediaRecorder&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&URL_){mic.hidden=false;opt.hidden=false;let mr=null,chunks=[],stream=null;
 mic.onclick=async()=>{if(mr&&mr.state==='recording'){mr.stop();return}
  try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){note(e&&e.name==='NotFoundError'?'No microphone found on this device.':'🎤 I need permission to use your microphone. Allow it in your browser settings, then try again.');return}
  const type=['audio/webm;codecs=opus','audio/ogg;codecs=opus','audio/mp4'].find(t=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t))||'';
  mr=new MediaRecorder(stream,type?{mimeType:type}:{});chunks=[];mr.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  mr.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());mic.classList.remove('on');mic.classList.add('busy');const b=new Blob(chunks,{type:mr.mimeType||'audio/webm'});
   if(b.size<1500){note('I didn’t hear anything. Tap the mic and try again 💜');mic.classList.remove('busy');return}
   try{const r=await fetch(URL_+'/stt',{method:'POST',headers:{'Content-Type':b.type},body:b});const d=await r.json().catch(()=>({}));
    if(!r.ok)throw 0;if(!d.text){note('I didn’t catch that. Tap the mic and try again 💜');mic.classList.remove('busy');return}
    ta.value=(ta.value.trim()?ta.value.trim()+' ':'')+d.text;grow();done()}catch(e){note('Couldn’t turn that into text. Please try again or type instead.');mic.classList.remove('busy')}};
  mr.start();mic.classList.add('on');mic.setAttribute('aria-label','Stop recording');setTimeout(()=>{if(mr&&mr.state==='recording')mr.stop()},120000)};
}
p.querySelector('form').onsubmit=async e=>{e.preventDefault();const q=ta.value.trim();if(!q||btn.disabled)return;
ta.value='';ta.style.height='auto';H.push({role:'user',content:q});save();add('ad-u',q);
const t=add('ad-a ad-t','');t.innerHTML='<span></span><span></span><span></span>';btn.disabled=true;
try{if(!URL_)throw new Error('Dad\'s chat is getting set up. Please try again soon.');
const r=await fetch(URL_+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:H.slice(-20).map(m=>({role:m.role,content:m.content}))})});
const d=await r.json().catch(()=>({}));if(!r.ok||!d.answer)throw new Error(d.error||'Hmm, that didn’t go through. Please try again in a moment.');
t.remove();const vv=Array.isArray(d.videos)?d.videos.slice(0,2):[];H.push({role:'assistant',content:d.answer,videos:vv});save();add('ad-a',d.answer);vids(vv)}
catch(err){t.remove();H.pop();save();add('ad-e',err.message);ta.value=q}finally{btn.disabled=false}};
})();
