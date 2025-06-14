import * as auth from "$lib/server/auth/index.js";
import type { Handle } from "@sveltejs/kit";

export const auth_handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("session") ?? null;
    if (token === null) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await auth.validate_session_token(token);
    if (session !== null) {
        auth.set_session_cookie(event, token, session.expires_at);
    } else {
        auth.delete_session_cookie(event);
    }

    event.locals.session = session;
    event.locals.user = user;
    return resolve(event);
};

export const handle = auth_handle;
