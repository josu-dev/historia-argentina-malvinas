<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import type { ComponentProps } from "svelte";

  type Props = ComponentProps<typeof Card.Root>;

  const props: Props = $props();
</script>

<li class="list-none">
  <Card.Root {...props} />
</li>
