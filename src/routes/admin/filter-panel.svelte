<script lang="ts" generics="RequestType extends Record<string, unknown>">
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import type { EventsTitles, RequestItem, RequestItems } from "./shared.js";

  type Props = {
    events_titles: EventsTitles;
    items: RequestItems<RequestType>;
    item_to_text: (value: RequestItem<RequestType>) => string;
    filtered_items: RequestItems<RequestType>;
    placeholder: string;
  };

  let { events_titles, items, item_to_text, filtered_items = $bindable(), placeholder }: Props = $props();
  let search_query = $state("");
  let filter_event = $state("@");

  const unique_events = $derived(new Set(events_titles.map((v) => v.title)));
  const items_as_text = $derived.by(() => {
    const out = [];
    for (const item of items) {
      out.push(item_to_text(item).toLowerCase());
    }
    return out;
  });

  $effect(() => {
    const new_items = [];
    const query = search_query.trim().toLowerCase();
    const check_event = filter_event !== "@";
    for (let i = 0; i < items_as_text.length; i++) {
      const item = items[i];
      if (check_event && filter_event !== item.event.title) {
        continue;
      }
      if (!items_as_text[i].includes(query)) {
        continue;
      }
      new_items.push(item);
    }
    filtered_items = new_items;
  });
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="text-base">Filters</Card.Title>
  </Card.Header>
  <Card.Content>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <div class="relative">
          <!-- <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /> -->
          <Input {placeholder} value={search_query} onchange={(e) => (search_query = e.currentTarget.value)} class="" />
        </div>
      </div>
      <Select.Root type="single" bind:value={filter_event}>
        <Select.Trigger class="w-full md:w-[200px]">
          <!-- <Select.Value placeholder="Filter by event" /> -->
          {filter_event === "@" ? "All events" : filter_event}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="@">All Events</Select.Item>
          {#each unique_events as event}
            <Select.Item value={event}>
              {event}
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
  </Card.Content>
</Card.Root>
