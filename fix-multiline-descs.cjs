/**
 * fix-multiline-descs.cjs
 * 
 * Fixes descriptions that have embedded \r characters (multiline YAML),
 * and rewrites them as single-line descriptions of 70-80 chars.
 */
const fs = require('fs');
const path = require('path');

function charLen(s) { return Array.from(s).length; }

// Get all long desc paths from audit report
const r = JSON.parse(fs.readFileSync('td-audit-report.json', 'utf8'));
const needFix = new Set();

r.descLong.forEach(x => needFix.add(x.path));
r.descShort.forEach(x => needFix.add(x.path));

let fixed = 0;
let stillOob = [];

function getMarkdownPath(htmlPath) {
  if (htmlPath.startsWith('/blog/')) {
    const slug = htmlPath.replace('/blog/', '').replace('/index.html', '');
    return 'src/content/blog/' + slug + '.md';
  }
  if (htmlPath.startsWith('/evaluations/') && htmlPath !== '/evaluations/index.html') {
    const slug = htmlPath.replace('/evaluations/', '').replace('/index.html', '');
    return 'src/content/blog/' + slug + '.md';
  }
  return null;
}

for (const htmlPath of needFix) {
  const mdPath = getMarkdownPath(htmlPath);
  if (!mdPath || !fs.existsSync(mdPath)) continue;
  
  let content = fs.readFileSync(mdPath, 'utf8');
  
  // Find frontmatter (between --- markers)
  const fmStart = content.indexOf('---');
  const fmEnd = content.indexOf('---', fmStart + 3);
  if (fmStart === -1 || fmEnd === -1) continue;
  
  let fm = content.substring(fmStart + 3, fmEnd);
  
  // Get the description - it may be multiline due to \r characters
  // Pattern: description: "... (possibly spanning multiple lines with \r)"
  const descMatch = fm.match(/^description:\s*"([\s\S]*?)"(?:\r?\n(?!\s))/m);
  if (!descMatch) continue;
  
  const origDesc = descMatch[1].replace(/\r\n|\r|\n/g, '').trim();
  const origDescLen = charLen(origDesc);
  
  // Also get title for context
  const titleMatch = fm.match(/^title:\s*"([^"]+)"/m);
  const origTitle = titleMatch ? titleMatch[1] : '';
  
  // Extract body for content-based rewriting
  const bodyStart = fmEnd + 3;
  const body = content.substring(bodyStart).trim();
  const h2s = [...body.matchAll(/^##\s+(.*)/gm)].map(m => m[1].trim()).slice(0, 4);
  
  // Get title core (without " - 机场猫" and subtitle)
  const titleCore = origTitle
    .replace(/\s*-\s*机场猫\s*$/, '')
    .replace(/：.*$/, '')
    .replace(/:.+$/, '')
    .trim();
  
  let newDesc = origDesc;
  
  if (origDescLen > 80) {
    // Rewrite based on title core + h2s
    let candidate = '';
    
    if (h2s.length >= 2) {
      candidate = '本文介绍' + titleCore + '，涵盖' + h2s.slice(0, 2).join('与') + '等内容，帮助您理解相关原理与实际配置方法。';
    } else if (h2s.length === 1) {
      candidate = '本文介绍' + titleCore + '的核心概念与' + h2s[0] + '，适合需要了解代理网络工作原理的用户参考。';
    } else {
      candidate = '本文介绍' + titleCore + '的核心概念，说明其工作原理与在日常代理、AI访问中的实际影响，适合新手参考。';
    }
    
    let cLen = charLen(candidate);
    
    if (cLen > 80) {
      candidate = Array.from(candidate).slice(0, 79).join('');
      const puncts = '。，、；：！？';
      for (let i = candidate.length - 1; i >= 65; i--) {
        if (puncts.includes(candidate[i])) {
          candidate = candidate.substring(0, i + 1);
          break;
        }
      }
      cLen = charLen(candidate);
    }
    
    if (cLen < 70) {
      const pad = '，适合新手与进阶用户参考，助您解决日常使用问题。';
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
  } else if (origDescLen < 70) {
    // Extend - add context
    let candidate = origDesc.replace(/[。！？]$/, '');
    const pad = '，帮助您在日常代理网络使用中解决实际问题，提升连接稳定性与访问效率。';
    candidate = candidate + pad;
    const cLen = charLen(candidate);
    if (cLen > 80) {
      candidate = Array.from(candidate).slice(0, 80).join('');
    }
    newDesc = candidate;
    const newLen = charLen(newDesc);
    if (newLen < 70 || newLen > 80) {
      stillOob.push({ path: htmlPath, desc: newDesc, len: newLen });
    }
  }
  
  if (newDesc !== origDesc) {
    // Replace the description in the frontmatter (including any multiline content)
    const escapedNewDesc = newDesc.replace(/"/g, '\\"');
    
    // Replace the entire description field (possibly multiline) with a clean single-line version
    const newFm = fm.replace(
      /^description:\s*"[\s\S]*?"(?=\r?\n(?!\s))/m,
      'description: "' + escapedNewDesc + '"'
    );
    
    if (newFm !== fm) {
      const newContent = content.substring(0, fmStart + 3) + newFm + content.substring(fmEnd);
      fs.writeFileSync(mdPath, newContent, 'utf8');
      fixed++;
    }
  }
}

console.log('Fixed:', fixed);
console.log('Still OOB:', stillOob.length);
if (stillOob.length > 0) {
  console.log('OOB samples:', JSON.stringify(stillOob.slice(0, 5)));
}
