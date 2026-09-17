const fs = require('fs');

let indexContent = fs.readFileSync('src/pages/index.astro', 'utf8');
indexContent = indexContent.replace(/<BaseLayout title="[^"]*" description="[^"]*" keywords="[^"]*"/, '<BaseLayout title="2026年机场推荐：靠谱好用的优质机场精选 - 机场猫" description="正在寻找2026年最新优质机场？机场猫为您提供详细的流媒体解锁分析与各平台代理客户端配置教程，助您挑选最适合的网络服务，轻松解决日常上网难题，畅享高速网络。" keywords="机场推荐,2026机场推荐,机场推荐2026,好用机场推荐,靠谱机场推荐"');
fs.writeFileSync('src/pages/index.astro', indexContent, 'utf8');

let reviewsContent = fs.readFileSync('src/pages/reviews.astro', 'utf8');
reviewsContent = reviewsContent.replace(/const title = "[^"]*";/, 'const title = "2026机场推荐排行榜：客观详实的机场天梯榜 - 机场猫";');
reviewsContent = reviewsContent.replace(/const description = "[^"]*";/, 'const description = "寻找2026最新机场推荐排行榜？机场猫根据官方数据、线路配置与日常表现，整理出一份客观详实的机场天梯榜。无论追求性价比还是极致体验，都能帮您找到优质服务商。";');
fs.writeFileSync('src/pages/reviews.astro', reviewsContent, 'utf8');
