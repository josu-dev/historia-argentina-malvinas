export type DateString = string;

export interface DetailedDate {
    utc: string;
    day: number;
    month: number;
    year: number;
    dd_month: string;
}

export interface DetailedImage {
    src: string;
    width: number;
    height: number;
    alt: string | null;
}

export interface DetailedImageInit {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
}

export type RenderableContent = Array<string>;

export interface RenderableContentAttr {
    content: RenderableContent;
}

export interface ScrollableSection extends RenderableContentAttr {
    id: string;
    title: string;
    img: DetailedImage;
}

export interface ScrollableSectionInit {
    id: string;
    title: string;
    content: Array<string>;
    img_url: string;
    img_width: number;
    img_height: number;
    img_alt: string;
}

export interface AuthorAttr {
    author_email: string;
    author_fullname: string;
    author_perspective: string;
    author_website: string | null;
}

export type PublicAuthorAttr = Omit<AuthorAttr, 'author_email'>;

export interface EventExperience extends RenderableContentAttr, PublicAuthorAttr {
    id: string;
    event_id: string;
    title: string;
    date: DateString;
}

export interface EventSection extends ScrollableSection {
    date: DetailedDate;
    summary: string;
}

export interface EventSectionInit extends ScrollableSectionInit {
    date: string;
    summary: string;
}

export interface EventSectionWithExperiences extends EventSection {
    experiences: Array<EventExperience>;
}
