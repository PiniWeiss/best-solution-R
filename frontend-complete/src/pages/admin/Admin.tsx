import { Link, Outlet } from "react-router"
import { useAuthStore } from "../../store/auth.store"
import LogOut from "../../components/LogOut"

/**
 * Admin dashboard shell — renders a top navigation bar and an <Outlet />
 * for nested admin pages. Direct children of /admin (no nested route)
 * show the quick-action cards.
 */
function Admin() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="page-wrapper">
      {/* ── Top Navigation ── */}
      <nav className="topnav">
        <span className="topnav__brand">◈ ARS — Admin</span>

        <div className="topnav__links">
          <Link className="topnav__link" to="/reports">All Reports</Link>
          <Link className="topnav__link" to="/admin/mennageagents">Manage Agents</Link>
          <Link className="topnav__link" to="/sendreport">New Report</Link>
          <Link className="topnav__link" to="/sendcsv">Upload CSV</Link>
        </div>

        <div className="topnav__actions">
          <span className="topnav__user">{user?.fullName}</span>
          <LogOut />
        </div>
      </nav>

      {/* ── Page content ── */}
      <main>
        <Outlet />

        {/*
          Fallback content shown when no nested route is active.
          (React Router renders nothing in the Outlet for the index route,
          so we show a simple dashboard card grid here.)
        */}
        <div className="dashboard">
          <div className="dashboard__header">
            <h1 className="dashboard__title">Welcome back, {user?.fullName}</h1>
            <p className="dashboard__subtitle">// ADMIN DASHBOARD</p>
          </div>

          <div className="dashboard__grid">
            <Link className="dashboard-card" to="/reports">
              <div className="dashboard-card__icon">📋</div>
              <div className="dashboard-card__label">All Reports</div>
              <div className="dashboard-card__desc">View, search and filter every report in the system.</div>
            </Link>

            <Link className="dashboard-card" to="/admin/mennageagents">
              <div className="dashboard-card__icon">👥</div>
              <div className="dashboard-card__label">Manage Agents</div>
              <div className="dashboard-card__desc">Create new agents and view all registered users.</div>
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
        </div>
      </main>
    </div>
  )
}

export default Admin
