<script lang="ts">
  import { scrollY } from "svelte/reactivity/window";

  let disabled = $derived(true);

  $effect(() => {
    disabled = scrollY.current! < window.innerHeight * 1.5;
  });
</script>

<div class="flex justify-end py-4 px-2 pointer-events-none js:fixed js:right-0 js:bottom-0 js:z-10">
  <a
    href="#top"
    class="pointer-events-auto uppercase font-medium px-2 py-1.5 bg-bluish-dark-brown/75 js:data-disabled:hidden"
    data-disabled={disabled ? "" : undefined}
  >
    Ir arriba
  </a>
</div>
