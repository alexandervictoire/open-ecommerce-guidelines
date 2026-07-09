<script setup lang="ts">
const props = defineProps<{ severity: string }>()

// Severity is the only strong color accent in the UI (PLAN §6).
const styles: Record<string, string> = {
  low: 'text-severity-low border-severity-low',
  medium: 'text-severity-medium border-severity-medium',
  high: 'text-severity-high border-severity-high',
  critical: 'text-severity-critical border-severity-critical'
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium uppercase tracking-wide"
    :class="styles[props.severity] ?? 'text-muted border-line'"
  >{{ props.severity }}</span>
</template>
