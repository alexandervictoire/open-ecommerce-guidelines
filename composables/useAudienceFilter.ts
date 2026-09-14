import { normalizeAudienceFilter } from '~/utils/legal'
import type { AudienceFilterValue } from '~/utils/legal'

// Audience filter, mirrored into the URL as `?audience=b2b`.
export function useAudienceFilter() {
  const { value, set } = useQueryFilter<AudienceFilterValue>('audience', normalizeAudienceFilter, 'all')
  return { audience: value, setAudience: set }
}
