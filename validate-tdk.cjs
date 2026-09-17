const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');

function checkTDK(htmlPath) {
  const content = fs.readFileSync(htmlPath, 'utf8');
  let valid = true;
  
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length < 20 || title.length > 30) {
      console.log(`[TITLE LENGTH] ${title.length} chars in ${htmlPath}`);
      valid = false;
    }
    if (/[，。、；]$/.test(title)) {
      console.log(`[TITLE PUNCTUATION ENDING] in ${htmlPath}`);
      valid = false;
    }
  }

  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.length < 70 || desc.length > 80) {
      console.log(`[DESC LENGTH] ${desc.length} chars in ${htmlPath}`);
      valid = false;
    }
    if (/[，、；]$/.test(desc)) {
      console.log(`[DESC COMMA ENDING] in ${htmlPath}`);
      valid = false;
    }
    if (!/[。！？?.!]$/.test(desc)) {
      console.log(`[DESC NON-SENTENCE ENDING] in ${htmlPath}: ${desc.slice(-5)}`);
      valid = false;
    }
  }

  return valid;
}

const targets = [
  'index.html',
  'reviews/index.html',
  'blog/cheap-airport-recommendations/index.html',
  'blog/dedicated-line-airport-recommendations/index.html',
  'blog/clash-airport-recommendations/index.html',
  'blog/chatgpt-airport-recommendations/index.html',
  'blog/netflix-airport-recommendations/index.html',
  'blog/native-ip-airport-recommendations/index.html',
  'blog/shadowrocket-airport-recommendations/index.html',
  'blog/v2rayn-airport-recommendations/index.html',
  'blog/ladder-recommendations/index.html',
  'blog/sing-box-airport-recommendations/index.html',
  'blog/quantumult-x-airport-recommendations/index.html',
  'blog/hiddify-airport-recommendations/index.html',
  'blog/stable-airport-recommendations/index.html',
];

let allValid = true;
for (const t of targets) {
  const fp = path.join(distDir, t);
  if (fs.existsSync(fp)) {
    if (!checkTDK(fp)) {
      allValid = false;
    }
  } else {
    console.log(`Missing file: ${fp}`);
    allValid = false;
  }
}

if (allValid) {
  console.log('All core money pages TDK validated successfully!');
}
