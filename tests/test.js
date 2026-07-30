const puppeteer = require('puppeteer');
const fs = require('fs');

const files = ['release/linux/fedora.html', 'release/linux/ubuntu.html', 'release/linux/kernel.html', 'release/linux/rhel.html', 'release/os/ios.html', 'release/os/android.html', 'release/space/starship.html', 'release/space/vulcan.html', 'release/space/newglenn.html', 'release/ai/claude.html', 'release/ai/grok.html', 'release/ai/gemini.html', 'release/ai/chatgpt.html', 'release/dev/kubernetes.html', 'release/dev/python.html', 'release/sports/liberty.html', 'release/sports/commanders.html', 'release/sports/wizards.html'];
let passed = true;

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--disable-web-security']
  });

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
        // Ignore favicon 404s
        if (!msg.text().includes('favicon.ico')) {
          console.error(`  [ERROR] Console Error: ${msg.text()}`);
          errors++;
        }
      }
    });

    try {
      await page.goto(`file://${process.cwd()}/../${file}`, { waitUntil: 'networkidle0' });
      
      // Check if table populated
      const rowCount = await page.$$eval('#table-body tr', rows => rows.length);
      if (rowCount === 0) {
        console.error('  [ERROR] Table body is empty! Data did not load.');
        errors++;
      } else {
        console.log(`  [PASS] Table populated with ${rowCount} rows.`);
      }

      // Check status badge colors
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
