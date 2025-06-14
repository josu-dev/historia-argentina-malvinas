import * as auth from '$lib/server/auth/index.js';
import { actionResult } from 'sveltekit-superforms';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async (event) => {
    if (event.locals.session === null) {
        return actionResult('redirect', '/', 302);
    }

    await auth.delete_session(event.locals.session.id);
    auth.delete_session_cookie(event);

    return actionResult('redirect', '/login', 302);
};
