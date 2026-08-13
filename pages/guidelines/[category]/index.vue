<script setup lang="ts">
import { CATEGORY_LABELS, categoryLabel } from '~/utils/labels'
import { PLATFORM_LABELS } from '~/utils/platforms'
import { SITE_NAME } from '~/utils/site'

const route = useRoute()
const category = computed(() => String(route.params.category))

// Only known categories are valid pages.
if (!CATEGORY_LABELS[category.value]) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown category', fatal: true })
}

const all = await useAllGuidelines()
const inCategory = computed(() => sortGuidelines(all.value.filter((g) => g.category === category.value)))

const { platform, setPlatform } = usePlatformFilter()
const items = computed(() => filterByPlatform(inCategory.value, platform.value))

const label = computed(() => categoryLabel(category.value))
useSeoMeta({
  title: () => `${label.value} guidelines — ${SITE_NAME}`,
  description: () => `E-commerce guidelines for the ${label.value.toLowerCase()}: testable, platform-aware checks across UX and machine-readability.`
})
</script>

<template>
  <div class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <span>{{ label }}</span>
    </nav>

    <h1 class="text-3xl font-semibold tracking-tight">{{ label }} guidelines</h1>
    <p class="mt-2 text-muted">
      {{ items.length }} guideline{{ items.length === 1 ? '' : 's' }}<template
        v-if="platform !== 'all'"
      > relevant for {{ PLATFORM_LABELS[platform] }} (of {{ inCategory.length }})</template>.
    </p>

    <PlatformFilter
      class="mt-6"
      :model-value="platform"
      @update:model-value="setPlatform"
    />

    <GuidelineList v-if="items.length" class="mt-8" :items="items" :platform="platform" />
    <p v-else class="mt-8 text-muted">
      No guidelines in this category apply to {{ PLATFORM_LABELS[platform] }} yet.
    </p>
  </div>
</template>
