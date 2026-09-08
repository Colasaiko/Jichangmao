const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const titles = {};
files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = c.match(/title:\s*["']([^"']+)["']/);
  if (m) titles[m[1]] = (titles[m[1]] || []).concat(f);
});
const dup = Object.entries(titles).find(([t]) => t.includes('网络专线'));
if (dup) {
  console.log('Count: ' + dup[1].length);
  dup[1].forEach(f => {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const body = c.substring(c.indexOf('---', 3) + 3).trim().substring(0, 120).replace(/[\n\r]/g, ' ');
    console.log(f + ': ' + body);
  });
}
const dup2 = Object.entries(titles).find(([t]) => t.includes('这个功能') && titles[t].length > 1);
if (dup2) {
  console.log('\n=== Copilot remaining ===');
  dup2[1].forEach(f => {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const body = c.substring(c.indexOf('---', 3) + 3).trim().substring(0, 120).replace(/[\n\r]/g, ' ');
    console.log(f + ': ' + body);
  });
}
