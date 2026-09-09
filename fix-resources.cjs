const fs = require('fs');
let c = fs.readFileSync('src/pages/resources.astro', 'utf8');
c = c.replace(/"name": "相关资源 \| 机场猫"/, '"name": "代理软件资源库：开源客户端、分流规则与订阅转换"');
c = c.replace(/"description": "【资源下载】[^"]+"/, '"description": "机场猫精选网络资源合集。为您汇总安全纯净的开源代理客户端官方下载渠道、常用分流规则集（Routing Rules）以及节点订阅转换工具。"');
c = c.replace(/"name": "相关资源"/, '"name": "常用资源 / 资源库"');
fs.writeFileSync('src/pages/resources.astro', c, 'utf8');
