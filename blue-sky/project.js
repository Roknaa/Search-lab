/* Project-specific simulation. Shared site behavior remains in /main.js */
(() => {
 const canvas=document.getElementById('sky-canvas'); if(!canvas)return;
 const ctx=canvas.getContext('2d'), slider=document.getElementById('sun-angle');
 const value=document.getElementById('angle-value'), label=document.getElementById('sun-position-label');
 const result=document.getElementById('path-result'), explain=document.getElementById('path-explain');
 const presets=[...document.querySelectorAll('.preset')];
 let angle=65;
 function draw(){
  const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
  const sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#07152d');sky.addColorStop(.58,'#164b7c');sky.addColorStop(1,'#e3a56e');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
  // Atmospheric shell and horizon
  ctx.beginPath();ctx.ellipse(w*.5,h*1.13,w*.57,h*.39,0,Math.PI,Math.PI*2);ctx.fillStyle='#132d43';ctx.fill();
  ctx.beginPath();ctx.ellipse(w*.5,h*1.11,w*.60,h*.41,0,Math.PI,Math.PI*2);ctx.strokeStyle='#6ed9f5aa';ctx.lineWidth=5;ctx.stroke();
  const rad=angle*Math.PI/180, sx=w*.12, sy=h*.72-Math.sin(rad)*h*.54;
  const ex=w*.79, ey=h*.70;
  // sun glow
  const glow=ctx.createRadialGradient(sx,sy,8,sx,sy,100);glow.addColorStop(0,'#fff5ce');glow.addColorStop(.2,'#ffd58caa');glow.addColorStop(1,'#ffd58c00');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(sx,sy,100,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff0bd';ctx.beginPath();ctx.arc(sx,sy,27,0,Math.PI*2);ctx.fill();
  // incoming ray
  ctx.save();ctx.setLineDash([15,10]);ctx.strokeStyle='#fff0c9';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(sx+30,sy+10);ctx.lineTo(ex,ey);ctx.stroke();ctx.restore();
  // scatter markers
  for(let i=0;i<18;i++){
   const t=(i+1)/20,x=sx+(ex-sx)*t,y=sy+(ey-sy)*t;
   const spread=(Math.sin(i*4.3)*.5+.5)*55+10;
   ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+spread,y-spread*.55);ctx.strokeStyle=`rgba(93,190,255,${.25+(i%4)*.12})`;ctx.lineWidth=2+(i%3);ctx.stroke();
   ctx.beginPath();ctx.arc(x+spread,y-spread*.55,3,0,Math.PI*2);ctx.fillStyle='#8bdcff';ctx.fill();
  }
  // horizon glow
  const hg=ctx.createLinearGradient(0,h*.68,0,h);hg.addColorStop(0,'#f1c58b44');hg.addColorStop(1,'#e8a46d00');ctx.fillStyle=hg;ctx.fillRect(0,h*.6,w,h*.4);
  ctx.fillStyle='#d9eaff';ctx.font='bold 23px Arial';ctx.textAlign='center';ctx.fillText('الغلاف الجوي',w*.52,h*.92);
  ctx.font='17px Arial';ctx.fillStyle='#ffffffbb';ctx.fillText('مسار الضوء',w*.48,h*.48);
 }
 function update(v){
  angle=Number(v);value.textContent=`${angle}°`;slider.value=angle;
  const high=angle>=48;
  label.textContent=high?'الشمس مرتفعة':angle<=18?'الشمس قرب الأفق':'الشمس منخفضة';
  result.textContent=high?'أقصر نسبيًا':angle<=18?'أطول نسبيًا':'متوسط';
  explain.textContent=high?'عندما تكون الشمس مرتفعة، يقطع الضوء مسارًا أقصر نسبيًا في الغلاف الجوي.':angle<=18?'قرب الأفق يمر الضوء في مسار أطول نسبيًا داخل الغلاف الجوي.':'مع انخفاض الشمس يزداد طول المسار الجوي الذي يقطعه الضوء.';
  presets.forEach(b=>b.classList.toggle('active',Number(b.dataset.angle)===angle));draw();
 }
 slider.addEventListener('input',e=>update(e.target.value));
 presets.forEach(b=>b.addEventListener('click',()=>update(b.dataset.angle)));
 document.getElementById('reset-sky').addEventListener('click',()=>update(65));
 if('ResizeObserver'in window){new ResizeObserver(()=>draw()).observe(canvas.parentElement);}
 update(65);
})();