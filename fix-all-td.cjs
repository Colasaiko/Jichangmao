/**
 * fix-all-td-violations.cjs
 * 
 * One-shot script that:
 * 1. Reads td-audit-report.json for all violations
 * 2. For each violating HTML path, finds the MD file
 * 3. Reads the actual current description from the MD (handling multiline correctly)
 * 4. Rewrites to meet 70-80 chars for desc, 20-30 for title
 * 5. Writes back
 */

const fs = require('fs');
const path = require('path');

function charLen(s) { return Array.from(String(s)).length; }

function trimToRange(str, min, max) {
  let len = charLen(str);
  if (len > max) {
    str = Array.from(str).slice(0, max - 1).join('') + '。';
    // Try to find natural cut
    const puncts = '。，、；：！？';
    const arr = Array.from(str);
    for (let i = Math.min(max - 1, arr.length - 1); i >= min - 1; i--) {
      if (puncts.includes(arr[i])) {
        str = arr.slice(0, i + 1).join('');
        break;
      }
    }
  }
  return str;
}

function getMarkdownPath(htmlPath) {
  if (htmlPath.startsWith('/blog/')) {
    const slug = htmlPath.replace('/blog/', '').replace('/index.html', '');
    return { type: 'blog', path: 'src/content/blog/' + slug + '.md', slug };
  }
  if (htmlPath.startsWith('/evaluations/') && htmlPath !== '/evaluations/index.html') {
    const slug = htmlPath.replace('/evaluations/', '').replace('/index.html', '');
    return { type: 'blog', path: 'src/content/blog/' + slug + '.md', slug };
  }
  if (htmlPath.startsWith('/clients/') && htmlPath !== '/clients/index.html') {
    const slug = htmlPath.replace('/clients/', '').replace('/index.html', '');
    const mdx = 'src/content/clients/' + slug + '.mdx';
    return { type: 'clients', path: fs.existsSync(mdx) ? mdx : 'src/content/clients/' + slug + '.md', slug };
  }
  return null;
}

function readMdField(content, field) {
  // Find the field in frontmatter - handles multiline quoted values
  const regex = new RegExp('^' + field + ':\\s*"([\\s\\S]*?)"(?=\\r?\\n(?!\\s))', 'm');
  const m = content.match(regex);
  if (m) return m[1].replace(/\r\n|\r|\n/g, '').trim();
  // Try single-quoted
  const regex2 = new RegExp("^" + field + ":\\s*'([\\s\\S]*?)'(?=\\r?\\n(?!\\s))", 'm');
  const m2 = content.match(regex2);
  if (m2) return m2[1].replace(/\r\n|\r|\n/g, '').trim();
  // Try unquoted
  const regex3 = new RegExp('^' + field + ':\\s*([^\\r\\n"\']+)', 'm');
  const m3 = content.match(regex3);
  if (m3) return m3[1].trim();
  return '';
}

function writeMdField(content, field, newValue) {
  // Replace the full field (including multiline) with a clean single-line version
  const regex = new RegExp('^(' + field + ':\\s*)"[\\s\\S]*?"(?=\\r?\\n(?!\\s))', 'm');
  let newContent = content.replace(regex, '$1"' + newValue + '"');
  if (newContent !== content) return newContent;
  // Try single quoted
  const regex2 = new RegExp("^(" + field + ":\\s*)'[\\s\\S]*?'(?=\\r?\\n(?!\\s))", 'm');
  newContent = content.replace(regex2, '$1"' + newValue + '"');
  if (newContent !== content) return newContent;
  // Try unquoted - replace line
  const regex3 = new RegExp('^(' + field + ':\\s*)([^\\r\\n"\']+)(\\r?\\n)', 'm');
  newContent = content.replace(regex3, '$1"' + newValue + '"$3');
  return newContent;
}

function generateDesc(titleCore, h2s, origDesc) {
  // If we have good h2s, use them
  if (h2s.length >= 2) {
    return '本文介绍' + titleCore + '，涵盖' + h2s.slice(0, 2).join('与') + '等内容，帮助您理解相关原理与实际配置方法。';
  } else if (h2s.length === 1) {
    return '本文介绍' + titleCore + '的核心概念与' + h2s[0] + '，适合需要了解代理网络工作原理的用户参考阅读。';
  } else {
    return '本文介绍' + titleCore + '的核心概念，说明其工作原理与在日常代理、AI访问中的实际影响，适合新手与进阶用户参考。';
  }
}

const r = JSON.parse(fs.readFileSync('td-audit-report.json', 'utf8'));

// Collect all violation paths
const violations = {};
r.descLong.forEach(x => { violations[x.path] = violations[x.path] || {}; violations[x.path].descVio = 'long'; violations[x.path].descLen = x.len; });
r.descShort.forEach(x => { violations[x.path] = violations[x.path] || {}; violations[x.path].descVio = 'short'; violations[x.path].descLen = x.len; });
r.titleLong.forEach(x => { violations[x.path] = violations[x.path] || {}; violations[x.path].titleVio = 'long'; violations[x.path].titleLen = x.len; });
r.titleShort.forEach(x => { violations[x.path] = violations[x.path] || {}; violations[x.path].titleVio = 'short'; violations[x.path].titleLen = x.len; });

let fixed = 0;
let stillOob = [];

for (const [htmlPath, vio] of Object.entries(violations)) {
  const mdInfo = getMarkdownPath(htmlPath);
  if (!mdInfo || !fs.existsSync(mdInfo.path)) continue;
  
  let content = fs.readFileSync(mdInfo.path, 'utf8');
  const origTitle = readMdField(content, 'title');
  const origDesc = readMdField(content, 'description');
  
  if (!origTitle && !origDesc) continue;
  
  // Extract body for h2s
  const fmEnd = (() => {
    const start = content.indexOf('---');
    return content.indexOf('---', start + 3) + 3;
  })();
  const body = content.substring(fmEnd).trim();
  const h2s = [...body.matchAll(/^##\s+(.*)/gm)].map(m => m[1].trim()).slice(0, 4);
  
  const titleCore = origTitle
    .replace(/\s*-\s*机场猫\s*$/, '')
    .replace(/：.*$/, '')
    .replace(/:.+$/, '')
    .trim();
  
  let newTitle = origTitle;
  let newDesc = origDesc;
  let changed = false;
  
  // Fix title
  if (vio.titleVio) {
    const currentLen = charLen(origTitle);
    if (currentLen > 30) {
      const suffix = ' - 机场猫';
      const maxCore = 30 - charLen(suffix);
      let core = origTitle.replace(/\s*-\s*机场猫\s*$/, '').trim();
      // Try to cut at '：'
      const colonIdx = core.lastIndexOf('：');
      if (colonIdx >= 12 && colonIdx <= maxCore) {
        core = core.substring(0, colonIdx);
      } else if (charLen(core) > maxCore) {
        core = Array.from(core).slice(0, maxCore).join('');
      }
      newTitle = core + suffix;
      const newLen = charLen(newTitle);
      if (newLen < 20) {
        // Pad - keep original until minimum is met
        newTitle = origTitle.replace(/\s*-\s*机场猫\s*$/, '').substring(0, 22) + ' - 机场猫';
      }
    } else if (currentLen < 20) {
      // Title too short - add context
      let core = origTitle.replace(/\s*-\s*机场猫\s*$/, '').trim();
      if (h2s.length > 0) {
        core = core + '：' + h2s[0].substring(0, 8);
      }
      newTitle = core + ' - 机场猫';
    }
    if (charLen(newTitle) >= 20 && charLen(newTitle) <= 30) {
      changed = true;
    } else {
      console.log('Title still OOB: ' + htmlPath + ' (' + charLen(newTitle) + '): ' + newTitle);
      newTitle = origTitle;
    }
  }
  
  // Fix description
  if (vio.descVio) {
    const currentLen = charLen(origDesc);
    if (currentLen > 80) {
      // Generate a new one based on content
      let candidate = generateDesc(titleCore, h2s, origDesc);
      candidate = trimToRange(candidate, 70, 80);
      
      if (charLen(candidate) < 70) {
        const pad = '，适合新手与进阶用户参考，助您解决日常使用问题。';
        candidate = candidate.replace(/[。！？]$/, '') + pad;
        candidate = trimToRange(candidate, 70, 80);
      }
      
      const newLen = charLen(candidate);
      if (newLen >= 70 && newLen <= 80) {
        newDesc = candidate;
        changed = true;
      } else {
        stillOob.push({ path: htmlPath, desc: candidate, len: newLen, type: 'long->rewrite' });
      }
    } else if (currentLen < 70) {
      // Extend
      let candidate = origDesc.replace(/[。！？]$/, '');
      const pads = [
        '，帮助您在日常代理网络使用中解决实际问题，提升连接稳定性与访问效率。',
        '，通过具体案例与操作指南帮您快速掌握相关技能，解决实际使用中的常见问题。',
        '，结合实际场景说明注意事项与常见误区，帮助您在使用代理和AI工具时做出正确判断。',
      ];
      for (const pad of pads) {
        const ext = candidate + pad;
        if (charLen(ext) >= 70 && charLen(ext) <= 80) {
          candidate = ext;
          break;
        } else if (charLen(ext) > 80) {
          candidate = trimToRange(candidate + pad, 70, 80);
          break;
        }
      }
      const newLen = charLen(candidate);
      if (newLen >= 70 && newLen <= 80) {
        newDesc = candidate;
        changed = true;
      } else {
        stillOob.push({ path: htmlPath, desc: candidate, len: newLen, type: 'short->extend' });
      }
    }
  }
  
  if (changed) {
    let newContent = content;
    if (newTitle !== origTitle) {
      newContent = writeMdField(newContent, 'title', newTitle);
    }
    if (newDesc !== origDesc) {
      newContent = writeMdField(newContent, 'description', newDesc);
    }
    if (newContent !== content) {
      fs.writeFileSync(mdInfo.path, newContent, 'utf8');
      fixed++;
    }
  }
}

console.log('Fixed:', fixed);
console.log('Still OOB:', stillOob.length);
if (stillOob.length > 0) {
  console.log('OOB samples:', JSON.stringify(stillOob.slice(0, 10), null, 2));
}
