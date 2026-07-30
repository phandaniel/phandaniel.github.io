window.renderSpace = {
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
        let match = flight.match(/(\D*)(\d+)/);
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
