const fs = require('fs');

const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf8'));
const brandById = {};
brands.forEach(b => { brandById[b.id] = b; });

// Fix cheap-airport-recommendations.md
{
  const fp = 'src/content/blog/cheap-airport-recommendations.md';
  let c = fs.readFileSync(fp, 'utf8');
  const marker = '- **查看完整推荐 →** [2026机场推荐排行榜](/reviews/)';
  const brandSection = `
以下机场月均起步价格较低，支持月付试用，适合预算有限或首次购买的用户：

### 1. 极连云
- **线路类型**：全IPLC、原生IP
- **月付起步**：¥18.00
- **协议支持**：SS
- **为什么适合**：月付起步约 ¥18，全IPLC专线，2.5Gbps 速率，8折优惠码（JLY888），性价比高
- **官网注册**：[极连云 官网（含优惠链接）](https://1jdhjfeeef.jilianat.homes/#/?code=nrPTQT2i)

### 2. 光年梯
- **线路类型**：全程IPLC、原生IP
- **月付起步**：¥18.00
- **协议支持**：SS
- **为什么适合**：月付起步约 ¥18，全程IPLC专线，原生IP解锁，预算控制方便
- **官网注册**：[光年梯 官网（含优惠链接）](https://vv3dbvb.guangnianertt1.homes/#/?code=k0rrn5UQ)

### 3. 光速云
- **线路类型**：IPLC、高带宽
- **月付起步**：¥23.00
- **协议支持**：SS
- **为什么适合**：月付起步约 ¥23，全球IPLC，单节点 2.5Gbps，解锁 Netflix/ChatGPT
- **官网注册**：[光速云 官网（含优惠链接）](https://v5g.gggoltt.xyz/#/?code=GKfXFvJh)

### 4. 可信云
- **线路类型**：全IEPL、不限设备
- **月付起步**：¥15.00
- **协议支持**：SS
- **为什么适合**：有 ¥15/月 月付小包，全IEPL专线，不限设备，适合轻度用户
- **官网注册**：[可信云 官网（含优惠链接）](https://asfasf.kexintztz2.sbs/#/?code=PY3isazT)

### 5. 速界机场
- **线路类型**：全IPLC、性价比
- **月付起步**：¥15.00
- **协议支持**：SS
- **为什么适合**：有 ¥15/月 单月试用包，全IPLC专线，适合先试用再决定是否续费，有8折优惠码（sujie888）
- **官网注册**：[速界机场 官网（含优惠链接）](https://linktest.tzztssuujj.xyz/#/?code=q1enwrOd)

### 6. 边缘节点
- **线路类型**：全IPLC、超高性价比
- **月付起步**：¥15.00
- **协议支持**：SS
- **为什么适合**：有 ¥15 月付体验包，全IPLC专线，最高 2.5Gbps，有8折优惠码（xk808）
- **官网注册**：[边缘节点 官网（含优惠链接）](https://bcbhk40y.ztymforedge.lol/#/?code=FhNDD3Sa)

`;
  c = c.replace(marker, brandSection + marker);
  fs.writeFileSync(fp, c, 'utf8');
  console.log('[UPDATED] cheap-airport-recommendations.md - added 6 brands');
}

// Fix ladder-recommendations.md
{
  const fp = 'src/content/blog/ladder-recommendations.md';
  let c = fs.readFileSync(fp, 'utf8');
  const marker = '→ 查看 [2026机场推荐排行榜](/reviews/)';
  const brandSection = `
## 推荐的"梯子"（机场）选择

以下是目前机场猫收录的、适合不同需求的机场（代理服务商）推荐，搭配对应客户端即可使用：

### 1. 微风网络 —— 重度用户首选，全IPLC专线
- **线路类型**：全IPLC、不限设备
- **月付起步**：¥11.00
- **协议支持**：SS（兼容 Clash/Shadowrocket/v2rayN）
- **为什么推荐**：老牌全IPLC专线，不限设备，月付最低套餐约 ¥11，有 7 折优惠码（weifeng90），适合长期重度使用
- **官网注册**：[微风网络 官网（含优惠链接）](https://edp01.breezenetaff.com/#/?code=bSnymFll)

### 2. 跨界云 —— 家庭多设备、解锁AI全能选
- **线路类型**：IPLC、x1倍率
- **月付起步**：¥20.00
- **协议支持**：SS
- **为什么推荐**：IPLC 高端线路，不限设备，支持 ChatGPT/Gemini/Claude，月付 ¥20 起，有 8 折优惠码（kuajie）
- **官网注册**：[跨界云 官网（含优惠链接）](https://kasoasf.kuajiecloudtttt.mom/#/?code=HRzqSLrR)

### 3. 极连云 —— 性价比专线，新手友好
- **线路类型**：全IPLC、原生IP
- **月付起步**：¥18.00
- **协议支持**：SS
- **为什么推荐**：月付 ¥18 起，全IPLC，有 8 折优惠码（JLY888），适合日常使用的进阶用户
- **官网注册**：[极连云 官网（含优惠链接）](https://1jdhjfeeef.jilianat.homes/#/?code=nrPTQT2i)

### 4. 速界机场 —— 新手首次试用
- **线路类型**：全IPLC、性价比
- **月付起步**：¥15.00
- **协议支持**：SS
- **为什么推荐**：¥15 月付小包可试用，全IPLC专线，适合新手低成本验证需求后再升级
- **官网注册**：[速界机场 官网（含优惠链接）](https://linktest.tzztssuujj.xyz/#/?code=q1enwrOd)

### 5. 可信云 —— 轻度用户低价选
- **线路类型**：全IEPL、不限设备
- **月付起步**：¥15.00
- **协议支持**：SS
- **为什么推荐**：¥15 月付小包，全IEPL专线，不限设备，适合偶尔使用的轻度用户
- **官网注册**：[可信云 官网（含优惠链接）](https://asfasf.kexintztz2.sbs/#/?code=PY3isazT)

`;
  c = c.replace(marker, brandSection + marker);
  fs.writeFileSync(fp, c, 'utf8');
  console.log('[UPDATED] ladder-recommendations.md - added 5 brands');
}
