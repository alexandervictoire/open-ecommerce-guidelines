<script setup lang="ts">
import { CATEGORY_LABELS, categoryLabel } from '~/utils/labels'
import { categoryIntro } from '~/utils/category-intro'
import { SITE_NAME, canonicalUrl } from '~/utils/site'

const route = useRoute()
const category = computed(() => String(route.params.category))

// Only known categories are valid pages.
if (!CATEGORY_LABELS[category.value]) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown category', fatal: true })
}

const all = await useAllGuidelines()
const inCategory = computed(() => sortGuidelines(all.value.filter((g) => g.category === category.value)))

const label = computed(() => categoryLabel(category.value))

// The definition the page leads with (see utils/category-intro.ts). Every
// category has one; the fallbacks only keep the page rendering if one is ever
// added to the enum without its text.
const intro = computed(() => categoryIntro(category.value))
const heading = computed(() => intro.value?.heading ?? `${label.value} guidelines`)

useSeoMeta({
  // The title repeats the H1 word for word: the page ranks for the definition
  // question, and the result should say the same thing as the page.
  title: () => heading.value,
  description: () =>
    intro.value?.description ??
    `E-commerce guidelines for the ${label.value.toLowerCase()}: testable, platform-aware checks across UX and machine-readability.`
})

const canonical = computed(() => canonicalUrl(`/guidelines/${category.value}/`))

useHead(() => ({
  link: [{ rel: 'canonical', href: canonical.value }],
  script: intro.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: intro.value.termName,
            ...(intro.value.termAbbreviation
              ? { alternateName: intro.value.termAbbreviation }
              : {}),
            description: intro.value.definition,
            url: canonical.value,
            inDefinedTermSet: {
              '@type': 'DefinedTermSet',
              name: SITE_NAME,
              url: canonicalUrl('/')
            }
          })
        }
      ]
    : []
}))
</script>

<template>
  <div class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <span>{{ label }}</span>
    </nav>

    <h1 class="text-3xl font-semibold tracking-tight">{{ heading }}</h1>

    <section v-if="intro" class="mt-8">
      <h2 class="text-lg font-semibold">{{ intro.question }}</h2>
      <p class="mt-3 text-muted leading-relaxed">{{ intro.definition }}</p>
      <p class="mt-3 text-muted leading-relaxed">{{ intro.bridge }}</p>
    </section>

    <FilteredGuidelines :items="inCategory" scope="category" />

    <HelpBox class="mt-12" :category="category" />
  </div>
</template>
