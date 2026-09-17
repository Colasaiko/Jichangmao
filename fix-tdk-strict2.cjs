const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

const pages = {
  'shadowrocket-airport-recommendations.md': {
    title: '2026稳定Shadowrocket机场推荐 - 机场猫', // 28 chars
  },
  'v2rayn-airport-recommendations.md': {
    title: '2026好用v2rayN机场推荐：多端节点精选 - 机场猫', // 29 chars
    description: 'Windows用户在找Vmess或Vless节点？本文精选2026年优质v2rayN机场推荐，提供客户端兼容性分析与稳定服务商名单，满足全场景联网需求。' // 77 chars
  },
  'hiddify-airport-recommendations.md': {
    title: '2026适配Hiddify机场推荐：全端一键连接 - 机场猫', // 29 chars
  }
};

for (const [filename, meta] of Object.entries(pages)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  if (meta.title) content = content.replace(/^title:\s*".*?"/m, `title: "${meta.title}"`);
  if (meta.description) content = content.replace(/^description:\s*".*?"/m, `description: "${meta.description}"`);
  fs.writeFileSync(filePath, content, 'utf8');
}
