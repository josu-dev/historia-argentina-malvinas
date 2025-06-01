<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = {
    type: Required<HTMLInputAttributes['type']>;
  } & HTMLInputAttributes;

  let { children, class: classes, ...rest_props }: Props = $props();
</script>

<input
  {...rest_props}
  class="py-1 px-1.5 disabled:opacity-75 bg-transparent border focus:outline-0 border-bluish-dark-brown ring-0 focus:ring-0 {classes}"
/>
