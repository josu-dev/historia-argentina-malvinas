<script lang="ts">
  import { page } from "$app/state";
  import {
    DEFAULT_FONT_FAMILY,
    DEFAULT_FONT_SIZE,
    DEFAULT_GRAPHICS_VISIBILITY,
    DEFAULT_LINE_HEIGHT,
  } from "$lib/constants.js";
  import { mutable } from "$lib/utils.svelte.js";
  import { Dialog, Select, Toggle } from "bits-ui";
  import Button from "../element/Button.svelte";

  type Props = {};

  const {}: Props = $props();

  const dialog_open = mutable(false);

  const font_families = [
    { value: "lexend", label: "Lexend" },
    { value: "opendyslexic", label: "Open Dyslexic" },
  ];
  let font_family = $state(DEFAULT_FONT_FAMILY);
  $effect(() => {
    document.documentElement.dataset.font = font_family;
  });

  const font_sizes = [
    { value: "12", label: "12 pt" },
    { value: "14", label: "14 pt" },
    { value: "16", label: "16 pt" },
    { value: "18", label: "18 pt" },
    { value: "20", label: "20 pt" },
    { value: "24", label: "24 pt" },
    { value: "36", label: "36 pt" },
  ];
  let font_size = $state(DEFAULT_FONT_SIZE);
  $effect(() => {
    document.documentElement.dataset.fontSize = font_size;
  });

  const line_heights = [
    { value: "1", label: "1" },
    { value: "1.25", label: "1.25" },
    { value: "1.5", label: "1.5" },
    { value: "1.75", label: "1.75" },
    { value: "2", label: "2" },
  ];
  let line_height = $state(DEFAULT_LINE_HEIGHT);
  $effect(() => {
    document.documentElement.dataset.lineHeight = line_height;
  });

  let graphics_visibility = $state(DEFAULT_GRAPHICS_VISIBILITY);
  $effect(() => {
    if (graphics_visibility) {
      delete document.documentElement.dataset.hideGraphics;
    } else {
      document.documentElement.dataset.hideGraphics = "";
    }
  });

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

        <div class="flex flex-col gap-3">
          <div class="flex gap-3 justify-between">
            {@render OptionLabel("option-font-family", "Fuente")}
            {@render FontFamilyInput()}
          </div>
          <div class="flex gap-3 justify-between">
            {@render OptionLabel("option-font-size", "Tamaño de letra")}
            {@render FontSizeInput()}
          </div>
          <div class="flex gap-3 justify-between">
            {@render OptionLabel("option-line-height", "Tamaño de linea")}
            {@render LineHeightInput()}
          </div>
          <div class="flex gap-3 justify-between">
            {@render OptionLabel("option-font-size", "Graficos visibles")}
            {@render GraphicsVisibilityInput()}
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

{#snippet FontFamilyInput()}
  <Select.Root type="single" value={font_family} onValueChange={(v) => (font_family = v)} items={font_families}>
    <Select.Trigger
      class="w-[14ch] text-center -translate-y-0.5 translate-x-5 border-2 border-transparent data-[state=open]:border-bluish-dark-brown"
    >
      {font_families.find((f) => f.value === font_family)?.label}
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        class="bg-orange-200 border-2 border-t-0 border-bluish-dark-brown text-lg z-50 max-h-[50vh] w-[var(--bits-select-anchor-width)] text-center overflow-y-auto overflow-x-clip scrollbar:bg-transparent scrollbar:w-1 scrollbar-thumb:bg-black"
        side="bottom"
        alignOffset={0}
        sideOffset={0}
        align="center"
      >
        {#each font_families as theme (theme.value)}
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

{#snippet FontSizeInput()}
  <Select.Root type="single" value={font_size} onValueChange={(v) => (font_size = v)} items={font_sizes}>
    <Select.Trigger
      class="w-18 text-center -translate-y-0.5 translate-x-5 border-2 border-transparent data-[state=open]:border-bluish-dark-brown"
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

{#snippet LineHeightInput()}
  <Select.Root type="single" value={line_height} onValueChange={(v) => (line_height = v)} items={line_heights}>
    <Select.Trigger
      class="w-18 text-center -translate-y-0.5 translate-x-5 border-2 border-transparent data-[state=open]:border-bluish-dark-brown"
    >
      {line_height}
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        class="bg-orange-200 border-2 border-t-0 border-bluish-dark-brown text-lg z-50 max-h-[50vh] w-[var(--bits-select-anchor-width)] text-center overflow-y-auto overflow-x-clip scrollbar:bg-transparent scrollbar:w-1 scrollbar-thumb:bg-black"
        side="bottom"
        alignOffset={0}
        sideOffset={0}
        align="center"
      >
        {#each line_heights as theme (theme.value)}
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

{#snippet GraphicsVisibilityInput()}
  <div class="">
    <Toggle.Root class="uppercase w-18 translate-x-5" bind:pressed={graphics_visibility}>
      {#if graphics_visibility}
        Si
      {:else}
        No
      {/if}
    </Toggle.Root>
  </div>
{/snippet}
