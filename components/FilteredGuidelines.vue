<script setup lang="ts">
import type { GuidelineMeta } from '~/utils/labels'
import { PLATFORMS, PLATFORM_LABELS, normalizePlatformFilter } from '~/utils/platforms'
import {
  AUDIENCES,
  AUDIENCE_LABELS,
  INSTRUMENTS,
  instrumentGroupLabel,
  instrumentLabel,
  normalizeAudienceFilter,
  normalizeRegulationFilter
} from '~/utils/legal'

// The filterable guideline list shared by category and dimension pages: filter
// chips, a count line, the list, and an empty state.
const props = defineProps<{
  items: GuidelineMeta[] // already scoped to the page and sorted
  scope: 'category' | 'dimension'
  countSuffix?: string
}>()

const { platform, setPlatform } = usePlatformFilter()
const { audience, setAudience } = useAudienceFilter()
const { regulation, setRegulation } = useRegulationFilter()

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

// Offer only the instruments cited in this list, grouped EU law, national law,
// standards, in registry order. A selection from a shared URL stays listed even
// when nothing here cites it, so it can be seen and reset.
const regulationGroups = computed(() => {
  const cited = new Set(props.items.flatMap((g) => g.instruments))
  if (regulation.value !== 'all') cited.add(regulation.value)
  const groups: { label: string; options: { value: string; label: string }[] }[] = []
  for (const instrument of INSTRUMENTS) {
    if (!cited.has(instrument.id)) continue
    const label = instrumentGroupLabel(instrument.group)
    let group = groups.find((g) => g.label === label)
    if (!group) groups.push((group = { label, options: [] }))
    group.options.push({ value: instrument.id, label: instrumentLabel(instrument) })
  }
  return groups
})

const filtered = computed(() =>
  filterByRegulation(
    filterByAudience(filterByPlatform(props.items, platform.value), audience.value),
    regulation.value
  )
)
const isFiltered = computed(
  () => platform.value !== 'all' || audience.value !== 'all' || regulation.value !== 'all'
)
</script>

<template>
  <div>
    <p class="mt-2 text-muted">
      {{ filtered.length }} guideline{{ filtered.length === 1 ? '' : 's' }}<template
        v-if="isFiltered"
      > match{{ filtered.length === 1 ? 'es' : '' }} the selected filters (of {{ props.items.length }})</template>{{ props.countSuffix ?? '' }}.
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
      <FilterSelect
        v-if="regulationGroups.length"
        label="Legal reference"
        all-label="All guidelines"
        :groups="regulationGroups"
        :model-value="regulation"
        @update:model-value="(v) => setRegulation(normalizeRegulationFilter(v))"
      />
    </div>

    <GuidelineList v-if="filtered.length" class="mt-8" :items="filtered" :platform="platform" />
    <p v-else class="mt-8 text-muted">
      <template v-if="isFiltered">No guidelines in this {{ props.scope }} match the selected filters.</template>
      <template v-else>No guidelines in this {{ props.scope }} yet.</template>
    </p>
  </div>
</template>
