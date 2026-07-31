
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('mainDropdown')) {
    window.utils.initMenu();
  }
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
  },
  renderPage: async (config) => {
    document.head.innerHTML += `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${config.title || 'Phantom Telemetry'}</title>
      ${config.description ? `<meta name="description" content="${config.description}">` : ''}
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="${window.basePath || '../../'}assets/css/style.css?v=10">
    `;

    document.body.style.setProperty('--accent', config.accent || '#ffffff');
    
    let html = `
      <div class="container">
        <header>
          <h1 ${config.accent ? `style="color: var(--accent);"` : ''}>${config.title}</h1>
        </header>
        <div id="loading" class="loading">Loading timeline data...</div>
    `;

    if (config.customHTML) {
      html += config.customHTML;
    } else {
      html += `
        <div class="table-container" id="table-container" style="display: none;">
          <table>
            <thead>
              <tr>${(config.columns || []).map(c => `<th>${c}</th>`).join('')}</tr>
            </thead>
            <tbody id="table-body"></tbody>
          </table>
        </div>
      `;
    }
    html += `</div>`;
    document.body.innerHTML = html;

    window.utils.initMenu();

    if (config.url) {
      await window.utils.renderTable({
        url: config.url,
        processData: config.processData,
        renderRow: config.renderRow
      });
    }
    
    if (config.init) {
      await config.init();
    }
  },
  initMenu: () => {
    const categories = window.dashboardCategories;
    if (!categories) return;
    
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
          <a href="${basePath}index.html" class="nav-link ${currentFile === 'index.html' || currentFile === '' ? 'active' : ''}" style="--accent: #ffffff;">Home</a>
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
        submenu.style.maxHeight = 'none';
        submenu.style.overflowY = 'auto';
        
        const rect = submenu.getBoundingClientRect();
        const padding = 16;
        
        if (rect.bottom > window.innerHeight - padding) {
          const overflow = rect.bottom - (window.innerHeight - padding);
          const maxShiftUp = item.offsetTop;
          let newTop = -overflow;
          if (overflow > maxShiftUp) {
            newTop = -maxShiftUp;
            const itemTop = item.getBoundingClientRect().top;
            const absoluteTop = itemTop - maxShiftUp;
            const availableHeight = (window.innerHeight - padding) - absoluteTop;
            submenu.style.maxHeight = `${availableHeight}px`;
          }
          submenu.style.top = `${newTop}px`;
        }
      });
    });
  }
};
