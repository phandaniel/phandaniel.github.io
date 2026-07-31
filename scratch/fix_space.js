const fs = require('fs');

const spaceFiles = ['release/space/starship.html', 'release/space/vulcan.html', 'release/space/newglenn.html'];
const spaceConfig = `
      window.spaceConfig = {
        dateKeys: ['date / time (utc)', 'date and time (utc)', 'date and time', 'date andtime'],
        flightKeys: ['flight no.', 'flightno', 'flight'],
        outcomeKeys: ['launchoutcome', 'launch outcome'],
        dateRegex: /\\s?\\d{2}:\\d{2}.*/
      };
`;

for (const file of spaceFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  // replace old config block with new one
  content = content.replace(/window\.spaceConfig\s*=\s*\{[\s\S]*?\};/, spaceConfig.trim());
  fs.writeFileSync(file, content);
}
console.log('Fixed spaceConfig');
