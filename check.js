    async function loadData() {
      try {
        const response = await fetch('data/linux.json');
        if (!response.ok) throw new Error("Could not fetch linux.json");
        const data = await response.json();
        
        // No reverse needed, Linux table is mostly newest-first already
        
        const tbody = document.getElementById('table-body');
        const loading = document.getElementById('loading');
        const tableContainer = document.getElementById('table-container');
        
        loading.style.display = 'none';
        tableContainer.style.display = 'block';

        data.forEach(release => {
          const keys = Object.keys(release);
          
          const getVal = (keys) => window.utils.getVal(keys, release);

          const version = getVal(['version']);
          const releaseDate = getVal(['original release date', 'release date', 'released', 'release']);
          let lastRelease = getVal(['last release']);
          
          if (version === '—' || version.length > 50) return;

          let statusText = 'Unsupported';
          let statusClass = 'status-unsupported';
          
          const vLower = version.toLowerCase();
          if (vLower.includes('preview version') || vLower.includes('future version')) {
            statusText = 'Upcoming';
            statusClass = 'status-preview';
          } else if ((vLower.includes('supported') || vLower.includes('latest')) && !vLower.includes('unsupported')) {
            statusText = 'Supported';
            statusClass = 'status-supported';
          }

          let cleanVersion = version.replace(/^(Unsupported|Supported|Latest version|Preview version|Future version):\s*/i, '').replace(/\s*\(.*?\)\s*/g, '').trim();

          const tr = document.createElement('tr');
          
          tr.innerHTML = `
            <td class="version">v${cleanVersion}</td>
            <td>${releaseDate}</td>
            <td>${lastRelease}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
          `;
          
          tbody.appendChild(tr);
        });
      } catch (err) {
        document.getElementById('loading').innerText = 'Data not generated yet. The GitHub Action will create data soon!';
        console.error(err);
      }
    }

    loadData();
