<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    class?: string;
    children: Snippet;
  };

  const { children, class: classes }: Props = $props();
</script>

<div class="h-screen">
  <h1 class="text-6xl gap-[0.5lh] flex flex-col justify-center text-center font-bold h-full text-bluish-white {classes}">
    {@render children()}
  </h1>
</div>
