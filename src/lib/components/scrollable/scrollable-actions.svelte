<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    class?: string;
    children: Snippet;
  };

  const { children, class: classes }: Props = $props();
</script>

<div class="flex justify-center mt-16 {classes}">
  {@render children()}
</div>
