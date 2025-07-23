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

const months = {
    1: "enero",
    2: "febrero",
    3: "marzo",
    4: "abril",
    5: "mayo",
    6: "junio",
    7: "julio",
    8: "agosto",
    9: "septiembre",
    10: "octubre",
    11: "noviembre",
    12: "diciembre",
};

function make_detailed_date(utc: string): Model.DetailedDate {
    const date = new Date(utc);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const out: Model.DetailedDate = {
        utc: utc,
        day: day,
        month: month,
        year: date.getUTCFullYear(),
        dd_month: `${day} de ${months[month as keyof typeof months]}`
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

export function make_event_section({ date, summary, ...rest }: Model.EventSectionInit): Model.EventSection {
    const out: Model.EventSection = {
        ...make_scrollable_section(rest),
        date: make_detailed_date(date),
        summary: summary,
    };
    return out;
}
