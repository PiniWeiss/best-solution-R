import { useEffect, useState } from "react"
import { fetchUsers, createUser, type UserRecord, type CreateUserPayload } from "../services/userServices"

const INITIAL_FORM: CreateUserPayload = {
  fullName: "",
  agentCode: "",
  role: "agent",
  password: "",
}

/**
 * Manages the users list and the create-user form for the admin page.
 */
export const useUsers = () => {
  const [users, setUsers]           = useState<UserRecord[]>([])
  const [isLoading, setLoading]     = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [form, setForm]             = useState<CreateUserPayload>(INITIAL_FORM)
  const [isSubmitting, setSubmit]   = useState(false)
  const [createError, setCreateErr] = useState<string | null>(null)
  const [showModal, setShowModal]   = useState(false)
  /** Holds the newly created user so the admin can note the initial password. */
  const [newUser, setNewUser]       = useState<UserRecord | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreateErr(null)
    if (!form.fullName || !form.agentCode || !form.password) {
      setCreateErr("All fields are required.")
      return
    }
    setSubmit(true)
    try {
      const created = await createUser(form)
      setNewUser(created)
      setUsers((prev) => [created, ...prev])
      setForm(INITIAL_FORM)
      setShowModal(false)
    } catch (err) {
      setCreateErr(err instanceof Error ? err.message : "Creation failed")
    } finally {
      setSubmit(false)
    }
  }

  return {
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
  }
}
