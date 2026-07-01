import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const languageSchema = z.enum(["nl", "en"]);
const statusSchema = z.enum(["Draft", "Published"]);

const actionSchema = z.object({
	label: z.string(),
	href: z.string(),
});

const seoSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	canonical: z.string().optional(),
	noindex: z.boolean().default(false),
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
		seo: seoSchema.optional(),
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

const contactFormSchema = componentBaseSchema.extend({
	type: z.literal("contactForm"),
	heading: z.string().optional(),
	fields: z.object({
		name: z.string(),
		organisation: z.string(),
		email: z.string(),
		phone: z.string(),
		subject: z.string(),
		message: z.string(),
	}),
	optionalLabel: z.string(),
	consent: z.object({
		before: z.string().optional(),
		link: actionSchema,
		after: z.string().optional(),
	}),
	submitLabel: z.string(),
	successMessage: z.string(),
	errorMessage: z.string(),
});

/**
 * Anchors a position in a page's `components[]` list without holding its own
 * content — the rendered content comes from the `projects`/`knowledge`
 * collections directly, filtered by the page's language. See PageRenderer.astro.
 */
const projectsListingSchema = componentBaseSchema.extend({
	type: z.literal("projectsListing"),
	heading: z.string().optional(),
	intro: z.string().optional(),
});

const knowledgeListingSchema = componentBaseSchema.extend({
	type: z.literal("knowledgeListing"),
	heading: z.string().optional(),
	intro: z.string().optional(),
});

const componentSchema = z.discriminatedUnion("type", [
	heroSchema,
	introSchema,
	textBlockSchema,
	cardGridSchema,
	stepListSchema,
	ctaSchema,
	contactDetailsSchema,
	contactFormSchema,
	projectsListingSchema,
	knowledgeListingSchema,
]);

const components = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/components" }),
	schema: componentSchema,
});

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/*  Independently addressable case studies — not a page section, each entry   */
/*  gets its own detail page. Not every project needs an nl AND en version.   */
/* -------------------------------------------------------------------------- */
const projects = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			slug: z.string(),
			language: languageSchema,
			summary: z.string(),
			client: z.string().optional(),
			year: z.number().optional(),
			cover: image().optional(),
			tags: z.array(z.string()).default([]),
			status: statusSchema.default("Draft"),
			seo: seoSchema.optional(),
		}),
});

/* -------------------------------------------------------------------------- */
/*  Knowledge                                                                  */
/*  Independently addressable articles — same shape as projects, dated and    */
/*  sorted newest first on the listing page.                                  */
/* -------------------------------------------------------------------------- */
const knowledge = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/knowledge" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			slug: z.string(),
			language: languageSchema,
			excerpt: z.string(),
			publishedAt: z.coerce.date(),
			cover: image().optional(),
			tags: z.array(z.string()).default([]),
			status: statusSchema.default("Draft"),
			seo: seoSchema.optional(),
		}),
});

export const collections = { pages, components, projects, knowledge };
