<script setup lang="ts">
import { CATEGORY_ORDER, categoryLabel } from '~/utils/labels'
import { githubBlobUrl } from '~/utils/site'

// Only surface categories that actually have published guidelines, so the nav
// never links to an empty category page (e.g. checkout before it has content).
const guidelines = await useAllGuidelines()
const navCategories = computed(() =>
  CATEGORY_ORDER.filter((c) => guidelines.value.some((g) => g.category === c))
)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-line">
      <div class="container-wide flex items-baseline justify-between py-5">
        <NuxtLink to="/" class="no-underline font-semibold tracking-tight text-ink">
          Open E-Commerce Guidelines
        </NuxtLink>
        <nav class="flex gap-5 text-sm text-muted">
          <NuxtLink
            v-for="cat in navCategories"
            :key="cat"
            :to="`/guidelines/${cat}/`"
            class="no-underline hover:text-ink"
          >{{ categoryLabel(cat) }}</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 w-full">
      <slot />
    </main>

    <footer class="border-t border-line mt-16">
      <div class="container-wide py-8 text-sm text-faint flex flex-wrap gap-x-6 gap-y-2 justify-between">
        <span>Content: CC BY-SA 4.0 · Code: MIT</span>
        <a
          class="no-underline hover:text-ink"
          :href="githubBlobUrl('CONTRIBUTING.md')"
        >Contribute a guideline</a>
      </div>
    </footer>
  </div>
</template>
