const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

const titles = {};
const descs = {};
let total = 0;

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  if (titleMatch) {
    const t = titleMatch[1];
    titles[t] = (titles[t] || []);
    titles[t].push(f);
    total++;
  }
  if (descMatch) {
    const d = descMatch[1];
    descs[d] = (descs[d] || []);
    descs[d].push(f);
  }
});

const dupTitles = Object.entries(titles).filter(([,files]) => files.length > 1);
const dupDescs = Object.entries(descs).filter(([,files]) => files.length > 1);

console.log('===== SEO AUDIT REPORT =====');
console.log('Total articles: ' + total);
console.log('Unique titles: ' + Object.keys(titles).length);
console.log('Duplicate title groups: ' + dupTitles.length);
console.log('Total articles with duplicate titles: ' + dupTitles.reduce((a,[,f])=>a+f.length,0));
console.log('Unique descriptions: ' + Object.keys(descs).length);
console.log('Duplicate desc groups: ' + dupDescs.length);
console.log('');
console.log('--- TOP 20 Duplicate Titles (by count) ---');
dupTitles.sort((a,b)=>b[1].length-a[1].length).slice(0,20).forEach(([t,f])=>{
  console.log('['+ f.length + 'x] ' + t.substring(0,80));
  f.slice(0,3).forEach(fn => console.log('    - ' + fn));
});
console.log('');
console.log('--- Files with "基本概念" title ---');
const basicConceptFiles = dupTitles.find(([t]) => t.includes('基本概念'));
if (basicConceptFiles) {
  console.log('Count: ' + basicConceptFiles[1].length);
  console.log('Files:');
  basicConceptFiles[1].forEach(f => console.log('  ' + f));
}
