const fs = require('fs');

const p1 = 'src/content/blog/quantumult-x-airport-recommendations.md';
if (fs.existsSync(p1)) {
  let c = fs.readFileSync(p1, 'utf8');
  c = c.replace(/VLESS 不支持/g, '当前版本已支持 VLESS 与 Reality TLS');
  c = c.replace(/不支持 VLESS/g, '当前版本已支持 VLESS 与 Reality TLS，并可单独配置 Hysteria2');
  fs.writeFileSync(p1, c, 'utf8');
}

const p2 = 'src/content/blog/hiddify-airport-recommendations.md';
if (fs.existsSync(p2)) {
  let c = fs.readFileSync(p2, 'utf8');
  c = c.replace(/底层核心就是 sing-box/g, '主要基于 sing-box 工具链发展，并融合了当前版本的其他核心支持');
  c = c.replace(/完全基于 sing-box/g, '主要基于 sing-box 工具链发展，并考虑当前版本的其他核心支持');
  fs.writeFileSync(p2, c, 'utf8');
}

const p3 = 'src/content/blog/netflix-airport-recommendations.md';
if (fs.existsSync(p3)) {
  let c = fs.readFileSync(p3, 'utf8');
  c = c.replace(/只有 IPLC\/IEPL 才不会缓冲/g, 'IPLC/IEPL 专线在晚高峰期间提供更好的缓冲体验');
  c = c.replace(/只有使用 IPLC.*?才不会缓冲/g, 'IPLC/IEPL 专线能有效减少晚高峰缓冲');
  fs.writeFileSync(p3, c, 'utf8');
}

const p4 = 'src/content/blog/native-ip-airport-recommendations.md';
if (fs.existsSync(p4)) {
  let c = fs.readFileSync(p4, 'utf8');
  c = c.replace(/(原生IP的定义[^\n]*\n)/, '$1需要注意的是，“原生IP”属于行业常用描述，目前并不存在单一全球统一的判定标准。\n');
  if(!c.includes('单一全球统一的判定标准')) {
      c += '\n\n需要注意的是，“原生IP”属于行业常用描述，目前并不存在单一全球统一的判定标准。';
  }
  fs.writeFileSync(p4, c, 'utf8');
}

const p5 = 'src/content/blog/sing-box-airport-recommendations.md';
if (fs.existsSync(p5)) {
  let c = fs.readFileSync(p5, 'utf8');
  c = c.replace(/性能绝对碾压/g, '性能表现优异');
  c = c.replace(/绝对省电/g, '电量消耗控制良好');
  c = c.replace(/最省电/g, '较省电');
  c = c.replace(/毫无耗电/g, '耗电较低');
  fs.writeFileSync(p5, c, 'utf8');
}
