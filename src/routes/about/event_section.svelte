<script lang="ts">
  import type * as Model from "$lib/types.js";

  type Props = {
    data: Model.ScrollableSection;
    reverse: boolean;
  };

  const { data, reverse }: Props = $props();
</script>

<div data-from={reverse ? "right" : "left"} class="flex min-h-screen relative data-[from=right]:flex-row-reverse">
  <div class="flex w-5/12 sticky top-0 h-screen">
    <div class="py-16 px-4 grid items-center">
      <div class="h-[50vh]">
        <img
          src={data.img.src}
          alt={data.img.alt ?? `Ilustration image for ${data.title} historic event.`}
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
  <div class="w-1/12"></div>
  <div class="w-1/2">
    <div class="py-16 px-4">
      <h2 class="text-4xl font-bold text-pretty text-pale-yellow">{data.title}</h2>
      <div class="space-y-[1lh] mt-[1lh] text-xl text- *:indent-[0.5ch]">
        <p>{data.content}</p>
      </div>
    </div>
  </div>
</div>
