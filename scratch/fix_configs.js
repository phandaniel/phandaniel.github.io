const fs = require('fs');

const spaceFiles = ['release/space/starship.html', 'release/space/vulcan.html', 'release/space/newglenn.html'];
const spaceConfig = `
      window.spaceConfig = {
        dateKeys: ['date and time', 'date andtime'],
        flightKeys: ['flightno'],
        outcomeKeys: ['launch outcome'],
        dateRegex: /\\s?\\d{2}:\\d{2}:\\d{2}.*/
      };
`;

for (const file of spaceFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace("window.utils.renderPage({", spaceConfig + "\n      window.utils.renderPage({");
  fs.writeFileSync(file, content);
}

const sportsFiles = ['release/sports/commanders.html', 'release/sports/wizards.html', 'release/sports/liberty.html'];
const sportsConfig = `
      window.sportsConfig = {
        opponentKey: 'Opponent',
        dateKey: 'Date',
        resultKey: 'Result'
      };
`;

for (const file of sportsFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace("window.utils.renderPage({", sportsConfig + "\n      window.utils.renderPage({");
  fs.writeFileSync(file, content);
}

console.log("Fixed space and sports configs!");
