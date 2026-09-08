const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

let count = 0;
fs.readdirSync(dir).filter(f=>f.endsWith('.md')).forEach(f=>{
  const fp = path.join(dir, f);
  let c = fs.readFileSync(fp, 'utf8');
  let changed = false;
  
  // Match lines like: description: "some "text" here"
  c = c.replace(/^(title|description|keywords):\s*"(.*)"/gm, (match, key, val) => {
    // If the inner value contains double quotes, replace them with single quotes
    // Note: the regex matches the first quote and the last quote on the line.
    // What's inside is `val`.
    if (val.includes('"')) {
      changed = true;
      const safeVal = val.replace(/"/g, "'");
      return `${key}: "${safeVal}"`;
    }
    return match;
  });
  
  if (changed) {
    fs.writeFileSync(fp, c, 'utf8');
    count++;
    console.log('Fixed quotes in: ' + f);
  }
});
console.log('Total fixed: ' + count);
