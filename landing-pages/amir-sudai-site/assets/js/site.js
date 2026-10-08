(function(){
  "use strict";
  var d=document, root=d.documentElement;
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* header on scroll */
  var hdr=d.querySelector(".site-header");
  function onScroll(){ if(hdr) hdr.classList.toggle("scrolled", window.scrollY>40); }
  addEventListener("scroll",onScroll,{passive:true}); onScroll();

  /* mobile menu */
  var burger=d.querySelector(".burger");
  if(burger){
    burger.addEventListener("click",function(){
      var open=!d.body.classList.contains("menu-open");
      d.body.classList.toggle("menu-open",open);
      burger.setAttribute("aria-expanded",open);
      d.body.style.overflow=open?"hidden":"";
    });
  }
  /* dropdown */
  d.querySelectorAll(".has-dd").forEach(function(li){
    var b=li.querySelector(".dd");
    b.addEventListener("click",function(e){
      e.preventDefault();
      var open=!li.classList.contains("open");
      li.classList.toggle("open",open); b.setAttribute("aria-expanded",open);
    });
    li.addEventListener("keydown",function(e){ if(e.key==="Escape"){li.classList.remove("open");b.setAttribute("aria-expanded","false");b.focus();} });
  });
  d.addEventListener("click",function(e){ d.querySelectorAll(".has-dd.open").forEach(function(li){ if(!li.contains(e.target)){li.classList.remove("open");li.querySelector(".dd").setAttribute("aria-expanded","false");} }); });
  d.addEventListener("keydown",function(e){ if(e.key==="Escape"&&d.body.classList.contains("menu-open")){burger.click();} });

  /* split titles into words */
  d.querySelectorAll("[data-split]").forEach(function(el){
    var i=0;
    function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var parts=n.textContent.split(/(\s+)/), frag=d.createDocumentFragment();
          parts.forEach(function(p){
            if(!p) return;
            if(/^\s+$/.test(p)){frag.appendChild(d.createTextNode(p));return;}
            var w=d.createElement("span");w.className="w";
            var s=d.createElement("span");s.style.setProperty("--i",i++);s.textContent=p;
            w.appendChild(s);frag.appendChild(w);
          });
          node.replaceChild(frag,n);
        } else if(n.nodeType===1 && n.tagName!=="BR"){ walk(n); }
      });
    }
    walk(el); el.classList.add("split");
  });

  /* reveal on view */
  var targets=d.querySelectorAll(".rv,.rv-s,.split,.flow");
  if("IntersectionObserver" in window && !reduce){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }); },{rootMargin:"0px 0px -8% 0px",threshold:.12});
    targets.forEach(function(t){io.observe(t);});
  } else { targets.forEach(function(t){t.classList.add("in");}); }

  /* flow path: connect the step circles with a flowing curve */
  function drawFlows(){
    d.querySelectorAll(".flow").forEach(function(fl){
      var svg=fl.querySelector("svg.path"); if(!svg) return;
      var fr=fl.getBoundingClientRect(), nums=fl.querySelectorAll(".num");
      if(nums.length<2||getComputedStyle(svg).display==="none") return;
      svg.setAttribute("viewBox","0 0 "+fr.width+" "+fr.height);
      var pts=[].map.call(nums,function(n){var r=n.getBoundingClientRect();return [r.left-fr.left+r.width/2,r.top-fr.top+r.height/2];});
      var dd="M"+pts[0][0]+","+pts[0][1];
      for(var i=1;i<pts.length;i++){
        var a=pts[i-1],b=pts[i],my=(b[1]-a[1]);
        dd+=" C"+a[0]+","+(a[1]+my*.75)+" "+b[0]+","+(b[1]-my*.75)+" "+b[0]+","+b[1];
      }
      svg.querySelectorAll("path").forEach(function(p){ p.setAttribute("d",dd); try{p.style.setProperty("--len",p.getTotalLength());}catch(e){} });
    });
  }
  drawFlows(); addEventListener("resize",drawFlows); addEventListener("load",drawFlows);

  /* hero video: choose source by viewport, pause when hidden */
  var hv=d.querySelector(".intro video, .hero video");
  if(hv){
    var src=matchMedia("(max-width: 760px)").matches ? hv.dataset.mobile : hv.dataset.desktop;
    if(src && !reduce){ hv.src=src; hv.play && hv.play().catch(function(){}); }
    if(reduce){ hv.remove(); }
  }

  /* cursor glow */
  var glow=d.querySelector(".glow");
  if(glow && !reduce){ addEventListener("pointermove",function(e){ glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px"; },{passive:true}); }

  /* chooser tabs */
  d.querySelectorAll(".chooser").forEach(function(c){
    var tabs=c.querySelectorAll("[role=tab]");
    tabs.forEach(function(t,ix){
      t.addEventListener("click",function(){ sel(t); });
      t.addEventListener("keydown",function(e){
        var n=null;
        if(e.key==="ArrowLeft") n=tabs[(ix+1)%tabs.length];
        if(e.key==="ArrowRight") n=tabs[(ix-1+tabs.length)%tabs.length];
        if(n){e.preventDefault();n.focus();sel(n);}
      });
    });
    function sel(t){
      tabs.forEach(function(x){ x.setAttribute("aria-selected",x===t); x.tabIndex=x===t?0:-1; var p=d.getElementById(x.getAttribute("aria-controls")); p.hidden=x!==t; p.classList.toggle("show",x===t); });
    }
  });

  /* forms (sketch mode: validate + show success, nothing is sent) */
  d.querySelectorAll(".lead-form form").forEach(function(f){
    f.setAttribute("novalidate","");
    f.addEventListener("submit",function(e){
      e.preventDefault();
      var ok=true;
      f.querySelectorAll("[required]").forEach(function(inp){
        var fld=inp.closest(".field")||inp.closest(".consent");
        var bad=false;
        if(inp.type==="checkbox") bad=!inp.checked;
        else if(inp.type==="tel") bad=!/^0\d{1,2}-?\d{7}$/.test(inp.value.replace(/\s/g,""));
        else if(inp.type==="email") bad=!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value);
        else bad=!inp.value.trim();
        if(fld) fld.classList.toggle("err",bad);
        inp.setAttribute("aria-invalid",bad);
        if(bad&&ok){ok=false;inp.focus();}
      });
      if(!ok) return;
      var box=f.closest(".lead-form"); box.classList.add("sent");
      var done=box.querySelector(".f-done"); if(done){done.setAttribute("tabindex","-1");done.focus();}
    });
    f.querySelectorAll("input,select,textarea").forEach(function(inp){ inp.addEventListener("input",function(){ var fld=inp.closest(".field"); if(fld) fld.classList.remove("err"); inp.removeAttribute("aria-invalid"); }); });
  });

  /* ===== accessibility widget ===== */
  var KEY="as_a11y";
  var state={};
  try{ state=JSON.parse(localStorage.getItem(KEY)||"{}")||{}; }catch(e){ state={}; }
  var modes=["contrast","gray","links","readable","cursor","still","headings"];
  function apply(){
    modes.forEach(function(m){ root.classList.toggle("a11y-"+m,!!state[m]); });
    root.style.fontSize=state.size?(100+state.size*10)+"%":"";
    d.querySelectorAll(".a11y-grid [data-mode]").forEach(function(b){ b.setAttribute("aria-pressed",!!state[b.dataset.mode]); });
    var lbl=d.querySelector(".a11y-size output"); if(lbl) lbl.textContent=(100+(state.size||0)*10)+"%";
    try{ localStorage.setItem(KEY,JSON.stringify(state)); }catch(e){}
  }
  var fab=d.querySelector(".fab-a11y"), panel=d.getElementById("a11y-panel");
  if(fab&&panel){
    function toggle(open){ panel.classList.toggle("open",open); fab.setAttribute("aria-expanded",open); if(open){ panel.querySelector("button").focus(); } }
    fab.addEventListener("click",function(){ toggle(!panel.classList.contains("open")); });
    panel.querySelector(".x").addEventListener("click",function(){ toggle(false); fab.focus(); });
    panel.addEventListener("keydown",function(e){ if(e.key==="Escape"){ toggle(false); fab.focus(); } });
    panel.querySelectorAll("[data-mode]").forEach(function(b){ b.addEventListener("click",function(){ state[b.dataset.mode]=!state[b.dataset.mode]; apply(); }); });
    panel.querySelector("[data-size='+']").addEventListener("click",function(){ state.size=Math.min((state.size||0)+1,5); apply(); });
    panel.querySelector("[data-size='-']").addEventListener("click",function(){ state.size=Math.max((state.size||0)-1,-2); apply(); });
    panel.querySelector("[data-reset]").addEventListener("click",function(){ state={}; apply(); });
  }
  apply();

  /* intro: pearl screen + silver silk + coin that lands as the period */
  var intro=d.querySelector(".intro");
  if(intro){
    var stage=intro.querySelector(".intro-stage"), media=intro.querySelector(".intro-media"), inner=intro.querySelector(".hero-inner"), hint=intro.querySelector(".scroll-hint"), sheet=intro.querySelector(".intro-sheet"), ride=d.querySelector(".ride");
    var lines=intro.querySelector(".silk-lines"), band=intro.querySelector(".silk-band"), coin=intro.querySelector(".coin"), coinWrap=intro.querySelector(".coin-wrap"), dot=intro.querySelector("h1 .dot");
    var still=function(){return reduce||root.classList.contains("a11y-still");};
    /* silk ribbon */
    var N=9, paths=[];
    for(var i=0;i<N;i++){ var pth=d.createElementNS("http://www.w3.org/2000/svg","path"); pth.setAttribute("stroke-width",(i===4?2.6:1+((i*7)%3)*.45).toFixed(2)); pth.setAttribute("opacity",(.35+.65*(1-Math.abs(i-4)/4)).toFixed(2)); lines.appendChild(pth); paths.push(pth); }
    function ribbon(t){
      var W=1600, H=900, cy=H*.76, pts=48;
      var top=[], bot=[];
      for(var i=0;i<N;i++){
        var dd="", off=(i-4)*14;
        for(var k=0;k<=pts;k++){
          var x=k/pts*W, u=k/pts;
          var y=cy+off*(1+.6*Math.sin(u*3.1+t*.35))+Math.sin(u*5.2+t*.55+i*.18)*44+Math.sin(u*2.1-t*.3)*36-u*60;
          dd+=(k?"L":"M")+x.toFixed(1)+","+y.toFixed(1);
          if(i===0) top.push([x,y]); if(i===N-1) bot.push([x,y]);
        }
        paths[i].setAttribute("d",dd);
      }
      var bd="M"+top.map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1);}).join("L")+"L"+bot.reverse().map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1);}).join("L")+"Z";
      band.setAttribute("d",bd);
    }
    var t0=performance.now(), running=true;
    function loop(now){ if(!running) return; ribbon(still()?0:(now-t0)/1000); if(!still()) requestAnimationFrame(loop); }
    requestAnimationFrame(loop);
    /* coin: spin, then hop onto the end of the sentence and become the period */
    function land(){
      if(!coin||!dot) return;
      if(still()){ coin.classList.add("gone"); dot.classList.add("on"); return; }
      var cr=coin.getBoundingClientRect(), dr=dot.getBoundingClientRect();
      var dx=(dr.left+dr.width/2)-(cr.left+cr.width/2), dy=(dr.top+dr.height/2)-(cr.top+cr.height/2), sc=dr.width/cr.width;
      coin.classList.add("stop");
      var sh=coinWrap.querySelector(".coin-shadow"); if(sh) sh.style.opacity="0";
      var anim=coin.animate([
        {transform:"translate(0,0) scale(1)"},
        {transform:"translate("+dx*.35+"px,"+(-60)+"px) scale("+(.7)+")",offset:.28,easing:"ease-in"},
        {transform:"translate("+dx+"px,"+dy+"px) scale("+sc+")",offset:.62,easing:"ease-out"},
        {transform:"translate("+dx+"px,"+(dy-46*sc*10)+"px) scale("+sc+")",offset:.76,easing:"ease-in"},
        {transform:"translate("+dx+"px,"+dy+"px) scale("+sc+")",offset:.88,easing:"ease-out"},
        {transform:"translate("+dx+"px,"+(dy-14*sc*10)+"px) scale("+sc+")",offset:.94,easing:"ease-in"},
        {transform:"translate("+dx+"px,"+dy+"px) scale("+sc+")"}
      ],{duration:1500,fill:"forwards"});
      anim.onfinish=function(){ dot.classList.add("on"); coin.classList.add("gone"); };
    }
    var startT=function(){ intro.classList.add("ready"); setTimeout(land, still()?0:2400); };
    if(d.fonts&&d.fonts.ready){ d.fonts.ready.then(function(){ setTimeout(startT,200); }); } else setTimeout(startT,300);
    /* scroll: zoom into the scene, the sheet rises, the site rides up */
    if(!reduce){
      var ticking=false;
      function clamp(v){return v<0?0:v>1?1:v;}
      function upd(){
        ticking=false;
        if(root.classList.contains("a11y-still")) return;
        var span=intro.offsetHeight-innerHeight, p=clamp((scrollY-intro.offsetTop)/(span||1));
        var z=clamp(p/.62), e=z*z*(3-2*z);
        media.style.setProperty("--z",(1+e*1.1).toFixed(4));
        media.style.setProperty("--b",(e*6).toFixed(2)+"px");
        var o=clamp(1-p*2.4);
        inner.style.setProperty("--o",o.toFixed(3)); inner.style.setProperty("--y",(-p*110).toFixed(1)+"px"); inner.style.setProperty("--s",(1+p*.18).toFixed(3));
        if(hint) hint.style.setProperty("--o",clamp(1-p*5).toFixed(3));
        var r=clamp((p-.38)/.48), er=1-Math.pow(1-r,3);
        sheet.style.setProperty("--sheet",((1-er)*101).toFixed(2)+"%");
        sheet.style.setProperty("--so",(1-clamp((p-.9)/.1)).toFixed(3));
        if(ride){ var ro=clamp((r-.3)/.5); ride.style.setProperty("--ro",ro.toFixed(3)); ride.style.setProperty("--ry",((1-ro)*40).toFixed(1)+"px"); }
        media.style.visibility=r>=.999?"hidden":"visible";
      }
      function req(){ if(!ticking){ticking=true;requestAnimationFrame(upd);} }
      addEventListener("scroll",req,{passive:true}); addEventListener("resize",req); upd();
    }
  }

  /* headings: keep every heading on one line (shrink to fit, never wrap) */
  function fitHeads(){
    d.querySelectorAll("h1,h2,h3").forEach(function(h){
      if(h.closest(".prose")&&h.tagName==="H3") return;
      h.style.fontSize="";
      var base=parseFloat(getComputedStyle(h).fontSize), size=base, min=base*.55, guard=0;
      while(h.scrollWidth>h.clientWidth+1 && size>min && guard<40){ size-=1; h.style.fontSize=size+"px"; guard++; }
    });
  }
  fitHeads(); addEventListener("resize",fitHeads);
  if(d.fonts&&d.fonts.ready) d.fonts.ready.then(fitHeads);

  /* year */
  d.querySelectorAll("[data-year]").forEach(function(y){ y.textContent=new Date().getFullYear(); });
})();
