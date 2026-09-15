import { normalizeRegulationFilter } from '~/utils/legal'

// Regulation filter, mirrored into the URL as `?regulation=consumer-rights`.
export function useRegulationFilter() {
  const { value, set } = useQueryFilter<string>('regulation', normalizeRegulationFilter, 'all')
  return { regulation: value, setRegulation: set }
}
