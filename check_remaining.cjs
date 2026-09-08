const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

// Read the remaining duplicate groups:
// [7x] adv：2026最新教程与指南 = adv-17 to adv-19 range
// [4x] 一、这个功能（问题）解析 = copilot-connection-issues, grok-connection-issues, perplexity-connection-issues
// [3x] tools：2026最新教程与指南 = tools-05, tools-20, tools-22 (already in FIXES but check adv-17,18,19 which got different template)

const check = [
  'adv-17.md','adv-18.md','adv-19.md','adv-20.md',
  'copilot-connection-issues.md','grok-connection-issues.md','perplexity-connection-issues.md',
  'grok-how-to-use.md','grok-deep-search.md','tools-13.md','tools-14.md','tools-15.md',
  'tools-16.md','tools-17.md','tools-18.md','tools-19.md',
  'adv-24.md','adv-25.md','adv-26.md','adv-27.md','adv-28.md',
];
check.forEach(f => {
  const fp = path.join(dir, f);
  if (!fs.existsSync(fp)) { console.log('NOT FOUND: ' + f); return; }
  const c = fs.readFileSync(fp, 'utf8');
  const titleMatch = c.match(/title:\s*["']([^"']+)["']/);
  const body = c.substring(c.indexOf('---',3)+3).trim().substring(0,200).replace(/\n/g,' ').replace(/\r/g,' ');
  console.log(f + ': [' + (titleMatch?titleMatch[1]:'?') + '] => ' + body);
  console.log('');
});
