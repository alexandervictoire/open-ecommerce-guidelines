<script setup lang="ts">
import { CATEGORY_LABELS, categoryLabel, dimensionLabel, deriveGuidelineId } from '~/utils/labels'
import { SITE_NAME, SITE_URL, githubEditUrl } from '~/utils/site'

const route = useRoute()
const category = String(route.params.category)
const id = String(route.params.id)

if (!CATEGORY_LABELS[category]) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown category', fatal: true })
}

const path = `/guidelines/${category}/${id}`

const { data: doc } = await useAsyncData(`guideline-${category}-${id}`, () =>
  queryCollection('guidelines').path(path).first()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Guideline not found', fatal: true })
}

// Prev/next within the same category, ordered by id.
const all = await useAllGuidelines()
const siblings = computed(() =>
  all.value
    .filter((g) => g.category === category)
    .sort((a, b) => a.id.localeCompare(b.id))
)
const index = computed(() => siblings.value.findIndex((g) => g.path === path))
const prev = computed(() => (index.value > 0 ? siblings.value[index.value - 1] : null))
const next = computed(() =>
  index.value >= 0 && index.value < siblings.value.length - 1 ? siblings.value[index.value + 1] : null
)

const editUrl = computed(() => githubEditUrl(`content/guidelines/${category}/${id}.md`))

// Canonical guideline id (frontmatter `id` is not queryable — see deriveGuidelineId).
const gid = computed(() => deriveGuidelineId((doc.value as any)?.stem ?? path.replace(/^\//, '')))

// ---- SEO + JSON-LD (PLAN §6) ----------------------------------------------
const canonical = `${SITE_URL}${path}`
useSeoMeta({
  title: () => `${doc.value?.title} — ${SITE_NAME}`,
  description: () => `${gid.value}: ${doc.value?.title}`,
  ogType: 'article',
  ogTitle: () => doc.value?.title,
  ogDescription: () => `${gid.value}: ${doc.value?.title}`
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: doc.value?.title,
        identifier: gid.value,
        articleSection: categoryLabel(category),
        keywords: [dimensionLabel(doc.value?.dimension as string), ...(doc.value?.targets ?? [])].join(', '),
        url: canonical,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        license: 'https://creativecommons.org/licenses/by-sa/4.0/'
      })
    }
  ]
}))
</script>

<template>
  <article v-if="doc" class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink :to="`/guidelines/${category}/`" class="no-underline hover:text-ink">
        {{ categoryLabel(category) }}
      </NuxtLink>
      <span class="mx-2">/</span>
      <span class="font-mono">{{ gid }}</span>
    </nav>

    <header>
      <div class="flex items-center gap-3 flex-wrap">
        <span class="font-mono text-xs text-faint">{{ gid }}</span>
        <SeverityBadge :severity="doc.severity" />
        <span
          v-if="doc.status !== 'published'"
          class="text-xs uppercase tracking-wide text-faint border border-line rounded-full px-2 py-0.5"
        >{{ doc.status }}</span>
      </div>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight leading-tight">{{ doc.title }}</h1>
      <div class="mt-3 flex gap-x-4 gap-y-1 flex-wrap text-sm">
        <NuxtLink
          :to="`/dimensions/${doc.dimension}/`"
          class="no-underline text-ink hover:underline underline-offset-2"
        >{{ dimensionLabel(doc.dimension) }}</NuxtLink>
        <span class="text-faint">Targets: {{ doc.targets.join(' · ') }}</span>
      </div>
    </header>

    <div class="prose prose-neutral max-w-none mt-8">
      <ContentRenderer :value="doc" />
    </div>

    <div class="mt-10 pt-6 border-t border-line text-sm">
      <a :href="editUrl" class="no-underline text-muted hover:text-ink">Edit this page on GitHub →</a>
    </div>

    <nav class="mt-8 flex justify-between gap-4 text-sm border-t border-line pt-6">
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="no-underline text-muted hover:text-ink max-w-[45%]"
      >
        <span class="block text-faint">← Previous</span>
        <span class="block">{{ prev.title }}</span>
      </NuxtLink>
      <span v-else />
      <NuxtLink
        v-if="next"
        :to="next.path"
        class="no-underline text-muted hover:text-ink text-right max-w-[45%]"
      >
        <span class="block text-faint">Next →</span>
        <span class="block">{{ next.title }}</span>
      </NuxtLink>
      <span v-else />
    </nav>
  </article>
</template>
