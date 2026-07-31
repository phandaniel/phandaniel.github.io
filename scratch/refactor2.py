import os
import re
from bs4 import BeautifulSoup

def update_app_js():
    with open('assets/js/app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Simplify DOMContentLoaded
    content = re.sub(
        r'document\.addEventListener\(\'DOMContentLoaded\', \(\) => \{.*?\n\}\);',
        "document.addEventListener('DOMContentLoaded', () => {\n  if (!document.getElementById('mainDropdown')) {\n    window.utils.initMenu();\n  }\n});",
        content,
        flags=re.DOTALL
    )

    # Append new methods
    if 'renderPage: async (config)' not in content:
        content = content.replace('    } catch (err) {\n      const loading = document.getElementById(\'loading\');\n      if(loading) loading.innerText = \'Error loading data.\';\n      console.error(err);\n    }\n  }\n};',
"""    } catch (err) {
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
};""")

    with open('assets/js/app.js', 'w', encoding='utf-8') as f:
        f.write(content)


def update_style_css():
    with open('assets/css/style.css', 'r', encoding='utf-8') as f:
        content = f.read()

    new_css = """table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
th { 
  color: var(--text-muted); 
  font-weight: 600; 
  text-transform: uppercase; 
  font-size: 0.85rem; 
  letter-spacing: 0.05em;
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 10;
}
tbody tr:hover { background: rgba(255, 255, 255, 0.03); }
tbody tr:nth-child(even) { background: rgba(255, 255, 255, 0.015); }
.center-col { text-align: center !important; }"""
    
    # replace table block
    content = re.sub(
        r'table\s*\{[^}]*\}\s*th,\s*td\s*\{[^}]*\}\s*th\s*\{[^}]*\}\s*tr:last-child\s*td\s*\{[^}]*\}\s*tr:hover\s*td\s*\{[^}]*\}',
        new_css,
        content,
        flags=re.DOTALL
    )

    with open('assets/css/style.css', 'w', encoding='utf-8') as f:
        f.write(content)

def refactor_html_files():
    html_files = []
    for root, dirs, files in os.walk('release'):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        soup = BeautifulSoup(content, 'html.parser')

        title_tag = soup.find('title')
        title = title_tag.text.replace(' - Phantom Telemetry', '').strip() if title_tag else 'Title'

        desc_tag = soup.find('meta', {'name': 'description'})
        desc = desc_tag['content'] if desc_tag and 'content' in desc_tag.attrs else ''

        body_tag = soup.find('body')
        accent = '#ffffff'
        if body_tag and 'style' in body_tag.attrs:
            match = re.search(r'--accent:\s*(#[0-9a-fA-F]{6})', body_tag['style'])
            if match:
                accent = match.group(1)

        columns = []
        thead = soup.find('thead')
        if thead:
            columns = [th.text.strip() for th in thead.find_all('th')]

        has_table_container = '<div class="table-container" id="table-container"' in content

        custom_html_str = ""
        if not has_table_container:
            tables_wrapper = soup.find(id='tables-wrapper')
            if tables_wrapper:
                custom_html_str = str(tables_wrapper)
            
        # extract scripts
        script_logic = ""
        inner_init = ""
        is_standard = False
        ext_scripts = []
        
        for s in soup.find_all('script'):
            if s.has_attr('src'):
                if 'app.js' not in s['src'] and 'categories.js' not in s['src']:
                    ext_scripts.append(s['src'])
                continue
                
            script_content = s.string or ''
            if 'window.basePath' in script_content and len(script_content) < 50:
                continue
                
            if 'window.utils.renderTable' in script_content:
                if 'url:' in script_content and 'renderRow:' in script_content:
                    rt_match = re.search(r'window\.utils\.renderTable\(\{(.*?)\}\);', script_content, re.DOTALL)
                    if rt_match:
                        script_logic = rt_match.group(1).strip()
                        is_standard = True
                else:
                    inner_match = re.search(r'window\.addEventListener\([\'"]DOMContentLoaded[\'"],\s*(?:async\s*)?\(\)\s*=>\s*\{(.*?)\}\);', script_content, re.DOTALL)
                    if inner_match:
                        inner_init = inner_match.group(1).strip()
                    else:
                        inner_init = script_content.strip()
            elif 'window.addEventListener' in script_content:
                inner_match = re.search(r'window\.addEventListener\([\'"]DOMContentLoaded[\'"],\s*(?:async\s*)?\(\)\s*=>\s*\{(.*?)\}\);', script_content, re.DOTALL)
                if inner_match:
                    inner_init += "\\n" + inner_match.group(1).strip()
            else:
                inner_init += "\\n" + script_content.strip()

        # Build output
        ext_tags = ""
        for ext in ext_scripts:
            ext_tags += f'  <script src="{ext}"></script>\\n'
            
        new_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <script>window.basePath = "../../";</script>
  <script src="../../assets/js/categories.js"></script>
  <script src="../../assets/js/app.js?v=10"></script>
{ext_tags}  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      window.utils.renderPage({{
        title: `{title}`,
        description: `{desc}`,
        accent: '{accent}',
        columns: {columns},"""
        
        if is_standard and not custom_html_str:
            new_content += f"""
        {script_logic}
      }});
    }});
  </script>
</head>
<body></body>
</html>"""
        else:
            if custom_html_str:
                custom_html_escaped = custom_html_str.replace('`', '\\`')
                new_content += f"\\n        customHTML: `{custom_html_escaped}`,"
                
            new_content += f"""
        init: async () => {{
          {inner_init}
        }}
      }});
    }});
  </script>
</head>
<body></body>
</html>"""
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)


if __name__ == "__main__":
    update_app_js()
    update_style_css()
    refactor_html_files()
    print("Done!")
