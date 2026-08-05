/* JJ CHICKEN — shared behaviour
   Language: real RTL. document.dir flips, layout mirrors via CSS logical properties.
   Data: branches.json + menu.json are the single source of truth. Swap the fetch
   for a CMS or ChatFood feed later without touching markup. */

const ORDER_URL = 'https://order.jjchicken.com';
const CALL_CENTRE = '600545554';
const WHATSAPP = ''; // TODO: confirm official WhatsApp number with Almed

/* ---------- marquee (brand asset — the five quality marks) ---------- */
const MARQUEE_EN = ['HORMONE FREE','GRAIN FED','HALAL','CHARCOAL GRILLED','FRESHLY PREPARED'];
const MARQUEE_AR = ['خالٍ من الهرمونات','مغذّى بالحبوب','حلال','مشوي على الفحم','يُحضَّر طازجاً'];

function initMarquee(){
  const mq = document.getElementById('mq');
  if(!mq) return;
  const ar = document.documentElement.lang === 'ar';
  const words = ar ? MARQUEE_AR : MARQUEE_EN;
  let run = '';
  for(let i = 0; i < 4; i++)
    run += words.map(w => `<span>${w}<i> ★ </i></span>`).join('');
  mq.innerHTML = run + run;
}

/* ---------- quality marks ---------- */
async function initMarks(){
  const wrap = document.getElementById('marks');
  if(!wrap) return;
  const data = await fetch('assets/data/marks.json').then(r => r.json());
  wrap.innerHTML = data.marks.map(m => `
    <div class="mark-badge" data-id="${m.id}">
      <span class="mb-star">★</span>
      <span class="mb-text">
        <span class="en">${m.l1}${m.l2 ? '<br>' + m.l2 : ''}</span>
        <span class="ar">${m.l1Ar}${m.l2Ar ? '<br>' + m.l2Ar : ''}</span>
      </span>
      <span class="mb-rule"></span>
      <span class="mb-dots">·····</span>
    </div>`).join('');
}

/* ---------- language ---------- */
function initLang(){
  const btn = document.getElementById('langBtn');
  if(!btn) return;
  const saved = localStorage.getItem('jj-lang') || 'en';
  apply(saved);
  btn.onclick = () => apply(document.documentElement.lang === 'ar' ? 'en' : 'ar');

  function apply(lang){
    const ar = lang === 'ar';
    document.body.dir = ar ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    btn.textContent = ar ? 'EN' : 'عربي';
    localStorage.setItem('jj-lang', lang);
    initMarquee();
  }
}

/* ---------- sidebar drawer ---------- */
function initDrawer(){
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const scrim  = document.getElementById('scrim');
  const close  = document.getElementById('drawerClose');
  if(!burger || !drawer) return;

  const open  = () => { drawer.classList.add('show'); scrim.classList.add('show'); burger.classList.add('open'); document.body.classList.add('locked'); };
  const shut  = () => { drawer.classList.remove('show'); scrim.classList.remove('show'); burger.classList.remove('open'); document.body.classList.remove('locked'); };

  burger.onclick = () => drawer.classList.contains('show') ? shut() : open();
  scrim.onclick = shut;
  if(close) close.onclick = shut;
  document.addEventListener('keydown', e => { if(e.key === 'Escape') shut(); });
}

/* ---------- sauces (old site: "all sauces freshly homemade, no preservatives") ---------- */
async function initSauces(){
  const wrap = document.getElementById('sauceCloud');
  if(!wrap) return;
  const data = await fetch('assets/data/menu.json').then(r => r.json());
  const hot = ['Buffalo Sauce','Dynamite Sauce','Spicy Dip','Chipotle Sauce'];
  wrap.innerHTML = data.sauces.map(s =>
    `<span class="sauce${hot.includes(s) ? ' hot' : ''}">${s}</span>`).join('');
}

/* ---------- branches ---------- */
async function initBranches(){
  const grid = document.getElementById('locGrid');
  if(!grid) return;
  const branches = await fetch('assets/data/branches.json').then(r => r.json());

  const render = city => {
    const list = city === 'all' ? branches : branches.filter(b => b.city === city);
    grid.innerHTML = list.map(b => b.soon ? `
      <div class="loc soon">
        <div class="loc-city"><span class="en">${b.city}</span><span class="ar">${b.cityAr}</span></div>
        <div class="loc-name"><span class="en">${b.name}</span><span class="ar">${b.nameAr}</span></div>
        <div class="loc-addr"><span class="en">${b.addr}</span><span class="ar">${b.addrAr}</span></div>
        <div class="loc-acts"><span class="loc-act soon-tag"><span class="en">Opening soon</span><span class="ar">قريباً</span></span></div>
      </div>` : `
      <div class="loc">
        <div class="loc-city"><span class="en">${b.city}</span><span class="ar">${b.cityAr}</span></div>
        <div class="loc-name"><span class="en">${b.name}</span><span class="ar">${b.nameAr}</span></div>
        <div class="loc-addr"><span class="en">${b.addr}</span><span class="ar">${b.addrAr}</span></div>
        <div class="loc-acts">
          <a href="${ORDER_URL}" target="_blank" rel="noopener" class="loc-act pri"><span class="en">Order</span><span class="ar">اطلب</span></a>
          <a href="tel:${b.tel.replace(/\s/g,'')}" class="loc-act">${b.tel}</a>
          <a href="${b.map}" target="_blank" rel="noopener" class="loc-act"><span class="en">Directions</span><span class="ar">الاتجاهات</span></a>
          <a href="locations/${b.name.toLowerCase().replace(/ /g,'-')}.html" class="loc-act"><span class="en">Branch page</span><span class="ar">صفحة الفرع</span></a>
        </div>
      </div>`).join('');
    const count = document.getElementById('locCount');
    if(count) count.innerHTML =
      `<span class="en">Showing ${list.length} of ${branches.length} branches</span><span class="ar">عرض ${list.length} من ${branches.length} فرعاً</span>`;
  };

  render('all');
  document.querySelectorAll('#locFilters .chip').forEach(c => {
    c.onclick = () => {
      document.querySelectorAll('#locFilters .chip').forEach(x => x.classList.remove('on'));
      c.classList.add('on');
      render(c.dataset.city);
    };
  });
}

/* ---------- menu ---------- */
async function initMenu(){
  const wrap = document.getElementById('menuWrap');
  if(!wrap) return;
  const data = await fetch('assets/data/menu.json').then(r => r.json());
  const cats = data.categories.filter(c => c.items.length);

  const filters = document.getElementById('menuFilters');
  if(filters){
    filters.innerHTML = `<button class="chip on" data-cat="all"><span class="en">All</span><span class="ar">الكل</span></button>` +
      cats.map(c => `<button class="chip" data-cat="${c.id}"><span class="en">${c.name}</span><span class="ar">${c.nameAr}</span></button>`).join('');
  }

  const chips = arr => arr.map(x =>
    `<span class="mar"><span class="en">${x.name}</span><span class="ar">${x.nameAr}</span></span>`).join('');
  const flavourChips = chips(data.flavours);
  const wingChips    = chips(data.wingSauces);

  const render = catId => {
    const list = catId === 'all' ? cats : cats.filter(c => c.id === catId);
    wrap.innerHTML = list.map(c => `
      <section class="cat">
        <h2 class="cat-title"><span class="en">${c.name}</span><span class="ar">${c.nameAr}</span></h2>
        <div class="cat-ar">${c.nameAr}</div>
        ${c.blurb ? `<p class="cat-blurb"><span class="en">${c.blurb}</span><span class="ar">${c.blurbAr}</span></p>` : ''}
        <div class="items">
          ${c.items.map(i => `
            <article class="item">
              <h3 class="item-name"><span class="en">${i.name}</span><span class="ar">${i.nameAr}</span></h3>
              <div class="item-ar">${i.nameAr}</div>
              ${i.desc ? `<p class="item-desc"><span class="en">${i.desc}</span><span class="ar">${i.descAr}</span></p>` : ''}
              ${i.tags.length ? `<div class="item-tags">${i.tags.map(t =>
                `<span class="tag ${t}"><span class="en">${t === 'sig' ? 'Signature' : 'Best seller'}</span><span class="ar">${t === 'sig' ? 'مميّز' : 'الأكثر مبيعاً'}</span></span>`).join('')}</div>` : ''}
              ${i.flavours ? `<div class="mars">${flavourChips}</div>` : ''}
              ${i.wingSauces ? `<div class="mars">${wingChips}</div>` : ''}
            </article>`).join('')}
        </div>
      </section>`).join('');
  };

  render('all');
  initReveal();
  document.querySelectorAll('#menuFilters .chip').forEach(c => {
    c.onclick = () => {
      document.querySelectorAll('#menuFilters .chip').forEach(x => x.classList.remove('on'));
      c.classList.add('on');
      render(c.dataset.cat);
      initReveal();
      window.scrollTo({top: wrap.offsetTop - 120, behavior: 'smooth'});
    };
  });
}

/* ---------- branch map — every branch, not one ---------- */
let _map = null;

async function initMap(){
  const el = document.getElementById('map');
  if(!el || typeof L === 'undefined') return;

  // a hidden container has no dimensions, so Leaflet renders blank.
  // wait until it is actually on screen, then size it.
  if(el.offsetParent === null || el.clientHeight === 0){
    if(_map) return;
    return void setTimeout(initMap, 150);
  }

  if(_map){ _map.invalidateSize(); return; }

  const branches = (typeof BRANCHES !== 'undefined')
    ? BRANCHES
    : await fetch('assets/data/branches.json').then(r => r.json());
  const pinned = branches.filter(b => b.lat && b.lng);
  if(!pinned.length) return;

  _map = L.map(el, {scrollWheelZoom:false}).setView([25.05, 55.2], 8);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution:'&copy; OpenStreetMap &copy; CARTO', maxZoom:19
  }).addTo(_map);

  const icon = L.divIcon({
    className:'jj-pin', iconSize:[32,32], iconAnchor:[16,16], popupAnchor:[0,-15],
    html:'<span>JJ</span>'
  });

  const pts = [];
  pinned.forEach(b => {
    L.marker([b.lat, b.lng], {icon, title:`JJ Chicken — ${b.name}`})
     .addTo(_map)
     .bindPopup(
       `<strong>${b.name}</strong><span>${b.addr}</span>` +
       `<a href="${b.map}" target="_blank" rel="noopener">Directions</a>` +
       `<a href="tel:${b.tel.replace(/\s/g,'')}">${b.tel}</a>`);
    pts.push([b.lat, b.lng]);
  });
  _map.fitBounds(pts, {padding:[44,44]});
  setTimeout(() => _map.invalidateSize(), 120);
}

/* ---------- scroll reveal ---------- */
const REVEAL_SELECTOR = [
  '.sec', '.sec-head', '.statement', '.marks-band', '.split',
  '.mv-card', '.tl', '.cat', '.pagehead > div', '.hero-inner > *'
].join(',');

const STAGGER_SELECTOR = [
  '.rail', '.usp-grid', '.ex-grid', '.marks', '.loc-grid',
  '.offer-grid', '.mv', '.items', '.sauce-cloud', '.model-grid'
].join(',');

let _revealIO = null;

function initReveal(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;

  if(!_revealIO){
    _revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        e.target.classList.add('in');

        // stagger children by index, capped so long lists do not crawl
        if(e.target.hasAttribute('data-stagger')){
          [...e.target.children].forEach((c, i) => {
            c.style.transitionDelay = Math.min(i * 55, 440) + 'ms';
          });
        }
        _revealIO.unobserve(e.target);
      });
    }, {rootMargin: '0px 0px -12% 0px', threshold: 0.08});
  }

  document.querySelectorAll(STAGGER_SELECTOR).forEach(el => {
    if(el.dataset.stagger !== undefined) return;
    el.setAttribute('data-stagger','');
    _revealIO.observe(el);
  });

  document.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
    if(el.dataset.reveal !== undefined) return;
    if(el.closest('[data-stagger]')) return;      // don't double-animate
    el.setAttribute('data-reveal','');
    _revealIO.observe(el);
  });
}

/* ---------- ember drift ---------- */
function initParallax(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const embers = document.querySelectorAll('.ember');
  if(!embers.length) return;
  let ticking = false;
  const onScroll = () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      embers.forEach((e, i) => {
        e.style.transform = `translate3d(0, ${y * (i % 2 ? -0.06 : 0.09)}px, 0)`;
      });
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, {passive:true});
}

/* content rendered from JSON appears after the first scan — re-scan on settle */
function rescanReveal(){ setTimeout(initReveal, 30); }

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initMap();
  setTimeout(initReveal, 40);
  setTimeout(initReveal, 400);
  initMarquee();
  initLang();
  initDrawer();
  initMarks();
  initSauces();
  initBranches();
  initMenu();
});
