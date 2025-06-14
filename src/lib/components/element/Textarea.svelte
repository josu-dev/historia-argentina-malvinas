<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  type Props = {} & HTMLTextareaAttributes;

  let { children, class: classes, ...rest_props }: Props = $props();
</script>

<textarea {...rest_props} class=" font-medium px-2 py-1.5 disabled:opacity-75 {classes}"></textarea>
