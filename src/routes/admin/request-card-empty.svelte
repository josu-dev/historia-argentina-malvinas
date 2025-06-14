<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import RequestCard from "./request-card.svelte";

  type Props = {
    total_count: number;
    message: string;
  };
  const { total_count, message }: Props = $props();
</script>

<RequestCard class="w-full">
  <Card.Content class="flex flex-col items-center justify-center py-12">
    <!-- <XCircle class="h-12 w-12 text-muted-foreground mb-4" /> -->
    <h3 class="text-lg font-semibold mb-2">{message}</h3>
    <p class="text-muted-foreground text-center">
      {total_count === 0
        ? "There are no approved experiences at the moment."
        : "Try adjusting your filters to see more results."}
    </p>
  </Card.Content>
</RequestCard>
