import * as auth from '$lib/server/auth/index.js';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.session !== null) {
        redirect(302, "/admin");
    }
};

export const actions: Actions = {
    logout: async (event) => {
        if (event.locals.session === null) {
            return fail(401);
        }

        await auth.delete_session(event.locals.session.id);
        auth.delete_session_cookie(event);

        return redirect(302, '/login');
    }
};
