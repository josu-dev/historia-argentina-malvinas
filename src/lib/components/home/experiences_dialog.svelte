<script lang="ts">
  import Button from "$lib/components/element/Button.svelte";
  import ExperienceContent from "$lib/components/home/experience_content.svelte";
  import type { ExperiencesDialogProps } from "$lib/components/home/impl.js";
  import type * as Model from "$lib/types.js";
  import { mutable } from "$lib/utils.svelte.js";
  import { Dialog } from "bits-ui";

  const { event: default_event, open = false, on_add }: ExperiencesDialogProps = $props();
  let event = $derived(default_event);
  let experiences = $derived(event?.experiences ?? []);
  let curr_i = $state(0);

  const prev_available = $derived(experiences.length > 0 && curr_i > 0);
  const next_available = $derived(curr_i < experiences.length - 1);
  const exp = $derived.by(() => {
    const current =
      curr_i >= experiences.length ? (undefined as unknown as Model.EventExperience) : experiences[curr_i];
    const out = {
      current: current,
    };
    return out;
  });

  const dialog_open = mutable(open);

  function handle_add() {
    if (event === undefined || on_add === undefined) {
      return;
    }
    on_add({ id: event.id });
  }

  function handle_prev() {
    if (experiences.length === 0 || curr_i === 0) {
      return;
    }
    curr_i -= 1;
  }

  function handle_next() {
    if (curr_i >= experiences.length) {
      return;
    }
    curr_i += 1;
  }

  export function open_for(value: Model.EventSectionWithExperiences): void {
    event = value;
    dialog_open.set(true);
  }
</script>

<Dialog.Root bind:open={dialog_open.get, dialog_open.set}>
  <Dialog.Portal>
    <Dialog.Overlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    />
    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-1rem)] sm:max-w-[min(80%,64rem)] translate-x-[-50%] translate-y-[-50%] flex flex-col
      data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    >
      <div class="h-[75vh] bg-orange-200 text-bluish-dark-brown py-6 px-4 flex flex-col gap-4">
        <div class="flex justify-between">
          <Button onclick={handle_add}>Agregar</Button>
          <Dialog.Close>
            {#snippet child({ props })}
              <Button {...props}>Cerrar</Button>
            {/snippet}
          </Dialog.Close>
        </div>

        <div class="overflow-hidden">
          {#if exp.current}
            <ExperienceContent experience={exp.current} />
          {:else}
            <div>No experience</div>
          {/if}
        </div>

        <div class="flex justify-end mt-auto">
          <Button onclick={handle_prev} disabled={!prev_available}>Anterior</Button>
          <Button onclick={handle_next} disabled={!next_available}>Siguiente</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
