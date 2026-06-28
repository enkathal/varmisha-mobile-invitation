const CACHE = 'varmisha-v3';
const ASSETS = [
  '/', 'index.html', 'style.css', 'script.js', 'manifest.json', 'favicon.png',
  'assets/icons/icon-192.png', 'assets/icons/icon-512.png',
  'assets/images/01%20-%20Cover.png',
  'assets/images/02%20-%20Cover.png',
  'assets/images/02%20-%20Invitation.png',
  'assets/images/03%20-%20Family.png',
  'assets/images/04%20-%20Grand%20Entrance%20(10.30).png',
  'assets/images/05%20-%20Aarathi%20Welcome%20(11.00).png',
  'assets/images/06%20-%20Maternal%20Uncle%27s%20Ceremony%20(11.30).png',
  'assets/images/07%20-%20Blessings%20(12.00).png',
  'assets/images/08%20-%20Lunch%20(12.30).png',
  'assets/images/09%20-%20Photography%20(1.00).png',
  'assets/images/10%20-%20Cake%20Cutting%20(2.30).png',
  'assets/images/11%20-%20No%20Presents.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
