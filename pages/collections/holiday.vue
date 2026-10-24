<script setup lang="ts">
import { CATEGORY_ORDER, categoryLabel } from '~/utils/labels'
import { PLATFORMS, PLATFORM_LABELS, normalizePlatformFilter } from '~/utils/platforms'
import { SEASON_BADGE_LABEL } from '~/utils/seasons'
import { SITE_NAME, canonicalUrl } from '~/utils/site'

// The holiday season as one page. It lives outside /guidelines/, which is the
// [category] route, so a collection can never collide with a category.
const SEASON = 'holiday'
const PATH = '/collections/holiday/'
const TITLE = 'Holiday readiness'
const INTRO =
  'What to check before Black Friday, Cyber Week and Christmas. Each guideline is tied to this season and applies in addition to the year-round guidelines. Sorted by funnel step, most important first.'

const all = await useAllGuidelines()
const seasonal = computed(() => all.value.filter((g) => g.season === SEASON))

// The platform filter works here exactly as on a category page: the same
// composable, the same chips, the same rule that only `not_applicable` drops.
const { platform, setPlatform } = usePlatformFilter()
const platformOptions = [
  { value: 'all', label: 'All' },
  ...PLATFORMS.map((p) => ({ value: p, label: PLATFORM_LABELS[p] }))
]

const filtered = computed(() => filterByPlatform(seasonal.value, platform.value))

// Grouped by funnel step, severity first within each group — the order the
// intro promises.
const groups = computed(() =>
  CATEGORY_ORDER.map((category) => ({
    category,
    label: categoryLabel(category),
    items: sortGuidelines(filtered.value.filter((g) => g.category === category))
  })).filter((group) => group.items.length > 0)
)

useSeoMeta({
  title: `${TITLE} — ${SITE_NAME}`,
  description:
    'Seasonal e-commerce guidelines for Black Friday, Cyber Week and Christmas: delivery cut-offs, honest sales, gifting and a shop that stays fast under load.'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl(PATH) }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: TITLE,
        description: INTRO,
        url: canonicalUrl(PATH),
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: canonicalUrl('/') },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: seasonal.value.length,
          itemListElement: seasonal.value.map((g, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: canonicalUrl(g.path),
            name: g.title
          }))
        }
      })
    }
  ]
}))
</script>

<template>
  <div class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <span>{{ TITLE }}</span>
    </nav>

    <span
      class="inline-flex items-center rounded-full bg-season-bg px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-season-fg"
    >{{ SEASON_BADGE_LABEL }}</span>

    <h1 class="mt-3 text-3xl font-semibold tracking-tight">{{ TITLE }}</h1>

    <p class="mt-4 text-muted leading-relaxed">{{ INTRO }}</p>

    <p class="mt-6 text-muted">
      {{ filtered.length }} guideline{{ filtered.length === 1 ? '' : 's' }}<template
        v-if="platform !== 'all'"
      > match{{ filtered.length === 1 ? 'es' : '' }} the selected filter (of {{ seasonal.length }})</template>.
    </p>

    <div class="mt-6">
      <FilterChips
        label="Platform"
        :options="platformOptions"
        :model-value="platform"
        @update:model-value="(v) => setPlatform(normalizePlatformFilter(v))"
      />
    </div>

    <section v-for="group in groups" :key="group.category" class="mt-10">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-faint">
        {{ group.label }}
      </h2>
      <GuidelineList class="mt-3" :items="group.items" :platform="platform" />
    </section>

    <p v-if="!groups.length" class="mt-10 text-muted">
      No seasonal guidelines match the selected filter.
    </p>

    <HelpBox class="mt-12" category="collection" />
  </div>
</template>
