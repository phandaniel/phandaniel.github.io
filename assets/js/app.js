
document.addEventListener('DOMContentLoaded', () => {
  const categories = window.dashboardCategories;
  
  let currentFile = window.location.pathname.split('/').slice(-2).join('/');
  if (!currentFile || currentFile.endsWith('/')) currentFile = 'index.html';

  const basePath = window.basePath || '../';

  const menuHTML = `
    <a href="${basePath}index.html" class="home-btn" aria-label="Home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    </a>
    <div class="dropdown-menu" id="mainDropdown">
      <button class="dropdown-btn" id="dropdownBtn" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div class="dropdown-content" id="dropdownContent">
        <a href="${basePath}index.html" class="nav-link ${currentFile === 'index.html' ? 'active' : ''}" style="--accent: #ffffff;">Home Dashboard</a>
        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 4px 0;"></div>
        ${categories.map(cat => `
          <div class="has-submenu">
            <div class="nav-link submenu-toggle">${cat.name} <span>&rsaquo;</span></div>
            <div class="submenu">
              ${cat.items.map(p => `<a href="${basePath}${p.url}" class="nav-link ${currentFile.endsWith(p.url) ? 'active' : ''}" style="--accent: ${p.accent};">${p.name}</a>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('afterbegin', menuHTML);
  
  document.getElementById('dropdownBtn').addEventListener('click', (e) => {
    document.getElementById('dropdownContent').classList.toggle('show');
    e.stopPropagation();
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#mainDropdown')) {
      const content = document.getElementById('dropdownContent');
      if (content && content.classList.contains('show')) content.classList.remove('show');
    }
  });

  // Smart submenu positioning
  document.querySelectorAll('.has-submenu').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const submenu = item.querySelector('.submenu');
      if (!submenu) return;
      
      submenu.style.top = '0';
      submenu.style.bottom = 'auto';
      
      const rect = submenu.getBoundingClientRect();
      // If it overflows bottom, align it to bottom instead
      if (rect.bottom > window.innerHeight) {
        submenu.style.top = 'auto';
        submenu.style.bottom = '0';
      }
      // If it overflows top (unlikely but safe), force top align
      const rectAfter = submenu.getBoundingClientRect();
      if (rectAfter.top < 0) {
        submenu.style.top = '0';
        submenu.style.bottom = 'auto';
      }
    });
  });
});

window.utils = {
  getVal: (keys, release) => {
    const objKeys = Object.keys(release);
    for (let str of keys) {
      const k = objKeys.find(key => key.toLowerCase().includes(str));
      if (k && release[k].trim()) return release[k].replace(/\[\d+\]/g, '');
    }
    return '—';
  },
  cleanStr: (s) => (s || '—').replace(/\[\d+\]/g, '').replace(/—N\/a/gi, '&mdash;').trim(),
  cleanVal: (val) => val ? val.replace(/^(Unsupported|Supported|Latest version|Preview version|Future version):\s*/i, '').trim() : '',
  emDash: () => '<span style="color: var(--text-muted); font-weight: 400;">&mdash;</span>',
  renderTable: async (options) => {
    try {
      const response = await fetch(options.url);
      if (!response.ok) throw new Error("Could not fetch " + options.url);
      let data = await response.json();
      
      if (options.processData) data = options.processData(data);
      
      const tbody = document.getElementById('table-body');
      const loading = document.getElementById('loading');
      const tableContainer = document.getElementById('table-container');
      
      loading.style.display = 'none';
      tableContainer.style.display = 'block';

      data.forEach(item => {
        const trHTML = options.renderRow(item);
        if (trHTML) {
          const tr = document.createElement('tr');
          tr.innerHTML = trHTML;
          tbody.appendChild(tr);
        }
      });
    } catch (err) {
      const loading = document.getElementById('loading');
      if(loading) loading.innerText = 'Error loading data.';
      console.error(err);
    }
  }
};
