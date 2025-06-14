<script lang="ts">
  import Button from "$lib/components/element/Button.svelte";
  import Input from "$lib/components/element/Input.svelte";
  import type { ExperienceFormProps } from "$lib/components/home/impl.js";
  import { mutable } from "$lib/utils.svelte.js";
  import { Dialog } from "bits-ui";
  import { Control, Field, FieldErrors, Label } from "formsnap";
  import { superForm } from "sveltekit-superforms/client";

  const { data, initial = {} }: ExperienceFormProps = $props();

  const dialog_open = mutable(initial.open ?? true);
  let section_id = $state("");

  const form = superForm(data);
  const { form: form_field, submitting: form_submitting } = form;

  export function open_for(id: string): void {
    section_id = id;
    form.reset();
    dialog_open.set(true);
  }
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
        {@render Form()}
        <!-- <div
          class="overflow-y-auto pl-2 pr-2 overflow-x-clip gutter-stable scrollbar:bg-transparent scrollbar:w-2 scrollbar-thumb:bg-black/75"
        >
          <div>
            <h2 class="font-medium text-2xl">Cargar Experiencia</h2>
          </div>
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex flex-col gap-y-1">
              <label for="" class="font-medium">Titulo</label>
              <Input type="text" />
            </div>
            <div class="flex flex-col gap-y-1">
              <label for="" class="font-medium">Fecha</label>
              <Input type="text" />
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
                  <Input type="text" />
                </div>

                <div class="flex flex-col gap-y-1">
                  <label for="" class="font-medium">Perspectiva</label>
                  <Input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-auto">
            <Button onclick={send_experience} disabled={sending.get()}>Enviar</Button>
          </div>
        </div> -->
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

{#snippet Form()}
  <form
    method="post"
    action="?/new_experience"
    use:form.enhance
    class="overflow-y-auto pl-2 pr-2 overflow-x-clip gutter-stable scrollbar:bg-transparent scrollbar:w-2 scrollbar-thumb:bg-black/75"
  >
    <div>
      <h2 class="font-medium text-2xl">Cargar Experiencia</h2>
    </div>
    <div class="flex flex-col gap-2 mt-2">
      <Field {form} name="event_id">
        <Control>
          {#snippet children({ props })}
            <Label>Titulo</Label>
            <Input type="hidden" value={section_id} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
      <Field {form} name="title">
        <Control>
          {#snippet children({ props })}
            <Label>Titulo</Label>
            <Input type="text" bind:value={$form_field.title} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
      <Field {form} name="date">
        <Control>
          {#snippet children({ props })}
            <Label>Fecha</Label>
            <Input type="text" bind:value={$form_field.date} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
      <Field {form} name="content">
        <Control>
          {#snippet children({ props })}
            <Label>Experiencia</Label>
            <Input type="text" bind:value={$form_field.content} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
      <Field {form} name="author_fullname">
        <Control>
          {#snippet children({ props })}
            <Label>Nombre completo</Label>
            <Input type="text" bind:value={$form_field.author_fullname} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
      <Field {form} name="author_perspective">
        <Control>
          {#snippet children({ props })}
            <Label>Perspetiva o rol</Label>
            <Input type="text" bind:value={$form_field.author_perspective} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
      <Field {form} name="author_website">
        <Control>
          {#snippet children({ props })}
            <Label>Pagina web</Label>
            <Input type="url" bind:value={$form_field.author_website} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
      <Field {form} name="author_email">
        <Control>
          {#snippet children({ props })}
            <Label>Email de contacto</Label>
            <Input type="text" bind:value={$form_field.author_email} {...props} />
          {/snippet}
        </Control>
        <FieldErrors />
      </Field>
    </div>
    <div class="flex justify-end mt-auto">
      <Button>Enviar</Button>
    </div>
  </form>
{/snippet}
