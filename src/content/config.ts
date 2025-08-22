import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
		}),
	}),
	archived_post: defineCollection({
		type: 'content',
		schema: z.object({
			name: z.string(),
			title: z.string().max(120),
			time: z.date(),
			categories: z.array(z.string()).optional(),
		}),
	}),
};
