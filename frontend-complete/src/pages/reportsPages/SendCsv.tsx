import { useSendCsv } from "../../hooks/useSendCsv"

/**
 * CSV bulk upload page.
 * Expected CSV format:
 *   category,urgency,message
 *   alert,high,Enemy movement near facility
 *
 * All state and upload logic lives in the useSendCsv hook.
 */
function SendCsv() {
  const {
    fileRef,
    selectedFile,
    isLoading,
    error,
    result,
    handleFileChange,
    handleSubmit,
  } = useSendCsv()

  return (
    <div className="section">
      <div className="section__header">
        <div>
          <h2 className="section__title">Upload CSV</h2>
          <p className="section__sub">// Bulk import reports from a CSV file</p>
        </div>
      </div>

      <div className="panel form-panel">
        <div style={{ padding: 24 }}>
          {/* Success banner */}
          {result && (
            <div className="alert alert--success">
              ✓ Successfully imported <strong>{result.number_of_reports}</strong> report
              {result.number_of_reports !== 1 ? "s" : ""}.
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="alert alert--danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Drop zone */}
            <label className="upload-area">
              <input
                ref={fileRef}
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="upload-area__icon">📂</div>
              <div className="upload-area__title">
                {selectedFile ? selectedFile.name : "Click to select a CSV file"}
              </div>
              <div className="upload-area__sub">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                  : "Accepts .csv — columns: category, urgency, message"}
              </div>
            </label>

            {/* CSV format reminder */}
            <div className="alert alert--info" style={{ marginTop: 16 }}>
              <strong>Required columns:</strong>{" "}
              <code>category</code>, <code>urgency</code>, <code>message</code>
              <br />
              Valid values — category: <code>intelligence</code> / <code>logistics</code> / <code>alert</code>
              &nbsp;· urgency: <code>low</code> / <code>medium</code> / <code>high</code>
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={isLoading || !selectedFile}
              style={{ marginTop: 8 }}
            >
              {isLoading ? "Uploading…" : "Upload & Import"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendCsv
