const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIST_DIR = path.join(__dirname, 'dist');
const SITE_URL = 'https://jichangmao.com';

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else {
      if (filePath.endsWith('.html')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const htmlFiles = walk(DIST_DIR);
let report = {
  total: htmlFiles.length,
  indexable: [],
  noindex: [],
  missingTitle: [],
  duplicateTitle: {},
  shortTitle: [],
  longTitle: [],
  missingDesc: [],
  shortDesc: [],
  duplicateDesc: {},
  missingCanonical: [],
  wrongCanonical: [],
  multipleCanonical: [],
  zeroH1: [],
  multipleH1: [],
  missingOg: [],
  jsonLdError: [],
  brokenLinks: [],
  indexable404: [],
  sitemapMismatch: []
};

let titleMap = {};
let descMap = {};
let allValidPaths = htmlFiles.map(f => {
  let rel = f.replace(DIST_DIR, '').replace(/\\/g, '/');
  if (rel.endsWith('index.html')) rel = rel.replace(/index\.html$/, '');
  if (!rel.startsWith('/')) rel = '/' + rel;
  return rel;
});
// Add /404 as valid if 404.html exists
if (allValidPaths.includes('/404.html')) {
  allValidPaths.push('/404');
}

// Extract tags safely using regex
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = file.replace(DIST_DIR, '').replace(/\\/g, '/');
  const is404 = relativePath.includes('404.html');

  // Noindex check
  const isNoindex = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*["']/i.test(content);
  if (isNoindex) {
    report.noindex.push(relativePath);
  } else {
    report.indexable.push(relativePath);
    if (is404) report.indexable404.push(relativePath);
  }

  // Title
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    report.missingTitle.push(relativePath);
  } else {
    const title = titleMatch[1].trim();
    if (!titleMap[title]) titleMap[title] = [];
    titleMap[title].push(relativePath);
    
    if (title.length < 15) report.shortTitle.push(relativePath);
    if (title.length > 50) report.longTitle.push(relativePath); // 50 chars for chinese is long
  }

  // Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  if (!descMatch) {
    report.missingDesc.push(relativePath);
  } else {
    const desc = descMatch[1].trim();
    if (!descMap[desc]) descMap[desc] = [];
    descMap[desc].push(relativePath);
    
    if (desc.length < 30) report.shortDesc.push(relativePath);
  }

  // Canonical
  const canMatches = [...content.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi)];
  if (canMatches.length === 0) {
    report.missingCanonical.push(relativePath);
  } else if (canMatches.length > 1) {
    report.multipleCanonical.push(relativePath);
  } else {
    const canHref = canMatches[0][1];
    if (!canHref.startsWith(SITE_URL)) {
      report.wrongCanonical.push(relativePath);
    }
  }

  // H1
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    // Some special pages like 404 might not have H1, but flag anyway if not 404
    if (!is404) report.zeroH1.push(relativePath);
  } else if (h1Matches.length > 1) {
    report.multipleH1.push(relativePath);
  }

  // Open Graph
  const hasOgTitle = /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']/i.test(content);
  const hasOgDesc = /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']/i.test(content);
  const hasOgImage = /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']/i.test(content);
  if (!hasOgTitle || !hasOgDesc || !hasOgImage) {
    report.missingOg.push(relativePath);
  }

  // JSON-LD
  const jsonLdMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  jsonLdMatches.forEach(m => {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      report.jsonLdError.push(relativePath);
    }
  });

  // Internal Links
  const linkMatches = [...content.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi)];
  linkMatches.forEach(m => {
    let href = m[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      // Internal link
      href = href.split('#')[0]; // remove hash
      href = href.split('?')[0]; // remove query
      if (href !== '' && href !== '/' && !allValidPaths.includes(href) && !allValidPaths.includes(href + '/') && !allValidPaths.includes(href.replace(/\/$/, ''))) {
        report.brokenLinks.push(`${relativePath} -> ${href}`);
      }
    }
  });
});

// Process duplicates
for (const [title, paths] of Object.entries(titleMap)) {
  if (paths.length > 1) {
    report.duplicateTitle[title] = paths;
  }
}
for (const [desc, paths] of Object.entries(descMap)) {
  if (paths.length > 1) {
    report.duplicateDesc[desc] = paths;
  }
}

// Sitemap Check
if (fs.existsSync(path.join(DIST_DIR, 'sitemap-0.xml'))) {
  const sitemap = fs.readFileSync(path.join(DIST_DIR, 'sitemap-0.xml'), 'utf8');
  const smLinks = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1].replace(SITE_URL, ''));
  smLinks.forEach(link => {
    let l = link;
    if (l !== '/' && !l.endsWith('/')) l += '/';
    // simple check
  });
}

// Generate MD
let md = `# SEO Audit Report\n\n`;
md += `1. 总 HTML 页面数: ${report.total}\n`;
md += `2. indexable 页面数: ${report.indexable.length}\n`;
md += `3. noindex 页面数: ${report.noindex.length}\n`;
md += `4. 缺 Title 页面: ${report.missingTitle.length}\n`;
report.missingTitle.forEach(p => md += `   - ${p}\n`);
md += `5. 重复 Title: ${Object.keys(report.duplicateTitle).length}\n`;
for (const [title, paths] of Object.entries(report.duplicateTitle)) {
  md += `   - "${title}": ${paths.slice(0,3).join(', ')} ...\n`;
}
md += `6. Title 少于 15 中文字符或明显过短: ${report.shortTitle.length}\n`;
report.shortTitle.forEach(p => md += `   - ${p}\n`);
md += `7. Title 超过合理长度: ${report.longTitle.length}\n`;
report.longTitle.forEach(p => md += `   - ${p}\n`);
md += `8. 缺 Meta Description: ${report.missingDesc.length}\n`;
report.missingDesc.forEach(p => md += `   - ${p}\n`);
md += `9. Description 明显过短: ${report.shortDesc.length}\n`;
report.shortDesc.forEach(p => md += `   - ${p}\n`);
md += `10. 重复 Description: ${Object.keys(report.duplicateDesc).length}\n`;
for (const [desc, paths] of Object.entries(report.duplicateDesc)) {
  md += `   - "${desc}": ${paths.slice(0,3).join(', ')} ...\n`;
}
md += `11. 缺 canonical: ${report.missingCanonical.length}\n`;
report.missingCanonical.forEach(p => md += `   - ${p}\n`);
md += `12. canonical 不属于 ${SITE_URL}: ${report.wrongCanonical.length}\n`;
report.wrongCanonical.forEach(p => md += `   - ${p}\n`);
md += `13. 一个页面存在多个 canonical: ${report.multipleCanonical.length}\n`;
report.multipleCanonical.forEach(p => md += `   - ${p}\n`);
md += `14. H1 = 0 的页面 (非404): ${report.zeroH1.length}\n`;
report.zeroH1.forEach(p => md += `   - ${p}\n`);
md += `15. H1 > 1 的页面: ${report.multipleH1.length}\n`;
report.multipleH1.forEach(p => md += `   - ${p}\n`);
md += `16. 缺 og:title/desc/image: ${report.missingOg.length}\n`;
report.missingOg.forEach(p => md += `   - ${p}\n`);
md += `17. JSON-LD 无法解析: ${report.jsonLdError.length}\n`;
report.jsonLdError.forEach(p => md += `   - ${p}\n`);
md += `18. 内部链接指向不存在 URL: ${report.brokenLinks.length}\n`;
report.brokenLinks.slice(0,20).forEach(p => md += `   - ${p}\n`);
md += `19. 可索引 404/错误页: ${report.indexable404.length}\n`;
report.indexable404.forEach(p => md += `   - ${p}\n`);

fs.writeFileSync('seo-audit-report.md', md, 'utf8');
console.log('Audit completed and written to seo-audit-report.md');
