<script setup lang="ts">
import { CATEGORY_ORDER, categoryLabel, dimensionLabel } from '~/utils/labels'
import { SITE_NAME, SITE_DESCRIPTION, githubBlobUrl } from '~/utils/site'

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
        and agentic-commerce readiness. Each guideline is testable, vendor-neutral,
        and verifiable by concrete steps.
      </p>
      <p class="mt-4 text-sm">
        <a class="text-ink underline underline-offset-2" :href="githubBlobUrl('CONTRIBUTING.md')">
          Contribute a guideline →
        </a>
      </p>
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
