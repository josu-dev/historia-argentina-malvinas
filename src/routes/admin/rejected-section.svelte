<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { T } from "$lib/server/db/index.js";
  import FilterPanel from "./filter-panel.svelte";
  import RequestCardContent from "./request-card-content.svelte";
  import RequestCardEmpty from "./request-card-empty.svelte";
  import RequestCardHeader from "./request-card-header.svelte";
  import RequestCard from "./request-card.svelte";
  import SectionHeader from "./section-header.svelte";
  import type { EventsTitles, RequestItems } from "./shared.js";
  import { format_date } from "./shared.js";

  type Props = {
    events_titles: EventsTitles;
    rejecteds: RequestItems<T.ExperienceRejected>;
  };

  const { events_titles, rejecteds }: Props = $props();

  let filtered_rejecteds: RequestItems<T.ExperienceRejected> = $state([]);

  function handle_rejection_deletion(id: T.ExperienceRejected["id"]) {}
</script>

<section class="relative">
  <SectionHeader title="Rejected Experiences">
    {#snippet title_badge()}
      <Badge variant="secondary" class="bg-red-100 text-red-800">
        {filtered_rejecteds.length} rejected
      </Badge>
    {/snippet}
  </SectionHeader>

  <div class="flex-1 space-y-4 p-4 md:p-8">
    <FilterPanel
      {events_titles}
      items={rejecteds}
      item_to_text={({ event, experience, request }) => {
        const out = experience.title + experience.author_fullname + event.title + request.reason;
        return out;
      }}
      bind:filtered_items={filtered_rejecteds}
      placeholder="Search experiences, authors, events, or rejection reasons..."
    />

    <ul class="space-y-6">
      {#each filtered_rejecteds as item}
        <RequestCard class="w-full">
          <RequestCardHeader
            event={item.event}
            experience={item.experience}
            action_date="Rejected: {format_date(item.request.created_at)}"
          >
            {#snippet status_badge()}
              <Badge variant="destructive">Rejected</Badge>
            {/snippet}
          </RequestCardHeader>
          <RequestCardContent event={item.event} experience={item.experience} request={item.request}>
            {#snippet before_experience()}
              <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div class="flex items-start gap-2">
                  <div class="space-y-1">
                    <h4 class="font-medium text-red-900">Rejection Reason</h4>
                    <p class="text-sm text-red-800">{item.request.reason}</p>
                  </div>
                </div>
              </div>
            {/snippet}
            {#snippet actions()}
              <Dialog.Root>
                <Dialog.Trigger>
                  {#snippet child({ props })}
                    <Button {...props} variant="destructive" class="flex items-center gap-2">
                      <!-- <Trash2 class="h-4 w-4" /> -->
                      Delete Permanently
                    </Button>
                  {/snippet}
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Permanently Delete Experience</Dialog.Title>
                    <Dialog.Description>
                      This action cannot be undone. The experience will be permanently removed from the database.
                      Consider if you might want to re-review this experience in the future before deleting.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div class="space-y-4">
                    <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <div class="flex items-start gap-2">
                        <!-- <AlertTriangle class="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" /> -->
                        <div>
                          <h4 class="font-medium text-red-900">{item.experience.title}</h4>
                          <p class="text-sm text-red-800">by {item.experience.author_fullname}</p>
                          <p class="text-xs text-red-600 mt-1">This will be permanently deleted</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog.Footer>
                    <Dialog.Close>
                      {#snippet child({ props })}
                        <Button {...props} variant="outline">Cancel</Button>
                      {/snippet}
                    </Dialog.Close>
                    <Button variant="destructive" onclick={() => handle_rejection_deletion(item.request.id)}>
                      Delete Permanently
                    </Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Root>
            {/snippet}
          </RequestCardContent>
        </RequestCard>
      {:else}
        <RequestCardEmpty total_count={rejecteds.length} message="No rejected experiences found" />
      {/each}
    </ul>
  </div>
</section>
