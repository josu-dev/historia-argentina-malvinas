<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    el?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children: Snippet;
  } & HTMLAttributes<HTMLElement>;

  const { el = "h2", children, class: classes, ...restprops }: Props = $props();
</script>

<svelte:element
  this={el}
  class="text-4xl font-bold text-pretty text-pale-yellow uppercase scroll-mt-16 {classes}"
  {...restprops}
>
  {@render children()}
</svelte:element>
