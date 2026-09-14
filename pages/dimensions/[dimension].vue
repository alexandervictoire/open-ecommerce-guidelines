<script setup lang="ts">
import { DIMENSION_LABELS, dimensionLabel } from '~/utils/labels'
import { PLATFORM_LABELS } from '~/utils/platforms'
import { SITE_NAME } from '~/utils/site'

const route = useRoute()
const dimension = computed(() => String(route.params.dimension))

if (!DIMENSION_LABELS[dimension.value]) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown dimension', fatal: true })
}

const all = await useAllGuidelines()
const inDimension = computed(() => sortGuidelines(all.value.filter((g) => g.dimension === dimension.value)))

const { platform, setPlatform } = usePlatformFilter()
const items = computed(() => filterByPlatform(inDimension.value, platform.value))

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
      {{ items.length }} guideline{{ items.length === 1 ? '' : 's' }}<template
        v-if="platform !== 'all'"
      > relevant for {{ PLATFORM_LABELS[platform] }} (of {{ inDimension.length }})</template>
      across all categories.
    </p>

    <PlatformFilter
      class="mt-6"
      :model-value="platform"
      @update:model-value="setPlatform"
    />

    <GuidelineList v-if="items.length" class="mt-8" :items="items" :platform="platform" />
    <p v-else class="mt-8 text-muted">
      <template v-if="platform === 'all'">No guidelines in this dimension yet.</template>
      <template v-else>No guidelines in this dimension apply to {{ PLATFORM_LABELS[platform] }} yet.</template>
    </p>
  </div>
</template>
