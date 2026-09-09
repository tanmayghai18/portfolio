import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const linkItem = z.object({
  title: z.string(),
  url: z.string().url(),
  date: z.coerce.string().optional(),
  order: z.number(),
});

const profile = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/profile" }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    github: z.string().url(),
    linkedin: z.string().url(),
    twitter: z.string().url(),
    substack: z.string().url(),
    instagram: z.string().url().optional(),
    scholar: z.string().url().optional(),
    previous: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url().optional(),
        }),
      )
      .default([]),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: linkItem,
});

const music = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
  schema: linkItem,
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: linkItem.extend({
    venue: z.string().optional(),
    kind: z.enum(["intro", "paper"]).default("paper"),
  }),
});

export const collections = { profile, writing, music, research };
