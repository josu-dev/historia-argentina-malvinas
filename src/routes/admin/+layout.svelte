<script lang="ts">
  import type { Snippet } from "svelte";
  import type { PageData } from "./$types.js";

  const { data, children }: { children: Snippet; data: PageData } = $props();
</script>

{@render children()}
