const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const consoleMessages = [];
  const errors = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(`${msg.type()}: ${text}`);
    console.log(`[CONSOLE ${msg.type()}]`, text);
  });

  page.on('pageerror', error => {
    errors.push(error.toString());
    console.log('[PAGE ERROR]', error);
  });

  page.on('requestfailed', request => {
    console.log('[REQUEST FAILED]', request.url());
  });

  try {
    console.log('Navigating to http://localhost:8080...');
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    const rootContent = await page.evaluate(() => {
      const root = document.querySelector('#root');
      if (!root) return { exists: false };
      return {
        exists: true,
        hasChildren: root.children.length > 0,
        innerHTML: root.innerHTML.substring(0, 500)
      };
    });

    console.log('\n=== ROOT ELEMENT ===');
    console.log(JSON.stringify(rootContent, null, 2));

    if (errors.length > 0) {
      console.log('\n=== ERRORS ===');
      errors.forEach(err => console.log(err));
    }

    console.log('\n=== TEST COMPLETE ===');
    console.log('Root exists:', rootContent.exists);
    console.log('Has content:', rootContent.hasChildren);
    console.log('Total errors:', errors.length);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
