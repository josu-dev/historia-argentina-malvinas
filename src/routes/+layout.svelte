<script lang="ts">
  import AppMenu from '$lib/components/site/app_menu.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<AppMenu />

{@render children()}
