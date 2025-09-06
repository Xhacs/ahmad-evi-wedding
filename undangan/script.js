// ===== Helper: get query parameter ?to=Nama =====
function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// ===== Splash -> Main toggle =====
const openBtn = document.getElementById('openInvite');
const splash = document.getElementById('splash');
const main = document.getElementById('main');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');

const recipientEl = document.getElementById('recipient');
const toName = getParam('to');
if (toName) recipientEl.textContent = toName.toUpperCase();

openBtn.addEventListener('click', () => {
  splash.style.display = 'none';
  main.classList.remove('hidden');
  bgm.play().catch(()=>{ /* ignore autoplay block */ });
  musicToggle.classList.add('playing');
});

// ===== Music toggle =====
let playing = false;
musicToggle.addEventListener('click', () => {
  playing = !playing;
  if (playing) { bgm.play(); musicToggle.classList.add('playing'); }
  else { bgm.pause(); musicToggle.classList.remove('playing'); }
});

// ===== Countdown (set tanggal acara) =====
const eventTime = new Date('2025-09-29T08:00:00+07:00').getTime();
function tick(){
  const now = Date.now();
  let diff = Math.max(0, eventTime - now);

  const d = Math.floor(diff / (1000*60*60*24)); diff -= d*24*60*60*1000;
  const h = Math.floor(diff / (1000*60*60));    diff -= h*60*60*1000;
  const m = Math.floor(diff / (1000*60));       diff -= m*60*1000;
  const s = Math.floor(diff / 1000);

  document.getElementById('dd').textContent = d;
  document.getElementById('hh').textContent = h.toString().padStart(2,'0');
  document.getElementById('mm').textContent = m.toString().padStart(2,'0');
  document.getElementById('ss').textContent = s.toString().padStart(2,'0');
}
tick();
setInterval(tick, 1000);

// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{ threshold: .15 });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ===== Ucapan (localStorage untuk demo) =====
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');

function loadWishes(){
  const arr = JSON.parse(localStorage.getItem('wishes') || '[]');
  wishList.innerHTML = '';
  arr.forEach(({n,p})=>{
    const div = document.createElement('div');
    div.className = 'wish-item';
    div.innerHTML = `<b>${n}</b><span>${p}</span>`;
    wishList.appendChild(div);
  });
}
loadWishes();

wishForm.addEventListener('submit', e=>{
  e.preventDefault();
  const n = document.getElementById('nama').value.trim();
  const p = document.getElementById('pesan').value.trim();
  if(!n || !p) return;
  const arr = JSON.parse(localStorage.getItem('wishes') || '[]');
  arr.unshift({n, p});
  localStorage.setItem('wishes', JSON.stringify(arr));
  wishForm.reset();
  loadWishes();
});
