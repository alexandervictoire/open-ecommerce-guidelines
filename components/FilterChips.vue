<script setup lang="ts">
// A labelled group of mutually exclusive filter chips (e.g. All · Shopware ·
// Shopify). Selection is exposed through aria-pressed, which also drives the
// selected styling in main.css.
const props = defineProps<{
  label: string
  options: { value: string; label: string }[]
  modelValue: string
}>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const labelId = useId()
</script>

<template>
  <div class="flex items-center gap-3 flex-wrap">
    <span :id="labelId" class="text-sm text-faint">{{ props.label }}</span>
    <div role="group" :aria-labelledby="labelId" class="flex gap-2 flex-wrap">
      <button
        v-for="option in props.options"
        :key="option.value"
        type="button"
        :aria-pressed="props.modelValue === option.value"
        class="filter-chip"
        @click="emit('update:modelValue', option.value)"
      >{{ option.label }}</button>
    </div>
  </div>
</template>
