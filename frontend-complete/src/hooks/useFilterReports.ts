import { useState } from "react"
import type { CriteriaType } from "../types/CriteriaType"
import type { IReport } from "../types/IReport"
import { fetchReports } from "../services/reportServices"

/**
 * Manages filter state and fetches reports based on current criteria.
 * Used in the admin reports page where filter controls are needed.
 *
 * NOTE: The server still enforces role-based scoping — an agent calling
 * this hook will only receive their own reports regardless of filters sent.
 */
export const useFilterReports = () => {
  const [filters, setFilters] = useState<CriteriaType>({
    category: null,
    urgency: null,
    agentCode: null,
  })
  const [reports, setReports]   = useState<IReport[]>([])
  const [error, setError]       = useState<Error | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  /** Updates a single filter field without triggering a fetch. */
  const updateFilter = (key: keyof CriteriaType, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value || null }))
  }

  /** Clears all active filters. */
  const clearFilters = () => {
    setFilters({ category: null, urgency: null, agentCode: null })
  }

  /** Triggers a fetch using the current filter state. */
  const search = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchReports(filters)
      setReports(data)
      setHasFetched(true)
    } catch (err) {
      if (err instanceof Error) setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { filters, reports, error, isLoading, hasFetched, updateFilter, clearFilters, search }
}
