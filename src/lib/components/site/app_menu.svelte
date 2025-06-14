<script lang="ts">
  import { page } from "$app/state";
  import { DEFAULT_FONT_SIZE, DEFAULT_TTS, DEFAULT_TTS_VOLUME } from "$lib/constants.js";
  import { mutable } from "$lib/utils.svelte.js";
  import { Dialog, Select, Slider, Toggle } from "bits-ui";
  import Button from "../element/Button.svelte";

  type Props = {};

  const {}: Props = $props();

  const dialog_open = mutable(false);

  const font_sizes = [
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "16", label: "16" },
    { value: "20", label: "20" },
    { value: "24", label: "24" },
    { value: "32", label: "32" },
    { value: "48", label: "48" },
    { value: "64", label: "64" },
  ];

  let font_size = $state(DEFAULT_FONT_SIZE);

  let tts_enabled = $state(DEFAULT_TTS);

  let tts_volume = $state(DEFAULT_TTS_VOLUME);

  let current_page = $derived(page.url.pathname);
</script>

<Dialog.Root bind:open={dialog_open.get, dialog_open.set}>
  <div class="absolute top-0 right-2 flex justify-end py-4">
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} class="leading-none">Menu</Button>
      {/snippet}
    </Dialog.Trigger>
  </div>

  <Dialog.Portal>
    <Dialog.Overlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    />
    <Dialog.Content
      class="fixed right-0 top-0 z-50 flex flex-col
      data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    >
      <div class="bg-orange-200 text-bluish-dark-brown py-6 px-6 flex flex-col gap-6 text-lg font-medium uppercase">
        <div class="flex justify-end -mr-2">
          <Dialog.Close>
            {#snippet child({ props })}
              <Button {...props}>Cerrar</Button>
            {/snippet}
          </Dialog.Close>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex gap-4 justify-between">
            {@render OptionLabel("option-font-size", "Tamaño de letra")}
            {@render FontSizeInput()}
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex gap-4 justify-between">
              {@render OptionLabel("option-font-size", "Texto a voz")}
              {@render TTSToggleInput()}
            </div>
            {@render TTSVolumeInput()}
          </div>
        </div>

        <div class="mt-12">
          {#if current_page === "/"}
            <a
              href="/about"
              onclick={() => {
                dialog_open.set(false);
              }}
            >
              Acerca de
            </a>
          {:else}
            <a
              href="/"
              onclick={() => {
                dialog_open.set(false);
              }}
            >
              Inicio
            </a>
          {/if}
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

{#snippet OptionLabel(input_id: string, text: string)}
  <label for={input_id} class="">{text}</label>
{/snippet}

{#snippet FontSizeInput()}
  <Select.Root type="single" value={font_size} onValueChange={(v) => (font_size = v)} items={font_sizes}>
    <Select.Trigger
      class="w-16 text-center -translate-y-0.5 translate-x-5 border-2 border-transparent data-[state=open]:border-bluish-dark-brown"
    >
      {font_size}
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        class="bg-orange-200 border-2 border-t-0 border-bluish-dark-brown text-lg z-50 max-h-[50vh] w-[var(--bits-select-anchor-width)] text-center overflow-y-auto overflow-x-clip scrollbar:bg-transparent scrollbar:w-1 scrollbar-thumb:bg-black"
        side="bottom"
        alignOffset={0}
        sideOffset={0}
        align="center"
      >
        {#each font_sizes as theme (theme.value)}
          <Select.Item
            class="text-bluish-dark-brown cursor-pointer data-selected:bg-bluish-dark-brown data-selected:text-greenish-white data-highlighted:!bg-pale-grass w-full px-2"
            value={theme.value}
            label={theme.label}
          >
            {#snippet children({ selected })}
              {theme.label}
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Portal>
  </Select.Root>
{/snippet}

{#snippet TTSToggleInput()}
  <div class="">
    <Toggle.Root class="uppercase" bind:pressed={tts_enabled}>
      {#if tts_enabled}
        Si
      {:else}
        No
      {/if}
    </Toggle.Root>
  </div>
{/snippet}

{#snippet TTSVolumeInput()}
  <div class="gap-4 flex">
    <Slider.Root type="single" bind:value={tts_volume} class="w-48 relative flex touch-none items-center">
      <span class="bg-transparent relative h-2.5 w-full cursor-pointer overflow-hidden border border-bluish-dark-brown">
        <Slider.Range class="bg-bluish-dark-brown absolute h-full" />
      </span>
      <Slider.Thumb index={0} class="bg-bluish-dark-brown block size-5 cursor-pointer" />
    </Slider.Root>

    <div class="w-[7ch] text-right">
      {tts_volume} %
    </div>
  </div>
{/snippet}
