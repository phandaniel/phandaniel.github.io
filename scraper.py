import requests
from bs4 import BeautifulSoup
import json
import re

url = 'https://en.wikipedia.org/wiki/Fedora_Linux_release_history'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

# Find the main release history table
# We look for a wikitable that likely contains "Version" or "Release" in headers
table = None
for tbl in soup.find_all('table', {'class': 'wikitable'}):
    headers = [th.text.strip().lower() for th in tbl.find_all('th')]
    if any('version' in h or 'release' in h for h in headers):
        table = tbl
        break

if not table:
    print("Could not find the release history table.")
    exit(1)

# Extract headers
header_row = table.find('tr')
headers = [th.text.strip().replace('\n', ' ') for th in header_row.find_all(['th', 'td'])]

releases = []

# Extract rows
for row in table.find_all('tr')[1:]:
    cols = row.find_all(['td', 'th'])
    cols_text = [re.sub(r'\[.*?\]', '', c.text.strip().replace('\n', ' ')) for c in cols] # Remove citations like [1]
    
    if len(cols_text) > 1:
        release = {}
        # Try to map columns to headers
        for i in range(min(len(headers), len(cols_text))):
            release[headers[i]] = cols_text[i]
        
        # Only add if it looks like a real row (e.g. has a version)
        if any(v for v in release.values()):
            releases.append(release)

with open('data.json', 'w') as f:
    json.dump(releases, f, indent=2)

print(f"Successfully scraped {len(releases)} releases.")
