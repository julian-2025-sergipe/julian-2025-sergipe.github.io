const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://stagging.dotelematics.com/academy/courses',
  'https://stagging.dotelematics.com/academy/lessons',
  'https://stagging.dotelematics.com/admin/access-period',
  'https://stagging.dotelematics.com/admin/commands',
  'https://stagging.dotelematics.com/admin/company',
  'https://stagging.dotelematics.com/admin/contacts',
  'https://stagging.dotelematics.com/admin/permissions',
  'https://stagging.dotelematics.com/admin/profiles',
  'https://stagging.dotelematics.com/admin/sessions',
  'https://stagging.dotelematics.com/admin/urls',
  'https://stagging.dotelematics.com/admin/users',
  'https://stagging.dotelematics.com/commands/history-commands',
  'https://stagging.dotelematics.com/commands/schedule-commands',
  'https://stagging.dotelematics.com/fleet/drivers',
  'https://stagging.dotelematics.com/fleet/fleets',
  'https://stagging.dotelematics.com/fleet/fuel-supply',
  'https://stagging.dotelematics.com/fleet/ibuttons',
  'https://stagging.dotelematics.com/fleet/vehicles',
  'https://stagging.dotelematics.com/geo-fence/manage',
  'https://stagging.dotelematics.com/geo-fence/report',
  'https://stagging.dotelematics.com/maintenance/item',
  'https://stagging.dotelematics.com/maintenance/list',
  'https://stagging.dotelematics.com/maintenance/report',
  'https://stagging.dotelematics.com/marine/ships',
  'https://stagging.dotelematics.com/monitoring/done',
  'https://stagging.dotelematics.com/monitoring/events',
  'https://stagging.dotelematics.com/monitoring/monitoring',
  'https://stagging.dotelematics.com/monitoring/settings',
  'https://stagging.dotelematics.com/panels',
  'https://stagging.dotelematics.com/public-link',
  'https://stagging.dotelematics.com/realtime',
  'https://stagging.dotelematics.com/reports/analytic',
  'https://stagging.dotelematics.com/reports/billing',
  'https://stagging.dotelematics.com/reports/block-command-history',
  'https://stagging.dotelematics.com/reports/distance',
  'https://stagging.dotelematics.com/reports/events',
  'https://stagging.dotelematics.com/reports/monitoring-operator',
  'https://stagging.dotelematics.com/reports/tracker-metrics',
  'https://stagging.dotelematics.com/reports/trips',
  'https://stagging.dotelematics.com/reports/v2/analytic',
  'https://stagging.dotelematics.com/ruler',
  'https://stagging.dotelematics.com/ruler-history',
  'https://stagging.dotelematics.com/ruler/id'
];

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const htmlDir = './htmls';
    if (!fs.existsSync(htmlDir)) {
      fs.mkdirSync(htmlDir);
    }

    console.log("Abrindo a página de login...");
    await page.goto('https://stagging.dotelematics.com/sign-in', { waitUntil: 'domcontentloaded', timeout: 10000 });

    console.log("Preenchendo o formulário de login...");
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('button[type="submit"]');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {
      console.warn(`Aviso: Redirecionamento não ocorreu. URL atual: ${page.url()}`);
    });

    if (page.url().includes('sign-in')) {
      throw new Error('Falha no login: Ainda na página de login');
    }
    console.log("Login realizado com sucesso!");

    const report = [];
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const fileName = path.join(htmlDir, `${i + 1}.json`);

      console.log(`Navegando para: ${url}`);
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
        await page.waitForSelector('body', { state: 'visible', timeout: 9000 }).catch(() => {
          console.warn(`Aviso: Conteúdo principal não detectado em ${url}`);
        });

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 9000)));

        const pageContent = await page.content();
        const pageTitle = await page.title();
        const status = response.status();

        // Contabilizar múltiplos elementos HTML
        const elementCounts = await page.evaluate(() => {
          return {
            div: document.querySelectorAll('div').length,
            p: document.querySelectorAll('p').length,
            a: document.querySelectorAll('a').length,
            img: document.querySelectorAll('img').length,
            input: document.querySelectorAll('input').length,
            button: document.querySelectorAll('button').length,
            table: document.querySelectorAll('table').length,
            h1: document.querySelectorAll('h1').length,
            h2: document.querySelectorAll('h2').length,
            h3: document.querySelectorAll('h3').length,
            h4: document.querySelectorAll('h4').length,
            h5: document.querySelectorAll('h5').length,
            h6: document.querySelectorAll('h6').length,
            span: document.querySelectorAll('span').length,
            ul: document.querySelectorAll('ul').length,
            li: document.querySelectorAll('li').length,
            form: document.querySelectorAll('form').length,
            script: document.querySelectorAll('script').length,
            iframe: document.querySelectorAll('iframe').length,
            section: document.querySelectorAll('section').length,
            article: document.querySelectorAll('article').length,
            nav: document.querySelectorAll('nav').length,
            header: document.querySelectorAll('header').length,
            footer: document.querySelectorAll('footer').length
          };
        });

        // Capturar links (com texto e href)
        const links = await page.$$eval('a', anchors => anchors.map(a => ({
          text: a.textContent.trim(),
          href: a.href
        })));

        // Verificar mensagens de erro
        const errorMessage = await page.$eval('.error, .alert-danger, .error-message', el => el.textContent.trim(), { timeout: 5000 }).catch(() => null);

        const pageData = {
          timestamp: new Date().toISOString(),
          url,
          status,
          title: pageTitle,
          elementCounts,
          links,
          errorMessage,
          htmlLength: pageContent.length,
          html: pageContent
        };

        // Salvar dados da página em JSON
        fs.writeFileSync(fileName, JSON.stringify(pageData, null, 2), 'utf-8');
        console.log(`Dados salvos em: ${fileName}`);

        // Adicionar ao relatório consolidado
        report.push({
          url,
          status,
          title: pageTitle,
          htmlLength: pageContent.length,
          elementCounts,
          errorMessage
        });

      } catch (error) {
        console.error(`Erro ao processar ${url}: ${error.message}`);
        const pageData = {
          timestamp: new Date().toISOString(),
          url,
          status: 'Erro',
          error: error.message,
          html: await page.content().catch(() => 'Não foi possível capturar o HTML')
        };
        fs.writeFileSync(fileName, JSON.stringify(pageData, null, 2), 'utf-8');
        console.log(`Relatório de erro salvo em: ${fileName}`);
        report.push({ url, status: 'Erro', error: error.message });
      }
    }

    // Salvar relatório consolidado
    fs.writeFileSync('report.json', JSON.stringify(report, null, 2), 'utf-8');
    console.log('Relatório consolidado salvo em: report.json');

  } catch (error) {
    console.error("Ocorreu um erro durante a automação:", error.message);
  } finally {
    if (browser) {
      await browser.close();
      console.log("Navegador fechado.");
    }
  }
})();