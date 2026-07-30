
document.addEventListener('DOMContentLoaded', () => {
  const pages = [
    { name: 'Fedora', url: 'linux/fedora.html', accent: '#3b82f6' },
    { name: 'Ubuntu', url: 'linux/ubuntu.html', accent: '#e95420' },
    { name: 'Linux Kernel', url: 'linux/kernel.html', accent: '#fbbf24' },
    { name: 'iOS', url: 'os/ios.html', accent: '#0a84ff' },
    { name: 'Starship', url: 'space/starship.html', accent: '#f97316' },
    { name: 'ChatGPT', url: 'ai/chatgpt.html', accent: '#10a37f' },
    { name: 'Claude', url: 'ai/claude.html', accent: '#d97757' },
    { name: 'Gemini', url: 'ai/gemini.html', accent: '#1a73e8' },
    { name: 'Grok', url: 'ai/grok.html', accent: '#1da1f2' }
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
        <a href="${basePath}index.html" class="nav-link ${currentFile === 'index.html' ? 'active' : ''}" style="--accent: #8b5cf6;">Home</a>
        ${pages.map(p => `<a href="${basePath}${p.url}" class="nav-link ${currentFile.endsWith(p.url) ? 'active' : ''}" style="--accent: ${p.accent};">${p.name}</a>`).join('')}
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
