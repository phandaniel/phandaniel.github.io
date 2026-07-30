    async function loadData() {
      try {
        const response = await fetch('starship.json');
        if (!response.ok) throw new Error("Could not fetch starship.json");
        const data = await response.json();
        
        // Data is roughly chronological from Wikipedia. Let's reverse it so newest/upcoming are on top.
        data.reverse();

        const tbody = document.getElementById('table-body');
        const loading = document.getElementById('loading');
        const tableContainer = document.getElementById('table-container');
        
        loading.style.display = 'none';
        tableContainer.style.display = 'block';

        data.forEach(release => {
          const keys = Object.keys(release);
          
          const getVal = (searchStrs) => {
            for (let str of searchStrs) {
               const key = keys.find(k => k.toLowerCase().includes(str));
               if (key && release[key].trim()) return release[key];
            }
            return '—';
          };

          let flight = getVal(['flightno']);
          let date = getVal(['date and time', 'date andtime']);
          let booster = getVal(['version,booster']);
          let ship = getVal(['version,ship']);
          let payload = getVal(['payload']);
          let outcome = getVal(['launch outcome']);

          if (date === '—') return;

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

          // Strip wikipedia citations
          const cleanStr = (s) => s.replace(/\\[\\d+\\]/g, '').replace(/—N\\/a/gi, '&mdash;');

          flight = cleanStr(flight);
          date = cleanStr(date);
          booster = cleanStr(booster);
          ship = cleanStr(ship);
          payload = cleanStr(payload);

          const tr = document.createElement('tr');
          
          tr.innerHTML = `
            <td class="flight-no">${flight !== '—' ? '#' + flight : '—'}</td>
            <td>${date}</td>
            <td>${booster}</td>
            <td>${ship}</td>
            <td>${payload}</td>
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
