import os, glob, re

files = glob.glob('**/*.html', recursive=True)
for f in files:
    if f == 'index.html': continue
    with open(f, 'r') as file:
        content = file.read()
    
    script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
    if not script_match:
        continue
    script = script_match.group(1)
    
    if 'window.utils.renderTable' in script:
        continue
        
    url_m = re.search(r"fetch\('([^']+)'\)", script)
    if not url_m: continue
    url = url_m.group(1)
    
    prep_m = re.search(r'const data = await response\.json\(\);(.*?)\s*const tbody = document\.getElementById', script, re.DOTALL)
    prep = prep_m.group(1).strip() if prep_m else ""
    
    # replace "const data = await response.json();" with "let data = await response.json();" ? We don't need to, we wrap it in processData
    
    arr_name = 'data'
    if 'filteredData' in prep: arr_name = 'filteredData'
    
    foreach_m = re.search(rf'{arr_name}\.forEach\(\s*([a-zA-Z0-9_]+)\s*=>\s*{{(.*?)tbody\.appendChild\(tr\);\s*}}\);', script, re.DOTALL)
    if not foreach_m: 
        print(f"No foreach match in {f}")
        continue
    
    var_name = foreach_m.group(1)
    body = foreach_m.group(2)
    
    body = re.sub(r"const tr = document\.createElement\('tr'\);\s*", "", body)
    body = re.sub(r"tr\.innerHTML = `", "return `", body)
    body = re.sub(r"tr\.innerHTML =\s*`", "return `", body)
    
    new_s = f"""
    window.basePath = "../";
    window.addEventListener('DOMContentLoaded', () => {{
      window.utils.renderTable({{
        url: '{url}',
        processData: (data) => {{
          {prep}
          return {arr_name};
        }},
        renderRow: ({var_name}) => {{{body}}}
      }});
    }});
"""
    new_content = content.replace(script, new_s)
    with open(f, 'w') as file:
        file.write(new_content)
    print(f"Refactored {f}")

