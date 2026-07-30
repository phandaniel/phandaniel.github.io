import os
import re

print("Starting third refactoring step...")

html_files = []
for root, dirs, files in os.walk('release'):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

for path in html_files:
    with open(path, 'r') as f:
        content = f.read()

    # Insert categories.js before app.js
    if 'assets/js/categories.js' not in content:
        content = content.replace('<script src="../../assets/js/app.js?v=6"></script>', '<script src="../../assets/js/categories.js"></script>\n  <script src="../../assets/js/app.js?v=6"></script>')
    
    # Standardize classes
    content = content.replace('status-active', 'status-supported')
    content = content.replace('status-future', 'status-preview')
    content = content.replace('status-eol', 'status-unsupported')
    
    # Remove unused keys
    content = re.sub(r'const keys = Object\.keys\(.*?|const keys = Object\.keys\(.*?', '', content)

    # Use window.utils.emDash() in ubuntu and rhel
    if path in ['release/linux/ubuntu.html', 'release/linux/rhel.html']:
        content = content.replace("'<span style=\"color: var(--text-muted); font-weight: 400;\">&mdash;</span>'", "window.utils.emDash()")
        content = content.replace("cleanVal =", "cleanVal = window.utils.cleanVal;")
        content = re.sub(r"const cleanVal = \(val\) => .*?;\n", "const cleanVal = window.utils.cleanVal;\n", content)
    
    # Remove local cleanStr/cleanVal
    content = re.sub(r"const cleanStr = \(s\) => .*?;\n", "const cleanStr = window.utils.cleanStr;\n", content)

    with open(path, 'w') as f:
        f.write(content)

print("Done.")
