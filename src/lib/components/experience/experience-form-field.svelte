<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
  import { Control, Field, FieldErrors, Label } from "formsnap";
  import type { Snippet } from "svelte";
  import type { FormPath, SuperForm } from "sveltekit-superforms";

  type Value = T[U];

  type Props = {
    form: SuperForm<T>;
    name: U;
    label: string;
    class?: string;
    children: Snippet<[{ props: Record<string, any>; get: () => Value; set: (v: Value) => void }]>;
  };

  const { form, name, label, children: input, class: classes = "" }: Props = $props();
  const { form: form_data } = form;
</script>

<Field {form} {name}>
  <div class="space-y-2 flex-1 {classes}">
    <Control>
      {#snippet children({ props })}
        <Label class="block has-[+[aria-required=true]]:after:content-['*'] after:ml-1 after:text-red-500">
          {label}
        </Label>
        {@render input({ props, get: () => $form_data[name], set: (v) => ($form_data[name] = v) })}
      {/snippet}
    </Control>
    <FieldErrors />
  </div>
</Field>
