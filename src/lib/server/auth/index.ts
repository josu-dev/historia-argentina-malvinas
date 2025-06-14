import type { T } from '$lib/server/db/index.js';
import { db, t } from '$lib/server/db/index.js';
import type { Async } from '$lib/utils.svelte.js';
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32, encodeHexLowerCase } from "@oslojs/encoding";
import type { RequestEvent } from "@sveltejs/kit";
import { eq } from 'drizzle-orm';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export async function create_session(token: string, user_id: number): Async<T.Session> {
    const session_id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: T.Session = {
        id: session_id,
        user_id,
        expires_at: new Date(Date.now() + DAY_IN_MS * 30)
    };
    await db.insert(t.session).values(session);
    return session;
}

type ValidateSessionResult = { session: T.Session; user: T.User; } | { session: null; user: null; };

export async function validate_session_token(token: string): Async<ValidateSessionResult> {
    const session_id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await db
        .select({
            user: t.user,
            session: t.session
        })
        .from(t.user)
        .innerJoin(t.session, eq(t.user.id, t.session.user_id))
        .where(eq(t.session.id, session_id)).get();
    if (result === undefined) {
        return { session: null, user: null };
    }

    const { session, user } = result;

    const session_expired = Date.now() >= session.expires_at.getTime();
    if (session_expired) {
        await db.delete(t.session).where(eq(t.session.id, session.id));
        return { session: null, user: null };
    }

    const renew_session = Date.now() >= session.expires_at.getTime() - DAY_IN_MS * 15;
    if (renew_session) {
        session.expires_at = new Date(Date.now() + DAY_IN_MS * 30);
        await db
            .update(t.session)
            .set({ expires_at: session.expires_at })
            .where(eq(t.session.id, session.id));
    }

    return { session, user };
}

export async function delete_session(session_id: string): Async<void> {
    await db.delete(t.session).where(eq(t.session.id, session_id));
}

export function set_session_cookie(event: RequestEvent, token: string, expires_at: Date): void {
    event.cookies.set("session", token, {
        httpOnly: true,
        path: "/",
        secure: import.meta.env.PROD,
        sameSite: "lax",
        expires: expires_at
    });
}

export function delete_session_cookie(event: RequestEvent): void {
    event.cookies.set("session", "", {
        httpOnly: true,
        path: "/",
        secure: import.meta.env.PROD,
        sameSite: "lax",
        maxAge: 0
    });
}

export function generate_session_token(): string {
    const token_bytes = crypto.getRandomValues(new Uint8Array(20));
    const token = encodeBase32(token_bytes).toLowerCase();
    return token;
}
