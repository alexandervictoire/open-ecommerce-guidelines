<script setup lang="ts">
import type { GuidelineMeta } from '~/utils/labels'

const props = defineProps<{ items: GuidelineMeta[] }>()
</script>

<template>
  <ul class="list-none p-0 m-0 divide-y divide-line border-t border-line">
    <!-- The row link is "stretched" over the whole <li> via CSS rather than
         wrapping it: nesting the dimension <a> inside a row <a> is invalid HTML,
         and the browser splits the anchors apart, which breaks hydration. -->
    <li v-for="g in props.items" :key="g.id" class="py-4 guideline-row group">
      <div class="flex items-baseline gap-3 flex-wrap">
        <span class="font-mono text-xs text-faint">{{ g.id }}</span>
        <SeverityBadge :severity="g.severity" />
      </div>
      <h3 class="mt-1 mb-0 text-lg font-medium text-ink">
        <NuxtLink :to="g.path" class="no-underline guideline-row-link group-hover:underline">
          {{ g.title }}
        </NuxtLink>
      </h3>
      <div class="mt-1 text-sm text-muted flex gap-x-4 gap-y-1 flex-wrap">
        <NuxtLink
          :to="`/dimensions/${g.dimension}/`"
          class="no-underline hover:text-ink"
        >{{ dimensionLabel(g.dimension) }}</NuxtLink>
        <span class="text-faint">{{ g.targets.join(' · ') }}</span>
      </div>
    </li>
  </ul>
</template>
