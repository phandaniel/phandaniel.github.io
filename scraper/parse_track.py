import urllib.request, bs4, json

req = urllib.request.Request('https://en.wikipedia.org/wiki/2026_USA_Outdoor_Track_and_Field_Championships', headers={'User-Agent': 'Mozilla/5.0'})
soup = bs4.BeautifulSoup(urllib.request.urlopen(req).read(), 'html.parser')

out = []
for h3 in soup.find_all('h3'):
    title = h3.text.replace('[edit]', '').strip()
    if title in ["Men's track", "Women's track"]:
        gender = "Men's" if "Men's" in title else "Women's"
        parent = h3.find_parent('div', class_='mw-heading') or h3
        tbl = parent.find_next_sibling('table', class_='wikitable')
        
        for tr in tbl.find_all('tr')[1:]:
            cells = tr.find_all(['th', 'td'])
            if len(cells) >= 7:
                out.append({
                    'Category': gender,
                    'Event': cells[0].text.strip(),
                    'Gold': cells[1].text.strip(),
                    'Gold Time': cells[2].text.strip(),
                    'Silver': cells[3].text.strip(),
                    'Silver Time': cells[4].text.strip(),
                    'Bronze': cells[5].text.strip(),
                    'Bronze Time': cells[6].text.strip()
                })

with open('data/track26.json', 'w') as f:
    json.dump(out, f, indent=2)
