<script setup lang="ts">
import { CATEGORY_ORDER, categoryLabel } from '~/utils/labels'
import { githubBlobUrl } from '~/utils/site'

// Only surface categories that actually have published guidelines, so the nav
// never links to an empty category page (e.g. checkout before it has content).
const guidelines = await useAllGuidelines()
const navCategories = computed(() =>
  CATEGORY_ORDER.filter((c) => guidelines.value.some((g) => g.category === c))
)

// Below 1024px the category links collapse behind a menu button (styles in
// main.css). The links are rendered into the served HTML either way, so the
// navigation stays readable without scripts (GLOBAL-ME-NAV-01); only showing
// and hiding them needs JavaScript.
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

const route = useRoute()
watch(() => route.fullPath, () => {
  menuOpen.value = false
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    menuButton.value?.focus()
  }
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

// Without scripts the button cannot open anything, so show the links instead.
useHead({
  noscript: [
    {
      innerHTML:
        '<style>@media (max-width: 1023.98px) { .site-nav { display: block } .site-nav-toggle { display: none } }</style>'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-line">
      <div class="container-wide site-header py-5">
        <NuxtLink to="/" class="no-underline font-semibold tracking-tight text-ink">
          Open E-Commerce Guidelines
        </NuxtLink>
        <button
          ref="menuButton"
          type="button"
          class="site-nav-toggle"
          aria-label="Menu"
          aria-controls="site-nav"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
            <template v-if="menuOpen">
              <path d="M6 6l12 12M18 6L6 18" />
            </template>
            <template v-else>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </template>
          </svg>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Guideline categories" :data-open="menuOpen">
          <ul class="site-nav-list">
            <li v-for="cat in navCategories" :key="cat">
              <NuxtLink :to="`/guidelines/${cat}/`" class="site-nav-link">{{ categoryLabel(cat) }}</NuxtLink>
            </li>
          </ul>
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
