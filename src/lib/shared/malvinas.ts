import { scrolly_section, section_content } from '$lib/shared/scrolly.js';
import { uuidv4 } from '$lib/utils.svelte.js';
import type { DateString, RenderableContent } from './misc.js';
import type { ScrollySection, ScrollySectionInit } from './scrolly.js';

export interface ExperienceAuthor {
    fullname: string;
    perspective: string;
    website?: string;
}

export interface MalvinasExperience {
    id: string;
    title: string;
    date: DateString;
    content: RenderableContent;
    author: ExperienceAuthor;
}

type MalvinasExperienceInit = Omit<MalvinasExperience, 'id' | 'content'> & {
    blocks: Array<string>;
};

export interface MalvinasDate {
    utc: string;
    day: number;
    month: number;
    year: number;
}

export interface MalvinasSection extends ScrollySection {
    date: MalvinasDate;
    experiences: Array<MalvinasExperience>;
}

export interface MalvinasSectionInit extends ScrollySectionInit {
    date: string;
    experiences: Array<MalvinasExperience>;
}

function malvinas_date({ utc }: { utc: string; }): MalvinasDate {
    const date = new Date(utc);
    const out: MalvinasDate = {
        utc: utc,
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
    };
    return out;
}

export function malvinas_experience({ title, author, date, blocks }: MalvinasExperienceInit): MalvinasExperience {
    const out: MalvinasExperience = {
        id: uuidv4(),
        title: title,
        author: author,
        date: date,
        content: section_content({ blocks: blocks })
    };
    return out;
}

export function malvinas_section({ title, blocks, date, img, experiences }: MalvinasSectionInit): MalvinasSection {
    const out: MalvinasSection = {
        ...scrolly_section({ title, blocks, img }),
        date: malvinas_date({ utc: date }),
        experiences: experiences
    };
    return out;
}
