/* SEARCH main controller — all shared responsive behavior lives here */
(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const state = {menu:false, search:false, language:localStorage.getItem('search-lang') || 'ar'};
  const closeMenu = () => {
    state.menu = false;
    $('#mobile-menu')?.classList.remove('open');
    $('#mobile-menu-toggle')?.setAttribute('aria-expanded','false');
    const icon = $('#mobile-menu-toggle i'); if(icon) icon.className='ph ph-list';
  };
  const openSearch = () => {
    state.search = true;
    $('#search-panel')?.classList.add('open');
    setTimeout(()=>$('#global-search')?.focus(),80);
  };
  const closeSearch = () => { state.search=false; $('#search-panel')?.classList.remove('open'); };
  const toggleMenu = () => {
    state.menu = !state.menu;
    $('#mobile-menu')?.classList.toggle('open',state.menu);
    $('#mobile-menu-toggle')?.setAttribute('aria-expanded',String(state.menu));
    const icon = $('#mobile-menu-toggle i'); if(icon) icon.className=state.menu?'ph ph-x':'ph ph-list';
  };
  const applyLanguage = lang => {
    state.language=lang; localStorage.setItem('search-lang',lang);
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    const btn=$('#lang-toggle'); if(btn) btn.textContent=lang==='ar'?'EN':'عربي';
    document.body.classList.toggle('english-mode',lang==='en');
    // Shared shell supports a clear bilingual toggle; page copy can be expanded gradually.
  };
  document.addEventListener('DOMContentLoaded',()=>{
    $('#year') && ($('#year').textContent=new Date().getFullYear());
    $('#mobile-menu-toggle')?.addEventListener('click',toggleMenu);
    $('#search-toggle')?.addEventListener('click',openSearch);
    $('#dock-search')?.addEventListener('click',openSearch);
    $('#search-close')?.addEventListener('click',closeSearch);
    $('#lang-toggle')?.addEventListener('click',()=>applyLanguage(state.language==='ar'?'en':'ar'));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeSearch();}});
    document.addEventListener('click',e=>{
      if(state.menu && !e.target.closest('#mobile-menu') && !e.target.closest('#mobile-menu-toggle')) closeMenu();
    });
    applyLanguage(state.language);
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      const parts = location.pathname.split('/').filter(Boolean);
      const isDirectoryUrl = location.pathname.endsWith('/');
      const depth = Math.max(0, parts.length - (isDirectoryUrl ? 0 : 1));
      const rootPrefix = '../'.repeat(depth);
      navigator.serviceWorker.register(rootPrefix + 'sw.js').catch(()=>{});
    }
    // Gentle reveal on scroll, with reduced-motion support.
    const reveal=$$('.category-card,.mission-card,.feature-copy,.feature-visual,.quote-section');
    if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
      reveal.forEach(el=>el.classList.add('will-reveal'));
      const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}
      }),{threshold:.12});
      reveal.forEach(el=>io.observe(el));
    }
  });
  window.SEARCH = Object.assign(window.SEARCH||{},{$,$$,openSearch,closeSearch,closeMenu,applyLanguage});
})();