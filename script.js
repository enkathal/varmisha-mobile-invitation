const pages = [
  '01 - Cover.png','02 - Cover.png','02 - Invitation.png','03 - Family.png',
  '04 - Grand Entrance (10.30).png','05 - Aarathi Welcome (11.00).png',
  "06 - Maternal Uncle's Ceremony (11.30).png",'07 - Blessings (12.00).png',
  '08 - Lunch (12.30).png','09 - Photography (1.00).png','10 - Cake Cutting (2.30).png','11 - No Presents.png'
].map(name => `assets/images/${encodeURIComponent(name)}`);

let current = 0;
let started = false;
let touchStartX = 0;
const body = document.body;
const loader = document.getElementById('loader');
const intro = document.getElementById('intro');
const viewer = document.getElementById('viewer');
const img = document.getElementById('pageImage');
const counter = document.getElementById('counter');
const dots = document.getElementById('dots');
const actions = document.getElementById('actions');
const hint = document.getElementById('hint');

if (window.innerWidth > 700) body.classList.add('desktop');

function preload(){
  return Promise.all(pages.map(src => new Promise(resolve => {
    const im = new Image(); im.onload = im.onerror = resolve; im.src = src;
  })));
}

function buildDots(){
  dots.innerHTML = '';
  pages.forEach((_, i) => { const s=document.createElement('span'); if(i===0)s.className='active'; dots.appendChild(s); });
}

function showPage(i){
  current = Math.max(0, Math.min(pages.length-1, i));
  viewer.classList.add('fade');
  setTimeout(()=>{
    img.src = pages[current];
    img.alt = `Varmisha invitation page ${current+1}`;
    counter.textContent = `${current+1} / ${pages.length}`;
    [...dots.children].forEach((d,idx)=>d.classList.toggle('active',idx===current));
    actions.classList.toggle('hidden', current !== pages.length-1);
    viewer.classList.remove('fade');
  }, 120);
}

function begin(){
  if(started) return;
  started = true;
  intro.classList.add('hidden');
  viewer.classList.remove('hidden');
  showPage(0);
  setTimeout(()=>hint.classList.add('hide'), 3500);
}

function next(){ showPage(current+1); }
function prev(){ showPage(current-1); }

document.getElementById('beginBtn').addEventListener('click', begin);
intro.addEventListener('click', begin);
intro.addEventListener('keydown', e => { if(e.key==='Enter' || e.key===' ') begin(); });
document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);
document.getElementById('homeBtn').addEventListener('click', () => showPage(0));
document.getElementById('shareBtn').addEventListener('click', async () => {
  const shareData = { title: "Varmisha's Manchal Neerattu Vizha", text: "Please join us for Varmisha's Manchal Neerattu Vizha", url: location.origin };
  if (navigator.share) await navigator.share(shareData).catch(()=>{});
  else navigator.clipboard?.writeText(location.origin);
});

viewer.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].clientX, {passive:true});
viewer.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 45) dx < 0 ? next() : prev();
}, {passive:true});
document.addEventListener('keydown', e => { if(!started)return; if(e.key==='ArrowRight')next(); if(e.key==='ArrowLeft')prev(); });

buildDots();
preload().then(()=> setTimeout(()=>loader.classList.add('done'), 450));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(()=>{}));
