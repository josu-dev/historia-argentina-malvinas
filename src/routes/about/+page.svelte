<script lang="ts">
  import Hero from "$lib/components/site/hero.svelte";
  import Main from "$lib/components/site/main.svelte";
  import Metadata from "$lib/components/site/metadata.svelte";
  import type { PageData } from "./$types.js";

  const { data }: { data: PageData } = $props();
</script>

<Metadata
  title="Acerca De"
  description="Malvinas, una mirada renovada. Descubre el propósito de este Trabajo Final Integrador de Diseño UX de la UNLP sobre la Guerra de Malvinas. Explora nuestro enfoque de diseño, la tipografía Lexend, y el compromiso con la accesibilidad y responsividad."
/>

<Main class="max-w-6xl mx-auto lg:px-4">
  <Hero>
    <span>Acerca De</span>
    <p class="text-2xl font-normal mt-[2lh]">
      Información sobre el ¿por qué?, ¿cómo? y ¿con qué? se implemento el sitio
    </p>
  </Hero>
  <div class="space-y-64 lg:space-y-96">
    {#each data.sections as section, i (section.id)}
      {@const ltr = i % 2 === 0}
      <article class="flex-col flex gap-64 max-w-[90vw] mx-auto lg:mx-0 lg:max-w-full">
        <div class="grid grid-rows-[auto_1fr] {ltr ? 'lg:grid-cols-[40%_60%]' : 'lg:grid-cols-[60%_40%]'}">
          <div
            class="lg:sticky top-0 h-full max-h-[80vh] pt-16 row-start-1 {ltr ? 'lg:col-start-1' : 'lg:col-start-2'}"
          >
            <div class="h-[60vh]">
              <img
                src={section.img.src}
                width={section.img.width}
                height={section.img.height}
                alt={section.img.alt}
                class="h-full object-cover rounded {ltr
                  ? 'lg:mask-l-from-20% lg:mask-l-to-black/5'
                  : 'lg:mask-r-from-20% lg:mask-r-to-black/5'}"
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
                <div class="pointer-events-auto">
                  <h2 class="text-4xl font-bold text-pale-yellow uppercase scroll-mt-16 mt-[0.25lh]">
                    {section.title}
                  </h2>
                </div>
              </div>
            </header>
            <div class="flex flex-col col-start-1 row-start-1 col-span-1 row-span-1">
              <div class="pt-8 pb-12 font-bold uppercase invisible" aria-hidden="true">
                <div class="text-4xl mt-[0.25lh]">{section.title}</div>
              </div>
              <div class="space-y-[1lh] text-xl whitespace-pre-line">
                {#each section.content as p}
                  <p>{p}</p>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </article>
    {/each}
  </div>
</Main>
