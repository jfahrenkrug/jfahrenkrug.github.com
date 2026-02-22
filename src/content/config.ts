import { defineCollection, z } from 'astro:content';

export const collections = {
	archived_post: defineCollection({
		type: 'content',
		schema: z.object({
			name: z.string(),
			title: z.string().max(120),
			time: z.date(),
			categories: z.array(z.string()).optional(),
		}),
	}),
	speaking: defineCollection({
		type: 'data',
		schema: z.array(z.object({
			title: z.string(),
			date: z.coerce.date(),
			titleUrl: z.string().url().optional(),
			videoUrl: z.string().url().optional(),
			city: z.string(),
			eventName: z.string(),
		})),
	}),
	writing: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			updated: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().optional().default(false),
			image: z.string().optional(),
		}),
	}),
};
