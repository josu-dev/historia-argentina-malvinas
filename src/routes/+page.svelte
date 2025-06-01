<script lang="ts">
  import ExperienceDialog from '$lib/components/home/experiences_dialog.svelte';
  import Hero from '$lib/components/home/hero.svelte';
  import EventSection from '$lib/components/home/section.svelte';
  import type { MalvinasSection } from '$lib/shared/malvinas.js';
  import { untrack } from 'svelte';
  import { sections } from './data.js';

  const {} = $props();

  let dialog: ExperienceDialog;

  function on_experiences(value: MalvinasSection) {
    untrack(() => dialog.open_with(value.experiences));
  }

  $effect(() => {
    on_experiences(sections[0]);
  });
</script>

<main class="max-w-6xl mx-auto">
  <Hero />
  <div class="">
    {#each sections as section, i (section.id)}
      {@const reverse = i % 2 === 1}
      <EventSection data={section} {reverse} {on_experiences} />
      <div class="w-1/6 mx-auto h-96"></div>
    {/each}
  </div>
</main>

<ExperienceDialog data={sections[0].experiences} bind:this={dialog} />
