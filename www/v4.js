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
