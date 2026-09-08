const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

// Get list of all files still with duplicate titles
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const titles = {};
files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = c.match(/title:\s*["']([^"']+)["']/);
  if (m) { titles[m[1]] = (titles[m[1]] || []); titles[m[1]].push(f); }
});

// Get all files with these two remaining duplicate title groups
const networkLine = Object.keys(titles).find(t => t.includes('网络专线') && titles[t].length > 5);
const featureFunc = Object.keys(titles).find(t => t.includes('这个功能') && titles[t].length > 5);

// Print them all
if (networkLine) {
  console.log('=== 网络专线 group (' + titles[networkLine].length + ' files) ===');
  titles[networkLine].forEach(f => {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const body = c.substring(c.indexOf('---',3)+3).trim().substring(0, 120).replace(/[\n\r]/g, ' ');
    console.log(f + ': ' + body);
  });
}

if (featureFunc) {
  console.log('\n=== 一、这个功能 group (' + titles[featureFunc].length + ' files) ===');
  titles[featureFunc].forEach(f => {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const body = c.substring(c.indexOf('---',3)+3).trim().substring(0, 120).replace(/[\n\r]/g, ' ');
    console.log(f + ': ' + body);
  });
}
