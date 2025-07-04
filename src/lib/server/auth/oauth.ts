import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SITE_ORIGIN } from "$env/static/private";
import { Google } from "arctic";

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, `${SITE_ORIGIN}/login/google/callback`);

export const google_state_key = "google_oauth_state";

export const google_code_verifier_key = "google_code_verifier";
