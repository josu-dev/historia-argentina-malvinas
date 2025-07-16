import { sections } from '$lib/data/events.js';
import { db, t } from '$lib/server/db/index.js';
import { new_experience_schema } from '$lib/server/schemas.js';
import type * as Model from '$lib/types.js';
import { uuidv4, type AsyncArray } from '$lib/utils.svelte.js';
import { fail } from '@sveltejs/kit';
import { eq, getTableColumns } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';

async function get_all_events_experiences(): AsyncArray<Model.EventExperience> {
    const experiences = await db.select(getTableColumns(t.experience)).from(t.experience).innerJoin(t.experience_approved, eq(t.experience.id, t.experience_approved.experience_id));
    const out: Array<Model.EventExperience> = new Array(experiences.length);
    for (let i = 0; i < out.length; i++) {
        const e = experiences[i];
        out[i] = {
            id: e.id,
            event_id: e.event_id,
            title: e.title,
            date: e.date,
            content: e.content,
            author_fullname: e.author_fullname,
            author_perspective: e.author_perspective,
            author_website: e.author_website
        };
    }

    return out;
}

export const load: PageServerLoad = async () => {
    const experiences = await get_all_events_experiences();

    const event_id_to_experiences: Record<string, Array<Model.EventExperience>> = {};
    for (const e of experiences) {
        if (e.event_id in event_id_to_experiences) {
            event_id_to_experiences[e.event_id].push(e);
        }
        else {
            event_id_to_experiences[e.event_id] = [e];
        }
    }

    const events_with_experiences: Array<Model.EventSectionWithExperiences> = [];
    for (const section of sections) {
        events_with_experiences.push({
            ...section,
            experiences: event_id_to_experiences[section.id] ?? []
        });
    }

    const experience_form = await superValidate(zod4(new_experience_schema));

    const out = {
        sections: events_with_experiences,
        experience_form: experience_form
    };
    return out;
};

export const actions: Actions = {
    new_experience: async ({ request }) => {
        const form = await superValidate(request, zod4(new_experience_schema));
        if (!form.valid) {
            console.error(form);
            return fail(400, { form });
        }

        const event = await db.select({ id: t.event.id }).from(t.event).where(eq(t.event.id, form.data.event_id)).get();
        if (event === undefined) {
            return fail(404, { form });
        }

        const data: typeof t.experience.$inferInsert = {
            id: uuidv4(),
            event_id: form.data.event_id,
            title: form.data.title,
            date: form.data.date,
            author_email: form.data.author_email,
            author_fullname: form.data.author_fullname,
            author_perspective: form.data.author_perspective,
            author_website: form.data.author_website,
            content: [form.data.content]
        };

        await db.transaction(async tx => {
            await tx.insert(t.experience).values(data);
            await tx.insert(t.experience_request).values({
                experience_id: data.id,
            });
        });

        return { form };
    }
};
