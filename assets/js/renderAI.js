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
    
    if (sLower.includes('unsupported') || sLower.includes('discontinued') || sLower.includes('retired') || sLower.includes('deprecated') || sLower.includes('legacy')) {
      statusText = 'Unsupported';
      statusClass = 'status-unsupported';
    } else {
      statusText = 'Supported';
      statusClass = 'status-supported';
    }

    return `
      <td class="version">${window.utils.cleanStr(version)}</td>
      <td>${window.utils.cleanStr(date)}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
    `;
  }
};
