import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as t from '../src/lib/server/db/schema.ts';

const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN
});

const db = drizzle(client, { schema: t });

type Database = typeof db;

export { Database, db, t };
