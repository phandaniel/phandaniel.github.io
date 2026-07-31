import urllib.request
import bs4
import json

req = urllib.request.Request('https://en.wikipedia.org/wiki/UFC_329', headers={'User-Agent': 'Mozilla/5.0'})
soup = bs4.BeautifulSoup(urllib.request.urlopen(req).read(), 'html.parser')

out = []
card_name = ""

for h2 in soup.find_all('h2'):
    if 'Results' in h2.text:
        table = h2.find_next('table')
        for r in table.find_all('tr'):
            cells = [c.text.strip() for c in r.find_all(['th','td'])]
            if len(cells) == 1:
                card_name = cells[0].split('(')[0].strip()
            elif len(cells) >= 7 and cells[0] != 'Weight class':
                out.append({
                    'Card': card_name,
                    'Weight class': cells[0],
                    'Winner': cells[1],
                    'Loser': cells[3],
                    'Method': cells[4],
                    'Round': cells[5],
                    'Time': cells[6],
                    'Notes': cells[7] if len(cells) > 7 else ''
                })

with open('data/ufc329.json', 'w') as f:
    json.dump(out, f, indent=2)
