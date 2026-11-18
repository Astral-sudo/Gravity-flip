/* v5 : performances, plein ecran, defilement des menus, erreurs visibles */
(function(){
var s=document.createElement('style');
s.textContent='*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.logo{filter:none!important}'
+'.scr{justify-content:flex-start!important;padding-left:calc(env(safe-area-inset-left,0px) + 14px)!important;padding-right:calc(env(safe-area-inset-right,0px) + 14px)!important;padding-bottom:calc(env(safe-area-inset-bottom,0px) + 40px)!important}.scr>:first-child{margin-top:auto}.scr>:last-child{margin-bottom:auto}'
+'#hud{padding-left:calc(env(safe-area-inset-left,0px) + 10px)!important}#quit{right:calc(env(safe-area-inset-right,0px) + 10px)!important}#pz{right:calc(env(safe-area-inset-right,0px) + 60px)!important}'
+'#fps{position:fixed;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top,0px) + 4px);z-index:30;font:700 13px monospace;background:#000a;padding:2px 8px;border-radius:8px;display:none;pointer-events:none}'
+'#err{position:fixed;left:8px;right:8px;bottom:8px;z-index:60;background:#a00c;color:#fff;font:12px monospace;padding:6px 10px;border-radius:8px;display:none;pointer-events:none}'
+'#rot{position:fixed;inset:0;z-index:50;background:#0b1020;display:none;align-items:center;justify-content:center;text-align:center;font-size:22px;padding:30px}@media (orientation:portrait){#rot{display:flex}}';
document.head.appendChild(s);
document.body.insertAdjacentHTML('beforeend','<div id="fps"></div><div id="err"></div><div id="rot">Tourne ton téléphone en mode paysage pour jouer</div>');
var fe=document.getElementById('fps'),er=document.getElementById('err');
function ser(m){er.textContent=String(m).slice(0,160);er.style.display='block'}
addEventListener('error',function(e){ser('Erreur : '+e.message+' ('+(e.lineno||'?')+')')});
if(!TH[S.theme])S.theme=0;if(!SK[S.skin])S.skin=0;
if(!Array.isArray(S.skins))S.skins=[0];if(!Array.isArray(S.themes))S.themes=[0];
try{Object.defineProperty(cx,'shadowBlur',{set:function(){},get:function(){return 0},configurable:true})}catch(e){}
function rs2(){var w=innerWidth,h=innerHeight;if(!w||!h)return;var d=Math.min(devicePixelRatio||1,1.5);d*=Math.min(1,Math.sqrt(1.1e6/(w*h*d*d)));dpr=d;cv.width=Math.round(w*d);cv.height=Math.round(h*d);sc=h/H;W=w/sc}
var lw=-1,lh=-1;
function chk(){if(innerWidth!==lw||innerHeight!==lh||cv.width<2){lw=innerWidth;lh=innerHeight;rs2()}}
addEventListener('resize',rs2);addEventListener('orientationchange',function(){setTimeout(rs2,200)});rs2();
var fN=0,fT=0;
loop=function(ts){
 try{chk();var dt=Math.min(.05,(ts-last)/1000||0);last=ts;upd(dt);drawBg();drawGame();fN++;
  if(ts-fT>500){if(S.fps)fe.textContent=Math.round(fN*1000/(ts-fT))+' FPS';fe.style.display=S.fps?'block':'none';fN=0;fT=ts}
 }catch(e){ser('Erreur : '+e.message)}
 requestAnimationFrame(loop)};
var r0=rSet;rSet=function(){r0();var p=document.querySelectorAll('#set .pack');if(p[3])p[3].insertAdjacentHTML('afterend',SR('fps','Afficher les FPS'))};
})();

/* ===== Monde 13 : ENFER (1 niveau extreme) ===== */
(function(){
WN.push('Enfer');WS.push(TOT);TOT+=1;
var HELL=TOT-1,HT=['Enfer','#3a0000','#0a0000','#6a1a12','#ff3a00','flame',0];
window.HSP=function(x){return 700+260*Math.min(1,x/60000)};
function hellLevel(){
 var r=rng(6666),ft=.14,x=0,end=900,pl=-1,pm=false,obs=[],coins=[];
 for(var i=0;i<260;i++){
  var q=r(),t='s';
  if(q<.05)t='m';else if(q<.15)t='w';else if(q<.30)t='roll';else if(q<.38)t='pop';else if(q<.46)t='jet';else if(q<.54)t='lsr';else if(q<.68)t='b';
  var lane=pl<0?(r()<.5?0:1):(r()<.35?pl:1-pl);
  var w=t=='s'?30*(1+Math.floor(r()*3)):t=='b'||t=='lsr'?44:t=='pop'?30:40,h=t=='s'||t=='pop'?30:t=='b'?52:40;
  var s0=HSP(end),same=lane==pl&&t!='m'&&!pm;
  var gap=same?s0*(.12+r()*.14):s0*(ft+.075+r()*.10);
  if(t=='m')gap*=1.35;
  x=end+gap;
  if(i%3==0&&gap>s0*.25)coins.push({x:(end+x)/2,lane:1-lane});
  obs.push({t:t,x:t=='roll'?x+173.3:x,lane:lane,w:w,h:h});
  end=x+w;pl=t=='m'?-1:lane;pm=t=='m';
 }
 return{obs:obs,coins:coins,L:end+600,sp:700,ft:ft,d:10,boss:true,hell:true};
}
var og=gen;gen=function(g){return g===HELL?hellLevel():og(g)};
var u0=upd;upd=function(dt){if(lv&&lv.hell&&st=='play')lv.sp=HSP(dist);u0(dt)};
function hsw(f){return function(){var hh=lv&&lv.hell&&st!='menu',T0;if(hh){T0=TH[S.theme];TH[S.theme]=HT}try{f()}finally{if(hh)TH[S.theme]=T0}}}
drawBg=hsw(drawBg);
var dg=hsw(drawGame);
drawGame=function(){dg();if(lv&&lv.hell&&st=='play'&&dist<1400){cx.save();cx.setTransform(dpr*sc,0,0,dpr*sc,0,0);cx.globalAlpha=Math.min(1,(1400-dist)/400);cx.fillStyle='#ff3a00';cx.font='700 34px Fredoka,sans-serif';cx.textAlign='center';cx.fillText('MONDE 13 · ENFER',W/2,H/2);cx.restore()}};
var rm0=rMap;rMap=function(){rm0();var c=document.querySelectorAll('#map .card')[WN.length-1];if(c){var sm=c.querySelector('small');if(sm)sm.textContent=S.done<HELL?'Verrouillé':'1 niveau extrême';var pv=c.querySelector('.pv');if(pv){pv.style.background='linear-gradient(#5a0000,#120000)';pv.style.borderTopColor=pv.style.borderBottomColor='#ff3a00'}}};
var rl0=rLv;rLv=function(w){if(w!==WN.length-1)return rl0(w);go('lvls');$('#lvls').innerHTML='<h2>Monde 13 · Enfer</h2><p class="msg">Un seul niveau. Vitesse folle, pièges partout.<br>Possible… en théorie.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(80px,1fr));max-width:120px"><div class="card lv" onclick="play('+HELL+')" style="border-color:#ff3a00">1</div></div><p></p>'+back('map')};
var rn0=rMenu;rMenu=function(){rn0();var b=document.querySelector('#menu .btn.big');if(b)b.setAttribute('onclick','play(Math.min(S.done,'+(HELL-1)+'))')};
})();
