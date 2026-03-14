import { create } from "zustand"
import { persist } from "zustand/middleware"
import { loginReqest } from "../services/authServices"
import type { Agent } from "../types/agent"

interface AuthState {
  user: Agent | null
  isLoading: boolean
  isLoggedIn: boolean
  error: Error | null
  /** Authenticates the user and stores the returned Agent in state. */
  login: (agentCode: string, password: string) => Promise<Agent | undefined>
  /** Clears local state (call after the server has cleared the JWT cookie). */
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isLoggedIn: false,
      error: null,

      login: async (agentCode: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const userData: Agent = await loginReqest(agentCode, password)
          set({ user: userData, isLoggedIn: true, isLoading: false })
          return userData
        } catch (error) {
          set({ error: error as Error, isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false, error: null })
      },
    }),
    { name: "user-storage" }
  )
)
