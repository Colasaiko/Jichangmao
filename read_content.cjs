const fs = require('fs');
const path = require('path');

// Read all files and extract first 600 chars of body (after frontmatter)
const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

// List all duplicate-title groups we need to fix
const targetFiles = [
  // "基本概念" group - adv-01 to adv-23, guide-01 to guide-20, tools-01 to tools-04
  // "网络专线" group - ai-drama-*, ai-network-*, etc  
  // "一、这个功能" group - copilot-*, etc.
  // others
];

// Print first 500 chars of body for specific files to understand content
const checkFiles = [
  'adv-01.md','adv-02.md','adv-03.md','adv-10.md','adv-15.md','adv-17.md',
  'guide-01.md','guide-05.md','guide-10.md','guide-16.md','guide-20.md',
  'tools-01.md','tools-02.md','tools-03.md','tools-04.md','tools-05.md',
  'ai-drama-02-workflow.md','ai-drama-03-script.md',
  'copilot-agents.md','copilot-how-to-use.md',
  'ai-network-08-routing-issue.md','ai-network-22-packet-loss.md',
  'shadowrocket-guide.md','v2rayng-guide.md',
  'ai-tools-01-chatgpt.md','ai-tools-04-chatgpt-what-is-it.md'
];

checkFiles.forEach(f => {
  const fullPath = path.join(dir, f);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  // Extract body after frontmatter
  const bodyStart = content.indexOf('---', 3);
  const body = content.substring(bodyStart + 3).trim().substring(0, 500);
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const h2Match = body.match(/##\s+(.+)/);
  console.log('=== ' + f + ' ===');
  console.log('Current title: ' + (titleMatch ? titleMatch[1] : 'N/A'));
  console.log('First H2: ' + (h2Match ? h2Match[1] : 'N/A'));
  console.log('Body snippet: ' + body.replace(/\n/g,' ').substring(0,300));
  console.log('');
});
