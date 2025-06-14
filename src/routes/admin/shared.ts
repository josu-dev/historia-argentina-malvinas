import type { T } from '$lib/server/db/index.js';

export function format_date(date: string) {
    return new Date(date).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export type EventsTitles = Array<Pick<T.Event, 'id' | 'title'>>;

export type LookupRecord<T extends { id: any; }> = Record<T['id'], T>;

export function make_lookup_record<T extends { id: any; }>(values: Array<T>): LookupRecord<T> {
    const out = {} as Record<T['id'], T>;
    for (const v of values) {
        out[v.id as T['id']] = v;
    }
    return out;
}

export type RequestItem<V extends Record<string, unknown>> = {
    event: T.Event,
    experience: T.Experience,
    request: V;
};

export type RequestItems<V extends Record<string, unknown>> = Array<RequestItem<V>>;

export function make_request_items<T extends { experience_id: string; }>(
    events: LookupRecord<T.Event>,
    experiences: LookupRecord<T.Experience>,
    requests: Array<T>,
): Array<RequestItem<T>> {
    const out: Array<RequestItem<T>> = new Array(requests.length);
    for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        const experience = experiences[request.experience_id];
        out[i] = {
            event: events[experience.event_id],
            experience: experience,
            request: request,
        };
    }
    return out;
}
