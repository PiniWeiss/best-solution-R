import React from "react"
import { Navigate } from "react-router"
import { useAuthStore } from "../store/auth.store"

interface PrivateComponentProps {
  role?: "admin" | "agent"
  children: React.ReactNode
}

/**
 * Wraps a route and enforces auth + optional role check.
 * - Not logged in → redirect to /login
 * - Wrong role    → redirect to the correct dashboard
 */
function PrivetComponent({ role, children }: PrivateComponentProps) {
  const { user, isLoggedIn, isLoading } = useAuthStore()

  if (isLoading) {
    return <div className="loading-overlay" />
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (role === "admin" && user?.role !== "admin") {
    return <Navigate to="/user" replace />
  }

  if (role === "agent" && user?.role !== "agent") {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}

export default PrivetComponent
