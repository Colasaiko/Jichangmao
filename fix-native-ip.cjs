const fs = require('fs');
let c = fs.readFileSync('src/content/blog/native-ip-airport-recommendations.md', 'utf8');
c = c.replace(/需要注意的是，“原生IP”属于行业常用描述，目前并不存在单一全球统一的判定标准。/g, ''); 
c = c.replace(/## 什么是原生IP\n\n/, '## 什么是原生IP\n\n需要注意的是，“原生IP”属于行业常用描述，目前并不存在单一全球统一的判定标准。\n\n');
fs.writeFileSync('src/content/blog/native-ip-airport-recommendations.md', c, 'utf8');
