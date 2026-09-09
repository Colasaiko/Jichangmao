import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('匿名'),
    category: z.string().default('通用'),
    tags: z.array(z.string()).default([]),
    difficulty: z.string().optional(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(), video: z.string().optional(),
    keywords: z.string().optional(),
    article_type: z.string().optional(),
    parent_article: z.string().optional(),
    cluster: z.string().optional(),
    nextTitle: z.string().optional(),
    nextSlug: z.string().optional(),
    gallery: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
  }),
});


const clients = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    os: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, clients };
