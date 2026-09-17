const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';

const pages = {
  'cheap-airport-recommendations.md': {
    title: '2026年便宜机场推荐：高性价比与低价套餐盘点 - 机场猫',
    description: '寻找便宜又好用的网络服务？本文为您盘点2026年高性价比便宜机场推荐，通过对比各家月付价格、线路类型与流量额度，帮助学生党与轻度用户挑选最划算的低价套餐。',
    uniqueModule: `## 为什么强调真实月付价格？\n\n许多服务商在宣传时会打出“低至 X 元”的口号，但这往往是建立在一次性购买三年或更长时间的基础之上。本站的**便宜机场推荐**严格区分了真实的“单月付价格”与“年付折算价格”，建议您在未充分信任品牌前，优先选择月付方案。`,
  },
  'dedicated-line-airport-recommendations.md': {
    title: '2026专线机场推荐：IPLC与IEPL高速线路解析 - 机场猫',
    description: '追求极低延迟与稳定晚高峰？本文整理了2026年高质量专线机场推荐名单，详细解析 IPLC 与 IEPL 专线在游戏加速和流媒体解锁中的实际优势与官方线路配置。',
    uniqueModule: `## IPLC / IEPL 与普通中转的区别\n\n- **普通中转**：通过国内服务器中转流量到海外，受公网波动影响大。\n- **IPLC/IEPL专线**：物理级别的跨境专线，端到端不过墙，延迟极低，晚高峰几乎不受拥堵影响，是最适合游戏与外贸的线路。本站整理的专线机场均基于各品牌官方公开的线路配置资料。`,
  },
  'clash-airport-recommendations.md': {
    title: '2026好用的Clash机场推荐：订阅与节点一键导入 - 机场猫',
    description: '使用 Clash 客户端但不知道如何挑选节点？本文为您精选兼容性强的 Clash 机场推荐，涵盖 Verge 等主流版本，提供一键导入订阅的方法与各品牌协议兼容矩阵。',
    uniqueModule: `## 协议与客户端兼容矩阵\n\n现代 Clash 客户端（如 Clash Verge Rev）支持包括 SS、Trojan、Vmess、Vless 等多种协议。选择 Clash 机场时，请确保服务商的“一键订阅”功能与您的客户端版本完全适配，部分新协议可能需要更新客户端核心。`,
  },
  'chatgpt-airport-recommendations.md': {
    title: '2026支持ChatGPT机场推荐：AI工具稳定解锁指南 - 机场猫',
    description: '经常遇到 ChatGPT 封号或拒绝访问提示？本文整理了2026年原生IP与高质量 ChatGPT 机场推荐名单，结合官方声明为您分类梳理各大 AI 工具的网络解锁情况。',
    uniqueModule: `## AI 解锁支持等级分类\n\n为确保您的账号安全，本站将 AI 解锁支持划分为以下等级：\n1. **本站近期测试通过**：在近期测试中可顺利连通 ChatGPT / Claude 等严格风控工具。\n2. **官方明确提供解锁服务**：商家在公告或特性列表中承诺原生支持。\n3. **暂无独立验证**：新上线或未经过长期大流量测试的节点。`,
  },
  'netflix-airport-recommendations.md': {
    title: '2026流畅Netflix机场推荐：流媒体全解锁指南 - 机场猫',
    description: '想看奈飞但提示所在地区不可用？本文为您精选2026年高质量 Netflix 机场推荐，详细解析流媒体原生解锁与线路速度的区别，助您享受 4K 高清且无缓冲的观影体验。',
    uniqueModule: `## 路线速度 vs 流媒体解锁\n\n能够打开 Netflix 不代表能流畅观看 4K 视频。**流媒体解锁**依赖于节点 IP 是否被识别为家宽或原生；而**加载速度**则完全取决于机场的国际出口带宽。本推荐名单综合了官方公开的解锁区域说明与账面带宽配置。`,
  },
  'native-ip-airport-recommendations.md': {
    title: '2026高质量原生IP机场推荐：住宅节点与风控解析 - 机场猫',
    description: '跨境电商与海外运营必备？本文整理了2026年提供优质原生 IP 机场推荐名单，为您详细解析住宅 IP 与机房广播 IP 的区别，以及如何避免账号被风控或限制访问。',
    uniqueModule: `## 警惕伪原生 IP（WHOIS 欺骗）\n\n许多通过 IP 数据库查询显示为“原生”的 IP，实际上是商家通过更改 WHOIS 注册信息广播到当地的机房 IP。真正的原生住宅 IP 成本高昂，通常只有高端套餐才会提供。本页数据来源于品牌官方公开资料与常见库查询结果。`,
  },
  'shadowrocket-airport-recommendations.md': {
    title: '2026稳定Shadowrocket机场推荐：小火箭节点指南 - 机场猫',
    description: 'iOS 用户寻找好用的小火箭节点？本文精选2026年稳定 Shadowrocket 机场推荐，提供一键导入订阅教程与套餐解析，让您在 iPhone 上轻松实现全协议高速上网。',
    uniqueModule: ``,
  },
  'v2rayn-airport-recommendations.md': {
    title: '2026好用v2rayN机场推荐：Windows与安卓节点精选 - 机场猫',
    description: '还在寻找兼容 Vmess 与 Vless 的节点？本文整理了2026年稳定 v2rayN 机场推荐，为 Windows 与 v2rayNG 安卓用户提供详细的客户端适配方案与优质服务商名单。',
    uniqueModule: ``,
  },
  'ladder-recommendations.md': {
    title: '2026年靠谱梯子推荐：全平台高速翻墙工具指南 - 机场猫',
    description: '苦于寻找靠谱且好用的网络工具？本文为您汇总2026年各具特色的优质梯子推荐，从全平台客户端支持、网络协议到安全稳定性进行深度解析，助您挑选最适合的服务商。',
    uniqueModule: ``,
  },
  'sing-box-airport-recommendations.md': {
    title: '2026优质sing-box机场推荐：全协议兼容节点指南 - 机场猫',
    description: '喜欢轻量且高效的代理核心？本文为您整理了支持生成2026年最新 sing-box 机场推荐订阅的服务商，深度解析其多协议兼容性，帮助极客玩家与进阶用户快速完成配置。',
    uniqueModule: ``,
  },
  'quantumult-x-airport-recommendations.md': {
    title: '2026适用Quantumult X机场推荐：圈X节点订阅指南 - 机场猫',
    description: '作为 iOS 圈内的高阶玩家，如何挑选优质节点？本文精选了2026年完美适配 Quantumult X 机场推荐名单，提供丰富的策略组分流建议与高效订阅导入方案，提升上网体验。',
    uniqueModule: ``,
  },
  'hiddify-airport-recommendations.md': {
    title: '2026适配Hiddify机场推荐：跨平台新型客户端指南 - 机场猫',
    description: '想要体验开箱即用的跨平台代理？本文盘点了2026年支持 Hiddify 机场推荐名单，详细解析这款基于 sing-box 核心的新兴客户端优势，让您轻松导入订阅并实现全端漫游。',
    uniqueModule: ``,
  }
};

for (const [filename, meta] of Object.entries(pages)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Title
  content = content.replace(/^title:\s*".*?"/m, `title: "${meta.title}"`);
  
  // Fix Description
  content = content.replace(/^description:\s*".*?"/m, `description: "${meta.description}"`);

  // Fix dates if updatedDate < pubDate
  let pubDateMatch = content.match(/^pubDate:\s*(.*?)$/m);
  let upDateMatch = content.match(/^updatedDate:\s*(.*?)$/m);
  
  if (pubDateMatch && upDateMatch) {
    let pubStr = pubDateMatch[1].replace(/['"]/g, '').trim();
    let upStr = upDateMatch[1].replace(/['"]/g, '').trim();
    let pub = new Date(pubStr);
    let up = new Date(upStr);
    
    if (!isNaN(pub.getTime()) && !isNaN(up.getTime())) {
      if (up < pub) {
        // Fix updatedDate to match pubDate
        content = content.replace(/^updatedDate:\s*.*?$/m, `updatedDate: ${pubStr}`);
      }
    }
  }

  // Inject unique module before the first <h2> or <h3>
  if (meta.uniqueModule) {
    if (!content.includes(meta.uniqueModule.split('\\n')[0])) {
      const headingMatch = content.match(/^##\s/m);
      if (headingMatch) {
        const idx = content.indexOf(headingMatch[0]);
        content = content.slice(0, idx) + meta.uniqueModule + '\n\n' + content.slice(idx);
      }
    }
  }

  // Clean pseudo testing phrases
  content = content.replace(/实测精选/g, "精选分析");
  content = content.replace(/经过我们的实测/g, "根据品牌公开资料显示");
  content = content.replace(/晚高峰实测/g, "晚高峰表现评估");
  content = content.replace(/最稳定/g, "优质");
  content = content.replace(/绝对稳定/g, "相对稳定");
  content = content.replace(/完美解锁/g, "提供流媒体解锁支持");
  content = content.replace(/秒开/g, "流畅加载");
  content = content.replace(/经过我们本站测试/g, "根据官方宣称");

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${filename}`);
}

