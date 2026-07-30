import os
import re

print("Starting refactor...")

# 1. AI Pages
ai_files = ['chatgpt.html', 'claude.html', 'gemini.html', 'grok.html']
for ai in ai_files:
    path = f'release/ai/{ai}'
    with open(path, 'r') as f:
        content = f.read()
    
    # Extract Title and URL
    title_match = re.search(r'<h1>(.*?)</h1>', content)
    title = title_match.group(1) if title_match else ai.split('.')[0].capitalize()
    
    url_match = re.search(r"url:\s*'(.*?)'", content)
    url = url_match.group(1) if url_match else f'../../data/{ai.split(".")[0]}.json'
    
    new_script = f"""
  <script src="../../assets/js/renderAI.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', () => {{
      window.utils.renderTable({{
        url: '{url}',
        processData: window.renderAI.processData,
        renderRow: window.renderAI.renderRow
      }});
    }});
  </script>
"""
    # Replace old script block
    content = re.sub(r"<script>\s*window\.basePath = \"\.\./\.\./\";\s*window\.addEventListener\('DOMContentLoaded'[\s\S]*?\}\);\s*\}\);\s*</script>", new_script.strip(), content)
    
    with open(path, 'w') as f:
        f.write(content)

with open('assets/js/renderAI.js', 'w') as f:
    f.write("""window.renderAI = {
  processData: (data) => {
    data.reverse();
    return data;
  },
  renderRow: (release) => {
    const getVal = (searchStrs) => window.utils.getVal(searchStrs, release);
    let version = getVal(['version', 'model']);
    let date = getVal(['date']);
    let status = getVal(['status']);

    if (version === '—' || version.length > 50) return;

    let statusText = 'Unsupported';
    let statusClass = 'status-unsupported';
    
    const sLower = status.toLowerCase();
    if (sLower.includes('active') || sLower.includes('supported') || sLower.includes('current')) {
      statusText = 'Supported';
      statusClass = 'status-supported';
    } else {
      statusText = 'Unsupported';
      statusClass = 'status-unsupported';
    }

    return `
      <td class="version">${window.utils.cleanStr(version)}</td>
      <td>${window.utils.cleanStr(date)}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
    `;
  }
};
""")

# 2. Space Pages
space_files = ['starship.html', 'vulcan.html', 'newglenn.html']
space_config = {
    'starship.html': { 'title': 'Starship', 'url': '../../data/starship.json', 'dateKeys': "['date and time', 'date andtime']", 'flightKeys': "['flightno']", 'outcomeKeys': "['launch outcome']", 'dateRegex': "/\\\\s?\\\\d{2}:\\\\d{2}:\\\\d{2}.*/" },
    'vulcan.html': { 'title': 'Vulcan Centaur', 'url': '../../data/vulcan.json', 'dateKeys': "['date / time (utc)', 'date and time (utc)', 'date and time', 'date andtime']", 'flightKeys': "['flight no.', 'flightno']", 'outcomeKeys': "['launchoutcome', 'launch outcome']", 'dateRegex': "/\\\\s?\\\\d{2}:\\\\d{2}.*/" },
    'newglenn.html': { 'title': 'New Glenn', 'url': '../../data/newglenn.json', 'dateKeys': "['date / time (utc)', 'date and time (utc)', 'date and time', 'date andtime']", 'flightKeys': "['flight no.', 'flightno']", 'outcomeKeys': "['launchoutcome', 'launch outcome']", 'dateRegex': "/\\\\s?\\\\d{2}:\\\\d{2}.*/" }
}
for sp in space_files:
    path = f'release/space/{sp}'
    with open(path, 'r') as f:
        content = f.read()
    
    conf = space_config[sp]
    new_script = f"""
  <script src="../../assets/js/renderSpace.js"></script>
  <script>
    window.spaceConfig = {{
      dateKeys: {conf['dateKeys']},
      flightKeys: {conf['flightKeys']},
      outcomeKeys: {conf['outcomeKeys']},
      dateRegex: {conf['dateRegex']}
    }};
    window.addEventListener('DOMContentLoaded', () => {{
      window.utils.renderTable({{
        url: '{conf['url']}',
        processData: window.renderSpace.processData,
        renderRow: window.renderSpace.renderRow
      }});
    }});
  </script>
"""
    content = re.sub(r"<script>\s*window\.basePath = \"\.\./\.\./\";\s*window\.addEventListener\('DOMContentLoaded'[\s\S]*?\}\);\s*\}\);\s*</script>", new_script.strip(), content)
    with open(path, 'w') as f:
        f.write(content)

with open('assets/js/renderSpace.js', 'w') as f:
    f.write("""window.renderSpace = {
  processData: (data) => {
    let foundUpcoming = false;
    const filteredData = data.filter(release => {
      const date = window.utils.getVal(window.spaceConfig.dateKeys, release);
      const flight = window.utils.getVal(window.spaceConfig.flightKeys, release);
      
      if (!date || date === '—' || date.length > 80) return false;
      
      if (!flight || flight === '—') {
        if (!foundUpcoming) {
          foundUpcoming = true;
          return true;
        }
        return false;
      }
      return true;
    });

    let lastNum = 0;
    let prefix = '#';
    filteredData.forEach(release => {
      let flight = window.utils.getVal(['flight no.', 'flightno'], release);
      if (flight && flight !== '—') {
        let match = flight.match(/(\\D*)(\\d+)/);
        if (match) {
           prefix = match[1] || '#';
           lastNum = parseInt(match[2], 10);
        }
      } else {
         const keys = Object.keys(release);
         const flightKey = keys.find(k => k.toLowerCase().includes('flight no.') || k.toLowerCase().includes('flightno')) || 'Flight No.';
         release[flightKey] = prefix + (lastNum + 1);
      }
    });

    filteredData.reverse();
    return filteredData;
  },
  renderRow: (release) => {
    const getVal = (keys) => window.utils.getVal(keys, release);
    let flight = getVal(window.spaceConfig.flightKeys);
    let date = getVal(window.spaceConfig.dateKeys).replace(window.spaceConfig.dateRegex, '');
    let outcome = getVal(window.spaceConfig.outcomeKeys);

    let statusText = 'Upcoming';
    let statusClass = 'status-preview';
    
    const oLower = outcome.toLowerCase();
    if (oLower.includes('success')) {
      statusText = 'Success';
      statusClass = 'status-supported';
    } else if (oLower.includes('failure') || oLower.includes('destroyed')) {
      statusText = 'Failure';
      statusClass = 'status-unsupported';
    } else if (oLower.includes('partial')) {
      statusText = 'Partial';
      statusClass = 'status-partial';
    }

    flight = window.utils.cleanStr(flight);
    date = window.utils.cleanStr(date);

    return `
      <td class="flight-no">${flight !== '—' ? '#' + flight : '—'}</td>
      <td>${date}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
    `;
  }
};
""")

# 3. Sports Pages
sports_files = ['liberty.html', 'commanders.html', 'wizards.html']
sports_config = {
    'liberty.html': { 'url': '../../data/liberty.json', 'opponentKey': "['opponent']", 'resultKey': "['result']", 'hasBye': 'false' },
    'commanders.html': { 'url': '../../data/commanders.json', 'opponentKey': "['opponent']", 'resultKey': "['result']", 'hasBye': 'true' },
    'wizards.html': { 'url': '../../data/wizards.json', 'opponentKey': "['team']", 'resultKey': "['score']", 'hasBye': 'false' }
}

for sp in sports_files:
    path = f'release/sports/{sp}'
    with open(path, 'r') as f:
        content = f.read()
    
    conf = sports_config[sp]
    new_script = f"""
  <script src="../../assets/js/renderSports.js"></script>
  <script>
    window.sportsConfig = {{
      opponentKey: {conf['opponentKey']},
      resultKey: {conf['resultKey']},
      hasBye: {conf['hasBye']}
    }};
    window.addEventListener('DOMContentLoaded', () => {{
      window.utils.renderTable({{
        url: '{conf['url']}',
        processData: window.renderSports.processData,
        renderRow: window.renderSports.renderRow
      }});
    }});
  </script>
"""
    content = re.sub(r"<script>\s*window\.basePath = \"\.\./\.\./\";\s*window\.addEventListener\('DOMContentLoaded'[\s\S]*?\}\);\s*\}\);\s*</script>", new_script.strip(), content)
    
    with open(path, 'w') as f:
        f.write(content)

with open('assets/js/renderSports.js', 'w') as f:
    f.write("""window.renderSports = {
  processData: (data) => {
    data.reverse();
    return data;
  },
  renderRow: (game) => {
    const getVal = (searchStrs) => window.utils.getVal(searchStrs, game);
    let date = getVal(['date']);
    let opponent = getVal(window.sportsConfig.opponentKey);
    let result = getVal(window.sportsConfig.resultKey);
    
    if (date === '—') return;
    if (window.sportsConfig.hasBye && date.toLowerCase() === 'bye') {
      opponent = '—';
      result = '—';
    }

    let statusText = 'Upcoming';
    let statusClass = 'status-preview';
    let scoreText = '—';
    
    const rLower = result.toLowerCase();
    if (rLower.includes('w ')) {
      statusText = 'Win';
      statusClass = 'status-supported';
      scoreText = result.substring(rLower.indexOf('w ') + 2).trim().split('[')[0];
    } else if (rLower.includes('l ')) {
      statusText = 'Loss';
      statusClass = 'status-unsupported';
      scoreText = result.substring(rLower.indexOf('l ') + 2).trim().split('[')[0];
    } else if (rLower.includes('t ')) {
      statusText = 'Tie';
      statusClass = 'status-partial';
      scoreText = result.substring(rLower.indexOf('t ') + 2).trim().split('[')[0];
    } else if (result !== '—' && result !== '') {
      statusText = result.split('[')[0];
      statusClass = 'status-partial';
    } else if (window.sportsConfig.hasBye && date.toLowerCase() === 'bye') {
      statusText = '—';
      statusClass = 'status-partial';
    }

    return `
      <td class="version">${window.utils.cleanStr(date)}</td>
      <td>${window.utils.cleanStr(opponent)}</td>
      <td>${(window.sportsConfig.hasBye && date.toLowerCase() === 'bye') ? '—' : `<span class="status-badge ${statusClass}">${statusText}</span>`}</td>
      <td>${window.utils.cleanStr(scoreText)}</td>
    `;
  }
};
""")

print("Done sports.")
