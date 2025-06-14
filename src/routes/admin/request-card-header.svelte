<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import type { T } from "$lib/server/db/index.js";
  import type { Snippet } from "svelte";

  type Props = {
    event: T.Event;
    experience: T.Experience;
    action_date: string;
    status_badge?: Snippet;
  };

  const { event, experience, action_date, status_badge }: Props = $props();
</script>

<Card.Header>
  <div class="flex items-start justify-between">
    <Card.Title class="text-xl">{experience.title}</Card.Title>
    {@render status_badge?.()}
  </div>
  <Card.Description class="flex items-center gap-4 mt-1">
    <span class="flex items-center gap-1">
      Event: {event.title}
    </span>
    <span class="flex items-center gap-1">
      {action_date}
    </span>
  </Card.Description>
</Card.Header>
