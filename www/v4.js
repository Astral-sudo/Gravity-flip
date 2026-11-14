/* v4 : performances + corrections */
(function(){
var s=document.createElement('style');
s.textContent='*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.logo{filter:none!important}#fps{position:fixed;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top,0px) + 4px);z-index:30;font:700 13px monospace;background:#000a;padding:2px 8px;border-radius:8px;display:none;pointer-events:none}#rot{position:fixed;inset:0;z-index:50;background:#0b1020;display:none;align-items:center;justify-content:center;text-align:center;font-size:22px;padding:30px}@media (orientation:portrait){#rot{display:flex}}';
document.head.appendChild(s);
document.body.insertAdjacentHTML('beforeend','<div id="fps"></div><div id="rot">Tourne ton téléphone en mode paysage pour jouer</div>');
try{Object.defineProperty(cx,'shadowBlur',{set:function(){},get:function(){return 0},configurable:true})}catch(e){}
function rs2(){var w=innerWidth,h=innerHeight;if(!w||!h)return;var d=Math.min(devicePixelRatio||1,1.5);d*=Math.min(1,Math.sqrt(1.1e6/(w*h*d*d)));dpr=d;cv.width=Math.round(w*d);cv.height=Math.round(h*d);sc=h/H;W=w/sc}
addEventListener('resize',rs2);addEventListener('orientationchange',function(){setTimeout(rs2,200)});rs2();
var fe=document.getElementById('fps'),fN=0,fT=0;
loop=function(ts){var dt=Math.min(.05,(ts-last)/1000||0);last=ts;upd(dt);drawBg();drawGame();fN++;
 if(ts-fT>500){if(S.fps)fe.textContent=Math.round(fN*1000/(ts-fT))+' FPS';fe.style.display=S.fps?'block':'none';fN=0;fT=ts}
 requestAnimationFrame(loop)};
var r0=rSet;rSet=function(){r0();var p=document.querySelectorAll('#set .pack');if(p[3])p[3].insertAdjacentHTML('afterend',SR('fps','Afficher les FPS'))};
})();
