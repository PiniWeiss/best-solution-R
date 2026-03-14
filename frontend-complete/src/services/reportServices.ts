import type { IReport } from "../types/IReport"

const BASE = "http://localhost:5000/api"

/**
 * Fetches reports with optional filters.
 * The server automatically scopes results to the logged-in agent
 * when the role is "agent" — additional query params are ignored for agents.
 */
export const fetchReports = async (
  filters?: Partial<Record<"agentCode" | "category" | "urgency", string | null>>
): Promise<IReport[]> => {
  const params = new URLSearchParams()
  if (filters?.agentCode) params.set("agentCode", filters.agentCode)
  if (filters?.category)  params.set("category",  filters.category)
  if (filters?.urgency)   params.set("urgency",   filters.urgency)

  const query = params.toString() ? `?${params.toString()}` : ""

  const res = await fetch(`${BASE}/reports${query}`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch reports")
  return res.json()
}

/**
 * Sends a manual report via multipart/form-data so the image file can be attached.
 * Fields: category, urgency, message. Optional file: image.
 */
export const sendReport = async (formData: FormData): Promise<IReport> => {
  const res = await fetch(`${BASE}/reports`, {
    method: "POST",
    body: formData,
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? "Failed to create report")
  }
  return res.json()
}

/**
 * Uploads a CSV file; each row becomes a separate report on the server.
 * The CSV must contain columns: category, urgency, message.
 */
export const uploadCsvReports = async (
  file: File
): Promise<{ message: string; number_of_reports: number }> => {
  const form = new FormData()
  form.append("csvfile", file)

  const res = await fetch(`${BASE}/reports/csv`, {
    method: "POST",
    body: form,
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? "Failed to upload CSV")
  }
  return res.json()
}
