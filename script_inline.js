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
].map(name => 'assets/images/' + encodeURIComponent(name).replace(/'/g, '%27'));

const intro = document.getElementById('intro');
const app = document.getElementById('app');
const viewer = document.getElementById('viewer');
const img = document.getElementById('pageImage');
const dots = document.getElementById('dots');
const pageCount = document.getElementById('pageCount');
const finalActions = document.getElementById('finalActions');
const loadingScreen = document.getElementById('loadingScreen');
const rsvpModal = document.getElementById('rsvpModal');
const rsvpResult = document.getElementById('rsvpResult');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let index = 0;
let changing = false;
let musicPlaying = false;
let startX = 0, startY = 0;

function buildDots(){
  dots.innerHTML = '';
  pages.forEach((_,i)=>{
    const s = document.createElement('span');
    s.className = 'dot' + (i===0 ? ' active' : '');
    dots.appendChild(s);
  });
}
function render(){
  changing = true;
  viewer.classList.add('changing');
  const preload = new Image();
  preload.onload = () => {
    img.src = pages[index];
    pageCount.textContent = `${index+1} / ${pages.length}`;
    [...dots.children].forEach((d,i)=>d.classList.toggle('active',i===index));
    finalActions.classList.toggle('hidden', index !== pages.length-1);
    setTimeout(()=>{viewer.classList.remove('changing'); changing=false;},80);
  };
  preload.src = pages[index];
}
async function requestFull(){
  try{
    const el = document.documentElement;
    if(el.requestFullscreen) await el.requestFullscreen();
    else if(el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
  }catch(e){}
  setTimeout(()=>window.scrollTo(0,1),120);
}
async function playMusic(){
  try{
    music.muted = false;
    music.volume = 1;
    await music.play();
    musicPlaying = true;
    musicBtn.textContent = '♫';
    musicBtn.classList.add('playing');
    return true;
  }catch(e){
    return false;
  }
}

// Tries to start music immediately. Most mobile browsers allow this only
// after the first user tap, so we also start it on the first touch/click.
function setupAutoMusic(){
  music.load();
  const startOnce = async () => {
    await playMusic();
    document.removeEventListener('touchstart', startOnce);
    document.removeEventListener('click', startOnce);
  };
  document.addEventListener('touchstart', startOnce, {once:true, passive:true});
  document.addEventListener('click', startOnce, {once:true});
}
async function begin(){
  requestFull();
  intro.classList.add('hidden');
  loadingScreen?.classList.remove('hidden');
  playMusic();
  pages.slice(1).forEach(src=>{const p=new Image(); p.src=src;});
  setTimeout(()=>{
    loadingScreen?.classList.add('hidden');
    app.classList.remove('hidden');
    render();
  }, 650);
}
function go(i){
  if(changing) return;
  const next = Math.max(0, Math.min(pages.length-1, i));
  if(next === index) return;
  index = next;
  render();
}
function shareInvite(){
  const data = {title:"Varmisha's Invitation", text:"Please join us for Varmisha's celebration.", url:"https://invite.janaeventlens.com/varmisha"};
  if(navigator.share) navigator.share(data).catch(()=>{});
  else navigator.clipboard?.writeText(data.url);
}

document.getElementById('beginBtn').addEventListener('click', begin);
document.getElementById('nextZone').addEventListener('click', ()=>go(index+1));
document.getElementById('prevZone').addEventListener('click', ()=>go(index-1));
document.getElementById('homeBtn').addEventListener('click', ()=>go(0));
musicBtn.addEventListener('click', async ()=>{
  if(musicPlaying){music.pause(); musicPlaying=false; musicBtn.textContent='♪'; musicBtn.classList.remove('playing');}
  else await playMusic();
});

function openWhatsAppWithMessage(isComing){
  const name = (document.getElementById('guestName')?.value || '').trim();
  const signature = name ? `\n\n- ${name}` : '';
  const message = isComing
    ? `Hello Jana,\n\nWe are delighted to confirm that we will be attending Varmisha's Manjal Neerattu Vizha.\n\nLooking forward to celebrating together.${signature}`
    : `Hello Jana,\n\nUnfortunately we won't be able to attend.\n\nWe wish Varmisha a wonderful celebration.${signature}`;
  const resultText = isComing
    ? 'Thank you for confirming. We look forward to celebrating with you!'
    : 'Thank you for letting us know. We will miss you.';
  rsvpResult.textContent = resultText;
  rsvpResult.classList.remove('hidden');
  window.open('https://wa.me/15199917293?text=' + encodeURIComponent(message), '_blank');
}

document.getElementById('rsvpBtn')?.addEventListener('click', ()=>{
  rsvpResult?.classList.add('hidden');
  rsvpModal?.classList.remove('hidden');
  setTimeout(()=>document.getElementById('guestName')?.focus(),150);
});
document.getElementById('rsvpYes')?.addEventListener('click', ()=>openWhatsAppWithMessage(true));
document.getElementById('rsvpNo')?.addEventListener('click', ()=>openWhatsAppWithMessage(false));
document.getElementById('closeRsvp')?.addEventListener('click', ()=>rsvpModal?.classList.add('hidden'));
rsvpModal?.addEventListener('click', e=>{if(e.target.id==='rsvpModal') rsvpModal.classList.add('hidden')});

document.addEventListener('visibilitychange', ()=>{
  if(document.hidden && musicPlaying){
    music.pause();
    musicPlaying = false;
    musicBtn.textContent = '♪';
    musicBtn.classList.remove('playing');
  }
});
window.addEventListener('pagehide', ()=>{try{music.pause()}catch(e){}});

document.getElementById('shareTop').addEventListener('click', shareInvite);
document.getElementById('shareBtn').addEventListener('click', shareInvite);
document.getElementById('qrBtn').addEventListener('click', ()=>document.getElementById('qrModal').classList.remove('hidden'));
document.getElementById('closeQr').addEventListener('click', ()=>document.getElementById('qrModal').classList.add('hidden'));
document.getElementById('qrModal').addEventListener('click', e=>{if(e.target.id==='qrModal') e.target.classList.add('hidden')});
viewer.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX; startY=e.changedTouches[0].clientY;},{passive:true});
viewer.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-startX, dy=e.changedTouches[0].clientY-startY;
  if(Math.max(Math.abs(dx),Math.abs(dy))<35) return;
  if(Math.abs(dx)>Math.abs(dy)) dx<0?go(index+1):go(index-1); else dy<0?go(index+1):go(index-1);
},{passive:true});
document.addEventListener('keydown',e=>{if(app.classList.contains('hidden'))return; if(['ArrowRight','ArrowDown',' '].includes(e.key))go(index+1); if(['ArrowLeft','ArrowUp'].includes(e.key))go(index-1);});
window.addEventListener('orientationchange',()=>setTimeout(()=>window.scrollTo(0,1),250));
buildDots();
setupAutoMusic();
if('serviceWorker' in navigator){ window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(()=>{})); }
