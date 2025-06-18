<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  type Props = {} & HTMLTextareaAttributes;

  let { class: classes, value = $bindable(), ...restprops }: Props = $props();
</script>

<textarea
  bind:value
  spellcheck="true"
  class="py-1 px-1.5 min-h-[calc(8px+3lh)] max-h-[calc(8px+6lh)] w-full bg-transparent border border-bluish-dark-brown resize-y disabled:opacity-75 gutter-stable scrollbar-thin {classes}"
  {...restprops}
></textarea>
