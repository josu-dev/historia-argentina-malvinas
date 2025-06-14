import type { T } from '$lib/server/db/index.js';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: null | T.User;
            session: null | T.Session;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
