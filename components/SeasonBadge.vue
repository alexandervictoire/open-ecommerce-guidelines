<script setup lang="ts">
import { SEASON_BADGE_LABEL, isSeason } from '~/utils/seasons'

// Marks a guideline that applies in one stretch of the year rather than all of
// it. Filled rather than outlined, so it never reads as a severity — severity
// stays the only strong color accent (PLAN §6).
const props = defineProps<{ season?: string | null }>()
</script>

<template>
  <span
    v-if="isSeason(props.season)"
    class="inline-flex items-center rounded-full bg-season-bg px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-season-fg"
  >{{ SEASON_BADGE_LABEL }}</span>
</template>
