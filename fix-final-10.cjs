const fs = require('fs');

function charLen(s) { return Array.from(String(s)).length; }

function writeDesc(mdPath, newDesc) {
  let content = fs.readFileSync(mdPath, 'utf8');
  const regex = /^(description:\s*)"[\s\S]*?"(?=\r?\n(?!\s))/m;
  let newContent = content.replace(regex, '$1"' + newDesc + '"');
  if (newContent !== content) {
    fs.writeFileSync(mdPath, newContent, 'utf8');
    return true;
  }
  const regex2 = /^(description:\s*)'[\s\S]*?'(?=\r?\n(?!\s))/m;
  newContent = content.replace(regex2, '$1"' + newDesc + '"');
  if (newContent !== content) {
    fs.writeFileSync(mdPath, newContent, 'utf8');
    return true;
  }
  const regex3 = /^(description:\s*)([^\r\n"']+)(\r?\n)/m;
  newContent = content.replace(regex3, '$1"' + newDesc + '"$3');
  fs.writeFileSync(mdPath, newContent, 'utf8');
  return true;
}

const fixes = {
  'src/content/blog/adv-12.md': 'CMI（中国移动国际，AS58453）是连接亚太地区最重要骨干网之一，本文解析其香港节点布局优势及对代理线路速度与稳定性的实际影响，供机场选购参考。',
  'src/content/blog/adv-26.md': '解释为何测速结果亮眼但实际体验依然较差：主流测速工具测量多线程并发峰值，而游戏和视频等真实场景关注的是单线程延迟与抖动，两者评价维度不同。',
  'src/content/blog/adv-27.md': '讲解如何通过持续 Ping 与 MTR 路由追踪在高峰期测量丢包率和延迟抖动，从而得出一条代理线路在实际使用中的真实稳定性评分，而非只看峰值带宽数据。',
  'src/content/blog/ai-tools-29-chatgpt-outline.md': '介绍如何用 ChatGPT 生成文章、报告或演讲的逻辑大纲：提供主题和要求后让 AI 快速建立清晰的层级结构，作为内容创作的起点，从而减少思路整理时间。',
  'src/content/blog/ai-tools-62-chatgpt-revise.md': '介绍向 ChatGPT 给出精准修改反馈的技巧：清晰指出具体问题点（语气、结构、内容准确性）让 AI 进行局部调整，而非模糊说"改好一点"，提升效率。',
  'src/content/blog/ai-tools-76-claude-image-error.md': '分析 Claude 图片识别出现错误（视觉幻觉）的典型场景：解释复杂图片信息密度高时为何容易识别偏差，以及如何通过追问与核对方法减少误读风险。',
  'src/content/blog/ai-drama-12-tool-jimeng.md': '本文介绍即梦 AI 的核心功能与使用技巧，涵盖图片和视频生成操作、创作建议与常见报错处理，帮助零基础用户快速上手这款由字节跳动推出的 AI 创作工具。',
  'src/content/blog/ai-video-15.md': '本文介绍 AI 视频画面质感提升核心技巧，涵盖打光提示词设计与胶片纹理词汇运用方法，帮您生成更具电影质感的画面，从根本上改善 AI 视频的视觉观感。'
};

// adv-26 is 69 chars, need exactly 70-80. Let me check and adjust:
// "解释为何测速结果亮眼但实际体验依然较差：主流测速工具测量多线程并发峰值，而游戏和视频等真实场景关注的是单线程延迟与抖动，两者评价维度不同。" = 69 chars
// Add one more char:
fixes['src/content/blog/adv-26.md'] = '解释为何测速结果亮眼但实际体验依然较差：主流测速工具测量多线程并发峰值，而游戏和视频等真实场景更关注单线程延迟与抖动，两者评价维度完全不同。';
console.log('adv-26 len:', charLen(fixes['src/content/blog/adv-26.md']));

let fixed = 0;
for (const [path, desc] of Object.entries(fixes)) {
  const len = charLen(desc);
  if (len < 70 || len > 80) {
    console.log('STILL OOB:', path, len, desc);
    continue;
  }
  writeDesc(path, desc);
  console.log('Fixed:', path, len);
  fixed++;
}
console.log('Total fixed:', fixed);
