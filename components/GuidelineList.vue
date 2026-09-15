<script setup lang="ts">
import type { GuidelineMeta } from '~/utils/labels'
import { PLATFORMS, PLATFORM_LABELS, platformStatus } from '~/utils/platforms'
import type { PlatformFilterValue } from '~/utils/platforms'

const props = withDefaults(
  defineProps<{ items: GuidelineMeta[]; platform?: PlatformFilterValue }>(),
  { platform: 'all' }
)

// In the unfiltered view, flag the platforms a guideline does not apply to —
// under an active filter those guidelines are hidden anyway, so the note would
// only be noise.
function notApplicableOn(guideline: GuidelineMeta): string[] {
  if (props.platform !== 'all') return []
  return PLATFORMS
    .filter((p) => platformStatus(guideline, p) === 'not_applicable')
    .map((p) => PLATFORM_LABELS[p])
}
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
        <StatusBadge :status="g.status" />
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
        <span v-if="notApplicableOn(g).length" class="text-faint">
          Not applicable: {{ notApplicableOn(g).join(' · ') }}
        </span>
      </div>
    </li>
  </ul>
</template>
