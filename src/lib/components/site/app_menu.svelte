<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/element/Button.svelte";
  import { DEFAULT_SITE_USER_PREFERS } from "$lib/constants.js";
  import { mutable } from "$lib/utils.svelte.js";
  import { Dialog, Select, Toggle } from "bits-ui";

  type Props = {};

  const {}: Props = $props();

  const dialog_open = mutable(false);

  type SiteUserPreferences = {
    font_family: string;
    font_size: string;
    line_height: string;
    graphics_visible: boolean;
  };

  function get_site_user_preferences(): SiteUserPreferences {
    if (typeof localStorage === undefined) {
      return { ...DEFAULT_SITE_USER_PREFERS };
    }
    let value = null;
    try {
      value = JSON.parse(localStorage.getItem("config") ?? "null");
    } catch {}
    if (
      typeof value !== "object" ||
      value == null ||
      !("font_family" in value && "font_size" in value && "line_height" in value && "graphics_visible" in value)
    ) {
      return { ...DEFAULT_SITE_USER_PREFERS };
    }
    return {
      font_family: value.font_family,
      font_size: value.font_size,
      line_height: value.line_height,
      graphics_visible: value.graphics_visible,
    };
  }

  function save_site_user_preferences(): void {
    localStorage.setItem("config", JSON.stringify($state.snapshot(preferences)));
  }

  const preferences = $state(get_site_user_preferences());

  function set_preference<K extends keyof SiteUserPreferences>(key: K, value: SiteUserPreferences[K]): void {
    preferences[key] = value;
    switch (key) {
      case "font_family": {
        document.documentElement.setAttribute("data-font", value as string);
        break;
      }
      case "font_size": {
        document.documentElement.setAttribute("data-font-size", value as string);
        break;
      }
      case "line_height": {
        document.documentElement.setAttribute("data-line-height", value as string);
        break;
      }
      case "graphics_visible": {
        if (value) {
          document.documentElement.removeAttribute("data-hide-graphics");
        } else {
          document.documentElement.setAttribute("data-hide-graphics", "");
        }
        break;
      }
    }
    save_site_user_preferences();
  }

  const font_families = [
    { value: "lexend", label: "Lexend" },
    { value: "opendyslexic", label: "Open Dyslexic" },
  ];

  const font_sizes = [
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "16", label: "16" },
    { value: "18", label: "18" },
    { value: "20", label: "20" },
    { value: "24", label: "24" },
    { value: "36", label: "36" },
  ];

  const line_heights = [
    { value: "1", label: "1" },
    { value: "1.25", label: "1.25" },
    { value: "1.5", label: "1.5" },
    { value: "1.75", label: "1.75" },
    { value: "2", label: "2" },
  ];

  let current_page = $derived(page.url.pathname);
</script>

<svelte:head>
  {@html `<script>(function initialize_from_local_storage() {
  const stored = localStorage.getItem("config") ?? "{}";
  const value = JSON.parse(stored);
  if (value.font_family) {
    document.documentElement.setAttribute("data-font", value.font_family);
  }
  if (value.font_size) {
    document.documentElement.setAttribute("data-font-size", value.font_size);
  }
  if ("graphics_visible" in value) {
    if (value.graphics_visible) {
      document.documentElement.removeAttribute("data-hide-graphics");
    } else {
      document.documentElement.setAttribute("data-hide-graphics", "");
    }
  }
  if (value.line_height) {
    document.documentElement.setAttribute("data-line-height", value.line_height);
  }
})();</script>`}
</svelte:head>

<Dialog.Root bind:open={dialog_open.get, dialog_open.set}>
  <div class="fixed top-0 right-0 z-10 flex justify-end py-4 px-2">
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} class="leading-none bg-bluish-dark-brown/80">Menu</Button>
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
              class="link"
            >
              Acerca de
            </a>
          {:else}
            <a
              href="/"
              onclick={() => {
                dialog_open.set(false);
              }}
              class="link"
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
  <Select.Root
    type="single"
    value={preferences.font_family}
    onValueChange={(v) => set_preference("font_family", v)}
    items={font_families}
  >
    <Select.Trigger
      class="w-[14ch] text-center -translate-y-0.5 translate-x-5 border-2 border-transparent data-[state=open]:border-bluish-dark-brown"
    >
      {font_families.find((f) => f.value === preferences.font_family)?.label}
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
            class="text-bluish-dark-brown cursor-pointer data-selected:bg-bluish-dark-brown data-selected:text-greenish-white data-highlighted:!bg-pale-grass w-full"
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
  <Select.Root
    type="single"
    value={preferences.font_size}
    onValueChange={(v) => set_preference("font_size", v)}
    items={font_sizes}
  >
    <Select.Trigger
      class="w-18 text-center -translate-y-0.5 translate-x-5 border-2 border-transparent data-[state=open]:border-bluish-dark-brown"
    >
      {preferences.font_size}
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
            class="text-bluish-dark-brown cursor-pointer data-selected:bg-bluish-dark-brown data-selected:text-greenish-white data-highlighted:!bg-pale-grass w-full"
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
  <Select.Root
    type="single"
    value={preferences.line_height}
    onValueChange={(v) => set_preference("line_height", v)}
    items={line_heights}
  >
    <Select.Trigger
      class="w-18 text-center -translate-y-0.5 translate-x-5 border-2 border-transparent data-[state=open]:border-bluish-dark-brown"
    >
      {preferences.line_height}
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
            class="text-bluish-dark-brown cursor-pointer data-selected:bg-bluish-dark-brown data-selected:text-greenish-white data-highlighted:!bg-pale-grass w-full"
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
    <Toggle.Root
      class="uppercase w-18 translate-x-5"
      bind:pressed={() => preferences.graphics_visible, (v) => set_preference("graphics_visible", v)}
    >
      {#if preferences.graphics_visible}
        Si
      {:else}
        No
      {/if}
    </Toggle.Root>
  </div>
{/snippet}
