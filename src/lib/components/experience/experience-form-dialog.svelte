<script lang="ts" module>
  export const EXPERIENCE_FORM_SPK = "exp_form_open";
</script>

<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/element/Button.svelte";
  import Input from "$lib/components/element/Input.svelte";
  import Textarea from "$lib/components/element/Textarea.svelte";
  import type { NewExperienceSchema } from "$lib/server/schemas.js";
  import type * as Model from "$lib/types.js";
  import { mutable, sp_with } from "$lib/utils.svelte.js";
  import { Dialog } from "bits-ui";
  import type { Infer, SuperValidated } from "sveltekit-superforms";
  import { superForm } from "sveltekit-superforms/client";
  import FormField from "./experience-form-field.svelte";

  type Props = {
    initial?: {
      open?: boolean;
      event?: Model.EventSection;
    };
    data: SuperValidated<Infer<NewExperienceSchema>>;
  };

  const { data, initial = {} }: Props = $props();

  const initial_open = initial.open ?? false;
  const initial_event_id = initial.event?.id;

  const close_sp = sp_with(page.url, EXPERIENCE_FORM_SPK, undefined);
  close_sp.delete("/new_experience");
  const close_href = `?${close_sp}#${initial_event_id}`;
  const form_action = `?${sp_with(page.url, "/new_experience", "")}#${initial_event_id}`;

  const dialog_open = mutable(initial_open);
  let event = $state(initial.event);

  const form = superForm(data);

  export function open_for(value: Model.EventSection): void {
    event = value;
    form.reset({ data: { event_id: event.id } });
    dialog_open.set(true);
  }
</script>

<Dialog.Root bind:open={dialog_open.get, dialog_open.set}>
  <Dialog.Portal disabled={initial_open}>
    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-1rem)] sm:max-w-[min(80%,64rem)] translate-x-[-50%] translate-y-[-50%] flex flex-col
      data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    >
      <div class="h-[80vh] bg-orange-200 text-bluish-dark-brown py-6 px-4 flex flex-col">
        <div>
          <div class="flex justify-between">
            <Dialog.Title class="pl-2 font-medium text-2xl uppercase">Nueva Experiencia</Dialog.Title>
            <Dialog.Close>
              {#snippet child({ props })}
                <Button href={close_href} class="js:hidden">Cerrar</Button>
                <Button {...props} class="not-js:hidden">Cerrar</Button>
              {/snippet}
            </Dialog.Close>
          </div>
          <Dialog.Description class="px-2 my-2 text-sm">
            Comparte una experiencia relacionada al evento de "{event?.title}" con el resto de visitantes del sitio
          </Dialog.Description>
        </div>
        <form
          method="post"
          action={form_action}
          use:form.enhance
          class="overflow-y-auto py-2 px-2 overflow-x-clip gutter-stable scrollbar-thin"
        >
          <div class="flex flex-col gap-2">
            <Input type="hidden" name="event_id" value={event?.id} />
            <FormField {form} name="title" label="Titulo">
              {#snippet children({ props, get, set })}
                <Input type="text" bind:value={get, set} {...props} />
              {/snippet}
            </FormField>
            <FormField {form} name="date" label="Fecha">
              {#snippet children({ props, get, set })}
                <Input type="text" bind:value={get, set} {...props} />
              {/snippet}
            </FormField>
            <FormField {form} name="content" label="Experiencia">
              {#snippet children({ props, get, set })}
                <Textarea {...props} bind:value={get, set} />
              {/snippet}
            </FormField>
            <div class="space-y-2">
              <div class="text-xl">Sobre el autor</div>
              <div class="flex flex-col md:flex-row gap-x-6">
                <FormField {form} name="author_fullname" label="Nombre completo">
                  {#snippet children({ props, get, set })}
                    <Input type="text" bind:value={get, set} {...props} />
                  {/snippet}
                </FormField>
                <FormField {form} name="author_perspective" label="Perspectiva o rol">
                  {#snippet children({ props, get, set })}
                    <Input type="text" bind:value={get, set} {...props} />
                  {/snippet}
                </FormField>
              </div>
              <div class="flex flex-col md:flex-row gap-x-6">
                <FormField {form} name="author_email" label="Email de contacto">
                  {#snippet children({ props, get, set })}
                    <Input type="email" bind:value={get, set} {...props} />
                  {/snippet}
                </FormField>
                <FormField {form} name="author_website" label="Pagina web">
                  {#snippet children({ props, get, set })}
                    <Input type="url" bind:value={get, set} {...props} />
                  {/snippet}
                </FormField>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <Button type="submit" class="text-xl">Enviar</Button>
          </div>
        </form>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
