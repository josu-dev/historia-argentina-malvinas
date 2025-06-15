import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as t from '../src/lib/server/db/schema.js';

const db = drizzle({
    connection: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN
    },
    schema: t
});

type Database = typeof db;

export { Database, db, t };
