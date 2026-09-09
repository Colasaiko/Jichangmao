const fs = require('fs');

const evalViolations = {
  'review-bitznet': { brandName: 'BitzNet' },
  'review-firefly': { brandName: '萤火虫' },
  'review-sogo': { brandName: 'sogo云' },
  'review-wavenet': { brandName: 'WaveNet' },
  'review-ermao': { brandName: '二猫云' },
  'review-feimao': { brandName: '飞猫云' },
  'review-flyv': { brandName: '飞V' },
  'review-guangnian': { brandName: '光年云' },
  'review-guangsu': { brandName: '光速云' },
  'review-jilian': { brandName: '极连云' },
  'review-kexin': { brandName: '可信云' },
  'review-kuaili': { brandName: '快狸' },
  'review-kuajie': { brandName: '跨界云' },
  'review-lingdong': { brandName: '灵动云' },
  'review-lingmao': { brandName: '灵猫' },
  'review-shanyue': { brandName: '闪跃' },
  'review-tizi': { brandName: '梯子云' },
  'review-weitu': { brandName: '唯兔云' },
  'review-wuyou': { brandName: '无忧' },
  'review-xingdao': { brandName: '星岛梦' },
  'review-yifan': { brandName: '一翻云' },
  'review-yinren': { brandName: '隐形人' }
};

let fixed = 0;

for (const [slug, info] of Object.entries(evalViolations)) {
  const mdPath = 'src/content/blog/' + slug + '.md';
  if (!fs.existsSync(mdPath)) { console.log('NOT FOUND:', mdPath); continue; }

  let content = fs.readFileSync(mdPath, 'utf8');
  
  // Read current title/desc
  const tMatch = content.match(/^title:\s*["']?(.*?)["']?$/m);
  const dMatch = content.match(/^description:\s*["']?(.*?)["']?$/m);
  
  const origTitle = tMatch ? tMatch[1] : '';
  const origDesc = dMatch ? dMatch[1] : '';
  const tLen = Array.from(origTitle).length;
  const dLen = Array.from(origDesc).length;
  
  const brand = info.brandName;
  
  // Generate new title: "{{brand}}测评：线路、套餐与使用体验 - 机场猫"
  let newTitle = origTitle;
  if (tLen < 20 || tLen > 30) {
    newTitle = brand + '测评：线路、套餐与使用体验 - 机场猫';
    const newTLen = Array.from(newTitle).length;
    if (newTLen < 20 || newTLen > 30) {
      // Adjust: too short -> add more, too long -> trim
      if (newTLen < 20) {
        newTitle = brand + '深度测评：节点线路、套餐选择与日常稳定性 - 机场猫';
      } else if (newTLen > 30) {
        newTitle = brand + '测评：套餐与线路 - 机场猫';
      }
    }
    const checkLen = Array.from(newTitle).length;
    console.log(slug + ' TITLE: ' + checkLen + ' - ' + newTitle);
  }
  
  // Generate new desc: targeting 70-80 chars
  let newDesc = origDesc;
  if (dLen < 70 || dLen > 80) {
    // Template: "本文记录{brand}机场的节点测速、流媒体解锁与套餐性价比真实评测数据，帮您判断该机场是否值得购买。"
    const template1 = '本文记录' + brand + '机场的节点测速、流媒体解锁与套餐性价比真实评测数据，帮您判断该机场是否值得购买。';
    const t1Len = Array.from(template1).length;
    if (t1Len >= 70 && t1Len <= 80) {
      newDesc = template1;
    } else if (t1Len < 70) {
      // Add more
      const template2 = '本文记录' + brand + '机场的节点测速、晚高峰稳定性、流媒体解锁情况与套餐性价比，结合真实使用数据帮您判断是否值得购买。';
      const t2Len = Array.from(template2).length;
      if (t2Len <= 80) {
        newDesc = template2;
      } else {
        newDesc = Array.from(template2).slice(0, 80).join('');
      }
    } else {
      // Too long, trim
      newDesc = Array.from(template1).slice(0, 79).join('');
    }
    const newDLen = Array.from(newDesc).length;
    console.log(slug + ' DESC: ' + newDLen + ' - ' + newDesc.substring(0, 60) + '...');
  }
  
  // Write back
  content = content.replace(/^(title:\s*)["']?.*?["']?(\r?\n)/m, function(m, p, e) {
    return p + '"' + newTitle + '"' + e;
  });
  content = content.replace(/^(description:\s*)["']?.*?["']?(\r?\n)/m, function(m, p, e) {
    return p + '"' + newDesc + '"' + e;
  });
  
  fs.writeFileSync(mdPath, content, 'utf8');
  fixed++;
}

console.log('Fixed evaluation files:', fixed);
