<script lang="ts">
  import Main from "$lib/components/site/main.svelte";
  import type { PageData } from "./$types.js";
  import EventSection from "./event_section.svelte";
  import Hero from "./hero.svelte";

  const { data }: { data: PageData } = $props();
</script>

<Main class="max-w-6xl mx-auto">
  <Hero />
  <div class="">
    {#each data.sections as section, i (section.id)}
      {@const reverse = i % 2 === 1}
      <EventSection data={section} {reverse} />
      <div class="w-1/6 mx-auto h-96"></div>
    {/each}
  </div>
</Main>
