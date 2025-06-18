<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";

  type Props = {
    type: NonNullable<HTMLInputTypeAttribute>;
  } & HTMLInputAttributes;

  let { class: classes, value = $bindable(), ...restprops }: Props = $props();
</script>

<input
  bind:value
  spellcheck="true"
  class="py-1 px-1.5 w-full bg-transparent border border-bluish-dark-brown disabled:opacity-75 {classes}"
  {...restprops}
/>
