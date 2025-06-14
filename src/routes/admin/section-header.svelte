<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    title: string;
    title_badge: Snippet;
  };
  const { title, title_badge }: Props = $props();
</script>

<header class="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-bluish-dark-brown gap-2 border-b px-4">
  <div class="flex flex-1 items-center gap-2">
    <h2 class="text-lg font-semibold">{title}</h2>
    {@render title_badge()}
  </div>
</header>
