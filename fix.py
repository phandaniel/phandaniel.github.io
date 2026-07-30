import os
import re

html_files = []
for root, dirs, files in os.walk('release'):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

for path in html_files:
    with open(path, 'r') as f:
        content = f.read()

    # The broken part is:
    # renderRow: (release) => {
    #       release);
    #       
    #       const getVal = 
    content = re.sub(r'renderRow:\s*\((.*?)\)\s*=>\s*\{\s*\w+\);\s*', r'renderRow: (\1) => {\n          ', content)

    # Some of them might use different variable names than release, e.g., 'game' for sports? But sports was already rewritten!
    # Let's just fix `^\s*release\);\s*` or `^\s*\w+\);\s*` immediately after `{`
    
    with open(path, 'w') as f:
        f.write(content)
