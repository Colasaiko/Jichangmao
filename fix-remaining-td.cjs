const fs = require('fs');
const path = require('path');

const r = JSON.parse(fs.readFileSync('td-audit-report.json', 'utf8'));

function charLen(s) { return Array.from(s).length; }

// Get all long desc paths mapped back to md files
const needFix = {};
r.descLong.forEach(x => { needFix[x.path] = x; });
r.descShort.forEach(x => { needFix[x.path] = x; });
// also the title > 30
r.titleLong.forEach(x => { needFix[x.path] = needFix[x.path] || {}; needFix[x.path].titleOver = x; });

let fixed = 0;
let stillOob = [];

for (const [htmlPath, vio] of Object.entries(needFix)) {
  let slug = '';
  let mdPath = '';
  
  if (htmlPath.startsWith('/blog/')) {
    slug = htmlPath.replace('/blog/', '').replace('/index.html', '');
    mdPath = 'src/content/blog/' + slug + '.md';
  } else if (htmlPath.startsWith('/clients/') && !htmlPath.endsWith('/clients/index.html')) {
    slug = htmlPath.replace('/clients/', '').replace('/index.html', '');
    mdPath = 'src/content/clients/' + slug + '.mdx';
  } else if (htmlPath.startsWith('/evaluations/') && !htmlPath.endsWith('/evaluations/index.html')) {
    slug = htmlPath.replace('/evaluations/', '').replace('/index.html', '');
    mdPath = 'src/content/blog/' + slug + '.md';
  } else {
    // static pages - handled separately
    continue;
  }
  
  if (!fs.existsSync(mdPath)) continue;
  
  let content = fs.readFileSync(mdPath, 'utf8');
  const fmMatch = content.match(/^(?:\uFEFF)?---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) continue;
  const fm = fmMatch[1];
  
  const origTitle = (fm.match(/^title:\s*["']?(.*?)["']?$/m) || ['', ''])[1];
  const origDesc = (fm.match(/^description:\s*["']?(.*?)["']?$/m) || ['', ''])[1];
  
  // Extract body
  const body = content.replace(/^(?:\uFEFF)?---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
  const firstPara = (body.match(/^[^\#\n].{10,}/m) || [''])[0].trim();
  const h2s = [...body.matchAll(/^##\s+(.*)/gm)].map(m => m[1].trim()).slice(0, 4);
  
  let newDesc = origDesc;
  let newTitle = origTitle;
  
  // Fix title if needed
  if (vio.titleOver) {
    const core = origTitle.replace(/\s*-\s*机场猫\s*$/, '').trim();
    // Find a natural cut point
    const colonIdx = core.lastIndexOf('：');
    const maxContent = 22; // 30 - 8 (" - 机场猫")
    let trimmed = core;
    if (colonIdx > 12 && colonIdx <= maxContent) {
      trimmed = core.substring(0, colonIdx);
    } else {
      trimmed = Array.from(core).slice(0, maxContent).join('');
    }
    newTitle = trimmed + ' - 机场猫';
    const tLen = charLen(newTitle);
    if (tLen < 20 || tLen > 30) {
      console.log('TITLE STILL OOB: ' + htmlPath + ' (' + tLen + ')');
    }
  }
  
  // Fix description - specifically handle template-generated ones  
  const isTemplateLong = origDesc.includes('本文详细探讨了关于') || origDesc.includes('本指南详细记录');
  const dLen = charLen(origDesc);
  
  if (dLen > 80 && isTemplateLong) {
    // Rewrite based on actual content
    // Strategy: use the title core + first real paragraph sentence
    const titleCore = origTitle.replace(/\s*-\s*机场猫\s*$/, '')
                               .replace(/：.*$/, '')
                               .replace(/:.+$/, '')
                               .trim();
    
    // Get meaningful first sentence from body
    let firstSentence = '';
    if (firstPara) {
      // Take first sentence (up to first。or first 40 chars)
      const dotIdx = firstPara.indexOf('。');
      if (dotIdx > 10 && dotIdx < 50) {
        firstSentence = firstPara.substring(0, dotIdx);
      } else {
        firstSentence = Array.from(firstPara).slice(0, 45).join('');
      }
    }
    
    // Use h2 headings as context
    const h2context = h2s.slice(0, 3).join('、');
    
    // Build desc 70-80 chars
    let candidate = '';
    
    if (h2s.length >= 2) {
      // "本文介绍{titleCore}，涵盖{h2-1}与{h2-2}等内容，帮助您理解相关原理与实际应用场景。"
      candidate = '本文介绍' + titleCore + '，涵盖' + h2s.slice(0, 2).join('与') + '等内容，帮助您理解相关原理与实际配置方法。';
    } else if (firstSentence) {
      candidate = firstSentence + '，本文逐步拆解相关概念，并说明实际使用中的注意事项。';
    } else {
      candidate = '本文介绍' + titleCore + '的核心概念，说明其工作原理与在日常代理、AI访问中的实际影响，适合新手参考。';
    }
    
    let cLen = charLen(candidate);
    
    // Trim if too long
    if (cLen > 80) {
      candidate = Array.from(candidate).slice(0, 78).join('');
      // Find natural cut
      const puncts = '。，、；：！？';
      for (let i = candidate.length - 1; i >= 65; i--) {
        if (puncts.includes(candidate[i])) {
          candidate = candidate.substring(0, i + 1);
          break;
        }
      }
      cLen = charLen(candidate);
    }
    
    // Pad if too short  
    if (cLen < 70) {
      const pad = '，适合新手与进阶用户参考，帮助解决日常代理网络问题。';
      candidate = candidate.replace(/[。！？]$/, '') + pad;
      cLen = charLen(candidate);
      if (cLen > 80) {
        candidate = Array.from(candidate).slice(0, 80).join('');
        cLen = charLen(candidate);
      }
    }
    
    newDesc = candidate;
    
    if (cLen < 70 || cLen > 80) {
      stillOob.push({ path: htmlPath, desc: candidate, len: cLen });
    }
  } else if (dLen < 70) {
    // Extend short desc
    let candidate = origDesc;
    const pad = '，帮助您在日常代理网络使用中解决实际问题，提升连接稳定性与访问效率。';
    candidate = candidate.replace(/[。！？]$/, '') + pad;
    const cLen = charLen(candidate);
    if (cLen > 80) {
      candidate = Array.from(candidate).slice(0, 80).join('');
    } else if (cLen < 70) {
      // Still too short, add more
      candidate = candidate + '供参考';
    }
    newDesc = candidate;
  }
  
  // Write back
  let newContent = content;
  if (newTitle !== origTitle) {
    newContent = newContent.replace(/^(title:\s*)["']?.*?["']?(\r?\n)/m, function(m, p, e) {
      return p + '"' + newTitle + '"' + e;
    });
  }
  if (newDesc !== origDesc) {
    newContent = newContent.replace(/^(description:\s*)["']?.*?["']?(\r?\n)/m, function(m, p, e) {
      return p + '"' + newDesc + '"' + e;
    });
  }
  
  if (newContent !== content) {
    fs.writeFileSync(mdPath, newContent, 'utf8');
    fixed++;
  }
}

// Handle clients/index.html (static page)
if (r.titleLong.find(x => x.path === '/clients/index.html')) {
  const clientsAstro = 'src/pages/clients.astro';
  let c = fs.readFileSync(clientsAstro, 'utf8');
  // Find the title prop
  const titleMatch = c.match(/title=(["'])(.*?)\1/);
  if (titleMatch) {
    const origTitle = titleMatch[2];
    console.log('clients.astro title:', origTitle, 'len:', charLen(origTitle));
    // Fix: "代理客户端教程：Windows、Mac、iOS全平台配置 - 机场猫" = 28 chars
    const newTitle = '代理客户端教程：Windows、Mac、iOS全平台配置 - 机场猫';
    console.log('new title len:', charLen(newTitle));
    c = c.replace(/title=(["'])(.*?)\1/, 'title="' + newTitle + '"');
    fs.writeFileSync(clientsAstro, c, 'utf8');
    fixed++;
  }
}

console.log('Fixed:', fixed, 'Still OOB:', stillOob.length);
if (stillOob.length > 0) {
  console.log('OOB items:', JSON.stringify(stillOob.slice(0, 5)));
}
