<script lang="ts">
  import { Separator } from 'bits-ui';
  import type { ExperienceContentProps } from './impl.js';

  const { data }: ExperienceContentProps = $props();
</script>

{#snippet separator(orientation: 'vertical' | 'horizontal' = 'horizontal')}
  <Separator.Root
    {orientation}
    class="bg-black/25 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:my-4 data-[orientation=vertical]:w-px data-[orientation=vertical]:h-full data-[orientation=vertical]:mx-2 shrink-0"
  />
{/snippet}

<div class="flex flex-col border py-4 px-4 bg-orange-300 border-stone-600 flex-1 max-h-full">
  <div></div>
  <div class="text-center text-pretty text-2xl font-semibold mt-[0.5em]">
    {data.title}
  </div>
  {@render separator()}
  <div class="text-lg leading-snug overflow-y-auto overflow-x-clip px-2 scrollbar:bg-transparent scrollbar-thumb:bg-black/50 scrollbar:w-1.5">
    {#each data.content.items as item}
      <div>{item}</div>
    {/each}
  </div>
  {@render separator()}
  <div class="mb-2 text-sm px-2">
    <div>
      {#if data.author.website}
        {@const attrs = data.author.website.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' }}
        <a href={data.author.website} {...attrs}>
          <span>{data.author.fullname},</span>
        </a>
      {:else}
        <span>{data.author.fullname},</span>
      {/if}
      <span>{data.author.perspective}</span>
    </div>
    <div>
      <span>{new Date(data.date).toLocaleDateString()}</span>
    </div>
  </div>
</div>
