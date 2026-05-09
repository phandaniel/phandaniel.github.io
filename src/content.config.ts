import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx,json}', base: "./src/content/projects" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		url: z.string().url(),
		language: z.string().optional(),
		image: image().optional(),
		githubRepo: z.string().optional(),
		order: z.number().default(99),
	}),
});

export const collections = { blog, projects };
