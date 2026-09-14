import type { Ref } from 'vue'

// Filter state mirrored into one URL query parameter (e.g. `?platform=shopware`)
// so a filtered view is shareable and reproducible. The fallback value is the
// unfiltered view and is represented by the parameter being absent.
//
// The site is statically prerendered, so the HTML on disk is always the
// unfiltered view. Reading the query during SSR would make the first client
// render disagree with that HTML, so the query is applied after mount instead —
// one frame later, but no hydration mismatch.
export function useQueryFilter<T extends string>(
  param: string,
  normalize: (raw: unknown) => T,
  fallback: T
) {
  const route = useRoute()
  const router = useRouter()

  const value = ref(fallback) as Ref<T>

  onMounted(() => {
    value.value = normalize(route.query[param])
  })

  // Keep in sync when the query changes (back/forward, or a link with a query).
  watch(
    () => route.query[param],
    (raw) => {
      value.value = normalize(raw)
    }
  )

  function set(next: T) {
    value.value = next
    const query = { ...route.query }
    if (next === fallback) delete query[param]
    else query[param] = next
    // `path` is passed explicitly to keep the trailing slash — the site is
    // deployed with `trailingSlash: true`, so a shared filtered URL should not
    // bounce through a redirect.
    // `replace` keeps the back button meaningful (it exits the page rather than
    // stepping through filter states).
    router.replace({ path: route.path, query })
  }

  return { value, set }
}
