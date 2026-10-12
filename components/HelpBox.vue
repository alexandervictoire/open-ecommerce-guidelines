<script setup lang="ts">
import { MAINTAINER_NAME } from '~/utils/site'
import { helpLinkFor } from '~/utils/help-links'

// Rendered only where a verified target page exists (see utils/help-links.ts).
const props = defineProps<{ category: string }>()

const link = computed(() => helpLinkFor(props.category))
</script>

<template>
  <aside v-if="link" class="help-box" aria-label="Implementation help">
    <p class="help-box-title">Need help implementing this?</p>
    <p class="help-box-text">
      {{ MAINTAINER_NAME }}, who maintains these guidelines, works with merchants on exactly these
      checks.
      <a :href="link.url" class="help-box-link">{{ link.label }} →</a>
    </p>
  </aside>
</template>
