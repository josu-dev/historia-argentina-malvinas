import { untrack } from 'svelte';

export type Async<T> = Promise<T>;

export type AsyncArray<T> = Promise<Array<T>>;

export type AsyncOptional<T> = Promise<undefined | T>;

export type Pretty<T> = {
    [K in keyof T]: T[K];
} & {};


export function uuidv4(): string {
    // crypto.randomUUID is not available in secure contexts. in that case
    // fallback to basic implementation
    const out = crypto.randomUUID?.() ?? Array.from(crypto.getRandomValues(new Uint8Array(18)), b => b.toString(16).padStart(2, '0')).join('');
    return out;
}


export function effect_once(fn: () => (void | (() => void))): void {
    $effect(() => {
        const cleanup = untrack(fn);
        return cleanup;
    });
}


export type MutableReader<T> = () => T;

type MutableUpdater<T> = T | ((prev: T) => T);

export type MutableSetter<T> = (value: MutableUpdater<T>) => T;

export type Mutable<T> = {
    get: MutableReader<T>,
    set: MutableSetter<T>;
};

export function mutable<T>(value: T): Mutable<T> {
    let derived = $state(value);

    function get(): T {
        return derived;
    }

    function set(value: MutableUpdater<T>): T {
        const new_value = typeof value === 'function' ? (value as (prev: T) => T)(derived) : value;
        derived = new_value;
        return new_value;
    }

    return { get, set };
}

export function string_to_number(str: unknown, min: number, max: number) {
    if (typeof str !== 'string') {
        return undefined;
    }
    const num = parseInt(str, 10);
    if (isNaN(num) || num < min || num > max) {
        return undefined;
    }
    return num;
}

export function sp_with(url: URL, key: string, value: string | boolean | number | undefined) {
    const sp = new URLSearchParams(url.search);
    if (value === undefined) {
        sp.delete(key);
    }
    else {
        sp.set(key, value.toString());
    }
    return sp;
}
