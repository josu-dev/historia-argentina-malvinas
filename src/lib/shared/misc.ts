export interface RenderableContent {
    items: Array<string>;
}

export type DateString = string;

export interface ImageMetadata {
    src: string;
    width: number;
    height: number;
    alt?: string;
}

export interface ImageMetadataInit {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
}

export function image_metadata({ src, width = 512, height = 512, alt }: ImageMetadataInit): ImageMetadata {
    if (alt === undefined || alt.length === 0) {
        const file_name = src.slice(src.lastIndexOf('/'));
        alt = file_name.slice(0, file_name.indexOf('.')).split('_').map(w => w[0].toLocaleUpperCase() + w.slice(1)).join(' ');
    }
    const out: ImageMetadata = {
        src: src,
        width: width,
        height: height,
        alt: alt
    };
    return out;
}
