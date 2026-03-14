const BASE = "http://localhost:5000/api"

/** Shape of a user record returned from the server */
export interface UserRecord {
  _id: string
  fullName: string
  agentCode: string
  role: string
  createdAt: string
}

export interface CreateUserPayload {
  fullName: string
  agentCode: string
  role: "admin" | "agent"
  password: string
}

/**
 * Fetches all users. Admin-only — the server will reject 403 otherwise.
 * The server returns { users: [...] }.
 */
export const fetchUsers = async (): Promise<UserRecord[]> => {
  const res = await fetch(`${BASE}/admin/users`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch users")
  const data = await res.json()
  return data.users
}

/**
 * Creates a new user. Admin-only.
 * The password is hashed server-side.
 */
export const createUser = async (payload: CreateUserPayload): Promise<UserRecord> => {
  const res = await fetch(`${BASE}/admin/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? "Failed to create user")
  }
  return res.json()
}
