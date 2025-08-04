<script lang="ts">
  import Main from "$lib/components/site/main.svelte";
  import Metadata from "$lib/components/site/metadata.svelte";
</script>

<Metadata
  title="Compartir"
  description="Este proyecto explora la Guerra de Malvinas desde una perspectiva renovada y accesible. Descubre cronologías, hechos y testimonios a través de un diseño UX inmersivo y una experiencia responsiva."
/>

<Main class="absolute inset-0 max-w-6xl mx-auto lg:px-4">
  <div class="flex flex-col gap-y-16 lg:flex-row justify-center items-center h-full">
    <div class="lg:w-1/2 text-center font-bold text-bluish-white">
      <h1 class="text-6xl">Compartir</h1>
      <p class="text-2xl font-normal mt-[1.5lh] max-w-[90vw]">
        Escanéa el código QR para acceder al contenido desde otro dispositivo.
      </p>
    </div>
    <div class="w-full lg:w-1/2">
      <img
        src="/imgs/site_qr.png"
        width="200"
        height="200"
        alt="Código QR con la URL de la pagina"
        class="[image-rendering:crisp-edges] object-contain aspect-square w-[clamp(16rem,40vw,24rem)] mx-auto"
      />
    </div>
  </div>
</Main>
