<script lang="ts">
  import EventSection from '$lib/components/about/event_section.svelte';
  import Hero from '$lib/components/about/hero.svelte';
  import { sections } from './data.js';

  const {} = $props();
</script>

<main class="max-w-6xl mx-auto">
  <Hero />
  <div class="">
    {#each sections as section, i (section.id)}
      {@const reverse = i % 2 === 1}
      <EventSection data={section} {reverse} />
      <div class="w-1/6 mx-auto h-96"></div>
    {/each}
  </div>
</main>
