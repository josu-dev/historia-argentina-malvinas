<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { t } from "$lib/server/db/index.js";
  import type { Snippet } from "svelte";

  type Props = {
    event: typeof t.event.$inferSelect;
    experience: typeof t.experience.$inferSelect;
    request: Pick<typeof t.experience_request.$inferSelect, "created_at">;
    actions: Snippet;
  };

  const { event, experience, request, actions }: Props = $props();
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title>{experience.title}</Card.Title>
    <Card.Description>
      <span class="flex items-center gap-1">
        Event: {event.title}
      </span>
      <span class="flex items-center gap-1">
        Submitted: {request.created_at}
      </span>
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <!-- <User class="h-4 w-4 text-muted-foreground" /> -->
            <span class="font-medium">{experience.author_fullname}</span>
          </div>
          <div class="flex items-center gap-2">
            <!-- <Mail class="h-4 w-4 text-muted-foreground" /> -->
            <span>{experience.author_email}</span>
          </div>
          {#if experience.author_website}
            <div class="flex items-center gap-2">
              <!-- <Globe class="h-4 w-4 text-muted-foreground" /> -->
              <a
                href={experience.author_website}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:underline"
              >
                {experience.author_website}
              </a>
            </div>
          {/if}
        </div>
        <div class="space-y-2">
          <div>
            <span class="font-medium">Perspective: </span>
            <Badge variant="outline">{experience.author_perspective}</Badge>
          </div>
          <div>
            <span class="font-medium">Experience Date: </span>
            <span>{new Date(experience.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="font-medium">Experience Content:</h4>
        <div class="bg-muted/50 p-4 rounded-lg">
          <p class="text-sm leading-relaxed whitespace-pre-wrap">{experience.content}</p>
        </div>
      </div>

      <div class="flex gap-2 pt-4">
        {@render actions()}
      </div>
    </div>
  </Card.Content>
</Card.Root>

<!-- <form method="post" action="?/approve_request" use:approve_form.enhance>
  <input type="hidden" name="id" value={request.id} />
  <Form.Button class="flex items-center gap-2">
    <CheckCircle class="h-4 w-4" />
    Approve
  </Form.Button>
</form> -->

<!-- <Dialog.Root>
  <Dialog.Trigger>
    <Button variant="destructive" class="flex items-center gap-2">
      <XCircle class="h-4 w-4" />
      Reject
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Reject Experience Request</Dialog.Title>
      <Dialog.Description>
        Please provide a reason for rejecting this experience. This will help the author understand what needs to be
        improved.
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
      </Form.Field> -->
<!-- <div>
                          <Label for="reason">Rejection Reason</Label>
                          <Textarea
                            id="reason"
                            placeholder="Please explain why this experience is being rejected..."
                            value={rejectionReason}
                            onchange={(e) => setRejectionReason(e.currentTarget.value)}
                            class="mt-2"
                          />
                        </div> -->
<!-- </form>
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

<Dialog.Root>
  <Dialog.Trigger>
    <Button variant="outline" class="flex items-center gap-2">
      <Eye class="h-4 w-4" />
      Preview
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="max-w-4xl max-h-[80vh] overflow-y-auto">
    <Dialog.Header>
      <Dialog.Title>{experience.title}</Dialog.Title>
      <Dialog.Description>Preview how this experience will appear on the site</Dialog.Description>
    </Dialog.Header>
    <div class="space-y-4">
      <div class="bg-muted/30 p-6 rounded-lg">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">{experience.title}</h3>
            <Badge>{experience.author_perspective}</Badge>
          </div>
          <div class="text-sm text-muted-foreground">
            {new Date(experience.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div class="prose prose-sm max-w-none">
            <p class="whitespace-pre-wrap">{experience.content}</p>
          </div>
          <div class="text-sm text-muted-foreground border-t pt-4">
            <p>— {experience.author_fullname}</p>
            {#if experience.author_website}
              <a
                href={experience.author_website}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:underline"
              >
                {experience.author_website}
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root> -->
