import { defineCollection } from "astro:content"
import { file } from "astro/loaders"
import { z } from "astro/zod"

const figure = z.object({ value: z.string(), label: z.string() })

const project = z.object({
  who: z.string(),
  title: z.string(),
  body: z.string(),
  figures: z.array(figure).default([]),
  link: z.object({ label: z.string(), href: z.string() }).optional(),
})

// One entry per country in "Products people use". Edit src/content/places.yaml.
const places = defineCollection({
  loader: file("src/content/places.yaml"),
  schema: z.object({
    order: z.number(),
    country: z.string(),
    domain: z.string(),
    script: z.object({ text: z.string(), lang: z.enum(["bn", "am"]) }).optional(),
    home: z.boolean().default(false),
    live: z.boolean().default(false),
    ethiopianDate: z.boolean().default(false),
    projects: z.array(project).min(1),
  }),
})

export const collections = { places }
