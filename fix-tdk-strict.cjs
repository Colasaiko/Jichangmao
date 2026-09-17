const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';

const pages = {
  'dedicated-line-airport-recommendations.md': {
    title: '2026专线机场推荐：高优线路选购指南 - 机场猫', // 2026(4) + 专线机场推荐：(7) + 高优线路选购指南(8) +  - 机场猫(6) = 25
    description: '寻找极低延迟的专线服务？本文为您精选2026年优质专线机场推荐，解析IPLC在游戏加速和解锁流媒体中的优势，帮您买到真正好用的跨境网络。', // 寻找极低延迟的专线服务？(12) + 本文为您精选2026年优质专线机场推荐，(19) + 解析IPLC在游戏加速和解锁流媒体中的优势，(21) + 帮您买到真正好用的跨境网络。(14) = 66 -> too short! Must be 70~80!
    // Let's refine description lengths.
  }
};

// Let's define the precise replacements
const replacements = {
  'dedicated-line-airport-recommendations.md': {
    title: '2026专线机场推荐：IPLC线路选购指南 - 机场猫', // 28 chars
    description: '寻找极低延迟的专线服务？本文为您精选2026年优质专线机场推荐，解析IPLC在游戏加速和全区流媒体解锁中的绝对优势，帮您买到真正好用且不卡的跨境网络。' // 75 chars
  },
  'clash-airport-recommendations.md': {
    title: '2026好用的Clash机场推荐：节点一键导入 - 机场猫', // 29 chars
    description: '还在寻找高兼容性的订阅链接？本文为您精选2026年好用的Clash机场推荐，提供各大品牌协议适配详情，助您在电脑和手机端轻松完成一键导入，畅享高速网络。' // 76 chars
  },
  'chatgpt-airport-recommendations.md': {
    title: '2026支持ChatGPT机场推荐：稳定防封 - 机场猫', // 28 chars
    description: '频繁遭遇风控或拒绝访问？本文汇总了2026年支持ChatGPT机场推荐名单，结合原生IP鉴定与连通性测试，为您筛选出适合AI工具长期稳定使用的优质节点网络。' // 78 chars
  },
  'netflix-airport-recommendations.md': {
    title: '2026奈飞Netflix机场推荐：原生解锁指南 - 机场猫', // 30 chars
    description: '想要观看无缓冲高清剧集？本文精选2026年稳定Netflix机场推荐名单，全面剖析原生IP解锁原理与各节点带宽实力，助您告别流媒体限制，轻松享受4K画质。' // 76 chars
  },
  'native-ip-airport-recommendations.md': {
    title: '2026原生IP机场推荐：住宅节点防风控指南 - 机场猫', // 28 chars
    description: '跨国运营不可或缺的防封利器。本文整理2026年优质原生IP机场推荐名单，深度区分机房广播与真实住宅节点，助您在社媒营销和电商运营中有效避免风控。' // 73 chars
  },
  'shadowrocket-airport-recommendations.md': {
    title: '2026小火箭Shadowrocket机场推荐指南 - 机场猫', // 30 chars
    description: 'iOS用户必备的科学上网手册。本文为您精选2026年好用且适配Shadowrocket机场推荐，提供详尽订阅导入与配置建议，让苹果设备全协议高速联网不再困难。' // 79 chars
  },
  'v2rayn-airport-recommendations.md': {
    title: '2026好用v2rayN机场推荐：Windows精选 - 机场猫', // 30 chars
    description: 'Windows用户正在寻找Vmess或Vless节点？本文精选2026年优质v2rayN机场推荐，提供详细的客户端兼容性分析与稳定服务商名单，满足您的全场景需求。' // 79 chars
  },
  'sing-box-airport-recommendations.md': {
    title: '2026优质sing-box机场推荐：新一代核心 - 机场猫', // 30 chars
    description: '追求极致轻量化与多协议支持？本文整理了完美兼容2026年新型sing-box机场推荐名单，详细解析其底层优势与极客配置方案，帮您打造极速稳定的网络环境。' // 76 chars
  },
  'quantumult-x-airport-recommendations.md': {
    title: '2026适用Quantumult X机场推荐指南 - 机场猫', // 29 chars
    description: '专为高阶圈X玩家打造。本文精选了2026年深度适配Quantumult X机场推荐，详细介绍多策略组分流技巧与稳定订阅来源，显著提升您的日常移动端上网体验。' // 78 chars
  },
  'hiddify-airport-recommendations.md': {
    title: '2026适配Hiddify机场推荐：跨平台一键连接 - 机场猫', // 30 chars
    description: '体验真正开箱即用的新一代代理工具。本文盘点了2026年支持Hiddify机场推荐服务商，通过简洁订阅与智能路由策略，助您在电脑及手机端轻松实现高速漫游。' // 76 chars
  }
};

for (const [filename, meta] of Object.entries(replacements)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Title
  content = content.replace(/^title:\s*".*?"/m, `title: "${meta.title}"`);
  
  // Fix Description
  content = content.replace(/^description:\s*".*?"/m, `description: "${meta.description}"`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Rewrote TDK for: ${filename} (Title: ${meta.title.length}, Desc: ${meta.description.length})`);
}

