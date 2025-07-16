import type { Table } from "drizzle-orm";
import * as events from '../src/lib/data/events.js';
import type { Database } from './db.js';
import { db, t } from './db.js';

async function main() {
    await reset_tables(db, Object.values(t));

    await seed_events(db);

    db.$client.close();
}

async function reset_tables(db: Database, tables: Array<Table>) {
    for (const t of tables) {
        await db.delete(t);
    }
}

async function seed_events(db: Database) {
    await db.insert(t.event).values(events.data);
}

main();
