<script lang="ts" module>
  export const EXPERIENCE_I_SPK = "exp_i";
</script>

<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/element/Button.svelte";
  import type * as Model from "$lib/types.js";
  import { mutable, sp_with, string_to_number } from "$lib/utils.svelte.js";
  import { Dialog } from "bits-ui";
  import ExperienceContent from "./experience-content.svelte";
  import { EXPERIENCE_FORM_SPK } from "./experience-form-dialog.svelte";

  type Props = {
    initial?: {
      open?: boolean;
      event?: Model.EventSectionWithExperiences;
    };
    on_new_experience: (event: Model.EventSection) => void;
  };
  const { initial = {}, on_new_experience }: Props = $props();

  const dialog_open = mutable(initial.open ?? false);
  let event = $derived(initial.event);
  let experiences = $derived(event?.experiences ?? []);
  // svelte-ignore state_referenced_locally
  let curr_i = $state(string_to_number(page.url.searchParams.get(EXPERIENCE_I_SPK), 0, experiences?.length ?? 0) ?? 0);

  const prev_available = $derived(experiences.length > 0 && curr_i > 0);
  const prev_href = $derived(
    `${prev_available ? "?" + sp_with(page.url, EXPERIENCE_I_SPK, curr_i - 1) : page.url.search}#${event?.id}`,
  );
  const next_available = $derived(curr_i < experiences.length - 1);
  const next_href = $derived(
    `${next_available ? "?" + sp_with(page.url, EXPERIENCE_I_SPK, curr_i + 1) : page.url.search}#${event?.id}`,
  );
  const exp = $derived.by(() => {
    const current =
      curr_i >= experiences.length ? (undefined as unknown as Model.EventExperience) : experiences[curr_i];
    const out = {
      current: current,
    };
    return out;
  });

  // svelte-ignore state_referenced_locally
  const add_href = `?${sp_with(page.url, EXPERIENCE_FORM_SPK, "")}#${event?.id}`;
  function handle_add() {
    if (event === undefined) {
      return;
    }
    on_new_experience({...event});
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
  <Dialog.Portal disabled={initial.open}>
    <Dialog.Overlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    />
    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-1rem)] sm:max-w-[min(80%,64rem)] translate-x-[-50%] translate-y-[-50%] flex flex-col
      data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    >
      <div class="h-[80vh] bg-orange-200 text-bluish-dark-brown py-6 px-4 flex flex-col gap-4">
        <div class="flex justify-between">
          <Button href={add_href} class="js:hidden">Agregar</Button>
          <Button onclick={handle_add} class="not-js:hidden">Agregar</Button>
          <Dialog.Close>
            {#snippet child({ props })}
              <Button {...props} href="?#{event?.id}" class="js:hidden">Cerrar</Button>
              <Button {...props} class="not-js:hidden">Cerrar</Button>
            {/snippet}
          </Dialog.Close>
        </div>

        <div class="overflow-hidden">
          {#if exp.current}
            <ExperienceContent data={exp.current} />
          {:else}
            <div class="p-2 text-lg">Ninguna experiencia fue agregada para este suceso.</div>
          {/if}
        </div>

        <div class="flex justify-end mt-auto">
          <Button href={prev_href} class="js:hidden">Anterior</Button>
          <Button onclick={handle_prev} disabled={!prev_available} class="not-js:hidden">Anterior</Button>
          <Button href={next_href} class="js:hidden">Siguiente</Button>
          <Button onclick={handle_next} disabled={!next_available} class="not-js:hidden">Siguiente</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
