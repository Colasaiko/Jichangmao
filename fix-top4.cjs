const fs = require('fs');

let c = fs.readFileSync('src/content/blog/top-4-recommended-airports.md', 'utf8');

c = c.replace(/title: .*/, 'title: "2026年四款优质机场横向对比：特色与套餐解析 - 机场猫"');
c = c.replace(/description: .*/, 'description: "本文横向对比微风网络、飞猫云、sogo云与暮光加速四款热门机场服务商。从线路类型、节点覆盖到套餐价格进行详细解析，帮助您根据自身实际需求，选择最合适的优质机场。"');
c = c.replace(/keywords: .*/, 'keywords: "四款机场横向对比,优质机场对比,机场套餐解析,微风网络测评,飞猫云测评"');
c = c.replace('updatedDate: 2026-08-19', 'updatedDate: 2026-08-20');

// Replace intro
const introRegex = /选\[机场\].*?以下是各品牌的详细套餐、价格及专属购买链接整理。/s;
const newIntro = `在众多[机场](/blog/what-is-airport-proxy/)选择中，不同用户对线路类型、节点覆盖以及价格的侧重点各不相同。本文将横向对比当前市场上的 4 家热门服务商：**微风网络**、**飞猫云**、**sogo云** 与 **暮光加速**。

我们将根据各品牌的官方资料与套餐配置，为您梳理它们的线路特色与价格信息，帮助您在订阅前建立初步的横向认知。`;

c = c.replace(introRegex, newIntro);

// Also remove instances of "最稳定", "实测"
c = c.replace(/最稳定/g, "最适配");
c = c.replace(/实测精选/g, "精选分析");
c = c.replace(/在本站测试的品牌中属于表现较好的选项的选择之一/g, "在同类专线产品中具有一定代表性");

fs.writeFileSync('src/content/blog/top-4-recommended-airports.md', c, 'utf8');
