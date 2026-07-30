import re
import os

with open('assets/js/categories.js', 'w') as f:
    f.write("""window.dashboardCategories = [
  {
    name: 'Operating Systems',
    items: [
      { name: 'Fedora', url: 'release/linux/fedora.html', accent: '#ffffff' },
      { name: 'Ubuntu', url: 'release/linux/ubuntu.html', accent: '#ffffff' },
      { name: 'Linux Kernel', url: 'release/linux/kernel.html', accent: '#ffffff' },
      { name: 'RHEL', url: 'release/linux/rhel.html', accent: '#ffffff' },
      { name: 'Apple iOS', url: 'release/os/ios.html', accent: '#ffffff' },
      { name: 'Android', url: 'release/os/android.html', accent: '#ffffff' }
    ]
  },
  {
    name: 'Artificial Intelligence',
    items: [
      { name: 'ChatGPT', url: 'release/ai/chatgpt.html', accent: '#ffffff' },
      { name: 'Claude', url: 'release/ai/claude.html', accent: '#ffffff' },
      { name: 'Gemini', url: 'release/ai/gemini.html', accent: '#ffffff' },
      { name: 'Grok', url: 'release/ai/grok.html', accent: '#ffffff' }
    ]
  },
  {
    name: 'Aerospace',
    items: [
      { name: 'Starship', url: 'release/space/starship.html', accent: '#ffffff' },
      { name: 'Vulcan', url: 'release/space/vulcan.html', accent: '#ffffff' },
      { name: 'New Glenn', url: 'release/space/newglenn.html', accent: '#ffffff' }
    ]
  },
  {
    name: 'Developer Tools',
    items: [
      { name: 'Kubernetes', url: 'release/dev/kubernetes.html', accent: '#ffffff' },
      { name: 'Python', url: 'release/dev/python.html', accent: '#ffffff' }
    ]
  },
  {
    name: 'Sports',
    items: [
      { name: 'Liberty Flames', url: 'release/sports/liberty.html', accent: '#ffffff' },
      { name: 'Commanders', url: 'release/sports/commanders.html', accent: '#ffffff' },
      { name: 'Wizards', url: 'release/sports/wizards.html', accent: '#ffffff' }
    ]
  }
];
""")

with open('assets/js/app.js', 'r') as f:
    app_js = f.read()

app_js = re.sub(r"const categories = \[\s*\{[\s\S]*?\n  \];", "const categories = window.dashboardCategories;", app_js)

# Add cleanVal and emDash to utils
utils_start = app_js.find('cleanStr: (s) =>')
new_utils = """cleanStr: (s) => (s || '—').replace(/\\[\\d+\\]/g, '').replace(/—N\\/a/gi, '&mdash;').trim(),
  cleanVal: (val) => val ? val.replace(/^(Unsupported|Supported|Latest version|Preview version|Future version):\\s*/i, '').trim() : '',
  emDash: () => '<span style="color: var(--text-muted); font-weight: 400;">&mdash;</span>',"""

app_js = app_js.replace("cleanStr: (s) => s.replace(/\\[\\d+\\]/g, '').replace(/—N\\/a/gi, '&mdash;').trim(),", new_utils)

with open('assets/js/app.js', 'w') as f:
    f.write(app_js)

# Read style.css and extract SVG to bg.svg
with open('assets/css/style.css', 'r') as f:
    css = f.read()

bg_match = re.search(r"background-image: url\(\"data:image/svg\+xml,(.*?)\"\);", css)
if bg_match:
    svg_data = bg_match.group(1).replace('%3C', '<').replace('%3E', '>').replace('%23', '#')
    with open('assets/css/bg.svg', 'w') as f:
        f.write(svg_data)
    css = css.replace(bg_match.group(0), "background-image: url('bg.svg');")

# Standardize CSS classes
css = css.replace('.status-active', '.status-supported')
css = css.replace('.status-eol', '.status-unsupported')
css = css.replace('.status-future', '.status-preview')

with open('assets/css/style.css', 'w') as f:
    f.write(css)

# Update index.html to dynamically render grid
with open('index.html', 'r') as f:
    index = f.read()

dashboard_html = """
    <div class="dashboard-grid" id="dashboardGrid"></div>
"""

index = re.sub(r'<div class="dashboard-grid">[\s\S]*?</div>\s*</div>', dashboard_html + '\n  </div>', index)
script_tag = """
  <script src="assets/js/categories.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const grid = document.getElementById('dashboardGrid');
      grid.innerHTML = window.dashboardCategories.map(cat => `
        <div class="category-col">
          <div class="category-title">${cat.name}</div>
          <div class="grid">
            ${cat.items.map(item => `
              <a href="${item.url}" class="card">
                <h2>${item.name}</h2>
              </a>
            `).join('')}
          </div>
        </div>
      `).join('');
    });
    window.basePath = "./";
  </script>
  <script src="assets/js/app.js?v=6"></script>
"""
index = re.sub(r'<script>window\.basePath = "\./";</script>\s*<script src="assets/js/app\.js\?v=6"></script>', script_tag.strip(), index)

with open('index.html', 'w') as f:
    f.write(index)

print("Second refactoring step done.")
