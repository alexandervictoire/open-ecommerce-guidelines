<script setup lang="ts">
import type { GuidelineMeta } from '~/utils/labels'

const props = defineProps<{ items: GuidelineMeta[] }>()
</script>

<template>
  <ul class="list-none p-0 m-0 divide-y divide-line border-t border-line">
    <li v-for="g in props.items" :key="g.id" class="py-4">
      <NuxtLink :to="g.path" class="no-underline group block">
        <div class="flex items-baseline gap-3 flex-wrap">
          <span class="font-mono text-xs text-faint">{{ g.id }}</span>
          <SeverityBadge :severity="g.severity" />
        </div>
        <h3 class="mt-1 mb-0 text-lg font-medium text-ink group-hover:underline">
          {{ g.title }}
        </h3>
        <div class="mt-1 text-sm text-muted flex gap-x-4 gap-y-1 flex-wrap">
          <NuxtLink
            :to="`/dimensions/${g.dimension}/`"
            class="no-underline hover:text-ink"
            @click.stop
          >{{ dimensionLabel(g.dimension) }}</NuxtLink>
          <span class="text-faint">{{ g.targets.join(' · ') }}</span>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
