<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    i?: number;
    slot_image: Snippet;
    slot_line?: Snippet;
    slot_content: Snippet;
  };
  let { i = 0, slot_image, slot_line, slot_content }: Props = $props();
</script>

<div
  data-direction={i % 2 === 0 ? "ltr" : "rtl"}
  class="flex-col flex lg:flex-row min-h-screen max-w-[90vw] mx-auto lg:mx-0 lg:max-w-full relative lg:data-[direction=rtl]:flex-row-reverse"
>
  <div class="flex justify-center lg:w-5/12 lg:sticky lg:top-0 lg:h-screen">
    <div class="py-16 px-4 grid items-center">
      {@render slot_image()}
    </div>
  </div>
  <div class="lg:w-1/12 lg:sticky lg:top-0 lg:h-screen">
    {@render slot_line?.()}
  </div>
  <div class="lg:w-1/2">
    <div class="py-16 px-4">
      {@render slot_content()}
    </div>
  </div>
</div>
