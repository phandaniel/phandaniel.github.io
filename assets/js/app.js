
document.addEventListener('DOMContentLoaded', () => {
  const categories = [
    {
      name: 'Operating Systems',
      items: [
        { name: 'Fedora', url: 'linux/fedora.html', accent: '#ffffff' },
        { name: 'Ubuntu', url: 'linux/ubuntu.html', accent: '#ffffff' },
        { name: 'Linux Kernel', url: 'linux/kernel.html', accent: '#ffffff' },
        { name: 'iOS', url: 'os/ios.html', accent: '#ffffff' }
      ]
    },
    {
      name: 'Artificial Intelligence',
      items: [
        { name: 'ChatGPT', url: 'ai/chatgpt.html', accent: '#ffffff' },
        { name: 'Claude', url: 'ai/claude.html', accent: '#ffffff' },
        { name: 'Gemini', url: 'ai/gemini.html', accent: '#ffffff' },
        { name: 'Grok', url: 'ai/grok.html', accent: '#ffffff' }
      ]
    },
    {
      name: 'Aerospace',
      items: [
        { name: 'Starship', url: 'space/starship.html', accent: '#ffffff' }
      ]
    },
    {
      name: 'Developer Tools',
      items: [
        { name: 'Kubernetes', url: 'dev/kubernetes.html', accent: '#ffffff' }
      ]
    },
    {
      name: 'Sports',
      items: [
        { name: 'Liberty Flames', url: 'sports/liberty.html', accent: '#ffffff' },
        { name: 'Commanders', url: 'sports/commanders.html', accent: '#ffffff' }
      ]
    }
  ];
  
  let currentFile = window.location.pathname.split('/').slice(-2).join('/');
  if (!currentFile || currentFile.endsWith('/')) currentFile = 'index.html';

  const basePath = window.basePath || '../';

  const menuHTML = `
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
  cleanStr: (s) => s.replace(/\[\d+\]/g, '').replace(/—N\/a/gi, '&mdash;').trim()
};
