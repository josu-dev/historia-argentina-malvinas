<script lang="ts">
  type Props = {
    class?: string;
    content: string;
  };

  const { content, class: classes }: Props = $props();
</script>

<div class="space-y-[1lh] mt-[1lh] text-xl whitespace-pre-line {classes}">
  <p>{content}</p>
</div>
