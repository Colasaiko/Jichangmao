const fs = require('fs');

const pages = {
  'src/pages/about.astro': {
    title: '关于机场猫：网站定位与内容说明 - 机场猫',
    desc: '机场猫致力于为您提供客观、真实的网络代理工具评测与使用指南。我们分享技术经验，旨在帮助用户在复杂的网络环境中找到适合自己的数字通信解决方案。'
  },
  'src/pages/privacy.astro': {
    title: '隐私政策 - 机场猫',
    desc: '机场猫隐私政策。我们尊重并保护所有访客的个人信息，本页面详细说明了我们在数据收集、使用与保护方面的原则及相关实践。'
  },
  'src/pages/disclaimer.astro': {
    title: '免责声明与内容使用说明 - 机场猫',
    desc: '机场猫免责声明。本站提供的内容仅供技术交流与学习参考，请用户在遵守当地法律法规的前提下使用相关技术服务。'
  },
  'src/pages/methodology.astro': {
    title: '机场猫评测方法与数据说明 - 机场猫',
    desc: '了解机场猫的评测标准与方法论。我们透明公开测速环境、打分逻辑与数据采集标准，确保提供的所有机场评测具有客观性和可复现性。'
  }
};

for (const [file, meta] of Object.entries(pages)) {
  if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(/title="[^"]+"/, `title="${meta.title}"`);
    c = c.replace(/description="[^"]+"/, `description="${meta.desc}"`);
    fs.writeFileSync(file, c, 'utf8');
  }
}
