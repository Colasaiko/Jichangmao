const fs = require('fs');
const walk = (d, l = []) => {
  if (!fs.existsSync(d)) return l;
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) walk(p, l);
    else if (p.endsWith('.md')) l.push(p);
  }
  return l;
};
let fixed = 0;
walk('src/content/blog').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  c = c.replace(/^description:\s*'(.*?)'$/gm, (match, inner) => {
    if (inner.includes("'")) {
      changed = true;
      return 'description: "' + inner.replace(/"/g, '\\"') + '"';
    }
    return match;
  });
  
  // also check if the fix-tdk appended the old description to the new one!
  // In adv-08, we saw: '本文详细探讨...解决常见使用问题。'专线'的技术定义...'
  // The original regex was: fm = fm.replace(/description:\s*['"]?([^'"\n]+)['"]?/, `description: '${newDesc}'`);
  // Because the original description had quotes INSIDE it, the regex `([^'"\n]+)` stopped early!
  // So it left the trailing part of the old description!
  c = c.replace(/^description:\s*["']([^"'\n]+)['"]?.*?$/gm, (match, inner) => {
    // We will just strictly extract the description line and replace it entirely using yaml rules
    return match;
  });

  if (changed) {
    fs.writeFileSync(f, c, 'utf8');
    fixed++;
  }
});

// A better way: just replace any `description: ...` line that has malformed quotes.
walk('src/content/blog').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  let changed = false;
  for(let i=0; i<lines.length; i++) {
     if(lines[i].startsWith('description:')) {
         // if it ends with single quote but has single quotes in middle
         let content = lines[i].substring(12).trim();
         if(content.startsWith("'") && content.substring(1).includes("'") && !content.endsWith("'")) {
             // it's malformed like: description: 'newDesc'old desc trailing
             // Let's just fix it by keeping only the valid string
             let match = content.match(/^'([^']*)'/);
             if(match) {
                 lines[i] = `description: "${match[1]}"`;
                 changed = true;
             }
         } else if (content.startsWith("'") && content.endsWith("'")) {
             let inner = content.substring(1, content.length-1);
             if (inner.includes("'")) {
                 lines[i] = `description: "${inner.replace(/"/g, '\\"')}"`;
                 changed = true;
             }
         }
     }
  }
  if (changed) {
    fs.writeFileSync(f, lines.join('\n'), 'utf8');
    fixed++;
  }
});

console.log('Fixed:', fixed);
