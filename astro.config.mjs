import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';

// Parse all blog posts to get their last modified dates
const getSitemapDates = () => {
  const dates = {};
  try {
    const blogDir = path.resolve('src/content/blog');
    const files = fs.readdirSync(blogDir);
    files.forEach(file => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
        const slug = file.replace(/\.mdx?$/, '');
        
        let lastMod = null;
        const updatedMatch = content.match(/updatedDate:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/);
        if (updatedMatch) {
          lastMod = new Date(updatedMatch[1]);
        }
        
        if (lastMod) {
          const isReview = content.includes("category: \"品牌介绍\"") || content.includes("category: \"机场测评\"");
          const prefix = isReview ? 'evaluations' : 'blog';
          dates[`/${prefix}/${slug}/`] = lastMod.toISOString();
        }
      }
    });
  } catch (e) {
    console.error('Error parsing blog dates for sitemap:', e);
  }
  return dates;
};

const sitemapDates = getSitemapDates();

// https://astro.build/config
export default defineConfig({
  site: 'https://jichangmao.com',
  trailingSlash: 'ignore',
    outDir: './dist',
    integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/api/") && !page.includes("/admin/") && !page.includes("/404"),
      serialize(item) {
        // Parse pathname from item.url
        try {
          const urlObj = new URL(item.url);
          let pathname = urlObj.pathname;
          if (!pathname.endsWith('/')) pathname += '/';
          
          if (sitemapDates[pathname]) {
            item.lastmod = sitemapDates[pathname];
          }
        } catch (e) {}
        return item;
      }
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      wrap: true,
    },
  },
});
