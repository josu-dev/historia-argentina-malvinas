import { dev } from '$app/environment';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema.js';

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!dev && !DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

export const db = drizzle({
    connection: {
        url: DATABASE_URL,
        authToken: DATABASE_AUTH_TOKEN
    },
    schema
});

export type Database = typeof db;
