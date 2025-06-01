<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = {
    children: Snippet;
  } & HTMLButtonAttributes;

  let { children, class: classes, ...rest_props }: Props = $props();
</script>

<button
  {...rest_props}
  class="uppercase font-medium px-2 py-1.5 disabled:opacity-75 {classes}"
>
  {@render children()}
</button>
