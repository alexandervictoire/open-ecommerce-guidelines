<script setup lang="ts">
import { CATEGORY_ORDER, categoryLabel, dimensionLabel } from '~/utils/labels'
import { SEASON_BADGE_LABEL, SEASON_COLLECTIONS } from '~/utils/seasons'
import {
  MAINTAINER_NAME,
  MAINTAINER_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  canonicalUrl,
  githubBlobUrl
} from '~/utils/site'

const guidelines = await useAllGuidelines()

const categories = computed(() =>
  CATEGORY_ORDER
    .map((slug) => ({
      slug,
      label: categoryLabel(slug),
      count: guidelines.value.filter((g) => g.category === slug).length
    }))
    .filter((c) => c.count > 0)
)

// The holiday section. It stays on the page all year: the guidelines remain
// valid, only the moment they matter is seasonal. Every number is counted, so
// the block cannot claim more than the collection holds.
const holiday = computed(() => {
  const items = guidelines.value.filter((g) => g.season === 'holiday')
  return {
    path: SEASON_COLLECTIONS.holiday,
    count: items.length,
    important: items.filter((g) => g.severity === 'high' || g.severity === 'critical').length,
    categories: new Set(items.map((g) => g.category)).size
  }
})

const dimensions = computed(() => {
  const set = new Map<string, number>()
  for (const g of guidelines.value) set.set(g.dimension, (set.get(g.dimension) ?? 0) + 1)
  return [...set.entries()]
    .map(([slug, count]) => ({ slug, label: dimensionLabel(slug), count }))
    .sort((a, b) => a.label.localeCompare(b.label))
})

useSeoMeta({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  ogTitle: SITE_NAME,
  ogDescription: SITE_DESCRIPTION,
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl('/') }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: canonicalUrl('/'),
        inLanguage: 'en',
        publisher: { '@type': 'Person', name: MAINTAINER_NAME, url: MAINTAINER_URL },
        license: 'https://creativecommons.org/licenses/by-sa/4.0/'
      })
    }
  ]
})
</script>

<template>
  <div class="container-wide py-14">
    <section class="max-w-2xl">
      <h1 class="text-4xl font-semibold tracking-tight leading-tight">
        Open E-Commerce Guidelines
      </h1>
      <p class="mt-4 text-lg text-muted leading-relaxed">
        An open, community-maintained collection of e-commerce guidelines — UX
        <em>and</em> technical: performance, semantic structure, machine-readability,
        and agentic-commerce readiness. Each guideline is testable and verifiable
        by concrete steps, with a vendor-neutral core and explicit notes on what
        applies on Shopware and Shopify.
      </p>
      <p class="mt-4 text-sm">
        <a class="text-ink underline underline-offset-2" :href="githubBlobUrl('CONTRIBUTING.md')">
          Contribute a guideline →
        </a>
      </p>

      <SeasonalNote />
    </section>

    <section v-if="holiday.count" class="mt-12">
      <div class="rounded-lg border border-line p-6">
        <div class="flex items-center gap-3 flex-wrap">
          <span
            class="inline-flex items-center rounded-full bg-season-bg px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-season-fg"
          >{{ SEASON_BADGE_LABEL }}</span>
          <span class="text-xs uppercase tracking-wide text-faint">Black Friday to Christmas</span>
        </div>
        <h2 class="mt-3 text-xl font-medium text-ink">Holiday readiness</h2>
        <p class="mt-3 text-muted leading-relaxed max-w-2xl">
          Guidelines for the busiest weeks of the year: delivery before the holidays, gifting,
          honest sales and a shop that stays fast under load. They apply on top of the year-round
          guidelines.
        </p>
        <p class="mt-3 text-sm text-faint">
          {{ holiday.count }} guidelines · {{ holiday.important }} high or critical ·
          {{ holiday.categories }} categories
        </p>
        <p class="mt-4 text-sm">
          <NuxtLink class="text-ink underline underline-offset-2" :to="holiday.path">
            Browse holiday readiness →
          </NuxtLink>
        </p>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-faint">Browse by category</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="c in categories"
          :key="c.slug"
          :to="`/guidelines/${c.slug}/`"
          class="no-underline block rounded-lg border border-line p-5 hover:border-ink transition-colors"
        >
          <div class="flex items-baseline justify-between">
            <span class="text-lg font-medium text-ink">{{ c.label }}</span>
            <span class="text-sm text-faint tabular-nums">{{ c.count }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-faint">Browse by dimension</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <NuxtLink
          v-for="d in dimensions"
          :key="d.slug"
          :to="`/dimensions/${d.slug}/`"
          class="no-underline inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-ink hover:border-ink transition-colors"
        >
          {{ d.label }}
          <span class="text-faint tabular-nums">{{ d.count }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
