<script lang="ts">
  import * as Scrollable from "$lib/components/scrollable/index.js";
  import Main from "$lib/components/site/main.svelte";
  import Metadata from "$lib/components/site/metadata.svelte";
  import type { PageData } from "./$types.js";

  const { data }: { data: PageData } = $props();
</script>

<Metadata
  title="Acerca De"
  description="Malvinas, una mirada renovada. Descubre el propósito de este Trabajo Final Integrador de Diseño UX de la UNLP sobre la Guerra de Malvinas. Explora nuestro enfoque de diseño, la tipografía Lexend, y el compromiso con la accesibilidad y responsividad."
/>

<Main class="max-w-6xl mx-auto">
  <Scrollable.Hero>
    <span>Acerca De</span>
    <p class="text-2xl font-normal mt-[2lh]">Información sobre el ¿por qué?, ¿cómo? y ¿con qué? se implemento el sitio</p>
  </Scrollable.Hero>
  <div class="">
    {#each data.sections as section, i (section.id)}
      <Scrollable.Root {i}>
        {#snippet slot_image()}
          <div class="h-[50vh]">
            <svg viewBox="0 0 303.09 238.66" style="width: 100%; height: 100%;">
              <defs>
                <clipPath id="theclippathid{i}">
                  <path
                    d="M300.64,118.61h0q-4.2-7-8.39-14h0c-.82-3.15-5.19-3.48-5.58-7-1-2.57-.35-6.09-4.14-7h0l-.08,0A49.13,49.13,0,0,0,271.6,78.05c-.15-.39-.28-.79-.4-1.19h0c-2.44-8-5.56-15.63-12.45-21h0c-1.62.51-3.38.76-4.41,2.37h0c-1.69-1.23-.24-4-2.42-5h0c-2.31-1.48-5.44-1.69-6.94-4.44h0c-.74-3.09-4.14-1.2-5.57-3h0L237.9,44.5h0c-2-6.09-7.8-7.38-12.66-9.82h0c-1-8.31-4.6-12.28-11.21-12.33h0c-.29-1.88,5.7-3.66.1-5.62h0l-2.66-1.5L210,13.73h0l-8.43-2.68h0c-7.43-2.75-14.46-7.13-23.06-3.81-6.86,2.66-13.18,1.48-18.22-4.47-2.39-2.81-5.09-4.46-7.68,0l-2.76.07h0c-1.59-.22-3.15-.33-4.28,1.15h0c-4.06.63-7.89-.72-11.45-2.14-9-3.58-18,.84-27.17-.36C100.84.64,94,5.08,87,2.94a11.51,11.51,0,0,0-7.5.73C61.3,11,41.87,14,23.29,19.8,16.6,21.9,9.55,22.4,3.08,25.14h0c-3.39,3.3-4.83,6.58.16,9.74h0l0,0c-1,5.79,2.72,8.46,9.78,7h0c3.36,7.25,10.63,12,12.61,20.22,1.23,5,.72,10.75,5.93,14.42,2,1.37.66,3.79-.69,5.52h0c-.37,1-.73,2.07-1.1,3.1h0q-1.42,9.7-2.87,19.4l-1.09.38h0c-2.73,1.62-1.21,4.35-1.72,6.55-3.79.53-2.39,3.35-2.44,5.53h0c0,2.46-1.23,5.15,1.21,7.21h0c-.06.46-.12.93-.17,1.39h0c-5,1.46-1.68,5.59-2.71,8.33-.12,1.1,0,2.3-1.2,3h0c-1,2.3-2.07,4.61-3.1,6.91-2.33,2.55-4,5.49-1.48,8.57,3.74,4.67,7.9,9,11.88,13.47,1.36,1.52,3.17,1.71,5,1.65h0l1.32,1.7h0l1.24,1.26,1.7,2.61h0l4,2.81q1.39,2.22,2.8,4.44h0c2.14,1.67.19,5.95,4.12,6.49h0a3.93,3.93,0,0,0,.23,4.37h0c1.41,4,5.35,4.15,8.5,5.49a9.47,9.47,0,0,0,6.79,1.48h0a11.31,11.31,0,0,0,1.15.15l1.77,2.56h0c1.12,2.42,2.52.58,3.82.25h0a4.06,4.06,0,0,0,2.86,2.43h0l3,.21h0l1.27.07c1.65,3.34,5.64,3.65,8,6.15,1,1,1.71-.74,1.91-1.88h0c1.87.84.52,3.65,2.66,4.32h0c.26,2.52,2.51,3,4.18,4h0c.32,3.37,3.87,2.54,5.49,4.22h0c4.33,4.07,10,6.71,12.69,12.49,2.34,3.58,4.42,7.8,9.81,4.15,2.56-1.87,9.92,5.78,8.37-4.22l2.73-4.15h0l.09-1.33,2.8-.05c5.46,3.3,8.43-.11,11.16-4.14h0l1.69-1.34h0c3.46-1.8,7.4,1.27,10.77-1,8.63-5.7,18.33-9.62,26.56-16-.91-2.61,3-3,2.5-5.43h0c3.54-1.52,7.17-2.93,8.92-6.8h0a25.21,25.21,0,0,0,15.14-11.44,7.88,7.88,0,0,0,5.69-2.68h0l8.4-5.39c2.4-.75,3.63-2.9,5.35-4.46h0l2.88-1.4c2.74,0,3.15-2.42,4.23-4.13h0c3.5-.85,8.78,2.25,9.69-4.35h0a9,9,0,0,1,.09-1.27h0c3.9-1.5,9-.62,11.1-5.69h0c0-3.85,4.45-1.63,5.5-4h0c.5-1.4,1-2.8,1.51-4.21h0c2.69.57,4-1.45,5.7-2.9,2.76.3,4.57-1.79,6.85-2.71,3.4-2.13,6.76-4.31,8.64-8.07h0l1.24-.37h0l4-1.38h0l8.36-2.79C302.76,123.26,304.91,121,300.64,118.61ZM4.7,34.82h0Zm0,0h0l.09-.08,0,.17Zm233,128.28,0-.05.15.28Z"
                  />
                </clipPath>
              </defs>
              <image
                href={section.img.src}
                aria-label={`Imagen ilustrativa para la sección de ${section.title}.`}
                clip-path="url(#theclippathid{i})"
                width="303.09"
                height="238.66"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>
          </div>
        {/snippet}
        {#snippet slot_content()}
          <Scrollable.Title id={section.id}>{section.title}</Scrollable.Title>
          <Scrollable.Content content={section.content}></Scrollable.Content>
        {/snippet}
      </Scrollable.Root>
      <div class="w-1/6 mx-auto h-[40vh]"></div>
    {/each}
  </div>
</Main>
