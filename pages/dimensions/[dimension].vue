<script setup lang="ts">
import { DIMENSION_LABELS, dimensionLabel } from '~/utils/labels'
import { SITE_NAME } from '~/utils/site'

const route = useRoute()
const dimension = computed(() => String(route.params.dimension))

if (!DIMENSION_LABELS[dimension.value]) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown dimension', fatal: true })
}

const all = await useAllGuidelines()
const items = computed(() => sortGuidelines(all.value.filter((g) => g.dimension === dimension.value)))

const label = computed(() => dimensionLabel(dimension.value))
useSeoMeta({
  title: () => `${label.value} — ${SITE_NAME}`,
  description: () => `Guidelines in the ${label.value} dimension, across all e-commerce page types.`
})
</script>

<template>
  <div class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <span>Dimensions</span>
      <span class="mx-2">/</span>
      <span>{{ label }}</span>
    </nav>

    <h1 class="text-3xl font-semibold tracking-tight">{{ label }}</h1>
    <p class="mt-2 text-muted">
      {{ items.length }} guideline{{ items.length === 1 ? '' : 's' }} across all categories.
    </p>

    <GuidelineList class="mt-8" :items="items" />
  </div>
</template>
