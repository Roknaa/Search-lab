/* SEARCH shared UI components — header, footer, navigation */
(() => {
  const root = window.SEARCH = window.SEARCH || {};
  const isProjects = location.pathname.includes('/projects');
  const prefix = isProjects ? '../' : '';
  const current = document.body.dataset.page || '';
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  const navItems = [
    {label:'الرئيسية', en:'Home', href:prefix+'index.html', icon:'ph-house', key:'home'},
    {label:'المشاريع', en:'Projects', href:prefix+'projects/index.html', icon:'ph-flask', key:'projects'},
    {label:'المقالات', en:'Articles', href:prefix+'articles/index.html', icon:'ph-book-open', key:'articles'},
    {label:'عن SEARCH', en:'About', href:prefix+'about.html', icon:'ph-info', key:'about'}
  ];

  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="shell header-inner">
          <a class="brand" href="${prefix}index.html" aria-label="SEARCH home"><span class="brand-symbol"><i class="ph ph-aperture"></i></span><span class="brand-word">SEARCH<small>EXPLORE BEYOND</small></span></a>
          <nav class="desktop-nav" aria-label="القائمة الرئيسية">${navItems.map(n=>`<a class="${current===n.key?'active':''}" href="${n.href}">${n.label}</a>`).join('')}</nav>
          <div class="header-tools"><button class="icon-btn" id="search-toggle" aria-label="بحث"><i class="ph ph-magnifying-glass"></i></button><button class="lang-btn" id="lang-toggle">EN</button><a class="btn btn-small btn-outline" href="${prefix}projects/index.html">ابدأ الاستكشاف <i class="ph ph-arrow-up-left"></i></a><button class="mobile-menu-btn icon-btn" id="mobile-menu-toggle" aria-label="فتح القائمة"><i class="ph ph-list"></i></button></div>
        </div>
        <div class="mobile-menu" id="mobile-menu">${navItems.map(n=>`<a class="${current===n.key?'active':''}" href="${n.href}"><i class="ph ${n.icon}"></i>${n.label}</a>`).join('')}</div>
        <div class="search-panel" id="search-panel"><div class="shell search-inner"><i class="ph ph-magnifying-glass"></i><input id="global-search" type="search" placeholder="بتدور على إيه؟"><button id="search-close" class="icon-btn"><i class="ph ph-x"></i></button></div></div>
      </header>`;
  }
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer"><div class="shell footer-main">
        <div class="footer-brand"><a class="brand" href="${prefix}index.html"><span class="brand-symbol"><i class="ph ph-aperture"></i></span><span class="brand-word">SEARCH<small>EXPLORE BEYOND</small></span></a><p>نفتح أبواب المعرفة، ونحوّل الأسئلة إلى رحلات استكشاف.</p></div>
        <div class="footer-links"><b>استكشف</b><a href="${prefix}projects/index.html">المشاريع والتجارب</a><a href="${prefix}articles/index.html">المقالات</a><a href="${prefix}about.html">عن المنصة</a></div>
        <div class="footer-links"><b>المجالات</b><a href="${prefix}projects/index.html?category=science">العلوم</a><a href="${prefix}projects/index.html?category=space">الفضاء</a><a href="${prefix}projects/index.html?category=history">التاريخ</a></div>
        <div class="footer-note"><span class="eyebrow">STAY CURIOUS</span><p>كل إجابة عظيمة بدأت بسؤال.</p><a class="social-link" href="https://www.youtube.com/" target="_blank" rel="noopener"><i class="ph ph-youtube-logo"></i> YouTube</a></div>
      </div><div class="shell footer-bottom"><span>© <span id="year"></span> SEARCH. جميع الحقوق محفوظة.</span><span>MADE FOR THE CURIOUS <i class="ph ph-sparkle"></i></span></div></footer>
      <nav class="mobile-dock" aria-label="التنقل السريع">${navItems.slice(0,3).map(n=>`<a class="${current===n.key?'active':''}" href="${n.href}"><i class="ph ${n.icon}"></i><span>${n.label}</span></a>`).join('')}<button id="dock-search"><i class="ph ph-magnifying-glass"></i><span>بحث</span></button></nav>`;
  }
  root.navItems = navItems;
})();