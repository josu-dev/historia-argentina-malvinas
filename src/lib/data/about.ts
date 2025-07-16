import type { T } from "$lib/server/db/index.js";
import { make_scrollable_section } from "$lib/shared.js";
import data_raw from "./about.json";

export const data = data_raw satisfies Array<Omit<T.EventInsert, "date" | "summary">>;

export const sections = data.map(make_scrollable_section);
