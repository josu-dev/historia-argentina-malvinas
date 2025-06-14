import { google, google_code_verifier_key, google_state_key } from "$lib/server/auth/oauth.js";
import { generateCodeVerifier, generateState } from "arctic";
import type { RequestEvent } from "./$types";

export function GET(event: RequestEvent): Response {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "email"]);

    event.cookies.set(google_state_key, state, {
        httpOnly: true,
        maxAge: 60 * 10,
        secure: import.meta.env.PROD,
        path: "/",
        sameSite: "lax"
    });
    event.cookies.set(google_code_verifier_key, codeVerifier, {
        httpOnly: true,
        maxAge: 60 * 10,
        secure: import.meta.env.PROD,
        path: "/",
        sameSite: "lax"
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    });
}
