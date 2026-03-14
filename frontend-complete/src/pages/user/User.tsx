import { Link } from "react-router"
import { useAuthStore } from "../../store/auth.store"
import LogOut from "../../components/LogOut"

/**
 * Agent dashboard — quick-action cards linking to the agent's available pages.
 */
function User() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="page-wrapper">
      {/* ── Top Navigation ── */}
      <nav className="topnav">
        <span className="topnav__brand">◈ ARS — Agent</span>

        <div className="topnav__links">
          <Link className="topnav__link" to="/reports">My Reports</Link>
          <Link className="topnav__link" to="/sendreport">New Report</Link>
          <Link className="topnav__link" to="/sendcsv">Upload CSV</Link>
        </div>

        <div className="topnav__actions">
          <span className="topnav__user">{user?.fullName}</span>
          <LogOut />
        </div>
      </nav>

      {/* ── Dashboard cards ── */}
      <main className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Welcome, {user?.fullName}</h1>
          <p className="dashboard__subtitle">// AGENT DASHBOARD · <span className="agent-code">{user?.agentCode}</span></p>
        </div>

        <div className="dashboard__grid">
          <Link className="dashboard-card" to="/reports">
            <div className="dashboard-card__icon">📋</div>
            <div className="dashboard-card__label">My Reports</div>
            <div className="dashboard-card__desc">View all reports you have submitted.</div>
          </Link>

          <Link className="dashboard-card" to="/sendreport">
            <div className="dashboard-card__icon">✏️</div>
            <div className="dashboard-card__label">New Report</div>
            <div className="dashboard-card__desc">Submit a manual report with an optional image.</div>
          </Link>

          <Link className="dashboard-card" to="/sendcsv">
            <div className="dashboard-card__icon">📂</div>
            <div className="dashboard-card__label">Upload CSV</div>
            <div className="dashboard-card__desc">Bulk-import reports from a CSV file.</div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default User
