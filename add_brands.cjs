const fs = require('fs');

// Read real brand data from brands.json
const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf8'));

// Build brand lookup by id
const brandById = {};
brands.forEach(b => { brandById[b.id] = b; });

// Helper to get brand info
function brandInfo(id) {
  const b = brandById[id];
  if (!b) return null;
  return b;
}

// For each recommendation article, define which brands fit and why
const articles = [
  {
    file: 'src/content/blog/clash-airport-recommendations.md',
    sectionMarker: '- **查看完整排行榜 →** [2026机场推荐排行榜](/reviews/)\n\n筛选标准：',
    brandIds: ['weifeng', 'firefly', 'kuajie', 'sogo', 'u1s1', 'lingmao'],
    introText: `以下机场均提供标准 Clash YAML 订阅链接，支持 Clash Verge Rev / Clash Nyanpasu 一键导入：\n`,
    whyMap: {
      weifeng: '全IPLC专线，SS 协议，Clash 订阅兼容性极佳，不限设备数，晚高峰稳定',
      firefly: 'IPLC 专线，不限速，Clash 订阅兼容，节点数量丰富',
      kuajie: 'IPLC 高端线路，所有节点 x1 倍率，Clash/Shadowrocket 全兼容，不限设备',
      sogo: 'VLESS 协议 + 企业级 IEPL 专线，Clash Meta 内核完整支持 VLESS，三网优化',
      u1s1: 'BGP+IEPL 专线出口，SS 协议，Clash 全平台兼容，不限设备数',
      lingmao: '全IPLC专线，不限速，Clash 订阅兼容，全天客服支持',
    },
  },
  {
    file: 'src/content/blog/shadowrocket-airport-recommendations.md',
    sectionMarker: '- **查看完整排行榜 →** [2026机场推荐排行榜](/reviews/)\n\n筛选标准：',
    brandIds: ['weifeng', 'lingmao', 'wuyou', 'shanyue', 'weitu', 'feimao'],
    introText: `以下机场提供 SS / Trojan / Hysteria2 协议节点，可直接在 Shadowrocket 中导入使用：\n`,
    whyMap: {
      weifeng: '全IPLC专线，SS 协议，Shadowrocket 直接导入，不限设备数，支持香港/日本/美国节点',
      lingmao: '全IPLC专线，原生 IP 解锁 Netflix/Disney+/ChatGPT，Shadowrocket 兼容',
      wuyou: '纯IPLC专线，稳定全球 AI 支持，4K 流畅观影，Shadowrocket 兼容',
      shanyue: '全IPLC专线，原生 IP 解锁流媒体，解锁 ChatGPT/TikTok，SS 协议',
      weitu: 'IPLC + VLESS 协议，Shadowrocket 支持 VLESS，不限速不限设备',
      feimao: '全IPLC专线，最高 2.5Gbps，原生 IP，Shadowrocket 兼容，全球节点覆盖',
    },
  },
  {
    file: 'src/content/blog/cheap-airport-recommendations.md',
    sectionMarker: '- **查看完整排行榜 →** [2026机场推荐排行榜](/reviews/)\n- **专线版本 →** [专线机场推荐：IPLC/IEPL机场整理](/blog/dedicated-line-airport-recommendations/)',
    brandIds: ['jilian', 'guangnian', 'guangsu', 'edge', 'kexin', 'sujie'],
    introText: `以下机场月均起步价格较低，支持月付试用，适合预算有限或首次购买的用户：\n`,
    whyMap: {
      jilian: '月付起步约 ¥18，全IPLC专线，2.5Gbps 速率，支持月付试用，性价比高',
      guangnian: '月付起步约 ¥18，全程IPLC专线，原生IP解锁，支持月付，预算控制方便',
      guangsu: '月付起步约 ¥23，全球IPLC，单节点 2.5Gbps，解锁 Netflix/ChatGPT',
      edge: '月付起步约 ¥25，有 ¥15 月付小包试用，全IPLC专线，性价比突出',
      kexin: '有 ¥15/月 月付小包，全IEPL专线，不限设备，适合轻度用户',
      sujie: '有 ¥15/月 单月试用包，全IPLC专线，适合先试用再决定是否续费',
    },
  },
  {
    file: 'src/content/blog/pay-as-you-go-airport.md',
    sectionMarker: '- **完整机场排行榜 →** [2026机场推荐排行榜](/reviews/)\n- **学生党低价选择 →** [便宜机场推荐](/blog/cheap-airport-recommendations/)',
    brandIds: ['weifeng', 'lingmao', 'weitu', 'yifan'],
    introText: `以下机场提供不限时流量包或类按量计费套餐，适合低频用户：\n`,
    whyMap: {
      weifeng: '提供「信风·不限时 270GB ¥200」和「长风·不限时 570GB ¥370」一次性流量包，全IPLC专线，流量不过期',
      lingmao: '有月付/季付/年付灵活组合，且流量重置规则清晰，适合按需购买的用户',
      weitu: '提供「永久不限时 100GB ¥100」和「永久不限时 500GB ¥340」买断型套餐，全IPLC+VLESS',
      yifan: '提供「轻享版不限时包 100GB ¥100」「舒享版不限时包 250GB ¥200」「尊享版 500GB ¥400」不限时套餐',
    },
  },
  {
    file: 'src/content/blog/dedicated-line-airport-recommendations.md',
    sectionMarker: '- **查看完整排行榜 →** [2026机场推荐排行榜](/reviews/)\n\n筛选标准：',
    brandIds: ['weifeng', 'kuajie', 'lingmao', 'feimao', 'xingdao', 'jilian'],
    introText: `以下机场全部提供 IPLC 或 IEPL 物理专线节点，适合对晚高峰稳定性有高要求的用户：\n`,
    whyMap: {
      weifeng: '全IPLC专线，不限设备，不限速，节点速率 x1，低延迟高速率，适合重度用户',
      kuajie: 'IPLC 高端线路，所有节点 x1 倍率，不限设备，解锁 Netflix/ChatGPT/Claude',
      lingmao: '全IPLC专线，不限速，带宽可达 1000Mbps，原生IP解锁流媒体和 ChatGPT',
      feimao: '全IPLC专线，最高 2.5Gbps，原生 IP，香港×20/台湾×10/日本×10/美国×10',
      xingdao: '全IEPL专线，低延迟，单节点峰值 2.5Gbps，解锁 Netflix/Disney+/ChatGPT/TikTok',
      jilian: '全IPLC专线，最大 2.5Gbps 速率，原生 IP，解锁各大流媒体和 ChatGPT/TikTok',
    },
  },
  {
    file: 'src/content/blog/chatgpt-airport-recommendations.md',
    sectionMarker: '- **查看完整排行榜 →** [2026机场推荐排行榜](/reviews/)\n\n每个品牌的测评页面都包含',
    brandIds: ['lingmao', 'kuajie', 'shanyue', 'feimao', 'weitu', 'xingdao'],
    introText: `以下机场明确标注原生 IP 解锁 ChatGPT/Claude，适合需要访问 AI 服务的用户：\n`,
    whyMap: {
      lingmao: '原生IP解锁 ChatGPT、Gemini、TikTok，全IPLC专线，IP 质量有保障',
      kuajie: '支持 ChatGPT、Gemini、Claude 等 AI，IPLC 高端线路，原生 IP 节点',
      shanyue: '全IPLC专线，原生IP解锁流媒体，明确解锁 ChatGPT/TikTok',
      feimao: '全IPLC，原生 IP 线路，解锁 Netflix/Disney+/ChatGPT/TikTok，香港×20/日本×10',
      weitu: '全IPLC+VLESS，原生IP解锁 Netflix/HBO/Disney+，解锁 ChatGPT/TikTok',
      xingdao: '全IEPL专线，原生 IP，支持 Netflix/Disney+/ChatGPT/TikTok，多设备不限量',
    },
  },
  {
    file: 'src/content/blog/v2rayn-airport-recommendations.md',
    sectionMarker: '- **查看完整排行榜 →** [2026机场推荐排行榜](/reviews/)\n\n筛选标准：',
    brandIds: ['weitu', 'sogo', 'kuajie', 'jilian', 'weifeng', 'u1s1'],
    introText: `以下机场提供 VMess/VLESS/SS 等 v2ray 系列协议节点，兼容 v2rayN（Windows）和 v2rayNG（Android）：\n`,
    whyMap: {
      weitu: 'VLESS 协议 + 全IPLC专线，直接兼容 v2rayN/v2rayNG，不限速不限设备',
      sogo: 'VLESS 协议 + 企业级 IEPL 专线，v2rayN Meta 内核完整支持，三网优化',
      kuajie: '全IPLC高端线路，SS 协议兼容 v2rayN，所有节点 x1 倍率，不限设备',
      jilian: '全IPLC专线，2.5Gbps 速率，SS 协议兼容 v2rayN，原生 IP',
      weifeng: '全IPLC专线，SS 协议，v2rayN/v2rayNG 兼容性极好，低延迟，不限设备',
      u1s1: 'BGP+IEPL，SS 协议，v2rayN 全平台兼容，ChatGPT/Claude AI 支持',
    },
  },
  {
    file: 'src/content/blog/ladder-recommendations.md',
    sectionMarker: '- **查看完整排行榜 →** [2026机场推荐排行榜](/reviews/)\n- **了解 [Clash机场推荐]',
    brandIds: ['weifeng', 'kuajie', 'jilian', 'sujie', 'kexin'],
    introText: `以下是目前机场猫收录的、适合不同需求的"梯子"（机场+客户端）推荐组合：\n`,
    whyMap: {
      weifeng: '老牌全IPLC专线机场，月付 ¥11 起，有 7 折优惠码，适合重度日常用户',
      kuajie: '高端IPLC线路，月付 ¥20 起，解锁 Netflix/ChatGPT/Claude，适合多设备家庭使用',
      jilian: '性价比IPLC专线，月付 ¥18 起，有 8 折优惠码，适合日常使用的进阶用户',
      sujie: '有 ¥15 月付小包可试用，IPLC 专线，适合新手先小额试用再决定',
      kexin: '有 ¥15 月付小包，IEPL 专线，不限设备，适合预算有限的轻度用户',
    },
  },
];

function buildBrandSection(article) {
  const { brandIds, introText, whyMap } = article;
  let section = '\n' + introText + '\n';
  
  brandIds.forEach((id, i) => {
    const b = brandById[id];
    if (!b) return;
    const evalLink = `/evaluations/review-${id}/`;
    // Check if eval page exists
    const evalExists = fs.existsSync(`src/content/evaluations/review-${id}.md`);
    
    section += `### ${i+1}. ${b.name}\n`;
    section += `- **线路类型**：${b.tags.join('、')}\n`;
    section += `- **月付起步**：¥${b.price}\n`;
    section += `- **协议支持**：${b.protocol}\n`;
    section += `- **为什么适合**：${whyMap[id] || b.desc}\n`;
    if (evalExists) {
      section += `- **详细测评**：[${b.name}测评](/evaluations/review-${id}/)\n`;
    }
    section += `- **官网注册**：[${b.name} 官网（含优惠链接）](${b.url})\n\n`;
  });
  
  return section;
}

// Check which eval pages exist
const evalDir = 'src/content/evaluations';
let evalFiles = [];
try { evalFiles = fs.readdirSync(evalDir); } catch(e) {}

// Now patch each article
articles.forEach(art => {
  const fp = art.file;
  if (!fs.existsSync(fp)) { console.log('[SKIP NOT FOUND] ' + fp); return; }
  
  let content = fs.readFileSync(fp, 'utf8');
  const marker = art.sectionMarker;
  
  if (!content.includes(marker)) {
    console.log('[MARKER NOT FOUND] ' + fp);
    console.log('  Looking for: ' + marker.substring(0, 60));
    return;
  }
  
  const brandSection = buildBrandSection(art);
  // Insert the brand section BEFORE the marker
  content = content.replace(marker, brandSection + '\n' + marker);
  
  fs.writeFileSync(fp, content, 'utf8');
  console.log('[UPDATED] ' + fp + ' - added ' + art.brandIds.length + ' brands');
});

console.log('\nDone updating recommendation articles.');
