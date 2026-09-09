const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else {
      if (filePath.endsWith('.html')) fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = walk(DIST_DIR);
let report = {
  total: htmlFiles.length,
  indexable: 0,
  titleShort: [],
  titleLong: [],
  descShort: [],
  descLong: [],
  missingDesc: [],
  missingTitle: [],
  duplicateTitle: {},
  duplicateDesc: {}
};

let titleMap = {};
let descMap = {};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = file.replace(DIST_DIR, '').replace(/\\/g, '/');
  
  // Skip 404
  if (relativePath.includes('404.html')) return;
  
  const isNoindex = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*["']/i.test(content);
  if (isNoindex) return;
  
  report.indexable++;

  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    report.missingTitle.push(relativePath);
  } else {
    // Some titles might have HTML entities like &#x27; instead of ', or &amp; instead of &
    // For exact count, we should ideally decode entities, but Astro usually outputs clean utf8
    let title = titleMatch[1].trim();
    // decode basic html entities
    title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
    
    const len = Array.from(title).length;
    
    if (!titleMap[title]) titleMap[title] = [];
    titleMap[title].push(relativePath);
    
    if (len < 20) report.titleShort.push({ path: relativePath, title, len });
    if (len > 30) report.titleLong.push({ path: relativePath, title, len });
  }

  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  if (!descMatch) {
    report.missingDesc.push(relativePath);
  } else {
    let desc = descMatch[1].trim();
    desc = desc.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
    
    const len = Array.from(desc).length;
    
    if (!descMap[desc]) descMap[desc] = [];
    descMap[desc].push(relativePath);
    
    if (len < 70) report.descShort.push({ path: relativePath, desc, len });
    if (len > 80) report.descLong.push({ path: relativePath, desc, len });
  }
});

for (const [title, paths] of Object.entries(titleMap)) {
  if (paths.length > 1) {
    report.duplicateTitle[title] = paths;
  }
}
for (const [desc, paths] of Object.entries(descMap)) {
  if (paths.length > 1) {
    // If the description is missing, we already count it as missingDesc. Don't count empty as duplicate.
    if (desc !== '') report.duplicateDesc[desc] = paths;
  }
}

fs.writeFileSync('td-audit-report.json', JSON.stringify(report, null, 2), 'utf8');

console.log('--- TD AUDIT SUMMARY ---');
console.log('Indexable Pages:', report.indexable);
console.log('Title < 20:', report.titleShort.length);
console.log('Title > 30:', report.titleLong.length);
console.log('Desc < 70:', report.descShort.length);
console.log('Desc > 80:', report.descLong.length);
console.log('Missing Title:', report.missingTitle.length);
console.log('Missing Desc:', report.missingDesc.length);
console.log('Duplicate Title:', Object.keys(report.duplicateTitle).length);
console.log('Duplicate Desc:', Object.keys(report.duplicateDesc).length);
