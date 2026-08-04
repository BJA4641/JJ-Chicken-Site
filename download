/* JJ CHICKEN — shared behaviour
   Language: real RTL. document.dir flips, layout mirrors via CSS logical properties.
   Data: branches.json + menu.json are the single source of truth. Swap the fetch
   for a CMS or ChatFood feed later without touching markup. */

const ORDER_URL = 'https://order.jjchicken.com';
const CALL_CENTRE = '600545554';
const WHATSAPP = ''; // TODO: confirm official WhatsApp number with Almed

/* ---------- marquee (brand book asset) ---------- */
function initMarquee(){
  const mq = document.getElementById('mq');
  if(!mq) return;
  let s = '';
  for(let i=0;i<12;i++) s += '<span>HORMONE FREE<i> · </i>GRAIN FEED<i> · </i></span>';
  mq.innerHTML = s + s;
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
  document.querySelectorAll('#menuFilters .chip').forEach(c => {
    c.onclick = () => {
      document.querySelectorAll('#menuFilters .chip').forEach(x => x.classList.remove('on'));
      c.classList.add('on');
      render(c.dataset.cat);
      window.scrollTo({top: wrap.offsetTop - 120, behavior: 'smooth'});
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMarquee();
  initLang();
  initDrawer();
  initBranches();
  initMenu();
});
