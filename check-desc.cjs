const fs = require('fs');
const c = fs.readFileSync('src/content/blog/adv-08.md', 'utf8');
const m = c.match(/^description:\s*["']?(.*?)["']?$/m);
console.log('Current desc:', m ? m[1] : 'not found');
console.log('len:', m ? Array.from(m[1]).length : 0);
