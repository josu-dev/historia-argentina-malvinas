import type { MalvinasSection, MalvinasExperience } from '$lib/shared/malvinas.js';

export interface HeventProps {
    data: MalvinasSection;
    reverse: boolean;
    on_experiences: (arg_0: MalvinasSection) => void;
}

export interface ExperienceContentProps {
    data: MalvinasExperience
}

export interface ExperiencesDialogProps {
    data: MalvinasSection['experiences'];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExperienceFormProps {
}
