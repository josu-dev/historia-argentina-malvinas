import type { NewExperienceSchema } from '$lib/server/schemas.js';
import type * as Model from '$lib/types.js';
import type { Infer, SuperValidated } from 'sveltekit-superforms';

export interface ScrollableSectionProps<T extends Model.ScrollableSection> {
    data: T;
    reverse: boolean;
    i: number;
}

export interface EventSectionProps extends ScrollableSectionProps<Model.EventSectionWithExperiences> {
    on_experiences: (arg_0: Model.EventSectionWithExperiences) => void;
}

export interface ExperienceContentProps {
    experience: Model.EventExperience;
}

export interface ExperiencesDialogProps {
    initial?: {
        open?: boolean;
        event?: Model.EventSectionWithExperiences;
    };
    on_add?: (arg_0: { id: string; }) => void;
}

export interface ExperienceFormProps {
    initial?: {
        open?: boolean;
        event?: Model.EventSectionWithExperiences;
    };
    data: SuperValidated<Infer<NewExperienceSchema>>;
}
