const fs = require('fs');
let c = fs.readFileSync('src/pages/clients/[slug].astro', 'utf8');
c = c.replace('description={post.data.description} 平台的极速配置指引`}>', 'description={post.data.description || ""}>');
fs.writeFileSync('src/pages/clients/[slug].astro', c, 'utf8');
