<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

  type Props = {
    children: Snippet;
  } & (({ href: string } & HTMLAnchorAttributes) | HTMLButtonAttributes);

  let { children, class: classes, ...restprops }: Props = $props();
  let c = $derived("uppercase font-medium px-2 py-1.5 disabled:opacity-75 " + classes);
</script>

{#if "href" in restprops}
  <a {...restprops} class={c}>
    {@render children()}
  </a>
{:else}
  <button {...restprops} class={c}>
    {@render children()}
  </button>
{/if}
