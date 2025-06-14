import { sections } from '$lib/data/about.js';
import type * as Model from '$lib/types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
    const out: {
        sections: Array<Model.ScrollableSection>;
    } = {
        sections
    };
    return out;
};
