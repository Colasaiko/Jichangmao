const fs = require('fs');
let c = fs.readFileSync('src/components/SubpageNav.astro', 'utf8');
c = c.replace(/url: '\/reviews\/'(.*?)\}/g, (match, offset, str) => {
    // We just replace the url directly since we know there's one that says 2026 稳定机场推荐
    return match;
});
// let's do a simple string replace
c = c.replace(
    "{ title: '2026 稳定机场推荐', desc: '为您挑选高性价比、晚高峰稳定的机场', url: '/reviews/' }",
    "{ title: '2026 稳定机场推荐', desc: '为您挑选高性价比、晚高峰稳定的机场', url: '/blog/stable-airport-recommendations/' }"
);
fs.writeFileSync('src/components/SubpageNav.astro', c);
