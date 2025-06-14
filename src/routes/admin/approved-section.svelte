<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
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
    approveds: RequestItems<T.ExperienceApproved>;
    on_experience_preview: (event: T.Event, experience: T.Experience) => void;
  };

  const { events_titles, approveds, on_experience_preview }: Props = $props();

  let filtered_approveds: RequestItems<T.ExperienceApproved> = $state([]);
</script>

<section class="relative">
  <SectionHeader title="Approved Experiences">
    {#snippet title_badge()}
      <Badge variant="secondary" class="bg-green-100 text-green-800">
        {approveds.length} approved
      </Badge>
    {/snippet}
  </SectionHeader>

  <div class="flex-1 space-y-4 p-4 md:p-8">
    <FilterPanel
      {events_titles}
      items={approveds}
      item_to_text={({ event, experience }) => {
        const out = experience.title + experience.author_fullname + event.title;
        return out;
      }}
      bind:filtered_items={filtered_approveds}
      placeholder="Search experiences, authors or events..."
    />

    <ul class="space-y-6">
      {#each filtered_approveds as { event, experience, request }}
        <RequestCard class="w-full">
          <RequestCardHeader {event} {experience} action_date="Approved: {format_date(request.created_at)}">
            {#snippet status_badge()}
              <Badge variant="default" class="bg-green-100 text-green-800">Live on Site</Badge>
            {/snippet}
          </RequestCardHeader>
          <RequestCardContent {event} {experience} {request}>
            {#snippet actions()}
              <Button
                variant="outline"
                class="flex items-center gap-2"
                onclick={() => {
                  on_experience_preview(event, experience);
                }}
              >
                Preview
              </Button>
            {/snippet}
          </RequestCardContent>
        </RequestCard>
      {:else}
        <RequestCardEmpty total_count={approveds.length} message="No approved experiences found" />
      {/each}
    </ul>
  </div>
</section>
