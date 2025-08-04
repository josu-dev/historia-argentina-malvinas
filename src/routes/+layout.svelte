<script lang="ts">
  import AppMenu from "$lib/components/site/app_menu.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  {@html `<script>(function() { document.documentElement.setAttribute("data-js-enabled", ""); })();</script>`}
</svelte:head>

<AppMenu />

{@render children()}
