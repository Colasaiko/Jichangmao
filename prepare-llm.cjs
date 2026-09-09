const fs = require('fs');
const path = require('path');

const mdFiles = JSON.parse(fs.readFileSync('violated_mds.json', 'utf8'));

let payload = {};

mdFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // extract frontmatter
  const fmMatch = content.match(/^(?:\uFEFF)?---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.log('No frontmatter match for', file);
    return;
  }
  const fm = fmMatch[1];
  
  let title = '', desc = '', category = '', tags = '';
  const tMatch = fm.match(/^title:\s*["']?(.*?)["']?$/m);
  if (tMatch) title = tMatch[1];
  const dMatch = fm.match(/^description:\s*["']?(.*?)["']?$/m);
  if (dMatch) desc = dMatch[1];
  const cMatch = fm.match(/^category:\s*["']?(.*?)["']?$/m);
  if (cMatch) category = cMatch[1];
  const tagsMatch = fm.match(/^tags:\s*\[(.*?)\]/m);
  if (tagsMatch) tags = tagsMatch[1];
  
  // extract body
  const body = content.replace(/^(?:\uFEFF)?---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
  const firstPara = (body.match(/^[^\#\n].+$/m) || [''])[0].trim().substring(0, 100);
  
  const headers = [...body.matchAll(/^##\s+(.*)/gm)].map(m => m[1]).slice(0, 3).join(' | ');
  
  payload[file] = {
    originalTitle: title,
    originalDesc: desc,
    category,
    tags,
    firstPara,
    headers
  };
});

fs.writeFileSync('payload_for_llm.json', JSON.stringify(payload, null, 2), 'utf8');
console.log('Payload generated for', Object.keys(payload).length, 'files.');
