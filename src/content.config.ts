import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const languageSchema = z.enum(["nl", "en"]);
const statusSchema = z.enum(["Draft", "Published"]);

const actionSchema = z.object({
	label: z.string(),
	href: z.string(),
});

/* -------------------------------------------------------------------------- */
/*  Pages                                                                      */
/*  A page is the top-level content entry. It carries SEO/navigation metadata  */
/*  and an ordered list of component references that make up the page.         */
/* -------------------------------------------------------------------------- */
const pages = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		status: statusSchema.default("Draft"),
		language: languageSchema,
		seo: z
			.object({
				title: z.string().optional(),
				description: z.string().optional(),
				canonical: z.string().optional(),
				noindex: z.boolean().default(false),
			})
			.optional(),
		navigation: z
			.object({
				label: z.string().optional(),
				order: z.number().optional(),
			})
			.optional(),
		components: z
			.array(
				z.object({
					id: z.string(),
					type: z.string(),
					ref: z.string(),
					order: z.number().optional(),
				}),
			)
			.default([]),
	}),
});

/* -------------------------------------------------------------------------- */
/*  Components                                                                  */
/*                                                                             */
/*  Every component shares a common base (the "general component"). Each       */
/*  concrete component type extends that base with its own fields and is       */
/*  discriminated by `type`. To add a new component:                           */
/*    1. Create `<name>Schema = componentBaseSchema.extend({ type: ... })`     */
/*    2. Add it to the `componentSchema` discriminated union below.            */
/* -------------------------------------------------------------------------- */
const componentBaseSchema = z.object({
	title: z.string(),
	language: languageSchema,
	page: z.string(),
	componentId: z.string(),
});

const heroSchema = componentBaseSchema.extend({
	type: z.literal("hero"),
	eyebrow: z.string().optional(),
	heading: z
		.object({
			before: z.string().optional(),
			highlight: z.string().optional(),
		})
		.optional(),
	text: z.array(z.string()).default([]),
	primaryAction: actionSchema.optional(),
	secondaryAction: actionSchema.optional(),
	services: z.array(z.string()).default([]),
	points: z.array(z.string()).default([]),
});

const introSchema = componentBaseSchema.extend({
	type: z.literal("intro"),
	eyebrow: z.string().optional(),
	heading: z.string(),
	body: z.array(z.string()).default([]),
	list: z.array(z.string()).optional(),
	primaryAction: actionSchema.optional(),
	secondaryAction: actionSchema.optional(),
});

const textBlockSchema = componentBaseSchema.extend({
	type: z.literal("textBlock"),
	heading: z.string().optional(),
	body: z.array(z.string()).default([]),
	list: z.array(z.string()).optional(),
	listStyle: z.enum(["bullet", "number"]).default("bullet"),
	afterList: z.array(z.string()).optional(),
});

const cardGridSchema = componentBaseSchema.extend({
	type: z.literal("cardGrid"),
	eyebrow: z.string().optional(),
	heading: z.string().optional(),
	intro: z.string().optional(),
	items: z
		.array(
			z.object({
				title: z.string(),
				description: z.string(),
				list: z.array(z.string()).optional(),
			}),
		)
		.default([]),
	action: actionSchema.optional(),
});

const stepListSchema = componentBaseSchema.extend({
	type: z.literal("stepList"),
	eyebrow: z.string().optional(),
	heading: z.string().optional(),
	intro: z.string().optional(),
	steps: z
		.array(
			z.object({
				title: z.string(),
				description: z.string().optional(),
				list: z.array(z.string()).optional(),
			}),
		)
		.default([]),
	action: actionSchema.optional(),
});

const ctaSchema = componentBaseSchema.extend({
	type: z.literal("cta"),
	heading: z.string(),
	text: z.array(z.string()).default([]),
	primaryAction: actionSchema.optional(),
	secondaryAction: actionSchema.optional(),
});

const contactDetailsSchema = componentBaseSchema.extend({
	type: z.literal("contactDetails"),
	email: z.string(),
	phone: z.string(),
	location: z.string(),
	note: z.string().optional(),
});

const componentSchema = z.discriminatedUnion("type", [
	heroSchema,
	introSchema,
	textBlockSchema,
	cardGridSchema,
	stepListSchema,
	ctaSchema,
	contactDetailsSchema,
]);

const components = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/components" }),
	schema: componentSchema,
});

export const collections = { pages, components };
