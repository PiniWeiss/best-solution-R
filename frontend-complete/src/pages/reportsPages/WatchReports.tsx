import { useAuthStore } from "../../hooks/../store/auth.store"
import { useReports } from "../../hooks/useReports"
import { useFilterReports } from "../../hooks/useFilterReports"

/**
 * Reports list page.
 * - Agents:  loads their own reports on mount via useReports (no filter bar).
 * - Admins:  shows a filter bar; results are fetched on demand via useFilterReports.
 */
function WatchReports() {
  const user  = useAuthStore((s) => s.user)
  const isAdmin = user?.role === "admin"

  return isAdmin ? <AdminReportsView /> : <AgentReportsView />
}

/* ─────────────────────────────────────────
   Agent view — simple list, no filters
───────────────────────────────────────── */
function AgentReportsView() {
  const { reports, error, isLoading } = useReports()

  return (
    <div className="section">
      <div className="section__header">
        <div>
          <h2 className="section__title">My Reports</h2>
          <p className="section__sub">// {reports.length} report{reports.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {error && <div className="alert alert--danger">{error.message}</div>}

      <div className="panel">
        {isLoading ? (
          <div className="loading-overlay" />
        ) : (
          <ReportsTable reports={reports} showAgent={false} />
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Admin view — filter bar + on-demand fetch
───────────────────────────────────────── */
function AdminReportsView() {
  const {
    filters,
    reports,
    error,
    isLoading,
    hasFetched,
    updateFilter,
    clearFilters,
    search,
  } = useFilterReports()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    search()
  }

  return (
    <div className="section">
      <div className="section__header">
        <div>
          <h2 className="section__title">All Reports</h2>
          <p className="section__sub">// Admin view — use filters below</p>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <form className="filter-bar" onSubmit={handleSubmit}>
        <div className="field">
          <label className="field__label">Category</label>
          <select
            className="field__select"
            value={filters.category ?? ""}
            onChange={(e) => updateFilter("category", e.target.value)}
          >
            <option value="">All</option>
            <option value="intelligence">Intelligence</option>
            <option value="logistics">Logistics</option>
            <option value="alert">Alert</option>
          </select>
        </div>

        <div className="field">
          <label className="field__label">Urgency</label>
          <select
            className="field__select"
            value={filters.urgency ?? ""}
            onChange={(e) => updateFilter("urgency", e.target.value)}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="field field--wide">
          <label className="field__label">Agent Code</label>
          <input
            className="field__input"
            type="text"
            placeholder="e.g. AGT-001"
            value={filters.agentCode ?? ""}
            onChange={(e) => updateFilter("agentCode", e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: 8, alignSelf: "flex-end" }}>
          <button type="submit" className="btn btn--primary" disabled={isLoading}>
            {isLoading ? "Searching…" : "Search"}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={clearFilters}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </form>

      {error && <div className="alert alert--danger">{error.message}</div>}

      <div className="panel">
        {isLoading ? (
          <div className="loading-overlay" />
        ) : hasFetched ? (
          <ReportsTable reports={reports} showAgent={true} />
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">🔍</div>
            <div className="empty-state__text">Apply filters and press Search.</div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Shared table component
───────────────────────────────────────── */
import type { IReport } from "../../types/IReport"

function ReportsTable({
  reports,
  showAgent,
}: {
  reports: IReport[]
  showAgent: boolean
}) {
  if (reports.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">📭</div>
        <div className="empty-state__text">No reports found.</div>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {showAgent && <th>Agent ID</th>}
            <th>Category</th>
            <th>Urgency</th>
            <th>Message</th>
            <th>Source</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              {showAgent && (
                <td><span className="agent-code">{r.userId}</span></td>
              )}
              <td>
                <span className="badge badge--category">{r.category}</span>
              </td>
              <td>
                <span className={`badge badge--${r.urgency}`}>{r.urgency}</span>
              </td>
              <td style={{ maxWidth: 320 }}>
                <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.message}
                </span>
              </td>
              <td>
                <span className="badge badge--category">{r.sourceType}</span>
              </td>
              <td className="date-cell">
                {new Date(r.createdAt).toLocaleDateString()}{" "}
                <span style={{ color: "var(--text-muted)" }}>
                  {new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WatchReports
