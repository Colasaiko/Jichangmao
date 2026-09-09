/**
 * fix-td-lengths.cjs
 * 
 * Reads all violating MD files from violated_mds.json,
 * generates new Title (20-30 chars) and Description (70-80 chars)
 * based on actual content, then writes them back.
 * 
 * Strategy:
 * - Title: trim existing title to keyword + " - 机场猫", targeting 20-30 chars total
 * - Description: rewrite based on firstPara + H2s, targeting 70-80 chars
 */

const fs = require('fs');
const path = require('path');

const payload = JSON.parse(fs.readFileSync('payload_for_llm.json', 'utf8'));
const violations = JSON.parse(fs.readFileSync('violations_map.json', 'utf8'));

function charLen(s) { return Array.from(s).length; }

// Generate a new title targeting 20-30 chars
function generateTitle(file, info) {
  const slug = path.basename(file, path.extname(file));
  let t = info.originalTitle || '';
  const suffix = ' - 机场猫';
  const suffixLen = charLen(suffix);
  // target max content = 30 - suffixLen = 22 chars
  const maxContent = 30 - suffixLen;
  const minContent = 20 - suffixLen;
  
  // If title already has " - 机场猫", strip it
  let core = t.replace(/\s*-\s*机场猫\s*$/, '').trim();
  
  // If core is already within range, keep it
  let coreLen = charLen(core);
  if (coreLen >= minContent && coreLen <= maxContent) {
    return core + suffix;
  }
  
  // Too long: trim to maxContent
  if (coreLen > maxContent) {
    // Try to trim at last '：' or '：' or '|' boundary  
    let trimmed = core;
    // remove trailing detail after '：' if it helps
    let colonIdx = core.lastIndexOf('：');
    if (colonIdx > minContent) {
      trimmed = core.substring(0, colonIdx);
    }
    if (charLen(trimmed) > maxContent) {
      // Hard trim
      trimmed = Array.from(core).slice(0, maxContent).join('');
    } else if (charLen(trimmed) < minContent) {
      // Trimmed too much, take more
      trimmed = Array.from(core).slice(0, maxContent).join('');
    }
    return trimmed + suffix;
  }
  
  // Too short: need to add context
  // Try adding from H2s or category
  const h2s = info.headers ? info.headers.split(' | ').map(h => h.trim()) : [];
  let extended = core;
  
  // Add context from H2
  if (h2s.length > 0) {
    // Try appending first keyword from first h2
    const h2words = h2s[0];
    // Add a key concept from h2
    for (let i = 1; i <= h2words.length; i++) {
      const candidate = Array.from(h2words).slice(0, i).join('');
      if (charLen(extended + '：' + candidate) >= minContent) {
        extended = extended + '：' + candidate;
        break;
      }
    }
  }
  
  // If still short, pad with category context
  const catMap = {
    'ai_network': 'AI网络排障',
    'ai_tools': 'AI工具教程',
    'guide': '配置指南',
    'guides': '配置指南',
    'routing': '网络路由原理',
    'clients': '客户端教程',
    'aitools': 'AI使用技巧',
    'ai_work': 'AI工作效率',
    'ai_image': 'AI图像创作',
    'ai_video': 'AI视频制作',
    'ai_writing': 'AI写作辅助',
    'ai_drama': 'AI短剧制作',
    'ai_learning': 'AI学习应用',
    'ai_office': 'AI办公效率',
    'ai_workflow': 'AI工作流',
    'ai_site': 'AI建站指南',
    'performance': '性能调优',
    'airport': '机场推荐',
    'proxy': '代理配置',
    'security': '网络安全',
    'streaming': '流媒体解锁',
  };
  
  if (charLen(extended) < minContent) {
    const catLabel = catMap[info.category] || '实战指南';
    if (charLen(extended + '：' + catLabel) <= maxContent) {
      extended = extended + '：' + catLabel;
    }
  }
  
  // Last check — if extended is longer, trim it
  if (charLen(extended) > maxContent) {
    extended = Array.from(extended).slice(0, maxContent).join('');
  }
  
  return extended + suffix;
}

// Generate a description targeting 70-80 chars
function generateDesc(file, info) {
  let desc = info.originalDesc || '';
  const h2s = info.headers ? info.headers.split(' | ').filter(h => h.trim()) : [];
  const firstPara = info.firstPara || '';
  
  let dLen = charLen(desc);
  
  if (dLen >= 70 && dLen <= 80) return desc; // already fine (shouldn't be here, but safety)
  
  // If too long: trim
  if (dLen > 80) {
    // Try to find a natural cut at 78-80 chars
    let cut = Array.from(desc).slice(0, 78).join('');
    // Find last natural punctuation
    const puncts = '。，、；：！？';
    for (let i = cut.length - 1; i >= 65; i--) {
      if (puncts.includes(cut[i])) {
        cut = cut.substring(0, i + 1);
        break;
      }
    }
    if (charLen(cut) < 70) {
      cut = Array.from(desc).slice(0, 78).join('');
    }
    return cut;
  }
  
  // If too short: expand based on firstPara and h2s
  // Build a new description from scratch
  let parts = [];
  
  // Start with existing desc core
  if (desc && charLen(desc) >= 10) {
    parts.push(desc);
  } else if (firstPara && charLen(firstPara) >= 10) {
    // Take the first 50 chars of the first paragraph
    parts.push(Array.from(firstPara).slice(0, 50).join(''));
  }
  
  // Add H2 context
  if (h2s.length > 0) {
    const h2str = '涵盖' + h2s.slice(0, 2).join('与');
    parts.push(h2str);
  }
  
  let combined = parts.join('，');
  
  // Trim or pad to 70-80
  if (charLen(combined) > 80) {
    combined = Array.from(combined).slice(0, 78).join('');
    const puncts = '。，、；：！？';
    for (let i = combined.length - 1; i >= 65; i--) {
      if (puncts.includes(combined[i])) {
        combined = combined.substring(0, i + 1);
        break;
      }
    }
  }
  
  if (charLen(combined) < 70) {
    // Pad with category-relevant phrase
    const catSuffix = '，帮助您快速了解并掌握相关技能，解决实际使用难题。';
    combined = combined + catSuffix;
    combined = Array.from(combined).slice(0, 80).join('');
  }
  
  return combined;
}

let fixed = 0;
let skipped = 0;

for (const [mdFile, info] of Object.entries(payload)) {
  if (!fs.existsSync(mdFile)) { skipped++; continue; }
  
  // Check if this file has violations
  // We need to find it in violations_map by its slug
  const slug = path.basename(mdFile, path.extname(mdFile));
  const htmlPath = mdFile.includes('/blog/') ? `/blog/${slug}/index.html` : `/clients/${slug}/index.html`;
  
  if (!violations[htmlPath]) { skipped++; continue; }
  
  const vio = violations[htmlPath];
  
  let newTitle = info.originalTitle;
  let newDesc = info.originalDesc;
  let changed = false;
  
  // Check if title needs fixing
  if (vio.titleLen !== undefined && (vio.titleLen < 20 || vio.titleLen > 30)) {
    newTitle = generateTitle(mdFile, info);
    const newLen = charLen(newTitle);
    if (newLen < 20 || newLen > 30) {
      console.log(`TITLE STILL OOB: ${mdFile}: "${newTitle}" (${newLen})`);
    }
    changed = true;
  }
  
  // Check if desc needs fixing
  if (vio.descLen !== undefined && (vio.descLen < 70 || vio.descLen > 80)) {
    newDesc = generateDesc(mdFile, info);
    const newLen = charLen(newDesc);
    if (newLen < 70 || newLen > 80) {
      console.log(`DESC STILL OOB: ${mdFile}: "${newDesc}" (${newLen})`);
    }
    changed = true;
  }
  
  if (!changed) { skipped++; continue; }
  
  // Write back to MD file
  let content = fs.readFileSync(mdFile, 'utf8');
  
  // Replace title
  content = content.replace(/^(title:\s*)["']?.*?["']?(\r?\n)/m, (match, prefix, ending) => {
    return prefix + '"' + newTitle + '"' + ending;
  });
  
  // Replace description
  content = content.replace(/^(description:\s*)["']?.*?["']?(\r?\n)/m, (match, prefix, ending) => {
    return prefix + '"' + newDesc + '"' + ending;
  });
  
  fs.writeFileSync(mdFile, content, 'utf8');
  fixed++;
}

console.log('Fixed:', fixed, 'Skipped:', skipped);
