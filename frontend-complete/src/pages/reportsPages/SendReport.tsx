import { useState } from "react"
import { useSendReport } from "../../hooks/useSendReport"

/**
 * Manual report submission page.
 * All form state and submission logic lives in the useSendReport hook.
 */
function SendReport() {
  const {
    form,
    isLoading,
    error,
    success,
    imageRef,
    handleChange,
    handleSubmit,
  } = useSendReport()
  const [fileName, setFileName] = useState<string>("")
  return (
    <div className="section">
      <div className="section__header">
        <div>
          <h2 className="section__title">New Report</h2>
          <p className="section__sub">// Submit a manual report</p>
        </div>
      </div>

      <div className="panel panel__body form-panel">
        <div style={{ padding: 24 }}>
          {success && (
            <div className="alert alert--success">
              Report submitted successfully (ID: <code>{success._id}</code>).
            </div>
          )}

          {error && (
            <div className="alert alert--danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Category */}
            <div className="field">
              <label className="field__label">Category *</label>
              <select
                className="field__select"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="" disabled>Select a category</option>
                <option value="intelligence">Intelligence</option>
                <option value="logistics">Logistics</option>
                <option value="alert">Alert</option>
              </select>
            </div>

            {/* Urgency */}
            <div className="field">
              <label className="field__label">Urgency *</label>
              <select
                className="field__select"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
              >
                <option value="" disabled>Select urgency level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Message */}
            <div className="field">
              <label className="field__label">Message *</label>
              <textarea
                className="field__textarea"
                name="message"
                placeholder="Describe the situation in detail…"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {/* Optional image */}
            <div className="field">
              <label className="field__label">Attachment (optional)</label>
              <label className="field__file-label">
                <span>📎 Choose image file</span>
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    setFileName(file ? file.name : "")
                  }}
                />
              </label>
              {fileName && (
                <div className="field__file-name">
                  {fileName}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={isLoading}
              style={{ marginTop: 8 }}
            >
              {isLoading ? "Submitting…" : "Submit Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendReport
