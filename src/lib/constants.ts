export const SITE_DOMAIN = "malvinas-argentinas.vercel.app";

export const SITE_NAME = "Historia Argentina Malvinas";

export const DEFAULT_METADATA = {
    icon: "/favicon.png",
    manifest: "/manifest.json",
    site_name: SITE_NAME,
    theme_color: "#3f2421",
    background_color: "#3f2421",
    title_default: SITE_NAME,
    title_template: "%s - " + SITE_NAME,
    image: {
        url: `https://${SITE_DOMAIN}/imgs/banner.png`,
        alt: SITE_NAME + " banner",
        width: "1200",
        height: "630"
    },
    language_tag: "es"
} as const;

export const DEFAULT_SITE_USER_PREFERS = {
    font_family: "lexend",
    font_size: "16",
    line_height: "1",
    graphics_visible: true
} as const;
