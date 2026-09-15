<script setup lang="ts">
// Marks a guideline that is not a settled published one: a draft (live, still
// being tested) or a deprecated guideline. Neutral on purpose — severity stays
// the only color accent (PLAN §6).
const props = defineProps<{ status: string }>()
</script>

<template>
  <span
    v-if="props.status !== 'published'"
    class="inline-flex items-center rounded-full border border-line px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted"
  >{{ props.status }}</span>
</template>
