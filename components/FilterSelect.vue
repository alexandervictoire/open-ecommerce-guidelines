<script setup lang="ts">
// A labelled dropdown filter, for an axis with too many values for a row of
// chips. Options are grouped; `all` is the unfiltered view.
const props = defineProps<{
  label: string
  allLabel: string
  groups: { label: string; options: { value: string; label: string }[] }[]
  modelValue: string
}>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const selectId = useId()
const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="flex items-center gap-3 flex-wrap">
    <label :for="selectId" class="text-sm text-faint">{{ props.label }}</label>
    <select :id="selectId" v-model="model" class="filter-select" :data-active="props.modelValue !== 'all'">
      <option value="all">{{ props.allLabel }}</option>
      <optgroup v-for="group in props.groups" :key="group.label" :label="group.label">
        <option v-for="option in group.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </optgroup>
    </select>
  </div>
</template>
