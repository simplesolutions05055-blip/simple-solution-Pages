/* Init lucide */
if(window.lucide) lucide.createIcons();

/* Cursor */
(function(){
  const dot=document.getElementById('cur-dot'),ring=document.getElementById('cur-ring');
  if(!dot) return;
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  (function loop(){
    rx+=(mx-rx)*.2;ry+=(my-ry)*.2;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  function attach(sel,cls){
    document.querySelectorAll(sel).forEach(el=>{
      el.addEventListener('mouseenter',()=>ring.classList.add(cls));
      el.addEventListener('mouseleave',()=>ring.classList.remove(cls));
    });
  }
  attach('a, button, [data-magnetic], input, textarea, select, summary','cta');
  attach('[data-view]','view');
  attach('[data-quote]','quote');
})();

/* Magnetic */
document.querySelectorAll('[data-magnetic]').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=e.clientX-(r.left+r.width/2);
    const y=e.clientY-(r.top+r.height/2);
    el.style.transform=`translate(${x*.2}px,${y*.25}px)`;
  });
  el.addEventListener('mouseleave',()=>{el.style.transform=''});
});

/* WORD-based split */
document.querySelectorAll('[data-split]').forEach((line,li)=>{
  const words = line.textContent.trim().split(/\s+/);
  const accent = line.hasAttribute('data-accent');
  line.textContent='';
  words.forEach((w,i)=>{
    const wrap = document.createElement('span');
    wrap.className = 'word';
    const inner = document.createElement('span');
    inner.textContent = w;
    if(accent) inner.classList.add('gold-text');
    inner.style.animationDelay = (0.5 + li*0.18 + i*0.07) + 's';
    wrap.appendChild(inner);
    line.appendChild(wrap);
    line.appendChild(document.createTextNode(' '));
  });
});

/* Hero parallax */
(function(){
  const p=document.getElementById('hero-parallax'); if(!p) return;
  window.addEventListener('mousemove',e=>{
    const x=(e.clientX/innerWidth-.5)*12;
    const y=(e.clientY/innerHeight-.5)*8;
    p.style.transform=`translate3d(${x}px,${y}px,0)`;
  });
})();

/* Reveal + count-up */
const io=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('on');
      if(e.target.classList.contains('stat-cell')){
        const num=e.target.querySelector('.stat-num');
        if(num && !num.dataset.done){animateCount(num);num.dataset.done='1'}
      }
      io.unobserve(e.target);
    }
  });
},{threshold:.15,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

function animateCount(el){
  const t=parseInt(el.dataset.count,10);
  const pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
  let s=performance.now();
  function tick(now){
    const k=Math.min((now-s)/1600,1);
    const e=1-Math.pow(1-k,3);
    el.textContent=pre+Math.floor(t*e)+suf;
    if(k<1) requestAnimationFrame(tick); else el.textContent=pre+t+suf;
  }
  el.textContent=pre+'0'+suf;requestAnimationFrame(tick);
}

/* Side rail + dark/light cursor context */
(function(){
  const dots=document.querySelectorAll('.rail-dot');
  if(!dots.length) return;
  const body=document.body;
  // Identify which section IDs have dark backgrounds via data attribute
  const sections = [...dots].map(d=>{
    const href = d.getAttribute('href');
    return href && href.startsWith('#') ? href.slice(1) : null;
  }).filter(Boolean);
  const darkIds = new Set([...document.querySelectorAll('[data-dark]')].map(el=>el.id));
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        const idx=sections.indexOf(e.target.id);
        if(idx>=0){
          dots.forEach(d=>d.classList.remove('active'));
          dots[idx]?.classList.add('active');
          body.classList.toggle('on-dark-ctx', darkIds.has(e.target.id));
        }
      }
    });
  },{threshold:.35});
  sections.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el)});
})();

/* Header hide-on-scroll + light/dark bg */
(function(){
  const h=document.getElementById('header');
  if(!h) return;
  let lastY=0;
  const first=document.querySelector('[data-page-start-dark]');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(y>200 && y>lastY) h.classList.add('hide'); else h.classList.remove('hide');
    lastY=y;
    if(first){
      const bottom = first.offsetTop + first.offsetHeight - 80;
      h.classList.toggle('on-dark-bg', y < bottom);
    } else {
      h.classList.remove('on-dark-bg');
    }
  });
})();
