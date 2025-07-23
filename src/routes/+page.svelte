<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/element/Button.svelte";
  import ExperienceFormDialog, { EXPERIENCE_FORM_SPK } from "$lib/components/experience/experience-form-dialog.svelte";
  import ExperiencesDialog from "$lib/components/experience/experiences-dialog.svelte";
  import Hero from "$lib/components/site/hero.svelte";
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

  let dialog: ExperiencesDialog;

  function on_experiences(value: Model.EventSectionWithExperiences) {
    untrack(() => dialog.open_for(value));
  }

  let experience_form: ExperienceFormDialog;
</script>

<Metadata
  description="Este proyecto explora la Guerra de Malvinas desde una perspectiva renovada y accesible. Descubre cronologías, hechos y testimonios a través de un diseño UX inmersivo y una experiencia responsiva."
/>

<Main class="max-w-6xl mx-auto isolate lg:px-4">
  <Hero>
    <span>Historia Argentina</span>
    <span>Malvinas</span>
    <p class="text-2xl font-normal mt-[2lh]">
      Cronología narrativa de los sucesos y eventos ocurridos en el año 1982 durante la Guerra de Malvinas
    </p>
  </Hero>
  <div class="space-y-64 lg:space-y-96">
    {#each data.sections as section, i (section.id)}
      {@const ltr = i % 2 === 0}
      <article aria-labelledby={section.id} class="flex-col flex gap-64 max-w-[90vw] mx-auto lg:mx-0 lg:max-w-full">
        <div
          class="grid grid-rows-[auto_1fr] lg:grid-rows-1 {ltr ? 'lg:grid-cols-[40%_60%]' : 'lg:grid-cols-[60%_40%]'}"
        >
          <div
            class="lg:sticky top-0 h-full max-h-[80vh] pt-16 row-start-1 {ltr ? 'lg:col-start-1' : 'lg:col-start-2'}"
          >
            <div class="h-[60vh]">
              <img
                src={section.img.src}
                width={section.img.width}
                height={section.img.height}
                alt={section.img.alt}
                class="h-full object-cover rounded {ltr ? 'lg:mask-l-from-20%' : 'lg:mask-r-from-20%'}"
              />
            </div>
          </div>
          <div
            class="grid grid-cols-1 grid-rows-1 lg:row-start-1 {ltr
              ? 'lg:col-start-2 lg:pl-16'
              : 'lg:col-start-1 lg:pr-16'}"
          >
            <header class="col-start-1 row-start-1 lg:sticky top-0 z-10 h-full max-h-[80vh] pointer-events-none">
              <div class=" pt-8 pb-12 bg-bluish-dark-brown mask-b-from-[calc(100%-2rem)]">
                <div class="text-2xl font-semibold text-greenish-white/85 uppercase pointer-events-auto">
                  <time datetime={section.date.utc}>{section.date.dd_month}</time>
                </div>
                <div class="pointer-events-auto">
                  <h2 id={section.id} class="text-4xl font-bold text-pale-yellow uppercase scroll-mt-16 mt-[0.25lh]">
                    {section.title}
                  </h2>
                </div>
              </div>
            </header>
            <div class="flex flex-col col-start-1 row-start-1 col-span-1 row-span-1">
              <div class="pt-8 pb-12 invisible" aria-hidden="true">
                <div class="text-2xl uppercase">{section.date.dd_month}</div>
                <div class="text-4xl font-bold uppercase mt-[0.25lh]">{section.title}</div>
              </div>
              {#if section.summary.length === 0}
                <div class="space-y-4 text-xl">
                  {#each section.content as p}
                    <p>{p}</p>
                  {/each}
                </div>
              {:else}
                <div class="text-xl">
                  <p class="leading-relaxed mb-4">{section.summary}</p>
                  <details class="group px-2">
                    <summary class="block">
                      <span class="inline-block transition-transform group-open:rotate-90" aria-hidden="true"> ► </span>
                      <span>Leer mas</span>
                    </summary>
                    <div class="mt-5 space-y-4">
                      {#each section.content as p}
                        <p>{p}</p>
                      {/each}
                    </div>
                  </details>
                </div>
              {/if}
              <div class="flex py-16 mt-auto">
                <Button href="?event_i={i}#{section.id}" class="text-pale-yellow !font-semibold text-2xl js:hidden">
                  Ver experiencias
                </Button>
                <Button
                  onclick={() => on_experiences(section)}
                  class="text-pale-yellow !font-semibold text-2xl not-js:hidden"
                >
                  Ver experiencias
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    {/each}
  </div>
</Main>

<ExperiencesDialog
  bind:this={dialog}
  initial={{
    open: initial_event !== undefined,
    event: initial_event,
  }}
  on_new_experience={(event) => {
    experience_form.open_for(event);
  }}
/>

<ExperienceFormDialog
  bind:this={experience_form}
  data={data.experience_form}
  initial={{
    open: initial_experience_form_open,
    event: initial_event,
  }}
/>
