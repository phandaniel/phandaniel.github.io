import requests, json
from bs4 import BeautifulSoup

url = 'https://en.wikipedia.org/wiki/IOS_version_history'
response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
soup = BeautifulSoup(response.text, 'html.parser')
t = soup.find_all('table', {'class': 'wikitable'})[0]

header_row = t.find('tr')
headers = [th.text.strip().replace('\n', ' ') for th in header_row.find_all(['th', 'td'])]

rowspans = {}
data = []

for row in t.find_all('tr')[1:]:
    cells = row.find_all(['th', 'td'])
    if not cells: continue
    
    # skip subheader
    if cells[0].text.strip() == 'iPad': continue
    
    col_idx = 0
    cell_idx = 0
    entry = {}
    
    while col_idx < len(headers):
        if col_idx in rowspans and rowspans[col_idx]['span'] > 0:
            entry[headers[col_idx]] = rowspans[col_idx]['value']
            rowspans[col_idx]['span'] -= 1
            col_idx += 1
            continue
            
        if cell_idx < len(cells):
            cell = cells[cell_idx]
            val = cell.text.strip().replace('\n', ' ')
            entry[headers[col_idx]] = val
            
            if cell.has_attr('rowspan'):
                try:
                    span = int(cell['rowspan'])
                    if span > 1:
                        rowspans[col_idx] = {'span': span - 1, 'value': val}
                except ValueError:
                    pass
            
            if cell.has_attr('colspan'):
                try:
                    cspan = int(cell['colspan'])
                    # if it spans multiple columns, fill them all or just skip
                    col_idx += (cspan - 1)
                except ValueError:
                    pass
            
            cell_idx += 1
        else:
            # no more cells
            break
        col_idx += 1
        
    data.append(entry)

for d in data:
    if '10' in d.get('Version', ''):
        print(d)
