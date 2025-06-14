import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

//
// Base
//

export const event = sqliteTable(
    'event',
    {
        id: text().primaryKey(),
        title: text().notNull().unique(),
        date: text().notNull(),
        img_url: text().notNull(),
        img_width: integer().notNull(),
        img_height: integer().notNull(),
        img_alt: text().notNull(),
        content: text().notNull(),
        displayed: integer({ mode: 'boolean' }).default(true).notNull(),
        created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
        updated_at: integer({ mode: 'timestamp' }).$onUpdate(() => new Date())
    }
);

export type Event = typeof event.$inferSelect;

export type EventInsert = typeof event.$inferInsert;

export const experience = sqliteTable(
    'experience',
    {
        id: text('id').primaryKey(),
        event_id: text().notNull().references(() => event.id, { onDelete: 'cascade' }),
        title: text().notNull(),
        date: text().notNull(),
        content: text().notNull(),
        author_email: text().notNull(),
        author_fullname: text().notNull(),
        author_perspective: text().notNull(),
        author_website: text(),
        created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
        updated_at: integer({ mode: 'timestamp' }).$onUpdate(() => new Date())
    },
    (table) => [
        unique().on(table.event_id, table.title)
    ]
);

export type Experience = typeof experience.$inferSelect;

export type ExperienceInsert = typeof experience.$inferInsert;

//
// Authentication
//

export const user = sqliteTable(
    'user',
    {
        id: integer().primaryKey({ autoIncrement: true }),
        google_id: text().notNull().unique(),
        email: text().notNull().unique(),
        name: text().notNull().unique(),
    }
);

export type User = typeof user.$inferSelect;

export const session = sqliteTable(
    'session',
    {
        id: text().primaryKey(),
        user_id: integer().notNull().references(() => user.id),
        expires_at: integer({ mode: 'timestamp' }).notNull()
    }
);

export type Session = typeof session.$inferSelect;

//
// Admin
//

export const experience_request = sqliteTable(
    'experience_request',
    {
        id: integer().primaryKey({ autoIncrement: true }),
        experience_id: text().notNull().unique().references(() => experience.id, { onDelete: 'cascade' }),
        status: text('status', { enum: ['pending', 'approved', 'rejected', 'deleted'] }).notNull().default('pending'),
        created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
        updated_at: integer({ mode: 'timestamp' }).$onUpdate(() => new Date())
    }
);

export type ExperienceRequest = typeof experience_request.$inferSelect;

export type ExperienceRequestInsert = typeof experience_request.$inferInsert;

export const experience_approved = sqliteTable(
    'experience_approved',
    {
        id: integer().primaryKey({ autoIncrement: true }),
        experience_id: text().notNull().unique().references(() => experience.id, { onDelete: 'cascade' }),
        created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
    }
);

export type ExperienceApproved = typeof experience_approved.$inferSelect;

export type ExperienceApprovedInsert = typeof experience_approved.$inferInsert;

export const experience_rejected = sqliteTable(
    'experience_rejected',
    {
        id: integer().primaryKey({ autoIncrement: true }),
        experience_id: text().notNull().unique().references(() => experience.id, { onDelete: 'cascade' }),
        reason: text().notNull(),
        created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
    }
);

export type ExperienceRejected = typeof experience_rejected.$inferSelect;

export type ExperienceRejectedInsert = typeof experience_rejected.$inferInsert;
