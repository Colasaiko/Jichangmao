const fs = require('fs');
let c = fs.readFileSync('src/pages/evaluations.astro', 'utf8');

const target = `const jsonLd = JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage","name":title,"description":description,"url":"https://jichangmao.com/evaluations/","mainEntity":{"@type":"ItemList","itemListElement":[]}});`;

const replacement = `const itemListElements = reviews.map((post, index) => ({
  "@type": "ListItem",
  "position": index + 1,
  "name": post.data.title,
  "url": \`https://jichangmao.com/evaluations/\${post.slug}/\`
}));
const jsonLd = JSON.stringify({
  "@context":"https://schema.org",
  "@type":"CollectionPage",
  "name":title,
  "description":description,
  "url":"https://jichangmao.com/evaluations/",
  "mainEntity":{
    "@type":"ItemList",
    "itemListElement": itemListElements
  }
});`;

c = c.replace(target, replacement);
fs.writeFileSync('src/pages/evaluations.astro', c, 'utf8');
