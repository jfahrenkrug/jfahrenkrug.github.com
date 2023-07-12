import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60),
			description: z.string().min(50).max(160),
			publishDate: z.string().transform((str) => new Date(str)),
			coverImage: z
				.object({
					src: image(),
					alt: z.string(),
				})
				.optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			ogImage: z.string().optional(),
		}),
});

const archivedPost = defineCollection({
	type: "content",
	schema: () =>
		z.object({
			name: z.string(),
			title: z.string().max(120),
			time: z.date(),
		}),
});

export const collections = { post, archived_post: archivedPost };
