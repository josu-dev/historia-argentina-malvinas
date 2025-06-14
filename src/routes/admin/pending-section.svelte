<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import type { T } from "$lib/server/db/index.js";
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types.js";
  import FilterPanel from "./filter-panel.svelte";
  import RequestCardContent from "./request-card-content.svelte";
  import RequestCardEmpty from "./request-card-empty.svelte";
  import RequestCardHeader from "./request-card-header.svelte";
  import RequestCard from "./request-card.svelte";
  import SectionHeader from "./section-header.svelte";
  import { format_date, type EventsTitles, type RequestItems } from "./shared.js";

  type Props = {
    events_titles: EventsTitles;
    pendings: RequestItems<T.ExperienceRequest>;
    data: Pick<PageData, "approve_request_form" | "reject_request_form">;
    on_experience_preview: (event: T.Event, experience: T.Experience) => void;
  };
  const { data, events_titles, pendings, on_experience_preview }: Props = $props();

  let filtered_pendings: RequestItems<T.ExperienceApproved> = $state([]);
  const approve_form = superForm(data.approve_request_form);
  const reject_form = superForm(data.reject_request_form);
</script>

<section class="relative">
  <SectionHeader title="Pending Experiences">
    {#snippet title_badge()}
      <Badge variant="secondary">
        {pendings.length} pending
      </Badge>
    {/snippet}
  </SectionHeader>

  <div class="flex-1 space-y-4 p-4 md:p-8">
    <FilterPanel
      {events_titles}
      items={pendings}
      item_to_text={({ event, experience }) => {
        const out = experience.title + experience.author_fullname + event.title;
        return out;
      }}
      bind:filtered_items={filtered_pendings}
      placeholder="Search experiences, authors or events..."
    />

    <ul class="space-y-6">
      {#each filtered_pendings as { experience, event, request } (request.id)}
        <RequestCard class="w-full">
          <RequestCardHeader {event} {experience} action_date="Submitted: {format_date(request.created_at)}">
            {#snippet status_badge()}
              <Badge variant="default">Review Pending</Badge>
            {/snippet}
          </RequestCardHeader>
          <RequestCardContent {event} {experience} {request}>
            {#snippet actions()}
              <form method="post" action="?/approve_request" use:approve_form.enhance>
                <input type="hidden" name="id" value={request.id} />
                <Form.Button class="flex items-center gap-2">Approve</Form.Button>
              </form>

              <Dialog.Root>
                <Dialog.Trigger>
                  {#snippet child({ props })}
                    <Button variant="destructive" class="flex items-center gap-2" {...props}>Reject</Button>
                  {/snippet}
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Reject Experience Request</Dialog.Title>
                    <Dialog.Description>
                      Please provide a reason for rejecting this experience. This will help the author understand what
                      needs to be improved.
                    </Dialog.Description>
                  </Dialog.Header>
                  <form method="post" action="?/reject_request" id="reject-request-form" class="space-y-4">
                    <input type="hidden" name="id" value={request.id} />
                    <Form.Field form={reject_form} name="reason">
                      <Form.Control>
                        {#snippet children({ props })}
                          <Form.Label>Rejection Reason</Form.Label>
                          <Textarea
                            {...props}
                            placeholder="Please explain why this experience is being rejected..."
                            class="resize-none mt-2"
                          />
                        {/snippet}
                      </Form.Control>
                      <Form.FieldErrors />
                    </Form.Field>
                  </form>
                  <Dialog.Footer>
                    <Dialog.Close>
                      {#snippet child({ props })}
                        <Button variant="outline" {...props}>Cancel</Button>
                      {/snippet}
                    </Dialog.Close>
                    <Button type="submit" form="reject-request-form" variant="destructive">Reject Experience</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Root>

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
        <RequestCardEmpty total_count={pendings.length} message="No pending experiences found" />
      {/each}
    </ul>
  </div>
</section>
