<script lang="ts">
  import { enhance } from "$app/forms";
  import ExperiencesDialog from "$lib/components/experience/experiences-dialog.svelte";
  import Main from "$lib/components/site/main.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import type { T } from "$lib/server/db/index.js";
  import { make_event_section } from "$lib/shared.js";
  import type { PageData } from "./$types.js";
  import ApprovedSection from "./approved-section.svelte";
  import PendingSection from "./pending-section.svelte";
  import RejectedSection from "./rejected-section.svelte";
  import { make_lookup_record, make_request_items } from "./shared.js";

  const { data }: { data: PageData } = $props();

  const events_lookup = $derived(make_lookup_record(data.events));
  const events_titles = $derived(data.events.map((e) => ({ id: e.id, title: e.title })));
  const experiences_lookup = $derived(make_lookup_record(data.experiences));

  let pending_requests = $derived(make_request_items(events_lookup, experiences_lookup, data.requests.pending));
  let approved_requests = $derived(make_request_items(events_lookup, experiences_lookup, data.requests.approved));
  let rejected_requests = $derived(make_request_items(events_lookup, experiences_lookup, data.requests.rejected));

  let experiences_dialog: ExperiencesDialog;

  function open_experience_preview(event: T.Event, experience: T.Experience): void {
    experiences_dialog.open_for({
      ...make_event_section(event),
      experiences: [experience],
    });
  }
</script>

<Main>
  <header class="px-4 flex items-center h-16 border-b">
    <h1 class="text-xl font-semibold">Panel de Administracion</h1>
    <div class="ml-8 flex gap-2">
      <div class="bg-card rounded-md">
        <Button href="/" variant="outline">Inicio</Button>
      </div>
      <form action="/login/logout" method="post" use:enhance class="bg-card rounded-md">
        <Button type="submit" variant="outline">Cerrar sesion</Button>
      </form>
    </div>
  </header>
  <PendingSection {events_titles} pendings={pending_requests} {data} on_experience_preview={open_experience_preview} />
  <ApprovedSection {events_titles} approveds={approved_requests} on_experience_preview={open_experience_preview} />
  <RejectedSection {events_titles} rejecteds={rejected_requests} />
</Main>

<ExperiencesDialog bind:this={experiences_dialog} on_new_experience={() => {}} />
