import type { CollectionEntry } from "astro:content";

export function sortMDByDate(posts: CollectionEntry<"archived_post">[] = []) {
	return posts.sort((a, b) => new Date(b.data.time).valueOf() - new Date(a.data.time).valueOf());
}
