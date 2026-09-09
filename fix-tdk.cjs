const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else {
      if (filePath.endsWith('.md')) fileList.push(filePath);
    }
  }
  return fileList;
}

const files = walk('src/content/blog');
let titleFixed = 0;
let descFixed = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  // Extract frontmatter
  const fmMatch = content.match(/^---([\s\S]*?)---/);
  if (!fmMatch) return;
  let fm = fmMatch[1];
  
  // Check if title or desc matches the bad patterns
  const badPatterns = [
    /2026最新教程与指南/,
    /全面介绍.*?的核心概念与实际应用/,
    /机场猫为您提供详细的图文指南/,
    /轻松掌握相关网络与AI效率技巧/
  ];
  
  let needsFixTitle = badPatterns.some(p => p.test(fm));
  let needsFixDesc = badPatterns.some(p => p.test(fm)) || /description:\s*['"]?([^'"]+)['"]?/.exec(fm)?.[1]?.length < 40;

  if (needsFixTitle || needsFixDesc) {
    // Extract actual content (H2, H3, paragraphs)
    const body = content.replace(/^---[\s\S]*?---/, '').trim();
    const h2s = [...body.matchAll(/^##\s+([^\n]+)/gm)].map(m => m[1]);
    const firstPara = (body.match(/^[^\#\n].+$/m) || [''])[0].trim();
    const filename = path.basename(f, '.md');
    
    // Parse title
    let titleMatch = fm.match(/title:\s*['"]?([^'"\n]+)['"]?/);
    let title = titleMatch ? titleMatch[1] : '';
    
    if (badPatterns.some(p => p.test(title))) {
      if (filename.startsWith('review-')) {
        const brand = title.replace(/深度测评.*/, '').replace(/测评.*/, '').replace('：2026最新教程与指南', '');
        title = `${brand} 2026 深度测评：线路、套餐与真实使用体验`;
      } else {
        const baseTitle = title.replace(/：2026最新教程与指南/, '').replace(/解析.*/, '');
        title = `${baseTitle}：核心概念与配置实战指南`;
      }
      fm = fm.replace(/title:\s*['"]?([^'"\n]+)['"]?/, `title: '${title}'`);
      titleFixed++;
      changed = true;
    }

    // Parse desc
    let descMatch = fm.match(/description:\s*['"]?([^'"\n]+)['"]?/);
    let desc = descMatch ? descMatch[1] : '';
    
    if (badPatterns.some(p => p.test(desc)) || desc.length < 40) {
      let newDesc = '';
      if (filename.startsWith('review-')) {
        const brand = title.split(' ')[0];
        newDesc = `本指南详细记录了 ${brand} 的最新真实评测数据。通过分析其节点连通率、流媒体解锁情况以及不同套餐的性价比，帮助您判断是否适合自己的网络需求。`;
      } else {
        const topics = h2s.slice(0, 3).join('、');
        if (topics) {
          newDesc = `本文详细探讨了关于${title.split('：')[0]}的实际应用场景，包括${topics}等核心环节，帮助读者快速了解配置流程与注意事项，解决常见使用问题。`;
        } else {
          newDesc = `本文深入分析了${title.split('：')[0]}的技术背景与实际操作方法。我们将为您展示完整的步骤解析，帮助您解决在网络配置或效率提升过程中的痛点。`;
        }
      }
      // Ensure description is not too short or too long
      fm = fm.replace(/description:\s*['"]?([^'"\n]+)['"]?/, `description: '${newDesc}'`);
      descFixed++;
      changed = true;
    }
    
    if (changed) {
      content = content.replace(/^---[\s\S]*?---/, `---${fm}---`);
      fs.writeFileSync(f, content, 'utf8');
    }
  }
});

console.log(`Title fixed: ${titleFixed}, Description fixed: ${descFixed}`);
