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
if(!TH[S.theme])S.theme=0;if(!(S.skin>=0&&S.skin<29))S.skin=0;
if(!Array.isArray(S.skins))S.skins=[0];if(!Array.isArray(S.themes))S.themes=[0];
try{Object.defineProperty(cx,'shadowBlur',{set:function(){},get:function(){return 0},configurable:true})}catch(e){}
function rs2(){var w=innerWidth,h=innerHeight;if(!w||!h)return;var d=Math.min(devicePixelRatio||1,1.5);d*=Math.min(1,Math.sqrt(1.1e6/(w*h*d*d)));dpr=d;cv.width=Math.round(w*d);cv.height=Math.round(h*d);sc=h/H;W=w/sc}
var lw=-1,lh=-1;
function chk(){if(innerWidth!==lw||innerHeight!==lh||cv.width<2){lw=innerWidth;lh=innerHeight;rs2()}}
addEventListener('resize',rs2);addEventListener('orientationchange',function(){setTimeout(rs2,200)});rs2();
var fN=0,fT=0,lastRun=0,lastRaf=-1,probes=0,nextProbe=3000;
function probe(){try{var w=cv.width,h=cv.height;if(w<2||h<2){ser('Canvas vide : taille '+w+'x'+h);rs2();return}
 var d=cx.getImageData(w>>1,h>>1,1,1).data;
 if(d[3]===0){cv.width=cv.width;rs2();if(++probes>1)ser('Canvas vide ('+w+'x'+h+', dpr '+dpr.toFixed(2)+', sc '+sc.toFixed(2)+')')}else probes=0}catch(e){ser('Sonde : '+e.message)}}
function frame(ts){chk();var dt=Math.min(.05,(ts-last)/1000||0);last=ts;upd(dt);drawBg();drawGame();fN++;
 if(ts-fT>500){if(S.fps)fe.textContent=Math.round(fN*1000/(ts-fT))+' FPS · '+cv.width+'x'+cv.height;fe.style.display=S.fps?'block':'none';fN=0;fT=ts}
 if(ts>nextProbe){probe();nextProbe=ts+(probes?3000:30000)}}
loop=function(ts){if(ts===lastRaf)return;lastRaf=ts;lastRun=performance.now();try{frame(ts)}catch(e){ser('Erreur : '+e.message)}requestAnimationFrame(loop)};
setInterval(function(){if(document.hidden)return;if(performance.now()-lastRun>1500){lastRun=performance.now();requestAnimationFrame(loop)}},1000);
document.addEventListener('visibilitychange',function(){if(!document.hidden){rs2();requestAnimationFrame(loop)}});
addEventListener('focus',function(){rs2();requestAnimationFrame(loop)});
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

/* ===== Skin GOAT (achat reserve a l'admin) ===== */
(function(){
var isAdm=function(){return S.coins>=999999999};
setTimeout(function(){
 SK.push(['GOAT','#2b2b33','#0b0b10']);
 D[SK.length-1]=function(o,p,q,E,sm,l){
  l(-24,-44,-34,-62,'#ffd24a',9);l(-34,-62,-18,-72,'#ffd24a',9);l(24,-44,34,-62,'#ffd24a',9);l(34,-62,18,-72,'#ffd24a',9);
  p('#ffd24a',-48,-18,-64,-26,-46,-4);p('#ffd24a',48,-18,64,-26,46,-4);
  q(-18,6,36,34,'#d9d4c8',16);
  o(-17,-8,10,'#ffd24a');o(17,-8,10,'#ffd24a');q(-18.5,-15,3,14,'#111',1.5);q(15.5,-15,3,14,'#111',1.5);
  o(-6,20,3,'#222');o(6,20,3,'#222');
  p('#ffd24a',-8,40,8,40,0,60)};
 if(document.querySelector('#menu.on'))rMenu();
},0);
var bs0=buySk;buySk=function(i){if(SK[i]&&SK[i][0]==='GOAT'&&!S.skins.includes(i)&&!isAdm()){toast('Valeur indéterminée');return}bs0(i)};
var rk0=rSk;rSk=function(){rk0();var gi=-1;SK.forEach(function(k,i){if(k[0]==='GOAT')gi=i});var c=document.querySelectorAll('#skins .card')[gi];
 if(c&&!S.skins.includes(gi)&&!isAdm()){var sm=c.querySelector('small');if(sm)sm.textContent='Valeur indéterminée'}};
})();

/* ===== Ecran de chargement ===== */
(function(){
var el=null,done=false,ready=false,T0=performance.now();
function hide(){if(done)return;done=true;try{audio()}catch(e){}if(el){el.classList.add('out');setTimeout(function(){if(el&&el.parentNode)el.parentNode.removeChild(el)},700)}}
try{
var css=document.createElement('style');
css.textContent='#ld{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 25%,#2d3590,#0b1020 72%);transition:opacity .6s;text-align:center;padding:0 20px}#ld.out{opacity:0;pointer-events:none}'
+'#ld .lg{font:700 clamp(34px,12vh,84px)/1 Fredoka,sans-serif;letter-spacing:2px;background:linear-gradient(90deg,#ff6ad5,#ffd36a,#5df2ff);-webkit-background-clip:text;background-clip:text;color:transparent;margin:0 0 2vh}'
+'#ld .row{display:flex;gap:clamp(8px,2.4vw,24px);align-items:flex-end;height:clamp(80px,26vh,140px)}'
+'#ld .ch{width:clamp(38px,11vh,62px);height:clamp(38px,11vh,62px);animation:ldj 1.5s ease-in-out infinite}#ld .ch.me{width:clamp(54px,16vh,88px);height:clamp(54px,16vh,88px)}'
+'@keyframes ldj{0%{transform:translateY(0) rotate(0)}30%{transform:translateY(-38px) rotate(180deg)}60%,100%{transform:translateY(0) rotate(360deg)}}'
+'#ld .fl{width:min(600px,88vw);height:8px;border-radius:4px;background:#6a76e8;opacity:.85;margin-top:4px}'
+'#ld .bar{width:min(440px,72vw);height:12px;border-radius:6px;background:#ffffff22;margin:3vh 0 1vh;overflow:hidden}#ld .bar i{display:block;height:100%;width:0;border-radius:6px;background:linear-gradient(90deg,#5df29b,#3ea8ff)}'
+'#ld .pc{font-weight:700;font-size:15px;opacity:.9}#ld .tip{opacity:.8;font-size:14px;min-height:20px;margin-top:1vh}#ld .go{display:none;font-size:18px;font-weight:700;margin-top:1.5vh;animation:ldp 1.2s ease-in-out infinite}@keyframes ldp{50%{opacity:.3}}';
document.head.appendChild(css);
el=document.createElement('div');el.id='ld';
el.innerHTML='<div class="lg">GRAVITY FLIP</div><div class="row"></div><div class="fl"></div><div class="bar"><i></i></div><div class="pc">0%</div><div class="tip"></div><div class="go">Touche l\u2019écran pour commencer</div>';
document.body.appendChild(el);
var row=el.querySelector('.row'),bar=el.querySelector('.bar i'),pc=el.querySelector('.pc'),tip=el.querySelector('.tip'),go=el.querySelector('.go');
var tips=['Tape pour inverser la gravité.','Ramasse les pièces pour débloquer des skins.','Les gemmes débloquent de nouveaux thèmes.','Le Monde 13 est réservé aux plus courageux.','Plus tu avances, plus les pièges se resserrent.','Anticipe : tape juste avant le piège.'];
tip.textContent=(S.name?'Bienvenue, '+S.name+' · ':'')+tips[Math.floor(Math.random()*tips.length)];
setTimeout(function(){try{
 var idx=function(n){var r=-1;SK.forEach(function(k,i){if(k[0]===n)r=i});return r};
 var b=['Lion','Cheval','Astronaute','Robot','Licorne','Dragon','Panda','Renard'].map(idx).filter(function(i){return i>=0&&i!==S.skin});
 var ids=[b[0],b[1],b[2],S.skin,b[3],b[4],b[5]];
 ids.forEach(function(id,n){var c=document.createElement('canvas');c.width=c.height=128;c.className='ch'+(n===3?' me':'');c.style.animationDelay=(n*.13)+'s';row.appendChild(c);drawSkin(c.getContext('2d'),64,64,92,id,0)});
}catch(e){}},30);
var fontsOK=false;try{document.fonts.ready.then(function(){fontsOK=true})}catch(e){fontsOK=true}
setTimeout(function(){fontsOK=true},2500);
var shown=0;
function tick(){if(done)return;var t=performance.now()-T0,tg=Math.min(1,t/2600);if(!fontsOK)tg=Math.min(tg,.9);
 shown+=(tg-shown)*.15;if(!ready&&tg>=1&&shown>.995){shown=1;ready=true;go.style.display='block'}
 bar.style.width=(shown*100)+'%';pc.textContent=Math.round(shown*100)+'%';requestAnimationFrame(tick)}
requestAnimationFrame(tick);
el.addEventListener('pointerdown',function(){if(ready)hide()});
setTimeout(function(){ready=true;go.style.display='block'},9000);
setTimeout(hide,15000);
}catch(e){hide()}
})();
