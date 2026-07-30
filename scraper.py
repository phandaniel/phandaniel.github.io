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
        if any('version' in h or 'release' in h for h in tbl_headers):
            tables.append(tbl)

    if not tables:
        print(f"Could not find any release history tables for {url}.")
        return

    releases = []

    for table in tables:
        header_row = table.find('tr')
        if not header_row: continue
        headers_list = [th.text.strip().replace('\n', ' ') for th in header_row.find_all(['th', 'td'])]

        for row in table.find_all('tr')[1:]:
            cols = row.find_all(['td', 'th'])
            cols_text = [re.sub(r'\[.*?\]', '', c.text.strip().replace('\n', ' ')) for c in cols]
            
            if len(cols_text) > 1:
                release = {}
                for i in range(min(len(headers_list), len(cols_text))):
                    release[headers_list[i]] = cols_text[i]
                
                if any(v for v in release.values()):
                    releases.append(release)

    with open(output_file, 'w') as f:
        json.dump(releases, f, indent=2)

    print(f"Successfully scraped {len(releases)} releases from {len(tables)} tables into {output_file}.")

scrape_wiki('https://en.wikipedia.org/wiki/Fedora_Linux_release_history', 'fedora.json')
scrape_wiki('https://en.wikipedia.org/wiki/Ubuntu_version_history', 'ubuntu.json')
scrape_wiki('https://en.wikipedia.org/wiki/Linux_kernel_version_history', 'linux.json')
