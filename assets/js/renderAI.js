window.renderAI = {
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
