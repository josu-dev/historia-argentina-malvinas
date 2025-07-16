import { db } from '$lib/server/db/base.js';
import { t } from '$lib/server/db/index.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import type { Actions, PageServerLoad } from './$types.js';

const approve_request_schema = z.object({
    id: z.string().nonempty().transform(value => +value)
});

const reject_request_schema = approve_request_schema.extend({
    reason: z.string()
});

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.session === null) {
        redirect(302, "/login");
    }

    const [events, experiences, pending, approved, rejected] = await Promise.all([
        db
            .select()
            .from(t.event)
            .where(eq(t.event.displayed, true)),
        db
            .select()
            .from(t.experience),
        db
            .select()
            .from(t.experience_request)
            .where(eq(t.experience_request.status, 'pending')),
        db
            .select()
            .from(t.experience_approved),
        db
            .select()
            .from(t.experience_rejected)
    ]);

    if (events.length === 0) {
        error(500, "Events not seeded.");
    }

    const approve_request_form = await superValidate(zod4(approve_request_schema));
    const reject_request_form = await superValidate(zod4(reject_request_schema));

    const out = {
        events: events,
        experiences: experiences,
        requests: {
            pending: pending,
            approved: approved,
            rejected: rejected
        },
        approve_request_form: approve_request_form,
        reject_request_form: reject_request_form
    };
    return out;
};

export const actions: Actions = {
    approve_request: async ({ request }) => {
        const form = await superValidate(request, zod4(approve_request_schema));
        if (!form.valid) {
            return fail(400, { form });
        }

        const experience_requests = await db
            .select()
            .from(t.experience_request)
            .where(eq(t.experience_request.id, form.data.id));
        const experience_request = experience_requests.length ? experience_requests[0] : undefined;
        if (experience_request === undefined || experience_request.status !== 'pending') {
            return fail(400, { form });
        }

        await db.transaction(async (tx) => {
            await Promise.all([
                tx
                    .update(t.experience_request)
                    .set({ status: 'approved' })
                    .where(eq(t.experience_request.id, experience_request.id)),
                tx
                    .insert(t.experience_approved)
                    .values({
                        experience_id: experience_request.experience_id,
                    })
            ]);
        });

        return { form };
    },
    reject_request: async ({ request }) => {
        const form = await superValidate(request, zod4(reject_request_schema));
        if (!form.valid) {
            return fail(400, { form });
        }

        const experience_requests = await db
            .select()
            .from(t.experience_request)
            .where(eq(t.experience_request.id, form.data.id));
        const experience_request = experience_requests.length ? experience_requests[0] : undefined;
        if (experience_request === undefined || experience_request.status !== 'pending') {
            return fail(400, { form });
        }

        await db.transaction(async (tx) => {
            await Promise.all([
                tx
                    .update(t.experience_request)
                    .set({ status: 'rejected' })
                    .where(eq(t.experience_request.id, experience_request.id)),
                tx
                    .insert(t.experience_rejected)
                    .values({
                        experience_id: experience_request.experience_id,
                        reason: form.data.reason,
                    })
            ]);
        });

        return { form };
    }
};
