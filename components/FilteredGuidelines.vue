<script setup lang="ts">
import type { GuidelineMeta } from '~/utils/labels'
import { PLATFORMS, PLATFORM_LABELS, normalizePlatformFilter } from '~/utils/platforms'
import { AUDIENCES, AUDIENCE_LABELS, normalizeAudienceFilter } from '~/utils/legal'

// The filterable guideline list shared by category and dimension pages: filter
// chips, a count line, the list, and an empty state.
const props = defineProps<{
  items: GuidelineMeta[] // already scoped to the page and sorted
  scope: 'category' | 'dimension'
  countSuffix?: string
}>()

const { platform, setPlatform } = usePlatformFilter()
const { audience, setAudience } = useAudienceFilter()

const platformOptions = [
  { value: 'all', label: 'All' },
  ...PLATFORMS.map((p) => ({ value: p, label: PLATFORM_LABELS[p] }))
]
const audienceOptions = [
  { value: 'all', label: 'All' },
  ...AUDIENCES.map((a) => ({ value: a, label: AUDIENCE_LABELS[a] }))
]

// Only offer the audience filter where at least one guideline is restricted to
// an audience; otherwise every option would show the same list.
const hasAudienceRestriction = computed(() => props.items.some((g) => g.audience.length > 0))

const filtered = computed(() =>
  filterByAudience(filterByPlatform(props.items, platform.value), audience.value)
)
const isFiltered = computed(() => platform.value !== 'all' || audience.value !== 'all')
</script>

<template>
  <div>
    <p class="mt-2 text-muted">
      {{ filtered.length }} guideline{{ filtered.length === 1 ? '' : 's' }}<template
        v-if="isFiltered"
      > match the selected filters (of {{ props.items.length }})</template>{{ props.countSuffix ?? '' }}.
    </p>

    <div class="mt-6 flex flex-col gap-3">
      <FilterChips
        label="Platform"
        :options="platformOptions"
        :model-value="platform"
        @update:model-value="(v) => setPlatform(normalizePlatformFilter(v))"
      />
      <FilterChips
        v-if="hasAudienceRestriction"
        label="Audience"
        :options="audienceOptions"
        :model-value="audience"
        @update:model-value="(v) => setAudience(normalizeAudienceFilter(v))"
      />
    </div>

    <GuidelineList v-if="filtered.length" class="mt-8" :items="filtered" :platform="platform" />
    <p v-else class="mt-8 text-muted">
      <template v-if="isFiltered">No guidelines in this {{ props.scope }} match the selected filters.</template>
      <template v-else>No guidelines in this {{ props.scope }} yet.</template>
    </p>
  </div>
</template>
