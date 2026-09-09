const fs = require('fs');
const f = 'src/content/blog/ai-drama-04-character.md';
let c = fs.readFileSync(f, 'utf8');
const newDesc = 'AI短剧角色一致性教程：通过"角色小传"、参考图固定与前后一致性提示词，解决 AI 生成视频中不同场景主角"换脸"这一常见难题，让主角稳定出现。';
console.log('New desc len:', Array.from(newDesc).length);
c = c.replace(/^(description:\s*)["']?.*?["']?(\r?\n)/m, function(match, prefix, ending) {
  return prefix + '"' + newDesc + '"' + ending;
});
fs.writeFileSync(f, c, 'utf8');
console.log('Done');
