const slides=[...document.querySelectorAll('.slide')];
const total=slides.length;
let current=0;
const music=document.getElementById('bgMusic');
const musicBtn=document.getElementById('musicBtn');
const dots=document.getElementById('dots');
const pageNow=document.getElementById('pageNow');
const pageTotal=document.getElementById('pageTotal');
const toast=document.getElementById('toast');
pageTotal.textContent=total;

for(let i=0;i<total;i++){
  const d=document.createElement('button');
  d.className='dot';
  d.setAttribute('aria-label','Go to page '+(i+1));
  d.onclick=()=>goTo(i);
  dots.appendChild(d);
}
const dotEls=[...document.querySelectorAll('.dot')];
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
function update(){slides.forEach((s,i)=>s.classList.toggle('active',i===current));dotEls.forEach((d,i)=>d.classList.toggle('active',i===current));pageNow.textContent=current+1;}
function goTo(i){current=Math.max(0,Math.min(total-1,i));update();}
function next(){goTo(current+1)}
function prev(){goTo(current-1)}
async function playMusic(){try{await music.play();musicBtn.textContent='🔊';return true}catch(e){showToast('Tap 🎵 to play music');return false}}
function pauseMusic(){music.pause();musicBtn.textContent='🎵'}

document.getElementById('nextBtn').onclick=next;
document.getElementById('prevBtn').onclick=prev;
document.getElementById('homeBtn').onclick=()=>goTo(0);
document.getElementById('enterBtn').onclick=async()=>{await playMusic();goTo(1)};
musicBtn.onclick=()=> music.paused ? playMusic() : pauseMusic();

const browserBtn=document.getElementById('browserBtn');
if(/Android/i.test(navigator.userAgent)){
  browserBtn.href='intent://varmisha.netlify.app/#Intent;scheme=https;package=com.android.chrome;end';
}

document.getElementById('shareBtn').onclick=async()=>{
  const shareData={title:'Varmisha Manchal Neerattu Vizha',text:'You are warmly invited to Varmisha’s Manchal Neerattu Vizha.',url:'https://varmisha.netlify.app/'};
  if(navigator.share){try{await navigator.share(shareData)}catch(e){}}
  else {await navigator.clipboard.writeText(shareData.url);showToast('Link copied')}
};

let startX=0,startY=0;
document.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY},{passive:true});
document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;const dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){dx<0?next():prev()}},{passive:true});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();});
update();
setTimeout(()=>showToast('Tap Enter or 🎵 for music'),900);
