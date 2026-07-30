import requests
from bs4 import BeautifulSoup
import json
import re

req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

def scrape_wiki(url, output_file):
    response = requests.get(url, headers=req_headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    tables = []
    for tbl in soup.find_all('table', {'class': 'wikitable'}):
        tbl_headers = [th.text.strip().lower() for th in tbl.find_all('th')]
        if any('version' in h or 'release' in h or 'opponent' in h or 'result' in h for h in tbl_headers):
            tables.append(tbl)

    if not tables:
        print(f"Could not find any release history tables for {url}.")
        return

    releases = []

    for t in tables:
        header_row = t.find('tr')
        if not header_row: continue
        headers = [th.text.strip().replace('\n', ' ') for th in header_row.find_all(['th', 'td'])]
        
        rowspans = {}
        for row in t.find_all('tr')[1:]:
            cells = row.find_all(['th', 'td'])
            if not cells: continue
            
            # Skip subheader rows (like iPad, iPhone, iPod)
            if cells[0].text.strip() in ['iPad', 'Server', 'Desktop']: continue
            
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
                    val = re.sub(r'\[.*?\]', '', cell.text.strip().replace('\n', ' '))
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
                            col_idx += (cspan - 1)
                        except ValueError:
                            pass
                            
                    cell_idx += 1
                else:
                    break
                col_idx += 1
                
            if entry.get(headers[0]) and len(entry) > 1:
                releases.append(entry)

    with open(output_file, 'w') as f:
        json.dump(releases, f, indent=2)

    print(f"Successfully scraped {len(releases)} releases from {len(tables)} tables into {output_file}.")

scrape_wiki('https://en.wikipedia.org/wiki/Fedora_Linux_release_history', 'data/fedora.json')
scrape_wiki('https://en.wikipedia.org/wiki/Ubuntu_version_history', 'data/ubuntu.json')
scrape_wiki('https://en.wikipedia.org/wiki/Linux_kernel_version_history', 'data/linux.json')
scrape_wiki('https://en.wikipedia.org/wiki/IOS_version_history', 'data/ios.json')
scrape_wiki('https://en.wikipedia.org/wiki/List_of_Starship_launches', 'data/starship.json')
scrape_wiki('https://en.wikipedia.org/wiki/Claude_(AI)', 'data/claude.json')
scrape_wiki('https://en.wikipedia.org/wiki/Grok_(chatbot)', 'data/grok.json')
scrape_wiki('https://en.wikipedia.org/wiki/Gemini_(language_model)', 'data/gemini.json')
scrape_wiki('https://en.wikipedia.org/wiki/ChatGPT', 'data/chatgpt.json')
scrape_wiki('https://en.wikipedia.org/wiki/2026_Liberty_Flames_football_team', 'data/liberty.json')
scrape_wiki('https://en.wikipedia.org/wiki/Kubernetes', 'data/kubernetes.json')
scrape_wiki('https://en.wikipedia.org/wiki/2026_Washington_Commanders_season', 'data/commanders.json')
