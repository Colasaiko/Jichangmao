const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

// Read content snippet for all remaining files with "网络专线" title
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const remaining = allFiles.filter(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  return c.includes('"网络专线：2026最新教程与指南 - 机场猫"');
});

remaining.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const body = c.substring(c.indexOf('---', 3) + 3).trim();
  // Extract H1/H2/H3 headings and first 200 chars
  const headings = (body.match(/#{1,3} .+/g) || []).slice(0, 3).join(' | ');
  const snippet = body.substring(0, 180).replace(/[\n\r]/g, ' ').replace(/\s+/g, ' ');
  const catMatch = c.match(/category:\s*["']([^"']+)["']/);
  console.log(f + ' [' + (catMatch ? catMatch[1] : '?') + ']: ' + snippet.substring(0, 120));
});
