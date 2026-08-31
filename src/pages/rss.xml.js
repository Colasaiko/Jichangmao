import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context) {
  let posts = await getCollection('blog');
  // Sort by date descending
  posts = posts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()).slice(0, 20);
  
  return rss({
    title: '机场猫',
    description: '专业的网络线路与工具使用指南',
    site: context.site,
    items: posts.map((post) => {
      // Determine correct route prefix based on category, exactly like the Astro routes
      const isReview = post.data.category === '品牌介绍' || post.data.category === '机场测评' || post.data.title.includes('测评');
      const prefix = isReview ? '/evaluations' : '/blog';
      
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `${prefix}/${post.slug}/`,
      };
    }),
    customData: `<language>zh-CN</language>`,
  });
}
