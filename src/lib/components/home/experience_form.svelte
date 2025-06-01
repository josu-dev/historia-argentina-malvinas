<script lang="ts">
  import Button from '$lib/components/element/Button.svelte';
    import Input from '$lib/components/element/Input.svelte';
    import Textarea from '$lib/components/element/Textarea.svelte';
  import type { ExperienceFormProps } from '$lib/components/home/impl.js';
  import { mutable } from '$lib/utils.svelte.js';
  import { Dialog } from 'bits-ui';

  const {}: ExperienceFormProps = $props();

  const dialog_open = mutable(false);
  let section_id: string;

  let form = $state({
    title: '',
    text: '',
    day: '',
    month: '',
    year: '',
    fullname: '',
    perspective: '',
  });

  function reset_form() {
    form = {
      title: '',
      text: '',
      day: '',
      month: '',
      year: '',
      fullname: '',
      perspective: '',
    };
  }

  export function open_for(id: string): void {
    section_id = id;
    reset_form();
    dialog_open.set(true);
  }
  const sending = mutable(false);

  async function send_experience() {
    if (sending.get()) {
      return;
    }
    sending.set(true);
    fetch(`/api/events/${section_id}/experiences`, {
      method: 'post',
      body: JSON.stringify({
        section_id: section_id,
        ...$state.snapshot(form),
      }),
    })
      .then((r) => {
        if (r.ok) {
          reset_form();
          return;
        }
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      })
      .finally(() => {
        sending.set(false);
      });
  }
  $effect(() => {
  open_for('');
  })
</script>

<Dialog.Root bind:open={dialog_open.get, dialog_open.set}>
  <Dialog.Portal>
    <!-- <Dialog.Overlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    /> -->
    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-1rem)] sm:max-w-[min(80%,64rem)] translate-x-[-50%] translate-y-[-50%] flex flex-col
      data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    >
      <div class="h-[75vh] bg-orange-200 text-bluish-dark-brown py-6 px-4 flex flex-col">
        <div class="flex justify-end">
          <Dialog.Close>
            {#snippet child({ props })}
              <Button {...props}>Cerrar</Button>
            {/snippet}
          </Dialog.Close>
        </div>
        <div class="overflow-y-auto pl-2 pr-2 overflow-x-clip gutter-stable scrollbar:bg-transparent scrollbar:w-2 scrollbar-thumb:bg-black/75">
          <div>
            <h2 class="font-medium text-2xl">Cargar Experiencia</h2>
          </div>
            <div class="flex flex-col gap-2 mt-2">
              <div class="flex flex-col gap-y-1">
                <label for="" class="font-medium">Titulo</label>
                <Input type="text"/>
              </div>
              <div class="flex flex-col gap-y-1">
                <label for="" class="font-medium">Fecha</label>
                <Input type="text"/>
              </div>

              <div class="flex flex-col gap-y-1">
                <label for="" class="font-medium">Experiencia</label>
                <Textarea />
              </div>

              <div class="flex flex-col gap-y-1">
                <div>Author:</div>
                <div class="flex gap-x-2">
                  <div class="flex flex-col gap-y-1">
                    <label for="" class="font-medium">Nombre</label>
                    <Input type="text"/>
                  </div>
  
                  <div class="flex flex-col gap-y-1">
                    <label for="" class="font-medium">Perspectiva</label>
                    <Input type="text"/>
                  </div>
                </div>
              </div>
            </div>
          <div class="flex justify-end mt-auto">
            <Button onclick={send_experience} disabled={sending.get()}>Enviar</Button>
          </div>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
