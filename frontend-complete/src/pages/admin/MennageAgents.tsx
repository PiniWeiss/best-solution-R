import { useUsers } from "../../hooks/useUsers"

/**
 * Admin page for viewing all users and creating new ones.
 * Uses the useUsers hook for all state and server interaction.
 */
function MennageAgents() {
  const {
    users,
    isLoading,
    error,
    form,
    isSubmitting,
    createError,
    showModal,
    newUser,
    setShowModal,
    setNewUser,
    handleFormChange,
    handleCreateUser,
  } = useUsers()

  return (
    <div className="section">
      {/* ── Header ── */}
      <div className="section__header">
        <div>
          <h2 className="section__title">Manage Agents</h2>
          <p className="section__sub">// {users.length} registered user{users.length !== 1 ? "s" : ""}</p>
        </div>
        <button className="btn btn--primary" onClick={() => setShowModal(true)}>
          + New Agent
        </button>
      </div>

      {/* ── Error banner ── */}
      {error && <div className="alert alert--danger">{error}</div>}

      {/* ── Users table ── */}
      <div className="panel">
        {isLoading ? (
          <div className="loading-overlay" />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Agent Code</th>
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="empty-state">
                        <div className="empty-state__icon">👤</div>
                        <div className="empty-state__text">No users found.</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id}>
                      <td><span className="agent-code">{u.agentCode}</span></td>
                      <td>{u.fullName}</td>
                      <td>
                        <span className={`badge badge--category`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="date-cell">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Create user modal ── */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Create New Agent</h3>
              <button className="modal__close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            {createError && <div className="alert alert--danger">{createError}</div>}

            <form onSubmit={handleCreateUser}>
              <div className="field">
                <label className="field__label">Full Name</label>
                <input
                  className="field__input"
                  name="fullName"
                  type="text"
                  placeholder="John Smith"
                  value={form.fullName}
                  onChange={handleFormChange}
                />
              </div>

              <div className="field">
                <label className="field__label">Agent Code</label>
                <input
                  className="field__input"
                  name="agentCode"
                  type="text"
                  placeholder="AGT-042"
                  value={form.agentCode}
                  onChange={handleFormChange}
                />
              </div>

              <div className="field">
                <label className="field__label">Role</label>
                <select
                  className="field__select"
                  name="role"
                  value={form.role}
                  onChange={handleFormChange}
                >
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="field">
                <label className="field__label">Initial Password</label>
                <input
                  className="field__input"
                  name="password"
                  type="text"
                  placeholder="Set an initial password"
                  value={form.password}
                  onChange={handleFormChange}
                />
              </div>

              <div className="modal__footer">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating…" : "Create Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Success: show new user info ── */}
      {newUser && (
        <div className="modal-backdrop" onClick={() => setNewUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Agent Created</h3>
              <button className="modal__close" onClick={() => setNewUser(null)}>✕</button>
            </div>

            <div className="alert alert--success">
              Agent <strong>{newUser.fullName}</strong> has been created successfully.
            </div>

            <div className="field">
              <div className="field__label">Agent Code</div>
              <div className="mono">{newUser.agentCode}</div>
            </div>

            <div className="hint-box">
              <div className="hint-box__label">Initial Password (share securely)</div>
              <div className="hint-box__value">{form.password || "—"}</div>
            </div>

            <div className="modal__footer">
              <button className="btn btn--primary" onClick={() => setNewUser(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MennageAgents
