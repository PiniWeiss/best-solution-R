import type { Agent } from "../types/agent"

export const loginReqest = async (agentCode: string, password: string): Promise<Agent> => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agentCode, password }),
    credentials: "include",
  })
  const data: Agent = await res.json()
  if (!res.ok) throw new Error("Connection Error")
  return data
}
