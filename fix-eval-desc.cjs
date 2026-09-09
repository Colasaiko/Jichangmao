const fs = require('fs');

// Each brand, with how many extra chars the brand name adds
const brands = {
  'review-ermao': '二猫云',      // 3
  'review-feimao': '飞猫云',     // 3
  'review-flyv': '飞V',          // 2
  'review-guangnian': '光年云',  // 3
  'review-guangsu': '光速云',    // 3
  'review-jilian': '极连云',     // 3
  'review-kexin': '可信云',      // 3
  'review-kuaili': '快狸',       // 2
  'review-kuajie': '跨界云',     // 3
  'review-lingdong': '灵动云',   // 3
  'review-lingmao': '灵猫',      // 2
  'review-shanyue': '闪跃',      // 2
  'review-tizi': '梯子云',       // 3
  'review-weitu': '唯兔云',      // 3
  'review-wuyou': '无忧',        // 2
  'review-xingdao': '星岛梦',    // 3
  'review-yifan': '一翻云',      // 3
  'review-yinren': '隐形人'      // 3
};

let fixed = 0;

for (const [slug, brand] of Object.entries(brands)) {
  const mdPath = 'src/content/blog/' + slug + '.md';
  if (!fs.existsSync(mdPath)) { console.log('NOT FOUND:', mdPath); continue; }

  let content = fs.readFileSync(mdPath, 'utf8');
  
  // Use a template that naturally hits 70-80 depending on brand name length
  // Template: "机场猫记录{brand}的节点测速、晚高峰连接稳定性、Netflix等流媒体解锁能力以及不同套餐的性价比分析，数据基于长期真实网络环境采集，帮您做出购买决策。"
  // Without brand: 66 chars. Brand adds 2-3 chars. So total = 68-69 chars. Still short.
  // Need even longer template...
  
  // Let's try: "机场猫对{brand}进行了节点测速、晚高峰连接稳定性、Netflix等流媒体解锁能力以及不同套餐的性价比测试，数据来自长期真实网络环境，帮您在购买前做出准确判断。"
  const newDesc = '机场猫对' + brand + '进行了节点测速、晚高峰连接稳定性、Netflix等流媒体解锁能力以及套餐性价比测试，数据来自真实网络环境，帮您在购买前做出判断。';
  const dLen = Array.from(newDesc).length;
  
  if (dLen >= 70 && dLen <= 80) {
    console.log(slug + ' DESC OK: ' + dLen + ' - ' + newDesc);
  } else {
    console.log(slug + ' DESC OOB: ' + dLen + ' - ' + newDesc);
  }
  
  content = content.replace(/^(description:\s*)["']?.*?["']?(\r?\n)/m, function(m, p, e) {
    return p + '"' + newDesc + '"' + e;
  });
  
  fs.writeFileSync(mdPath, content, 'utf8');
  fixed++;
}

console.log('Fixed:', fixed);
