<script setup lang="ts">
import { PLATFORMS, PLATFORM_LABELS } from '~/utils/platforms'
import type { PlatformFilterValue } from '~/utils/platforms'

const props = defineProps<{ modelValue: PlatformFilterValue }>()
const emit = defineEmits<{ 'update:modelValue': [PlatformFilterValue] }>()

const options = computed(() => [
  { value: 'all' as const, label: 'All' },
  ...PLATFORMS.map((p) => ({ value: p, label: PLATFORM_LABELS[p] }))
])
</script>

<template>
  <div class="flex items-center gap-3 flex-wrap">
    <span id="platform-filter-label" class="text-sm text-faint">Platform</span>
    <div role="group" aria-labelledby="platform-filter-label" class="flex gap-2 flex-wrap">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :aria-pressed="props.modelValue === option.value"
        class="platform-chip"
        @click="emit('update:modelValue', option.value)"
      >{{ option.label }}</button>
    </div>
  </div>
</template>
