import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { Google } from "arctic";

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "http://localhost:5173/login/google/callback");

export const google_state_key = "google_oauth_state";

export const google_code_verifier_key = "google_code_verifier";
