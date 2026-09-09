const fs = require('fs');
const pages = {
  'src/pages/disclaimer.astro': { title: '免责声明与内容使用说明：网站法律条款与免责规定 - 机场猫', desc: '机场猫免责声明：本网站提供的所有网络工具教程、代理客户端配置指南及机场测评信息仅供技术学习与交流参考，请用户务必遵守当地法律法规，切勿用于任何非法用途。' },
  'src/pages/methodology.astro': { title: '机场测评与测速标准说明：我们的数据采集与评判方法 - 机场猫', desc: '详细介绍机场猫如何进行机场节点测速、稳定性监控、流媒体解锁测试，以及我们保证评测客观中立的核心标准与数据采集方法。了解我们如何为您筛选优质代理。' },
  'src/pages/privacy.astro': { title: '隐私政策与数据保护声明：用户隐私协议与信息安全 - 机场猫', desc: '机场猫隐私政策声明：我们深知隐私安全对代理用户的重要性，承诺不会收集您的浏览记录，并详细说明网站Cookies及基础访问数据的用途，全方位保护您的隐私。' },
  'src/pages/tools.astro': { title: '在线网络诊断与排障工具箱：代理网络连通性测试 - 机场猫', desc: '机场猫为您提供一系列实用的在线网络诊断工具，帮助您快速检测节点连通性、本地DNS泄漏、IP真实归属地查询及代理网络常见故障排查，轻松解决网络断连问题。' },
  'src/pages/evaluations.astro': { title: '2026最新机场测评数据中心：多维度节点测速记录 - 机场猫', desc: '机场猫深度测评数据中心，汇集了各大机场的晚高峰测速、流媒体解锁记录与日常连通率分析。通过真实环境下的长期测试，为您提供最可靠的参考，挑选出适合的节点。' },
  'src/pages/guides.astro': { title: '代理网络与客户端知识库：从零开始配置专属节点 - 机场猫', desc: '机场猫专属代理知识库，涵盖各大平台客户端配置指南、网络协议科普、ChatGPT等AI工具使用技巧，帮助您从入门到精通网络配置，快速掌握科学的代理使用方法。' },
  'src/pages/index.astro': { title: '2026 机场推荐：稳定、靠谱、好用机场指南 - 机场猫', desc: '寻找2026年最新稳定机场？机场猫为您提供详细的节点测速、流媒体解锁分析与各平台代理客户端配置教程，助您挑选最适合的网络服务，轻松解决日常上网的所有痛点。' },
  'src/pages/resources.astro': { title: '代理软件资源库：开源客户端、分流规则与订阅转换 - 机场猫', desc: '机场猫官方资源下载站，提供 Windows、Mac、iOS、Android 全平台代理客户端下载指引、常用分流规则集与安全可靠的订阅转换工具。' },
  'src/pages/reviews.astro': { title: '2026机场推荐排行榜与服务评测：全方位深度对比 - 机场猫', desc: '2026年最新机场推荐排行榜，基于真实网络环境下的多维度测速与日常稳定性监控，为您深度测评各大品牌机场的性价比、线路质量与流媒体解锁能力，助您轻松选择。' },
  'src/pages/download/ios.astro': { title: 'iOS苹果代理客户端下载：美区账号与安装指南 - 机场猫', desc: '详细介绍如何在 iOS 设备上获取并安装 Shadowrocket、Quantumult X 等代理客户端，包含免责的美区 Apple ID 建议与配置方法。' },
  'src/pages/download/mac.astro': { title: 'Mac苹果电脑代理客户端下载：安装与订阅配置指南 - 机场猫', desc: '详细介绍如何在 macOS 苹果电脑上下载、安装 Clash Verge Rev 等主流代理客户端，包含完整的订阅导入与系统代理设置图文教程。' }
};

for (const [file, tdk] of Object.entries(pages)) {
  let c = fs.readFileSync(file, 'utf8');
  
  c = c.replace(/title=(["']?)[^"'\n>]+(["']?)/, 'title="' + tdk.title + '"');
  c = c.replace(/description=(["'\{]?)[^"'\n>\}]+(["'\}]?)/, 'description="' + tdk.desc + '"');
  
  fs.writeFileSync(file, c, 'utf8');
  
  console.log(file, 'Title:', Array.from(tdk.title).length, 'Desc:', Array.from(tdk.desc).length);
}
