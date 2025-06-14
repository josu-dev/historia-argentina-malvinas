import type * as Model from '$lib/types.js';

function make_detailed_image({ src, width = 512, height = 512, alt }: Model.DetailedImageInit): Model.DetailedImage {
    if (alt == undefined || alt.length === 0) {
        const file_name = src.slice(src.lastIndexOf('/'));
        alt = file_name.slice(0, file_name.indexOf('.')).split('_').map(w => w[0].toLocaleUpperCase() + w.slice(1)).join(' ');
    }
    const out: Model.DetailedImage = {
        src: src,
        width: width ?? 512,
        height: height ?? 512,
        alt: alt
    };
    return out;
}

function make_detailed_date(utc_date: string): Model.DetailedDate {
    const date = new Date(utc_date);
    const out: Model.DetailedDate = {
        utc: utc_date,
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
    };
    return out;
}

export function make_scrollable_section({ id, title, content, img_alt, img_height, img_url, img_width }: Model.ScrollableSectionInit): Model.ScrollableSection {
    const out: Model.ScrollableSection = {
        id: id,
        title: title,
        content: content,
        img: make_detailed_image({ src: img_url, alt: img_alt, height: img_height, width: img_width })
    };
    return out;
}

export function make_event_section({ date, ...rest }: Model.EventSectionInit): Model.EventSection {
    const out: Model.EventSection = {
        ...make_scrollable_section(rest),
        date: make_detailed_date(date),
    };
    return out;
}
