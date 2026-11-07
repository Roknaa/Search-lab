/* Projects library filters and search */
document.addEventListener('DOMContentLoaded',()=>{
 const cards=[...document.querySelectorAll('.project-tile')], tabs=[...document.querySelectorAll('.filter-tab')];
 const search=document.getElementById('project-search'), empty=document.getElementById('empty-state');
 let active='all';
 function update(){
  const q=(search?.value||'').trim().toLowerCase();let shown=0;
  cards.forEach(card=>{const matchCat=active==='all'||card.dataset.category===active;const matchText=(card.dataset.search+' '+card.innerText).toLowerCase().includes(q);const visible=matchCat&&matchText;card.hidden=!visible;if(visible)shown++;});
  if(empty)empty.hidden=shown!==0;
 }
 tabs.forEach(tab=>tab.addEventListener('click',()=>{active=tab.dataset.filter;tabs.forEach(t=>t.classList.toggle('active',t===tab));update();}));
 search?.addEventListener('input',update);
 const param=new URLSearchParams(location.search).get('category');
 if(param){const tab=tabs.find(t=>t.dataset.filter===param);if(tab)tab.click();}
});