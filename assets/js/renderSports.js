window.renderSports = {
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
