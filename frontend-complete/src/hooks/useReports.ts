import { useEffect, useState } from "react"
import type { IReport } from "../types/IReport"
import { fetchReports } from "../services/reportServices"

/**
 * Fetches all reports the current user is authorized to see.
 * - Agents: server automatically returns only their own reports.
 * - Admins: server returns all reports.
 *
 * Used for the simple "my reports" view (no filter controls needed).
 */
export const useReports = () => {
  const [reports, setReports]   = useState<IReport[]>([])
  const [error, setError]       = useState<Error | null>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchReports()
        setReports(data)
      } catch (err) {
        if (err instanceof Error) setError(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { reports, error, isLoading }
}
