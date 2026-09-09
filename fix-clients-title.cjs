const fs = require('fs');

const clientsAstro = 'src/pages/clients.astro';
let c = fs.readFileSync(clientsAstro, 'utf8');
const newTitle = '代理客户端配置指南：多平台使用教程 - 机场猫';
console.log('len:', Array.from(newTitle).length);
c = c.replace(/title="[^"]*"/, 'title="' + newTitle + '"');
fs.writeFileSync(clientsAstro, c, 'utf8');
console.log('Done');
