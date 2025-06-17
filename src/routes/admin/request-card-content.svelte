<script lang="ts" generics="RequestType extends Record<string, unknown>">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { Snippet } from "svelte";
  import type { RequestItem } from "./shared.js";

  type Props = {
    before_experience?: Snippet;
    actions: Snippet;
  } & RequestItem<RequestType>;

  const { event, experience, before_experience, actions }: Props = $props();
</script>

<Card.Content>
  <div class="space-y-4">
    {@render before_experience?.()}

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
              class="link"
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
        <!-- <div>
          <span class="font-medium">Originally Submitted: </span>
          <span class="text-muted-foreground">{format_date(experience.created_at)}</span>
        </div> -->
      </div>
    </div>

    <div class="space-y-2">
      <h4 class="font-medium">Experience Content:</h4>
      <div class="bg-muted/50 p-4 rounded-lg">
        <p class="text-sm leading-relaxed whitespace-pre-wrap line-clamp-3">
          {experience.content}
        </p>
      </div>
    </div>

    <div class="flex gap-2 pt-4">
      {@render actions()}
    </div>
  </div>
</Card.Content>
