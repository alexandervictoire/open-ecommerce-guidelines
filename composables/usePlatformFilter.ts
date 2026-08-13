import { normalizePlatformFilter } from '~/utils/platforms'
import type { PlatformFilterValue } from '~/utils/platforms'

// Platform filter state, mirrored into the URL as `?platform=shopware` so a
// filtered view is shareable and reproducible.
//
// The site is statically prerendered, so the HTML on disk is always the
// unfiltered ("all") view. Reading the query during SSR would therefore make
// the first client render disagree with that HTML, so the query is applied
// after mount instead — one frame later, but no hydration mismatch.
export function usePlatformFilter() {
  const route = useRoute()
  const router = useRouter()

  const platform = ref<PlatformFilterValue>('all')

  onMounted(() => {
    platform.value = normalizePlatformFilter(route.query.platform)
  })

  // Keep in sync when the query changes (back/forward, or a link with a query).
  watch(
    () => route.query.platform,
    (value) => {
      platform.value = normalizePlatformFilter(value)
    }
  )

  function setPlatform(value: PlatformFilterValue) {
    platform.value = value
    const query = { ...route.query }
    if (value === 'all') delete query.platform
    else query.platform = value
    // `path` is passed explicitly to keep the trailing slash — the site is
    // deployed with `trailingSlash: true`, so a shared filtered URL should not
    // bounce through a redirect.
    // `replace` keeps the back button meaningful (it exits the page rather than
    // stepping through filter states).
    router.replace({ path: route.path, query })
  }

  return { platform, setPlatform }
}
