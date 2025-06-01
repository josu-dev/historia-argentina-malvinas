import { uuidv4 } from '$lib/utils.svelte.js';
import type { ImageMetadata, RenderableContent } from './misc.js';
import { image_metadata } from './misc.js';

export interface ScrollySection {
    id: string;
    title: string;
    content: RenderableContent;
    img: ImageMetadata;
}

export interface ScrollySectionInit {
    title: string;
    blocks: Array<string>;
    img: string;
}

export function section_content({ blocks }: { blocks: Array<string>; }): RenderableContent {
    const out: RenderableContent = {
        items: blocks
    };
    return out;
}

export function scrolly_section({ title, blocks, img }: ScrollySectionInit): ScrollySection {
    const out: ScrollySection = {
        id: uuidv4(),
        title: title,
        content: section_content({ blocks: blocks }),
        img: image_metadata({ src: img })
    };
    return out;
}
