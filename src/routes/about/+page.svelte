<script lang="ts">
  import * as Scrollable from "$lib/components/scrollable/index.js";
  import Main from "$lib/components/site/main.svelte";
  import Metadata from "$lib/components/site/metadata.svelte";
  import type { PageData } from "./$types.js";

  const { data }: { data: PageData } = $props();
</script>

<Metadata
  title="Acerca De"
  description="Malvinas, una mirada renovada. Descubre el propósito de este Trabajo Final Integrador de Diseño UX de la UNLP sobre la Guerra de Malvinas. Explora nuestro enfoque de diseño, la tipografía Lexend, y el compromiso con la accesibilidad y responsividad."
/>

<Main class="max-w-6xl mx-auto">
  <Scrollable.Hero>
    <span>Acerca De</span>
  </Scrollable.Hero>
  <div class="">
    {#each data.sections as section, i (section.id)}
      <Scrollable.Root {i}>
        {#snippet slot_image()}
          <div class="h-[50vh]">
            <img
              src={section.img.src}
              alt={section.img.alt ?? `Imagen ilustrativa para la sección de ${section.title}.`}
              class="w-full h-full object-cover"
            />
          </div>
        {/snippet}
        {#snippet slot_content()}
          <Scrollable.Title id={section.id}>{section.title}</Scrollable.Title>
          <Scrollable.Content content={section.content}></Scrollable.Content>
        {/snippet}
      </Scrollable.Root>
      <div class="w-1/6 mx-auto h-[40vh]"></div>
    {/each}
  </div>
</Main>
