import { z } from 'zod/v4';

export const new_experience_schema = z.object({
    event_id: z.string(),
    title: z.string(),
    date: z.string(),
    content: z.string(),
    author_email: z.email(),
    author_fullname: z.string(),
    author_perspective: z.string(),
    author_website: z.url().optional(),
});

export type NewExperienceSchema = typeof new_experience_schema;
