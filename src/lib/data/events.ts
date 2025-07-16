import type { T } from "$lib/server/db/index.js";
import { make_event_section } from "$lib/shared.js";
import events_raw from "./events.json";

export const data = events_raw satisfies Array<T.EventInsert>;

export const sections = data.map(make_event_section);
