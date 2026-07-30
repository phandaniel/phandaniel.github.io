window.renderSpace = {
  processData: (data) => {
    // Filter: keep rows that have a real date OR are upcoming (TBD), skip description-only rows
    const filteredData = data.filter(release => {
      const date = window.utils.getVal(window.spaceConfig.dateKeys, release);
      const flight = window.utils.getVal(window.spaceConfig.flightKeys, release);
      // Description-only rows have very long "dates" (paragraph text)
      if (!date || date === '—' || date.length > 80) return false;
      return true;
    });

    // First pass: track the last known flight number and prefix from numbered rows
    let lastNum = 0;
    let prefix = '';      // e.g. '' for Starship/Vulcan (pure numbers), 'NG-' for New Glenn
    let numericOnly = true; // whether flight numbers are bare integers

    filteredData.forEach(release => {
      const flight = window.utils.getVal(window.spaceConfig.flightKeys, release);
      if (flight && flight !== '—') {
        const match = flight.match(/^([A-Za-z\-]*)(\d+)$/);
        if (match) {
          prefix = match[1];          // e.g. 'NG-' or ''
          lastNum = parseInt(match[2], 10);
          numericOnly = prefix === '';
        }
      }
    });

    // Second pass: assign sequential flight numbers to upcoming (no flight no.) rows
    let nextNum = lastNum + 1;
    filteredData.forEach(release => {
      const flight = window.utils.getVal(window.spaceConfig.flightKeys, release);
      if (!flight || flight === '—') {
        // Find the key to write into
        const keys = Object.keys(release);
        const flightKey = keys.find(k =>
          window.spaceConfig.flightKeys.some(fk => k.toLowerCase().replace(/\s/g, '') === fk.toLowerCase().replace(/\s/g, ''))
        ) || window.spaceConfig.flightKeys[0];
        release[flightKey] = prefix + nextNum;
        nextNum++;
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

    // Format flight number: bare numbers get a '#' prefix, prefixed codes (NG-1) stay as-is
    let flightDisplay;
    if (flight === '—') {
      flightDisplay = '—';
    } else if (/^\d+$/.test(flight)) {
      flightDisplay = '#' + flight;
    } else {
      flightDisplay = flight;
    }

    return `
      <td class="flight-no">${flightDisplay}</td>
      <td>${date}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
    `;
  }
};
