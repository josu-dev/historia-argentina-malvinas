<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";

  type Props = {
    type: NonNullable<HTMLInputTypeAttribute>;
  } & HTMLInputAttributes;

  let { children, class: classes, value = $bindable(), ...rest_props }: Props = $props();
</script>

<input
  {...rest_props}
  bind:value
  class="py-1 px-1.5 disabled:opacity-75 bg-transparent border focus:outline-0 border-bluish-dark-brown ring-0 focus:ring-0 {classes}"
/>
