<script lang="ts">
  import Main from "$lib/components/site/main.svelte";
  import Metadata from "$lib/components/site/metadata.svelte";
  import type { PageData } from "./$types.js";
  import Section from "./section.svelte";
  import Hero from "./hero.svelte";

  const { data }: { data: PageData } = $props();
</script>

<Metadata
  title="Acerca De"
  description="Malvinas, una mirada renovada. Descubre el propósito de este Trabajo Final Integrador de Diseño UX de la UNLP sobre la Guerra de Malvinas. Explora nuestro enfoque de diseño, la tipografía Lexend, y el compromiso con la accesibilidad y responsividad."
/>

<Main class="max-w-6xl mx-auto">
  <Hero />
  <div class="">
    {#each data.sections as section, i (section.id)}
      {@const reverse = i % 2 === 1}
      <Section data={section} {reverse} />
      <div class="w-1/6 mx-auto h-96"></div>
    {/each}
  </div>
</Main>
