const puppeteer = require('puppeteer');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['release/linux/fedora.html', 'release/linux/ubuntu.html', 'release/linux/kernel.html', 'release/linux/rhel.html', 'release/os/ios.html', 'release/os/android.html', 'release/space/starship.html', 'release/space/vulcan.html', 'release/space/newglenn.html', 'release/ai/claude.html', 'release/ai/grok.html', 'release/ai/gemini.html', 'release/ai/chatgpt.html', 'release/dev/kubernetes.html', 'release/dev/python.html', 'release/sports/liberty.html', 'release/sports/commanders.html', 'release/sports/wizards.html'];
let passed = true;

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--disable-web-security']
  });

  // Test the menu dropdown on the homepage
  console.log(`\nTesting Homepage Menu Dropdown...`);
  const menuPage = await browser.newPage();
  await menuPage.setViewport({ width: 1280, height: 450 }); // small height to test overflow logic
  let menuErrors = 0;
  
  try {
    await menuPage.goto(`file://${path.join(rootDir, 'index.html')}`, { waitUntil: 'networkidle0' });
    await menuPage.click('#dropdownBtn');
    await menuPage.waitForSelector('#dropdownContent.show', { visible: true });
    console.log("  [PASS] Dropdown menu is visible on click.");
    
    const submenus = await menuPage.$$('.has-submenu');
    if (submenus.length > 0) {
      const sportsMenu = submenus[submenus.length - 1]; // last one
      await sportsMenu.hover();
      await new Promise(r => setTimeout(r, 500));
      
      const box = await sportsMenu.$eval('.submenu', el => {
        const rect = el.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom, height: rect.height };
      });
      
      if (box.top < 0 || box.bottom > 450) {
         console.error(`  [ERROR] Submenu overflows viewport! Top: ${box.top}, Bottom: ${box.bottom}`);
         menuErrors++;
      } else {
         console.log("  [PASS] Submenu stays within viewport on hover.");
      }
    }
  } catch (err) {
    console.error(`  [ERROR] Exception testing menu: ${err.message}`);
    menuErrors++;
  }
  await menuPage.close();
  if (menuErrors > 0) {
    passed = false;
    console.log(`❌ Homepage Menu failed.`);
  } else {
    console.log(`✅ Homepage Menu passed.`);
  }

  for (const file of files) {
    console.log(`\nTesting ${file}...`);
    const page = await browser.newPage();
    let errors = 0;
    
    page.on('pageerror', err => {
      console.error(`  [ERROR] Page Error: ${err.message}`);
      errors++;
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        if (!msg.text().includes('favicon.ico')) {
          console.error(`  [ERROR] Console Error: ${msg.text()}`);
          errors++;
        }
      }
    });

    try {
      await page.goto(`file://${path.join(rootDir, file)}`, { waitUntil: 'networkidle0' });
      
      const rowCount = await page.$$eval('#table-body tr', rows => rows.length);
      if (rowCount === 0) {
        console.error('  [ERROR] Table body is empty! Data did not load.');
        errors++;
      } else {
        console.log(`  [PASS] Table populated with ${rowCount} rows.`);
      }

      const badgesWithoutColor = await page.$$eval('.status-badge', badges => {
        return badges.filter(b => {
          const bg = window.getComputedStyle(b).backgroundColor;
          return bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent';
        }).length;
      });

      if (badgesWithoutColor > 0) {
        console.error(`  [ERROR] Found ${badgesWithoutColor} status badges with no background color! CSS regression!`);
        errors++;
      } else {
        console.log('  [PASS] All status badges are properly styled.');
      }

      const invalidVersions = await page.$$eval('#table-body tr', rows => {
        return rows.filter(r => {
          const firstCol = r.querySelector('td:first-child').innerText.trim();
          return !firstCol || firstCol === '—' || firstCol === 'undefined' || firstCol === 'null';
        }).length;
      });

      if (invalidVersions > 0) {
        console.error(`  [ERROR] Found ${invalidVersions} rows with missing or invalid version names!`);
        errors++;
      } else {
        console.log('  [PASS] All rows have valid version names.');
      }

    } catch (err) {
      console.error(`  [ERROR] Exception during navigation: ${err.message}`);
      errors++;
    }
    
    await page.close();
    
    if (errors > 0) {
      passed = false;
      console.log(`❌ ${file} failed.`);
    } else {
      console.log(`✅ ${file} passed.`);
    }
  }

  await browser.close();
  
  if (!passed) {
    console.log('\n❌ TEST SUITE FAILED');
    process.exit(1);
  } else {
    console.log('\n✅ ALL TESTS PASSED');
    process.exit(0);
  }
})();
