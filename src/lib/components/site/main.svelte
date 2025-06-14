<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = SvelteHTMLElements["main"] & { children: Snippet };

  const { children, ...restprops }: Props = $props();
</script>

<main id="main" {...restprops}>
  {@render children()}
</main>
