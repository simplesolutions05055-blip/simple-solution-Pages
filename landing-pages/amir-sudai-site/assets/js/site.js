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
  var hv=d.querySelector(".hero video");
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

  /* year */
  d.querySelectorAll("[data-year]").forEach(function(y){ y.textContent=new Date().getFullYear(); });
})();
