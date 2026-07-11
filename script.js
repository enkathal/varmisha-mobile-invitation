const EVENTLENS_GALLERY_URL = "https://gallery.janaeventlens.com/varmisha";
const pages = [
  '01 - Cover.png',
  '02 - Cover.png',
  '02 - Invitation.png',
  '03 - Family.png',
  '04 - Grand Entrance (10.30).png',
  '05 - Aarathi Welcome (11.00).png',
  "06 - Maternal Uncle's Ceremony (11.30).png",
  '07 - Blessings (12.00).png',
  '08 - Lunch (12.30).png',
  '09 - Photography (1.00).png',
  '10 - Cake Cutting (2.30).png',
  '11 - No Presents.png'
].map(name => `assets/images/${encodeURIComponent(name).replace(/'/g, '%27')}`);

const intro = document.getElementById('intro');
const app = document.getElementById('app');
const viewer = document.getElementById('viewer');
const frame = document.querySelector('.phone-frame');
const img = document.getElementById('pageImage');
const loading = document.getElementById('loading');
const dots = document.getElementById('dots');
const pageCount = document.getElementById('pageCount');
const finalActions = document.getElementById('finalActions');
let index = 0;
let locked = false;
let startX = 0;
let startY = 0;

function buildDots(){
  dots.innerHTML = '';
  pages.forEach((_, i) => {
    const d = document.createElement('span');
    if(i === index) d.className = 'active';
    dots.appendChild(d);
  });
}

function render(){
  loading.classList.remove('hidden');
  viewer.classList.add('changing');
  const next = new Image();
  next.onload = () => {
    img.src = pages[index];
    pageCount.textContent = `${index + 1} / ${pages.length}`;
    [...dots.children].forEach((d, i) => d.classList.toggle('active', i === index));
    const isFinal = index === pages.length - 1;
    finalActions.classList.toggle('hidden', !isFinal);
    frame.classList.toggle('final-page', isFinal);
    loading.classList.add('hidden');
    setTimeout(()=> viewer.classList.remove('changing'), 40);
  };
  next.src = pages[index];
}

function go(to){
  if(locked) return;
  const newIndex = Math.max(0, Math.min(pages.length - 1, to));
  if(newIndex === index) return;
  locked = true;
  index = newIndex;
  render();
  setTimeout(()=> locked = false, 320);
}

function next(){ go(index + 1); }
function prev(){ go(index - 1); }

function hideBrowserBar(){
  try{
    window.scrollTo(0, 1);
    setTimeout(()=>window.scrollTo(0, 1), 250);
    setTimeout(()=>window.scrollTo(0, 1), 700);
  }catch(e){}
}

async function enterFullscreen(){
  try{
    const el = document.documentElement;
    if(el.requestFullscreen) await el.requestFullscreen();
    else if(el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
  }catch(e){}
}

function begin(){
  enterFullscreen();
  hideBrowserBar();
  intro.classList.add('hidden');
  app.classList.remove('hidden');
  render();
  toggleMusic();
  pages.slice(1).forEach(src => { const p = new Image(); p.src = src; });
}

document.getElementById('beginBtn').addEventListener('click', begin);
document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);
document.getElementById('nextZone').addEventListener('click', next);
document.getElementById('prevZone').addEventListener('click', prev);

document.addEventListener('keydown', e => {
  if(app.classList.contains('hidden')) return;
  if(['ArrowRight','ArrowDown',' '].includes(e.key)) next();
  if(['ArrowLeft','ArrowUp'].includes(e.key)) prev();
});

viewer.addEventListener('touchstart', e => {
  startX = e.changedTouches[0].clientX;
  startY = e.changedTouches[0].clientY;
}, {passive:true});

viewer.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if(Math.max(Math.abs(dx), Math.abs(dy)) < 35) return;
  if(Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : prev();
  else dy < 0 ? next() : prev();
}, {passive:true});

let wheelTimer;
viewer.addEventListener('wheel', e => {
  e.preventDefault();
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => e.deltaY > 0 ? next() : prev(), 20);
}, {passive:false});

document.getElementById('shareBtn').addEventListener('click', async () => {
  const shareData = { title: "Varmisha's Manchal Neerattu Vizha", text: 'Please join us for Varmisha’s celebration.', url: "https://invite.janaeventlens.com/varmisha" };
  try {
    if(navigator.share) await navigator.share(shareData);
    else await navigator.clipboard.writeText("https://invite.janaeventlens.com/varmisha");
  } catch(e) {}
});

buildDots();
if('serviceWorker' in navigator){ window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(()=>{})); }


/* V6 music + QR controls */
const musicBtn = document.getElementById('musicBtn');
const qrBtn = document.getElementById('qrBtn');
const qrModal = document.getElementById('qrModal');
const closeQr = document.getElementById('closeQr');
const bgMusic = document.getElementById('bgMusic');

let musicPlaying = false;

async function toggleMusic(){
  if(!bgMusic) return;
  try{
    bgMusic.muted = false;
    bgMusic.volume = 1;
    if(musicPlaying){
      bgMusic.pause();
      musicPlaying = false;
      musicBtn?.classList.remove('playing');
      if(musicBtn) musicBtn.textContent = '♪';
    }else{
      await bgMusic.play();
      musicPlaying = true;
      musicBtn?.classList.add('playing');
      if(musicBtn) musicBtn.textContent = '♫';
    }
  }catch(e){
    alert("Music file not added yet. Add assets/audio/music.mp3 and upload again.");
  }
}

musicBtn?.addEventListener('click', (e)=>{
  e.stopPropagation();
  toggleMusic();
});

qrBtn?.addEventListener('click', (e)=>{
  e.stopPropagation();
  qrModal?.classList.remove('hidden');
});

closeQr?.addEventListener('click', (e)=>{
  e.stopPropagation();
  qrModal?.classList.add('hidden');
});

qrModal?.addEventListener('click', (e)=>{
  if(e.target === qrModal) qrModal.classList.add('hidden');
});

// Try to collapse Android browser bar after entering the invitation.
window.addEventListener('orientationchange', ()=>{
  setTimeout(()=>window.scrollTo(0,1), 250);
});


// Attempt music immediately; if blocked, first touch/click starts it.
function setupAutoMusicFinal(){
  try{ bgMusic?.load(); bgMusic?.play().then(()=>{musicPlaying=true; musicBtn?.classList.add('playing'); if(musicBtn) musicBtn.textContent='♫';}).catch(()=>{}); }catch(e){}
  const startOnce=()=>{ if(!musicPlaying) toggleMusic(); document.removeEventListener('touchstart', startOnce); document.removeEventListener('click', startOnce); };
  document.addEventListener('touchstart', startOnce, {once:true, passive:true});
  document.addEventListener('click', startOnce, {once:true});
}
setupAutoMusicFinal();
