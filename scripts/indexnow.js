import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'jichangmao.com';
const KEY = 'e6e816bd74fe463c1282267d22eef127';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const args = process.argv.slice(2);
let singleUrl = null;
for (const arg of args) {
  if (arg.startsWith('--url=')) {
    singleUrl = arg.substring('--url='.length);
  }
}

function getUrlsFromSitemap() {
  const distDir = path.resolve(__dirname, '../dist');
  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Please run npm run build first.');
    process.exit(1);
  }

  const urls = new Set();
  const files = fs.readdirSync(distDir);
  const sitemapFiles = files.filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));

  for (const file of sitemapFiles) {
    const content = fs.readFileSync(path.join(distDir, file), 'utf-8');
    const matches = content.matchAll(/<loc>(.*?)<\/loc>/g);
    for (const match of matches) {
      const url = match[1];
      if (url.includes(HOST) && !url.includes('/api/') && !url.includes('/admin/') && !url.includes('/404')) {
        urls.add(url);
      }
    }
  }

  return Array.from(urls);
}

async function checkKeyOnline() {
  return new Promise((resolve) => {
    https.get(KEY_LOCATION, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve(res.statusCode === 200 && data.trim() === KEY);
      });
    }).on('error', () => resolve(false));
  });
}

function submitIndexNow(urlList) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log('[OK] IndexNow accepted');
          resolve();
        } else {
          console.error(`HTTP status: ${res.statusCode}`);
          console.error(`response body: ${data}`);
          reject(new Error('IndexNow submission failed'));
        }
      });
    });

    req.on('error', (e) => {
      console.error(e);
      reject(e);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  let urlsToSubmit = [];
  if (singleUrl) {
    urlsToSubmit = [singleUrl];
  } else {
    urlsToSubmit = getUrlsFromSitemap();
  }

  console.log(`[INFO] Host: ${HOST}`);
  console.log(`[INFO] Key: ${KEY}`);
  console.log(`[INFO] Key location: ${KEY_LOCATION}`);
  console.log(`[INFO] URLs found: ${urlsToSubmit.length}`);
  
  if (urlsToSubmit.length === 0) {
    console.log('No URLs to submit.');
    return;
  }

  const isOnline = await checkKeyOnline();
  if (!isOnline) {
    console.log('请先 push / deploy，确认 key URL 可访问，再运行 npm run indexnow。');
    return;
  }

  console.log(`[INFO] URLs submitted: ${urlsToSubmit.length}`);
  await submitIndexNow(urlsToSubmit);
}

main();
