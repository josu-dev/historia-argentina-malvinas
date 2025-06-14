import * as auth from '$lib/server/auth/index.js';
import { google, google_code_verifier_key, google_state_key } from "$lib/server/auth/oauth.js";
import { db } from '$lib/server/db/base.js';
import { t } from '$lib/server/db/index.js';
import type { OAuth2Tokens } from "arctic";
import { decodeIdToken } from "arctic";
import { eq } from 'drizzle-orm';
import type { RequestEvent } from "./$types";

export async function GET(event: RequestEvent): Promise<Response> {
    const stored_state = event.cookies.get(google_state_key) ?? null;
    const code_verifier = event.cookies.get(google_code_verifier_key) ?? null;
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");

    if (stored_state === null || code_verifier === null || code === null || state === null) {
        return new Response(null, { status: 400 });
    }
    if (stored_state !== state) {
        return new Response(null, { status: 400 });
    }

    let tokens: OAuth2Tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, code_verifier);
    } catch {
        return new Response("Invalid access link. Try from login again.", { status: 400 });
    }

    const claims = decodeIdToken(tokens.idToken()) as Record<string, string>;
    const google_id = claims.sub; // other claims: email

    const user = await db.select().from(t.user).where(eq(t.user.google_id, google_id)).get();
    if (user === undefined) {
        if (import.meta.env.DEV) {
            console.debug(`Tried login with google_id: '${google_id}'`);
        }
        return new Response("Your account isn't registered as an administrator.", { status: 401 });
    }

    const session_token = auth.generate_session_token();
    const session = await auth.create_session(session_token, user.id);
    auth.set_session_cookie(event, session_token, session.expires_at);

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/admin"
        }
    });

    // const user = await auth.createUser(googleId, email, name, picture);
    // const sessionToken = auth.generateSessionToken();
    // const session = auth.createSession(sessionToken, user.id);
    // auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    // return new Response(null, {
    //     status: 302,
    //     headers: {
    //         Location: "/"
    //     }
    // });
}
