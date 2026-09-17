const fs = require('fs');
const path = require('path');

const dirs = ['src/content/blog', 'src/pages'];

function processLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 机场推荐 -> /
  content = content.replace(/\[机场推荐\]\(\/reviews\/?\)/g, '[机场推荐](/)');
  content = content.replace(/\[2026机场推荐\]\(\/reviews\/?\)/g, '[2026机场推荐](/)');

  // 机场排行榜 -> /reviews/
  content = content.replace(/\[机场排行榜\]\(\/\)/g, '[机场排行榜](/reviews/)');
  content = content.replace(/\[机场推荐排行榜\]\(\/\)/g, '[机场推荐排行榜](/reviews/)');

  // 稳定机场推荐 -> /blog/stable-airport-recommendations/
  content = content.replace(/\[稳定机场推荐\]\(\/(?:reviews\/)?\)/g, '[稳定机场推荐](/blog/stable-airport-recommendations/)');
  
  // 便宜机场推荐 -> /blog/cheap-airport-recommendations/
  content = content.replace(/\[便宜机场推荐\]\(\/(?:reviews\/)?\)/g, '[便宜机场推荐](/blog/cheap-airport-recommendations/)');

  // 专线机场推荐 -> /blog/dedicated-line-airport-recommendations/
  content = content.replace(/\[专线机场推荐\]\(\/(?:reviews\/)?\)/g, '[专线机场推荐](/blog/dedicated-line-airport-recommendations/)');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      if (fullPath.endsWith('.md') || fullPath.endsWith('.astro')) {
        processLinks(fullPath);
      }
    }
  }
}

dirs.forEach(d => walk(d));
console.log('Internal links replaced.');
