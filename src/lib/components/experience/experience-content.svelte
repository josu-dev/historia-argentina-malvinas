<script lang="ts">
  import type * as Model from "$lib/types.js";
  import { Separator } from "bits-ui";

  type Props = {
    data: Model.EventExperience;
  };
  const { data }: Props = $props();
</script>

{#snippet separator(orientation: "vertical" | "horizontal" = "horizontal")}
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
  <div
    class="text-lg leading-snug overflow-y-auto overflow-x-clip px-2 scrollbar:bg-transparent scrollbar-thumb:bg-black/50 scrollbar:w-1.5"
  >
    <div>{data.content}</div>
  </div>
  {@render separator()}
  <div class="mb-2 text-sm px-2">
    <div>
      {#if data.author_website}
        {@const attrs = data.author_website.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" }}
        <a href={data.author_website} {...attrs}>
          <span>{data.author_fullname},</span>
        </a>
      {:else}
        <span>{data.author_fullname},</span>
      {/if}
      <span>{data.author_perspective}</span>
    </div>
    <div>
      <span>{new Date(data.date).toLocaleDateString()}</span>
    </div>
  </div>
</div>
