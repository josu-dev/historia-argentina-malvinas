<script lang="ts">
  import { page } from "$app/state";
  import ExperienceForm, { EXPERIENCE_FORM_SPK } from "$lib/components/home/experience_form.svelte";
  import ExperienceDialog from "$lib/components/home/experiences_dialog.svelte";
  import Hero from "$lib/components/home/hero.svelte";
  import EventSection from "$lib/components/home/section.svelte";
  import Main from "$lib/components/site/main.svelte";
  import Metadata from "$lib/components/site/metadata.svelte";
  import type * as Model from "$lib/types.js";
  import { string_to_number } from "$lib/utils.svelte.js";
  import { untrack } from "svelte";
  import type { PageData } from "./$types.js";

  const { data }: { data: PageData } = $props();

  const initial_event_i = string_to_number(page.url.searchParams.get("event_i"), 0, data.sections.length);
  const initial_event = initial_event_i !== undefined ? data.sections[initial_event_i] : undefined;
  const initial_experience_form_open = page.url.searchParams.has(EXPERIENCE_FORM_SPK);

  let dialog: ExperienceDialog;

  function on_experiences(value: Model.EventSectionWithExperiences) {
    untrack(() => dialog.open_for(value));
  }

  let experience_form: ExperienceForm;
</script>

<Metadata
  description="Este proyecto explora la Guerra de Malvinas desde una perspectiva renovada y accesible. Descubre cronologías, hechos y testimonios a través de un diseño UX inmersivo y una experiencia responsiva."
/>

<Main class="max-w-6xl mx-auto">
  <Hero />
  <div class="">
    {#each data.sections as section, i (section.id)}
      {@const reverse = i % 2 === 1}
      <EventSection data={section} {reverse} {on_experiences} {i} />
      <div class="w-1/6 mx-auto h-96"></div>
    {/each}
  </div>
</Main>

<ExperienceDialog
  bind:this={dialog}
  initial={{
    open: initial_event !== undefined,
    event: initial_event,
  }}
  on_add={({ id }) => {
    experience_form.open_for(id);
  }}
/>

<ExperienceForm
  bind:this={experience_form}
  data={data.experience_form}
  initial={{
    open: initial_experience_form_open,
    event: initial_event,
  }}
/>
