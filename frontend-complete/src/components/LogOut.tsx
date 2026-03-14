import { useNavigate } from "react-router"
import { useAuthStore } from "../store/auth.store"

/**
 * Logout button: calls the server to clear the JWT cookie,
 * then clears Zustand state via store.logout().
 */
function LogOut() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", { credentials: "include" })
    } finally {
      // Always clear local state even if the server request fails
      logout()
      navigate("/login")
    }
  }

  return (
    <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
      Log out
    </button>
  )
}

export default LogOut
