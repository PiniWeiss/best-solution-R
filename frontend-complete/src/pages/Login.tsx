import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuthStore } from "../store/auth.store"

function Login() {
  const { user, isLoading, isLoggedIn, error, login } = useAuthStore()
  const [formData, setFormData] = useState({ agentCode: "", password: "" })
  const navigate = useNavigate()

  // If already logged in, redirect to the correct dashboard
  useEffect(() => {
    if (isLoggedIn && user) {
      user.role === "admin" ? navigate("/admin") : navigate("/user")
    }
  }, [isLoggedIn, user, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userData = await login(formData.agentCode, formData.password)
    if (userData?.role === "admin") navigate("/admin")
    if (userData?.role === "agent") navigate("/user")
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-box__logo">Agent Report System</div>

        <h1 className="login-box__title">Sign in</h1>
        <p className="login-box__sub">Enter your credentials to access the system.</p>

        {error && (
          <div className="alert alert--danger">
            Invalid agent code or password.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field__label" htmlFor="agentCode">Agent Code</label>
            <input
              id="agentCode"
              className="field__input"
              name="agentCode"
              type="text"
              placeholder="e.g. AGT-001"
              autoComplete="username"
              value={formData.agentCode}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="password">Password</label>
            <input
              id="password"
              className="field__input"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn--primary btn--full"
            type="submit"
            disabled={isLoading}
            style={{ marginTop: 8 }}
          >
            {isLoading ? "Authenticating…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
