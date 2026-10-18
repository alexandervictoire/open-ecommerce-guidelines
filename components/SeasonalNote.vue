<script setup lang="ts">
import { MAINTAINER_URL } from '~/utils/site'

/**
 * A dated pointer on the home page. One line, no call to action, and it
 * removes itself once the date it refers to has passed.
 *
 * The gate runs twice on purpose. The site is statically generated, so the
 * build-time check only takes effect on the next deploy; the second check runs
 * after hydration and hides the note on a page that was built before the
 * deadline and is being read after it. It deliberately runs in `onMounted`
 * rather than in setup, so the first client render still matches the server's
 * and hydration stays clean.
 *
 * To retire this ahead of time, or to point it at something else next season,
 * edit the two constants.
 */
const SHOW_UNTIL = '2026-11-30'
const NOTE = {
  text: 'Black Friday is coming up.',
  linkText: 'A 25-point checklist for Shopify shops (German)',
  href: `${MAINTAINER_URL}de/ratgeber/black-friday-checkliste-shopify/`
}

const today = () => new Date().toISOString().slice(0, 10)
const visible = ref(today() <= SHOW_UNTIL)

onMounted(() => {
  visible.value = today() <= SHOW_UNTIL
})
</script>

<template>
  <p v-if="visible" class="mt-8 text-sm text-muted">
    {{ NOTE.text }}
    <a
      class="text-ink underline underline-offset-2"
      :href="NOTE.href"
      target="_blank"
      rel="noopener noreferrer"
    >{{ NOTE.linkText }}</a>
  </p>
</template>
