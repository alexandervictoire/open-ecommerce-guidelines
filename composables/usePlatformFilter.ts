import { normalizePlatformFilter } from '~/utils/platforms'
import type { PlatformFilterValue } from '~/utils/platforms'

// Platform filter, mirrored into the URL as `?platform=shopware`.
export function usePlatformFilter() {
  const { value, set } = useQueryFilter<PlatformFilterValue>('platform', normalizePlatformFilter, 'all')
  return { platform: value, setPlatform: set }
}
